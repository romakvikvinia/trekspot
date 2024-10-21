import React, { useContext, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { TInput } from "../../common/ui/TInput";
import { globalStyles } from "../../styles/globalStyles";
import { COLORS } from "../../styles/theme";
import {
  BackIcon,
  EyeCrossicon,
  EyeNoCrossicon,
} from "../../utilities/SvgIcons.utility";
import Constants from "expo-constants";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { SettingRouteStackParamList } from "../../routes/setting/SettingRoutes";
import { useUpdateMeMutation } from "../../api/api.trekspot";
import { ResetPasswordValidationSchema } from "./validationScheme";
import { useFormik } from "formik";
import { toast } from "sonner-native";

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

  console.log(isSuccessUpdateMe);

  return (
    <View style={styles.safeArea}>
      <KeyboardAvoidingView
        // behavior="padding"
        behavior={Platform.OS == "ios" ? "padding" : "height"}
        // keyboardVerticalOffset={10}
        style={styles.screen}
      >
        <View style={globalStyles.screenHeader}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={globalStyles.screenHeaderBackButton}
          >
            <BackIcon size="30" />
          </TouchableOpacity>

          <Text style={globalStyles.screenTitle}>Reset password</Text>
          <TouchableOpacity
            style={globalStyles.screenHeaderBackButton}
          ></TouchableOpacity>
        </View>
        <ScrollView
          style={{ flex: 1, paddingTop: 25 }}
          contentContainerStyle={{ paddingHorizontal: 15 }}
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
  safeArea: {
    flex: 1,
    backgroundColor: "#f8f8f8",
    paddingTop: Constants?.statusBarHeight + 10,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  backButton: {
    width: 30,
  },
  title: {
    fontSize: 18,
    fontWeight: "500",
    color: COLORS.black,
  },
  item: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    overflow: "hidden",
    marginBottom: 15,
  },
  screen: {
    flex: 1,
    width: "100%",
  },
  passwordVisibleToggle: {
    position: "absolute",
    width: 40,
    height: 40,
    backgroundColor: "#fdfdff",
    right: 2,
    alignItems: "center",
    justifyContent: "center",
    paddingRight: 5,
  },
});
