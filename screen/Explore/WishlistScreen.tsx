import React from "react";
import { useNavigation } from "@react-navigation/native";
import { FlashList } from "@shopify/flash-list";
import { Image } from "expo-image";
import { useCallback, useEffect, useState } from "react";

import {
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  useLazyGetSightsQuery,
  useLazyWishlistsQuery,
  useRemoveWishlistItemMutation,
  useWishlistsQuery,
} from "../../api/api.trekspot";
import { Loader } from "../../common/ui/Loader";
import { SightDetailModal } from "../../components/explore/sights/SightDetailModal";
import { globalStyles } from "../../styles/globalStyles";
import { COLORS } from "../../styles/theme";
import {
  BackIcon,
  Mark2,
  NoDestinationFoundIcon,
  PinIcon,
  StarIcon,
  VisitedIcon,
  WishlistIcon,
} from "../../utilities/SvgIcons.utility";
import { tripDetailStyles } from "../trip/_tripDetailStyles";
import { NotFound } from "../../components/common/NotFound";
import { _tripScreenStyles } from "../trip/_tripScreenStyles";
import { WishlistContainer } from "./wishlist/WishlistContainer";
import { CityType, SightType } from "../../api/api.types";
import { ExploreRoutesStackParamList } from "../../routes/explore/ExploreRoutes";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

type WishlistProps = NativeStackScreenProps<
  ExploreRoutesStackParamList,
  "WishlistScreen"
>;

export const WishlistScreen: React.FC<WishlistProps> = ({ navigation }) => {
  const [topSightDetail, setTopSightDetail] = useState<SightType>();

  const [fetchRemoveWishlistItem, { isLoading: isRemoveWishlistItemLoading }] =
    useRemoveWishlistItemMutation();

  const {
    data: cities,
    isLoading: isCitiesLoading,
    refetch: refetchCitiesWishlist,
  } = useWishlistsQuery({
    skip: 0,
    take: 5,
    type: "City",
  });

  const {
    data: sights,
    isLoading: isSightsLoading,
    refetch: refetchSightWishlist,
  } = useWishlistsQuery({
    skip: 0,
    take: 5,
    type: "Sight",
  });

  const handleRemoveWishlistItem = useCallback(
    async (id: string) => {
      await fetchRemoveWishlistItem({ id }).unwrap();
      refetchCitiesWishlist();
      refetchSightWishlist();
    },
    [fetchRemoveWishlistItem]
  );

  const handleTopSightClick = (sight: SightType) => {
    setTopSightDetail(sight);
  };

  const handleClear = useCallback(() => {
    setTopSightDetail(undefined);
  }, []);

  const redirectToCityDetails = (city: CityType) =>
    navigation.navigate("CityDetail", {
      city,
    });

  return (
    <>
      <SafeAreaView style={globalStyles.safeArea}>
        <View style={globalStyles.screenHeader}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={globalStyles.screenHeaderBackButton}
          >
            <BackIcon size="30" />
          </TouchableOpacity>

          <Text style={globalStyles.screenTitle}>Wishlist</Text>
          <TouchableOpacity
            style={globalStyles.screenHeaderBackButton}
          ></TouchableOpacity>
        </View>

        <Loader
          isLoading={isCitiesLoading || isSightsLoading}
          size="small"
          background="#F2F2F7"
        />

        {/* In case no data */}
        {!isCitiesLoading &&
          !isSightsLoading &&
          !cities?.wishlists.length &&
          !sights?.wishlists.length && (
            <View style={{ minHeight: 500, justifyContent: "center" }}>
              <View style={_tripScreenStyles.notFoundView}>
                <NoDestinationFoundIcon />
                <Text style={_tripScreenStyles.notFoundViewTitleText}>
                  Your bucket list is looking empty
                </Text>
                <Text style={_tripScreenStyles.notFoundViewText}>
                  Go to explore and find an amazing sights.
                </Text>
              </View>
            </View>
          )}

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 30 }}
        >
          {!isCitiesLoading &&
            cities &&
            cities.wishlists &&
            !!cities.wishlists.length && (
              <WishlistContainer
                data={cities.wishlists}
                type="city"
                title="Cities"
                onPress={redirectToCityDetails}
                onRemove={handleRemoveWishlistItem}
              />
            )}

          {!isSightsLoading &&
            sights &&
            sights.wishlists &&
            !!sights.wishlists.length && (
              <WishlistContainer
                data={sights.wishlists}
                type="sight"
                title="Sight"
                onPress={handleTopSightClick}
                onRemove={handleRemoveWishlistItem}
              />
            )}
        </ScrollView>
      </SafeAreaView>

      {topSightDetail ? (
        <SightDetailModal data={topSightDetail} closeCallBack={handleClear} />
      ) : null}
    </>
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
