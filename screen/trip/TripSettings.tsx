// import * as Clipboard from "expo-clipboard";
import { useNavigation } from "@react-navigation/native";
import Constants from "expo-constants";
import moment from "moment";
import { useCallback, useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { DefaultTheme, PaperProvider } from "react-native-paper";
import { DatePickerModal } from "react-native-paper-dates";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { TInput } from "../../common/ui/TInput";
import { ScreenHeader } from "../../components/common/ScreenHeader";
import { COLORS, SIZES } from "../../styles/theme";
import {
  CalendarFilledIcon,
  LocationPin,
  RightIcon,
  TrashIcon,
} from "../../utilities/SvgIcons.utility";

export const TripSettings = ({ route }) => {
  const navigation = useNavigation();
  const { trip } = route?.params || {};

  const [tripData, setTripData] = useState(trip);
  const [open, setOpen] = useState(false);

  const handleTripNameChange = (e) => {
    console.log("e", e);
    setTripData((prevState) => {
      return {
        ...prevState,
        name: e,
      };
    });
  };

  const onDismiss = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const onConfirm = useCallback(
    ({ startDate, endDate }) => {
      setOpen(false);
      setTripData((prevState) => {
        return {
          ...prevState,
          startAt: startDate,
          endAt: endDate,
        };
      });
    },
    [setOpen]
  );
  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: COLORS.primary,
      primaryContainer: "#dfebff",
      surface:  "#fff",
    },
  };

  console.log("tripData", tripData);

  return (
    <>
      <View style={styles.safeArea}>
        <KeyboardAvoidingView
          behavior={Platform.OS == "ios" ? "padding" : "height"}
          style={styles.screen}
        >
          <ScreenHeader title="Trip settings" />

          <ScrollView
            style={{ flex: 1, paddingTop: 25 }}
            contentContainerStyle={{ paddingHorizontal: 15 }}
            keyboardShouldPersistTaps="handled"
          >
            <View style={styles.inputItem}>
              <Text style={styles.label}>Trip name</Text>
              <TInput
                autoCapitalize="none"
                returnKeyType="next"
                style={{ borderWidth: 2 }}
                value={tripData?.name}
                onChangeText={handleTripNameChange}
                onBlur=""
              />
            </View>
            <View style={styles.inputItem}>
              <Text style={styles.label}>Dates</Text>
              <Pressable
                style={styles.itemButton}
                onPress={() => setOpen(true)}
              >
                <CalendarFilledIcon />
                <Text style={styles.itemButtonLabel}>
                  {`${moment(tripData?.startAt).format("DD MMM")} - ${moment(tripData?.endAt).format("DD MMM")}`}
                </Text>
              </Pressable>
              <Text style={styles.subLabel}>
                Be careful! If you change the dates and the new range is
                different, any data from the days that are no longer included
                will be lost.
              </Text>
            </View>
            <View style={styles.inputItem}>
              <Text style={styles.label}>Destinations</Text>
              <Pressable style={styles.itemButton}>
                <LocationPin width={20} color="#000" />
                <Text style={styles.itemButtonLabel}>
                  {tripData?.cities?.map((c) => c?.city).join(", ")}
                </Text>
              </Pressable>
            </View>
            <Pressable
              style={({ pressed }) => [
                styles.saveButton,
                {
                  opacity: pressed ? 0.7 : 1,
                },
              ]}
            >
              {/* <ActivityIndicator /> */}
              <Text style={styles.saveButtonText}>Save</Text>
            </Pressable>

            <View style={styles.others}>
              <Pressable
                onPress={() => navigation.navigate("InviteTripMember")}
                style={[
                  styles.othersButton,
                  {
                    borderBottomColor: "#ccc",
                    borderBottomWidth: 1,
                  },
                ]}
              >
                <Text style={styles.othersButtonText}>Trip members</Text>
                <RightIcon width={20} color="#000" />
              </Pressable>
              <Pressable
                onPress={() =>
                  Alert.alert("Do you really want to delete trip?", "", [
                    {
                      text: "Cancel",
                      onPress: () => console.log("Cancel Pressed"),
                      style: "cancel",
                    },
                    {
                      text: "Delete",
                      onPress: () => console.log("OK Pressed"),
                      style: "destructive",
                    },
                  ])
                }
                style={styles.othersButton}
              >
                <Text
                  style={[
                    styles.othersButtonText,
                    {
                      color: "red",
                    },
                  ]}
                >
                  Delete trip
                </Text>
                <TrashIcon width="20" color="red" />
              </Pressable>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
      <PaperProvider theme={theme}>
        <SafeAreaProvider>
          <View
            style={{
              justifyContent: "center",
              flex: 1,
              alignItems: "center",
            }}
          >
            <DatePickerModal
              locale="en"
              mode="range"
              visible={open}
              onDismiss={onDismiss}
              onChange={(date) => console.log("onchnage", date)}
              startDate={undefined}
              endDate={undefined}
              onConfirm={onConfirm}
              presentationStyle={"pageSheet"}
              disableStatusBarPadding={false}
              saveLabel="Confirm"
            />
          </View>
        </SafeAreaProvider>
      </PaperProvider>
    </>
  );
};

const styles = StyleSheet.create({
  inputItem: {
    marginBottom: 25,
    width: "100%",
  },
  itemButton: {
    alignItems: "center",
    backgroundColor: "#fff",
    borderColor: "#e9e9e9",
    borderRadius: 8,
    borderWidth: 1,
    flexDirection: "row",
    height: 55,
    padding: 15,
    paddingLeft: 10,
  },
  itemButtonLabel: {
    color: "#000",
    fontSize: 14,
    fontWeight: "500",
    marginLeft: 10,
  },
  label: {
    color: "#000",
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 10,
  },
  others: {
    marginBottom: 50,
    marginTop: 50,
  },
  othersButton: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 20,
  },
  othersButtonText: {
    color: "#000",
    fontSize: 18,
    fontWeight: "500",
  },
  safeArea: {
    backgroundColor: "#f8f8f8",
    flex: 1,
    minHeight: SIZES.height,
    paddingTop:
      Constants?.statusBarHeight + (Platform.OS === "android" ? 5 : 10),
  },
  saveButton: {
    alignItems: "center",
    backgroundColor: "#000",
    borderRadius: 30,
    flexDirection: "row",
    height: 55,
    justifyContent: "center",
    marginTop: 0,
    width: "100%",
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
    marginHorizontal: 10,
  },
  screen: {
    flex: 1,
    width: "100%",
  },
  subLabel: {
    color: COLORS.darkgray,
    fontSize: 14,
    fontWeight: "400",
    marginTop: 10,
  },
});
