import { NativeStackScreenProps } from "@react-navigation/native-stack";
import Constants from "expo-constants";
import { useFormik } from "formik";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch } from "react-redux";

import { TInput } from "../../common/ui/TInput";
import { AuthStackParamList } from "../../routes/auth/AuthRoutes";
import { globalStyles } from "../../styles/globalStyles";
import { COLORS, SIZES } from "../../styles/theme";
import { TrekSpotLinear } from "../../utilities/svg";
import { SignUpValidationSchema } from "./validationScheme";

type SignUpScreenProps = NativeStackScreenProps<AuthStackParamList, "SignUp">;

export const PasswordUpdate: React.FC<SignUpScreenProps> = ({ navigation }) => {
  const dispatch = useDispatch();
 
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
     
    },
  });
 
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
                Password update
              </Text>
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
                formik.isSubmitting 
              }
            >
              {formik.isSubmitting ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <Text style={globalStyles.buttonItemPrimaryText}>Sign Up</Text>
              )}
            </TouchableOpacity>

            <View style={styles.textWithButtonWrapper}>
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
    marginBottom: 45,
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
