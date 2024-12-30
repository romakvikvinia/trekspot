import React, { useState } from "react";
import { StyleSheet, TextInput,View } from "react-native";

import { isInvalidColor } from "../../styles/colors";
import { COLORS } from "../../styles/theme";

interface TInputProps {
  isValid?: boolean;
  placeholder?: string;
  secureTextEntry?: any;
  keyboardType?: string;
  autoCapitalize?: string;
  returnKeyType?: string;
  value?: any;
  onChangeText?: any;
  onBlur?: any;
  onSubmitEditing?: any;
  invalid: boolean;
  style: any;
}

export const TInput: React.FC<TInputProps> = (props: any) => {
  const [focused, setFocused] = useState();
  return (
    <View style={[styles.formControl]}>
      <TextInput
        keyboardType={props.keyboardType}
        {...props}
        style={[
          styles.input,
          props.style,
          {
            borderColor: focused && !props.invalid ? COLORS.black : "#e9e9e9",
          },
          props.invalid ? styles.invalid : {},
        ]}
        placeholderTextColor={COLORS.darkgray}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  formControl: {
    height: 55,
    width: "100%",
  },
  input: {
    backgroundColor: "#fdfdff",
    borderColor: "#e9e9e9",
    borderRadius: 8,
    borderWidth: 1,
    fontSize: 14,
    fontWeight: "500",
    height: "100%",
    paddingHorizontal: 2,
    paddingLeft: 10,
    paddingVertical: 5
  },
  invalid: {
    borderColor: isInvalidColor,
  },
});
