import Constants from "expo-constants";
import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "../../styles/theme";

export const CurrentTripItem = () => {
  return {
    /* <View
            style={{
              paddingHorizontal: 15,
              marginBottom: 15,
            }}
          >
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("TripQuickDetailScreen", {
                  directVisit: true,
                })
              }
              style={styles.currentTrip}
              activeOpacity={0.7}
            >
              <View style={styles.currentTripLeft}>
                <View style={styles.currentTripIcon}>
                  <FlightIcon color={COLORS.primary} />
                </View>
                <View>
                  <Text style={styles.currentTripTitle}>Dubai trip</Text>
                  <Text style={styles.currentTripTitleDate}>
                    12 Feb - 20 Feb
                  </Text>
                </View>
              </View>

              <TouchableOpacity
                style={styles.currentTripDotsButton}
                onPress={() =>
                  Alert.alert("Do you want to hide current trip?", "", [
                    {
                      text: "Cancel",
                      onPress: () => console.log("Cancel Pressed"),
                      style: "cancel",
                    },
                    {
                      text: "Hide",
                      onPress: () => console.log("OK Pressed"),
                      style: "destructive",
                    },
                  ])
                }
              >
                <VertDots color={COLORS.primaryDark} />
              </TouchableOpacity>
            </TouchableOpacity>
          </View> */
  };
};

const styles = StyleSheet.create({
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
      marginTop: 5,
      borderWidth: 1,
      borderColor: "#dac9dc",
      marginBottom: 5,
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
      height: 45,
      paddingLeft: 10,
      fontSize: 16,
      width: "100%",
      color: "#000",
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