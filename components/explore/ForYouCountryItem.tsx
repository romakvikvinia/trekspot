import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import {
  Text,
  TouchableOpacity,
} from "react-native";
import { View } from "react-native";

import { CityType } from "../../api/api.types";
import { styles } from "../../common/components/_styles";

type ForYouCountryItemProps = {
  item: CityType;
  onPlaceDetailOpen: (city: CityType) => void;
};

export const ForYouCountryItem: React.FC<ForYouCountryItemProps> = ({
  item,
  onPlaceDetailOpen,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={[
        styles.thingsTodoItem,
        {
          width: "95%",
          marginBottom: 10,
          marginRight: 10,
          minHeight: 100,
          overflow: "hidden",
          borderRadius: 10,
        },
      ]}
      key={item.id}
      onPress={() => onPlaceDetailOpen(item)}
    >
      <View style={styles.imageWrapper}>
        <Image
          style={[
            styles.thingsTodoItemImage,
            {
              minHeight: 100,
              position: "relative",
            },
          ]}
          contentFit="cover"
          source={ item?.image?.url ? {
            uri: item?.image?.url,
          // eslint-disable-next-line @typescript-eslint/no-require-imports
          } : require("../../assets/no-image.png") 
        }
          // cachePolicy="memory-disk"
        > 
        </Image>
        <LinearGradient
            style={[
              styles.gradientWrapper,
              {
                paddingLeft: 10,
                paddingBottom: 10,
                height: "100%",
                justifyContent: "flex-end",
              },
            ]}
            colors={["rgba(0,0,0,0.01)", "rgba(0,0,0,0.7)"]}
          >
            <Text
              style={[
                styles.thingsTodoItemTitle,
                { color: "#fff", fontWeight: "bold", paddingRight: 10 },
              ]}
            >
              {item.city}
            </Text>
          </LinearGradient>
    </View>
      {/* <View style={styles.thingsTodoItemDetails}>
        <Text style={styles.thingsTodoItemTitle}>{item.city}</Text>

        <View style={styles.thingsTodoItemiIn}>
          <Text style={[styles.thingsTodoItemiIntypeText, { fontSize: 12 }]}>
            {item.description}
          </Text>
        </View>
      </View> */}
    </TouchableOpacity>
  );
};
