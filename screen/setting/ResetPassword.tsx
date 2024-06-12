import { useNavigation } from "@react-navigation/native";
import React, { useContext, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { TInput } from "../../common/ui/TInput";
import { globalStyles } from "../../styles/globalStyles";
import { COLORS } from "../../styles/theme";
import { BackIcon, EyeCrossicon, EyeNoCrossicon } from "../../utilities/SvgIcons.utility";
import Constants from "expo-constants";

interface SettingProps {}

export const ResetPassword: React.FC<SettingProps> = ({}) => {
  const navigation = useNavigation();
  const [isSecureType, setIsSecureType] = useState(true);
  const [isNewPasswordSecureType, setIsNewPasswordSecureType] = useState(true);

  return (
    <View style={styles.safeArea}>
      <KeyboardAvoidingView
        // behavior="padding"
        behavior={Platform.OS == "ios" ? "padding" : "height"}
        // keyboardVerticalOffset={10}
        style={styles.screen}
      >
        <View style={globalStyles.screenHeader}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={globalStyles.screenHeaderBackButton}
          >
            <BackIcon size="30" />
          </TouchableOpacity>

          <Text style={globalStyles.screenTitle}>Reset password</Text>
          <TouchableOpacity
            style={globalStyles.screenHeaderBackButton}
          ></TouchableOpacity>
        </View>
        <ScrollView
          style={{ flex: 1, paddingTop: 25 }}
          contentContainerStyle={{ paddingHorizontal: 15 }}
        >
          <View style={[styles.item]}>
            <TInput
              // invalid={"email" in formik.errors && "email" in formik.touched}
              placeholder="New password"
              autoCapitalize="none"
              returnKeyType="next"
              secureTextEntry={isNewPasswordSecureType}
              style={{ borderWidth: 2 }}
              // value={formik.values.email}
              // onChangeText={formik.handleChange("email")}
              // onBlur={formik.handleBlur("email")}
            />
            <TouchableOpacity
              activeOpacity={0.5}
              style={styles.passwordVisibleToggle}
              onPress={() =>
                setIsNewPasswordSecureType(!isNewPasswordSecureType)
              }
            >
              {isNewPasswordSecureType ? <EyeNoCrossicon /> : <EyeCrossicon />}
            </TouchableOpacity>
          </View>
          <View style={[styles.item]}>
            <TInput
              // invalid={"email" in formik.errors && "email" in formik.touched}
              placeholder="Confirm password"
              autoCapitalize="none"
              secureTextEntry={isSecureType}
              returnKeyType="next"
              style={{ borderWidth: 2 }}
              // value={formik.values.email}
              // onChangeText={formik.handleChange("email")}
              // onBlur={formik.handleBlur("email")}
            />
            <TouchableOpacity
              activeOpacity={0.5}
              style={styles.passwordVisibleToggle}
              onPress={() => setIsSecureType(!isSecureType)}
            >
              {isSecureType ? <EyeNoCrossicon /> : <EyeCrossicon />}
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            activeOpacity={0.1}
            style={[
              globalStyles.buttonItemPrimary,

              // "password" in formik.errors ||
              // "email" in formik.errors ||
              // formik.isSubmitting
              //   ? globalStyles.buttonItemPrimaryDisabled
              //   : null,
            ]}
            // onPress={formik.submitForm}
            // disabled={
            //   "password" in formik.errors ||
            //   "email" in formik.errors ||
            //   formik.isSubmitting ||
            //   isLoading
            // }
          >
            {/* {formik.isSubmitting || isLoading || isSuccess ? (
                  <ActivityIndicator size="small" color="#fff" />
                ) : (
                  )} */}
            <Text style={globalStyles.buttonItemPrimaryText}>
              Update password
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f8f8f8",
    paddingTop: Constants?.statusBarHeight + 10,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  backButton: {
    width: 30,
  },
  title: {
    fontSize: 18,
    fontWeight: "500",
    color: COLORS.black,
  },
  item: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    overflow: "hidden",
    marginBottom: 15,
  },
  screen: {
    flex: 1,
    width: "100%",
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
});
