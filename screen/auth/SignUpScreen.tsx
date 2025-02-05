import { NativeStackScreenProps } from "@react-navigation/native-stack";
import Constants from "expo-constants";
import * as WebBrowser from 'expo-web-browser';
import { useFormik } from "formik";
import { usePostHog } from "posthog-react-native";
import { useEffect,useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Animated,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch } from "react-redux";

import { trekSpotApi, useSignUpMutation } from "../../api/api.trekspot";
import { TInput } from "../../common/ui/TInput";
import { AuthStackParamList } from "../../routes/auth/AuthRoutes";
import { globalStyles } from "../../styles/globalStyles";
import { COLORS, SIZES } from "../../styles/theme";
import { Events } from "../../utilities/Posthog";
import { TrekSpotLinear } from "../../utilities/svg";
import { SignUpValidationSchema } from "./validationScheme";

type SignUpScreenProps = NativeStackScreenProps<AuthStackParamList, "SignUp">;

export const SignUpScreen: React.FC<SignUpScreenProps> = ({ navigation }) => {
  const posthog = usePostHog();
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
      posthog?.capture(Events.SignUp, { email });
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
      Alert.alert("Congratulation!", "Account created successfully", [
        {
          onPress: () => {
            navigation.navigate("Login");
            dispatch(trekSpotApi.util.resetApiState());
            formik.resetForm();
          },
          text: "Sign in",
        },
      ]); 
    }
  }, [isSuccess, data]);

  if (isError) {
    Alert.alert(
      "Warning",
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

  const _handlePressButtonAsync = async () => {
    const result = await WebBrowser.openBrowserAsync('https://trekspot.io/en/privacy-policy', {
      enableBarCollapsing: true,
    });
  };

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
                Your travel hub awaits: Sign up to begin!
              </Text>
            </View>

            <View style={[styles.item]}>
              <TInput
                invalid={"email" in formik.errors && "email" in formik.touched}
                keyboardType="email-address"
                placeholder="Email"
                autoCapitalize="none"
                returnKeyType="next"
                value={formik.values.email}
                onChangeText={formik.handleChange("email")}
                onBlur={formik.handleBlur("email")}
                style={{
                  borderWidth: 2,
                  height: 55,
                }}
              />
            </View>
            <View style={[styles.item]}>
              <TInput
                invalid={
                  "firstName" in formik.errors && "firstName" in formik.touched
                }
                keyboardType="default"
                placeholder="First Name"
                autoCapitalize="none"
                returnKeyType="next"
                value={formik.values.firstName}
                onChangeText={formik.handleChange("firstName")}
                onBlur={formik.handleBlur("firstName")}
                style={{
                  borderWidth: 2,
                  height: 55,
                }}
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
                style={{
                  borderWidth: 2,
                  height: 55,
                }}
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
                formik.isSubmitting ||
                isLoading
              }
            >
              {formik.isSubmitting || isLoading ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <Text style={globalStyles.buttonItemPrimaryText}>Sign Up</Text>
              )}
            </TouchableOpacity>

            <View style={[styles.textWithButtonWrapper,{
            marginTop: 45
          }]}>
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
          <View style={[styles.textWithButtonWrapper, {marginTop: 0}]}>
          <Text
            style={[
              styles.textWithButtonLabel,
              {
                fontSize: SIZES.body5,
                color: COLORS.darkgray,
                fontWeight: "400"
              },
            ]}
          >
            By sign up you agree our
          </Text>
          <TouchableOpacity onPress={() => _handlePressButtonAsync()} activeOpacity={0.7} style={styles.textWithButton}>
            <Text
              style={[
                styles.textWithButtonText,
                {
                  fontSize: SIZES.body5,
                  fontWeight: "400",
                  color: COLORS.primary,
                },
              ]}
            >
              Privacy policy
            </Text>
          </TouchableOpacity>
        </View>
        </ScrollView>
       
      </KeyboardAvoidingView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  item: {
    alignItems: "center",
    flexDirection: "row",
    marginBottom: 15,
    overflow: "hidden",
    width: "100%",
  },
  logoContainer: {
    alignItems: "flex-start",
    marginBottom: 15,
    marginVertical: 5,
    width: "100%",
  },
  safeArea: {
    backgroundColor: "#ffffff",
    flex: 1,
    paddingTop: Constants?.statusBarHeight + 10,
  },
  screen: {
    alignItems: "center",
    flex: 1,
    justifyContent: "space-between",
    paddingHorizontal: 15,
    width: "100%",
  },
  signTitle: {
    marginBottom: 25,
    marginTop: 0,
    width: "100%",
  },
  signTitleText: {
    fontSize: 17,
    fontWeight: "bold",
  },
  textWithButton: {
    marginLeft: 5,
  },
  textWithButtonLabel: {
    color: "#000",
    fontSize: SIZES.body2,
  },
  textWithButtonText: {
    color: COLORS.primary,
    fontSize: SIZES.body2,
    fontWeight: "bold",
  },
  textWithButtonWrapper: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 15,
    marginTop: 25,
    paddingBottom: 15,
    width: "100%"
  },

  topSide: {
    width: "100%",
  },
});
