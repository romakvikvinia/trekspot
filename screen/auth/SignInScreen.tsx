import { NativeStackScreenProps } from "@react-navigation/native-stack";
// import { GoogleSignin } from "@react-native-google-signin/google-signin";
import * as AppleAuthentication from "expo-apple-authentication";
import Constants from "expo-constants";
import * as WebBrowser from "expo-web-browser";
import { useFormik } from "formik";
import { usePostHog } from "posthog-react-native";
import React, { useCallback,useEffect, useState } from "react";
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

import {
  trekSpotApi,
  useAuthBySocialNetworkMutation,
  useLazyMeQuery,
  useSignInMutation,
} from "../../api/api.trekspot";
import {
  AuthLoginResponseType,
  SocialProvidersEnum,
} from "../../api/api.types";
import { GUEST_EMAIL, GUEST_PASS } from "../../helpers/baseUrl.helper";
import { storeToken } from "../../helpers/secure.storage";
import { signIn } from "../../package/slices";
import { AuthStackParamList } from "../../routes/auth/AuthRoutes";
import { globalStyles } from "../../styles/globalStyles";
import { COLORS, SIZES } from "../../styles/theme";
import { Events } from "../../utilities/Posthog";
import { TrekSpotLinear } from "../../utilities/svg/TrekSpotLinear";
import {
  AppleIcon,
  GoogleIcon,
  IncoIcon,
} from "../../utilities/SvgIcons.utility";
import { SignInValidationSchema } from "./validationScheme";

// GoogleSignin.configure({
//   webClientId:
//     "923726965679-tap0vlets0dvclh7uertjalc0f1ueq50.apps.googleusercontent.com",
//   // androidClientId:
//   //   "923726965679-s3evflrnovadf0l777r5hiltuj0j49fs.apps.googleusercontent.com",
//   iosClientId:
//     "923726965679-tap0vlets0dvclh7uertjalc0f1ueq50.apps.googleusercontent.com",
//   offlineAccess: true,
//   scopes: ["email", "profile"],
// });

type SignInProps = NativeStackScreenProps<AuthStackParamList, "SignIn">;

export const SignInScreen: React.FC<SignInProps> = ({ navigation }) => {
  const posthog = usePostHog();
  const dispatch = useDispatch();
  const [fetchSignIn, { data, isLoading, error, isError, isSuccess }] =
    useSignInMutation();

  const [
    fetchSocialAuth,
    {
      isSuccess: isSocialAuthSuccess,
      data: socialAuthData,
      isLoading: isSocialAuthLoading,
      error: socialAuthError,
    },
  ] = useAuthBySocialNetworkMutation();

  const [
    fetchSignInAsGuest,
    {
      data: guest,
      isLoading: isGuestLoading,
      isError: isGuestError,
      isSuccess: isGuestSuccess,
    },
  ] = useSignInMutation();
  const [fetchMe] = useLazyMeQuery();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: SignInValidationSchema,
    onSubmit: async ({ email, password }) => {
      fetchSignIn({ email, password });
    },
  });

  const [{ fadeValue }] = useState({
    fadeValue: new Animated.Value(0),
  });

  const handleSaveToken = useCallback(
    async (auth: AuthLoginResponseType) => {
      try {
        const token = { ...auth.signIn };
        token.expire = new Date().getTime() + token.expire;

        await storeToken(token);
        const user = await fetchMe().unwrap();

        dispatch(
          signIn({
            token: token.token,
            user: user.me,
            expire: token.expire,
          })
        );
      } catch (error) {
        console.log(error);
      }
    },
    [dispatch]
  );

  const handleContinueAsGuest = useCallback(() => {
    posthog?.capture(Events.ContinueWithGuest, { GUEST_EMAIL });
    fetchSignInAsGuest({
      email: GUEST_EMAIL,
      password: GUEST_PASS,
    });
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
    if ((isSuccess && data) || (isGuestSuccess && guest)) {
      //@ts-ignore
      handleSaveToken(data || guest);
    }
  }, [isSuccess, data, isGuestSuccess, guest]);

  // social auth handler
  useEffect(() => {
    if (socialAuthData && socialAuthData.socialLogin) {
      //@ts-ignore
      handleSaveToken({ signIn: socialAuthData.socialLogin });
    }
  }, [isSocialAuthSuccess, socialAuthData]);

  const handelErrorMessage = () => {
    Alert.alert(
      "Invalid Credentials",
      "The username or password entered is incorrect.",
      [
        {
          onPress: () => {
            dispatch(trekSpotApi.util.resetApiState());
          },
          text: "OK",
        },
      ]
    );
  };

  /**
   *
   * S O C I A L AUTH
   */

  const startGoogleAuth = async () => {
    try {
      await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      });
      // log in using Google account (on Android it will only work if google play services are installed)
      const userInfo = await GoogleSignin.signIn();

      // console.log(userInfo);
      const token = await GoogleSignin.getTokens();
      if (
        userInfo.data &&
        userInfo.data.idToken &&
        token &&
        token.accessToken
      ) {
        posthog?.capture(Events.ContinueWithGoogle);
        fetchSocialAuth({
          token: token.accessToken,
          provider: SocialProvidersEnum.Google,
        });
      } else {
        handelErrorMessage();
      }
      // try to sign in silently (this should be done when the user is already signed-in)
      const userInfo2 = await GoogleSignin.signInSilently();
      // console.log(userInfo2);
      // to logout use the following piece of code
      const resp = await GoogleSignin.signOut();
      // console.log(resp);
    } catch (error: any) {
      if (error.code) {
        console.log("Error related to Google sign-in: ", error);
      } else {
        console.log("An error that is not related to Google sign-in: ", error);
      }
    }
  };

  const startAppleSignIn = async () => {
    try {
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });

      if (credential && credential.identityToken) {
        posthog?.capture(Events.ContinueWithApple);
        fetchSocialAuth({
          token: credential.identityToken,
          provider: SocialProvidersEnum.Apple,
          firstName: credential.fullName?.givenName || "",
          lastName: credential.fullName?.familyName || "",
        });
      } else {
        handelErrorMessage();
      }

      // signed in
    } catch (e: any) {
      console.log(e);
      if (e.code === "ERR_REQUEST_CANCELED") {
        // handle that the user canceled the sign-in flow
      } else {
        // handle other errors
      }
    }
  };

  const _handlePressButtonAsync = async () => {
    const result = await WebBrowser.openBrowserAsync(
      "https://trekspot.io/en/privacy-policy",
      {
        enableBarCollapsing: true,
      }
    );
  };

  if (isError) {
    handelErrorMessage();
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

            <View style={styles.continueWith}>
              <TouchableOpacity
                activeOpacity={0.1}
                style={styles.continueWithButton}
                onPress={startGoogleAuth}
              >
                <GoogleIcon />
                <Text style={styles.socialText}>Continue with Google</Text>
              </TouchableOpacity>
              {Platform.OS === "ios" && (
                <TouchableOpacity
                  activeOpacity={0.1}
                  style={styles.continueWithButton}
                  onPress={startAppleSignIn}
                >
                  <AppleIcon />
                  <Text style={styles.socialText}>Continue with Apple</Text>
                </TouchableOpacity>
              )}
              <TouchableOpacity
                style={[styles.continueWithButton]}
                onPress={() => handleContinueAsGuest()}
                activeOpacity={0.8}
              >
                {isGuestLoading || isGuestSuccess ? (
                  <ActivityIndicator size="small" color="#000" />
                ) : (
                  <>
                    <IncoIcon />
                    <Text style={styles.socialText}>Continue as guest</Text>
                  </>
                )}
              </TouchableOpacity>
            </View>

            <View style={styles.continueWithDivider}>
              <View style={styles.borderRow}></View>
              <Text style={styles.continueWithDividerText}>Or</Text>
            </View>

            <TouchableOpacity
              activeOpacity={0.1}
              style={globalStyles.buttonItemPrimary}
              onPress={() => navigation.navigate("SignUp")}
            >
              {isLoading ||
              isSuccess ||
              isSocialAuthLoading ||
              isSocialAuthSuccess ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <Text style={globalStyles.buttonItemPrimaryText}>
                  Create account
                </Text>
              )}
            </TouchableOpacity>
          </View>
          <View
            style={[
              styles.textWithButtonWrapper,
              {
                marginTop: 45,
              },
            ]}
          >
            <Text style={styles.textWithButtonLabel}>Have an account?</Text>
            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.textWithButton}
              onPress={() => navigation.navigate("Login")}
            >
              <Text style={styles.textWithButtonText}>Sign In</Text>
            </TouchableOpacity>
          </View>
          <View
            style={[
              styles.textWithButtonWrapper,
              {
                marginTop: 0,
              },
            ]}
          >
            <Text
              style={[
                styles.textWithButtonLabel,
                {
                  fontSize: SIZES.body5,
                  color: COLORS.darkgray,
                  fontWeight: "400",
                },
              ]}
            >
              By sign up you agree our
            </Text>
            <TouchableOpacity
              onPress={() => _handlePressButtonAsync()}
              activeOpacity={0.1}
              style={styles.textWithButton}
            >
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
  borderRow: {
    backgroundColor: "#fafafa",
    height: 2,
    width: "100%",
  },
  container: {
    flexGrow: 1,
  },
  continueWith: {
    flexDirection: "column",
    justifyContent: "center",
    width: "100%",
  },
  continueWithButton: {
    alignItems: "center",
    backgroundColor: "#fff",
    borderColor: "#ccc",
    borderRadius: SIZES.radius * 5,
    borderWidth: 1,
    display: "flex",
    flexDirection: "row",
    height: 50,
    justifyContent: "center",
    marginBottom: 15,
    marginHorizontal: SIZES.padding,
  },
  continueWithDivider: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 10,
    marginTop: 25,
    position: "relative",
    width: "100%",
  },
  continueWithDividerText: {
    backgroundColor: "#fff",
    color: COLORS.darkgray,
    fontSize: SIZES.body4,
    paddingHorizontal: SIZES.padding,
    position: "absolute",
    top: -9,
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
  socialText: {
    fontSize: SIZES.body3,
    fontWeight: "500",
    marginLeft: 15,
    width: 160,
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
    width: "100%",
  },
  topSide: {
    width: "100%",
  },
});
