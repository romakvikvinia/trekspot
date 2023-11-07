import React from "react";
import { StyleSheet, View, TextInput } from "react-native";
import { isInvalidColor } from "../../styles/colors";

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
}

export const TInput: React.FC<TInputProps> = (props: any) => {
  return (
    <View
      style={[
        styles.formControl,
        props.style ? props.style : {},
        props.isValid ? styles.isValid : {},
      ]}
    >
      <TextInput {...props} style={[styles.input]} />
    </View>
  );
};

const styles = StyleSheet.create({
  formControl: {
    width: "100%",
    height: 50,
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
  isValid: {
    borderBottomColor: isInvalidColor,
    borderBottomWidth: 1,
  },
});
