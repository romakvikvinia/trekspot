import { StyleSheet } from "react-native";
import { COLORS } from "../../styles/theme";

export const exploreStyles = StyleSheet.create({
  placeSpotsRow: {
    marginTop: 25,
    borderTopColor: "#ddd",
    borderTopWidth: 1,
  },
  placeSpotsRowTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: COLORS.black,
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  placeSpotsRowSubTitle: {
    fontSize: 14,
    color: COLORS.gray,
  },
  placeSpotsRowTrigger: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    width: "100%",
    paddingHorizontal: 15,
    paddingVertical: 20,
  },
  placeSpotsRowLeft: {
    position: "relative",
    width: "90%",
    textAlign: "left",
  },
  ratingWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  ratingText: {
    fontSize: 14,
    marginLeft: 5,
    color: COLORS.black,
  },
});
