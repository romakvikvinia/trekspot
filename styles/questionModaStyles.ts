import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "./theme";

export const questionModaStyles = StyleSheet.create({
  buttonGroup: {
    borderRadius: 15,
    overflow: "hidden",
  },
  button: {
    width: "100%",
    backgroundColor: "#fff",
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2",
  },
  buttonText: {
    fontSize: 16,
    color: COLORS.black,
    fontWeight: "500"
  },
});
