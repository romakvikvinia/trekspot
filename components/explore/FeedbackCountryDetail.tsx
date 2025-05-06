import { Linking, Pressable, StyleSheet, Text, View } from "react-native";
import { COLORS } from "../../styles/theme";
import { FlagIcon } from "../../utilities/SvgIcons.utility";

export const FeedbackCountryDetail = () => {
  const sendEmail = () => {
    const email = 'hello@travelfy.io';
    const subject = 'Feedback from Travelfy app';
    const emailUrl = `mailto:${email}?subject=${encodeURIComponent(subject)}`;
  
    Linking.canOpenURL(emailUrl)
      .then((supported) => {
        if (supported) {
          Linking.openURL(emailUrl);
        } else {
          console.log("Email app is not available on this device");
        }
      })
      .catch((err) => console.error("An error occurred", err));
  };
  return (
    <View style={styles.feedbackRow}>
      <Pressable
        style={styles.feedbackRowButton}
        onPress={() => sendEmail()}
      >
        <FlagIcon color={COLORS.gray} />
        <Text style={styles.feedbackRowText}>Send feedback or report</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  feedbackRow: {
    borderTopColor: "#E5E5E5",
    borderTopWidth: 1,
    marginBottom: 50,
    paddingHorizontal: 15,
    paddingTop: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  feedbackRowText: {
    color: COLORS.gray,
    fontSize: 16,
    fontWeight: "500",
    marginLeft: 10,
  },
  feedbackRowButton: {
    alignItems: "center",
    flexDirection: "row",
  },
});