import { useState, useEffect, useCallback, useContext } from "react";
import { Logs } from "expo";
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

import {
  trekSpotApi,
  useAuthBySocialNetworkMutation,
  useSignInMutation,
} from "../../api/api.trekspot";
import {
  AuthLoginResponseType,
  SocialProvidersEnum,
} from "../../api/api.types";
import { storeToken } from "../../helpers/secure.storage";

import { COLORS, SIZES } from "../../styles/theme";
import { globalStyles } from "../../styles/globalStyles";

import * as Facebook from "expo-auth-session/providers/facebook";
import * as Google from "expo-auth-session/providers/google";
import * as AppleAuthentication from "expo-apple-authentication";
import * as WebBrowser from "expo-web-browser";
import {
  FACEBOOK_CLIENT_ID,
  GOOGLE_ANDROID_CLIENT_ID,
  GOOGLE_IOS_CLIENT_ID,
  GOOGLE_WEB_CLIENT_ID,
} from "../../config";
import { TInput } from "../../common/ui/TInput";
import { Loader } from "../../common/ui/Loader";
import { AuthStackParamList } from "../../routes/auth/AuthRoutes";
import { TrekSpotLinear } from "../../utilities/svg";
import {
  GoogleIcon,
  AppleIcon,
  FacebookIcon,
} from "../../utilities/SvgIcons.utility";

Logs.enableExpoCliLogging();

type SignInProps = NativeStackScreenProps<AuthStackParamList, "SignIn">;
WebBrowser.maybeCompleteAuthSession();
export const SignInScreen: React.FC<SignInProps> = ({ navigation }) => {
  const dispatch = useDispatch();
  const [state, setState] = useState({
    isLoading: false,
    user: null,
    appleAuthAvailable: false,
  });

  const [
    signInWithSocial,
    {
      isSuccess: isSuccessWithSocial,
      isLoading: isLoadingSocialAuth,
      data: socialAuthData,
      isError: isErrorSocialAuth,
      error: errorSocialAuth,
    },
  ] = useAuthBySocialNetworkMutation();

  /**
   *
   * Social Network related auth staff
   */

  const [, fResponse, fPromptAsync] = Facebook.useAuthRequest({
    clientId: FACEBOOK_CLIENT_ID,
    scopes: ["public_profile", "email"],
  });

  useEffect(() => {
    if (fResponse && fResponse.type === "success" && fResponse.authentication) {
      signInWithSocial({
        token: fResponse.authentication.accessToken,
        provider: SocialProvidersEnum.Facebook,
      });
    }
  }, [fResponse]);

  /**
   * GOOGLE
   * Social Auth flow
   *  */

  const [, gResponse, gPromptAsync] = Google.useAuthRequest({
    androidClientId: GOOGLE_ANDROID_CLIENT_ID,
    iosClientId: GOOGLE_IOS_CLIENT_ID,
    webClientId: GOOGLE_WEB_CLIENT_ID,
  });

  useEffect(() => {
    if (gResponse && gResponse.type === "success" && gResponse.authentication) {
      signInWithSocial({
        token: gResponse.authentication.accessToken,
        provider: SocialProvidersEnum.Google,
      });
    }
  }, [gResponse]);

  useEffect(() => {
    if (
      isSuccessWithSocial &&
      socialAuthData &&
      "socialLogin" in socialAuthData
    ) {
      // @ts-ignore
      handleSaveToken(socialAuthData.socialLogin);
    }
  }, [isSuccessWithSocial]);

  // useEffect(() => {
  //   if (isErrorSocialAuth && errorSocialAuth) {
  //     Alert.alert("Google", JSON.stringify(errorSocialAuth));
  //   }
  // }, [isErrorSocialAuth]);

  /**
   * Auth social related part end
   */

  // Screen related staff

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
    async (auth: AuthLoginResponseType["data"]["login"]) => {
      try {
        let token = { ...auth };
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
    if (isSuccess && data && "login" in data) {
      //@ts-ignore
      handleSaveToken(data.login);
    }
  }, [isSuccess, data]);

  /**
   * Apple Sing in
   */

  useEffect(() => {
    (async () => {
      try {
        const appleAuthAvailable = await AppleAuthentication.isAvailableAsync();
        setState((prevState) => ({ ...prevState, appleAuthAvailable }));
      } catch (error) {}
    })();
  }, []);

  const handleAppleSignIn = useCallback(async () => {
    try {
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });
      if (credential.identityToken) {
        console.log({
          token: credential.identityToken,
          provider: SocialProvidersEnum.Apple,
        });
        signInWithSocial({
          token: credential.identityToken,
          provider: SocialProvidersEnum.Apple,
        });
      } else {
        Alert.alert("Error", "Something went wrong!", [
          {
            onPress: () => {
              dispatch(trekSpotApi.util.resetApiState());
            },
            text: "OK",
          },
        ]);
      }
    } catch (error) {
      Alert.alert(JSON.stringify(error));
    }
  }, []);

  if (isError || isErrorSocialAuth) {
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
                  formik.isSubmitting ||
                  isLoadingSocialAuth ||
                  isLoading
                    ? globalStyles.buttonItemPrimaryDisabled
                    : null,
                ]}
                onPress={formik.submitForm}
                disabled={
                  "password" in formik.errors ||
                  "email" in formik.errors ||
                  formik.isSubmitting ||
                  isLoading ||
                  isLoadingSocialAuth
                }
              >
                {formik.isSubmitting || isLoading || isSuccess ? (
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
              <Loader isLoading={isLoadingSocialAuth} />
              <View style={styles.continueWith}>
                <TouchableOpacity
                  activeOpacity={0.7}
                  style={styles.continueWithButton}
                  onPress={() => gPromptAsync()}
                  disabled={isLoadingSocialAuth}
                >
                  <GoogleIcon />
                </TouchableOpacity>

                {state.appleAuthAvailable ? (
                  <TouchableOpacity
                    activeOpacity={0.7}
                    style={styles.continueWithButton}
                    disabled={isLoadingSocialAuth}
                    onPress={handleAppleSignIn}
                  >
                    <AppleIcon />
                  </TouchableOpacity>
                ) : null}

                <TouchableOpacity
                  activeOpacity={0.7}
                  style={styles.continueWithButton}
                  onPress={() => fPromptAsync()}
                  disabled={isLoadingSocialAuth}
                >
                  <FacebookIcon />
                </TouchableOpacity>
              </View>
              <View style={styles.textWithButtonWrapper}>
                {state.user && <Text> {JSON.stringify(state.user)}</Text>}
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
