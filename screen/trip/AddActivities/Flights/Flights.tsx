import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import { COLORS } from "../../../../styles/theme";
import { Header } from "./Header";
import { InputData } from "./InputData";
import { ScheduledFlights } from "./ScheduledFlights";
import { SearchResult } from "./SearchResult";

export const Flights = () => {
  const [flightState, setFlightState] = useState({
    iata: null,
    flightNumber: null,
    date: null,
    airportDeparture: null,
    airportArrival: null,
  });

  const handleClickSearchResult = (item) => {
    console.log("item", item);

    if (flightState.airportDeparture) {
      setFlightState((prevState) => {
        return {
          ...prevState,
          iata: item.iata,
          airportArrival: item.airport,
        };
      });
    } else {
      setFlightState((prevState) => {
        return {
          ...prevState,
          iata: item.iata,
          airportDeparture: item.airport,
        };
      });
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
        style={styles.screen}
      >
        <Header />
        <View style={styles.inputs}>
          {flightState?.iata || flightState?.airportDeparture ? (
            <InputData
              flightState={flightState}
              setFlightState={setFlightState}
            />
          ) : (
            <TextInput
              style={styles.inputItem}
              placeholder="Airline, Airport or Flight number (e.g EK162)"
              placeholderTextColor="#85858A"
              autoFocus
            />
          )}
        </View>
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ padding: 15 }}
          keyboardShouldPersistTaps="always"
          keyboardDismissMode="on-drag"
        >
          {/* <View style={{marginVertical: 25}}>
            <Loader isLoading={true} background="#F2F2F7" />
          </View> */}
          <ScheduledFlights />
          <SearchResult handleClickSearchResult={handleClickSearchResult} />

          <View style={styles.noResult}>
            <Text style={styles.noResultText}>Oops, not showing up?</Text>
            <Pressable>
              <Text style={styles.enterManuallyText}>Enter manually</Text>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};
const styles = StyleSheet.create({
  enterManuallyText: {
    color: COLORS.primary,
    fontSize: 16,
    fontWeight: "700",
    marginLeft: 5
  },
  inputItem: {
    backgroundColor: "#fff",
    borderColor: "#eeeeee",
    borderRadius: 10,
    borderWidth: 1,
    color: "#000",
    fontSize: 15,
    fontWeight: "400",
    height: 50,
    marginBottom: 15,
    paddingHorizontal: 10,
    width: "100%",
  },
  inputs: {
    borderBottomColor: "#dedee0",
    borderBottomWidth: 1,
    marginBottom: 0,
    paddingHorizontal: 15,
  },
  noResult: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 25,
    width: "100%"
  },
  noResultText: {
    color: COLORS.black,
    fontSize: 16,
    fontWeight: "500"
  },
  screen: {
    backgroundColor: "#F2F2F7",
    flex: 1,
  }
});
