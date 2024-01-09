import { StyleSheet, Text, View } from "react-native";
import { COLORS } from "../../styles/theme";
import { SearchIcon } from "../../utilities/SvgIcons.utility";

export const NotFound = () => {
  return (
    <View style={styles.notFoundWrapper}>
      <SearchIcon width="40" height="40" />
      <Text style={styles.notFoundText}>
        Data not found! We're actively working to acquire the data for your
        query.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  notFoundWrapper: {
    padding: 15,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 25,
  },
  notFoundText: {
    fontSize: 14,
    fontWeight: "500",
    color: COLORS.black,
    marginTop: 15,
    textAlign: "center",
  },
});
