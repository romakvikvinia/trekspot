import { useState, useEffect, useCallback, useContext } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  ActivityIndicator,
  Animated,
  Platform,
  SafeAreaView,
  Alert,
} from "react-native";

import { AuthContext } from "../../package/context/auth.context";
import { SignInValidationSchema } from "./validationScheme";
import { TInput } from "../../common/ui/TInput";
import { AuthStackParamList } from "../../routes/auth/AuthRoutes";
import { trekSpotApi, useSignInMutation } from "../../api/api.trekspot";
import { AuthLoginResponseType } from "../../api/api.types";
import { storeToken } from "../../helpers/secure.storage";
import {
  AppleIcon,
  FacebookIcon,
  GoogleIcon,
  TrekSpotLinear,
} from "../../utilities/SvgIcons.utility";
import { COLORS, SIZES } from "../../styles/theme";
import { globalStyles } from "../../styles/globalStyles";

type SignInProps = NativeStackScreenProps<AuthStackParamList, "SignIn">;

export const SignInScreen: React.FC<SignInProps> = ({ navigation }) => {
  const dispatch = useDispatch();
  const [fetchSignIn, { data, isLoading, error, isError, isSuccess }] =
    useSignInMutation();

  const { signIn } = useContext(AuthContext);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: SignInValidationSchema,
    onSubmit: async ({ email, password }, methods) => {
      methods.setSubmitting(true);

      fetchSignIn({ email, password });
    },
  });

  const [{ fadeValue }] = useState({
    fadeValue: new Animated.Value(0),
  });

  const handleSaveToken = useCallback(
    async (auth: AuthLoginResponseType["data"]) => {
      try {
        let token = { ...auth.login };
        token.expire = new Date().getTime() + token.expire;

        await storeToken(token);
        signIn(token);
      } catch (error) {
        // console.log(error)
      }
    },
    []
  );

  const handleRedirect = useCallback(() => {
    formik.resetForm();
    navigation.navigate("SignUp");
  }, []);
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
      //@ts-ignore
      handleSaveToken(data);
    }
  }, [isSuccess, data]);

  if (isError) {
    Alert.alert("Error", "Invalid Credentials", [
      {
        onPress: () => {
          dispatch(trekSpotApi.util.resetApiState());
        },
        text: "OK",
      },
    ]);
  }
  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        // behavior="padding"
        behavior={Platform.OS == "ios" ? "padding" : "height"}
        // keyboardVerticalOffset={10}
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
                  Your travel hub awaits: Sign in to begin!
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
                      !("Email" in formik.errors) ||
                      !formik.isSubmitting
                    ) {
                      formik.submitForm();
                    }
                  }}
                />
              </View>
              <TouchableOpacity
                activeOpacity={0.7}
                style={styles.forgotPassword}
                onPress={() => navigation.navigate("ResetPassword")}
              >
                <Text style={styles.forgotPasswordText}>Forgot password?</Text>
              </TouchableOpacity>

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
                    Sign In
                  </Text>
                )}
              </TouchableOpacity>

              <View style={styles.continueWithDivider}>
                <View style={styles.borderRow}></View>
                <Text style={styles.continueWithDividerText}>
                  Or sign in with
                </Text>
              </View>

              <View style={styles.continueWith}>
                <TouchableOpacity
                  activeOpacity={0.7}
                  style={styles.continueWithButton}
                >
                  <GoogleIcon />
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.7}
                  style={styles.continueWithButton}
                >
                  <AppleIcon />
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.7}
                  style={styles.continueWithButton}
                >
                  <FacebookIcon />
                </TouchableOpacity>
              </View>
              <View style={styles.textWithButtonWrapper}>
                <Text style={styles.textWithButtonLabel}>New user?</Text>
                <TouchableOpacity
                  activeOpacity={0.7}
                  style={styles.textWithButton}
                  onPress={handleRedirect}
                >
                  <Text style={styles.textWithButtonText}>Sign up</Text>
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
  privacyPolicy: {
    fontSize: SIZES.body3,
    fontWeight: "normal",
    color: COLORS.primaryDark,
    textDecorationLine: "underline",
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
  continueWithDivider: {
    width: "100%",
    position: "relative",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: SIZES.padding * 4,
  },
  borderRow: {
    width: "100%",
    height: 2,
    backgroundColor: "#fafafa",
  },
  continueWithDividerText: {
    position: "absolute",
    top: -9,
    backgroundColor: "#fff",
    paddingHorizontal: SIZES.padding,
    fontSize: SIZES.body4,
    color: COLORS.darkgray,
  },
  continueWith: {
    width: "100%",
    marginTop: SIZES.padding * 3,
    flexDirection: "row",
    justifyContent: "center",
  },
  continueWithButton: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fafafa",
    paddingVertical: SIZES.padding * 1.5,
    paddingHorizontal: SIZES.padding * 2,
    marginHorizontal: SIZES.padding,
    borderRadius: SIZES.radius * 5,
  },
  forgotPassword: {
    display: "flex",
    justifyContent: "flex-end",
    flexDirection: "row",
    width: "100%",
  },
  forgotPasswordText: {
    fontSize: SIZES.font,
    color: COLORS.primary,
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
