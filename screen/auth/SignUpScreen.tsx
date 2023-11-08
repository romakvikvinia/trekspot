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

import { SignUpValidationSchema } from "./validationScheme";
import { TInput } from "../../common/ui/TInput";
import { AuthStackParamList } from "../../routes/auth/AuthRoutes";
import { COLORS, SIZES } from "../../styles/theme";
import { globalStyles } from "../../styles/globalStyles";
import { TrekSpotLinear } from "../../utilities/SvgIcons.utility";
import { trekSpotApi, useSignUpMutation } from "../../api/api.trekspot";

type SignUpScreenProps = NativeStackScreenProps<AuthStackParamList, "SignUp">;

export const SignUpScreen: React.FC<SignUpScreenProps> = ({ navigation }) => {
  const dispatch = useDispatch();
  const [fetchSignUp, { data, isSuccess, isLoading, error, isError }] =
    useSignUpMutation();
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
      fetchSignUp({ firstName, lastName, email, password });
    },
  });

  const [{ fadeValue }] = useState({
    fadeValue: new Animated.Value(0),
  });

  //animations
  useEffect(() => {
    Animated.timing(fadeValue, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  useEffect(() => {
    if (isSuccess && data) {
      Alert.alert("Success", "Account created successfully", [
        {
          onPress: () => {
            dispatch(trekSpotApi.util.resetApiState());
            formik.resetForm();
          },
          text: "OK",
        },
      ]);
    }
  }, [isSuccess, data]);

  if (isError) {
    Alert.alert(
      "Error",
      //@ts-ignore
      (error && "message" in error && error.message) || "Something went wrong",
      [
        {
          onPress: () => {
            dispatch(trekSpotApi.util.resetApiState());
          },
          text: "OK",
        },
      ]
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
        style={styles.screen}
      >
        <ScrollView contentContainerStyle={styles.container}>
          <Animated.View style={{ ...styles.screen, opacity: fadeValue }}>
            <View style={styles.topSide}>
              <View style={styles.logoContainer}>
                <TrekSpotLinear />
              </View>
              <View style={styles.signTitle}>
                <Text style={styles.signTitleText}>
                  Your travel hub awaits: Sign up to begin!
                </Text>
              </View>

              <View style={[styles.item]}>
                <TInput
                  invalid={
                    "email" in formik.errors && "email" in formik.touched
                  }
                  keyboardType="email-address"
                  placeholder="Email"
                  autoCapitalize="none"
                  returnKeyType="next"
                  value={formik.values.email}
                  onChangeText={formik.handleChange("email")}
                  onBlur={formik.handleBlur("email")}
                />
              </View>
              <View style={[styles.item]}>
                <TInput
                  invalid={
                    "firstName" in formik.errors &&
                    "firstName" in formik.touched
                  }
                  keyboardType="default"
                  placeholder="First Name"
                  autoCapitalize="none"
                  returnKeyType="next"
                  value={formik.values.firstName}
                  onChangeText={formik.handleChange("firstName")}
                  onBlur={formik.handleBlur("firstName")}
                />
              </View>
              <View style={[styles.item]}>
                <TInput
                  invalid={
                    "lastName" in formik.errors && "lastName" in formik.touched
                  }
                  keyboardType="default"
                  placeholder="Last name"
                  autoCapitalize="none"
                  returnKeyType="next"
                  value={formik.values.lastName}
                  onChangeText={formik.handleChange("lastName")}
                  onBlur={formik.handleBlur("lastName")}
                />
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
                  formik.isSubmitting ||
                  isLoading
                }
              >
                {formik.isSubmitting || isLoading ? (
                  <ActivityIndicator size="small" color="#fff" />
                ) : (
                  <Text style={globalStyles.buttonItemPrimaryText}>
                    Sign Up
                  </Text>
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
            <View style={[styles.textWithButtonWrapper]}>
              <Text
                style={[
                  styles.textWithButtonLabel,
                  {
                    fontSize: SIZES.body5,
                    color: COLORS.darkgray,
                  },
                ]}
              >
                By sign in / sign up you agree our
              </Text>
              <TouchableOpacity
                activeOpacity={0.7}
                style={styles.textWithButton}
              >
                <Text
                  style={[
                    styles.textWithButtonText,
                    {
                      fontSize: SIZES.body5,
                      fontWeight: "normal",
                      color: COLORS.primaryDark,
                      // textDecorationLine: "underline",
                    },
                  ]}
                >
                  privacy policy
                </Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  topSide: {
    width: "100%",
  },
  textWithButtonWrapper: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: SIZES.padding * 4,
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
    color: COLORS.secondary,
    fontWeight: "bold",
  },

  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  screen: {
    flex: 1,
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 15,
    justifyContent: "space-between",
  },
  signTitle: {
    marginTop: 15,
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
