import { useNavigation } from "@react-navigation/native";
import { Image } from "expo-image";
import { useState } from "react";
import {
  Linking,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { COLORS, SIZES } from "../../styles/theme";
import { CallIcon, DirectionIcon, StarIcon, WheelChair } from "../../utilities/SvgIcons.utility";

const TABS = ["Restaurants", "Clubs", "Rooftops", "Bars"];

const IMGS = [
  "https://lh5.googleusercontent.com/p/AF1QipM_IFXIjNs-IrGF9FrTVq6qKBmEzfNeVyc3KhYQ=s870-k-no",
  "https://lh5.googleusercontent.com/p/AF1QipNeHv7osdSZnnZI9dtb9ZTzUEgF8RwKaXc0kTla=s870-k-no",
  "https://lh5.googleusercontent.com/p/AF1QipOF-JcEAshABRetGuFLMrnedxiv4g820gFlQou9=s1016-k-no",
];

export const FoodAndDrinkTab = ({ activeTab }) => {
  const navigation = useNavigation();

  const [activeSubTab, setActiveSubTab] = useState("Restaurants");

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

  return (
    <View
      style={{
        display: activeTab === "Food" ? "flex" : "none",
        minHeight: SIZES.height,
        paddingBottom: 30,
      }}
    >
      <View style={styles.tabsWrapper}>
        <ScrollView
          horizontal
          contentContainerStyle={{ paddingHorizontal: 15 }}
          showsHorizontalScrollIndicator={false}
        >
          {TABS?.map((item, i) => (
            <Pressable
              key={i}
              onPress={() => setActiveSubTab(item)}
              style={[styles.tabButton, { paddingLeft: 0 }]}
            >
              <Text
                style={[
                  styles.tabButtonText,
                  {
                    color: activeSubTab === item ? COLORS.primary : "#000",
                  },
                ]}
              >
                {item}
              </Text>
            </Pressable>
          ))}
        </ScrollView>
      </View>

      {[0, 1, 2, 3].map((itm, i) => (
        <View style={styles.item} key={i}>
          <ScrollView
            horizontal
            contentContainerStyle={{ paddingHorizontal: 15 }}
            showsHorizontalScrollIndicator={false}
          >
            {IMGS?.map((item, k) => (
              <Pressable key={k} onPress={() => navigation.navigate("RestaurantDetail")}>
                <Image
                  style={styles.itemImage}
                  source={
                    item
                      ? {
                          uri: item,
                        }
                      : require("../../assets/no-image.png")
                  }
                  contentFit="cover"
                  
                ></Image>
              </Pressable>
            ))}
          </ScrollView>
          <Pressable style={styles.itemData} onPress={() => navigation.navigate("RestaurantDetail")}>
            <Text style={styles.title}>Bless restaurant</Text>
            <View style={styles.detailsRow}>
              <View style={styles.rating}>
                <StarIcon color="#FFBC3E" size={15} />
                <Text style={styles.ratingnumber}>4.5</Text>
                <Text
                  style={[
                    styles.general,
                    { marginLeft: 5, position: "relative", top: 1 },
                  ]}
                >
                  Google
                </Text>
              </View>
            </View>
            <View style={styles.detailsRow}>
              <Text style={styles.general}>Asian</Text>
              <Text style={styles.general}>· $$ ·</Text>
              <WheelChair color={COLORS.primary} />
            </View>
            <View style={styles.detailsRow}>
              <Text style={[styles.general, { color: COLORS.green }]}>
                Open
              </Text>
              <Text style={styles.general}>· Closes 23:00</Text>
            </View>
            <View style={[styles.detailsRow, { marginTop: 10 }]}>
              <Text style={styles.general}>
                Creative asian dishes in a modern, light-filled space with
                sweeping views of the city
              </Text>
            </View>
          </Pressable>
          <View style={styles.buttons}>
            <Pressable style={styles.button} onPress={() => openMap("address")}>
              <DirectionIcon color={COLORS.primary} />
              <Text style={styles.buttonLabel}>
                Direction
              </Text>
            </Pressable>
            <Pressable style={styles.button} 
              // onPress={() => Linking.openURL(`tel:${phoneNumber}`)}
              >
              <CallIcon color={COLORS.primary} size={12} />
              <Text style={styles.buttonLabel}>
                Call
              </Text>
            </Pressable>
          </View>
        </View>
      ))}
    </View>
  );
};

export const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    backgroundColor: "#dceaff",
    borderRadius: 30,
    flexDirection: "row",
    height: 35,
    marginRight: 15,
    paddingHorizontal: 15,
    paddingVertical: 5
  },
  buttonLabel: {
    color: COLORS.primary,
    fontSize: 14,
    fontWeight: "500",
    marginLeft: 8
  },
  buttons: {
    alignItems: "center",
    flexDirection: "row",
    marginTop: 15,
    paddingHorizontal: 15
  },
  detailsRow: {
    alignItems: "center",
    flexDirection: "row",
    marginTop: 5,
  },
  general: {
    color: COLORS.darkgray,
    fontSize: 14,
    marginRight: 5,
  },
  item: {
    backgroundColor: "#fff",
    marginTop: 15,
    paddingVertical: 15,
  },
  itemData: {
    marginTop: 15,
    paddingHorizontal: 15,
  },
  itemImage: {
    borderRadius: 15,
    height: 140,
    marginRight: 10,
    width: 140,
  },
  rating: {
    alignItems: "center",
    flexDirection: "row",
  },
  ratingnumber: {
    color: COLORS.darkgray,
    fontSize: 14,
    fontWeight: "500",
    marginLeft: 5,
    position: "relative",
    top: 1
  },
  tabButton: {
    paddingHorizontal: 40,
    paddingVertical: 15,
  },
  tabButtonText: {
    color: COLORS.darkgray,
    fontSize: 14,
    fontWeight: "600",
  },
  tabsWrapper: {
    backgroundColor: "#f8f8f8",
    marginTop: 0,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 0.84,
    width: "100%",
    ...Platform.select({
      android: {
        elevation: 1,
      },
    }),
  },
  title: {
    color: COLORS.black,
    fontSize: 18,
    fontWeight: "500",
  },
});
