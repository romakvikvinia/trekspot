import React from "react";
import {
  ImageBackground,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { COLORS } from "../../styles/theme";
import { useNavigation } from "@react-navigation/native";
import { Events } from "../../utilities/Posthog";
import { usePostHog } from "posthog-react-native";

export const TripToolkit = () => {
  const navigation = useNavigation();
  const posthog = usePostHog();
  
  return (
    <>
      <Text style={styles.h2}>Trip toolkit</Text>
      <View style={styles.toolboxes}>
        <TouchableOpacity
          onPress={() => {  
            posthog?.capture(Events.UseVisaCheckerFromToolkit, {});
            navigation.navigate("VisaCheckerScreen");
          }}
          activeOpacity={0.7}
          style={styles.boxItem}
        >
          <ImageBackground
            resizeMode="cover"
            resizeMethod="scale"
            source={require("../../assets/visa.webp")}
            style={styles.boxItemInner}
          >
            <Text
              style={[
                styles.boxItemInnerText,
                {
                  maxWidth: "80%",
                },
              ]}
            >
              Where I can go?
            </Text>
          </ImageBackground>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => 
            { 
              posthog?.capture(Events.UseSeasonalExplorer, {});
              navigation.navigate("SeasonalExplorerScreen");
            }}
          activeOpacity={0.7}
          style={styles.boxItem}
        >
          <ImageBackground
            resizeMode="cover"
            resizeMethod="scale"
            source={require("../../assets/season.webp")}
            style={styles.boxItemInner}
          >
            <Text style={styles.boxItemInnerText}>The seasonal explorer</Text>
          </ImageBackground>
        </TouchableOpacity>
      </View> 
    </>
  );
};

const styles = StyleSheet.create({
  h2: {
    fontSize: 20,
    color: "#000",
    fontWeight: "700",
  },
  toolboxes: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 15,
  },
  boxItem: {
    width: "48.5%",
    height: 140,
    overflow: "hidden",
    borderRadius: 12,
  },
  boxItemInner: {
    alignItems: "flex-start",
    justifyContent: "flex-end",
    flex: 1,
    width: "100%",
    height: 140,
  },
  boxItemInnerText: {
    fontSize: 20,
    fontWeight: "700",
    color: "#fff",
    width: "100%",
    textAlign: "left",
    paddingBottom: 15,
    paddingHorizontal: 20,
  },
  header: {
    backgroundColor: "#18a185",
    paddingTop: 15,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    paddingBottom: 15,
  },
  resetButtonWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 25,
  },
  infoText: {
    marginTop: 15,
    lineHeight: 13,
    fontSize: 10,
    textAlign: "center",
    maxWidth: 300,
    color: "#000",
    opacity: 0.6,
  },
  resetButton: {
    backgroundColor: "#f2f2f2",
    paddingVertical: 10,
    width: "100%",
    borderRadius: 15,
    alignItems: "center",
  },
  resetButtonText: {
    fontWeight: "500",
  },
  lf: {
    flexDirection: "row",
    alignItems: "center",
  },
  textContentWrapper: {
    backgroundColor: "#fafafa",
    padding: 15,
    borderRadius: 10,
    marginTop: 25,
    flexDirection: "row",
    alignItems: "center",
  },
  headingText: {
    fontWeight: "500",
    fontSize: 14,
    marginLeft: 10,
    color: "#000",
    lineHeight: 18,
    maxWidth: "80%",
  },
  secondaryTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 25,
    color: COLORS.darkgray,
  },
  danger: {
    color: "#D74E4E",
  },
  success: {
    color: "#1a806b",
  },
  warning: {
    color: "#d27d00",
  },
  successBg: {
    backgroundColor: "#e8f1ef",
  },
  staysNtype: {
    marginTop: 10,
  },
  staysNtypeRow: {
    flexDirection: "row",
    marginVertical: 3,
  },
  staysNtypeRowKey: {
    width: 100,
    color: COLORS.darkgray,
    fontSize: 12,
    fontWeight: "bold",
  },
  staysNtypeRowValue: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#000",
    textTransform: "capitalize",
  },
  box: {
    height: 300,
    borderTopEndRadius: 0,
    borderTopLeftRadius: 0,
    overflow: "hidden",
  },
  keyValue: {
    display: "flex",
    marginBottom: 30,
  },
  key: {
    fontWeight: "600",
    fontSize: 14,
    color: COLORS.darkgray,
    marginRight: 5,
    marginBottom: 10,
  },
  value: {
    fontWeight: "bold",
    fontSize: 15,
    color: COLORS.black,
    marginRight: 5,
  },
  multiValues: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  dangerBg: {
    backgroundColor: "#ffe8e8",
  },
  warningBg: {
    backgroundColor: "#fff3e4",
  },
  visaTypes: {
    flex: 1,
  },
  visaTypeCard: {
    backgroundColor: "#f3f3f3",
    marginTop: 20,
    padding: 15,
    borderRadius: 10,
  },
  visaTypeCardTitle: {
    fontWeight: "bold",
    fontSize: 18,
    color: "#000",
  },
  visaCheckerCard: {
    borderWidth: 1,
    backgroundColor: "#fff",
    borderColor: "#eee",
    padding: 0,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 1.84,
    ...Platform.select({
      android: {
        elevation: 5,
      },
    }),
  },
  visaCheckerCardTitle: {
    textAlign: "center",
    fontSize: 22,
    fontWeight: "600",
    color: COLORS.white,
  },
  countrySelects: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 25,
    marginBottom: 15,
    paddingHorizontal: 15,
    paddingBottom: 15,
  },
  visaCheckerCardSub: {
    textAlign: "center",
    fontSize: 15,
    fontWeight: "400",
    color: COLORS.white,
    marginTop: 5,
  },
  fromTo: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    maxWidth: 140,
    backgroundColor: "#f2f2f2",
    paddingHorizontal: 8,
    paddingVertical: 10,
    borderRadius: 8,
    position: "relative",
    justifyContent: "space-between",
  },
  fromToText: {
    marginRight: 8,
    marginLeft: 8,
    fontSize: 13,
    fontWeight: "600",
    maxWidth: 75,
  },
});
