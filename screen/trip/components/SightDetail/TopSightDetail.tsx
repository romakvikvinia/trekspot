import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  Linking,
  Pressable,
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

import {
  WebsiteLinearIcon,
} from "../../../../utilities/SvgIcons.utility";
import { About } from "./About";
import { Address } from "./Address";
import { HeaderContent } from "./HeaderContent";
import { HeadingSection } from "./HeadingSection";
import { LocationSection } from "./LocationSection";
import { Slider } from "./Slider";
import { styles } from "./styles";
import { WorkingHours } from "./WorkingHours";
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

const newD = {
  name: "Tower Bridge",
  mustVisit: "true",
  description:
    "Tower Bridge is one of London's most iconic landmarks, completed in 1894 as a combined bascule and suspension bridge over the River Thames. Designed to ease road traffic while maintaining river access to the Pool of London docks, it represents a masterpiece of Victorian engineering. The bridge is not only a vital part of London’s transport system but also a major tourist attraction featuring a glass-floored walkway and exhibitions inside its towers. It has witnessed historic events, including the 2012 Olympic Games when the Olympic Rings were suspended from it.",
  address: "Tower Bridge Rd, London, England, SE1 2UP, United Kingdom",
  facts: [
    "The bridge was officially opened on 30 June 1894 by the Prince of Wales.",
    "It takes about five minutes for the bridge to open to allow ships to pass.",
    "The high-level walkways and glass floors offer panoramic views of London.",
    "The bascules are raised around 800 times a year.",
    "The bridge connects the Tower of London on the north bank with Southwark on the south.",
  ],
  bestTimeToVisit:
    "April to October is ideal due to mild weather and longer daylight. Early mornings or weekdays offer fewer crowds. Special light shows are often held around Christmas and New Year.",
  website: "https://www.towerbridge.org.uk/",
  phone: "+44 20 7403 3761",
  open24Hours: "false",
  isClosed: "false",
  tips: [
    "Arrive early or book tickets online to avoid queues, especially during summer holidays.",
    "The glass walkway may not be suitable for those with vertigo — consider this before visiting.",
    "Photography is allowed inside but tripods and drones are not permitted.",
  ],
  howToGetThere: [
    "Take the London Underground to Tower Hill Station (District or Circle Line), then walk 5 minutes to the bridge.",
    "Use London Bus routes 15, 42, 78, 100 or RV1, which all stop nearby.",
    "From London Bridge Station, it's a 10–15 minute walk across the river.",
  ],
};



export const TopSightDetail: React.FC<TopSightDetailProps> = ({
  visible,
  onClose,
  data,
  showAddToTrip = false
}) => {

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

  const newData = {
    ...data,
    ...newD,
  }

  console.log(newData);

  return (
    <>
      <StatusBar style="dark" />
      <Portal>
        <GestureDetector gesture={panGesture}>
          <Animated.View style={[styles.container, animatedStyle]}>
            <View style={[styles.header, isScrolled && styles.headerScrolled]}>
              <HeaderContent
                handleClose={handleClose}
                showAddToTrip={showAddToTrip}
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
              <Slider newData={newData} />

              <View style={styles.content}>
                <HeadingSection data={data} newData={newData} />

                <View style={styles.keyValues}>
                  <Address newData={newData} />

                  <WorkingHours newData={newData} />

                  {newData?.website && (
                    <Pressable
                      style={({ pressed }) => [
                        styles.row,
                        { marginBottom: 0, opacity: pressed ? 0.5 : 1 },
                      ]}
                      onPress={() => Linking.openURL(newData?.website)}
                    >
                      <View style={styles.icon}>
                        <WebsiteLinearIcon color="#000" size={25} />
                      </View>
                      <View style={styles.value}>
                        <Text style={styles.valueLabelText}>Website</Text>
                        <View>
                          <Text style={styles.highlighteddescriptionText}>
                            {newData?.website}
                          </Text>
                        </View>
                      </View>
                    </Pressable>
                  )}
                </View>

                <View style={styles.rowItem}>
                  <View style={styles.rowHeader}>
                    <Text style={styles.rowHeaderText}>Good to know</Text>
                  </View>

                  <View style={styles.facts}>
                    <Text style={styles.factsTitle}>💡Facts</Text>
                    {newData?.facts.map((item, index) => (
                      <Text key={index} style={styles.factText}>
                        - {item}
                      </Text>
                    ))}
                  </View>

                  <View style={[styles.facts, { marginTop: 25 }]}>
                    <Text style={styles.factsTitle}>🌞When to visit</Text>
                    <Text style={styles.factText}>
                      {newData?.bestTimeToVisit}
                    </Text>
                  </View>
                </View>

                <LocationSection data={newData} />

                <About newData={newData} />
              </View>
            </Animated.ScrollView>
          </Animated.View>
        </GestureDetector>
      </Portal>
    </>
  );
};

