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

type SignUpScreenProps = NativeStackScreenProps<AuthStackParamList, "SignUp">;

export const SignUpScreen: React.FC<SignUpScreenProps> = ({ navigation }) => {
  //@ts-ignore
  const { signIn } = useContext(AuthContext);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: SignInValidationSchema,
    onSubmit: async ({ email: username, password }, methods) => {
      methods.setSubmitting(true);
    },
  });

  const [{ fadeValue }] = useState({
    fadeValue: new Animated.Value(0),
  });

  const handleSaveToken = useCallback(async (tokens: any) => {
    // let t = { ...tokens };
    // if (t && t.expires_in) {
    //   t.expires_in += new Date().getTime();
    // }
    // await storeToken(t);
    // setToken(t.access_token);
    // signIn(t);
  }, []);
  //animations
  useEffect(() => {
    Animated.timing(fadeValue, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: true,
    }).start();
  }, []);
  return (
    <LinearGradient
      colors={[PrimaryColor, PrimaryColor, "transparent", PrimaryColor]}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <KeyboardAvoidingView
          // behavior="padding"
          behavior={Platform.OS == "ios" ? "padding" : "height"}
          // keyboardVerticalOffset={10}
          style={styles.screen}
        >
          <Animated.View style={{ ...styles.screen, opacity: fadeValue }}>
            <View style={styles.logoContainer}>
              <Image
                source={require("../../assets/logo.png")}
                style={{ width: 200, height: 200 }}
              />
            </View>

            <View
              style={[
                styles.item,
                "email" in formik.errors && "email" in formik.touched
                  ? styles.isValid
                  : {},
              ]}
            >
              <View style={styles.itemIcon}>
                <MaterialIcons name="email" size={24} color={IconColor} />
              </View>

              <TInput
                keyboardType="default"
                placeholder="Email"
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
              <View style={styles.itemIcon}>
                <Ionicons name="ios-key" size={24} color={IconColor} />
              </View>

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
                    !("email" in formik.errors) ||
                    !formik.isSubmitting
                  ) {
                    formik.submitForm();
                  }
                }}
              />
            </View>

            <TouchableOpacity
              style={{ ...styles.item, ...styles.btn }}
              onPress={formik.submitForm}
              disabled={
                "password" in formik.errors ||
                "email" in formik.errors ||
                formik.isSubmitting
                // || isLoading
              }
            >
              {formik.isSubmitting ? (
                <ActivityIndicator size="large" color="#fff" />
              ) : (
                <Text style={styles.btnText}>Sign Up</Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.signUpContainer]}
              onPress={() => navigation.navigate("SignIn")}
            >
              <Text style={styles.signUpText}>Sign In</Text>
            </TouchableOpacity>
          </Animated.View>
        </KeyboardAvoidingView>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    backgroundColor: "transparent",
  },
  item: {
    width: "90%",
    flexDirection: "row",
    backgroundColor: "#fff",
    alignItems: "center",
    overflow: "hidden",
    marginBottom: 10,
    paddingHorizontal: 8,
    borderRadius: 5,
  },
  itemIcon: {
    width: 25,
  },
  btn: {
    marginTop: 50,
    height: 50,
    justifyContent: "center",
    backgroundColor: "rgb(99 146 226)",
  },
  btnText: {
    color: "#fff",
    fontSize: 18,
  },
  logoContainer: {
    marginVertical: 5,
    width: "100%",
    alignItems: "center",
    marginBottom: 50,
  },
  isValid: {
    borderColor: isInvalidColor,
    borderWidth: 2,
  },
  signUpContainer: {
    marginVertical: 5,
    width: "90%",

    alignItems: "center",
    paddingVertical: 5,
  },
  signUpText: {
    color: "white",
  },
});
