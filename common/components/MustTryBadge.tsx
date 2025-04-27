import { View } from "react-native";
import { StyleProp, StyleSheet, Text, ViewStyle } from "react-native";

import { MustTryIcon } from "../../utilities/SvgIcons.utility";

export const MustTryBadge = ({style, label}: {style?: StyleProp<ViewStyle>, label?: string}) => {
  return (
    <View style={[styles.mustTryBadge, style]}>
        <MustTryIcon />
        <Text style={styles.mustTryBadgeText}>{label || "Must try"}</Text>
   </View>
  );
};

const styles = StyleSheet.create({
  mustTryBadge: {
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: 6,
    flexDirection: "row",
    left: 5,
    overflow: "hidden",
    paddingHorizontal: 6,
    paddingVertical: 3,
    position: "absolute",
    top: 5,
    zIndex: 3,
  },
  mustTryBadgeText: {
    color: "#000",  
    fontSize: 13,
    fontWeight: "600",
    marginLeft: 5,
  },
});
