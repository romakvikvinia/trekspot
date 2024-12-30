import { NativeStackScreenProps } from "@react-navigation/native-stack";
import Constants from "expo-constants";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { toast } from "sonner-native";

import { useUpdateMeMutation } from "../../api/api.trekspot";
import { TInput } from "../../common/ui/TInput";
import { ScreenHeader } from "../../components/common/ScreenHeader";
import { SettingRouteStackParamList } from "../../routes/setting/SettingRoutes";
import { globalStyles } from "../../styles/globalStyles";
import { COLORS } from "../../styles/theme";
import {
  EyeCrossicon,
  EyeNoCrossicon,
} from "../../utilities/SvgIcons.utility";
import { ResetPasswordValidationSchema } from "./validationScheme";

type ResetPassword = NativeStackScreenProps<
  SettingRouteStackParamList,
  "ResetPasswordScreen"
>;

export const ResetPassword: React.FC<ResetPassword> = ({ navigation }) => {
  const [isSecureType, setIsSecureType] = useState(true);
  const [isNewPasswordSecureType, setIsNewPasswordSecureType] = useState(true);

  const [
    fetchUpdateMe,
    { isLoading: isLoadingUpdateMe, isSuccess: isSuccessUpdateMe },
  ] = useUpdateMeMutation();

  const formik = useFormik({
    initialValues: {
      password: "",
      confirm_password: "",
    },
    validationSchema: ResetPasswordValidationSchema,
    onSubmit: async (values, methods) => {
      methods.setSubmitting(true);

      fetchUpdateMe({
        password: values.password,
      });
      console.log("value", values);
    },
  });

  useEffect(() => {
    if (isSuccessUpdateMe) {
      toast.success("Password updated successfully", {
        duration: 2000,
      });
      navigation.goBack();
    }
  }, [isSuccessUpdateMe]);

  const disabled =
    formik.isSubmitting ||
    !formik.values.password ||
    !formik.values.confirm_password;

 
  return (
    <View style={styles.safeArea}>
      <KeyboardAvoidingView
        // behavior="padding"
        behavior={Platform.OS == "ios" ? "padding" : "height"}
        // keyboardVerticalOffset={10}
        style={styles.screen}
      > 
        <ScreenHeader title="Reset password" />
        <ScrollView
          style={{ flex: 1, paddingTop: 25 }}
          contentContainerStyle={{ paddingHorizontal: 15 }}
          keyboardShouldPersistTaps={"handled"}
        >
          <View style={[styles.item]}>
            <TInput
              invalid={
                "password" in formik.errors && "password" in formik.touched
              }
              placeholder="New password"
              autoCapitalize="none"
              returnKeyType="next"
              secureTextEntry={isNewPasswordSecureType}
              style={{ borderWidth: 2 }}
              value={formik.values.password}
              onChangeText={formik.handleChange("password")}
              onBlur={formik.handleBlur("password")}
            />
            <TouchableOpacity
              activeOpacity={0.5}
              style={styles.passwordVisibleToggle}
              onPress={() =>
                setIsNewPasswordSecureType(!isNewPasswordSecureType)
              }
            >
              {isNewPasswordSecureType ? <EyeNoCrossicon /> : <EyeCrossicon />}
            </TouchableOpacity>
          </View>
          <View style={[styles.item]}>
            <TInput
              invalid={
                "confirm_password" in formik.errors &&
                "confirm_password" in formik.touched
              }
              placeholder="Confirm password"
              autoCapitalize="none"
              secureTextEntry={isSecureType}
              returnKeyType="next"
              style={{ borderWidth: 2 }}
              value={formik.values.confirm_password}
              onChangeText={formik.handleChange("confirm_password")}
              onBlur={formik.handleBlur("confirm_password")}
            />
            <TouchableOpacity
              activeOpacity={0.5}
              style={styles.passwordVisibleToggle}
              onPress={() => setIsSecureType(!isSecureType)}
            >
              {isSecureType ? <EyeNoCrossicon /> : <EyeCrossicon />}
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            activeOpacity={0.1}
            style={[
              globalStyles.buttonItemPrimary,

              !!Object.keys(formik.errors).length || disabled
                ? globalStyles.buttonItemPrimaryDisabled
                : null,
            ]}
            onPress={formik.submitForm}
            disabled={!!Object.keys(formik.errors).length || disabled}
          >
            {formik.isSubmitting ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text style={globalStyles.buttonItemPrimaryText}>
                Update password
              </Text>
            )}
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  backButton: {
    width: 30,
  },
  header: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
    paddingHorizontal: 15,
  },
  item: {
    alignItems: "center",
    flexDirection: "row",
    marginBottom: 15,
    overflow: "hidden",
    width: "100%",
  },
  passwordVisibleToggle: {
    alignItems: "center",
    backgroundColor: "#fdfdff",
    height: 40,
    justifyContent: "center",
    paddingRight: 5,
    position: "absolute",
    right: 2,
    width: 40,
  },
  safeArea: {
    backgroundColor: "#f8f8f8",
    flex: 1,
    paddingTop: Constants?.statusBarHeight + (Platform.OS === "android" ? 5 : 10),
  },
  screen: {
    flex: 1,
    width: "100%",
  },
  title: {
    color: COLORS.black,
    fontSize: 18,
    fontWeight: "500",
  },
});
