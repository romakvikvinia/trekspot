import React from "react";
import { Image } from "expo-image";
import { ImageBackground, Text, TouchableOpacity, View } from "react-native";
import { styles } from "../../../common/components/_styles";
import { SightType } from "../../../api/api.types";
import { exploreStyles } from "./_exploreStyles";
import { StarIcon } from "../../../utilities/SvgIcons.utility";

type SightItemProps = {
  item: SightType;
  onHandleItem?: (sight: SightType) => void;
};

export const SightItem: React.FC<SightItemProps> = ({ item, onHandleItem }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={[
        styles.thingsTodoItem,
        {
          minHeight: 190,
          width: 200,
          marginRight: 15,
          height: "auto",
        },
      ]}
      key={`sight-item-${item.id}`}
      onPress={() => {
        if (onHandleItem) onHandleItem(item);
      }}
    >
      {item.image ? (
        <Image
          style={[
            styles.thingsTodoItemImage,
            {
              minHeight: 190,
            },
          ]}
          cachePolicy="memory"
          contentFit="cover"
          transition={0}
          source={{
            uri: item.image.url,
          }}
        ></Image>
      ) : (
        <ImageBackground
          source={require("../../../assets/no-image.png")}
          resizeMode="cover"
          style={{
            width: "100%",
            minHeight: 190,
            borderRadius: 10,
            overflow: "hidden"
          }}
        ></ImageBackground>
      )}

      <View style={styles.thingsTodoItemDetails}>
        <Text style={styles.thingsTodoItemTitle}>{item.title}</Text>

        <View style={styles.thingsTodoItemiIn}>
          {/* {item.price ? (
            <Text
              style={[
                styles.thingsTodoItemiInprice,
                {
                  fontSize: 14,
                },
              ]}
            >
              {item?.price}
            </Text>
          ) : null} */}
          {item.category ? (
            <Text
              style={[
                styles.thingsTodoItemiIntypeText,
                {
                  fontSize: 14,
                },
              ]}
            >
              {item.category}
            </Text>
          ) : null}
          <View style={exploreStyles.ratingWrapper}>
            <View
              style={{
                position: "relative",
                top: -1,
                opacity: 0.8,
              }}
            >
              <StarIcon size={15} color="#FFBC3E" />
            </View>
            <Text style={exploreStyles.ratingText}>{item.rate}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};
