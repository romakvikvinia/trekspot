import {StyleSheet} from "react-native";
import { COLORS, SIZES } from "./theme";

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
    },
    buttonItemPrimaryDisabled: {
        opacity: 0.7
    }
})