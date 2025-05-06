import { NativeStackScreenProps } from "@react-navigation/native-stack";
import Constants from "expo-constants";
import * as WebBrowser from 'expo-web-browser';
import { useFormik } from "formik";
import { usePostHog } from "posthog-react-native";
import { useCallback,useEffect, useState } from "react";
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
} from "../../api/api.types";
import { TInput } from "../../common/ui/TInput";
import { storeToken } from "../../helpers/secure.storage";
import { signIn } from "../../package/slices";
import { AuthStackParamList } from "../../routes/auth/AuthRoutes";
import { globalStyles } from "../../styles/globalStyles";
import { COLORS, SIZES } from "../../styles/theme";
import { Events } from "../../utilities/Posthog";
import { TrekSpotLinear } from "../../utilities/svg/TrekSpotLinear";
import {
  EyeCrossicon,
  EyeNoCrossicon,
} from "../../utilities/SvgIcons.utility";
import { SignInValidationSchema } from "./validationScheme";
  
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
    const result = await WebBrowser.openBrowserAsync('https://travelfy.io/en/privacy-policy', {
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
  container: {
    flexGrow: 1,
  },
  item: {
    alignItems: "center",
    flexDirection: "row",
    marginBottom: 15,
    overflow: "hidden",
    position: "relative",
    width: "100%",
  },
  logoContainer: {
    alignItems: "flex-start",
    marginBottom: 15,
    marginVertical: 5,
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
    width: "100%",
  },
  topSide: {
    width: "100%",
  },
});
