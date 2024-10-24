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
import Constants from "expo-constants";

import { SignInValidationSchema } from "./validationScheme";
import { TInput } from "../../common/ui/TInput";
import { AuthStackParamList } from "../../routes/auth/AuthRoutes";
import { useSignInMutation } from "../../api/api.trekspot";

import { storeToken } from "../../helpers/secure.storage";
import { COLORS, SIZES } from "../../styles/theme";
import { globalStyles } from "../../styles/globalStyles";
import { TrekSpotLinear } from "../../utilities/svg/TrekSpotLinear";
import CodeVerify from "./CodeVerify";

type ResetPasswordScreenProps = NativeStackScreenProps<
  AuthStackParamList,
  "ResetPassword"
>;

export const ResetPasswordScreen: React.FC<ResetPasswordScreenProps> = ({
  navigation,
}) => {
  const [fetchSignIn, { data, isLoading, error, isError, isSuccess }] =
    useSignInMutation();

  const [sentCode, setSentCode] = useState(false);
  const [codeValue, setCodeValue] = useState("");

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

  const handleSaveToken = useCallback(async (auth: any) => {
    try {
      let token = { ...auth.login };
      token.expire = new Date().getTime() + token.expire;

      await storeToken(token);
      // signIn(token);
    } catch (error) {
      // console.log(error)
    }
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

  return (
    <View style={styles.safeArea}>
      <KeyboardAvoidingView
        // behavior="padding"
        behavior={Platform.OS == "ios" ? "padding" : "height"}
        // keyboardVerticalOffset={10}
        style={styles.screen}
      >
        <ScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps={"handled"}
        >
          <View style={styles.topSide}>
            <View style={styles.logoContainer}>
              <TrekSpotLinear />
            </View>
            <View style={styles.signTitle}>
              <Text style={styles.signTitleText}>Reset password</Text>
            </View>

            {sentCode ? (
              <View style={[styles.item]}>
                <TInput
                  invalid={
                    "Email" in formik.errors && "Email" in formik.touched
                  }
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
            ) : (
              <View
                style={[
                  styles.item,
                  {
                    justifyContent: "center",
                    alignItems: "center",
                  },
                ]}
              >
                <CodeVerify value={codeValue} setValue={setCodeValue} />
              </View>
            )}

            {sentCode ? (
              <TouchableOpacity
                activeOpacity={0.7}
                style={[
                  globalStyles.buttonItemPrimary,
                  "email" in formik.errors || formik.isSubmitting
                    ? globalStyles.buttonItemPrimaryDisabled
                    : null,
                ]}
                onPress={formik.submitForm}
                disabled={"email" in formik.errors || formik.isSubmitting}
              >
                {formik.isSubmitting ? (
                  <ActivityIndicator size="small" color="#fff" />
                ) : (
                  <Text style={globalStyles.buttonItemPrimaryText}>
                    Send code
                  </Text>
                )}
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                activeOpacity={0.7}
                style={[
                  globalStyles.buttonItemPrimary,
                  codeValue.length < 6
                    ? globalStyles.buttonItemPrimaryDisabled
                    : null,
                ]}
                onPress={() => navigation.navigate("PasswordUpdate")}
                disabled={codeValue.length < 6}
              >
                {false ? (
                  <ActivityIndicator size="small" color="#fff" />
                ) : (
                  <Text style={globalStyles.buttonItemPrimaryText}>
                    Verify code
                  </Text>
                )}
              </TouchableOpacity>
            )}

            <View style={styles.textWithButtonWrapper}>
              <Text style={styles.textWithButtonLabel}>Go to</Text>
              <TouchableOpacity
                activeOpacity={0.7}
                style={styles.textWithButton}
                onPress={() => navigation.navigate("SignIn")}
              >
                <Text style={styles.textWithButtonText}>Sign in</Text>
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
    color: COLORS.primary,
    fontWeight: "bold",
  },
  container: {
    flex: 1,
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
