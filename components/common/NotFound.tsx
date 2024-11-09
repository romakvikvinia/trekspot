import { StyleSheet, Text, View } from "react-native";
import { COLORS } from "../../styles/theme";
import { SearchLargeIcon } from "../../utilities/SvgIcons.utility";

export const NotFound = ({text = ""}) => {
  return (
    <View style={styles.notFoundWrapper}>
      <SearchLargeIcon width={60} height={60} />
      <Text style={styles.notFoundText}>
        {
          text || "Data not found! We're actively working to acquire the data for your query."
        }
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
    paddingHorizontal: 40
  },
});
