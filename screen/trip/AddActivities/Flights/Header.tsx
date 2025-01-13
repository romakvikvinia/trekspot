import { useNavigation } from "@react-navigation/native";
import Constants from "expo-constants";
import { useState } from "react";
import { Platform, Pressable, StyleSheet, Text, View } from "react-native";

import { Loader } from "../../../../common/ui/Loader";
import { COLORS } from "../../../../styles/theme";

export const Header = ({ isFlightDetails = false }) => {
  const navigation = useNavigation();

  const [isDisable, setIsDisable] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

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

      {isLoading ? (
        <View
          style={[
            styles.saveButton,
            {
              justifyContent: "flex-end",
            },
          ]}
        >
          <View style={{ width: 20 }}>
            <Loader isLoading={true} size="small" background="#F2F2F7" />
          </View>
        </View>
      ) : null}

      {isFlightDetails && !isLoading ? (
        <Pressable
          style={[
            styles.saveButton,
            {
              pointerEvents: isDisable ? "none" : "auto",
            },
          ]}
          hitSlop={30}
        >
          <Text style={[styles.buttonText,{
            color: isDisable ? COLORS.gray : COLORS.primary,
          }]}>Save</Text>
        </Pressable>
      ) : (
        !isLoading && <Pressable style={styles.saveButton}></Pressable>
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
