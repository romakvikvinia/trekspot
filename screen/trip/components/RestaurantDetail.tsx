import Constants from "expo-constants";
import { Image } from "expo-image";
import { StatusBar } from "expo-status-bar";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
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

import BottomSheetScrollView, { BottomSheetMethods } from "../../../common/Sheet";
import { FloatingActionButton } from "../../../components/common/FloatingButtons";
import { COLORS, SIZES } from "../../../styles/theme";
import {
  BackIcon,
  ClockLinearIcon,
  DirectionLinearIcon,
  ImagesIcon,
  MichelinIcon,
  PhoneLinearIcon,
  WebsiteLinearIcon,
} from "../../../utilities/SvgIcons.utility";
import { Rating } from "./Rating";

const SWIPE_THRESHOLD = 20; // Center of the screen

interface RestaurantDetailProps {
  visible: boolean;
  onClose?: () => void;
}

const dt = {
  id: 23443531,
  active: true,
  must_try: false,
  name: "Brunchit - Alicante",
  classification: ["One Star: High quality cooking"],
  link: "https://www.tripadvisor.com/Restaurant_Review-g1064230-d23443531-Reviews-Brunchit_Alicante-Alicante_Costa_Blanca_Province_of_Alicante_Valencian_Communit.html",
  reviews: 558,
  rating: 4.9,
  price_range_usd: "$$ - $$$",
  menu_link: "https://www.brunchit.es/carta",
  reservation_link: null,
  featured_image:
    "https://media-cdn.tripadvisor.com/media/photo-m/1280/2b/1b/6a/bf/brunchit-alicante.jpg",
  images: [
    {
      url: "https://axwwgrkdco.cloudimg.io/v7/__gmpics3__/eab0c832f38345dcb54e0beece5cae2a.jpg?w=1000&h=1000&org_if_sml=1",
      meta: {
        author: "Kristopher Lopez/Mixtli",
        alt: null,
        authorUrl: null,
      },
    },
    {
      url: "https://axwwgrkdco.cloudimg.io/v7/__gmpics3__/afec285edf354b75bf751c5169d015da.jpg?w=1000&h=1000&org_if_sml=1",
      meta: {
        author: "Kristopher Lopez/Mixtli",
        alt: null,
        authorUrl: null,
      },
    },
    {
      url: "https://axwwgrkdco.cloudimg.io/v7/__gmpics3__/280036fdf91c4764afb4f85b0e156fa2.jpeg?w=1000&h=1000&org_if_sml=1",
      meta: {
        author: "Sergio Galicia/Mixtli",
        alt: null,
        authorUrl: null,
      },
    },
  ],
  latitude: 38.363495,
  longitude: -0.429279,
  has_delivery: false,
  cuisines: ["Cafe", "International", "Mediterranean", "Healthy"],
  description: null,
  email: "hello@brunchit.es",
  phone: "+34 911 08 94 46",
  website: "https://brunchit.es/restaurantes/brunchit-alicante/",
  ranking: {
    current_rank: 1,
    total: 1947,
  },
  address: "Av. De La Condomina, 40, 03540 Alicante Spain",
  detailed_address: {
    street: "Av. De La Condomina, 40",
    city: "Alicante",
    postal_code: "03540",
    state: null,
    country_code: "ES",
  },
  reviews_per_rating: {
    "1": 2,
    "2": 3,
    "3": 7,
    "4": 21,
    "5": 525,
  },
  review_keywords: [
    "pancakes",
    "amazing food",
    "brunch place",
    "big portions",
    "nice service",
    "salty",
    "waitress",
    "avocado",
    "yummy",
    "serving",
  ],
  is_open: true,
  open_hours: {
    sun: [
      {
        open: "09:00:00",
        close: "16:00:00",
      },
    ],
    mon: [
      {
        open: "09:00:00",
        close: "16:00:00",
      },
    ],
    tue: [
      {
        open: "09:00:00",
        close: "16:00:00",
      },
    ],
    wed: [
      {
        open: "09:00:00",
        close: "16:00:00",
      },
    ],
    thu: [
      {
        open: "09:00:00",
        close: "16:00:00",
      },
    ],
    fri: [
      {
        open: "09:00:00",
        close: "16:00:00",
      },
    ],
    sat: [
      {
        open: "09:00:00",
        close: "16:00:00",
      },
    ],
  },
  delivery_url: null,
  price_range: "$$ - $$$",
  diets: ["Vegetarian friendly", "Vegan options", "Gluten free options"],
  meal_types: ["Breakfast", "Lunch", "Brunch", "Drinks"],
  dining_options: [
    "Outdoor Seating",
    "Seating",
    "Highchairs Available",
    "Serves Alcohol",
    "Full Bar",
    "Wine and Beer",
    "Free Wifi",
    "Accepts Credit Cards",
    "Table Service",
    "Dog Friendly",
    "Family style",
    "Gift Cards Available",
  ],
  owner_types: [],
  top_tags: ["Mid-range", "Cafe", "International", "Vegetarian friendly"],
};

const AddToTripButton = () => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <View style={styles.addToTripButton}>
      {
        isLoading ? (
          <><ActivityIndicator size="small" color="#000" /><Text style={styles.addToTripText}>Adding...</Text></>
        ) : (
          <Text style={styles.addToTripText}>
            Add to trip
          </Text>
        )
      }
    </View>
  );
}; 
  
export const RestaurantDetail: React.FC<RestaurantDetailProps> = ({
  visible,
  onClose,
  data,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const scale = useSharedValue(visible ? 1 : 0.9);
  const opacity = useSharedValue(visible ? 1 : 0);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  const [workingHoursVisible, setWorkingHoursVisible] = useState(false);
  const bottomSheetRef3 = useRef<BottomSheetMethods>(null);

  const pressHandler3 = useCallback(() => {
    bottomSheetRef3.current?.expand();
  }, []);
  
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

    setTimeoutId(
      setTimeout(() => {
        onClose?.();
        setIsScrolled(false);
      }, 300)
    );
  };

  const translateX = useSharedValue(0);

  // Function to handle swipe completion (optional)
  const onSwipeComplete = () => {
    console.log("Swiped from left edge to center!");
    handleClose();
  };

  const panGesture = Gesture.Pan()
    .onBegin((event) => {
      // Check if the gesture starts near the left edge (optional)
      if (event.x < 20) {
        console.log("Started from left edge");
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
      date: "2025-01-01 - Milan",
    },
    {
      id: 2,
      date: "2025-01-02 - Berlin",
    },
  ];
  if (!visible) return null;

  console.log("ddd", dt);
  return (
    <>
      <StatusBar style="dark" />
      <Portal>
        <GestureDetector gesture={panGesture}>
          <Animated.View style={[styles.container, animatedStyle]}>
            <View style={[styles.header, isScrolled && styles.headerScrolled]}>
              <Pressable
                onPress={() => handleClose()}
                style={({ pressed }) => [
                  styles.backButton,
                  {
                    opacity: pressed ? 0.5 : 1,
                  },
                ]}
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
                  renderTrigger={() => <AddToTripButton />}
                />
             
            </View>
            <Animated.ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: 50 }}
              onScroll={({ nativeEvent }) => {
                setIsScrolled(nativeEvent.contentOffset.y > 400);
              }}
              bounces={false}
            >
              <View style={[styles.swiperContainer]}>
                <Swiper
                  activeDotColor="#fff"
                  showsButtons={false}
                  loop={true}
                  dotColor="#949494"
                  automaticallyAdjustContentInsets
                  autoplay={false}
                  paginationStyle={{
                    position: "absolute",
                    justifyContent: "center",
                    paddingRight: 0,
                    bottom: 15,
                  }}
                >
                  {data?.images?.map((item, index) => (
                    <Image
                      source={{ uri: item.url }}
                      style={{
                        width: "100%",
                        height: 500,
                        backgroundColor: "#000",
                      }}
                      key={index}
                      priority="high"
                    />
                  ))}
                </Swiper>
                <Pressable
                  style={styles.showAllButton}
                  hitSlop={20}
                  onPress={pressHandler3}
                >
                  <ImagesIcon width="15" color="#fff" />
                  <Text style={styles.showAllText}>Show all</Text>
                </Pressable>
              </View>
              <View style={styles.content}>
                <View style={styles.michelinContainer}>
                  <MichelinIcon />
                  <Text style={styles.michelinRating}>Michelin</Text>
                </View>
                <Text style={styles.title}>{data?.title}</Text>
                <View style={styles.titleBottomRow}>
                  <View style={styles.rating}>
                    <Rating
                      data={{ rate: dt?.rating }}
                      weight="500"
                      color={COLORS.black}
                    />
                  </View>
                  <Text style={{ color: "#000" }}> · </Text>
                  <Text style={styles.text}>
                    {dt?.cuisines?.slice(0, 2).join(", ")}
                  </Text>
                  <Text style={{ color: "#000" }}> · </Text>
                  {/* <Text style={styles.text}>{data?.dietaryOptions[0]}</Text> */}
                  {/* <Text style={{ color: "#fff" }}> · </Text> */}
                  <Text style={styles.text}>{dt?.price_range_usd}</Text>
                </View>
                <View style={styles.tags}>
                  {dt?.diets?.map((item, index) => (
                    <View style={styles.tag} key={index}>
                      <Text style={styles.tagText}>{item}</Text>
                    </View>
                  ))}
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
                  <Image
                    source={{ uri: mapUrl }}
                    style={{ width: "100%", height: 250, borderRadius: 10 }}
                  />
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
        <BottomSheetScrollView
          ref={bottomSheetRef3}
          snapTo={"100%"}
          backgroundColor={"white"}
          backDropColor={"black"}
        >
          <Text>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
            porta faucibus turpis, a auctor justo tempus vitae. Morbi
            pellentesque massa felis, vitae ultrices turpis condimentum eu.
            Aliquam nunc velit, volutpat sit amet lobortis at, cursus ac mauris.
            Donec ut augue tempor, facilisis erat sed, tempor tortor. Ut eget
            nibh ac felis vestibulum convallis. Donec iaculis efficitur orci, id
            ultricies dolor lacinia in. Duis quis lectus a purus ultricies
            tincidunt. Quisque condimentum turpis sed massa elementum, lacinia
            egestas nisi ultrices. Duis faucibus porta porta. Sed quam neque,
            sodales nec urna sit amet, scelerisque malesuada urna. Suspendisse
            commodo ex sed diam egestas tristique. Sed id odio massa. Donec non
            orci vel metus consectetur vehicula id ac metus. Nullam lorem ex,
            ullamcorper in efficitur et, varius vitae risus. Nullam imperdiet
            sapien sed ligula imperdiet, non rhoncus lectus vehicula.
            Suspendisse ultrices faucibus orci non feugiat. Fusce feugiat, dui a
            consectetur tincidunt, enim eros rhoncus quam, eu consectetur massa
            diam id ligula. Cras rutrum urna vitae orci viverra, at pharetra mi
            eleifend. Praesent iaculis nunc eget lacinia rhoncus. Nunc in
            ultrices eros, ut rutrum ex. Nunc sollicitudin condimentum faucibus.
            Ut hendrerit neque sed libero suscipit condimentum laoreet vitae
            dui. Pellentesque nec laoreet velit. Duis sollicitudin finibus odio.
            Vestibulum ut tellus sem. Suspendisse potenti. Nam ultricies in
            ipsum quis mollis. Morbi eleifend turpis sed magna feugiat feugiat.
            Integer cursus purus scelerisque, varius urna vel, pulvinar augue.
            Etiam ac mauris eu ante scelerisque tincidunt vel ut arcu. Nullam
            lacinia urna sit amet elementum vulputate. Fusce viverra lacus id
            elit laoreet, sit amet convallis dolor accumsan. Morbi laoreet
            volutpat mauris quis gravida. Nullam eget sapien eu dui mollis
            pharetra ac ut nunc. Integer vitae gravida lectus. Etiam sed
            eleifend diam, at egestas nisl. Morbi dictum quam quis velit
            placerat venenatis. Aliquam ut nibh non arcu cursus volutpat.
            Maecenas ultricies risus quis nunc facilisis, et sagittis ante
            maximus. Quisque at viverra diam. Nunc a convallis ligula. Nunc quis
            accumsan augue, lobortis ornare diam. Aenean euismod nunc sed luctus
            sollicitudin. Donec ultricies est ante. In gravida sed lectus eu
            hendrerit. Nam ut massa ullamcorper, gravida libero quis, varius
            augue. Sed faucibus, nibh non iaculis congue, eros lorem faucibus
            elit, id consequat justo felis ut nisi. Vivamus aliquet finibus
            elementum. In efficitur tellus nec sem malesuada, tristique
            malesuada felis rutrum. Nullam vel purus dolor. Quisque convallis
            porta velit, nec pulvinar eros mattis in. Etiam sit amet ultricies
            tortor. Duis sit amet ex sed ligula consectetur aliquet. Proin
            tincidunt viverra lobortis. Aenean ac commodo ante. Ut tincidunt ac
            ex a consectetur. Ut placerat, sem id suscipit finibus, mi libero
            malesuada lorem, tempus rutrum augue ex quis turpis. Morbi vel
            feugiat nulla, et pharetra tortor. Aenean sit amet sollicitudin
            tellus, sed commodo nisi. Curabitur fermentum, ligula sed vestibulum
            aliquet, elit metus lobortis est, in ullamcorper dui massa eget
            elit. Pellentesque in diam vulputate, tristique massa ac, aliquet
            ante. Fusce feugiat finibus pulvinar. Phasellus a velit justo. Cras
            nec nisl blandit, faucibus mauris consectetur, rhoncus metus.
            Suspendisse volutpat sapien sit amet auctor gravida. Proin sit amet
            risus rhoncus, pretium nibh et, consectetur eros. Praesent
            condimentum quis metus quis auctor. Duis venenatis, mi ut porttitor
            tempor, justo leo laoreet arcu, sit amet ullamcorper tortor velit
            vitae lacus. Aliquam non bibendum dui, vitae aliquet libero. Sed vel
            arcu nec sapien efficitur malesuada consectetur vitae lectus. Mauris
            euismod sed enim et elementum. Nulla ullamcorper aliquam mi eu
            lobortis. Etiam at auctor justo. In libero magna, commodo nec nunc
            ac, vestibulum pellentesque eros.
          </Text>
        </BottomSheetScrollView>
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
  addToTripButton: {
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 30,
    display: "flex",
    flexDirection: "row",
    gap: 5,
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
  addToTripText: {
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
    marginTop: 15,
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
    borderTopColor: "#ccc",
    borderTopWidth: 1,
    marginTop: 15,
    paddingTop: 15,
  },
  locationContainer: {
    marginTop: 25,
  },
  locationTitle: {
    color: "#000",
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 10,
  },
  michelinContainer: {
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: 5,
    flexDirection: "row",
    gap: 5,
    marginBottom: 10,
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
  showAllButton: {
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    borderRadius: 12,
    bottom: 10,
    flexDirection: "row",
    gap: 5,
    marginTop: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
    position: "absolute",
    right: 10
  },
  showAllText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "500",
  },
  showMoreButton: {
    alignItems: "flex-start",
    flexDirection: "row",
  },
  swiperContainer: {
    height: 500,
    position: "relative"
  },
  tag: {
    backgroundColor: "rgba(0, 0, 0, 0.05)",
    borderRadius: 100,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  tagText: {
    color: "#000",
    fontSize: 12,
    fontWeight: "500",
  },
  tags: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 5,
    marginBottom: 10,
  },
  text: {
    color: "#000",
    fontSize: 14,
    fontWeight: "500",
    opacity: 1,
  },
  title: {
    color: "#000",
    fontSize: 28,
    fontWeight: "600",
    marginBottom: 5,
  },
  titleBottomRow: {
    alignItems: "center",
    // borderBottomColor: "#ccc",
    // borderBottomWidth: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    paddingBottom: 15,
    paddingTop: 5,
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
