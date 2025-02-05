import { useNavigation } from "@react-navigation/native";
import Constants from "expo-constants";
import * as Haptics from "expo-haptics";
import { useCallback } from "react";
import {
  ActivityIndicator,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { toast } from "sonner-native";

import { useToggleWishlistMutation } from "../../api/api.trekspot";
import {
  addItemIntoWishlist,
  removeItemFromWishlist,
} from "../../package/slices";
import { useAppDispatch, useAppSelector } from "../../package/store";
import {
  BackIcon,
  WishlistAddIcon,
  WishlistedIcon,
} from "../../utilities/SvgIcons.utility";

export const Header = ({ city, title }) => {
  const dispatch = useAppDispatch();

  const navigation = useNavigation();

  const wishlistState = useAppSelector((state) => state.wishlist);
  const [fetchToggleWishlist, { isLoading: isWishlistToggleLoading }] =
    useToggleWishlistMutation();

  const handleAddToWishlist = useCallback(
    async (exists: boolean = false) => {
      try {
        if (exists) {
          dispatch(removeItemFromWishlist({ id: city.id!, city, sight: null }));
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        } else {
          dispatch(addItemIntoWishlist({ id: city.id!, city, sight: null }));
        }

        await fetchToggleWishlist({ city: city.id }).unwrap();

        if (!exists) Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      } catch (error) {
        // Reverse the action in case of an error
        if (exists) {
          dispatch(addItemIntoWishlist({ id: city.id!, city, sight: null }));
        } else {
          dispatch(removeItemFromWishlist({ id: city.id!, city, sight: null }));
        }

        toast.error("Something went wrong, please try later", {
          duration: 2000,
        });
      }
    },
    [dispatch, city]
  );

 
  return (
    <View style={cityStyle.headerContainer}>
      <Pressable
        onPress={() => navigation.goBack()}
        hitSlop={20}
        style={cityStyle.backButton}
      >
        <BackIcon color="#000" size="18" />
      </Pressable>
      <Text style={cityStyle.screenTitle}>
       {title}
      </Text>
      <Pressable
        style={cityStyle.addToBucketButton}
        hitSlop={20}
        disabled={isWishlistToggleLoading}
        onPress={() =>
          !isWishlistToggleLoading &&
          handleAddToWishlist(
            wishlistState &&
              wishlistState.wishlists.some(
                (i) => i.city && i.city.id === city.id
              )
          )
        }
      >
        {isWishlistToggleLoading ? (
          <ActivityIndicator color="#000" />
        ) : wishlistState &&
          wishlistState &&
          wishlistState.wishlists.some(
            (i) => i.city && i.city.id === city.id
          ) ? (
            <WishlistedIcon size={20} color="#000" />
        ) : (
          <WishlistAddIcon size={18} />
        )}
      </Pressable>
    </View>
  );
};
const cityStyle = StyleSheet.create({
  addToBucketButton: {
    alignItems: "flex-end",
    justifyContent: "center",
    width: 30,
  },
  backButton: {
    alignItems: "flex-start",
    justifyContent: "flex-start",
    width: 30
  },
  headerContainer: {
    borderBottomColor: "#eee",
    borderBottomWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: Constants?.statusBarHeight + (Platform.OS === "android" ? 5 : 10),
    paddingBottom: 10,
    paddingHorizontal: 15,
  },
  screenTitle: {
    color: "#000",
    fontSize: 18,
    fontWeight: "500"
  }
});
