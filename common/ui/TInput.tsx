import React, { useState } from "react";
import { StyleSheet, View, TextInput } from "react-native";
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
            borderColor: focused && !props.invalid ? COLORS.primary : "#e9e9e9",
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
    width: "100%",
    height: 55,
  },
  input: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderColor: "#e9e9e9",
    borderWidth: 1,
    height: "100%",
    backgroundColor: "#fdfdff",
    fontSize: 14,
    borderRadius: 8,
    paddingLeft: 10,
  },
  invalid: {
    borderColor: isInvalidColor,
  },
});
