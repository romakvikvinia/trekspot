import { StyleSheet, Text, View } from "react-native";
import { COLORS } from "../../styles/theme";

export const NodataText = () => {
    return (
        <View
        style={{
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
          minHeight: 230,
        }}
      >
        <Text
          style={{
            color: COLORS.black,
            fontSize: 18,
            fontWeight: "bold",
          }}
        >
          No data available
        </Text>
        <Text
          style={{
            color: COLORS.gray,
            fontSize: 16,
            fontWeight: "500",
            marginTop: 10,
          }}
        >
          We are working on it and will be available soon
        </Text>
      </View>
    )
}

const styles = StyleSheet.create({
  noDataText: {
    fontSize: 16,
    color: "#000",
    textAlign: "center",
    marginTop: 20,
  },
});