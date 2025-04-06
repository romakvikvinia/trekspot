import { StyleSheet } from "react-native";

import { COLORS } from "../../../styles/theme";

export const exploreStyles = StyleSheet.create({
  placeSpotsRow: {
    borderTopColor: "#ddd",
    borderTopWidth: 5,
    marginTop: 25,
  },
  placeSpotsRowLeft: {
    position: "relative",
    textAlign: "left",
    width: "90%",
  },
  placeSpotsRowSubTitle: {
    color: COLORS.gray,
    fontSize: 14,
  },
  placeSpotsRowTitle: {
    color: COLORS.black,
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 15,
    paddingHorizontal: 15,
  },
  placeSpotsRowTrigger: {
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    paddingVertical: 20,
    width: "100%",
  },
  ratingText: {
    color: COLORS.black,
    fontSize: 14,
    fontWeight: "500",
    marginLeft: 5
  },
  ratingWrapper: {
    alignItems: "center",
    flexDirection: "row",
    marginTop: 5,
  },
});
