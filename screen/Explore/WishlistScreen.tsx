import React, { useEffect } from "react";
import { Image } from "expo-image";
import { useCallback, useState } from "react";

import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  useRemoveWishlistItemMutation,
  useWishlistsQuery,
} from "../../api/api.trekspot";
import { Loader } from "../../common/ui/Loader";
import { SightDetailModal } from "../../components/explore/sights/SightDetailModal";
import { globalStyles } from "../../styles/globalStyles";
import { COLORS } from "../../styles/theme";
import {
  BackIcon,
} from "../../utilities/SvgIcons.utility";
import { _tripScreenStyles } from "../trip/_tripScreenStyles";
import { WishlistContainer } from "./wishlist/WishlistContainer";
import { CityType, SightType } from "../../api/api.types";
import { ExploreRoutesStackParamList } from "../../routes/explore/ExploreRoutes";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { toast } from "sonner-native";
import { groupByCategory } from "./wishlist/helper";

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
    take: 500,
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

  useEffect(() => {
    if(isRemoveWishlistItemLoading) {
      toast.loading("Removing from wishlist...",{
        duration: 500
      })
    }
  }, [isRemoveWishlistItemLoading]);


  const dataByCategory = groupByCategory(sights?.wishlists);

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
          !sights?.wishlists.length && 
          !isRemoveWishlistItemLoading && (
            <View style={{ minHeight: 500, justifyContent: "center" }}>
              <View style={_tripScreenStyles.notFoundView}>
              <Image
                style={{
                  width: 200,
                  height: 220,
                  alignSelf: "center",
                  marginBottom: 10,
                }}
                source={require("../../assets/tripStart.webp")}
                contentFit="cover"
                cachePolicy="memory-disk"
              ></Image>
                <Text style={_tripScreenStyles.notFoundViewTitleText}>
                  Your wishlist is empty
                </Text>
                <Text style={_tripScreenStyles.notFoundViewText}>
                  Add your favorite items to get started!
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

            {!isSightsLoading && dataByCategory &&
              Object.keys(dataByCategory).map((category) => {
                return (
                  <WishlistContainer
                    data={dataByCategory[category]}
                    type="sight"
                    title={category}
                    onPress={handleTopSightClick}
                    onRemove={handleRemoveWishlistItem}
                    key={category}
                  />
                )
              })
            }

          {/* {!isSightsLoading &&
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
            )} */}
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
