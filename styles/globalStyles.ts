import {StyleSheet} from "react-native";
import { COLORS, SIZES } from "./theme";
import Constants from "expo-constants";

export const globalStyles = StyleSheet.create({ 
    buttonItemPrimary: {
        marginTop: SIZES.padding * 3,
        height: 50,
        justifyContent: "center",
        backgroundColor: COLORS.primaryDark,
        width: "100%",
        textAlign: "center",
        alignItems: "center",
        borderRadius: SIZES.radius * 5,
    },
    buttonItemPrimaryText: {
        color: "#fff",
        fontSize: SIZES.body3,
        fontWeight: "500"
    },
    buttonItemPrimaryDisabled: {
        opacity: 0.7
    },
    safeArea: {
        flex: 1,
        backgroundColor: "#F2F2F7",
        paddingTop: Constants?.statusBarHeight + 10,
      },
      screenHeader: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 15,
        marginBottom: 0,
        borderBottomColor: "#ddd",
        borderBottomWidth: 1,
        paddingBottom: 10
      },
      screenHeaderBackButton: {
        width: 30,
      },
      screenTitle: {
        fontSize: 18,
        fontWeight: "500",
        color: "#000"
      }
})