import { useState, useEffect, useCallback, useContext } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
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
} from "react-native";
import {
  IconColor,
  PrimaryColor,
  SecondaryColor,
  isInvalidColor,
} from "../../styles/colors";
import { AuthContext } from "../../package/context/auth.context";
import { SignInValidationSchema } from "./validationScheme";
import { TInput } from "../../common/ui/TInput";
import { AuthStackParamList } from "../../routes/auth/AuthRoutes";
import { useSignInMutation } from "../../api/api.trekspot";
import { AuthResponseType } from "../../api/api.types";
import { storeToken } from "../../helpers/secure.storage";
import {
  AppleIcon,
  FacebookIcon,
  GoogleIcon,
  TrekspotLinear,
} from "../../utilities/SvgIcons.utility";
import { COLORS, SIZES } from "../../styles/theme";

type SignInProps = NativeStackScreenProps<AuthStackParamList, "SignIn">;

export const SignInScreen: React.FC<SignInProps> = ({ navigation }) => {
  const [fetchSignIn, { data, isLoading, error, isError, isSuccess }] =
    useSignInMutation();
  //@ts-ignore
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
    async (auth: AuthResponseType["data"]) => {
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

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#ffffff",
      }}
    >
      <KeyboardAvoidingView
        // behavior="padding"
        behavior={Platform.OS == "ios" ? "padding" : "height"}
        // keyboardVerticalOffset={10}
        style={styles.screen}
      >
        <ScrollView contentContainerStyle={styles.container}>
          <Animated.View style={{ ...styles.screen, opacity: fadeValue }}>
            <View style={{ flex: 1, width: "100%" }}>
              <View style={styles.logoContainer}>
                <TrekspotLinear />
              </View>
              <View style={styles.signTitle}>
                <Text style={styles.signTitleText}>
                  Your travel hub awaits: Sign in to begin!
                </Text>
              </View>

              <View
                style={[
                  styles.item,
                  "Email" in formik.errors && "Email" in formik.touched
                    ? styles.isValid
                    : {},
                ]}
              >
                <TInput
                  keyboardType="default"
                  placeholder="Email"
                  autoCapitalize="none"
                  returnKeyType="next"
                  value={formik.values.email}
                  onChangeText={formik.handleChange("email")}
                  onBlur={formik.handleBlur("email")}
                />
              </View>

              <View
                style={[
                  styles.item,
                  "password" in formik.errors && "password" in formik.touched
                    ? styles.isValid
                    : {},
                ]}
              >
                <TInput
                  placeholder="**********"
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
              <View style={styles.forgotPassword}>
                <Text style={styles.forgotPasswordText}>Forgot password?</Text>
              </View>

              <TouchableOpacity
                activeOpacity={0.7}
                style={{ ...styles.btn }}
                onPress={formik.submitForm}
                disabled={
                  "password" in formik.errors ||
                  "Email" in formik.errors ||
                  formik.isSubmitting
                  // || isLoading
                }
              >
                {formik.isSubmitting ? (
                  <ActivityIndicator size="large" color="#fff" />
                ) : (
                  <Text style={styles.btnText}>Sign In</Text>
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
                >
                  <Text style={styles.textWithButtonText}>Sign up</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={[styles.textWithButtonWrapper]}>
              <Text
                style={[styles.textWithButtonLabel, { fontSize: SIZES.body3 }]}
              >
                Read our
              </Text>
              <TouchableOpacity
                activeOpacity={0.7}
                style={styles.textWithButton}
              >
                <Text
                  style={[
                    styles.textWithButtonText,
                    {
                      fontSize: SIZES.body3,
                      fontWeight: "normal",
                      color: COLORS.primaryDark,
                      textDecorationLine: "underline",
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
    color: "#7d7d7d",
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
  continueWithButtonText: {
    fontSize: SIZES.body4,
    marginLeft: SIZES.padding * 2,
    fontWeight: "bold",
    color: "#7d7d7d",
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
  },
  signTitle: {
    marginTop: 15,
    width: "100%",
    marginBottom: 45,
  },
  signTitleText: {
    fontSize: SIZES.h3,
    fontWeight: "bold",
  },
  item: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    overflow: "hidden",
    marginBottom: 15,
  },
  itemIcon: {
    width: 25,
  },
  btn: {
    marginTop: SIZES.padding * 3,
    height: 50,
    justifyContent: "center",
    backgroundColor: COLORS.primaryDark,
    width: "100%",
    textAlign: "center",
    alignItems: "center",
    borderRadius: SIZES.radius * 5,
  },
  btnText: {
    color: "#fff",
    fontSize: SIZES.body3,
  },
  logoContainer: {
    marginVertical: 5,
    width: "100%",
    alignItems: "flex-start",
    marginBottom: 15,
  },
  isValid: {
    borderColor: isInvalidColor,
    borderWidth: 2,
  },
});
