import React from "react";
import { View } from "react-native";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import { DatePickerModal } from "react-native-paper-dates";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { COLORS } from "../../styles/theme";

export const SingleDatePicker = ({ setOpen, open, handleDateChange }) => {
  const onDismiss = React.useCallback(() => {
    setOpen(false);
  }, [setOpen]);
 
  const onConfirm = React.useCallback(
    (params) => {
      setOpen(false);
      handleDateChange(params?.date)
    },
    [setOpen]
  );

  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: COLORS.primary,
      primaryContainer: "#dfebff",
    },
  };

  const today = new Date();
  const startDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());

  return (
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
            mode="single"
            visible={open}
            onDismiss={onDismiss}
            date={undefined}
            onConfirm={onConfirm}
            presentationStyle={"pageSheet"}
            disableStatusBarPadding={false}
            saveLabel="Confirm"
            validRange={{ startDate: startDate, endDate: undefined }}
          />
        </View>
      </SafeAreaProvider>
    </PaperProvider>
  );
};
