import Constants from "expo-constants";
import { Image } from "expo-image";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  Linking,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { Portal } from "react-native-portalize";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import Swiper from "react-native-swiper";

import { FloatingActionButton } from "../../../components/common/FloatingButtons";
import { useAppSelector } from "../../../package/store";
import { useAppDispatch } from "../../../package/store";
import {
  BackIcon,
  ClockLinearIcon,
  DirectionLinearIcon,
  StarIcon,
  WebsiteLinearIcon,
  WishlistAddIcon,
} from "../../../utilities/SvgIcons.utility";

const SWIPE_THRESHOLD = 20; // Center of the screen

interface TopSightDetailProps {
  visible: boolean;
  onClose?: () => void;
  showAddToTrip?: boolean;
}

const dataa = {
  description:
    "The Burj Khalifa, located in Dubai, United Arab Emirates, is the world's tallest building, standing at 828 meters (2,717 feet). Completed in 2010, it is an architectural marvel and a symbol of modern engineering. The tower features observation decks, luxury residences, hotels, and office spaces. It is a key attraction in Dubai, offering breathtaking views of the city skyline.",
  address:
    "1 Sheikh Mohammed bin Rashid Blvd, Downtown Dubai, Dubai, United Arab Emirates",
  openingHoursAsText:
    "Daily: 9:00 AM – 11:00 PM (Hours may vary during special events or holidays.)",
  ticketsAndPricing: {
    entryFees:
      "Prices start at approximately AED 169 ($46) for general admission to the 124th and 125th floors. Premium tickets to the 148th floor start at AED 399 ($109). Prices may vary based on time slots and experiences.",
    paymentMethods: "Cash, Credit/Debit Cards, Online Payments",
    whereToBuy:
      "Tickets can be purchased online via the official Burj Khalifa website, at on-site ticket counters, or through authorized travel agencies.",
  },
  tips: [
    "Visit during sunset for the best views but book tickets in advance as it gets crowded.",
    "Tripods are not allowed on observation decks, but handheld cameras and smartphones are permitted.",
    "There is a strict security check before entering, so avoid carrying large bags.",
    "Dress comfortably, as you may need to walk a lot inside the Dubai Mall to reach the entrance.",
    "Consider dining at the At.mosphere restaurant on the 122nd floor for a premium experience.",
  ],
  howToGetThere:
    "The Burj Khalifa is easily accessible via the Dubai Metro. Take the Red Line to Burj Khalifa/Dubai Mall Station and follow the pedestrian walkway to Dubai Mall. From there, signs will guide you to the entrance. Taxis and ride-hailing services like Uber and Careem are also convenient options.",
  officialWebsite: "https://www.burjkhalifa.ae",
  reviews: [
    {
      review:
        "The view from the 148th floor is absolutely breathtaking! A must-visit when in Dubai.",
      author: "Traveler from USA",
    },
    {
      review:
        "It’s an engineering marvel. The elevators are super fast, and the city looks stunning from the top!",
      author: "Traveler from Canada",
    },
    {
      review:
        "A bit pricey, but totally worth it. Try to go during sunset for the best experience.",
      author: "Traveler from Australia",
    },
  ],
};

export const TopSightDetail: React.FC<TopSightDetailProps> = ({
  visible,
  onClose,
  data,
  showAddToTrip = false
}) => {
  const dispatch = useAppDispatch();
  const [showMore, setShowMore] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const scale = useSharedValue(visible ? 1 : 0.9);
  const opacity = useSharedValue(visible ? 1 : 0);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    scale.value = withTiming(visible ? 1 : 0.9, { duration: 300 });
    opacity.value = withTiming(visible ? 1 : 0, { duration: 300 }); 
  }, [visible]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  const handleClose = () => {
    opacity.value = withTiming(0, { duration: 300 });
    scale.value = withTiming(0.9, { duration: 300 }); 
  
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
  
    setTimeoutId(setTimeout(() => {
      onClose?.();
      setIsScrolled(false);
      setShowMore(false);
    }, 300));
  };
  
  useEffect(() => {
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [timeoutId]);


  const openMap = (location: { lat: number; lng: number }, type: "google" | "apple", address: string) => {
    const scheme = Platform.select({
      ios: type === "google" ? "comgooglemaps://?q=" : "maps://0,0?q=",
      android: "geo:0,0?q=",
    });
    const url = Platform.select({
      ios: type !== "google" ? `${scheme}${location.lat},${location.lng}` : `${scheme}${address}`,
      android: `${scheme}${location.lat},${location.lng}`,
    });

    Linking.openURL(url!);
  };


  const wishlistState = useAppSelector((state) => state.wishlist);
  // const [fetchToggleWishlist, { isLoading: isWishlistToggleLoading }] =
  //   useToggleWishlistMutation();

  // const handleAddToWishlist = useCallback(
    // async (exists: boolean = false) => {
    //   try {
    //     if (exists) {
    //       dispatch(removeItemFromWishlist({ id: city.id!, city, sight: null }));
    //       Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    //     } else {
    //       dispatch(addItemIntoWishlist({ id: city.id!, city, sight: null }));
    //     }

    //     await fetchToggleWishlist({ city: city.id }).unwrap();

    //     if (!exists) Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    //   } catch (error) {
    //     // Reverse the action in case of an error
    //     if (exists) {
    //       dispatch(addItemIntoWishlist({ id: city.id!, city, sight: null }));
    //     } else {
    //       dispatch(removeItemFromWishlist({ id: city.id!, city, sight: null }));
    //     }

    //     toast.error("Something went wrong, please try later", {
    //       duration: 2000,
    //     });
    //   }
    // },
    // [dispatch, city]
  // );


  const translateX = useSharedValue(0);

  // Function to handle swipe completion (optional)
  const onSwipeComplete = () => {
    console.log('Swiped from left edge to center!');
     handleClose();
  };

  const panGesture = Gesture.Pan()
    .onBegin((event) => {
      // Check if the gesture starts near the left edge (optional)
      if (event.x < 20) {
        console.log('Started from left edge');
      }
    })
    .onUpdate((event) => {
      // Only allow rightward swipes (dx > 0)
      if (event.translationX > 0) {
        translateX.value = event.translationX;
      }
    })
    .onEnd((event) => {
      if (event.translationX > SWIPE_THRESHOLD) {
        // Swipe reached the center - trigger action
        runOnJS(onSwipeComplete)(); // Run JS callback
      }
      // Reset position with spring animation
      translateX.value = withSpring(0);
    });

  const [activeDay, setActiveDay] = useState(0);

  const days = [
    {
      id: 1,
      date: "2025-01-01",
    },
    {
      id: 2,
      date: "2025-01-02",
    },
  ];
 
  if (!visible) return null;

  console.log(data);

  const newData = {
    ...data,
    ...dataa,
  }

  console.log(newData);

  return (
    <>
      <StatusBar style="dark" />
      <Portal>
        <GestureDetector gesture={panGesture}>
          <Animated.View style={[styles.container, animatedStyle]}>
            <View style={[styles.header, isScrolled && styles.headerScrolled]}>
              <Pressable
                onPress={() => handleClose()}
                hitSlop={20}
                style={({ pressed }) => [
                  styles.backButton,
                  {
                    opacity: pressed ? 0.5 : 1,
                  },
                ]}
              >
                <BackIcon size="18" />
              </Pressable>
              <View style={styles.headerRight}>
                {showAddToTrip && (
                  <FloatingActionButton
                    withHeader={true}
                    title="Select dates"
                    //@ts-expect-error ///
                  buttons={days.map((day, i) => ({
                    label: day.date,
                    onPress: () => setActiveDay(i),
                    icon: null,
                    isDanger: false,
                    isActive: day.id === days[activeDay]?.id,
                  }))}
                  //@ts-expect-error ///
                  renderTrigger={() => (
                    <View style={styles.addTripButton} hitSlop={20}>
                      <Text style={styles.addTripText}>
                        {false ? "Remove from trip" : "Add to trip"}
                      </Text>
                    </View>
                  )}
                />
                )}
                <Pressable
                  hitSlop={20}
                  style={({ pressed }) => [
                    styles.addToBucketButton,
                    {
                      opacity: pressed ? 0.5 : 1,
                    },
                  ]}
                  // disabled={isWishlistToggleLoading}
                  // onPress={() =>
                  //   !isWishlistToggleLoading &&
                  //   handleAddToWishlist(
                  //     wishlistState &&
                  //       wishlistState.wishlists.some(
                  //         (i) => i.city && i.city.id === city.id
                  //       )
                  //   )
                  // }
                >
                  {/* {isWishlistToggleLoading ? (
                  <ActivityIndicator color="#000" />
                ) : wishlistState &&
                  wishlistState &&
                  wishlistState.wishlists.some(
                    (i) => i.city && i.city.id === city.id
                  ) ? (
                    <WishlistedIcon size={20} color="#000" />
                ) : (
                  <WishlistAddIcon size={18} />
                )} */}
                  <WishlistAddIcon size={18} />
                </Pressable>
              </View>
            </View>
            <Animated.ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: 50 }}
              onScroll={({ nativeEvent }) => {
                setIsScrolled(nativeEvent.contentOffset.y > 400);
              }}
            >
              <View style={styles.swiperContainer}>
                <Swiper
                  activeDotColor="#fff"
                  showsButtons={false}
                  loop={false}
                  dotColor="#949494"
                  automaticallyAdjustContentInsets
                  paginationStyle={{
                    position: "absolute",
                    justifyContent: "center",
                    paddingRight: 0,
                    bottom: 16,
                  }}
                >
                  {newData?.images?.map((item, index) => (
                    <Image
                      source={{ uri: item.url }}
                      style={{
                        width: "100%",
                        height: 500,
                        backgroundColor: "#ccc",
                      }}
                      key={index}
                      priority="high"
                    />
                  ))}
                </Swiper>
              </View>
              <View style={styles.content}>
                <Text style={styles.title}>{data?.title}</Text>
                <View style={styles.titleBottomRow}>
                  <View style={styles.rating}>
                    <View style={{ marginTop: -2 }}>
                      <StarIcon color="#FFBC3E" size={15} />
                    </View>
                    <Text style={styles.ratingnumber}>{newData.rate}</Text>
                  </View>
                  <Text> · </Text>
                  <Text style={styles.text}>{newData.category}</Text>
                  <Text> · </Text>
                  <Text style={styles.text}>{newData.city}</Text>
                </View>
                <View style={styles.keyValues}>
                  <View style={styles.row}>
                    <View style={styles.icon}>
                      <DirectionLinearIcon color="#000" size={25} />
                    </View>
                    <FloatingActionButton
                      title="Open with"
                      buttons={
                        Platform.OS === "ios"
                          ? [
                              //@ts-expect-error
                              {
                                label: "Google Maps",
                                onPress: () =>
                                  openMap(
                                    newData.location,
                                    "google",
                                    newData.address
                                  ),
                                icon: null,
                                isDanger: false,
                              },
                              //@ts-expect-error
                              {
                                label: "Apple Maps",
                                onPress: () =>
                                  openMap(
                                    newData.location,
                                    "apple",
                                    newData.address
                                  ),
                                icon: null,
                                isDanger: false,
                              },
                            ]
                          : [
                              //@ts-expect-error
                              {
                                label: "Google Maps",
                                onPress: () =>
                                  openMap(
                                    newData.location,
                                    "google",
                                    newData.address
                                  ),
                                icon: null,
                                isDanger: false,
                              },
                            ]
                      }
                      renderTrigger={() => (
                        <View style={styles.value}>
                          <Text style={styles.valueLabelText}>Address</Text>
                          <Text style={styles.valueText}>
                            {newData.address}{" "}
                            <Text style={styles.more}>Direction</Text>
                          </Text>
                        </View>
                      )}
                    />
                  </View>
                  <View style={styles.row}>
                    <View style={styles.icon}>
                      <ClockLinearIcon color="#000" size={25} />
                    </View>
                    <View style={styles.value}>
                      <Text style={styles.valueLabelText}>Working Hours</Text>
                      <Text style={styles.highlighteddescriptionText}>
                        {newData.openingHoursAsText}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.row}>
                    <View style={styles.icon}>
                      <WebsiteLinearIcon color="#000" size={25} />
                    </View>
                    <View style={styles.value}>
                      <Text style={styles.valueLabelText}>Website</Text>
                      <Pressable
                        onPress={() => Linking.openURL(newData.officialWebsite)}
                      >
                        <Text style={styles.highlighteddescriptionText}>
                          {newData.officialWebsite}
                        </Text>
                      </Pressable>
                    </View>
                  </View>
                </View>
                <View
                  style={[
                    styles.descriptionRow,
                    {
                      borderBottomColor: "#ccc",
                      borderBottomWidth: 1,
                      paddingBottom: 25,
                    },
                  ]}
                >
                  <Text style={styles.descriptionTitle}>General Information</Text>
                  <Text style={[styles.descriptionSubTitle, { marginTop: 0 }]}>
                    How to get there?
                  </Text>
                  <Pressable
                    style={styles.showMoreButton}
                    onPress={() => setShowMore(!showMore)}
                  >
                    <Text style={styles.descriptionText} selectable>
                      {newData.howToGetThere.slice(0, showMore ? undefined : 80)}
                      {!showMore && (
                        <>
                          ...<Text style={styles.showMore}> Show more</Text>
                        </>
                      )}
                    </Text>
                  </Pressable>
                  {showMore && (
                    <Pressable onPress={() => setShowMore(!showMore)}>
                      <Text style={styles.descriptionSubTitle}>Entree Fees</Text>
                      <Text style={styles.descriptionText} selectable>
                        {newData.ticketsAndPricing.entryFees}
                      </Text>
                      <Text style={styles.descriptionSubTitle}>
                        Payment Methods
                      </Text>
                      <Text style={styles.descriptionText} selectable>
                        {newData.ticketsAndPricing.paymentMethods}
                      </Text>
                      <Text style={styles.descriptionSubTitle}>Where to buy</Text>
                      <Text style={styles.descriptionText} selectable>
                        {newData.ticketsAndPricing.whereToBuy}
                      </Text>
                      <Text style={styles.descriptionSubTitle}>
                        Important Tips
                      </Text>
                      {newData.tips.map((item, index) => (
                        <Text
                          key={index}
                          style={styles.descriptionText}
                          selectable
                        >
                          - {item}
                        </Text>
                      ))}
                    </Pressable>
                  )}
                </View>
                <View style={styles.reviews}>
                  <Text style={styles.descriptionTitle}>Reviews</Text>
                  <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {newData.reviews.map((item, index) => (
                      <View key={index} style={styles.review}>
                        <Text style={styles.reviewText}>
                          &quot;{item.review}&quot; -{" "}
                          <Text style={styles.reviewAuthor}>{item.author}</Text>
                        </Text>
                      </View>
                    ))}
                  </ScrollView>
                </View>
                <View style={styles.descriptionRow}>
                  <Text style={styles.descriptionTitle}>About</Text>
                  <Text style={styles.descriptionText}>
                    {newData.description}
                  </Text>
                </View>
              </View>
            </Animated.ScrollView>
          </Animated.View>
        </GestureDetector>
      </Portal>
    </>
  );
};

const styles = StyleSheet.create({
  addToBucketButton: {
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 30,
    display: "flex",
    height: 40,
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 1.84,
    width: 40,
    ...Platform.select({
      android: {
        elevation: 2,
      },
    }),
  },
  addTripButton: {
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 30,
    display: "flex",
    height: 40,
    justifyContent: "center",
    paddingHorizontal: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 1.84,
    ...Platform.select({
      android: {
        elevation: 2,
      },
    }),
    marginRight: 15
  },
  addTripText: {
    color: "#000",
    fontSize: 14,
    fontWeight: "500",
  },
  backButton: {
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 30,
    display: "flex",
    height: 40,
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 1.84,
    width: 40,
    ...Platform.select({
      android: {
        elevation: 2,
      },
    }),
  },
  container: {
    backgroundColor: "#fff",
    borderRadius: 10,
    height: "100%",
    padding: 0,
    width: "100%",
  },
  content: {
    padding: 20,
  },
  descriptionRow: {
    marginTop: 25,
    width: "100%",
  },
  descriptionSubTitle: {
    color: "#000",
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 5,
    marginTop: 15,
  },
  descriptionText: {
    color: "#000",
    fontSize: 14,
    fontWeight: "400",
    lineHeight: 20,
    maxWidth: "95%",
  },
  descriptionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
  },
  header: {
    alignItems: "flex-start",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
    paddingTop: Platform.OS === "android" ? Constants?.statusBarHeight + 5 : 60,
    position: "absolute",
    width: "100%",
    zIndex: 1,
  },
  headerRight: {
    alignItems: 'center',
    flexDirection: "row",
  },
  headerScrolled: {
    backgroundColor: "#fff",
    width: "100%",
  },
  highlighteddescriptionText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "500",
    lineHeight: 20,
    maxWidth: "95%",
  },
  icon: {
    // height: 15,
    width: 50,
  },
  keyValues: {
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    marginTop: 25,
  },
  more: {
    color: "#000",
    fontSize: 14,
    fontWeight: "600",
    textDecorationLine: "underline",
  },
  rating: {
    alignItems: "center",
    flexDirection: "row",
  },
  ratingnumber: {
    fontSize: 14,
    fontWeight: "600",
    marginLeft: 5,
  },
  review: {
    borderColor: "#ccc",
    borderRadius: 10,
    borderWidth: 1,
    marginRight: 10,
    padding: 10,
    width: 200,
  },
  reviewAuthor: {
    color: "#000",
    fontSize: 14,
    fontWeight: "400",
    opacity: 0.7,
  },
  reviewText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "600",
    lineHeight: 25,
  },
  reviews: {
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    paddingBottom: 25,
    paddingTop: 25,
  },
  row: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "flex-start",
    marginBottom: 25,
  },
  showMore: {
    color: "#000",
    fontSize: 14,
    fontWeight: "600",
    opacity: 1,
    textDecorationLine: "underline"
  },
  showMoreButton: {
    alignItems: "flex-start",
    flexDirection: "row",
  },
  swiperContainer: {
    height: 500,
    position: "relative",
  },
  text: {
    color: "#000",
    fontSize: 14,
    fontWeight: "500",
  },
  title: {
    fontSize: 28,
    fontWeight: "600",
    marginBottom: 10,
  },
  titleBottomRow: {
    alignItems: "center",
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    flexDirection: "row",
    paddingBottom: 25,
  },
  value: {
    flex: 1
  },
  valueLabelText: {
    color: "#000",
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 5,
    opacity: 0.7,
  },
  valueText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "500",
    maxWidth: "95%",
    opacity: 0.7,
  },
});
