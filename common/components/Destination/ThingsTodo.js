import { Image } from "expo-image";
import { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { MarkerFillIcon } from "../../../utilities/SvgIcons.utility";
import { styles } from "../_styles";

export const ThingsTodo = ({ data }) => {
  return (
    <View style={[styles.thingsTodo, { paddingBottom: 100 }]}>
      {data?.topSights?.map((item, ind) => (
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.thingsTodoItem}
          key={ind}
          onPress={() => {
            onEmbedModalOpen();
            setBlogUrl("");
            setPlaceTitle(item?.title);
          }}
        >
          <Image
            style={[
              styles.thingsTodoItemImage,
              {
                minHeight: 140,
              },
            ]}
            cachePolicy="memory"
            contentFit="cover"
            transition={0}
            source={{
              uri: item?.thumbnail,
            }}
          >
            <View style={styles.mapButton}>
              <MarkerFillIcon color="#fff" size="10" />
              <Text style={styles.mapButtonText}>Map</Text>
            </View>
          </Image>

          <View style={styles.thingsTodoItemDetails}>
            <Text style={styles.thingsTodoItemTitle}>{item?.title}</Text>

            <View style={styles.thingsTodoItemiIn}>
              {item?.price ? (
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
              ) : null}
              {item?.type ? (
                <Text
                  style={[
                    styles.thingsTodoItemiIntypeText,
                    {
                      fontSize: 14,
                    },
                  ]}
                >
                  {item?.type}
                </Text>
              ) : null}
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};
