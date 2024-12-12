import { useState, useEffect, useCallback } from "react";
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

import { SignInValidationSchema } from "./validationScheme";
import { TInput } from "../../common/ui/TInput";
import { AuthStackParamList } from "../../routes/auth/AuthRoutes";
import {
  trekSpotApi,
  useAuthBySocialNetworkMutation,
  useLazyMeQuery,
  useSignInMutation,
} from "../../api/api.trekspot";
import {
  AuthLoginResponseType,
} from "../../api/api.types";
import { storeToken } from "../../helpers/secure.storage";
import {
  EyeCrossicon,
  EyeNoCrossicon,
} from "../../utilities/SvgIcons.utility";
import { COLORS, SIZES } from "../../styles/theme";
import { globalStyles } from "../../styles/globalStyles";
import { TrekSpotLinear } from "../../utilities/svg/TrekSpotLinear";
import * as WebBrowser from 'expo-web-browser';

import { signIn } from "../../package/slices";
import { usePostHog } from "posthog-react-native";
import { Events } from "../../utilities/Posthog";
  
type SignInProps = NativeStackScreenProps<AuthStackParamList, "SignIn">;

export const LoginScreen: React.FC<SignInProps> = ({ navigation }) => {
  const posthog = usePostHog();
  const dispatch = useDispatch();
  const [isSecureType, setIsSecureType] = useState(true);
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
        let token = { ...auth.signIn };
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
        posthog?.capture(Events.SignIn, {email: user?.me?.email || ""});
      } catch (error) {
        console.log(error);
      }
    },
    [dispatch]
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
    Alert.alert("Invalid Credentials", "The username or password entered is incorrect", [
      {
        onPress: () => {
          dispatch(trekSpotApi.util.resetApiState());
        },
        text: "OK",
      },
    ]);
  };

  const _handlePressButtonAsync = async () => {
    let result = await WebBrowser.openBrowserAsync('https://trekspot.io/en/privacy-policy', {
      enableBarCollapsing: true,
    });
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

            <View style={[styles.item, {
              marginBottom: 0
            }]}>
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
                    isLoading
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
              {formik.values.password.length > 0 && (
                <TouchableOpacity
                  activeOpacity={0.5}
                  style={styles.passwordVisibleToggle}
                  onPress={() => setIsSecureType(!isSecureType)}
                >
                  {isSecureType ? <EyeNoCrossicon /> : <EyeCrossicon />}
                </TouchableOpacity>
              )}
            </View>
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
              {formik.isSubmitting ||
              isLoading ||
              isSuccess ||
              isSocialAuthLoading ||
              isSocialAuthSuccess ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <Text style={globalStyles.buttonItemPrimaryText}>Sign In</Text>
              )}
            </TouchableOpacity>
          </View>
          <View style={[styles.textWithButtonWrapper,{
            marginTop: 45
          }]}>
            <Text style={styles.textWithButtonLabel}>Create new account?</Text>
            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.textWithButton}
              onPress={() => navigation.navigate("SignIn")}
            >
              <Text style={styles.textWithButtonText}>Sign Up</Text>
            </TouchableOpacity>
          </View>
          <View style={[styles.textWithButtonWrapper, {
            marginTop: 0
          }]}>
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
              By sign in you agree our
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
  socialText: {
    fontSize: SIZES.body3,
    marginLeft:  15,
    fontWeight: "500"
  },
  textWithButton: {
    marginLeft: 5,
  },
  textWithButtonText: {
    fontSize: SIZES.body2,
    color: COLORS.primary,
    fontWeight: "bold",
  },
  continueWithDivider: {
    width: "100%",
    position: "relative",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 25,
    marginBottom: 30
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
    flexDirection: "column",
    justifyContent: "center",
  },
  continueWithButton: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    marginHorizontal: SIZES.padding,
    borderRadius: SIZES.radius * 5,
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 15,
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
