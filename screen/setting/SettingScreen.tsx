import React, { useRef } from "react";
import {
  Alert,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Constants from "expo-constants";

import { Image } from "expo-image";

import {
  deleteFromAsyncStorage,
  deleteItemFromStorage,
} from "../../helpers/secure.storage";
import { COLORS } from "../../styles/theme";
import {
  DeleteIcon,
  FacebookLinear,
  GuestIllustration,
  InstagramLinear,
  LockIcon,
  LogoutIcon,
  PrivacyIcon,
  ThreadsLinear,
  TiktokLinear,
  UserCircleIcon,
  UserIcon,
  Youtube,
} from "../../utilities/SvgIcons.utility";

import { Modalize } from "react-native-modalize";
import * as WebBrowser from "expo-web-browser";

import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { SettingRouteStackParamList } from "../../routes/setting/SettingRoutes";
import { useAppDispatch, useAppSelector } from "../../package/store";
import { signOut } from "../../package/slices";

type SettingProps = NativeStackScreenProps<
  SettingRouteStackParamList,
  "Setting"
>;

export const SettingScreen: React.FC<SettingProps> = ({ navigation }) => {
  const modalEmbedRef = useRef<Modalize>(null);
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);

  const isGuest = user?.role === "guest";

  const _handlePressButtonAsync = async () => {
    let result = await WebBrowser.openBrowserAsync(
      "https://trekspot.io/en/privacy-policy",
      {
        enableBarCollapsing: true,
      }
    );
  };

  return (
    <>
      <View style={styles.safeArea}>
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ paddingHorizontal: 15 }}
        >
          <View style={styles.profileHeader}>
            {!isGuest ? (
              <View style={styles.profileLeft}>
                {true ? (
                  <View style={styles.avatar}>
                    <UserIcon />
                  </View>
                ) : (
                  <Image
                    //@ts-ignore
                    style={{
                      minWidth: 60,
                      width: 60,
                      maxWidth: 60,
                      height: 60,
                      minHeight: 60,
                      flex: 1,

                      borderRadius: "100%",
                    }}
                    source={{
                      uri: "https://images.unsplash.com/photo-1546961329-78bef0414d7c?q=20&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                    }}
                    cachePolicy="memory"
                    contentFit="cover"
                    transition={0}
                  />
                )}
                <View style={{ flex: 1 }}>
                  <Text numberOfLines={1} style={styles.username}>
                    {isGuest
                      ? "Guest user"
                      : `${user!.firstName} ${user!.lastName}`}
                  </Text>
                  <Text style={styles.subTxt}>{user!.email}</Text>
                </View>
              </View>
            ) : (
              <View style={styles.guestCard}>
                <GuestIllustration />
                <Text style={styles.guestCardTitle}>
                  As a guest user, you have limited access to features
                </Text>
                <TouchableOpacity
                  onPress={async () => {
                    await deleteItemFromStorage();
                    dispatch(signOut());
                  }}
                  style={styles.guestCardButtonItem}
                >
                  <Text style={styles.guestCardButtonItemText}>Sign In</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>

          <Text style={styles.buttonsWrapperTitle}>Account</Text>
          <View style={styles.buttonsWrapper}>
            {!isGuest && (
              <>
                <TouchableOpacity
                  onPress={() => navigation.navigate("EditProfile")}
                  style={styles.button}
                  activeOpacity={0.7}
                >
                  <UserCircleIcon />
                  <Text style={styles.buttonText}>Edit profile</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.button, { marginBottom: 0 }]}
                  activeOpacity={0.7}
                  onPress={() => navigation.navigate("ResetPasswordScreen")}
                >
                  <LockIcon />
                  <Text style={styles.buttonText}>Reset password</Text>
                </TouchableOpacity>
              </>
            )}
            <TouchableOpacity
              onPress={() => _handlePressButtonAsync()}
              style={[styles.button, { borderWidth: 0 }]}
              activeOpacity={0.7}
            >
              <PrivacyIcon />
              <Text style={styles.buttonText}>Privacy Policy</Text>
            </TouchableOpacity>
            {!isGuest && (
              <>
                <TouchableOpacity
                  style={[styles.button, { marginBottom: 0 }]}
                  activeOpacity={0.7}
                  onPress={() =>
                    Alert.alert(
                      "Warning",
                      "If you want to deactivate your account, you will lose all your data. If are sure, please send us email to hello@trekspot.io",
                      [{ text: "Got it!" }]
                    )
                  }
                >
                  <DeleteIcon />
                  <Text style={[styles.buttonText]}>Deactivate account</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.button,
                    { borderBottomWidth: 0, marginBottom: 0 },
                  ]}
                  activeOpacity={0.7}
                  onPress={async () => {
                    await deleteItemFromStorage();
                    await deleteFromAsyncStorage(["visited_countries"]);
                    dispatch(signOut());
                  }}
                >
                  <LogoutIcon />
                  <Text style={styles.buttonText}>Sign out</Text>
                </TouchableOpacity>
              </>
            )}
          </View>

          <Text style={styles.buttonsWrapperTitle}>Socials</Text>
          <View style={styles.buttonsWrapper}>
            <TouchableOpacity
              style={[
                styles.button,
                {
                  paddingLeft: 24,
                  marginRight: 0,
                  paddingRight: 0,
                },
              ]}
              activeOpacity={0.7}
              onPress={() =>
                Linking.openURL("https://www.facebook.com/trekspot.io")
              }
            >
              <FacebookLinear color="" size="" />
              <Text
                style={[
                  styles.buttonText,
                  {
                    paddingLeft: 0,
                    marginLeft: 8,
                  },
                ]}
              >
                Like us on Facebook
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, { marginBottom: 0 }]}
              activeOpacity={0.7}
              onPress={() =>
                Linking.openURL("https://www.instagram.com/trekspot.io/")
              }
            >
              <InstagramLinear color="" size="" />
              <Text style={styles.buttonText}>Follow us on Instagram</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, { marginBottom: 0 }]}
              activeOpacity={0.7}
              onPress={() =>
                Linking.openURL("https://www.threads.net/@trekspot.io")
              }
            >
              <ThreadsLinear color="" size="" />
              <Text style={styles.buttonText}>Follow us on Threads</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button]}
              activeOpacity={0.7}
              onPress={() =>
                Linking.openURL("https://www.tiktok.com/@trekspot.io")
              }
            >
              <TiktokLinear color="" size="" />
              <Text style={styles.buttonText}>Follow us on Tiktok</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, { borderBottomWidth: 0, marginBottom: 0 }]}
              activeOpacity={0.7}
              onPress={() =>
                Linking.openURL("https://www.youtube.com/@Trekspot-app")
              }
            >
              <Youtube />
              <Text style={styles.buttonText}>Subscribe us on Youtube</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.version}>
            <Text style={styles.versionText}>Version: 1.0.0</Text>
          </View>
        </ScrollView>
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
  guestCardTitle: {
    fontSize: 16,
    fontWeight: "500",
    textAlign: "center",
    marginBottom: 20,
    marginTop: 15,
    color: COLORS.black,
    lineHeight: 20,
  },
  guestCard: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    padding: 10,
  },
  guestCardButtonItem: {
    backgroundColor: COLORS.primary,
    padding: 15,
    borderRadius: 12,
    paddingHorizontal: 15,
    marginRight: 0,
    flexDirection: "row",
    marginTop: 10,
    flex: 1,
    width: "100%",
    justifyContent: "center",
  },
  guestCardButtonItemText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "500",
  },
  signInButton: {
    marginLeft: 15,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f2f2f2",
    minWidth: "100%",
    flex: 1,
    borderRadius: 40,
    height: 60,
  },
  signInButtonText: {
    color: "#000",
    fontSize: 18,
    fontWeight: "600",
  },
  version: {
    width: "100%",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 30,
  },
  versionText: {
    color: "#bbb",
    fontSize: 14,
  },
  socials: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 15,
  },
  socialButton: {
    width: 35,
    height: 35,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 3,
  },
  avatar: {
    width: 60,
    height: 60,
    backgroundColor: "#f2f2f2",
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonsWrapper: {
    backgroundColor: "#fff",
    borderRadius: 15,
    marginBottom: 25,
  },
  profileHeader: {
    flexDirection: "row",
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-between",
    borderBottomColor: "#f8f8f8",
    borderBottomWidth: 5,
    padding: 15,
    marginBottom: 15,
    backgroundColor: "#fff",
    borderRadius: 15,
    overflow: "hidden",
  },
  profileLeft: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
  },
  buttonsWrapperTitle: {
    fontSize: 14,
    color: COLORS.gray,
    marginBottom: 10,
  },
  username: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 0,
    marginLeft: 15,
    color: COLORS.black,
  },
  subTxt: {
    fontSize: 14,
    marginLeft: 15,
    marginTop: 5,
    color: COLORS.gray,
  },
  editButton: {
    marginTop: 30,
    backgroundColor: "#f8f8f8",
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 15,
  },
  editButtonText: {
    fontSize: 14,
    fontWeight: "500",
  },
  button: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2",
    flexDirection: "row",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "500",
    marginLeft: 15,
  },
});
