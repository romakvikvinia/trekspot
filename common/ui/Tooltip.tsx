import { useRef, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import { InfoIcon, InfoLinearIcon } from "../../utilities/SvgIcons.utility";

export const TooltipItem = () => {
  const [visible, setVisible] = useState(false);
 
 
  return (
    <View style={styles.tooltipWrapper}>
      <TouchableOpacity
        onPress={() => setVisible(!visible)}
        style={styles.tooltipTrigger}
      >
        <InfoLinearIcon />
      </TouchableOpacity>

      {visible ? (
        <View style={styles.tooltipContent}>
          <Text style={styles.tooltipContentText}>
            We are working every day to provide you latest information from official
            providers, but we make no warranty or representation regarding the
            accuracy, completeness, and reliability of the data provided. Please
            check the information accuracy with embassy.
          </Text>
        </View>
      ) : null}
    </View>
  );
};
const styles = StyleSheet.create({
  tooltipWrapper: {
    position: "relative",
    zIndex: 1,
  },
  tooltipContent: {
    position: "absolute",
    backgroundColor: "#fff",
    right: 0,
    top: 25,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
    borderRadius: 15,
    width: 300,
  },
  tooltipContentText: {
    fontSize: 12,
    lineHeight: 15,
  },
});
