import React, { useContext, useRef } from "react";
import {
  Alert,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Constants from "expo-constants";

import { Image } from "expo-image";
import { AuthContext } from "../../package/context/auth.context";
import { deleteFromAsyncStorage } from "../../helpers/secure.storage";
import { COLORS } from "../../styles/theme";
import {
  DeleteIcon,
  FacebookLinear,
  InstagramLinear,
  LockIcon,
  LogoutIcon,
  PrivacyIcon,
  ThreadsLinear,
  TiktokLinear,
  UserCircleIcon,
  UserIcon,
} from "../../utilities/SvgIcons.utility";
import { useNavigation } from "@react-navigation/native";
import { Portal } from "react-native-portalize";
import { Modalize } from "react-native-modalize";
import { MapEmbedView } from "../../common/components/MapEmbedView";
import { UserContext } from "../../components/context/UserContext";

 
interface SettingProps {}

export const SettingScreen: React.FC<SettingProps> = ({}) => {
  const modalEmbedRef = useRef<Modalize>(null);
  const { user } = useContext(UserContext);

  const { signOut } = useContext(AuthContext);
  const navigation = useNavigation();

  const onModalEmbedOpen = () => {
    modalEmbedRef.current?.open();
  };

 
  return (
    <>
      <View style={styles.safeArea}>
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ paddingHorizontal: 15 }}
        >
          <View style={styles.profileHeader}>
            <View style={styles.profileLeft}>
              {true ? (
                <View style={styles.avatar}>
                  <UserIcon />
                </View>
              ) : (
                <Image
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
              <View style={{ maxWidth: "70%" }}>
                <Text numberOfLines={1} style={styles.username}>
                  {user?.type === "guest" ? "Guest user" : "Misha Gogiashvili"}
                </Text>
                <Text style={styles.subTxt}>Welcome</Text>
              </View>
            </View>
          </View>
          {user?.type !== "guest" && (
            <>
              <Text style={styles.buttonsWrapperTitle}>Account</Text>
              <View style={styles.buttonsWrapper}>
                <TouchableOpacity
                  onPress={() => navigation.navigate("EditProfile")}
                  style={styles.button}
                  activeOpacity={0.7}
                >
                  <UserCircleIcon />
                  <Text style={styles.buttonText}>Edit profile</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.button,
                    { borderBottomWidth: 0, marginBottom: 0 },
                  ]}
                  activeOpacity={0.7}
                  onPress={() => navigation.navigate("ResetPasswordScreen")}
                >
                  <LockIcon />
                  <Text style={styles.buttonText}>Reset password</Text>
                </TouchableOpacity>
              </View>
            </>
          )}
          <Text style={styles.buttonsWrapperTitle}>Legal</Text>
          <View style={styles.buttonsWrapper}>
            <TouchableOpacity
              onPress={() => onModalEmbedOpen()}
              style={[styles.button, {borderWidth: 0}]}
              activeOpacity={0.7}
            >
              <PrivacyIcon />
              <Text style={styles.buttonText}>Privacy Policy</Text>
            </TouchableOpacity>
          </View>
          {user?.type !== "guest" && (
            <>
              <Text style={styles.buttonsWrapperTitle}>Manage</Text>
              <View style={styles.buttonsWrapper}>
                <TouchableOpacity
                  style={styles.button}
                  activeOpacity={0.7}
                  onPress={async () => {
                    signOut();
                    deleteFromAsyncStorage([
                      "visited_countries",
                      "lived_countries",
                    ]);
                  }}
                >
                  <LogoutIcon />
                  <Text style={styles.buttonText}>Logout</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.button,
                    { borderBottomWidth: 0, marginBottom: 0 },
                  ]}
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
                  <Text style={[styles.buttonText, { color: COLORS.red }]}>
                    Deactivate account
                  </Text>
                </TouchableOpacity>
              </View>
            </>
          )}
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
            >
              <InstagramLinear color="" size="" />
              <Text style={styles.buttonText}>Follow us on Instagram</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, { marginBottom: 0 }]}
              activeOpacity={0.7}
            >
              <ThreadsLinear color="" size="" />
              <Text style={styles.buttonText}>Follow us on Threads</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, { borderBottomWidth: 0, marginBottom: 0 }]}
              activeOpacity={0.7}
            >
              <TiktokLinear color="" size="" />
              <Text style={styles.buttonText}>Follow us on Tiktok</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.version}>
            <Text style={styles.versionText}>Version: 1.0.0</Text>
          </View>
        </ScrollView>
      </View>

      <Portal>
        <Modalize ref={modalEmbedRef} modalTopOffset={65} adjustToContentHeight>
          <MapEmbedView
            blogUrl="https://cdn.pixabay.com/photo/2017/12/19/18/09/flowers-3028429_1280.jpg?v=3"
            placeTitle="Tbilisi"
            modalEmbedRef={modalEmbedRef}
          />
        </Modalize>
      </Portal>
    </>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f8f8f8",
    paddingTop:
    Constants?.statusBarHeight + 10
  },
  version: {
    width: "100%",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 30
  },
  versionText: {
    color: "#bbb",
    fontSize: 14,
  },
  socials: {
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: "center",
    marginTop: 15
  },
  socialButton: {
    width: 35,
    height: 35,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 3
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
