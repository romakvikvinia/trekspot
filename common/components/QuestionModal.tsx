import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { COLORS } from "../../styles/theme";
import { XIcon } from "../../utilities/SvgIcons.utility";

export const QuestionModal = ({ modalQuestionRef, title, children }) => {
  return (
    <>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        <TouchableOpacity
          onPress={() => modalQuestionRef?.current?.close()}
          activeOpacity={0.7}
          style={styles.closeButton}
        >
          <XIcon width="10" />
        </TouchableOpacity>
      </View>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingHorizontal: 15 }}
      >
        {children}
      </ScrollView>
    </>
  );
};
const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 15,
    marginBottom: 15,
  },
  title: {
    fontSize: 18,
    color: COLORS.black,
    fontWeight: "600",
  },
  closeButton: {
    backgroundColor: "#DBDBDB",
    width: 30,
    height: 30,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
});
