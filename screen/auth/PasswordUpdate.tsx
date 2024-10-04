import { useState, useEffect } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  ActivityIndicator,
  Animated,
  Platform,
  SafeAreaView,
  Alert,
} from "react-native";
import Constants from "expo-constants";

import { SignUpValidationSchema } from "./validationScheme";
import { TInput } from "../../common/ui/TInput";
import { AuthStackParamList } from "../../routes/auth/AuthRoutes";
import { COLORS, SIZES } from "../../styles/theme";
import { globalStyles } from "../../styles/globalStyles";

import { trekSpotApi, useSignUpMutation } from "../../api/api.trekspot";
import { TrekSpotLinear } from "../../utilities/svg";

type SignUpScreenProps = NativeStackScreenProps<AuthStackParamList, "SignUp">;

export const PasswordUpdate: React.FC<SignUpScreenProps> = ({ navigation }) => {
  const dispatch = useDispatch();
 
  const formik = useFormik({
    initialValues: {
      email: "",
      firstName: "",
      lastName: "",
      password: "",
    },
    validationSchema: SignUpValidationSchema,
    onSubmit: async ({ firstName, lastName, email, password }, methods) => {
      methods.setSubmitting(true);
     
    },
  });
 
  return (
    <View style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
        style={styles.screen}
      >
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={styles.container}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps={"handled"}
        >
          <View style={styles.topSide}>
            <View style={styles.logoContainer}>
              <TrekSpotLinear />
            </View>
            <View style={styles.signTitle}>
              <Text style={styles.signTitleText}>
                Password update
              </Text>
            </View>
 
            <View style={[styles.item]}>
              <TInput
                invalid={
                  "password" in formik.errors && "password" in formik.touched
                }
                placeholder="Password"
                secureTextEntry
                keyboardType="default"
                autoCapitalize="none"
                returnKeyType="go"
                value={formik.values.password}
                onChangeText={formik.handleChange("password")}
                onBlur={formik.handleBlur("password")}
                onSubmitEditing={() => {
                  if (
                    !("password" in formik.errors) ||
                    !("email" in formik.errors) ||
                    !formik.isSubmitting
                  ) {
                    formik.submitForm();
                  }
                }}
                style={{
                  borderWidth: 2,
                  height: 55,
                }}
              />
            </View>

            <TouchableOpacity
              activeOpacity={0.7}
              style={[
                globalStyles.buttonItemPrimary,
                "password" in formik.errors ||
                "email" in formik.errors ||
                formik.isSubmitting
                  ? globalStyles.buttonItemPrimaryDisabled
                  : null,
              ]}
              onPress={formik.submitForm}
              disabled={
                "password" in formik.errors ||
                "email" in formik.errors ||
                formik.isSubmitting 
              }
            >
              {formik.isSubmitting ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <Text style={globalStyles.buttonItemPrimaryText}>Sign Up</Text>
              )}
            </TouchableOpacity>

            <View style={styles.textWithButtonWrapper}>
              <Text style={styles.textWithButtonLabel}>Have an account?</Text>
              <TouchableOpacity
                activeOpacity={0.7}
                style={styles.textWithButton}
                onPress={() => navigation.navigate("SignIn")}
              >
                <Text style={styles.textWithButtonText}>Sign In</Text>
              </TouchableOpacity>
            </View>
          </View>
          
        </ScrollView>
       
      </KeyboardAvoidingView>
    </View>
  );
};
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#ffffff",
    paddingTop: Constants?.statusBarHeight + 10,
  },
  topSide: {
    width: "100%",
  },
  textWithButtonWrapper: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 25,
    marginBottom: 15,
    paddingBottom: 15
  },
  textWithButtonLabel: {
    fontSize: SIZES.body2,
    color: "#000",
  },
  textWithButton: {
    marginLeft: 5,
  },
  textWithButtonText: {
    fontSize: SIZES.body2,
    color: COLORS.primary,
    fontWeight: "bold",
  },
  container: {
    flexGrow: 1,
  },
  screen: {
    flex: 1,
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 15,
    justifyContent: "space-between",
  },
  signTitle: {
    marginTop: 0,
    width: "100%",
    marginBottom: 45,
  },
  signTitleText: {
    fontSize: 17,
    fontWeight: "bold",
  },
  item: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    overflow: "hidden",
    marginBottom: 15,
  },

  logoContainer: {
    marginVertical: 5,
    width: "100%",
    alignItems: "flex-start",
    marginBottom: 15,
  },
});
