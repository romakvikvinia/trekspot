import * as Haptics from "expo-haptics";
import moment from "moment";
import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

import { SingleDatePicker } from "../../../../common/components/SingleDatePicker";
import { COLORS } from "../../../../styles/theme";
import {
  ArrivalIcon,
  CalendarLightIcon,
  CloseCircleIcon,
  DepartIcon,
  HashIcon,
  SearchIcon,
} from "../../../../utilities/SvgIcons.utility";

interface InputDataProps {
  flightState: object;
  setFlightState: any;
}

export const InputData: React.FC<InputDataProps> = ({
  flightState,
  setFlightState,
}) => {
  const [open, setOpen] = useState(false);

  const handleReset = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setFlightState({
      iata: null,
      flightNumber: null,
      date: null,
      airportDeparture: null,
      airportArrival: null,
    });
  };

  const handleDateChange = (date) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setFlightState((prevState) => {
      return {
        ...prevState,
        date,
      };
    });
  };

  const handleResetArrivalAirport = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setFlightState((prevState) => {
      return {
        ...prevState,
        airportArrival: null,
      };
    });
  };

  const handleResetFlightNumber = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setFlightState((prevState) => {
      return {
        ...prevState,
        flightNumber: null,
      };
    });
  };

  return (
    <>
      <View style={styles.inputsGroup}>
        <View style={styles.departArrivalInput}>
          {flightState.iata ? (
            <SearchIcon width="20" color="#86858c" />
          ) : (
            <DepartIcon size="20" color="#86858c" />
          )}
          <TextInput
            style={styles.inputItem}
            placeholderTextColor="#85858A"
            editable={false}
            value={flightState.iata || flightState.airportDeparture}
          />
          {(flightState.iata || flightState.airportDeparture) && (
            <Pressable
              onPress={handleReset}
              style={styles.resetButton}
              hitSlop={15}
            >
              <CloseCircleIcon color="#86858c" size="15" />
            </Pressable>
          )}
        </View>
        {flightState.iata ? (
          <View style={styles.departArrivalInput}>
            <HashIcon size="17" color="#86858c" />
            <TextInput
              style={styles.inputItem}
              placeholder="Flight number"
              placeholderTextColor="#85858A"
              autoFocus
              value={flightState.flightNumber}
            />
            {flightState?.flightNumber && (
              <Pressable
                style={styles.resetButton}
                hitSlop={15}
                onPress={handleResetFlightNumber}
              >
                <CloseCircleIcon color="#86858c" size="15" />
              </Pressable>
            )}
          </View>
        ) : (
          <View style={styles.departArrivalInput}>
            <ArrivalIcon size="20" color="#86858c" />
            <TextInput
              style={styles.inputItem}
              placeholder="City or Airport"
              placeholderTextColor="#85858A"
              autoFocus
              value={flightState.airportArrival}
            />
            {flightState?.airportArrival && (
              <Pressable
                style={styles.resetButton}
                hitSlop={15}
                onPress={handleResetArrivalAirport}
              >
                <CloseCircleIcon color="#86858c" size="15" />
              </Pressable>
            )}
          </View>
        )}

        <Pressable
          onPress={() => setOpen(true)}
          style={[
            styles.departDateInput,
            {
              opacity:
                !flightState.airportArrival && !flightState.flightNumber
                  ? 0.7
                  : 1,
            },
          ]}
          disabled={!flightState.airportArrival && !flightState.flightNumber}
        >
          <CalendarLightIcon size="20" color="#86858c" />
          <Text style={styles.dateText}>
            {flightState?.date
              ? moment(flightState?.date).format("YYYY-MM-DD")
              : "Date"}
          </Text>
        </Pressable>
      </View>

      <SingleDatePicker
        open={open}
        setOpen={setOpen}
        handleDateChange={handleDateChange}
      />
    </>
  );
};
const styles = StyleSheet.create({
  dateText: {
    color: COLORS.black,
    fontSize: 15,
    fontWeight: "400",
    paddingLeft: 10,
    position: "relative",
    top: 1,
  },
  departArrivalInput: {
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    flexDirection: "row",
    height: 50,
    paddingLeft: 12,
    position: "relative",
    width: "48%",
  },
  departDateInput: {
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    flexDirection: "row",
    height: 50,
    marginTop: 15,
    paddingLeft: 12,
    position: "relative",
    width: "100%",
  },
  inputItem: {
    color: COLORS.black,
    flex: 1,
    fontSize: 15,
    fontWeight: "400",
    height: 40,
    paddingLeft: 10,
    paddingRight: 35,
  },
  inputsGroup: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 15,
    width: "100%",
  },
  resetButton: {
    position: "absolute",
    right: 10,
  },
});
