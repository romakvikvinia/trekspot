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

import { AuthContext } from "../../package/context/auth.context";
import { SignInValidationSchema } from "./validationScheme";
import { TInput } from "../../common/ui/TInput";
import { AuthStackParamList } from "../../routes/auth/AuthRoutes";
import { useSignInMutation } from "../../api/api.trekspot";
import { storeToken } from "../../helpers/secure.storage";
import { COLORS, SIZES } from "../../styles/theme";
import { globalStyles } from "../../styles/globalStyles";
import { TrekSpotLinear } from "../../utilities/svg/TrekSpotLinear";

type ResetPasswordScreenProps = NativeStackScreenProps<
  AuthStackParamList,
  "ResetPassword"
>;

export const ResetPasswordScreen: React.FC<ResetPasswordScreenProps> = ({
  navigation,
}) => {
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

  const handleSaveToken = useCallback(async (auth: any) => {
    try {
      let token = { ...auth.login };
      token.expire = new Date().getTime() + token.expire;

      await storeToken(token);
      signIn(token);
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
                    "Email" in formik.errors && "Email" in formik.touched
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

              <TouchableOpacity
                activeOpacity={0.7}
                style={[
                  globalStyles.buttonItemPrimary,
                  "password" in formik.errors ||
                  "Email" in formik.errors ||
                  formik.isSubmitting
                    ? globalStyles.buttonItemPrimaryDisabled
                    : null,
                ]}
                onPress={formik.submitForm}
                disabled={
                  "password" in formik.errors ||
                  "Email" in formik.errors ||
                  formik.isSubmitting
                }
              >
                {formik.isSubmitting ? (
                  <ActivityIndicator size="small" color="#fff" />
                ) : (
                  <Text style={globalStyles.buttonItemPrimaryText}>
                    Reset password
                  </Text>
                )}
              </TouchableOpacity>

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
