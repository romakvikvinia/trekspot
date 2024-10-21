import {
  Dimensions,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { COLORS, SIZES } from "../../styles/theme";
import {
  FlightIcon,
  Mark2,
  SearchIcon,
} from "../../utilities/SvgIcons.utility";
import Constants from "expo-constants";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { useTripStore } from "../../components/store/store";
import { useState } from "react";
import { GuestUserModal } from "../../common/components/GuestUserModal";
import { useAppSelector } from "../../package/store";
// import Animated, {
//   ReduceMotion,
//   useAnimatedGestureHandler,
//   useAnimatedStyle,
//   useSharedValue,
//   withDecay,
//   withSpring,
// } from "react-native-reanimated";
// import { PanGestureHandler } from "react-native-gesture-handler";
// import { LinearGradient } from "expo-linear-gradient";

export const ExploreHeader = () => {
  const navigation = useNavigation();
  const { user } = useAppSelector((state) => state.auth);
  const isGuest = user?.role === "guest";

  const [showGuestModal, setShowGuestModal] = useState(false);
  const { guestActivityCount, increaseGuestActivityCount } = useTripStore((state) => ({
    increaseGuestActivityCount: state.increaseGuestActivityCount,
    guestActivityCount: state.guestActivityCount,
  }));

  const handleGoToSearch = () => {
    if(guestActivityCount >= 3 && isGuest) {
      setShowGuestModal(true);
      return;
    }
    increaseGuestActivityCount();
    navigation.navigate("Search")
  }

  // const screenWidth = Dimensions.get('window').width;
  // const screenHeight = Dimensions.get('window').height;
  // const buttonSize = 90;

  // Initial position: top-right corner
  // const translateX = useSharedValue(screenWidth - buttonSize - 15);
  // const translateY = useSharedValue(45);

  // const gestureHandler = useAnimatedGestureHandler({
  //   onStart: (_, ctx) => {
  //     ctx.startX = translateX.value;
  //     ctx.startY = translateY.value;
  //   },
  //   onActive: (event, ctx) => {
  //     translateX.value = Math.min(
  //       Math.max(0, ctx.startX + event.translationX),
  //       screenWidth - buttonSize
  //     );
  //     translateY.value = Math.min(
  //       Math.max(0, ctx.startY + event.translationY),
  //       screenHeight - buttonSize
  //     );
  //   },
  //   onEnd: (event) => {
  //     translateX.value = withDecay({
  //       velocity: event.velocityX,
  //       deceleration: 0.998,
  //       clamp: [0, screenWidth - buttonSize],
  //       velocityFactor: 1,
  //       rubberBandEffect: true,
  //       rubberBandFactor: 0.6,
  //       reduceMotion: ReduceMotion.System,
  //     });
  //     translateY.value = withDecay({
  //       velocity: event.velocityY,
  //       deceleration: 0.998,
  //       clamp: [0, screenHeight - buttonSize],
  //       velocityFactor: 1,
  //       rubberBandEffect: true,
  //       rubberBandFactor: 0.6,
  //       reduceMotion: ReduceMotion.System,
  //     });
  //   },
  // });

  // const animatedStyle = useAnimatedStyle(() => {
  //   return {
  //     transform: [
  //       { translateX: translateX.value },
  //       { translateY: translateY.value },
  //     ],
  //   };
  // });
  return (
    <>
      <View style={styles.screenHeader}>
        <TouchableOpacity
          style={styles.searchBox}
          activeOpacity={1}
          onPress={handleGoToSearch}
        >
          <View style={styles.searchIcon}>
            <SearchIcon width={15} />
          </View>
          <Text style={styles.searchInput}>Where to?</Text>
        </TouchableOpacity>
        <View style={styles.right}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("TripDetails", {
                quickView: true,
              })
            }
            style={[styles.bucketListButton, { padding: 0 }]}
          >
            <LinearGradient
              style={styles.gradientWrapper}
              colors={["#DCB92C", "#FF543E", "#C837AB"]}
            >
              <ImageBackground
                source={{
                  uri: "https://cdn.pixabay.com/photo/2019/12/27/09/57/dubai-4722074_1280.jpg",
                }}
                style={styles.destinationImage}
              />
              <View style={styles.destinationInfo}>
                <Text
                  numberOfLines={1}
                  style={{
                    fontSize: 9,
                    fontWeight: "bold",
                    color: "#fff",
                  }}
                >
                  Dubai
                </Text>
                <Text
                  style={{
                    fontSize: 7,
                    fontWeight: "600",
                    color: "#fff",
                    marginTop: 2,
                    paddingHorizontal: 3,
                  }}
                >
                  13-15
                </Text>
              </View>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("WishlistScreen")}
            style={styles.bucketListButton}
          >
            <Mark2 size={16} color={COLORS.black} />
          </TouchableOpacity>
        </View>
      </View>
      {/* <PanGestureHandler onGestureEvent={gestureHandler}>
        <Animated.View style={[styles.floatingButton, animatedStyle]}>
          <LinearGradient
            style={styles.gradientWrapper}
            colors={["#DCB92C", "#FF543E", "#C837AB"]}
          >
            <ImageBackground
              source={{
                uri: "https://cdn.pixabay.com/photo/2015/10/06/18/26/eiffel-tower-975004_1280.jpg",
              }}
              style={styles.destinationImage}
            />
            <View
              style={styles.destinationInfo}
            >
              <Text
                numberOfLines={1}
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  color: "#fff",
                }}
              >
                Paris
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: "600",
                  color: "#fff",
                  marginTop: 5,
                }}
              >
                13-18
              </Text>
            </View>
          </LinearGradient>
        </Animated.View>
      </PanGestureHandler> */}

      {
        showGuestModal && <GuestUserModal onClose={() => setShowGuestModal(false)} />
      }
    </>
  );
};

const styles = StyleSheet.create({
  gradientWrapper: {
    width: 45,
    height: 45,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
  },
  destinationImage: {
    width: 40,
    height: 40,
    borderRadius: 100,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
  },
  destinationInfo: {
    width: 40,
    height: 40,
    borderRadius: 100,
    overflow: "hidden",
    backgroundColor: "rgba(0,0,0,0.6)",
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 3,
  },
  floatingButton: {
    position: "absolute",
    width: 90,
    height: 90,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 30.84,
    elevation: 5,
    zIndex: 1000, // to bring the button to the front
  },
  buttonText: {
    color: "white",
    fontSize: 24,
  },
  safeArea: {
    flex: 1,
    backgroundColor: "#f8f8f8",
    paddingTop: Constants?.statusBarHeight + 10,
  },
  currentTrip: {
    backgroundColor: "#fef0ff",
    borderRadius: 50,
    flexDirection: "row",
    paddingHorizontal: 18,
    paddingLeft: 10,
    paddingVertical: 10,
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
    borderWidth: 1,
    borderColor: "#dac9dc",
  },
  currentTripLeft: {
    flexDirection: "row",
  },
  currentTripDotsButton: {
    width: 30,
    height: 30,
    alignItems: "flex-end",
    justifyContent: "center",
  },
  currentTripTitle: {
    fontSize: 18,
    color: COLORS.primaryDark,
    fontWeight: "bold",
  },
  currentTripTitleDate: {
    fontSize: 12,
    color: COLORS.primaryDark,
    marginTop: 3,
    opacity: 0.8,
    fontWeight: "500",
  },
  currentTripIcon: {
    height: 40,
    width: 40,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  cancelButton: {
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: 15,
  },
  cancelButtonText: {
    fontSize: 14,
    color: COLORS.darkgray,
  },
  closeButton: {
    backgroundColor: "#DBDBDB",
    width: 30,
    height: 30,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  bucketListButton: {
    minWidth: 45,
    height: 45,
    backgroundColor: "#fff",
    borderRadius: 50,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  searchBox: {
    flex: 1,
    height: 45,
    backgroundColor: "#fff",
    flexDirection: "row",
    borderRadius: 30,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  searchIcon: {
    paddingLeft: 15,
  },
  searchInput: {
    paddingLeft: 10,
    fontSize: 16,
    flex: 1,
    color: "#7f7f7f",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  right: {
    flexDirection: "row",
    alignItems: "center",
  },
  screenHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingBottom: 15,
  },
  rowItem: {
    width: "100%",
    paddingTop: 25,
    backgroundColor: "#f8f8f8",
  },
  rowItemHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: SIZES.padding,
    paddingHorizontal: 15,
  },
  seeAllButtonTxt: {
    color: COLORS.primary,
    fontSize: SIZES.body4,
  },
  h2: {
    fontSize: 22,
    color: "#000",
    fontWeight: "600",
  },
  contentBox: {
    marginTop: 5,
    paddingLeft: 15,
  },
});
