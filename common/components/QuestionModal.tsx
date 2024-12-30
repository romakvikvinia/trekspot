import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { COLORS } from "../../styles/theme";
import { XIcon } from "../../utilities/SvgIcons.utility";

interface IQuestionModal {
  title: string;
  children: any;
  onClose: () => void;
}

export const QuestionModal: React.FC<IQuestionModal> = ({
  onClose,
  title,
  children,
}) => {
  return (
    <>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        <TouchableOpacity
          onPress={onClose}
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
  closeButton: {
    alignItems: "center",
    backgroundColor: "#DBDBDB",
    borderRadius: 50,
    height: 30,
    justifyContent: "center",
    width: 30,
  },
  header: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
    padding: 15,
  },
  title: {
    color: COLORS.black,
    fontSize: 18,
    fontWeight: "600",
  },
});
