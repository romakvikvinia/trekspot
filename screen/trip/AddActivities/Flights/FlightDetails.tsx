import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { DefaultTheme, PaperProvider } from "react-native-paper";
import { DatePickerModal, TimePickerModal } from "react-native-paper-dates";

import { COLORS } from "../../../../styles/theme";
import {
  ArrivalIcon,
  CalendarLightIcon,
  DepartIcon,
} from "../../../../utilities/SvgIcons.utility";
import { Header } from "./Header";

export const FlightDetails = () => {
  const [visible, setVisible] = useState(false);
  const [datepickerVisible, setDatePickerVisible] = useState(false);

  const [dateState, setDateState] = useState({
    departureDate: null,
    departureTime: null,
    arrivalDate: null,
    arrivalTime: null,
  });

  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: COLORS.primary,
      primaryContainer: "#dfebff",
      surfaceVariant: "#f2f2f2",
      surface: "#fff",
      onPrimaryContainer: "#000",
      secondaryContainer: "#f2f2f2",
    },
  };

  return (
    <PaperProvider theme={theme}>
      <SafeAreaView style={{ flex: 1 }}>
        <KeyboardAvoidingView
          behavior={Platform.OS == "ios" ? "padding" : "height"}
          style={styles.screen}
        >
          <Header isFlightDetails />
          <ScrollView
            style={{ flex: 1 }}
            contentContainerStyle={{ paddingHorizontal: 15 }}
          >
            <View style={styles.inputGroup}>
              <View style={[styles.inputRow, styles.widthBorderBottom]}>
                <Text style={styles.inputLabel}>Flight number</Text>
                <TextInput
                  style={styles.input}
                  placeholder="e.g EK162"
                  placeholderTextColor="#85858A"
                  autoFocus
                />
              </View>
              <View style={styles.inputRow}>
                <Text style={styles.inputLabel}>Airline</Text>
                <TextInput
                  style={styles.input}
                  placeholder="e.g Emirates"
                  placeholderTextColor="#85858A"
                  autoFocus
                />
              </View>
            </View>

            <View style={styles.airportSelection}>
              <Pressable
                style={[
                  styles.airportSelectionButton,
                  styles.widthBorderBottom,
                ]}
              >
                <View style={styles.iconWrapper}>
                  <DepartIcon size="20" color={COLORS.primary} />
                </View>
                <Text style={styles.airportSelectionButtonText}>
                  Select departure airport
                </Text>
              </Pressable>
              <View style={styles.flightDate}>
                <View style={styles.flightDateLabel}>
                  <CalendarLightIcon size="20" color="#86858c" />
                  <Text style={styles.flightDateLabelText}>Departure</Text>
                </View>

                <View style={styles.datePickers}>
                  <Pressable
                    style={styles.datePickersDateButton}
                    onPress={() => setDatePickerVisible(true)}
                  >
                    <Text style={styles.datePickersDateButtonText}>Date</Text>
                  </Pressable>
                  <Pressable
                    style={styles.datePickersDateButton}
                    onPress={() => setVisible(true)}
                  >
                    <Text style={styles.datePickersDateButtonText}>Time</Text>
                  </Pressable>
                </View>
              </View>
            </View>
            <View style={styles.airportSelection}>
              <Pressable
                style={[
                  styles.airportSelectionButton,
                  styles.widthBorderBottom,
                ]}
              >
                 <View style={styles.iconWrapper}>
                  <ArrivalIcon size="20" color={COLORS.primary} />
                </View>
                <Text style={styles.airportSelectionButtonText}>
                  Select arrival airport
                </Text>
              </Pressable>
              <View style={styles.flightDate}>
                <View style={styles.flightDateLabel}>
                  <CalendarLightIcon size="20" color="#86858c" />
                  <Text style={styles.flightDateLabelText}>Arrival</Text>
                </View>

                <View style={styles.datePickers}>
                  <Pressable style={styles.datePickersDateButton}>
                    <Text style={styles.datePickersDateButtonText}>Date</Text>
                  </Pressable>
                  <Pressable style={styles.datePickersDateButton}>
                    <Text style={styles.datePickersDateButtonText}>Time</Text>
                  </Pressable>
                </View>
              </View>
            </View>
            <View style={styles.inputGroup}>
              <View style={[styles.inputRow, styles.widthBorderBottom]}>
                <Text style={styles.inputLabel}>Flight duration</Text>
                <TextInput
                  style={[styles.input, {
                    textAlign: "right"
                  }]}
                  placeholder=""
                  editable={false}
                  value="3h 15m"
                />
              </View>
              <View style={styles.inputRow}>
                <Text style={styles.inputLabel}>Distance</Text>
                <TextInput
                   style={[styles.input, {
                    textAlign: "right"
                  }]}
                  placeholder=""
                  editable={false}
                    value="345Km"
                />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <View style={[styles.inputRow, styles.widthBorderBottom]}>
                <Text style={styles.inputLabel}>Reserv. Code</Text>
                <TextInput
                  style={styles.input}
                  placeholder="e.g GHD12"
                  placeholderTextColor="#85858A"
                />
              </View>
              <View style={[styles.inputRow, styles.widthBorderBottom]}>
                <Text style={styles.inputLabel}>Seat</Text>
                <TextInput
                  style={styles.input}
                  placeholder="e.g 14C"
                  placeholderTextColor="#85858A"
                />
              </View>
              <View style={styles.inputRow}>
                <Text style={styles.inputLabel}>Seat Class</Text>
                <TextInput
                  style={styles.input}
                  placeholder="e.g Premium"
                  placeholderTextColor="#85858A"
                />
              </View>
            </View>

 
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>

      <TimePickerModal
        visible={visible}
        onDismiss={() => setVisible(false)}
        // onConfirm={onConfirm}
        hours={12}
        minutes={14}
      />
      <DatePickerModal
        locale="en"
        mode="single"
        visible={datepickerVisible}
        onDismiss={() => setDatePickerVisible(false)}
        date={undefined}
        // onConfirm={onConfirm}
        presentationStyle={"pageSheet"}
        disableStatusBarPadding={false}
        saveLabel="Confirm"
        validRange={{ startDate: undefined, endDate: undefined }}
      />
    </PaperProvider>
  );
};
const styles = StyleSheet.create({
  airportSelection: {
    backgroundColor: "#fff",
    borderRadius: 8,
    marginBottom: 15,
    overflow: "hidden",
  },
  airportSelectionButton: {
    alignItems: "center",
    flexDirection: "row",
    height: 70,
    paddingHorizontal: 15,
  },
  airportSelectionButtonText: {
    color: COLORS.primary,
    fontSize: 14,
    fontWeight: "600",
    paddingLeft: 10,
  },
  datePickers: {
    flexDirection: "row",
  },
  datePickersDateButton: {
    backgroundColor: "#eaeaea",
    borderRadius: 8,
    marginLeft: 10,
    paddingHorizontal: 15,
    paddingVertical: 6,
  },
  datePickersDateButtonText: {
    color: COLORS.black,
    fontSize: 14,
    fontWeight: "500",
  },
  flightDate: {
    alignItems: "center",
    flexDirection: "row",
    height: 50,
    justifyContent: "space-between",
    paddingHorizontal: 15,
    width: "100%",
  },
  flightDateLabel: {
    alignItems: "center",
    flexDirection: "row",
  },
  flightDateLabelText: {
    color: COLORS.gray,
    fontSize: 16,
    fontWeight: "500",
    marginLeft: 10,
  },
  iconWrapper: {
    alignItems: "center",
    backgroundColor: "#edf4ff",
    borderRadius: 100,
    height: 40,
    justifyContent: "center",
    width: 40
  },
  input: {
    backgroundColor: "#fff",
    color: "#000",
    flex: 1,
    fontSize: 15,
    fontWeight: "400",
    height: 50,
    paddingHorizontal: 15
  },
  inputGroup: {
    backgroundColor: "#fff",
    borderRadius: 8,
    marginBottom: 15,
    overflow: "hidden",
  },
  inputLabel: {
    color: COLORS.black,
    fontSize: 14,
    fontWeight: "400",
    width: 100
  },
  inputRow: {
    alignItems: "center",
    flexDirection: "row",
    paddingLeft: 15
  },
  screen: {
    flex: 1,
  },
  widthBorderBottom: {
    borderBottomColor: "#f2f2f2",
    borderBottomWidth: 1,
  },
});
