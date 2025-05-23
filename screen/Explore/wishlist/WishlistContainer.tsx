import React from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Alert,
  Platform,
} from "react-native";
import { FlashList } from "@shopify/flash-list";
import { Image } from "expo-image";
import { COLORS } from "../../../styles/theme";
import { tripDetailStyles } from "../../trip/_tripDetailStyles";
import { WishlistType } from "../../../api/api.types";
import * as Haptics from "expo-haptics";
import { Mark2, WishlistedIcon } from "../../../utilities/SvgIcons.utility";
import { LinearGradient } from "expo-linear-gradient";

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
  wishlistRow: {
    marginTop: 25,
  },
  gradientWrapper: {
    flex: 1,
    justifyContent: "flex-end",
    paddingBottom: 15,
    paddingHorizontal: 15,
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    overflow: "hidden",
    borderRadius: 15
  },
  addToBucketButton: {
    width: Platform.OS === "android" ? 30 : 40,
    height: Platform.OS === "android" ? 30 : 40,
    borderRadius: 50,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    right: 8,
    top: 8,
    zIndex: 3,
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
