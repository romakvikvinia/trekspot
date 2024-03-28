import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { COLORS } from "../../../styles/theme";

export const DateSlots = ({ modalDateTimeSlotsRef }) => {
  return (
    <>
      <View style={styles.modalHeader}>
        <TouchableOpacity
          style={styles.cancelButton}
          activeOpacity={0.5}
          onPress={() => modalDateTimeSlotsRef?.current?.close()}
        >
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>

        <Text style={styles.modalTitle}>Date and time</Text>
      </View>
      
    </>
  );
};

const styles = StyleSheet.create({
  modalHeader: {
    flexDirection: "row",
    position: "relative",
    justifyContent: "center",
    padding: 15,
  },
  cancelButton: {
    position: "absolute",
    left: 7,
    top: 7,
    padding: 8,
  },
  cancelButtonText: {
    color: COLORS.black,
    fontSize: 14,
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.black,
  },
  destination: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
  },
  destinationText: {
    marginLeft: 10,
    fontSize: 16,
    color: COLORS.black,
    fontWeight: "500",
  },
});
