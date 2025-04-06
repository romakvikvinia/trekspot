import Constants from "expo-constants";
import { Platform, StyleSheet } from "react-native";

import { COLORS, SIZES } from "./theme";

export const globalStyles = StyleSheet.create({
  buttonItemPrimary: {
    alignItems: "center",
    backgroundColor: COLORS.primaryDark,
    borderRadius: SIZES.radius * 5,
    height: 50,
    justifyContent: "center",
    marginTop: SIZES.padding * 3,
    textAlign: "center",
    width: "100%",
  },
  buttonItemPrimaryDisabled: {
    opacity: 0.7,
  },
  buttonItemPrimaryText: {
    color: "#fff",
    fontSize: SIZES.body3,
    fontWeight: "500",
  },
  safeArea: {
    backgroundColor: "#F2F2F7",
    flex: 1,
    paddingTop:
      Constants?.statusBarHeight + (Platform.OS === "android" ? 5 : 10),
  },
  screenHeader: {
    alignItems: "center",
    borderBottomColor: "#ddd",
    borderBottomWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 0,
    paddingBottom: 15,
    paddingHorizontal: 15,
  },
  screenHeaderBackButton: {
    alignItems: "flex-start",
    flexDirection: "row",
    justifyContent: "flex-start",
    width: 30,
  },
  screenTitle: {
    color: "#000",
    fontSize: 18,
    fontWeight: "600",
  },
  underScreenTab: {
    alignItems: "center",
    borderColor: "#ddd",
    borderRadius: 30,
    borderWidth: 1,
    flexDirection: "row",
    height: 40,
    justifyContent: "center",
    marginRight: 15,
    paddingHorizontal: 15,
  },
  underScreenTabActive: {
    backgroundColor: "#000",
    borderColor: "#000"
  },
  underScreenTabActiveText: {
    color: "#fff",
  },
  underScreenTabText: {
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 5
  },
  underScreenTabs: {
    height: 50,
    marginTop: 15,
    minHeight: 50
  }
});
