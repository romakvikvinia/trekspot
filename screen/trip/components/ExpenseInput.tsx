import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { COLORS } from "../../../styles/theme";
import { SeatIcon, USDIcon } from "../../../utilities/SvgIcons.utility";

export const ExpenseInput = ({ modalExpensesRef }) => {
  return (
    <>
      <View style={styles.modalHeader}>
        <TouchableOpacity
          style={styles.cancelButton}
          activeOpacity={0.5}
          onPress={() => modalExpensesRef?.current?.close()}
        >
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>

        <Text style={styles.modalTitle}>Expenses</Text>
      </View>

      <View style={styles.inputWrapper}>
        <View style={styles.inputWrapperIn}>
          <View style={styles.icon}>
            <USDIcon />
          </View>
          <TextInput
            autoFocus={true}
            placeholderTextColor={COLORS.gray}
            placeholder="Enter expense in USD"
            style={styles.addActivityTitleInput}
          />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  inputWrapperIn: {
    flexDirection: "row",
    position: "relative",
  },
  inputWrapper: {
    paddingHorizontal: 15,
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginRight: 15,
    alignItems: "center",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    position: "absolute",
    zIndex: 1,
    top: 15,
    left: 15,
  },
  modalHeader: {
    flexDirection: "row",
    position: "relative",
    justifyContent: "center",
    padding: 15,
  },
  cancelButton: {
    position: "absolute",
    left: 15,
    top: 15,
  },
  addActivityTitleInput: {
    color: COLORS.black,
    height: 50,
    fontSize: 14,
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 15,
    paddingLeft: 45,
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
});
