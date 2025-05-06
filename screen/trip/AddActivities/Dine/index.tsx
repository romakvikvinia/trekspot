import { useNavigation } from "@react-navigation/native";
import Constants from "expo-constants";
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
import { DefaultTheme, PaperProvider } from "react-native-paper";
import { DatePickerModal, TimePickerModal } from "react-native-paper-dates";

import { COLORS } from "../../../../styles/theme";
import {
  CalendarLightIcon,
  LocationLinearIcon,
} from "../../../../utilities/SvgIcons.utility";
import { FilesRow } from "../../components/FilesRow";
import { Header } from "./Header";
import { NormalHeader } from "./NormalHeader";

export const Dine = ({ route }) => {
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
      <View style={[styles.safeArea,{
        paddingTop: !isPreview ? 20 : Constants?.statusBarHeight + 15,
      }]}>
        <KeyboardAvoidingView
          behavior={Platform.OS == "ios" ? "padding" : "height"}
          style={styles.screen}
        >
          {!isPreview ? <Header /> : <NormalHeader title="Dining" />}

          <ScrollView
            style={{ flex: 1 }}
            contentContainerStyle={{
              paddingHorizontal: 15,
              paddingTop: isPreview ? 15 : 0,
            }}
            keyboardShouldPersistTaps="handled"
            keyboardDismissMode="interactive"
          >
            <Pressable
              style={styles.inputGroup}
              disabled={isPreview}
              onPress={handleSelectDepartureplace}
            >
              <View style={[styles.inputRow, styles.widthBorderBottom]}>
                <Text style={styles.inputLabel}>Dining name</Text>
                {!isPreview ? (
                  <TextInput
                    style={styles.input}
                    placeholder="e.g Disfrutar"
                    placeholderTextColor="#c6c6c6"
                    editable={!isPreview}
                    
                  />
                ) : (
                  <View style={styles.inputValueWrapper}>
                    <Text style={styles.inputValue}>Disfrutar</Text>
                  </View>
                )}
              </View>
            </Pressable>
            
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
                <Text style={styles.placeSelectionButtonText}>
                  {!isPreview
                    ? "Add address"
                    : "Villarroel 163, 08036 Barcelona, Spain"}
                </Text>
              </Pressable>
              <View style={styles.routeDate}>
                <View style={styles.routeDateLabel}>
                  <CalendarLightIcon size="20" color="#86858c" />
                  <Text style={styles.routeDateLabelText}>Date</Text>
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
                    <Text style={styles.datePickersDateButtonText}>
                      {!isPreview ? "Date" : "17 Nov"}
                    </Text>
                  </Pressable>
                  <Pressable
                    disabled={isPreview}
                    style={({ pressed }) => [
                      styles.datePickersDateButton,
                      { backgroundColor: pressed ? "#fafafa" : "#eaeaea" },
                    ]}
                    onPress={() => setVisible(true)}
                  >
                    <Text style={styles.datePickersDateButtonText}>
                      {!isPreview ? "Time" : "18:00"}
                    </Text>
                  </Pressable>
                </View>
              </View>
            </View>

            <View style={styles.inputGroup}>
              <View style={[styles.inputRow, styles.widthBorderBottom]}>
                <Text style={styles.inputLabel}>Phone</Text>
                <TextInput
                  style={styles.input}
                  placeholder="e.g (XXX) XXX-XXX"
                  placeholderTextColor="#c6c6c6"
                  editable={!isPreview}
                  
                />
              </View>
              <View style={[styles.inputRow, styles.widthBorderBottom]}>
                <Text style={styles.inputLabel}>Website</Text>
                <TextInput
                  style={styles.input}
                  placeholder="e.g https://travelfy.io"
                  placeholderTextColor="#c6c6c6"
                  editable={!isPreview}
                  
                />
              </View>
              <View style={[styles.inputRow, styles.widthBorderBottom]}>
                <Text style={styles.inputLabel}>Email</Text>
                <TextInput
                  style={styles.input}
                  placeholder="e.g info@travelfy.io"
                  placeholderTextColor="#c6c6c6"
                  editable={!isPreview}
                  
                />
              </View>
              <View style={[styles.inputRow, styles.widthBorderBottom]}>
                <Text style={styles.inputLabel}>Confirmation</Text>
                <TextInput
                  style={styles.input}
                  placeholder="e.g BBK33"
                  placeholderTextColor="#c6c6c6"
                  editable={!isPreview}
                  
                />
              </View>
            </View>
  
            <FilesRow isPreview={isPreview} />
          </ScrollView>
        </KeyboardAvoidingView>
      </View>

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
  inputValue: {
    backgroundColor: "#fff",
    color: "#000",
    fontSize: 16,
    fontWeight: "500",
    paddingHorizontal: 15,
    verticalAlign: "middle",
  },
  inputValueWrapper: {
    flex: 1,
    height: 50,
    justifyContent: "center",
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
  safeArea: {
    flex: 1,
  },
  screen: {
    flex: 1,
  },
  widthBorderBottom: {
    borderBottomColor: "#f2f2f2",
    borderBottomWidth: 1,
  },
});
