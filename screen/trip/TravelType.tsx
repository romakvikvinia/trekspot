import { TouchableOpacity, View } from "react-native";
import { StyleSheet, Text } from "react-native";
import { COLORS } from "../../styles/theme";

export const TravelType = ({ travelType, setTravelType }) => {
  return (
    <View style={styles.wrapper}>
      <View style={styles.modalHeader}>
        <Text style={styles.title}>Travel companions</Text>
        <Text style={styles.subTitle}>Select travel type</Text>
      </View>

      <View style={styles.switchers}>
        <TouchableOpacity
          style={[
            styles.switcher,
            travelType === "solo" ? styles.active : null,
          ]}
          activeOpacity={0.5}
          onPress={() => setTravelType("solo")}
        >
          <Text
            style={[
              styles.switcherLabel,
              travelType === "solo" ? styles.activeText : null,
            ]}
          >
            Solo
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.switcher,
            travelType === "couple" ? styles.active : null,
          ]}
          activeOpacity={0.5}
          onPress={() => setTravelType("couple")}
        >
          <Text
            style={[
              styles.switcherLabel,
              travelType === "couple" ? styles.activeText : null,
            ]}
          >
            Couple
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.switcher,
            travelType === "family" ? styles.active : null,
          ]}
          activeOpacity={0.5}
          onPress={() => setTravelType("family")}
        >
          <Text
            style={[
              styles.switcherLabel,
              travelType === "family" ? styles.activeText : null,
            ]}
          >
            Family
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.switcher,
            travelType === "friends" ? styles.active : null,
          ]}
          activeOpacity={0.5}
          onPress={() => setTravelType("friends")}
        >
          <Text
            style={[
              styles.switcherLabel,
              travelType === "friends" ? styles.activeText : null,
            ]}
          >
            Friends
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  modalHeader: {
    width: "100%",
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    color: COLORS.black,
  },
  subTitle: {
    fontSize: 16,
    marginTop: 10,
  },
  switchers: {
    marginTop: 25,
  },
  switcher: {
    backgroundColor: COLORS.white,
    paddingVertical: 15,
    paddingHorizontal: 15,
    marginBottom: 15,
    borderRadius: 10,
  },
  switcherLabel: {
    color: COLORS.black,
    fontSize: 16,
    fontWeight: "500",
  },
  active: {
    backgroundColor: COLORS.primaryDark,
  },
  activeText: {
    color: COLORS.white,
  },
  wrapper: {
    paddingHorizontal: 15,
    paddingTop: 15,
    marginBottom: 60,
  },
});
