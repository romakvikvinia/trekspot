import { ScrollView, StyleSheet, Text, View } from "react-native";

import { COLORS } from "../../styles/theme";
import { BestTimeToVisitBox } from "./BestTimeToVisitBox";
import { QuickOverviewBox } from "./QuickOverviewBox";

export const CityOverview = ({recognizedFor}) => {

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
          },
        ]}
      >
        <Text style={cityStyle.boxItemTitle}>Popular for</Text>
        <View style={cityStyle.boxItemIn}>
          <View
            style={[
              cityStyle.boxItemInTitleWrapper,
              {
                flexDirection: "row",
              },
            ]}
          >
            {recognizedFor?.slice(0, 4)?.map((item, i) => (
              <View style={cityStyle.tagItem} key={i}>
                <Text style={cityStyle.tagItemText}>{item?.emoji} {item?.title}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>
    </ScrollView>
  );
};
const cityStyle = StyleSheet.create({
  boxItem: {
    backgroundColor: "#fff",
    borderColor: "#fafafa",
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
  boxItemInTitleWrapper: {
    flexDirection: "column",
    flexWrap: "wrap",
  },
  boxItemTitle: {
    fontSize: 12,
    fontWeight: "400",
    textTransform: "uppercase",
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
