import React from "react";
import { Image } from "expo-image";
import { ImageBackground, Text, TouchableOpacity, View } from "react-native";
import { styles } from "../../common/components/_styles";
import { CityType } from "../../api/api.types";
import { LinearGradient } from "expo-linear-gradient";

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
      <ImageBackground
        style={[
          styles.thingsTodoItemImage,
          {
            minHeight: 100,
            position: "relative",
          },
        ]}
        contentFit="cover"
        transition={0}
        source={{
          uri: "https://cdn.pixabay.com/photo/2020/11/24/10/00/city-5772040_1280.jpg",
          // item?.image?.url,
        }}
      >
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
          colors={["rgba(0,0,0,0.01)", "rgba(0,0,0,0.1)"]}
        >
          <Text style={[styles.thingsTodoItemTitle, { color: "#fff" }]}>
            {item.city}
          </Text>
        </LinearGradient>
      </ImageBackground>

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
