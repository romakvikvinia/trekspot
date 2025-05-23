import { Image } from "expo-image";
import { View } from "react-native";

import { tripDetailStyles } from "../_tripDetailStyles";

export const ImgComponent = ({ item }: any) => {
    return (
      <View
        style={[
          tripDetailStyles.imagesWrapper,
          {
            width: 80,
            height: 80,
            backgroundColor: "#fafafa",
            borderRadius: 10,
          },
        ]}
      >
        <Image
          style={[
            tripDetailStyles.mainImage,
            {
              width: 80,
              height: 80,
            },
          ]}
          contentFit="cover"
          source={
            item?.images[0]?.url
              ? {
                  uri: item?.images[0]?.url,
                }
              : require("../../../assets/no-image.png")
          }
          key={`img-${item?.title}`}
        ></Image>
      </View>
    );
  };