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
import { BackIcon, BibIcon, DownIcon, LocationPin, MichelinIcon } from "../../utilities/SvgIcons.utility";
import { Rating } from "./components/Rating";
import { RestaurantDetail } from "./components/RestaurantDetail";
 
 
const cuisine = [
  "Italian",
  "Japanese",
  "Mexican",
  "American",
  "Chinese",
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
 
 
  return (
    <>
      <View style={styles.safeArea}>
        <StatusBar style="dark" />
        <View style={[globalStyles.screenHeader, { borderBottomWidth: 0 }]}>
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
            paddingTop: 25,
            paddingHorizontal: 15,
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-between",
            paddingBottom: 25,
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
                <Text style={styles.name}>{item?.title}</Text>
                <View style={styles.meta}>
                  <Rating
                    data={{ rate: 4.5 }}
                    weight="500"
                    color={COLORS.darkgray}
                  />
                  <Text style={styles.metaText} numberOfLines={1}>
                    {" "}
                    · {item?.price} · {item?.cuisine}{" "}
                  </Text>
                </View>
                <View style={styles.workingHours}>
                  <Text
                    style={[styles.workingStatusText, { color: COLORS.green }]}
                  >
                    Open
                  </Text>
                  <Text style={styles.workingHoursText}>
                    {" "}
                    · Closes at 10:00 PM
                  </Text>
                </View>
                <View style={styles.address}>
                  <LocationPin color={COLORS.darkgray} width={12} />
                  <Text
                    style={styles.addressText}
                    numberOfLines={1}
                    ellipsizeMode="tail"
                  >
                    {item.address}
                  </Text>
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
    borderColor: "transparent"
  },
  activeTabText: {
    color: "#fff",
  },
  address: {
    alignItems: "center",
    flexDirection: "row",
    gap: 5,
    marginTop: 8,
  },
  addressText: {
    color: COLORS.darkgray,
    fontSize: 14,
    fontWeight: "500",
    lineHeight: 18
  },
  categoryContainer: {
    backgroundColor: "#fff",
    elevation: 5,
    marginTop: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.08, 
    shadowRadius: 3.84,
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
    marginTop: 8,
  },
  metaContainer: {
    flex: 1,
    padding: 5,
    paddingLeft: 15,
    paddingVertical: 10
  },
  metaText: {
    color: COLORS.darkgray,
    flex: 1,
    fontSize: 14,
    fontWeight: "500"
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
    flexDirection: "row",
    marginTop: 8,
  },
  workingHoursText: {
    color: "#666",
    fontSize: 14,
    fontWeight: "500",
    lineHeight: 20,
  },
  workingStatusText: {
    fontSize: 14,
    fontWeight: "500",
  }
});
