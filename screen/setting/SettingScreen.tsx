import { NativeStackScreenProps } from "@react-navigation/native-stack";
import Constants from "expo-constants";
import { Image } from "expo-image";
import * as WebBrowser from "expo-web-browser";
import React, { useCallback } from "react";
import {
  Alert,
  Linking,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { useDeactivateAccountMutation } from "../../api/api.trekspot";
import {
  deleteFromAsyncStorage,
  deleteItemFromStorage,
} from "../../helpers/secure.storage";
import { signOut } from "../../package/slices";
import { useAppDispatch, useAppSelector } from "../../package/store";
import { SettingRouteStackParamList } from "../../routes/setting/SettingRoutes";
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

type SettingProps = NativeStackScreenProps<
  SettingRouteStackParamList,
  "Setting"
>;

export const SettingScreen: React.FC<SettingProps> = ({ navigation }) => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);

  const [fetchDeactivateAccount] = useDeactivateAccountMutation();

  const isGuest = user?.role === "guest";

  const _handlePressButtonAsync = async () => {
    const result = await WebBrowser.openBrowserAsync(
      "https://trekspot.io/en/privacy-policy",
      {
        enableBarCollapsing: true,
      }
    );
  };

  const handleSignOut = useCallback(async () => {
    await deleteFromAsyncStorage(["visited_countries"]);
    await fetchDeactivateAccount();
    await deleteItemFromStorage();
    dispatch(signOut());
  }, []);

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
                {!user?.image ? (
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
                      borderRadius: 100,
                    }}
                    source={{
                      uri: user?.image,
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
                      "Delete account",
                      "Once you delete your account, your data will be permanently deleted.",
                      [
                        {
                          text: "Cancel",
                          style: "cancel",
                        },
                        {
                          text: "Delete",
                          style: "destructive",
                          onPress: handleSignOut,
                        },
                      ]
                    )
                  }
                >
                  <DeleteIcon />
                  <Text style={[styles.buttonText]}>Delete account</Text>
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
                Linking.openURL("https://www.youtube.com/@trekspotio")
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
  avatar: {
    alignItems: "center",
    backgroundColor: "#f2f2f2",
    borderRadius: 100,
    height: 60,
    justifyContent: "center",
    width: 60,
  },
  button: {
    alignItems: "center",
    borderBottomColor: "#f2f2f2",
    borderBottomWidth: 1,
    flexDirection: "row",
    padding: 20,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "500",
    marginLeft: 15,
  },
  buttonsWrapper: {
    backgroundColor: "#fff",
    borderRadius: 15,
    marginBottom: 25,
  },
  buttonsWrapperTitle: {
    color: COLORS.gray,
    fontSize: 14,
    marginBottom: 10,
  },
  editButton: {
    backgroundColor: "#f8f8f8",
    borderRadius: 5,
    marginTop: 30,
    paddingHorizontal: 15,
    paddingVertical: 8,
  },
  editButtonText: {
    fontSize: 14,
    fontWeight: "500",
  },
  guestCard: {
    alignItems: "center",
    flexDirection: "column",
    flex: 1,
    justifyContent: "center",
    padding: 10,
  },
  guestCardButtonItem: {
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    flexDirection: "row",
    flex: 1,
    justifyContent: "center",
    marginRight: 0,
    marginTop: 10,
    padding: 15,
    paddingHorizontal: 15,
    width: "100%",
  },
  guestCardButtonItemText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "500",
  },
  guestCardTitle: {
    color: COLORS.black,
    fontSize: 16,
    fontWeight: "500",
    lineHeight: 20,
    marginBottom: 20,
    marginTop: 15,
    textAlign: "center",
  },
  profileHeader: {
    alignItems: "flex-start",
    backgroundColor: "#fff",
    borderBottomColor: "#f8f8f8",
    borderBottomWidth: 5,
    borderRadius: 15,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
    overflow: "hidden",
    padding: 15,
  },
  profileLeft: {
    alignItems: "center",
    flexDirection: "row",
    width: "100%",
  },
  safeArea: {
    backgroundColor: "#f8f8f8",
    flex: 1,
    paddingTop:
      Constants?.statusBarHeight + (Platform.OS === "android" ? 5 : 10),
  }, 
  subTxt: {
    color: COLORS.gray,
    fontSize: 14,
    marginLeft: 15,
    marginTop: 5,
  },
  username: {
    color: COLORS.black,
    fontSize: 22,
    fontWeight: "bold",
    marginLeft: 15,
    marginTop: 0,
  },
  version: {
    alignItems: "center",
    marginBottom: 30,
    marginTop: 10,
    width: "100%",
  },
  versionText: {
    color: "#bbb",
    fontSize: 14,
  },
});
