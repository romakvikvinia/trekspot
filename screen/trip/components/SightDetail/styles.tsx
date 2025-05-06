import Constants from "expo-constants";
import { Platform, StyleSheet } from "react-native";

import { COLORS } from "../../../../styles/theme";

export const styles = StyleSheet.create({
  workingHoursContainer: {
    flexDirection: "row",
    gap: 5,
  },
  statusText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "500",
  },
  workingHoursText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "500",
  },
  addToBucketButton: {
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 30,
    display: "flex",
    height: 40,
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 1.84,
    width: 40,
    ...Platform.select({
      android: {
        elevation: 2,
      },
    }),
  },
  addTripButton: {
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 30,
    display: "flex",
    height: 40,
    justifyContent: "center",
    paddingHorizontal: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 1.84,
    ...Platform.select({
      android: {
        elevation: 2,
      },
    }),
    flexDirection: "row",
    gap: 5,
    marginRight: 15,
  },
  addTripText: {
    color: "#000",
    fontSize: 14,
    fontWeight: "500",
  },
  backButton: {
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 30,
    display: "flex",
    height: 40,
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 1.84,
    width: 40,
    ...Platform.select({
      android: {
        elevation: 2,
      },
    }),
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
    borderTopColor: "#ddd",
    borderTopWidth: 1,
    marginTop: 25,
    paddingTop: 25,
    width: "100%",
  },
  descriptionText: {
    color: "#000",
    fontSize: 15,
    fontWeight: "400",
    lineHeight: 20,
    maxWidth: "100%",
  },
  descriptionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
  },
  factText: {
    color: "#000",
    fontSize: 15,
    fontWeight: "400",
    lineHeight: 20,
    marginVertical: 5,
  },
  facts: {
    backgroundColor: "#fff",
    borderRadius: 10,
    marginTop: 15,
  },
  factsTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
  },
  header: {
    alignItems: "flex-start",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
    paddingTop: Platform.OS === "android" ? Constants?.statusBarHeight + 5 : 60,
    position: "absolute",
    width: "100%",
    zIndex: 1,
  },
  headerRight: {
    alignItems: "center",
    flexDirection: "row",
  },
  headerScrolled: {
    backgroundColor: "#fff",
    width: "100%",
  },

  highlighteddescriptionText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "500",
    lineHeight: 20,
    maxWidth: "95%",
  },

  icon: {
    // height: 15,
    width: 50,
  },
  keyValues: {
    marginTop: 25,
  },
  locationContainer: {
    marginBottom: 10,
    marginTop: 5,
  },
  more: {
    color: "#000",
    fontSize: 14,
    fontWeight: "600",
    textDecorationLine: "underline",
  },
  // review: {
  //   borderColor: "#ccc",
  //   borderRadius: 10,
  //   borderWidth: 1,
  //   marginRight: 10,
  //   padding: 10,
  //   width: 200,
  // },
  // reviewAuthor: {
  //   color: "#000",
  //   fontSize: 14,
  //   fontWeight: "400",
  //   opacity: 0.7,
  // },
  // reviewText: {
  //   color: "#000",
  //   fontSize: 16,
  //   fontWeight: "600",
  //   lineHeight: 25,
  // },
  // reviews: {
  //   borderBottomColor: "#ccc",
  //   borderBottomWidth: 1,
  //   paddingBottom: 25,
  //   paddingTop: 25,
  // },
  row: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "flex-start",
    marginBottom: 25,
  },
  rowHeader: {
    marginBottom: 10,
  },
  rowHeaderText: {
    color: "#000",
    fontSize: 20,
    fontWeight: "600",
  },

  rowItem: {
    borderTopColor: "#ddd",
    borderTopWidth: 1,
    marginTop: 25,
    paddingTop: 25,
  },
  showMore: {
    color: "#000",
    fontSize: 14,
    fontWeight: "600",
    opacity: 1,
    textDecorationLine: "underline",
  },
  showMoreButton: {
    alignItems: "flex-start",
    flexDirection: "row",
  },
  swiperContainer: {
    height: 500,
    position: "relative",
  },
  text: {
    color: COLORS.darkgray,
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
    borderBottomColor: "#ddd",
    borderBottomWidth: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    paddingBottom: 15,
  },
  value: {
    flex: 1,
  },
  valueLabelText: {
    color: "#000",
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 5,
    opacity: 0.7,
  },
  valueText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "500",
    maxWidth: "95%",
  },
});
