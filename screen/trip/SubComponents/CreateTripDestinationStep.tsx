import { useMemo, useState } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

import { COLORS } from "../../../styles/theme";
import { Search } from "../CreateTrip/Search";
import { DestinationSuggestions } from "./DestinationSuggestions";
import { SelectedDestinations } from "./SelectedDestinations";

export const CreateTripDestinationStep = ({
  index = 0,
  setActiveIndex,
  setTripData,
  tripData,
}) => {
  const [search, setSearch] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const height = useMemo(() => {
    if (tripData.destinations.length > 1) {
      return 360;
    }
    return 420;
  }, [tripData.destinations]);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      height:
        index === 0
          ? withTiming(height, {
              duration: 300,
              easing: Easing.bezier(0.25, 0.1, 0.25, 1.0),
            })
          : withTiming(0, {
              duration: 300,
              easing: Easing.bezier(0.25, 0.1, 0.25, 1.0),
            }),
      opacity:
        index === 0
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

  const resetWhereTo = () => {
    setTripData({
      ...tripData,
      destinations: [],
    });
  };

  return (
    <View style={styles.accordion}>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => setActiveIndex(0)}
        style={styles.header}
      >
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
                fontSize: index === 0 ? 24 : 16,
                color: index === 0 ? COLORS.black : COLORS.gray,
              },
            ]}
          >
            Where to?
          </Text>
          {index !== 0 && (
            <Text style={styles.selectedPlaces}>
              {tripData?.destinations?.length} places
            </Text>
          )}
        </View>
      </TouchableOpacity>
      <Animated.View style={[styles.body, animatedStyles]}>
        <View style={styles.searchContainer}>
          <Search
            placeholder="Search destination"
            search={search}
            setSearch={setSearch}
          />
        </View>
        {tripData?.destinations?.length < 1 && search?.length < 1 && (
          <DestinationSuggestions />
        )}

        {tripData.destinations.length > 0 && search?.length < 1 ? (
          <SelectedDestinations tripData={tripData} setTripData={setTripData} />
        ) : null}
        {tripData?.destinations?.length > 0 && index === 0 && search?.length < 1 && (
          <View style={styles.actionsRow}>
            <Pressable style={styles.actionButtonReset} onPress={resetWhereTo}>
              <Text style={styles.actionButtonResetText}>Reset</Text>
            </Pressable>
            <Pressable
              style={styles.actionButtonNext}
              onPress={() => setActiveIndex(1)}
            >
              <Text style={styles.actionButtonNextText}>Next</Text>
            </Pressable>
          </View>
        )}
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
    marginBottom: 18,
    marginTop: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  actionButtonNext: {
    alignItems: "center",
    backgroundColor: COLORS.black,
    borderRadius: 10,
    height: 40,
    justifyContent: "center",
    padding: 10,
    paddingHorizontal: 30,
  },
  actionButtonNextText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
  },
  actionButtonResetText: {
    fontSize: 16,
    fontWeight: "500",
    textDecorationLine: "underline",
  },
  actionsRow: {
    alignItems: "center",
    backgroundColor: "#fff",
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    borderColor: "#ddd",
    borderTopWidth: 1,
    bottom: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    left: 0,
    paddingHorizontal: 20,
    paddingVertical: 15,
    position: "absolute",
    right: 0,
  },
  body: {
    padding: 0,
    position: "relative",
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    position: "relative",
    zIndex: 1,
  },
  searchContainer: {
    flexDirection: "row",
    minWidth: "100%",
    paddingHorizontal: 20,
    position: "relative",
    width: "100%",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
});
