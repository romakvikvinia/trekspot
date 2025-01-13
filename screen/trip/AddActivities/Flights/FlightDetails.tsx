import { useNavigation } from "@react-navigation/native";
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
  CostIcon,
  DepartIcon,
  DescriptionIcon,
  NoteIcon,
} from "../../../../utilities/SvgIcons.utility";
import { FilesRow } from "../../components/FilesRow";
import { Header } from "./Header";
import { NormalHeader } from "./NormalHeader";

export const FlightDetails = ({route}) => {
  const { isPreview } = route?.params;
  const navigation = useNavigation();
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

  const handleSelectDepartureAirport = () => {
    navigation.navigate("SearchAirport");
  };

  return (
    <PaperProvider theme={theme}>
      <SafeAreaView style={{ flex: 1 }}>
        <KeyboardAvoidingView
          behavior={Platform.OS == "ios" ? "padding" : "height"}
          style={styles.screen}
        >
          {!isPreview ? (
            <Header isFlightDetails />
          ) : (
            <NormalHeader title="Flight" />
          )}

          <ScrollView
            style={{ flex: 1 }}
            contentContainerStyle={{
              paddingHorizontal: 15,
              paddingTop: isPreview ? 15 : 0,
            }}
            keyboardShouldPersistTaps="handled"
            keyboardDismissMode="interactive"
          >
            <View style={styles.inputGroup}>
              <View style={[styles.inputRow, styles.widthBorderBottom]}>
                <Text style={styles.inputLabel}>Flight number</Text>
                {!isPreview ? (
                  <TextInput
                    style={styles.input}
                    placeholder="E.g EK162"
                    placeholderTextColor="#c6c6c6"
                    editable={!isPreview}
                    autoFocus
                  />
                ) : (
                  <View style={styles.inputValueWrapper}>
                    <Text style={styles.inputValue}>EK162</Text>
                  </View>
                )}
              </View>
              <View style={styles.inputRow}>
                <Text style={styles.inputLabel}>Airline</Text>
                {!isPreview ? (
                  <TextInput
                    style={styles.input}
                    placeholder="E.g Emirates"
                    editable={!isPreview}
                    placeholderTextColor="#c6c6c6"
                  />
                ) : (
                  <View style={styles.inputValueWrapper}>
                    <Text style={styles.inputValue}>Emirates</Text>
                  </View>
                )}
              </View>
            </View>

            <View style={styles.airportSelection}>
              <Pressable
                disabled={isPreview}
                style={({ pressed }) => [
                  styles.airportSelectionButton,
                  styles.widthBorderBottom,
                  { backgroundColor: pressed ? "#fafafa" : "#fff" },
                ]}
                onPress={handleSelectDepartureAirport}
              >
                <View style={styles.iconWrapper}>
                  <DepartIcon size="20" color={COLORS.primary} />
                </View>
                <Text style={styles.airportSelectionButtonText}>
                  Tbilisi international airport
                  {/* Select departure airport */}
                </Text>
              </Pressable>
              <View style={styles.flightDate}>
                <View style={styles.flightDateLabel}>
                  <CalendarLightIcon size="20" color="#86858c" />
                  <Text style={styles.flightDateLabelText}>Departure</Text>
                </View>

                <View style={styles.datePickers}>
                  <Pressable
                    disabled={isPreview}
                    style={({ pressed }) => [
                      styles.datePickersDateButton,
                      { backgroundColor: pressed ? "#fafafa" : "#eaeaea" },
                    ]}
                    onPress={() => setDatePickerVisible(true)}
                  >
                    <Text style={styles.datePickersDateButtonText}>Date</Text>
                  </Pressable>
                  <Pressable
                    disabled={isPreview}
                    style={({ pressed }) => [
                      styles.datePickersDateButton,
                      { backgroundColor: pressed ? "#fafafa" : "#eaeaea" },
                    ]}
                    onPress={() => setVisible(true)}
                  >
                    <Text style={styles.datePickersDateButtonText}>Time</Text>
                  </Pressable>
                </View>
              </View>
            </View>
            <View style={styles.airportSelection}>
              <Pressable
                disabled={isPreview}
                style={({ pressed }) => [
                  styles.airportSelectionButton,
                  styles.widthBorderBottom,
                  { backgroundColor: pressed ? "#fafafa" : "#fff" },
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
                  <Pressable
                    disabled={isPreview}
                    style={({ pressed }) => [
                      styles.datePickersDateButton,
                      { backgroundColor: pressed ? "#fafafa" : "#eaeaea" },
                    ]}
                  >
                    <Text style={styles.datePickersDateButtonText}>Date</Text>
                  </Pressable>
                  <Pressable
                    disabled={isPreview}
                    style={({ pressed }) => [
                      styles.datePickersDateButton,
                      { backgroundColor: pressed ? "#fafafa" : "#eaeaea" },
                    ]}
                  >
                    <Text style={styles.datePickersDateButtonText}>Time</Text>
                  </Pressable>
                </View>
              </View>
            </View>
            <View style={styles.inputGroup}>
              <View style={[styles.inputRow, styles.widthBorderBottom]}>
                <Text style={styles.inputLabel}>Flight duration</Text>
                <View
                  style={[
                    styles.inputValueWrapper,
                    {
                      alignItems: "flex-end",
                    },
                  ]}
                >
                  <Text style={styles.inputValue}>3h 15m</Text>
                </View>
              </View>
              <View style={styles.inputRow}>
                <Text style={styles.inputLabel}>Distance</Text>
                <View
                  style={[
                    styles.inputValueWrapper,
                    {
                      alignItems: "flex-end",
                    },
                  ]}
                >
                  <Text style={styles.inputValue}>345Km</Text>
                </View>
              </View>
            </View>

            <View style={styles.inputGroup}>
              <View style={[styles.inputRow, styles.widthBorderBottom]}>
                <Text style={styles.inputLabel}>Reserv. Code</Text>
                {!isPreview ? (
                  <TextInput
                    style={styles.input}
                    placeholder="E.g GHD12"
                    placeholderTextColor="#c6c6c6"
                    editable={!isPreview}
                  />
                ) : (
                  <View style={styles.inputValueWrapper}>
                    <Text style={styles.inputValue}>EK162</Text>
                  </View>
                )}
              </View>
              <View style={[styles.inputRow, styles.widthBorderBottom]}>
                <Text style={styles.inputLabel}>Seat</Text>
                {!isPreview ? (
                  <TextInput
                    style={styles.input}
                    placeholder="E.g 14C"
                    placeholderTextColor="#c6c6c6"
                    editable={!isPreview}
                  />
                ) : (
                  <View style={styles.inputValueWrapper}>
                    <Text style={styles.inputValue}>14C</Text>
                  </View>
                )}
              </View>
              <View style={styles.inputRow}>
                <Text style={styles.inputLabel}>Seat Class</Text>
                {!isPreview ? (
                  <TextInput
                    style={styles.input}
                    placeholder="E.g Premium"
                    placeholderTextColor="#c6c6c6"
                    editable={!isPreview}
                  />
                ) : (
                  <View style={styles.inputValueWrapper}>
                    <Text style={styles.inputValue}>Premium</Text>
                  </View>
                )}
              </View>
            </View>

            <View style={styles.inputGroup}>
              <View style={styles.inputRow}>
                <CostIcon size={20} color="#86858c" />
                <Text
                  style={[
                    styles.inputLabel,
                    {
                      marginLeft: 8,
                      width: 70,
                    },
                  ]}
                >
                  Cost
                </Text>
                {!isPreview ? (
                  <TextInput
                    style={styles.input}
                    placeholder="E.g 400$"
                    placeholderTextColor="#c6c6c6"
                    editable={!isPreview}
                  />
                ) : (
                  <View style={styles.inputValueWrapper}>
                    <Text style={styles.inputValue}>400$</Text>
                  </View>
                )}
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Pressable
                disabled={isPreview}
                onPress={() =>
                  navigation.navigate("ActivityNoteOrDescription", {
                    type: "note",
                  })
                }
                style={({ pressed }) => [
                  styles.inputRow,
                  styles.widthBorderBottom,
                  {
                    height: 50,
                    paddingRight: 15,
                    backgroundColor: pressed ? "#fafafa" : "#fff",
                  },
                ]}
              >
                <NoteIcon size={20} color="#86858c" />
                <Text
                  style={[
                    styles.inputLabel,
                    {
                      marginLeft: 8,
                    },
                  ]}
                >
                  Notes
                </Text>
                {!isPreview ? (
                  <Text style={styles.placeholder} numberOfLines={1}>
                    Enter here...
                  </Text>
                ) : (
                  <Text style={styles.textValue} numberOfLines={1}>
                     This is my note... 
                  </Text>
                )}
              </Pressable>
              <Pressable
                disabled={isPreview}
                onPress={() =>
                  navigation.navigate("ActivityNoteOrDescription", {
                    type: "description",
                  })
                }
                style={({ pressed }) => [
                  styles.inputRow,
                  {
                    height: 50,
                    paddingRight: 15,
                    backgroundColor: pressed ? "#fafafa" : "#fff",
                  },
                ]}
              >
                <DescriptionIcon size={20} color="#86858c" />
                <Text
                  style={[
                    styles.inputLabel,
                    {
                      marginLeft: 8,
                    },
                  ]}
                >
                  Description
                </Text>
                {!isPreview ? (
                  <Text style={styles.placeholder} numberOfLines={1}>
                    Enter here...
                  </Text>
                ) : (
                  <Text style={styles.textValue} numberOfLines={1}>
                    This is my description...
                  </Text>
                )}
              </Pressable>
            </View>

            <FilesRow isPreview={isPreview} />
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
    fontWeight: "500",
    width: 100
  },
  inputRow: {
    alignItems: "center",
    flexDirection: "row",
    paddingLeft: 15
  },
  inputValue: {
    backgroundColor: "#fff",
    color: "#000",
    fontSize: 16,
    fontWeight: "500",
    paddingHorizontal: 15,
    verticalAlign: "middle"
  },
  inputValueWrapper: {
    flex: 1,
    height: 50,
    justifyContent: "center"
  },
  placeholder: {
    color: "#c6c6c6",
    flex: 1,
    fontSize: 14,
    textAlign: "right"
  },
  screen: {
    flex: 1,
  },
  textValue: {
    color: COLORS.black,
    flex: 1,
    fontSize: 14,
    fontWeight: "400",
    textAlign: "right"
  },
  widthBorderBottom: {
    borderBottomColor: "#f2f2f2",
    borderBottomWidth: 1,
  },
});
