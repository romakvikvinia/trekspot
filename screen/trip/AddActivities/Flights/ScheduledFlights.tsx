import { useNavigation } from "@react-navigation/native";
import { Image } from "expo-image";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { COLORS } from "../../../../styles/theme";
import {
  ArrivalIcon,
  DepartIcon,
} from "../../../../utilities/SvgIcons.utility";

export const ScheduledFlights = () => {
  const navigation = useNavigation();

  return (
    <>
      <Pressable
        style={({pressed}) => [
          styles.scheduledFlightItem,
          {
            opacity: pressed ? 0.5 : 1,
          }
        ]}
        onPress={() => navigation.navigate("FlightDetails", {
          isPreview: false
        })}
      >
        <View style={styles.topRow}>
          <View style={styles.airline}>
            <Image
              style={styles.airlineLogo}
              contentFit="cover"
              source={
                true
                  ? {
                      uri: "https://images.kiwi.com/airlines/64/TK.png",
                    }
                  : require("../../../../assets/no-image.png")
              }
            />
            <Text style={styles.airlineName}>Turkish airlines</Text>
          </View>
          <Text style={styles.flightDate}>Fri, 08 Dec</Text>
        </View>
        <View style={styles.botRow}>
          <View style={styles.lf}>
            <DepartIcon color="#6c6b6e" size="15" />
            <Text style={styles.airportName}>TBS</Text>
            <Text style={styles.departureTime}>11:55</Text>
            <ArrivalIcon color="#6c6b6e" size="15" />
            <Text style={styles.airportName}>ISL</Text>
            <Text style={styles.departureTime}>14:55</Text>
          </View>
          <Text style={styles.flightNumber}>TK345</Text>
        </View>
      </Pressable>
      <Pressable style={styles.scheduledFlightItem} onPress={() => navigation.navigate("FlightDetails", {
        isPreview: false
      })}>
        <View style={styles.topRow}>
          <View style={styles.airline}>
            <Image
              style={styles.airlineLogo}
              contentFit="cover"
              source={
                true
                  ? {
                      uri: "https://images.kiwi.com/airlines/64/TK.png",
                    }
                  : require("../../../../assets/no-image.png")
              }
            />
            <Text style={styles.airlineName}>Turkish airlines</Text>
          </View>
          <Text style={styles.flightDate}>Fri, 08 Dec</Text>
        </View>
        <View style={styles.botRow}>
          <View style={styles.lf}>
            <DepartIcon color="#6c6b6e" size="15" />
            <Text style={styles.airportName}>TBS</Text>
            <Text style={styles.departureTime}>11:55</Text>
            <ArrivalIcon color="#6c6b6e" size="15" />
            <Text style={styles.airportName}>ISL</Text>
            <Text style={styles.departureTime}>14:55</Text>
          </View>
          <Text style={styles.flightNumber}>TK345</Text>
        </View>
      </Pressable>
      <Pressable style={styles.scheduledFlightItem} onPress={() => navigation.navigate("FlightDetails", {
          isPreview: false
      })}>
        <View style={styles.topRow}>
          <View style={styles.airline}>
            <Image
              style={styles.airlineLogo}
              contentFit="cover"
              source={
                true
                  ? {
                      uri: "https://images.kiwi.com/airlines/64/TK.png",
                    }
                  : require("../../../../assets/no-image.png")
              }
            />
            <Text style={styles.airlineName}>Turkish airlines</Text>
          </View>
          <Text style={styles.flightDate}>Fri, 08 Dec</Text>
        </View>
        <View style={styles.botRow}>
          <View style={styles.lf}>
            <DepartIcon color="#6c6b6e" size="15" />
            <Text style={styles.airportName}>TBS</Text>
            <Text style={styles.departureTime}>11:55</Text>
            <ArrivalIcon color="#6c6b6e" size="15" />
            <Text style={styles.airportName}>ISL</Text>
            <Text style={styles.departureTime}>14:55</Text>
          </View>
          <Text style={styles.flightNumber}>TK345</Text>
        </View>
      </Pressable>
    </>
  );
};
const styles = StyleSheet.create({
  airline: {
    alignItems: "center",
    flexDirection: "row",
  },
  airlineLogo: {
    borderRadius: 50,
    height: 20,
    marginRight: 5,
    width: 20,
  },
  airlineName: {
    color: COLORS.black,
    fontSize: 16,
    fontWeight: "600",
  },
  airportName: {
    color: COLORS.black,
    fontSize: 14,
    fontWeight: "400",
    marginLeft: 5,
    marginRight: 5,
  },
  botRow: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  departureTime: {
    color: COLORS.primary,
    fontSize: 14,
    fontWeight: "400",
    marginRight: 15,
  },
  flightDate: {
    color: COLORS.black,
    fontSize: 16,
    fontWeight: "600",
    opacity: 0.7,
  },
  flightNumber: {
    color: COLORS.black,
    fontSize: 14,
    fontWeight: "400",
    opacity: 0.7,
  },
  lf: {
    alignItems: "center",
    flexDirection: "row",
  },
  scheduledFlightItem: {
    borderBottomColor: "#dedee0",
    borderBottomWidth: 1,
    marginBottom: 15,
    paddingBottom: 15,
    width: "100%",
  },
  topRow: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
