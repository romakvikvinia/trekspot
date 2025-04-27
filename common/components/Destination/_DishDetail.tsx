import Constants from "expo-constants";
import { Image } from "expo-image";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { Platform, Pressable, StyleSheet, Text, View } from "react-native";
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { Portal } from "react-native-portalize";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import Swiper from "react-native-swiper";

import { BackIcon, StarIcon } from "../../../utilities/SvgIcons.utility";


const SWIPE_THRESHOLD = 20; // Center of the screen
interface TopSightDetailProps {
  visible: boolean;
  onClose?: () => void;
}

const dataa = {
  category: "Pastry / Breakfast",
  allergyInfo: {
    contains: ["Gluten (wheat)", "Dairy (cheese, yogurt, butter)", "Eggs"],
    possibleAllergens: ["Nuts", "Sesame seeds"],
  },
  ingredients: [
    "400g filo pastry",
    "200g Bulgarian white cheese (sirene) or feta cheese",
    "3 eggs",
    "200g yogurt",
    "50g butter (melted)",
    "1/2 tsp baking soda (optional)",
  ],
  preparation: [
    "Preheat the oven to 180°C (350°F).",
    "In a bowl, mix eggs, crumbled white cheese, and yogurt.",
    "Grease a baking tray with melted butter.",
    "Layer filo sheets, brushing each one with butter, and spread some of the cheese mixture. Repeat until all ingredients are used.",
    "Optionally, roll the filo into spirals instead of layering.",
    "Bake for 30-40 minutes until golden brown.",
    "Serve warm, optionally with yogurt or Ayran (a yogurt-based drink).",
  ],
  variations: [
    {
      title: "Tikvenik",
      description: "A sweet version made with pumpkin and cinnamon.",
    },
    {
      title: "Spanachena Banitsa",
      description: "A variation filled with spinach and cheese.",
    },
    {
      title: "Meat Banitsa",
      description: "A version that includes minced meat.",
    },
  ],
  pairingRecommendations: [
    "Ayran (a salted yogurt drink)",
    "Boza (a fermented wheat drink)",
  ],
  costAvailability: {
    averagePrice: "$1 - $3 per piece",
    whereToFind: ["Street vendors", "Bakeries", "Local markets"],
  },
  culturalSignificance: [
    "New Year's Eve tradition: Some Banitsa versions contain fortune messages.",
    "Commonly eaten for breakfast with yogurt or Ayran.",
  ],
  localPronunciation: "Баница (Bahn-ee-tsa)",
  dietaryInfo: {
    vegetarianFriendly: true,
    veganFriendly: false,
    veganAlternatives:
      "Some bakeries offer vegan versions with plant-based cheese and no eggs.",
  },
  nutritionInfo: {
    estimatedCaloriesPerServing: 350,
    macronutrientsPerServing: {
      carbohydrates: "35g",
      proteins: "12g",
      fats: "18g",
    },
  },
  history:
    "Banitsa is a beloved Bulgarian dish, often served for breakfast or special occasions like New Year’s Eve, when people place lucky charms inside. It's made by layering thin filo pastry with a mixture of eggs, white cheese (sirene), and yogurt, then baking until golden and crispy. Banitsa has been a staple in Bulgarian cuisine for centuries, symbolizing warmth, family, and tradition.",
};

export const DishDetail: React.FC<TopSightDetailProps> = ({
  visible,
  onClose,
  data,
}) => {
  const scale = useSharedValue(visible ? 1 : 0.9);
  const opacity = useSharedValue(visible ? 1 : 0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  const [tab, setTab] = useState("General");

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
  
  useEffect(() => {
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [timeoutId]);
 
  const newData = { ...dataa, ...data };

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

  if (!visible) return null;

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
                <BackIcon size="18" color="#000" />
              </Pressable>
             
            </View>
            <Animated.ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: 50 }}
              onScroll={({ nativeEvent }) => {
                setIsScrolled(nativeEvent.contentOffset.y > 230);
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
                  <Image
                    source={{
                      uri: data?.url,
                    }}
                    style={{
                      width: "100%",
                      height: 350,
                      backgroundColor: "#ccc",
                    }}
                    priority="high"
                  />
                </Swiper>
              </View>
              <View style={styles.content}>
                <Text style={styles.title}>{data?.title}</Text>
                <View style={styles.titleBottomRow}>
                  <View style={styles.rating}>
                    <View style={{ marginTop: -2 }}>
                      <StarIcon color="#FFBC3E" size={15} />
                    </View>
                    <Text style={styles.ratingnumber}>4.3</Text>
                  </View>
                  <Text> · </Text>
                  <Text style={styles.text}>{newData.category}</Text>
                  <Text> · </Text>
                  <Text style={styles.text}>
                    🔥 {newData.nutritionInfo.estimatedCaloriesPerServing} kcal
                  </Text>
                </View>
                <View
                  style={[
                    styles.descriptionRow,
                    {
                      marginTop: 0,
                      padding: 15,
                      backgroundColor: "#f2f2f2",
                      borderRadius: 15,
                    },
                  ]}
                >
                  <Text
                    style={[styles.descriptionSubTitle, { marginBottom: 15 }]}
                  >
                    ⚠️ Allergy Information
                  </Text>
                  <View style={styles.row}>
                    <Text style={styles.rowvalue}>
                      <Text style={styles.rowkey}>Contains: </Text>
                      {newData.allergyInfo.contains.join(", ")}
                    </Text>
                  </View>
                  <View
                    style={[
                      styles.row,
                      {
                        marginTop: 10,
                      },
                    ]}
                  >
                    <Text style={styles.rowkey}>Possible allergens: </Text>
                    <Text style={styles.rowvalue}>
                      {newData.allergyInfo.possibleAllergens.join(", ")}
                    </Text>
                  </View>
                </View>

                <View style={styles.tabContainer}>
                  <Pressable
                    style={[
                      styles.tabButton,
                      tab === "General" && styles.tabButtonActive,
                    ]}
                    onPress={() => setTab("General")}
                  >
                    <Text
                      style={[
                        styles.tabButtonText,
                        tab === "General" && styles.tabButtonTextActive,
                      ]}
                    >
                      General
                    </Text>
                  </Pressable>
                  <Pressable
                    style={[
                      styles.tabButton,
                      tab === "Preparation" && styles.tabButtonActive,
                    ]}
                    onPress={() => setTab("Preparation")}
                  >
                    <Text
                      style={[
                        styles.tabButtonText,
                        tab === "Preparation" && styles.tabButtonTextActive,
                      ]}
                    >
                      Preparation
                    </Text>
                  </Pressable>
                  <Pressable
                    style={[
                      styles.tabButton,
                      tab === "History" && styles.tabButtonActive,
                    ]}
                    onPress={() => setTab("History")}
                  >
                    <Text
                      style={[
                        styles.tabButtonText,
                        tab === "History" && styles.tabButtonTextActive,
                      ]}
                    >
                      History
                    </Text>
                  </Pressable>
                </View>

                {tab === "General" && (
                  <>
                    <View style={[styles.divider, { marginTop: 15 }]}></View>
                    <Text style={styles.descriptionSubTitle}>Ingredients</Text>
                    {newData.ingredients.map((item, index) => (
                      <Text
                        key={index}
                        style={styles.descriptionText}
                        selectable
                      >
                        - {item}
                      </Text>
                    ))}
                    <View style={styles.divider}></View>
                    <Text style={styles.descriptionSubTitle}>Variations</Text>
                    {newData.variations.map((item, index) => (
                      <View
                        key={index}
                        style={[
                          styles.row,
                          {
                            marginTop: index === 0 ? 0 : 10,
                          },
                        ]}
                      >
                        <Text style={styles.rowvalue}>
                          <Text style={styles.rowkey}>{item.title}: </Text>{" "}
                          {item.description}
                        </Text>
                      </View>
                    ))}
                    <View style={styles.divider}></View>
                    <Text style={styles.descriptionSubTitle}>
                      Cost and Availability
                    </Text>
                    <View style={styles.row}>
                      <Text style={styles.rowvalue}>
                        <Text style={styles.rowkey}>Average Price: </Text>
                        {newData.costAvailability.averagePrice}
                      </Text>
                    </View>
                    <View style={[styles.row, { marginTop: 10 }]}>
                      <Text style={styles.rowvalue}>
                        <Text style={styles.rowkey}>Where to Find: </Text>
                        {newData.costAvailability.whereToFind.join(", ")}
                      </Text>
                    </View>
                    <View style={styles.divider}></View>
                    <Text style={styles.descriptionSubTitle}>
                      Cultural Significance
                    </Text>
                    {newData.culturalSignificance.map((item, index) => (
                      <Text
                        key={index}
                        style={styles.descriptionText}
                        selectable
                      >
                        - {item}
                      </Text>
                    ))}
                    <View style={styles.divider}></View>
                    <Text style={styles.descriptionSubTitle}>
                      Pairing Recommendations
                    </Text>
                    {newData.pairingRecommendations.map((item, index) => (
                      <Text
                        key={index}
                        style={styles.descriptionText}
                        selectable
                      >
                        - {item}
                      </Text>
                    ))}
                    <View style={styles.divider}></View>
                    <Text style={styles.descriptionSubTitle}>
                      Dietary Information
                    </Text>
                    <View style={styles.row}>
                      <Text style={styles.rowvalue}>
                        <Text style={styles.rowkey}>Vegetarian Friendly: </Text>
                        {newData.dietaryInfo.vegetarianFriendly ? "Yes" : "No"}
                      </Text>
                    </View>
                    <View style={[styles.row, { marginTop: 10 }]}>
                      <Text style={styles.rowvalue}>
                        <Text style={styles.rowkey}>Vegan Friendly: </Text>
                        {newData.dietaryInfo.veganFriendly ? "Yes" : "No"}
                      </Text>
                    </View>
                    <View style={styles.divider}></View>
                    <Text style={styles.descriptionSubTitle}>
                      Vegan Alternatives
                    </Text>
                    <Text style={styles.descriptionText}>
                      {newData.dietaryInfo.veganAlternatives}
                    </Text>
                  </>
                )}

                {tab === "Preparation" && (
                  <>
                    <View style={[styles.divider, { marginTop: 15 }]}></View>

                    <Text style={styles.descriptionSubTitle}>Preparation</Text>
                    {newData.preparation.map((item, index) => (
                      <Text
                        key={index}
                        style={styles.descriptionText}
                        selectable
                      >
                        {index + 1}. {item}
                      </Text>
                    ))}
                  </>
                )}

                {tab === "History" && (
                  <>
                    <View style={[styles.divider, { marginTop: 15 }]}></View>

                    <Text style={styles.descriptionSubTitle}>History</Text>
                    <Text style={styles.descriptionText}>
                      {newData.history}
                    </Text>
                  </>
                )}
              </View>
            </Animated.ScrollView>
          </Animated.View>
        </GestureDetector>
      </Portal>
    </>
  );
};

const styles = StyleSheet.create({
  backButton: {
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 30,
    display: "flex",
    height: 40,
    justifyContent: "center",
    width: 40,
    ...Platform.select({
      android: {
        elevation: 2,
      },
    }),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 1.84,
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
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
    marginTop: 0,
  },
  descriptionText: {
    color: "#000",
    fontSize: 14,
    fontWeight: "400",
    lineHeight: 20,
    marginBottom: 5,
  },
  divider: {
    marginTop: 25,
  },
  header: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
    paddingTop: Platform.OS === "android" ? Constants?.statusBarHeight + 5 : 60,
    position: "absolute",
    width: "100%",
    zIndex: 1,
  },
  headerRight: {
    position: "relative",
  },
  headerScrolled: {
    backgroundColor: "#fff",
    width: "100%",
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
  row: {
    alignItems: "flex-start",
    flexDirection: "row",
    marginTop: 0,
    maxWidth: "100%",
  },
  rowkey: {
    fontWeight: "600",
  },
  rowvalue: {
    color: "#000",
    fontSize: 14,
    fontWeight: "400",
  },
  swiperContainer: {
    height: 350,
    position: "relative",
  },
  tabButton: {
    // backgroundColor: "#fff",
    borderRadius: 8,
    flex: 1,
    padding: 10,
    textAlign: "center",
  },
  tabButtonActive: {
    backgroundColor: "#fff",
  },
  tabButtonText: {
    color: "#000",
    fontSize: 14,
    fontWeight: "500",
    textAlign: "center",
  },
  tabButtonTextActive: {
    color: "#000",
    fontWeight: "600",
  },
  tabContainer: {
    backgroundColor: "#f2f2f2",
    borderRadius: 10,
    // borderWidth: 1,
    flexDirection: "row",
    flex: 1,
    marginBottom: 10,
    marginTop: 25,
    overflow: "hidden",
    padding: 5,
    width: "100%",
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
    flexDirection: "row",
    paddingBottom: 25,
  },
});
