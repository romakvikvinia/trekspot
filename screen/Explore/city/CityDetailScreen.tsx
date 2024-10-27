import React, { useCallback, useEffect, useState } from "react";
import { Text } from "react-native";
import { ImageBackground, Platform, TouchableOpacity } from "react-native";
import { ScrollView, View } from "react-native";
import Swiper from "react-native-swiper";
import {
  useToggleWishlistMutation,
  useLazyGetSightsQuery,
} from "../../../api/api.trekspot";
import { CityType, SightType } from "../../../api/api.types";
import { Loader } from "../../../common/ui/Loader";
import {
  BackIcon,
  DownIcon,
  Mark2,
  StarIcon,
} from "../../../utilities/SvgIcons.utility";

import { COLORS, SIZES } from "../../../styles/theme";

import Constants from "expo-constants";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { exploreStyles } from "../../../components/explore/sights/_exploreStyles";
import { SightDetailModal } from "../../../components/explore/sights/SightDetailModal";
import { SightItem } from "../../../components/explore/sights/SightItem";
import { SightsContainer } from "../../../components/explore/sights/SightsContainer";

import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ExploreRoutesStackParamList } from "../../../routes/explore/ExploreRoutes";
import { styles } from "../../../common/components/_styles";
import { toast } from "sonner-native";
import { useAppDispatch, useAppSelector } from "../../../package/store";
import {
  addItemIntoWishlist,
  removeItemFromWishlist,
} from "../../../package/slices";

type Props = NativeStackScreenProps<ExploreRoutesStackParamList, "CityDetail">;

interface IState {
  sight: SightType | null;
}

export const CityDetailScreen: React.FC<Props> = ({ route, navigation }) => {
  const dispatch = useAppDispatch();
  const { city } = route?.params;
  const [state, setState] = useState<IState>({ sight: null });
  const [getSights, { data, isLoading, isError }] = useLazyGetSightsQuery();
  /**
   * wishlist slice related things
   */
  const wishlistState = useAppSelector((state) => state.wishlist);
  const [fetchToggleWishlist, { isLoading: isWishlistToggleLoading }] =
    useToggleWishlistMutation();

  useEffect(() => {
    if (city) getSights({ iso2: city.iso2, city: city.city });
  }, [city]);

  const handleAddToWishlist = useCallback(
    async (exists: boolean = false) => {
      try {
        if (exists) {
          dispatch(
            removeItemFromWishlist({ id: city.id!, city, sight: undefined! })
          );
        } else {
          dispatch(
            addItemIntoWishlist({ id: city.id!, city, sight: undefined! })
          );
        }

        await fetchToggleWishlist({ city: city.id }).unwrap();

        if (!exists)
          toast.success("The city has been added to your wishlist", {
            duration: 2000,
          });
      } catch (error) {
        if (exists) {
          dispatch(
            addItemIntoWishlist({ id: city.id!, city, sight: undefined! })
          );
        } else {
          dispatch(
            removeItemFromWishlist({ id: city.id!, city, sight: undefined! })
          );
        }

        toast.error("Something went wrong, please try later", {
          duration: 2000,
        });
      }
    },
    [dispatch, city]
  );

  const handleSetSightItem = useCallback((sight: SightType) => {
    setState((prevState) => ({ ...prevState, sight }));
  }, []);

  const handleOnClose = useCallback(() => {
    setState((prevState) => ({ ...prevState, sight: null }));
  }, []);

  // transform data

  const topSights = (data && "Top Sights" in data && data["Top Sights"]) || [];
  let sights = data && { ...data };
  if (sights && data && "Top Sights" in data && data["Top Sights"]) {
    delete sights["Top Sights"];
  }

  useEffect(() => {
    navigation.getParent()?.setOptions({
      tabBarStyle: {
        display: "none",
      },
    });
    return () => {
      navigation.getParent()?.setOptions({
        tabBarStyle: {
          display: "flex",
        },
      });
    };
  }, []);


  return (
    <View style={{ flex: 1, backgroundColor: "#f8f8f8" }}>
      <ScrollView style={{ flex: 1 }}>
        {/* Loading State */}
        {isLoading && (
          <View style={{ minHeight: SIZES.height }}>
            <View
              style={{
                backgroundColor: "#eee",
                width: "100%",
                height: 300,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <View style={{ width: 35, height: 35 }}>
                <Loader isLoading={isLoading} background="#eee" />
              </View>
            </View>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{
                paddingHorizontal: 15,
              }}
            >
              {[0, 1, 2].map((_, i) => (
                <View
                  key={`item-${i}`}
                  style={{
                    backgroundColor: "#eee",
                    width: 200,
                    marginRight: 15,
                    minHeight: 190,
                    marginTop: 25,
                    borderRadius: 15,
                  }}
                ></View>
              ))}
            </ScrollView>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{
                paddingHorizontal: 15,
              }}
            >
              {[0, 1, 2].map((_, i) => (
                <View
                  key={`item-${i}`}
                  style={{
                    backgroundColor: "#eee",
                    width: 200,
                    marginRight: 15,
                    height: 190,
                    marginTop: 15,
                    borderRadius: 15,
                  }}
                ></View>
              ))}
            </ScrollView>
          </View>
        )}

        {/* Content */}

        {!isLoading ? (
          <>
            {/* Swiper */}

            <View
              style={[
                styles.swiperWrapper,
                {
                  borderTopLeftRadius: 10,
                  borderTopRightRadius: 10,
                  overflow: "hidden",
                },
              ]}
            >
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                activeOpacity={0.7}
                style={[
                  styles.backButton,
                  {
                    top:
                      Platform.OS === "android"
                        ? Constants?.statusBarHeight + 10
                        : 55,
                  },
                ]}
              >
                <BackIcon color="#000" />
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.addToBucketButton,
                  {
                    top:
                      Platform.OS === "android"
                        ? Constants?.statusBarHeight + 10
                        : 55,
                  },
                ]}
                activeOpacity={0.7}
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
                <Mark2
                  color={
                    wishlistState &&
                    wishlistState.wishlists.some(
                      (i) => i.city && i.city.id === city.id
                    )
                      ? COLORS.primary
                      : "#000"
                  }
                />
              </TouchableOpacity>

              <Swiper
                activeDotColor="#fff"
                showsButtons={false}
                loop={false}
                dotColor="#949494"
                automaticallyAdjustContentInsets
                paginationStyle={{
                  position: "absolute",
                  justifyContent: "flex-end",
                  paddingRight: 15,
                  bottom: 16,
                  zIndex: 2,
                }}
              >
                {city?.images?.length ? (
                  city.images.map((item, i) => (
                    <ImageBackground
                      style={styles.box}
                      resizeMode="cover"
                      source={{
                        uri: item.url,
                      }}
                      key={`slide-${item.id}-${city.id}`}
                    >
                      <LinearGradient
                        style={styles.gradientWrapper}
                        colors={["rgba(0,0,0,0.01)", "rgba(0,0,0,0.5)"]}
                      ></LinearGradient>
                    </ImageBackground>
                  ))
                ) : (
                  <ImageBackground
                    style={styles.box}
                    resizeMode="cover"
                    source={require("../../../assets/no-image.png")}
                  >
                    <LinearGradient
                      style={styles.gradientWrapper}
                      colors={["rgba(0,0,0,0.01)", "rgba(0,0,0,0.5)"]}
                    ></LinearGradient>
                  </ImageBackground>
                )}
              </Swiper>

              <View style={styles.otherInfo}>
                {city?.city && (
                  <View style={styles.labelItem}>
                    <Text style={styles.labelItemText}>{city.city}</Text>
                  </View>
                )}

                <View style={styles.ratingLabel}>
                  {city?.rate && (
                    <>
                      <View
                        style={{
                          position: "relative",
                          top: -1,
                          opacity: 0.8,
                        }}
                      >
                        <StarIcon size={15} color="#FFBC3E" />
                      </View>
                      <Text style={styles.ratingText}>{city.rate} /</Text>
                    </>
                  )}
                  {city?.visitors && (
                    <Text style={styles.ratingText}>
                      {city?.visitors} visitors
                    </Text>
                  )}
                </View>
              </View>
            </View>

            {/* Top sights */}
            <View
              style={[
                exploreStyles.placeSpotsRow,
                {
                  borderTopWidth: 0,
                },
              ]}
            >
              <Text
                style={[
                  exploreStyles.placeSpotsRowTitle,
                  { fontSize: 20, fontWeight: "bold" },
                ]}
              >
                Top sights
              </Text>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                  paddingHorizontal: 15,
                }}
              >
                {topSights.map((item) => item?.image && (
                  <SightItem
                    key={`top-sights-${item.id}-${item.title}`}
                    item={item}
                    onHandleItem={handleSetSightItem}
                  />
                ))}
              </ScrollView>
            </View>

            {/* Top sights */}

            {sights && Object.keys(sights).length ? (
              <SightsContainer items={sights} />
            ) : null}

            {state.sight && <SightDetailModal showDirection={false} data={state.sight} closeCallBack={handleOnClose} />}
          </>
        ) : null}
      </ScrollView>
    </View>
  );
};
