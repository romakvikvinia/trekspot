import Constants from "expo-constants";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
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
import { COLORS, SIZES } from "../../../styles/theme";
import {
  BackIcon,
  ClockLinearIcon,
  DirectionLinearIcon,
  MichelinIcon,
  PhoneLinearIcon,
  StarIcon,
  WebsiteLinearIcon,
} from "../../../utilities/SvgIcons.utility";

const SWIPE_THRESHOLD = 20; // Center of the screen

interface TopSightDetailProps {
  visible: boolean;
  onClose?: () => void;
}

export const RestaurantDetail: React.FC<TopSightDetailProps> = ({
  visible,
  onClose,
  data,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const scale = useSharedValue(visible ? 1 : 0.9);
  const opacity = useSharedValue(visible ? 1 : 0);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  const [workingHoursVisible, setWorkingHoursVisible] = useState(false);

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
    }, 300));
  };

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

  
  useEffect(() => {
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [timeoutId]);

  const openMap = (
    location: { lat: number; lng: number },
    type: "google" | "apple",
    address: string
  ) => {
    const scheme = Platform.select({
      ios: type === "google" ? "comgooglemaps://?q=" : "maps://0,0?q=",
      android: "geo:0,0?q=",
    });
    const url = Platform.select({
      ios:
        type !== "google"
          ? `${scheme}${location.lat},${location.lng}`
          : `${scheme}${address}`,
      android: `${scheme}${location.lat},${location.lng}`,
    });

    Linking.openURL(url!);
  };

  const getOpenStatus = (openingHours: any) => {
    const currentTime = new Date();
    const currentDay = currentTime
      .toLocaleDateString("en-US", { weekday: "long" })
      .toLowerCase();
    const currentHour = currentTime.getHours();
    const currentMinute = currentTime.getMinutes();

    if (!openingHours[currentDay]) return false;

    const [openTime, closeTime] = openingHours[currentDay].split(" - ");
    const [openHour, openMinute] = openTime.split(":").map(Number);
    const [closeHour, closeMinute] = closeTime.split(":").map(Number);

    if (openHour === closeHour && openMinute === closeMinute) {
      return true;
    }

    return (
      currentHour > openHour ||
      (currentHour === openHour && currentMinute >= openMinute)
    );
  };

  const getTodayWorkingHours = (openingHours: any) => {
    const currentWeekDay = new Date()
      .toLocaleDateString("en-US", { weekday: "long" })
      .toLowerCase();
    const workingHours =
      openingHours[
        currentWeekDay?.charAt(0).toUpperCase() + currentWeekDay.slice(1)
      ];

    return workingHours;
  };

  const [mapUrl, setMapUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const apiKey = "AIzaSyDKZ8yCRk84OAV-57khymju5GI8Vhu4EGY";
  const icon = "https://i.ibb.co/N6qgNqh5/Group-612-2.png";
  useEffect(() => {
    const staticMapUrl = `https://maps.googleapis.com/maps/api/staticmap?center=41.7006,44.8083&zoom=14&size=600x300&scale=2&markers=icon:${icon}|41.7006,44.8083&style=feature:all|element:geometry.fill|color:0xf5f5f3&style=feature:water|color:0xc8e1e8&style=feature:landscape.natural.landcover|color:0xd2eca1&style=feature:road|element:geometry|color:0xffffff&style=feature:road|element:labels|visibility:on&style=feature:poi|visibility:off&style=feature:transit|visibility:off&key=${apiKey}
`;
    // const staticMapUrl2 = `https://api.mapbox.com/styles/v1/mapbox/light-v10/static/pin-s-attraction+285A98(41.7006,44.8083)/41.7006,44.8083,10/600x400?access_token=pk.eyJ1IjoiYWRvbyIsImEiOiJjbTk1cWtnMXExY3N3MmtxdHkyNnVhZXg0In0.hSTRiyKVew59zLeCbkoWwg&attribution=false&logo=false`;
    setMapUrl(staticMapUrl);
    setLoading(false);
  }, []);

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

  console.log("ddd", data);
  return (
    <>
      <StatusBar style="dark" />
      <Portal>
        <GestureDetector gesture={panGesture}>
          <Animated.View style={[styles.container, animatedStyle]}>
            <View style={[styles.header, isScrolled && styles.headerScrolled]}>
              <Pressable
                onPress={() => handleClose()}
                style={styles.backButton}
                hitSlop={20}
              >
                <BackIcon size="18" />
              </Pressable>
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
            </View>
            <Animated.ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: 50 }}
              onScroll={({ nativeEvent }) => {
                setIsScrolled(nativeEvent.contentOffset.y > 400);
              }}
            >
              <View style={[styles.swiperContainer, { height: 500 }]}>
                <Swiper
                  activeDotColor="#fff"
                  showsButtons={false}
                  loop={false}
                  dotColor="#949494"
                  automaticallyAdjustContentInsets
                  autoplay={true}
                  paginationStyle={{
                    position: "absolute",
                    justifyContent: "flex-end",
                    paddingRight: 15,
                    bottom: 170,
                    display: "none",
                  }}
                >
                  {data?.images?.map((item, index) => (
                    <Image
                      source={{ uri: item.url }}
                      style={{
                        width: "100%",
                        height: 400,
                        backgroundColor: "#000",
                      }}
                      key={index}
                      priority="high"
                    />
                  ))}
                </Swiper>
                <LinearGradient
                  // Button Linear Gradient
                  colors={[
                    "rgba(0,0,0, 0.01)",
                    "rgba(0,0,0, 1)",
                    "rgba(0,0,0, 1)",
                  ]}
                  style={styles.gradientContainer}
                >
                  <View>
                    <View style={styles.michelinContainer}>
                      <MichelinIcon />
                      <Text style={styles.michelinRating}>Michelin</Text>
                    </View>
                    <Text style={styles.title}>{data?.title}</Text>
                    <View style={styles.titleBottomRow}>
                      <View style={styles.rating}>
                        <View style={{ marginTop: -2 }}>
                          <StarIcon color="#FFBC3E" size={15} />
                        </View>
                        <Text style={styles.ratingnumber}>{data?.rating}</Text>
                      </View>
                      <Text style={{ color: "#fff" }}> · </Text>
                      <Text style={styles.text}>{data?.cuisine}</Text>
                      <Text style={{ color: "#fff" }}> · </Text>
                      {/* <Text style={styles.text}>{data?.dietaryOptions[0]}</Text> */}
                      {/* <Text style={{ color: "#fff" }}> · </Text> */}
                      <Text style={styles.text}>{data?.price}</Text>
                    </View>
                  </View>
                </LinearGradient>
              </View>
              <View style={styles.content}>
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
                                    data?.location,
                                    "google",
                                    data?.address
                                  ),
                                icon: null,
                                isDanger: false,
                              },
                              //@ts-expect-error
                              {
                                label: "Apple Maps",
                                onPress: () =>
                                  openMap(
                                    data?.location,
                                    "apple",
                                    data?.address
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
                                    data?.location,
                                    "google",
                                    data?.address
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
                            {data?.address}{" "}
                            <Text style={styles.more}>Direction</Text>
                          </Text>
                        </View>
                      )}
                    />
                  </View>
                  <View style={styles.row}>
                    <View style={styles.icon}>
                      <PhoneLinearIcon color="#000" size={25} />
                    </View>
                    <View style={styles.value}>
                      <Text style={styles.valueLabelText}>Phone</Text>
                      <Pressable
                        onPress={() =>
                          Linking.openURL(`tel:${data?.contact?.phone}`)
                        }
                        hitSlop={20}
                      >
                        <Text style={styles.valueDescriptionText}>
                          {data?.contact?.phone?.split(":")[1]}
                        </Text>
                      </Pressable>
                    </View>
                  </View>
                  <Pressable
                    onPress={() => setWorkingHoursVisible(true)}
                    style={styles.row}
                  >
                    <View style={styles.icon}>
                      <ClockLinearIcon color="#000" size={25} />
                    </View>
                    <View style={styles.value}>
                      <Text style={styles.valueLabelText}>Working Hours</Text>
                      <Text style={styles.descriptionText}>
                        {/* {getOpenStatus(data?.openingHours) ? (
                          "Open now"
                        ) : (
                          <Text style={styles.valueDescriptionText}>
                            <Text style={{ color: "red" }}>Closed</Text>{" "}
                            {getTodayWorkingHours(data?.openingHours)}
                          </Text>
                        )}{" "} */}
                        <Text style={styles.more}>More</Text>
                      </Text>
                    </View>
                  </Pressable>
                  <View style={styles.row}>
                    <View style={styles.icon}>
                      <WebsiteLinearIcon color="#000" size={25} />
                    </View>
                    <View style={styles.value}>
                      <Text style={styles.valueLabelText}>Website</Text>
                      <Pressable
                        onPress={() => Linking.openURL(data?.contact?.website)}
                        hitSlop={20}
                      >
                        <Text style={styles.valueDescriptionText}>
                          {data?.contact?.website}
                        </Text>
                      </Pressable>
                    </View>
                  </View>
                </View>
                <View style={styles.locationContainer}>
                  <Text style={styles.locationTitle}>Location</Text>
                  <Image source={{ uri: mapUrl }} style={{ width: "100%", height: 250, borderRadius: 10 }} />
                </View>
                <View
                  style={[
                    styles.descriptionRow,
                    {
                      paddingBottom: 25,
                    },
                  ]}
                >
                  <Text style={styles.descriptionTitle}>Details</Text>
                  <Pressable style={styles.showMoreButton}>
                    <Text style={styles.descriptionText} selectable>
                      {data?.description}
                    </Text>
                  </Pressable>
                </View>
              </View>
            </Animated.ScrollView>
          </Animated.View>
        </GestureDetector>
      </Portal>

      <Portal>
        {workingHoursVisible && (
          <View style={[StyleSheet.absoluteFillObject, styles.bg]}>
            <Animated.View style={[styles.contentCard]}>
              <Text style={styles.sectionTitle}>Working Hours</Text>
              <ScrollView style={styles.inner}>
                {Object.keys(data?.openingHours).map((item, index) => (
                  <View style={styles.workingHoursBox} key={index}>
                    <Text style={styles.workingHoursDay}>{item}</Text>
                    <Text style={styles.workingHoursTime}>
                      {data?.openingHours[item]}
                    </Text>
                  </View>
                ))}
              </ScrollView>
              <Pressable
                onPress={() => setWorkingHoursVisible(false)}
                style={styles.closeButton}
              >
                <Text style={styles.closeButtonText}>Close</Text>
              </Pressable>
            </Animated.View>
          </View>
        )}
      </Portal>
    </>
  );
};

const styles = StyleSheet.create({
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
  bg: {
    alignItems: "center",
    backgroundColor: "rgba(0,0,0, 0.4)",
    bottom: 0,
    justifyContent: "center",
    left: 0,
    position: "absolute",
    right: 0,
    top: 0,
    zIndex: 1,
  },
  closeButton: {
    backgroundColor: "#f2f2f2",
    borderRadius: 100,
    marginTop: 10,
    padding: 15,
    width: "100%",
  },
  closeButtonText: {
    color: COLORS.black,
    fontSize: 15,
    fontWeight: "500",
    textAlign: "center",
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
    paddingTop: 0
  },
  contentCard: {
    backgroundColor: "#fff",
    borderRadius: 15,
    elevation: 5,
    height: 400,
    justifyContent: "space-between",
    maxWidth: 500,
    minHeight: SIZES.height - 200,
    padding: 15,
    paddingRight: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    width: SIZES.width - 30,
    zIndex: 2,
  },
  descriptionRow: {
    marginTop: 25,
    width: "100%",
  },
  descriptionText: {
    color: "#000",
    fontSize: 14,
    fontWeight: "400",
    lineHeight: 20,
  },
  descriptionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
  },
  gradientContainer: {
    // alignItems: "flex-end",
    bottom: 0,
    height: "40%",
    justifyContent: "flex-end",
    left: 0,
    position: "absolute",
    right: 0,
    paddingHorizontal: 25,
    // backgroundColor: "red"
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
  headerScrolled: {
    backgroundColor: "#fff",
    width: "100%",
  },
  icon: {
    // height: 15,
    width: 50,
  },
  inner: {
    flex: 1,
    paddingRight: 10,
  },
  keyValues: {
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    marginTop: 25,
  },
  locationContainer: {
    marginTop: 25
  },
  locationTitle: {
    color: "#000",
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 10
  },
  michelinContainer: {
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: 5,
    flexDirection: "row",
    gap: 5,
    marginBottom: 10,
    padding: 5,
    width: 100,
  },
  michelinRating: {
    color: "#bd2333",
    fontSize: 14,
    fontWeight: "500",
    position: "relative",
    top: 1,
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
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
    marginLeft: 5
  },
  row: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "flex-start",
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 10,
  },
  showMoreButton: {
    alignItems: "flex-start",
    flexDirection: "row",
  },
  swiperContainer: {
    height: 600,
    position: "relative",
  },
  text: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "500",
    opacity: 1,
  },
  title: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "600",
    marginBottom: 10,
  },
  titleBottomRow: {
    alignItems: "center",
    // borderBottomColor: "#ccc",
    // borderBottomWidth: 1,
    flexDirection: "row",
    paddingBottom: 25,
    paddingTop: 5
  },
  value: {
    flex: 1,
  },
  valueDescriptionText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "500",
    maxWidth: "95%",
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
  },
  workingHoursBox: {
    borderBottomColor: "#f2f2f2",
    borderBottomWidth: 1,
    paddingBottom: 10,
    paddingTop: 10,
  },
  workingHoursDay: {
    color: "#000",
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 5,
  },
  workingHoursTime: {
    color: "#000",
    fontSize: 14,
    fontWeight: "400",
  },
});
