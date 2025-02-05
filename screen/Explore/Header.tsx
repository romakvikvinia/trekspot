import { Marquee } from "@animatereactnative/marquee";
import { useNavigation } from "@react-navigation/native";
import { format, parseISO } from "date-fns";
import Constants from "expo-constants";
import { LinearGradient } from "expo-linear-gradient";
import { usePostHog } from "posthog-react-native";
import { useState } from "react";
import { Platform, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { useUpComingTripsQuery } from "../../api/api.trekspot";
import { GuestUserModal } from "../../common/components/GuestUserModal";
import { useAppSelector } from "../../package/store";
import { useTripStore } from "../../package/zustand/store";
import { COLORS, SIZES } from "../../styles/theme";
import { Events } from "../../utilities/Posthog";
import { Mark2, SearchBoldIcon } from "../../utilities/SvgIcons.utility";

export const ExploreHeader = () => {
  const navigation = useNavigation<any>();
  const posthog = usePostHog();

  const { isLoading, isSuccess, data } = useUpComingTripsQuery({});

  const { user } = useAppSelector((state) => state.auth);
  const isGuest = user?.role === "guest";

  const [showGuestModal, setShowGuestModal] = useState(false);
  const { guestActivityCount, increaseGuestActivityCount } = useTripStore(
    (state) => ({
      //@ts-ignore
      increaseGuestActivityCount: state.increaseGuestActivityCount,
      //@ts-ignore
      guestActivityCount: state.guestActivityCount,
    })
  );

  const handleGoToSearch = () => {
    posthog?.capture(Events.UseSearchExploreScreen, {});
    if (guestActivityCount >= 3 && isGuest) {
      setShowGuestModal(true);
      return;
    }
    increaseGuestActivityCount();
    navigation.navigate("Search");
  };

  return (
    <>
      <View style={styles.screenHeader}>
        <TouchableOpacity
          style={styles.searchBox}
          activeOpacity={1}
          onPress={handleGoToSearch}
        >
          <View style={styles.searchIcon}>
            <SearchBoldIcon width={16} />
          </View>
          <View style={{
            paddingTop: Platform.OS === "android" ? 4 : 6,
            paddingBottom: 4
          }}>
            <Text style={styles.searchInput}>Where to?</Text>
            <Text style={styles.subTitle}>Explore countries · cities</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.right}>
          {!isLoading &&
          isSuccess &&
          data &&
          data.upComingTrips &&
          !!data.upComingTrips.length ? (
            <TouchableOpacity
              onPress={() => {
                posthog?.capture(Events.UseCurrentTripExploreScreen, {});
                if (data.upComingTrips.length > 0) {
                  navigation.navigate("TripDetailScreen", {
                    city: data.upComingTrips[0].cities[0],
                    trip: data.upComingTrips[0],
                    needResetStack: true,
                  });
                } else {
                  navigation.navigate("Trips");
                }
              }}
              style={[styles.bucketListButton, { padding: 0 }]}
            >
              <LinearGradient
                style={styles.gradientWrapper}
                colors={["#0092E4", "#0092E4", "#0092E4"]}
              >
                <View style={styles.destinationInfo}>
                  <Marquee spacing={20} speed={0.1}>
                    <Text
                      numberOfLines={1}
                      style={{
                        fontSize: 9,
                        fontWeight: "bold",
                        color: "#fff",
                      }}
                    >
                      {data.upComingTrips[0].name}
                    </Text>
                  </Marquee>
                  <Text
                    style={{
                      fontSize: 7,
                      fontWeight: "600",
                      color: "#fff",
                      marginTop: 2,
                      paddingHorizontal: 3,
                    }}
                  >
                    {format(parseISO(data.upComingTrips[0].startAt), "dd")}-
                    {format(parseISO(data.upComingTrips[0].endAt), "dd")}
                  </Text>
                </View>
              </LinearGradient>
            </TouchableOpacity>
          ) : null}

          <TouchableOpacity
            onPress={() => {
              posthog?.capture(Events.UseWishlistExploreScreen, {});
              navigation.navigate("WishlistScreen")
            }}
            style={styles.bucketListButton}
          >
            <Mark2 size={"16"} color={COLORS.black} />
          </TouchableOpacity>
        </View>
      </View>

      {showGuestModal && (
        <GuestUserModal onClose={() => setShowGuestModal(false)} />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  bucketListButton: {
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 50,
    display: "flex",
    elevation: 2,
    height: 45,
    justifyContent: "center",
    marginLeft: 15,
    minWidth: 45,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.05,
    shadowRadius: 3,
  },
  buttonText: {
    color: "white",
    fontSize: 24,
  },
  cancelButton: {
    alignItems: "center",
    height: 40,
    justifyContent: "center",
    paddingLeft: 15,
  },
  cancelButtonText: {
    color: COLORS.darkgray,
    fontSize: 14,
  },
  closeButton: {
    alignItems: "center",
    backgroundColor: "#DBDBDB",
    borderRadius: 50,
    height: 30,
    justifyContent: "center",
    width: 30,
  },
  contentBox: {
    marginTop: 5,
    paddingLeft: 15,
  },
  currentTrip: {
    alignItems: "center",
    backgroundColor: "#fef0ff",
    borderColor: "#dac9dc",
    borderRadius: 50,
    borderWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    paddingHorizontal: 18,
    paddingLeft: 10,
    paddingVertical: 10,
  },
  currentTripDotsButton: {
    alignItems: "flex-end",
    height: 30,
    justifyContent: "center",
    width: 30,
  },
  currentTripIcon: {
    alignItems: "center",
    borderRadius: 50,
    height: 40,
    justifyContent: "center",
    marginRight: 10,
    width: 40,
  },
  currentTripLeft: {
    flexDirection: "row",
  },
  currentTripTitle: {
    color: COLORS.primaryDark,
    fontSize: 18,
    fontWeight: "bold",
  },
  currentTripTitleDate: {
    color: COLORS.primaryDark,
    fontSize: 12,
    fontWeight: "500",
    marginTop: 3,
    opacity: 0.8,
  },
  destinationImage: {
    alignItems: "center",
    borderRadius: 100,
    height: 40,
    justifyContent: "center",
    overflow: "hidden",
    width: 40,
  },
  destinationInfo: {
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.6)",
    borderRadius: 100,
    height: 40,
    justifyContent: "center",
    overflow: "hidden",
    paddingHorizontal: 3,
    position: "absolute",
    width: 40,
  },
  floatingButton: {
    alignItems: "center",
    borderRadius: 100,
    elevation: 5,
    height: 90,
    justifyContent: "center",
    position: "absolute",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 30.84,
    width: 90,
    zIndex: 1000, // to bring the button to the front
  },
  gradientWrapper: {
    alignItems: "center",
    borderRadius: 100,
    height: 45,
    justifyContent: "center",
    width: 45,
  },
  h2: {
    color: "#000",
    fontSize: 22,
    fontWeight: "600",
  },
  right: {
    alignItems: "center",
    flexDirection: "row",
  },
  rowItem: {
    backgroundColor: "#f8f8f8",
    paddingTop: 25,
    width: "100%",
  },
  rowItemHeader: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: SIZES.padding,
    paddingHorizontal: 15,
  },
  safeArea: {
    backgroundColor: "#f8f8f8",
    flex: 1,
    paddingTop: Constants?.statusBarHeight + 10,
  },
  screenHeader: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 15,
    paddingHorizontal: 15,
  },
  searchBox: {
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 30,
    elevation: 2,
    flex: 1,
    flexDirection: "row",
    height: 45,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.05,
    shadowRadius: 3,
  },
  searchIcon: {
    marginRight: 2,
    paddingLeft: 15
  },
  searchInput: {
    alignItems: "center",
    color: "#000",
    display: "flex",
    flex: 1,
    flexDirection: "row",
    fontSize: 14,
    fontWeight: "500", 
    justifyContent: "center", 
    paddingLeft: 10
  },
  seeAllButtonTxt: {
    color: COLORS.primary,
    fontSize: SIZES.body4,
  },
  subTitle: {
    color: "#7f7f7f",
    flex: 1,
    fontSize: 12,
    fontWeight: "400",
    paddingLeft: 10
  },
});
