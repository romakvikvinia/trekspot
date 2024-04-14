import { useNavigation } from "@react-navigation/native";
import React, { useContext } from "react";
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
import { BackIcon } from "../../utilities/SvgIcons.utility";

interface SettingProps {}

export const ResetPassword: React.FC<SettingProps> = ({}) => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        // behavior="padding"
        behavior={Platform.OS == "ios" ? "padding" : "height"}
        // keyboardVerticalOffset={10}
        style={styles.screen}
      >
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <BackIcon size="30" />
          </TouchableOpacity>

          <Text style={styles.title}>Reset password</Text>
          <TouchableOpacity style={styles.backButton}></TouchableOpacity>
        </View>

        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ paddingHorizontal: 15 }}
        >
          <View style={[styles.item]}>
            <TInput
              // invalid={"email" in formik.errors && "email" in formik.touched}
              placeholder="New password"
              autoCapitalize="none"
              returnKeyType="next"
              // value={formik.values.email}
              // onChangeText={formik.handleChange("email")}
              // onBlur={formik.handleBlur("email")}
            />
          </View>
          <View style={[styles.item]}>
            <TInput
              // invalid={"email" in formik.errors && "email" in formik.touched}
              placeholder="Confirm password"
              autoCapitalize="none"
              returnKeyType="next"
              // value={formik.values.email}
              // onChangeText={formik.handleChange("email")}
              // onBlur={formik.handleBlur("email")}
            />
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f8f8f8",
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
});
