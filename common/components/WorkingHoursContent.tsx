import { StyleSheet,Text, View } from "react-native";

export const WorkingHoursContent = () => {
  return (
    <>
      <Text
        style={{
          textAlign: "center",
          fontSize: 18,
          fontWeight: "600",
          marginTop: 0,
        }}
      >
        Working Hours
      </Text>

      <View style={styles.workingWeekContainer}>
        {[
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ].map((item, index) => (
          <View style={styles.workingWeekItem} key={index}>
            <View style={styles.workingWeekItemTextContainer}>
              <Text style={styles.workingWeekItemText}>{item}</Text>
            </View>
            <Text style={[styles.workingWeekItemText, { fontWeight: "500" }]}>
              10:00 - 18:00
            </Text>
          </View>
        ))}
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  workingWeekContainer: {
    marginTop: 15,
    paddingHorizontal: 25,
  },
  workingWeekItem: {
    borderBottomColor: "#ddd",
    borderBottomWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 15,
  },
  workingWeekItemText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "600",
  },
  workingWeekItemTextContainer: {
    flexDirection: "row",
  },
});
