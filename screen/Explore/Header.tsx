import {
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

export const ExploreHeader = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.screenHeader}>
      <TouchableOpacity
        style={styles.searchBox}
        activeOpacity={1}
        onPress={() => navigation.navigate("Search")}
      >
        <View style={styles.searchIcon}>
          <SearchIcon width={15} />
        </View>
        <Text style={styles.searchInput}>Search here...</Text>
      </TouchableOpacity>
      <View style={styles.right}>
        <TouchableOpacity
          onPress={() => onBucketlistOpen()}
          style={styles.bucketListButton}
        >
          <FlightIcon color={COLORS.primary} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("WishlistScreen")}
          style={styles.bucketListButton}
        >
          <Mark2 size={16} color={COLORS.black} />
        </TouchableOpacity>
      </View>
    </View>
  );
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
