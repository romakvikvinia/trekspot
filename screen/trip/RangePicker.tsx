import React from "react";
import { View } from "react-native";
import { DatePickerModal } from "react-native-paper-dates";
import { SafeAreaProvider } from "react-native-safe-area-context";

export const RangePicker = ({ setOpen, open, formik }) => {
  const onDismiss = React.useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const onConfirm = React.useCallback(
    ({ startDate, endDate }) => {
      setOpen(false);

      formik.setFieldValue("range", {
        startDate,
        endDate,
      });
    },
    [setOpen]
  );

  return (
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
          startDate={formik?.values?.range?.startDate}
          endDate={formik?.values?.range?.endDate}
          onConfirm={onConfirm}
          presentationStyle={"pageSheet"}
          disableStatusBarPadding={false}
          saveLabel="Confirm"
        />
      </View>
    </SafeAreaProvider>
  );
};
