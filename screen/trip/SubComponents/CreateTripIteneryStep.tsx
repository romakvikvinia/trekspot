import * as Haptics from "expo-haptics";
import moment from "moment";
import { useCallback, useMemo } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import DraggableFlatList from "react-native-draggable-flatlist";
import Animated, {
  Easing,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import Svg, { Circle } from "react-native-svg";

import { COLORS } from "../../../styles/theme";
import { PlusIcon } from "../../../utilities/SvgIcons.utility";
import { MinusIcon } from "../../../utilities/SvgIcons.utility";
import { DraggableIcon } from "../../../utilities/SvgIcons.utility";

export const ItineraryCircle = ({ tripRange, calculateTotalNights }) => {
  const totalNights = moment(tripRange.endDate).diff(
    moment(tripRange.startDate),
    "days"
  );
  const currentNights = calculateTotalNights();
  const percentage =
    totalNights === 0 ? 0 : (currentNights / totalNights) * 100;

  const radius = 20; // radius of the circle
  const strokeWidth = 3; // width of the stroke
  const circumference = 2 * Math.PI * radius; // circumference of the circle

  // Calculate the stroke dash offset based on the percentage
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  // Determine the color based on whether the nights exceed the range
  const progressColor =
    currentNights > totalNights ? "#f44336" : COLORS.primary; // red if exceeded, green otherwise

  return (
    <View style={styles.rgHeader}>
      <Text
        style={[
          styles.titleH2,
          { fontSize: 14, marginBottom: 0, marginRight: 50 },
        ]}
      >
        Nights
      </Text>
      <View style={styles.circleContainer}>
        <Svg width="110" height="110">
          <Circle
            cx="55"
            cy="55"
            r={radius}
            stroke={currentNights > totalNights ? "#f44336" : "#e0e0e0"} // red or gray background
            strokeWidth={strokeWidth}
            fill="none"
          />
          <Circle
            cx="55"
            cy="55"
            r={radius}
            stroke={progressColor} // dynamic color for progress
            strokeWidth={strokeWidth}
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            rotation="-90"
            origin="55, 55"
          />
        </Svg>
        <Text style={styles.nightText}>
          {/* {currentNights}/{totalNights} */}
          4/5
        </Text>
      </View>
    </View>
  );
};
export const CreateTripIteneryStep = ({
  index,
  setActiveIndex,
  setTripData,
  tripData,
  setNoDateError
}) => {

  const renderItem = ({ item, drag, isActive }) => (
    <Pressable
      onLongPress={() => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        drag();
      }}
      style={[
        styles.item,
        // { backgroundColor: isActive ? '#f0f0f0' : '#fff' },
      ]}
    >
      <View
        style={{ flexDirection: "row", alignItems: "center", maxWidth: "50%" }}
      >
        {tripData?.destinations?.length > 1 ? (
          <DraggableIcon size={15} />
        ) : null}
        <View
          style={{ marginLeft: tripData?.destinations?.length > 1 ? 8 : 0 }}
        >
          <Text style={styles.city} numberOfLines={1}>
            {item.destination.name}
          </Text>
          <Text style={styles.subText}>
            {moment(item.dates.startDate).format("ddd DD MMM")} -{" "}
            {moment(item.dates.endDate).format("ddd DD MMM")}
          </Text>
        </View>
      </View>
      <View style={styles.rg}>
        <View style={styles.daySwitcher}>
          <Pressable
            style={styles.plusMinusButton}
            hitSlop={10}
            // onPress={() => updateCityNights(item.destination.name, "decrement")}
          >
            <MinusIcon
              size={15}
              color={
                Math.round(
                  (new Date(item.dates.endDate).getTime() -
                    new Date(item.dates.startDate).getTime()) /
                    (1000 * 60 * 60 * 24)
                ) == 1
                  ? "#ccc"
                  : "#000"
              }
            />
          </Pressable>
          <View style={styles.nights}>
            <Text style={styles.nightsNumber}>
              {Math.round(
                (new Date(item.dates.endDate).getTime() -
                  new Date(item.dates.startDate).getTime()) /
                  (1000 * 60 * 60 * 24)
              )}
            </Text>
            <Text style={styles.nightsLabel} numberOfLines={1}>
              Nights
            </Text>
          </View>
          <Pressable
            style={styles.plusMinusButton}
            hitSlop={10}
            // onPress={() => updateCityNights(item.destination.name, "increment")}
          >
            <PlusIcon color="#000" size={15} />
          </Pressable>
        </View>
      </View>
    </Pressable>
  );

  const handleDragEnd = ({ data }) => {
    // setDestinationSelected(() => {
    //   const updatedCities = [...data];
    //   for (let i = 0; i < updatedCities.length; i++) {
    //     const previousCityTo =
    //       i === 0
    //         ? new Date(tripRange.startDate)
    //         : new Date(updatedCities[i - 1].dates.endDate);
    //     const currentCityRange =
    //       new Date(updatedCities[i].dates.endDate) - new Date(updatedCities[i].dates.startDate);
    //     const rangeDays = currentCityRange / (1000 * 60 * 60 * 24); // Range in days
    //     const newFrom = new Date(previousCityTo.getTime());
    //     const newTo = new Date(newFrom.getTime());
    //     newTo.setDate(newFrom.getDate() + rangeDays);
    //     updatedCities[i] = {
    //       ...updatedCities[i],
    //       dates: {
    //         startDate: newFrom.toISOString(),
    //         endDate: newTo.toISOString(),
    //       }
    //     };
    //   }
    //   return updatedCities;
    // });
  };

  const calculateTotalNights = () => {
    // Sum all the nights for each destination
    return tripData?.destinations.reduce((totalNights, destination) => {
      const fromDate = moment(destination.dates?.startDate);
      const toDate = moment(destination.dates?.endDate);

      // Add the number of nights for this destination
      const numberOfNights = toDate.diff(fromDate, "days");
      return totalNights + numberOfNights;
    }, 0); // Initial totalNights is 0
  };

  const generateHeight = useMemo(() => {
    if (tripData?.destinations?.length === 4) {
      return 340;
    } else if (tripData?.destinations?.length <= 3) {
      return 260;
    } else {
      return 380;
    }
  }, [tripData?.destinations?.length]);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      height:
        index === 2
          ? withTiming(generateHeight, {
              duration: 300,
              easing: Easing.bezier(0.25, 0.1, 0.25, 1.0),
            })
          : withTiming(0, {
              duration: 300,
              easing: Easing.bezier(0.25, 0.1, 0.25, 1.0),
            }),
      opacity:
        index === 2
          ? withTiming(1, {
              duration: 300,
              easing: Easing.bezier(0.25, 0.1, 0.25, 1.0),
            })
          : withTiming(0, {
              duration: 300,
              easing: Easing.bezier(0.25, 0.1, 0.25, 1.0),
            }),
    };
  });
 
  const toggleAccordion = useCallback(() => {
      if(tripData?.date?.startDate === null || tripData?.date?.endDate === null) {
        setNoDateError(true)
        return;
      }
      if(index !== 2) {
        setActiveIndex(2)
      } else {
        setActiveIndex(0)
      }
  }, [index])
   

  return (
    <View style={styles.accordion}>
      <TouchableOpacity activeOpacity={0.7} onPress={toggleAccordion} style={styles.header}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            minHeight: 30,
          }}
        >
          <Text
            style={[
              styles.title,
              {
                fontSize: index === 2 ? 24 : 16,
                color: index === 2 ? COLORS.black : COLORS.gray,
              },
            ]}
          >
            Itinerary
          </Text>
          {index === 2 &&
          <ItineraryCircle
            calculateTotalNights={calculateTotalNights}
            tripRange={tripData?.date}
          />
          }
        </View>
      </TouchableOpacity>
      <Animated.View style={[styles.body, animatedStyles]}>
        <View style={styles.selectedCities}>
          <DraggableFlatList
            data={tripData?.destinations}
            renderItem={renderItem}
            keyExtractor={(item, index) => `${item.city}-${index}`}
            onDragEnd={handleDragEnd}
            containerStyle={{
              // height: 300,
              marginTop: 0,
              paddingBottom: 0,
            }}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  accordion: {
    backgroundColor: "#fff",
    borderColor: "#e1e1e1",
    borderRadius: 15,
    elevation: 6,
    marginBottom: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  body: {
    padding: 0,
  },
  circleContainer: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    position: "absolute",
    right: -35,
  },
  city: {
    color: COLORS.black,
    fontSize: 18,
    fontWeight: "600",
  },
  daySwitcher: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    marginRight: 10,
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 15
  },
  item: {
    alignItems: "center",
    borderTopColor: "#eee",
    borderTopWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 20,
  },
  nightText: {
    color: "#000",
    fontSize: 12,
    fontWeight: "500",
    position: "absolute",
  },
  nights: {
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 10,
    position: "relative",
    width: 40,
  },
  nightsLabel: {
    color: COLORS.darkgray,
    fontSize: 11,
    fontWeight: "500",
    position: "absolute",
    textAlign: "center",
    top: 25,
    width: 40,
  },
  nightsNumber: {
    color: COLORS.black,
    fontSize: 18,
    fontVariant: ["tabular-nums"],
    fontWeight: "bold",
  },
  rg: {
    alignItems: "center",
    flexDirection: "row",
  },
  rgHeader: {
    alignItems: "center",
    flexDirection: "row",
    paddingRight: 0,
    position: "relative",
  },
  selectedCities: {
    flex: 1,
    justifyContent: "space-between",
    marginBottom: 0,
    marginTop: 0,
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 0,
    width: "100%",
  },
  subText: {
    color: COLORS.darkgray,
    fontSize: 12,
    fontWeight: "500",
    marginTop: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  titleH2: {
    color: COLORS.black,
    fontSize: 18,
    fontWeight: "500",
  },
});
