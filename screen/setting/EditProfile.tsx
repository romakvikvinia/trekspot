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
import Constants from "expo-constants";

interface SettingProps {}

export const EditoProfile: React.FC<SettingProps> = ({}) => {
  const navigation = useNavigation();

  return (
    <>
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

            <Text style={styles.title}>Edit profile</Text>
            <TouchableOpacity style={styles.backButton}></TouchableOpacity>
          </View>

          <ScrollView
            style={{ flex: 1, marginTop: 15 }}
            contentContainerStyle={{ paddingHorizontal: 15 }}
          >
            <View style={[styles.item]}>
              <TInput
                // invalid={"email" in formik.errors && "email" in formik.touched}
                placeholder="Name"
                autoCapitalize="none"
                returnKeyType="next"
                style={{borderWidth: 2}}
                // value={formik.values.email}
                // onChangeText={formik.handleChange("email")}
                // onBlur={formik.handleBlur("email")}
              />
            </View>
            <View style={[styles.item]}>
              <TInput
                // invalid={"email" in formik.errors && "email" in formik.touched}
                placeholder="Sure name"
                autoCapitalize="none"
                returnKeyType="next"
                style={{borderWidth: 2}}
                // value={formik.values.email}
                // onChangeText={formik.handleChange("email")}
                // onBlur={formik.handleBlur("email")}
              />
            </View>
            <View style={[styles.item]}>
              <TInput
                // invalid={"email" in formik.errors && "email" in formik.touched}
                keyboardType="email-address"
                placeholder="Email"
                autoCapitalize="none"
                returnKeyType="next"
                style={{borderWidth: 2}}
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
                Save changes
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f8f8f8",
    paddingTop: Platform.OS === "android" ? Constants?.statusBarHeight + 10 : 0,
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
