import { Platform, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { COLORS, SIZES } from "../../styles/theme";
import { useState } from "react";
import { Image } from "expo-image";
import { StarIcon, WheelChair } from "../../utilities/SvgIcons.utility";

const TABS  = ["Restaurants", "Clubs", "Rooftops", "Bars"];

const IMGS = [
  "https://lh5.googleusercontent.com/p/AF1QipM_IFXIjNs-IrGF9FrTVq6qKBmEzfNeVyc3KhYQ=s870-k-no", 
  "https://lh5.googleusercontent.com/p/AF1QipNeHv7osdSZnnZI9dtb9ZTzUEgF8RwKaXc0kTla=s870-k-no",
  "https://lh5.googleusercontent.com/p/AF1QipOF-JcEAshABRetGuFLMrnedxiv4g820gFlQou9=s1016-k-no"
]

export const FoodAndDrinkTab = ({ activeTab }) => {
  const [activeSubTab, setActiveSubTab] = useState("Restaurants");

  return (
    <View
      style={{
        display: activeTab === "Food" ? "flex" : "none",
        minHeight: SIZES.height,
        paddingBottom: 30
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

          {
            [0,1,2,3].map(i => (
              <View style={styles.item}>
              <ScrollView
                horizontal
                contentContainerStyle={{ paddingHorizontal: 15 }}
                showsHorizontalScrollIndicator={false}
              >
                {IMGS?.map((item, i) => (
                  <Pressable>
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
                      cachePolicy="memory-disk"
                    ></Image>
                  </Pressable>
                ))}
              </ScrollView>
              <Pressable style={styles.itemData}>
                <Text style={styles.title}>
                  Bless restaurant
                </Text>
                <View style={styles.detailsRow}>
                  <View style={styles.rating}>
                    <StarIcon color="#FFBC3E" size={15} />
                    <Text style={styles.ratingnumber}>4.5</Text>
                  </View>
                </View>
                <View style={styles.detailsRow}>
                  <Text style={styles.general}>
                    Asian
                  </Text>
                  <Text style={styles.general}>
                  · $$ ·
                  </Text>
                  <WheelChair color={COLORS.primary} />
                </View>
                <View style={styles.detailsRow}>
                  <Text style={[styles.general, {color: COLORS.green}]}>
                    Open
                  </Text>
                  <Text style={styles.general}>
                  · Closes 23:00
                  </Text>
                </View>
                <View style={[styles.detailsRow, {marginTop: 10}]}>
                  <Text style={styles.general}>
                    Creative asian dishes in a modern, light-filled space with sweeping views
                    of the city
                  </Text> 
                </View>
              </Pressable>
            </View>
            ))
          }
    </View>
  );
};

export const styles = StyleSheet.create({
  itemData: {
    paddingHorizontal: 15,
    marginTop: 15
  },
  ratingnumber: {
    fontSize: 14,
    marginLeft: 5,
    position: "relative",
    top: 1,
    fontWeight: "500"
  },
  rating: {
    flexDirection: "row",
    alignItems: "center",
  },
  detailsRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 3
  },
  general: {
    fontSize: 14,
    color: COLORS.darkgray,
    marginRight: 5
  },
  title: {
    color: COLORS.black,
    fontSize: 18,
    fontWeight: "500"
  },
  tabsWrapper: {
    marginTop: 0,
    shadowColor: "#000",
    backgroundColor: "#f8f8f8",
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
  item: {
    marginTop: 15,
    backgroundColor: "#fff",
    paddingVertical: 15
  },
  tabButton: {
    paddingVertical: 15,
    paddingHorizontal: 40
  },
  tabButtonText: {
    color: COLORS.darkgray,
    fontSize: 14,
    fontWeight: "600",
  },
  items: {
    width: "100%",
  },
  itemImage: {
    width: 140,
    height: 140,
    marginRight: 10,
    borderRadius: 15
  }
});