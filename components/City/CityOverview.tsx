import { ImageBackground, ScrollView, StyleSheet, Text, View } from "react-native";

import { COLORS } from "../../styles/theme";
import { PlugImages } from "../../utilities/Plugs";
import { BestTimeToVisitBox } from "./BestTimeToVisitBox";
import { QuickOverviewBox } from "./QuickOverviewBox";

export const CityOverview = ({recognizedFor, plugTypes, currencies}) => {

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        paddingHorizontal: 15,
        marginTop: 15,
      }}
    >
      <BestTimeToVisitBox />
      <QuickOverviewBox />
      <View
        style={[
          cityStyle.boxItem,
          {
            width: "auto",
            maxWidth: 200,
            minWidth: 170,
          },
        ]}
      >
        <Text style={cityStyle.boxItemTitle}>General Tips</Text>
        <View style={cityStyle.boxItemIn}>
          <View style={cityStyle.boxItemInTitleWrapper}>
            {currencies  && Object.keys(currencies)?.length  
              ? Object.keys(currencies).map(
                  (key, i) =>
                    currencies && (
                      <Text key={i} style={cityStyle.boxItemInTitleText}>
                        {currencies[key].name} -{" "}
                        {currencies[key].symbol}
                      </Text>
                    )
                )
              : null}
            <Text style={cityStyle.boxItemInSubTitle}>Currency</Text>
          </View>
          <View style={cityStyle.boxItemInTitleWrapper}>
            <View style={cityStyle.multiValues}>
              {plugTypes?.map((item, i) => (
                <View key={i} style={cityStyle.plug}>
                  <ImageBackground
                    source={PlugImages[item]}
                    style={{
                      width: 50,
                      height: 50,
                    }}
                  ></ImageBackground>
                  <Text
                    style={{
                      fontSize: 12,
                      color: COLORS.black,
                      fontWeight: "500",
                      marginTop: 5,
                    }}
                  >
                    Type {item}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      </View>
      <View
        style={[
          cityStyle.boxItem,
          {
            width: "auto",
            maxWidth: 200,
          },
        ]}
      >
        <Text style={cityStyle.boxItemTitle}>Popular for</Text>
        <View style={cityStyle.boxItemIn}>
          <ScrollView
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            style={[
              cityStyle.boxItemInTitleWrapper,
              {
                flexDirection: "row",
              },
            ]}
          >
            {recognizedFor?.slice(0, 4)?.map((item, i) => (
              <View style={cityStyle.tagItem} key={i}>
                <Text style={cityStyle.tagItemText}>
                  {item?.emoji} {item?.title}
                </Text>
              </View>
            ))}
          </ScrollView>
        </View>
      </View>
    </ScrollView>
  );
};
const cityStyle = StyleSheet.create({
  boxItem: {
    backgroundColor: "#fff",
    borderColor: "#f2f2f2",
    borderRadius: 15,
    borderWidth: 1,
    height: 185,
    marginRight: 15,
    padding: 15,
    width: 180,
  },
  boxItemIn: {
    flexDirection: "column",
    marginTop: 15,
  },
  boxItemInSubTitle: {
    color: COLORS.gray,
    fontSize: 12,
    fontWeight: "500",
    marginTop: 5,
    width: "100%",
  },
  boxItemInTitleText: {
    color: COLORS.black,
    fontSize: 18,
    fontWeight: "600",
    maxWidth: "80%",
  },
  boxItemInTitleWrapper: {
    flexDirection: "column",
    flexWrap: "wrap",
  },
  boxItemTitle: {
    fontSize: 12,
    fontWeight: "400",
    textTransform: "uppercase",
  },
  multiValues:{
    flexDirection: "row",
    marginTop: 15
  },
  plug: {
    alignItems: "center",
    flexDirection: "column",
    marginRight: 15,
    width: 45,
  },
  tagItem: {
    backgroundColor: "#fafafa",
    borderRadius: 5,
    marginBottom: 5,
    marginRight: 5,
    paddingHorizontal: 8,
    paddingVertical: 5,
  },
  tagItemText: {
    color: COLORS.black,
    fontSize: 14,
    fontWeight: "500",
  },
});
