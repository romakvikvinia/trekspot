import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Image } from "expo-image";
import {
  ActivityIndicator,
  Linking,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  ClickOutsideProvider,
  useClickOutside,
} from "react-native-click-outside";
import * as Haptics from "expo-haptics";
import Swiper from "react-native-swiper";
import { COLORS, SIZES } from "../../../styles/theme";
import {
  ClockIcon,
  CloseCircleIcon,
  DownIcon,
  Mark,
  StarIcon,
  TripLocationIcon,
  WishlistAddIcon,
  WishlistedIcon,
} from "../../../utilities/SvgIcons.utility";
import { SightType } from "../../../api/api.types";
import { ShowDirectionButton } from "./_ShowDirectionButton";
import { useAppDispatch, useAppSelector } from "../../../package/store";
import { useToggleWishlistMutation } from "../../../api/api.trekspot";
import { toast } from "sonner-native";
import {
  removeItemFromWishlist,
  addItemIntoWishlist,
} from "../../../package/slices";

type SightDetailModalProps = {
  data: SightType;
  showDirection: boolean;
  closeCallBack?: () => void;
};

export const HoursRow = ({ data }) => {
  const [hoursVisible, setHoursVisible] = useState(false);

  return (
    <TouchableOpacity
      style={{
        backgroundColor: "#f2f2f2",
        padding: 15,
        justifyContent: "center",
        marginBottom: 15,
        borderRadius: 10,
      }}
      onPress={() => setHoursVisible(!hoursVisible)}
      activeOpacity={0.7}
    >
      {data?.workingHours?.length ? (
        <View
          style={{
            marginTop: 0,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <ClockIcon />
            <Text
              style={{
                fontSize: 14,
                fontWeight: "500",
                color: COLORS.gray,
                marginLeft: 5,
              }}
            >
              Working hours
            </Text>
          </View>
          <DownIcon />
        </View>
      ) : null}
      {hoursVisible &&
        data.workingHours?.map((item, i) => (
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: i === 0 ? 15 : 8,
            }}
            key={`hour${i}`}
          >
            <Text
              style={{
                fontWeight: "500",
                width: 80,
                color: COLORS.gray,
              }}
            >
              {item.day}
            </Text>

            <Text
              style={{
                fontSize: 12,
              }}
            >{` ${item.hours}`}</Text>
          </View>
        ))}
    </TouchableOpacity>
  );
};

export const SightDetailModal: React.FC<SightDetailModalProps> = ({
  data,
  showDirection = false,
  closeCallBack = () => {},
}) => {
  const dispatch = useAppDispatch();
  /**
   * wishlist slice related things
   */
  const wishlistState = useAppSelector((state) => state.wishlist);
  const [fetchToggleWishlist, { isLoading: isWishlistToggleLoading }] =
    useToggleWishlistMutation();

  const [state, setState] = useState({ isOpen: false });

  const handleAddToWishlist = useCallback(
    async (exists: boolean = false) => {
      try {
        if (exists) {
          dispatch(
            removeItemFromWishlist({
              id: data.id!,
              city: undefined!,
              sight: data,
            })
          );
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        } else {
          dispatch(
            addItemIntoWishlist({ id: data.id!, city: undefined!, sight: data })
          );
        }

        await fetchToggleWishlist({ sight: data.id }).unwrap();

        if (!exists)
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      } catch (error) {
        if (exists) {
          dispatch(
            addItemIntoWishlist({ id: data.id!, city: undefined!, sight: data })
          );
        } else {
          dispatch(
            removeItemFromWishlist({
              id: data.id!,
              city: undefined!,
              sight: data,
            })
          );
        }

        toast.error("Something went wrong, please try again", {
          duration: 2000,
        });
      }
    },
    [dispatch, data]
  );

  const openMap = (address: string) => {
    const scheme = Platform.select({
      ios: "maps://0,0?q=",
      android: "geo:0,0?q=",
    });
    const url = Platform.select({
      ios: `${scheme}${address}`,
      android: `${scheme}${address}`,
    });

    Linking.openURL(url!);
  };

  const ref = useClickOutside(() => {
    setState((prevState) => ({
      ...prevState,
      isOpen: false,
    }));
    closeCallBack();
    // clear data from parent
  });

  useEffect(() => {
    if (data && !state.isOpen) {
      setState((prevState) => ({
        ...prevState,
        isOpen: !!data,
      }));
    }
  }, [data]);

  const calcHeight = useMemo(() => {
    if (data?.description && data?.workingHours?.length > 0) {
      return 580;
    }
    if (data?.description || data?.workingHours?.length > 0) {
      return 500;
    }
  }, [data]);

  const redirectToContrib = (URL: any) => {
    const link = URL.split('href="')[1].split('"')[0];
    Linking.openURL(link);
  };

  const renderAuthor = (item: any) => {
    const author = item?.split('">')[1]?.split("</a>")[0];
    return author;
  };

  if (!data) return null;

  
  return (
    <Modal
      animationType={"none"}
      transparent={true}
      statusBarTranslucent={true}
      visible={state.isOpen}
      // onRequestClose={closeCallBack}
    >
      <ClickOutsideProvider>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            height: SIZES.height,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-end",
              width: "95%",
              marginBottom: 15,
            }}
          >
            <TouchableOpacity style={styles.closeModal}>
              <CloseCircleIcon size="30" color="#fff" />
            </TouchableOpacity>
          </View>
          {/* @ts-ignore */}
          <ScrollView
            style={[
              styles.modalContent,
              {
                maxHeight: calcHeight ? calcHeight : 450,
              },
            ]}
            ref={ref}
            showsVerticalScrollIndicator={false}
          >
            <View style={{ flex: 1, borderRadius: 15, overflow: "hidden" }}>
              {data?.images?.length > 0 ? (
                <Swiper
                  activeDotColor="#fff"
                  style={[styles.wrapper]}
                  showsButtons={false}
                  loop={true}
                  dotColor="#949494"
                  automaticallyAdjustContentInsets
                  paginationStyle={{
                    position: "absolute",
                    justifyContent: "center",
                    left: 0,
                    top: 0,
                    height: 10,
                    marginHorizontal: 15,
                  }}
                  autoplay={true}
                  dotStyle={{
                    width: SIZES.width / data.images.length - 50,
                    height: 3,
                  }}
                  activeDotStyle={{
                    backgroundColor: "#fff",
                    width: SIZES.width / data.images.length - 15,
                    height: 3,
                  }}
                >
                  {data.images?.map((item, ind) => (
                    <View style={styles.imageWrapper}>
                      <Image
                        style={[styles.box]}
                        contentFit="cover"
                        source={
                          item?.url
                            ? {
                                uri: item?.url,
                              }
                            : require("../../../assets/no-image.png")
                        }
                        key={`slide-${ind}`}
                      ></Image>
                      {item?.html_attributions?.length > 0 && (
                        <TouchableOpacity
                          style={styles.attr}
                          activeOpacity={0.7}
                          onPress={() =>
                            redirectToContrib(item?.html_attributions[0])
                          }
                        >
                          <Text
                            numberOfLines={1}
                            style={{ color: "#fff", fontSize: 12 }}
                          >
                            {renderAuthor(item?.html_attributions[0])}
                          </Text>
                        </TouchableOpacity>
                      )}
                    </View>
                  ))}
                </Swiper>
              ) : (
                <Image
                  style={[styles.box]}
                  contentFit="cover"
                  source={require("../../../assets/no-image.png")}
                ></Image>
              )}

              <View style={styles.sightDetails}>
                <View style={styles.headingRow}>
                  <Text
                    style={[
                      styles.sightDetailsTitle,
                      {
                        fontSize: showDirection ? 20 : 24,
                      },
                    ]}
                  >
                    {data?.title}
                  </Text>

                  {showDirection ? (
                    <ShowDirectionButton data={data} />
                  ) : (
                    <Pressable
                      hitSlop={20}
                      style={[
                        styles.addToBucketButton,
                        {
                          backgroundColor: "#f2f2f2", // if this place is marked as favorate
                        },
                      ]}
                      disabled={isWishlistToggleLoading}
                      onPress={() =>
                        !isWishlistToggleLoading &&
                        handleAddToWishlist(
                          wishlistState &&
                            wishlistState.wishlists.some(
                              (i) => i.sight && i.sight.id === data.id
                            )
                        )
                      }
                    >
                      {isWishlistToggleLoading ? (
                        <ActivityIndicator color="#000" />
                      ) : wishlistState && wishlistState.wishlists.some((i) => i.sight && i.sight.id === data.id) ? (
                        <WishlistedIcon />
                      ) : (
                        <WishlistAddIcon />
                      )}
                    </Pressable>
                  )}
                </View>
                {data?.city ? (
                  <View style={styles.locationCity}>
                    <Mark size="15" color={COLORS.gray} />
                    <Text style={styles.locationCityText}>{data?.city}</Text>
                  </View>
                ) : null}

                <View style={styles.ratingWrapper}>
                  <Text style={styles.type}>{data.category}</Text>
                  <View
                    style={{
                      position: "relative",
                      top: -1,
                      opacity: 0.8,
                      marginLeft: 5,
                    }}
                  >
                    <StarIcon size={15} color="#FFBC3E" />
                  </View>
                  <Text style={styles.ratingText}>{data.rate}</Text>
                </View>

                {data?.description ? (
                  <Text style={styles.sightDetailsDescription}>
                    {data?.description}
                  </Text>
                ) : null}

                {data.address ? (
                  <TouchableOpacity
                    activeOpacity={0.7}
                    style={{
                      flexDirection: "row",
                      marginBottom: 15,
                      backgroundColor: "#f2f2f2",
                      padding: 15,
                      borderRadius: 10,
                    }}
                    onPress={() => openMap(data.address)}
                  >
                    <TripLocationIcon color={COLORS.primaryDark} size="16" />
                    <Text style={styles.address}>{data.address}</Text>
                  </TouchableOpacity>
                ) : null}

                {data?.workingHours?.length > 0 && <HoursRow data={data} />}
              </View>
            </View>
          </ScrollView>
        </View>
      </ClickOutsideProvider>
    </Modal>
  );
};
export const styles = StyleSheet.create({
  modalContent: {
    backgroundColor: "#fff",
    width: "95%",
    borderRadius: 15,
  },
  imageWrapper: {
    width: "100%",
    position: "relative",
    backgroundColor: "#f2f2f2",
  },
  attr: {
    position: "absolute",
    right: 15,
    bottom: 25,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    borderRadius: 50,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 5,
    paddingHorizontal: 10,
    maxWidth: 100,
  },
  headingRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 0,
  },
  locationCity: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
    marginBottom: 5,
  },
  locationCityText: {
    marginLeft: 5,
    fontSize: 16,
    color: COLORS.gray,
    fontWeight: "500",
  },
  addToBucketButton: {
    width: 40,
    height: 40,
    borderRadius: 50,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  closeModal: {
    position: "relative",
    right: 0,
    top: 0,
    zIndex: 5,
  },
  address: {
    fontSize: 14,
    color: COLORS.gray,
    marginLeft: 5,
  },
  sightDetailsTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: COLORS.black,
    width: "60%",
  },
  type: {
    fontSize: 14,
    marginLeft: 0,
    color: COLORS.gray,
  },
  ratingWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
    marginBottom: 15,
  },
  ratingText: {
    fontSize: 14,
    marginLeft: 2,
    color: COLORS.gray,
  },
  sightDetailsDescription: {
    fontSize: 14,
    color: COLORS.black,
    marginBottom: 15,
  },
  sightDetails: {
    padding: 15,
  },
  box: {
    height: 300,
    overflow: "hidden",
  },
  wrapper: {
    position: "relative",
    height: 300,
  },
});
