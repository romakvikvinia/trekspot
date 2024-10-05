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
  Alert,
} from "react-native";
import Constants from "expo-constants";

import { AuthContext } from "../../package/context/auth.context";
import { SignInValidationSchema } from "./validationScheme";
import { TInput } from "../../common/ui/TInput";
import { AuthStackParamList } from "../../routes/auth/AuthRoutes";
import { trekSpotApi, useSignInMutation } from "../../api/api.trekspot";
import { AuthLoginResponseType } from "../../api/api.types";
import { storeToken } from "../../helpers/secure.storage";
import {
  AppleIcon,
  EmailIcon,
  EyeCrossicon,
  EyeNoCrossicon,
  FacebookIcon,
  GoogleIcon,
} from "../../utilities/SvgIcons.utility";
import { COLORS, SIZES } from "../../styles/theme";
import { globalStyles } from "../../styles/globalStyles";
import { TrekSpotLinear } from "../../utilities/svg/TrekSpotLinear";

type SignInProps = NativeStackScreenProps<AuthStackParamList, "SignIn">;

export const SignInScreen: React.FC<SignInProps> = ({ navigation }) => {
  const dispatch = useDispatch();
  const [isSecureType, setIsSecureType] = useState(true);
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
        dispatch(trekSpotApi.util.invalidateTags(["me"]));
      } catch (error) {
        // console.log(error)
      }
    },
    []
  );
 
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
                Your travel hub awaits: Sign in to begin!
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
                  fontSize: 16,
                  fontWeight: "500",
                }}
              />
            </View>

            <View style={[styles.item]}>
              <TInput
                invalid={
                  "password" in formik.errors && "password" in formik.touched
                }
                placeholder="Password"
                secureTextEntry={isSecureType}
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
                style={{
                  borderWidth: 2,
                  fontWeight: "500",
                  height: 55,
                }}
              />
              <TouchableOpacity
                activeOpacity={0.5}
                style={styles.passwordVisibleToggle}
                onPress={() => setIsSecureType(!isSecureType)}
              >
                {isSecureType ? <EyeNoCrossicon /> : <EyeCrossicon />}
              </TouchableOpacity>
            </View>
            {/* <View style={{ alignItems: "flex-end" }}>
              <TouchableOpacity
                activeOpacity={0.1}
                style={styles.forgotPassword}
                onPress={() => navigation.navigate("ResetPassword")}
              >
                <Text style={styles.forgotPasswordText}>Forgot password?</Text>
              </TouchableOpacity>
            </View> */}
            <TouchableOpacity
              activeOpacity={0.1}
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
              {formik.isSubmitting || isLoading || isSuccess ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <Text style={globalStyles.buttonItemPrimaryText}>Sign In</Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                globalStyles.buttonItemPrimary,
                {
                  backgroundColor: "#f3f3f3",
                  marginTop: 15,
                },
              ]}
            >
              <Text
                style={[
                  globalStyles.buttonItemPrimaryText,
                  {
                    color: COLORS.primaryDark,
                  },
                ]}
              >
                Continue as guest
              </Text>
            </TouchableOpacity>

            <View style={styles.continueWithDivider}>
              <View style={styles.borderRow}></View>
              <Text style={styles.continueWithDividerText}>
                Or sign in/up with
              </Text>
            </View>

            <View style={styles.continueWith}>
              <TouchableOpacity
                activeOpacity={0.1}
                style={styles.continueWithButton}
              >
                <GoogleIcon />
              </TouchableOpacity>
              {Platform.OS === "ios" && (
                <TouchableOpacity
                  activeOpacity={0.1}
                  style={styles.continueWithButton}
                >
                  <AppleIcon />
                </TouchableOpacity>
              )}
              <TouchableOpacity
                activeOpacity={0.1}
                style={styles.continueWithButton}
              >
                <FacebookIcon />
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.1}
                style={styles.continueWithButton}
                onPress={() => navigation.navigate("SignUp")}
              >
                <EmailIcon />
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
              By sign in you agree our
            </Text> 
            <TouchableOpacity
              onPress={() => navigation.navigate("Agreement")}
              activeOpacity={0.1}
              style={styles.textWithButton}
            >
              <Text
                style={[
                  styles.textWithButtonText,
                  {
                    fontSize: SIZES.body5,
                    fontWeight: "normal",
                    color: COLORS.primary,
                  },
                ]}
              >
                Privacy Policy
              </Text>
            </TouchableOpacity>
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
    paddingBottom: 15,
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
    justifyContent: "center",
    backgroundColor: "#fafafa",

    marginHorizontal: SIZES.padding,
    borderRadius: SIZES.radius * 5,
    width: 50,
    height: 50,
  },
  forgotPassword: {
    display: "flex",
    justifyContent: "flex-end",
    flexDirection: "row",
  },
  forgotPasswordText: {
    fontSize: SIZES.font,
    color: COLORS.primary,
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
    position: "relative",
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
  logoContainer: {
    marginVertical: 5,
    width: "100%",
    alignItems: "flex-start",
    marginBottom: 15,
  },
});
