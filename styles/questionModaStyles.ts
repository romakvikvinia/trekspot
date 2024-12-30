import { StyleSheet } from "react-native";

import { COLORS } from "./theme";

export const questionModaStyles = StyleSheet.create({
  button: {
    backgroundColor: "#fff",
    borderBottomColor: "#f2f2f2",
    borderBottomWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
    width: "100%",
  },
  buttonGroup: {
    borderRadius: 15,
    overflow: "hidden",
  },
  buttonText: {
    color: COLORS.black,
    fontSize: 16,
    fontWeight: "500"
  },
});
