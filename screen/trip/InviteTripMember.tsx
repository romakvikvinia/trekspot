// import * as Clipboard from "expo-clipboard";
import Constants from "expo-constants";
import * as Haptics from "expo-haptics";
import { Image } from "expo-image";
import { StatusBar } from "expo-status-bar";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { FloatingActionButton } from "../../components/common/FloatingButtons";
import { ScreenHeader } from "../../components/common/ScreenHeader";
import { useAppSelector } from "../../package/store";
import { COLORS } from "../../styles/theme";
import { CopyLinkIcon, DotsIcon, TrashIcon, UserIcon } from "../../utilities/SvgIcons.utility";

export const InviteTripMember = () => {
  const { user } = useAppSelector((state) => state.auth);

  const copyToClipboard = async () => {
    // await Clipboard.setStringAsync(
    //   "https://trekspot/trips?t=ad3kj-2asd32-ds32d-23jdd"
    // );
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  };

  return (
    <>
      <View style={styles.safeArea}>
        <KeyboardAvoidingView
          behavior={Platform.OS == "ios" ? "padding" : "height"}
          style={styles.screen}
        >
          <StatusBar style="dark" />

          <ScreenHeader title="Trip members" />

          <ScrollView
            style={{ flex: 1, paddingTop: 25 }}
            contentContainerStyle={{ paddingHorizontal: 15 }}
            keyboardShouldPersistTaps="handled"
          >
            <Text style={styles.title}>
              Copy and share link to invite trip members
            </Text>

            <Pressable
              style={({ pressed }) => [
                styles.copyArea,
                {
                  backgroundColor: pressed ? "#ccc" : "#fff",
                },
              ]}
              onPress={copyToClipboard}
            >
              <View style={styles.lf}>
                <CopyLinkIcon size="15" color={COLORS.darkgray} />
                <Text style={styles.linkText} numberOfLines={1}>
                  https://trekspot/trips?t=ad3kj-2asd32-ds32d-23jdd
                </Text>
              </View>
              <View style={styles.copyButton}>
                <Text style={styles.copyButtonText}>Copy</Text>
              </View>
            </Pressable>
            <View style={styles.userItem}>
              {!user?.image ? (
                <View style={styles.avatar}>
                  <UserIcon size="20" />
                </View>
              ) : (
                <Image
                  //@ts-ignore
                  style={{
                    minWidth: 40,
                    width: 40,
                    maxWidth: 40,
                    height: 40,
                    minHeight: 40,
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
              <View style={[styles.userRg,{flex: 1}]}>
                <Text style={[styles.username, {
                  width: "100%"
                }]}>
                  {user?.firstName} {user?.lastName}
                </Text>
                <Text style={styles.usernameSub}>Owner</Text>
              </View>
            </View>

            <Text style={[styles.title, { marginTop: 15, fontSize: 18, marginBottom: 5 }]}>
              Invited users
            </Text>
            {[0,1,2,3,4].map( (_, i) => (
              <View
                key={i}
                style={styles.invitedUserItem}
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  {!user?.image ? (
                    <View style={styles.avatar}>
                      <UserIcon size="20" />
                    </View>
                  ) : (
                    <Image
                      //@ts-ignore
                      style={styles.userImg}
                      source={{
                        uri: user?.image,
                      }}
                      cachePolicy="memory"
                      contentFit="cover"
                      transition={0}
                    />
                  )}
                  <View style={[styles.userRg, {flex: 1, maxWidth: "70%"}]}>
                    <Text style={styles.username} numberOfLines={1}>
                      {user?.firstName} {user?.lastName}
                    </Text>
                  </View>
                </View>
                <FloatingActionButton
                  buttons={[
                    {
                      label: "Remove user",
                      onPress: null,
                      icon: TrashIcon,
                      isDanger: true,
                    },
                  ]}
                  renderTrigger={() => (
                    <View style={styles.inputGroup}>
                      <DotsIcon />
                    </View>
                  )}
                />
              </View>
            ))}
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  avatar: {
    alignItems: "center",
    backgroundColor: "#ddd",
    borderRadius: 50,
    height: 40,
    justifyContent: "center",
    width: 40,
  },
  copyArea: {
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 25,
    marginTop: 15,
    padding: 15,
    width: "100%",
  },
  copyButton: {
    backgroundColor: COLORS.black,
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  copyButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "500",
  },
  invitedUserItem: {
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    padding: 15,
    width: "100%",
  },
  lf: {
    flexDirection: "row",
    maxWidth: "75%",
  },
  linkText: {
    color: COLORS.darkgray,
    fontSize: 14,
    fontWeight: "400",
    marginLeft: 15,
  },
  safeArea: {
    backgroundColor: "#f8f8f8",
    flex: 1,
    paddingTop:
      Constants?.statusBarHeight + (Platform.OS === "android" ? 5 : 10),
  },
  screen: {
    flex: 1,
    width: "100%",
  },
  title: {
    color: "#000",
    fontSize: 16,
    fontWeight: "500",
  },
  userImg: {
    borderRadius: 100,
    flex: 1,
    height: 40,
    maxWidth: 40,
    minHeight: 40,
    minWidth: 40,
    width: 40,
  },
  userItem: {
    alignItems: "center",
    flexDirection: "row",
    width: "100%",
  },
  userRg: {
    marginLeft: 10,
  },
  username: {
    color: "#000",
    fontSize: 15,
    fontWeight: "500",
  },
  usernameSub: {
    color: COLORS.darkgray,
    fontSize: 14,
    fontWeight: "400",
    marginTop: 3,
  },
});
