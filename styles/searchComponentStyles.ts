import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "./theme";

export const searchComponentStyles = StyleSheet.create({
  searchComponentInput: {
    height: 45,
    backgroundColor: "#ebebeb",
    borderRadius: SIZES.radius * 5,
    paddingLeft: 20,
    fontSize: 16,
    color: COLORS.black,
  },
  searchComponent: {
    position: "relative",
  },
  searchComponentIcon: {
    position: "absolute",
    zIndex: 2,
    left: 15,
    top: 12,
  },
  searchComponentResetButton: {
    position: "absolute",
    right: 7,
    top: 7,
    padding: 8,
  },
});
