import { ScrollView, View } from "react-native";

import { Loader } from "../../common/ui/Loader";
import { SIZES } from "../../styles/theme";

export const CityLoader = ({ isLoading }) => {
  return (
    <View style={{ minHeight: SIZES.height }}>
      <View
        style={{
          backgroundColor: "#eee",
          width: "100%",
          height: 300,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View style={{ width: 35, height: 35 }}>
          <Loader isLoading={isLoading} background="#eee" />
        </View>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 15,
        }}
      >
        {[0, 1, 2].map((_, i) => (
          <View
            key={`item-${i}`}
            style={{
              backgroundColor: "#eee",
              width: 200,
              marginRight: 15,
              minHeight: 190,
              marginTop: 25,
              borderRadius: 15,
            }}
          ></View>
        ))}
      </ScrollView>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 15,
        }}
      >
        {[0, 1, 2].map((_, i) => (
          <View
            key={`item-${i}`}
            style={{
              backgroundColor: "#eee",
              width: 200,
              marginRight: 15,
              height: 190,
              marginTop: 15,
              borderRadius: 15,
            }}
          ></View>
        ))}
      </ScrollView>
    </View>
  );
};
