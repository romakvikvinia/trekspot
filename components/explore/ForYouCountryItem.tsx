import React from "react";
import { Image } from "expo-image";
import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "../../common/components/_styles";
import { CityType } from "../../api/api.types";

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
        },
      ]}
      key={item.id}
      onPress={() => onPlaceDetailOpen(item)}
    >
      {item.image && (
        <Image
          style={[
            styles.thingsTodoItemImage,
            {
              minHeight: 120,
            },
          ]}
          cachePolicy="memory"
          contentFit="cover"
          transition={0}
          source={{
            uri: item.image.url,
          }}
        ></Image>
      )}

      <View style={styles.thingsTodoItemDetails}>
        <Text style={styles.thingsTodoItemTitle}>{item.city}</Text>

        <View style={styles.thingsTodoItemiIn}>
          <Text style={[styles.thingsTodoItemiIntypeText, { fontSize: 12 }]}>
            {item.description}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
