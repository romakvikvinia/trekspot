import { FlashList } from "@shopify/flash-list";
import * as Haptics from "expo-haptics";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import {
  Alert,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { WishlistType } from "../../../api/api.types";
import { COLORS } from "../../../styles/theme";
import { WishlistedIcon } from "../../../utilities/SvgIcons.utility";
import { tripDetailStyles } from "../../trip/_tripDetailStyles";

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
    Alert.alert("Do you really want to remove from wishlist?", "", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      {
        text: "Remove",
        onPress: (text) => {
          onRemove(id);
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        },
        style: "destructive",
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
                      width: 160,
                      height: 180,
                      marginLeft: 0,
                      marginBottom: 0,
                      paddingBottom: 0,
                      marginRight: 15,
                      paddingTop: 0,
                      alignItems: "flex-start",
                      justifyContent: "flex-start",
                      display: "flex",
                      flexDirection: "column",
                      position: "relative",
                      borderRadius: 15,
                      overflow: "hidden",
                    },
                  ]}
                  onPress={() => {
                    onPress(type == "city" ? item.city : item.sight);
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                  }}
                  key={`item-${item.id}`}
                >
                  <TouchableOpacity
                    style={styles.addToBucketButton}
                    activeOpacity={0.7}
                    onPress={() => handleDeleteItem(item.id)}
                  >
                    <WishlistedIcon />
                  </TouchableOpacity>

                  <Image
                    style={{
                      width: 160,
                      height: 180,
                      borderRadius: 15,
                      overflow: "hidden",
                    }}
                    contentFit="cover"
                    // cachePolicy="memory-disk"
                    source={
                      item && item[type] && item[type].image.url
                        ? {
                            uri: item && item[type].image.url,
                          }
                        : require("../../../assets/no-image.png")
                    }
                    key={`img-${item.id}`}
                  ></Image>
                  <LinearGradient
                    style={styles.gradientWrapper}
                    colors={["rgba(0,0,0,0.01)", "rgba(0,0,0,0.6)"]}
                  >
                    <Text
                      style={[
                        tripDetailStyles.sightTitle,
                        {
                          color: "#fff",
                          fontSize: 18,
                          fontWeight: "bold",
                        },
                      ]}
                      numberOfLines={2}
                    >
                      {title}
                    </Text>
                  </LinearGradient>
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
  actionButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
  },
  addToBucketButton: {
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 50,
    height: Platform.OS === "android" ? 30 : 40,
    justifyContent: "center",
    position: "absolute",
    right: 8,
    top: 8,
    width: Platform.OS === "android" ? 30 : 40,
    zIndex: 3,
  },
  buttonItem: {
    alignItems: "center",
    backgroundColor: COLORS.lightGray,
    flex: 1,
    flexDirection: "row",
    height: 40,
    justifyContent: "center",
    paddingHorizontal: 10,
    textAlign: "center",
  },
  buttonItemText: {
    color: COLORS.black,
    fontSize: 12,
    fontWeight: "500",
  },
  countryItemActionButton: {
    alignItems: "center",
    backgroundColor: COLORS.primary,
    borderRadius: 50,
    height: 30,
    justifyContent: "center",
    position: "absolute",
    right: 10,
    top: 10,
    width: 30,
    zIndex: 3,
  },
  gradientWrapper: {
    borderRadius: 15,
    flex: 1,
    height: "100%",
    justifyContent: "flex-end",
    left: 0,
    overflow: "hidden",
    paddingBottom: 15,
    paddingHorizontal: 15,
    position: "absolute",
    top: 0,
    width: "100%"
  },
  wishlistRow: {
    marginTop: 25,
  },
  wishlistRowTitle: {
    color: COLORS.primaryDark,
    fontSize: 20,
    fontWeight: "600",
    paddingHorizontal: 20,
  },
});
