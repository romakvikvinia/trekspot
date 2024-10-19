import React from "react";
import { View, TouchableOpacity, Text, StyleSheet, Alert } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { Image } from "expo-image";
import { COLORS } from "../../../styles/theme";
import { tripDetailStyles } from "../../trip/_tripDetailStyles";
import { WishlistType } from "../../../api/api.types";
import * as Haptics from "expo-haptics";

interface IWishlistContainer {
  data: WishlistType[];
  title: string;
  type: "city" | "sight";
  onPress: (input: any) => void;
  onRemove: (id: string) => Promise<void>;
}

export const WishlistContainer: React.FC<IWishlistContainer> = ({
  type,
  title,
  data,
  onPress,
  onRemove,
}) => {
  const handleDeleteItem = (id: string) => {
    Alert.alert("Are you sure?", "", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      {
        text: "OK",
        onPress: (text) => onRemove(id),
      },
    ]);
  };
  return (
    <View style={styles.wishlistRow}>
      <Text style={styles.wishlistRowTitle}>{title}</Text>
      <View style={{ minHeight: 10 }}>
        <FlashList
          horizontal
          data={data}
          keyExtractor={(item, index) => `${item.id}-${index}`}
          renderItem={({ item, index }) => {
            const title = type == "city" ? item.city.city : item.sight.title;
            return (
              <>
                <TouchableOpacity
                  activeOpacity={0.7}
                  style={[
                    tripDetailStyles.sightItem,
                    {
                      padding: 0,
                      width: 200,
                      marginLeft: 0,
                      marginBottom: 0,
                      paddingBottom: 0,
                      marginRight: 15,
                      paddingTop: 0,
                      height: 259,
                      alignItems: "flex-start",
                      justifyContent: "flex-start",
                      display: "flex",
                      flexDirection: "column",
                    },
                  ]}
                  onPress={() => {
                    onPress(type == "city" ? item.city : item.sight);
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                  }}
                >
                  <Image
                    style={{
                      width: 200,
                      height: 140,
                      borderRadius: 10,
                      borderBottomLeftRadius: 0,
                      borderBottomRightRadius: 0,
                    }}
                    contentFit="cover"
                    cachePolicy="memory-disk"
                    source={
                      item && item[type] && item[type].image.url
                        ? {
                            uri: item && item[type].image.url,
                          }
                        : require("../../../assets/no-image.png")
                    }
                    key={`img-${item.id}`}
                  ></Image>

                  <View
                    style={{
                      width: "100%",
                      flex: 1,
                    }}
                  >
                    <View
                      style={[
                        tripDetailStyles.sightDetails,
                        {
                          flexDirection: "column",
                          marginTop: 10,
                          paddingHorizontal: 15,
                          paddingBottom: 10,
                          marginBottom: 0,
                        },
                      ]}
                    >
                      <Text
                        style={tripDetailStyles.sightTitle}
                        numberOfLines={1}
                      >
                        {title}
                      </Text>
                    </View>
                    <View style={styles.actionButtons}>
                      <TouchableOpacity
                        onPress={() =>
                          onPress(type == "city" ? item.city : item.sight)
                        }
                        activeOpacity={0.7}
                        style={[
                          styles.buttonItem,
                          { borderBottomLeftRadius: 10 },
                        ]}
                      >
                        <Text style={styles.buttonItemText}>Details</Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={[
                          styles.buttonItem,
                          {
                            borderBottomRightRadius: 10,
                          },
                        ]}
                        onPress={() => handleDeleteItem(item.id)}
                      >
                        <Text
                          style={[
                            styles.buttonItemText,
                            {
                              color: COLORS.red,
                            },
                          ]}
                        >
                          Remove
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </TouchableOpacity>
              </>
            );
          }}
          estimatedItemSize={200}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 20,
            paddingTop: 15,
            paddingBottom: 0,
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wishlistRow: {
    marginTop: 25,
  },
  wishlistRowTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: COLORS.primaryDark,
    paddingHorizontal: 20,
  },
  countryItemActionButton: {
    width: 30,
    height: 30,
    borderRadius: 50,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    right: 10,
    top: 10,
    zIndex: 3,
  },
  actionButtons: {
    justifyContent: "space-between",
    marginTop: 15,
    flexDirection: "row",
  },
  buttonItem: {
    backgroundColor: COLORS.lightGray,
    paddingHorizontal: 10,
    flex: 1,
    textAlign: "center",
    justifyContent: "center",
    flexDirection: "row",
    height: 40,
    alignItems: "center",
  },
  buttonItemText: {
    color: COLORS.black,
    fontSize: 12,
    fontWeight: "500",
  },
});
