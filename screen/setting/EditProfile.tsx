import React from "react";
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
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
import { SettingRouteStackParamList } from "../../routes/setting/SettingRoutes";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useUpdateMeMutation } from "../../api/api.trekspot";
import { useFormik } from "formik";
import { EditProfileValidationSchema } from "./validationScheme";
import { useAppDispatch, useAppSelector } from "../../package/store";
import { updateUser } from "../../package/slices";
import { toast } from "sonner-native";

type EdoProfileProps = NativeStackScreenProps<
  SettingRouteStackParamList,
  "EditProfile"
>;

export const EditProfile: React.FC<EdoProfileProps> = ({ navigation }) => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const [
    fetchUpdateMe,
    { isLoading: isLoadingUpdateMe, isSuccess: isSuccessUpdateMe },
  ] = useUpdateMeMutation();

  const formik = useFormik({
    initialValues: {
      firstName: user!.firstName,
      lastName: user!.lastName,
      email: user!.email,
    },
    validationSchema: EditProfileValidationSchema,
    onSubmit: async (values, methods) => {
      methods.setSubmitting(true);
      try {
        const response = await fetchUpdateMe({
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
        }).unwrap();
        dispatch(updateUser({ user: response.updateMe }));
        methods.setSubmitting(false);
        toast.success("Profile updated successfully", {
          duration: 2000,
        });
        navigation.goBack();
      } catch (error) {
        Alert.alert("Error", "Something went wrong, please try later");
      }
    },
  });

  const isLoading = isLoadingUpdateMe || formik.isSubmitting;

  return (
    <>
      <View style={styles.safeArea}>
        <KeyboardAvoidingView
          behavior={Platform.OS == "ios" ? "padding" : "height"}
          style={styles.screen}
        >
          <View style={globalStyles.screenHeader}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={globalStyles.screenHeaderBackButton}
            >
              <BackIcon size="30" />
            </TouchableOpacity>

            <Text style={globalStyles.screenTitle}>Edit Profile</Text>
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
                invalid={
                  "firstName" in formik.errors && "firstName" in formik.touched
                }
                placeholder="Name"
                autoCapitalize="none"
                returnKeyType="next"
                style={{ borderWidth: 2 }}
                value={formik.values.firstName}
                onChangeText={formik.handleChange("firstName")}
                onBlur={formik.handleBlur("firstName")}
              />
            </View>
            <View style={[styles.item]}>
              <TInput
                invalid={
                  "lastName" in formik.errors && "lastName" in formik.touched
                }
                placeholder="Sure name"
                autoCapitalize="none"
                returnKeyType="next"
                style={{ borderWidth: 2 }}
                value={formik.values.lastName}
                onChangeText={formik.handleChange("lastName")}
                onBlur={formik.handleBlur("lastName")}
              />
            </View>
            <View style={[styles.item]}>
              <TInput
                invalid={"email" in formik.errors && "email" in formik.touched}
                keyboardType="email-address"
                placeholder="Email"
                autoCapitalize="none"
                returnKeyType="next"
                style={{ borderWidth: 2 }}
                value={formik.values.email}
                onChangeText={formik.handleChange("email")}
                onBlur={formik.handleBlur("email")}
              />
            </View>
            <TouchableOpacity
              activeOpacity={0.1}
              style={[
                globalStyles.buttonItemPrimary,
                !!Object.keys(formik.errors).length || isLoading
                  ? globalStyles.buttonItemPrimaryDisabled
                  : null,
              ]}
              onPress={formik.submitForm}
              disabled={!!Object.keys(formik.errors).length || isLoading}
            >
              {isLoading ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <Text style={globalStyles.buttonItemPrimaryText}>
                  Save changes
                </Text>
              )}
            </TouchableOpacity>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </>
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
});
