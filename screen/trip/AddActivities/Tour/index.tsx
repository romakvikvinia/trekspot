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
  CalendarLightIcon,
  CostIcon,
  DescriptionIcon,
  LocationLinearIcon,
  NoteIcon,
} from "../../../../utilities/SvgIcons.utility";
import { FilesRow } from "../../components/FilesRow";
import { Header } from "./Header";
import { NormalHeader } from "./NormalHeader";

export const Tour = ({ route }) => {
  const { isPreview } = route?.params;

  const navigation = useNavigation();
  const [visible, setVisible] = useState(false);
  const [datepickerVisible, setDatePickerVisible] = useState(false);

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

  const handleSelectDepartureplace = () => {
    navigation.navigate("AutocompletePlaces");
  };

  return (
    <PaperProvider theme={theme}>
      <SafeAreaView style={{ flex: 1 }}>
        <KeyboardAvoidingView
          behavior={Platform.OS == "ios" ? "padding" : "height"}
          style={styles.screen}
        >
          {!isPreview ? <Header /> : <NormalHeader title="Tour" />}

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
                <Text style={styles.inputLabel}>Event name</Text>
                <TextInput
                  style={styles.input}
                  placeholder="E.g. Adventure tour"
                  placeholderTextColor="#c6c6c6"
                  editable={!isPreview}
                  autoFocus
                />
              </View>
            </View>
            <View style={styles.placeSelection}>
              <Pressable
                disabled={isPreview}
                style={({ pressed }) => [
                  styles.placeSelectionButton,
                  styles.widthBorderBottom,
                  { backgroundColor: pressed ? "#fafafa" : "#fff" },
                ]}
                onPress={handleSelectDepartureplace}
              >
                <View style={styles.iconWrapper}>
                  <LocationLinearIcon size="20" color={COLORS.primary} />
                </View>
                <Text style={styles.placeSelectionButtonText}>Add address</Text>
              </Pressable>
              <View style={styles.routeDate}>
                <View style={styles.routeDateLabel}>
                  <CalendarLightIcon size="20" color="#86858c" />
                  <Text style={styles.routeDateLabelText}>Start date</Text>
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
            <View style={styles.placeSelection}>
              <View style={styles.routeDate}>
                <View style={styles.routeDateLabel}>
                  <CalendarLightIcon size="20" color="#86858c" />
                  <Text style={styles.routeDateLabelText}>End date</Text>
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

            <View style={styles.inputGroup}>
              <View style={[styles.inputRow, styles.widthBorderBottom]}>
                <Text style={styles.inputLabel}>Phone</Text>
                <TextInput
                  style={styles.input}
                  placeholder="E.g. (XXX) XXX-XXX"
                  placeholderTextColor="#c6c6c6"
                  editable={!isPreview}
                  autoFocus
                />
              </View>
              <View style={[styles.inputRow, styles.widthBorderBottom]}>
                <Text style={styles.inputLabel}>Website</Text>
                <TextInput
                  style={styles.input}
                  placeholder="E.g. https://trekspot.io"
                  placeholderTextColor="#c6c6c6"
                  editable={!isPreview}
                  autoFocus
                />
              </View>
              <View style={[styles.inputRow, styles.widthBorderBottom]}>
                <Text style={styles.inputLabel}>Email</Text>
                <TextInput
                  style={styles.input}
                  placeholder="E.g. info@trekspot.io"
                  placeholderTextColor="#c6c6c6"
                  editable={!isPreview}
                  autoFocus
                />
              </View>
              <View style={[styles.inputRow, styles.widthBorderBottom]}>
                <Text style={styles.inputLabel}>Confirmation</Text>
                <TextInput
                  style={styles.input}
                  placeholder="E.g. BBK33"
                  placeholderTextColor="#c6c6c6"
                  editable={!isPreview}
                  autoFocus
                />
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
                <TextInput
                  style={styles.input}
                  placeholder="400$"
                  placeholderTextColor="#c6c6c6"
                  editable={!isPreview}
                />
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
                {true ? (
                  <Text style={styles.placeholder} numberOfLines={1}>
                    Enter here...
                  </Text>
                ) : (
                  <Text style={styles.textValue} numberOfLines={1}>
                    {/* // This is my note... */}
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
                {true ? (
                  <Text style={styles.placeholder} numberOfLines={1}>
                    Enter here...
                  </Text>
                ) : (
                  <Text style={styles.textValue} numberOfLines={1}>
                    {/* // This is my description.. */}
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
  iconWrapper: {
    alignItems: "center",
    backgroundColor: "#edf4ff",
    borderRadius: 100,
    height: 40,
    justifyContent: "center",
    width: 40,
  },
  input: {
    backgroundColor: "#fff",
    color: "#000",
    flex: 1,
    fontSize: 15,
    fontWeight: "400",
    height: 50,
    paddingHorizontal: 15,
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
    width: 100,
  },
  inputRow: {
    alignItems: "center",
    flexDirection: "row",
    paddingLeft: 15,
  },
  placeSelection: {
    backgroundColor: "#fff",
    borderRadius: 8,
    marginBottom: 15,
    overflow: "hidden",
  },
  placeSelectionButton: {
    alignItems: "center",
    flexDirection: "row",
    height: 70,
    paddingHorizontal: 15,
  },
  placeSelectionButtonText: {
    color: COLORS.primary,
    fontSize: 14,
    fontWeight: "600",
    paddingLeft: 10,
  },
  placeholder: {
    color: "#c6c6c6",
    flex: 1,
    fontSize: 14,
    textAlign: "right",
  },
  routeDate: {
    alignItems: "center",
    flexDirection: "row",
    height: 50,
    justifyContent: "space-between",
    paddingHorizontal: 15,
    width: "100%",
  },
  routeDateLabel: {
    alignItems: "center",
    flexDirection: "row",
  },
  routeDateLabelText: {
    color: COLORS.gray,
    fontSize: 16,
    fontWeight: "500",
    marginLeft: 10,
  },
  screen: {
    flex: 1,
  },
  textValue: {
    color: COLORS.black,
    flex: 1,
    fontSize: 14,
    fontWeight: "400",
    textAlign: "right",
  },
  widthBorderBottom: {
    borderBottomColor: "#f2f2f2",
    borderBottomWidth: 1,
  },
});
