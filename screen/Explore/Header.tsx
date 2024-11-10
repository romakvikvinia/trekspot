import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Marquee } from "@animatereactnative/marquee";

import { COLORS, SIZES } from "../../styles/theme";
import { Mark2, SearchIcon } from "../../utilities/SvgIcons.utility";
import Constants from "expo-constants";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { useTripStore } from "../../package/zustand/store";
import { useState } from "react";
import { GuestUserModal } from "../../common/components/GuestUserModal";
import { useAppSelector } from "../../package/store";
import { useUpComingTripsQuery } from "../../api/api.trekspot";
import { format, parseISO } from "date-fns";

export const ExploreHeader = () => {
  const navigation = useNavigation<any>();

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
            <SearchIcon width={15} />
          </View>
          <Text style={styles.searchInput}>Where to?</Text>
        </TouchableOpacity>
        <View style={styles.right}>
          {!isLoading &&
          isSuccess &&
          data &&
          data.upComingTrips &&
          !!data.upComingTrips.length ? (
            <TouchableOpacity
              onPress={() => {
                if (data.upComingTrips.length == 1) {
                  navigation.navigate("Trips", {
                    screen: "TripDetailScreen",
                    params: {
                      city: data.upComingTrips[0].cities[0],
                      trip: data.upComingTrips[0],
                      needResetStack: true,
                    },
                  });
                  // navigation.reset({
                  //   index: 0, // Reset to the first screen
                  //   routes: [
                  //     {
                  //       name: "Trips",
                  //       state: {
                  //         routes: [
                  //           {
                  //             name: "TripDetailScreen",
                  //             params: {
                  //               city: data.upComingTrips[0].cities[0],
                  //               trip: data.upComingTrips[0],
                  //             },
                  //           },
                  //         ],
                  //       },
                  //     },
                  //   ],
                  // });
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
            onPress={() => navigation.navigate("WishlistScreen")}
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
