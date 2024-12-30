import { useNavigation } from "@react-navigation/native";
import Constants from "expo-constants";
import { Platform, Pressable, StyleSheet, Text, View } from "react-native";

import { COLORS } from "../../../../styles/theme";

export const Header = ({ isFlightDetails = false }) => {
  const navigation = useNavigation();

  const handleCancel = () => {
    if (isFlightDetails) {
      navigation.navigate("Flights");
    } else {
      navigation.goBack();
    }
  };

  return (
    <View style={styles.headerContainer}>
      <Pressable style={styles.backButton} hitSlop={30} onPress={handleCancel}>
        <Text style={styles.buttonText}>Cancel</Text>
      </Pressable>
      <Text style={styles.title}>
        {isFlightDetails ? "Flight details" : "Search Flights"}
      </Text>
      {isFlightDetails ? (
        <Pressable style={styles.saveButton} hitSlop={30}>
          <Text style={styles.buttonText}>Save</Text>
        </Pressable>
      ) : (
        <Pressable style={styles.saveButton}></Pressable>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  backButton: {
    width: 80,
  },
  buttonText: {
    color: COLORS.primary,
    fontSize: 16,
    fontWeight: "600",
  },
  headerContainer: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 25,
    paddingHorizontal: 15,
    paddingTop:
      Platform.OS === "android" ? Constants?.statusBarHeight + 10 : 18,
    width: "100%",
  },
  saveButton: {
    flexDirection: "row",
    justifyContent: "flex-end",
    textAlign: "right",
    width: 80,
  },
  title: {
    color: COLORS.black,
    fontSize: 16,
    fontWeight: "600",
  },
});
