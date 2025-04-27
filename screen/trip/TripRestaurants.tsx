import Constants from "expo-constants";
import { Image } from "expo-image";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { enGB, registerTranslation } from "react-native-paper-dates";
registerTranslation("en", enGB);

import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";

import { MustTryBadge } from "../../common/components/MustTryBadge";
import { FloatingActionButton } from "../../components/common/FloatingButtons";
import { globalStyles } from "../../styles/globalStyles";
import { COLORS } from "../../styles/theme";
import { BackIcon, BibIcon, DownIcon, MichelinIcon } from "../../utilities/SvgIcons.utility";
import { RestaurantDetail } from "./components/RestaurantDetail";
 
const images = [
  "https://fastly.4sqi.net/img/general/original/1765922_9PT3muvAljh2FqPHiEOdyA6qDEumXGxBZQD02rRgpmM.jpg",
  "https://fastly.4sqi.net/img/general/original/120207330_gtXWXlO9qI5p5cFxFYXKuaAyHMe-VMtNRJ11tlCXzPk.jpg",
  "https://fastly.4sqi.net/img/general/original/17748785_3jxhJ8amihwcJIEboPdue8bBAf4aTwe0_chWFV1AchE.jpg",
  "https://fastly.4sqi.net/img/general/original/14665725_YC8cg7IylTVQfJP2GVklFHTPMTeQEJ4X22bIjHhtits.jpg",
  "https://fastly.4sqi.net/img/general/original/1765922_9PT3muvAljh2FqPHiEOdyA6qDEumXGxBZQD02rRgpmM.jpg",
];

const cuisine = [
  "Italian",
  "Japanese",
  "Mexican",
  "American",
  "Chinese",
];

const restaurantData = [
  {
    title: "La Table Cachée par Michel Roth",
    images: [
      {
        url: "https://fastly.4sqi.net/img/general/original/1765922_9PT3muvAljh2FqPHiEOdyA6qDEumXGxBZQD02rRgpmM.jpg",
        meta: {
          author: "Benoit",
          alt: "Benoit",
          authorUrl: "https://www.benoit-paris.com",
        }
      },
      {
        url: "https://axwwgrkdco.cloudimg.io/v7/__gmpics3__/80ac96d237704d1f9e7965ee3cc8b630.jpg?w=1200&h=1200&org_if_sml=1",
        meta: {
          author: "Benoit",
          alt: "Benoit",
          authorUrl: "https://www.benoit-paris.com",
        }
      },
      {
        url: "https://fastly.4sqi.net/img/general/original/1765922_9PT3muvAljh2FqPHiEOdyA6qDEumXGxBZQD02rRgpmM.jpg",
        meta: {
          author: "Benoit",
          alt: "Benoit",
          authorUrl: "https://www.benoit-paris.com",
        }
      }
    ],
    address: "20 rue Saint-Martin, Paris, 75004, France",
    reviews: 35664,
    type: ["Classic French", "Bistro", "Michelin Star"],
    cuisine: "French, European",
    establishedYear: 1912,
    ambience: "Cozy, Romantic, Casual",
    dietaryOptions: ["Vegetarian-friendly", "Vegan options", "Gluten-free available"],
    michelinRating: {
      stars: 1,
      description: "One Star: High quality cooking"
    },
    description: "This genuine Parisian bistro boasts its period Belle Époque interior with woodwork, copper pots, mirrors, and velvet banquettes. Proudly traditional, the menu features country produce with dishes like pâté en croûte, calf’s head with ravigote sauce, cassoulet, and millefeuille pastry.",
    price: "$$$$",
    facilities: ["Air conditioning", "Interesting wine list"],
    orderOnlineLink: "https://www.benoit-paris.com",
    serviceOptions: ["Dine-in", "Takeout", "Delivery"],
    rating: 4.0,
    averageCostPerPerson: "$50 - $100",
    awards: ["Michelin Guide Recommended", "Best French Bistro 2023"],
    extensions: {
      popularFor: ["Lunch", "Dinner", "Solo dining"],
      wheelchairAccessible: true,
      kidsFriendly: true,
      petFriendly: false,
      parking: ["Street Parking", "Valet Available"],
      timeSpent: "People typically spend up to 2.5 hours here",
      wifi: true,
      socialMedia: {
        instagram: "https://instagram.com/benoitparis",
        facebook: "https://facebook.com/benoitparis"
      },
      featuredVideos: ["https://youtube.com/watch?v=example"],
      paymentOptions: ["Credit Card", "Apple Pay", "Cash"],
    },
    contact: {
      phone: "+33 1 42 72 25 76",
      website: "https://www.benoit-paris.com"
    },
    reservation: {
      link: "https://www.sevenrooms.com/reservations/pinkmamma?venues=eastmamma,pinkmamma,obermamma,mammaprimiparis,bigloveparis,pizzeriapopolarebourse,libertinoparis",
      source: "sevenrooms.com"
    },
    menu: {
      link: "https://menu.bigmammagroup.com/pinkmamma",
      source: "menu.bigmammagroup.com"
    },
    openingHours: {
      Monday: "12:00-14:00, 19:00-22:00",
      Tuesday: "12:00-14:00, 19:00-22:00",
      Wednesday: "12:00-14:00, 19:00-22:00",
      Thursday: "12:00-14:00, 19:00-22:00",
      Friday: "12:00-14:00, 19:00-22:00",
      Saturday: "12:00-14:00, 19:00-22:00",
      Sunday: "12:00-14:00"
    },
    location: {
      latitude: 48.8594,
      longitude: 2.3470
    },
  }
];


const generateClassification = (classifications: string) => {
  const isBibGourmand = classifications?.some((classification) =>
    classification?.includes("Bib Gourmand")
  );

  const getMichelinStars = () => {
    let stars: number | false = false;

    classifications?.forEach((classification: string) => {
      const classificationItem = classification?.toLowerCase();

      if (classificationItem?.includes("one")) {
        stars = 1;
      }

      if (classificationItem?.includes("two")) {
        stars = 2;
      }

      if (classificationItem?.includes("three")) {
        stars = 3;
      }
    });
    if (stars) {
      return stars;
    }

    return false;
  };

  if (isBibGourmand) {
    return (
      <View style={styles.michelinContainer}>
        <BibIcon />
        <Text style={styles.michelinRating}>Bib Gourmand</Text>
      </View>
    );
  }

  if (getMichelinStars()) {
    return (
      <View style={styles.michelinContainer}>
        {getMichelinStars() === 1 ? (
          <MichelinIcon />
        ) : getMichelinStars() === 2 ? (
          <>
            <MichelinIcon />
            <MichelinIcon />
          </>
        ) : getMichelinStars() === 3 ? (
          <>
            <MichelinIcon />
            <MichelinIcon />
            <MichelinIcon />
          </>
        ) : (
          ""
        )}
        <Text style={styles.michelinRating}>Michelin</Text>
      </View>
    );
  }

  return null;
};


const LoadingRestaurantCard = () => {
  return (
    <View style={styles.restaurantCard}>
      <View style={[styles.mainImage, { backgroundColor: "#F2F2F7" }]}></View>
      <View style={{ flexDirection: "column", paddingLeft: 15, flex: 1 }}>
        <View
          style={{
            backgroundColor: "#F2F2F7",
            width: "60%",
            marginTop: 10,
            height: 20,
            borderRadius: 10,
          }}
        ></View>
        <View
          style={{
            backgroundColor: "#F2F2F7",
            width: "90%",
            marginTop: 15,
            height: 10,
            borderRadius: 10,
          }}
        ></View>
        <View
          style={{
            backgroundColor: "#F2F2F7",
            width: "70%",
            marginTop: 15,
            height: 10,
            borderRadius: 10,
          }}
        ></View>
        <View
          style={{
            backgroundColor: "#F2F2F7",
            width: "80%",
            marginTop: 15,
            height: 10,
            borderRadius: 10,
          }}
        ></View>
      </View>
    </View>
  );
};
  
export const TripRestaurants = () => {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState("all");
  const [activeCuisine, setActiveCuisine] = useState(null);
  const [restaurantDetailVisible, setRestaurantDetailVisible] = useState(null);
  const [restaurantData, setRestaurantData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("https://raw.githubusercontent.com/andshonia/rests/refs/heads/master/paris-65d20e299ad38f4276801032.json?=122");
      const data = await response.json();
      setRestaurantData(data.slice(0, 10));
      setLoading(false);
    };
    fetchData();
  }, []);

  console.log(restaurantData);
  // const openMap = (name: string) => {
  //   const scheme = Platform.select({
  //     ios: "maps://0,0?q=",
  //     android: "geo:0,0?q=",
  //   });
  //   const url = Platform.select({
  //     ios: `${scheme}${name}`,
  //     android: `${scheme}${name}`,
  //   });

  //   Linking.openURL(url);
  // };
 
  return (
    <>
      <View style={styles.safeArea}>
        <StatusBar style="dark" />
        <View style={globalStyles.screenHeader}>
          <Pressable
            onPress={() => navigation.goBack()}
            style={globalStyles.screenHeaderBackButton}
            hitSlop={20}
          >
            <BackIcon size="18" />
          </Pressable>

          <Text style={globalStyles.screenTitle}>Restaurants</Text>
          <TouchableOpacity
            style={globalStyles.screenHeaderBackButton}
          ></TouchableOpacity>
        </View>

        <View style={styles.categoryContainer}>
          <ScrollView
            horizontal
            style={styles.tabContainer}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              flexDirection: "row",
              paddingHorizontal: 15,
              paddingBottom: 10,
            }}
          >
            <Pressable
              style={[
                styles.tabButton,
                !activeCuisine && activeTab === "all" && styles.activeTab,
              ]}
              onPress={() => {
                setActiveTab("all");
                setActiveCuisine(null);
              }}
            >
              <Text
                style={[
                  styles.tabText,
                  !activeCuisine && activeTab === "all" && styles.activeTabText,
                ]}
              >
                All
              </Text>
            </Pressable>
            <Pressable
              style={[
                styles.tabButton,
                activeTab === "openNow" && styles.activeTab,
              ]}
              onPress={() => setActiveTab("openNow")}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === "openNow" && styles.activeTabText,
                ]}
              >
                Open now
              </Text>
            </Pressable>
            <FloatingActionButton
              withHeader={true}
              title="Select cuisine"
              //@ts-expect-error ///
              buttons={cuisine.map((cuisine, i) => ({
                label: cuisine,
                onPress: () => setActiveCuisine(cuisine),
                icon: null,
                isDanger: false,
                isActive: activeCuisine === cuisine,
              }))}
              //@ts-expect-error ///
              renderTrigger={() => (
                <View
                  style={[styles.tabButton, activeCuisine && styles.activeTab]}
                >
                  <Text
                    style={[
                      styles.tabText,
                      activeCuisine && styles.activeTabText,
                      {
                        marginRight: 5,
                      },
                    ]}
                  >
                    {activeCuisine || "Cuisine"}
                  </Text>
                  <DownIcon
                    size="12"
                    color={activeCuisine ? COLORS.white : COLORS.black}
                  />
                </View>
              )}
            />
          </ScrollView>
        </View>

        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{
            paddingTop: 15,
            paddingHorizontal: 15,
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-between",
          }}
        >
          {loading
            ? [...Array(8)].map((_, index) => (
                <LoadingRestaurantCard key={index} />
              ))
            : ""}
          {restaurantData.map((item, index) => (
            <Pressable
              key={index}
              style={styles.restaurantCard}
              onPress={() => setRestaurantDetailVisible(restaurantData[0])}
            >
              {Math.random() > 0.5 ? <MustTryBadge label="Must try" /> : ""}
              <Image
                style={styles.mainImage}
                source={{
                  uri: item?.images[0]?.url,
                }}
              ></Image>

              <View style={styles.metaContainer}>
                {item?.classification?.length > 0 &&
                  generateClassification(item?.classification)}
                <Text style={styles.name}>
                  {item?.title}
                </Text>
                <View style={styles.meta}>
                  <Text style={styles.rating}>
                    ★ 4.0 · {item?.price} · {item?.cuisine}{" "}
                  </Text>
                </View>
                <View style={styles.address}>
                  <Text style={styles.addressText}>{item.address}</Text>
                </View>
              </View>
            </Pressable>
          ))}
        </ScrollView>
      </View>
      <RestaurantDetail
        visible={restaurantDetailVisible}
        data={restaurantDetailVisible}
        onClose={() => setRestaurantDetailVisible(null)}
      />
    </>
  );
};

const styles = StyleSheet.create({
  activeTab: {
    backgroundColor: "#000",
  },
  activeTabText: {
    color: "#fff",
  },
  address: {
    marginTop: 5,
  },
  addressText: {
    fontSize: 14,
    lineHeight: 18
  },
  categoryContainer: {
    marginTop: 10,
  },
  mainImage: {
    borderRadius: 10,
    height: "100%",
    minHeight: 120,
    width: 120,
  },
  meta: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 5,
  },
  metaContainer: {
    flex: 1,
    padding: 5,
    paddingLeft: 15,
    paddingVertical: 10
  },
  michelinContainer: {
    alignItems: "center",
    flexDirection: "row",
    gap: 5,
    marginBottom: 5
  },
  michelinRating: {
    fontSize: 12,
    fontWeight: "bold",
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  }, 
  restaurantCard: {
    borderRadius: 10,
    flexDirection: "row",
    marginBottom: 15,
    marginHorizontal: 0,
    width: "100%"
  },
  safeArea: {
    backgroundColor: "#fff",
    flex: 1,
    paddingTop: Constants?.statusBarHeight + 15,
  }, 
  tabButton: {
    alignItems: "center",
    borderColor: "#ccc",
    borderRadius: 30,
    borderWidth: 1,
    flexDirection: "row",
    marginRight: 10,
    paddingHorizontal: 20,
    paddingVertical: 8,
  },
  tabContainer: {
  },
  tabText: {
    color: "#000",
    fontSize: 14,
    fontWeight: "500",
  },
  workingHours: {
    marginTop: 0,
  },
  workingHoursText: {
    color: "#666",
    fontSize: 14,
    fontWeight: "500",
    lineHeight: 20,
  }
});
