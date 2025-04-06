import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Image } from "expo-image";
import React, { useEffect } from "react";
import { useCallback, useState } from "react";
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { toast } from "sonner-native";

import {
  useRemoveWishlistItemMutation,
  useWishlistsQuery,
} from "../../api/api.trekspot";
import { CityType, SightType } from "../../api/api.types";
import { Loader } from "../../common/ui/Loader";
import { SightDetailModal } from "../../components/explore/sights/SightDetailModal";
import { ExploreRoutesStackParamList } from "../../routes/explore/ExploreRoutes";
import { globalStyles } from "../../styles/globalStyles";
import { COLORS } from "../../styles/theme";
import {
  BackIcon,
} from "../../utilities/SvgIcons.utility";
import { _tripScreenStyles } from "../trip/_tripScreenStyles";
import { groupByCategory } from "./wishlist/helper";
import { WishlistContainer } from "./wishlist/WishlistContainer";

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
          <Pressable
            onPress={() => navigation.goBack()}
            style={globalStyles.screenHeaderBackButton}
            hitSlop={20}
          >
            <BackIcon size="18" />
          </Pressable>

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
  actionButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
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
