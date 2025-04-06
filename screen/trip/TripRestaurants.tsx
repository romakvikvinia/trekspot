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
import { useState } from "react";

import { FloatingActionButton } from "../../components/common/FloatingButtons";
import { globalStyles } from "../../styles/globalStyles";
import { COLORS } from "../../styles/theme";
import { BackIcon, DownIcon, MichelinIcon } from "../../utilities/SvgIcons.utility";
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


export const TripRestaurants = () => {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState("all");
  const [activeCuisine, setActiveCuisine] = useState(null);
  const [restaurantDetailVisible, setRestaurantDetailVisible] = useState(null);
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
  console.log(restaurantData[0].images);

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
            paddingBottom: 15,
          }}
        >
          <Pressable
            style={[styles.tabButton, !activeCuisine && activeTab === "all" && styles.activeTab]}
            onPress={() => {setActiveTab("all"); setActiveCuisine(null);}}
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
                style={[
                  styles.tabButton,
                  activeCuisine && styles.activeTab, 
                ]}
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
                <DownIcon size="12" color={activeCuisine ? COLORS.white : COLORS.black} />
              </View>
            )}
          />
        </ScrollView>
      </View>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          paddingTop: 0,
          paddingHorizontal: 15,
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-between",
        }}
      >
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item, index) => (
          <Pressable key={index} style={styles.restaurantCard} onPress={() => setRestaurantDetailVisible(restaurantData[0])}>
            <Image
              style={styles.mainImage}
              source={{
                uri: images[index],
              }}
            ></Image>
            <View style={styles.metaContainer}>
              <View style={styles.michelinContainer}>
                <MichelinIcon /> 
                <Text style={styles.michelinRating}>Michelin</Text>
              </View>
              <Text style={styles.name}>Nabucco</Text>
              <View style={styles.meta}>
                <Text style={styles.rating}>★ 4.0 · </Text>
                <Text style={styles.type}>Italian</Text>
                <Text style={styles.price}>
                  {restaurantData[0].priceRange}
                </Text>
              </View>
              <View style={styles.workingHours}>
                <Text style={styles.workingHoursText}>
                  {index % 2 === 0 ?<Text style={[styles.statusText, {color: "green"}]}>Open now</Text>  : <Text style={[styles.statusText, {color: "red"}]}>Closed</Text>} - 10:00 AM - 10:00 PM
                </Text>
              </View>
            </View>
          </Pressable>
        ))}
      </ScrollView>
    </View>
    <RestaurantDetail visible={restaurantDetailVisible} data={restaurantDetailVisible} onClose={() => setRestaurantDetailVisible(null)} />
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
  categoryContainer: {
    marginTop: 15,
  },
  mainImage: {
    borderRadius: 10,
    height: 170,
    width: "100%",
  },
  meta: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 5,
  },
  metaContainer: {
    padding: 5,
    paddingVertical: 10,
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
  price: {
    color: "#666",
    fontSize: 14,
  },
  restaurantCard: {
    borderRadius: 10,
    marginHorizontal: 0,
    marginTop: 15,
    width: "48%",
  },
  safeArea: {
    backgroundColor: "#F2F2F7",
    flex: 1,
    paddingTop: Constants?.statusBarHeight + 15,
  },
  statusText: {
    color: "#666",
    fontSize: 14,
  },
  tabButton: {
    alignItems: "center",
    borderColor: "#ccc",
    borderRadius: 30,
    borderWidth: 1,
    flexDirection: "row",
    marginRight: 10,
    paddingHorizontal: 25,
    paddingVertical: 10,
  },
  tabContainer: {
  },
  tabText: {
    color: "#000",
    fontSize: 14,
    fontWeight: "500",
  },
  workingHours: {
    marginTop: 5,
  },
  workingHoursText: {
    color: "#666",
    fontSize: 14,
    fontWeight: "500",
    lineHeight: 20,
  }
});
