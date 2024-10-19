import React from "react";
import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  ClickOutsideProvider,
  useClickOutside,
} from "react-native-click-outside";
import { COLORS, SIZES } from "../../styles/theme";
import { GuestIllustration, XIcon } from "../../utilities/SvgIcons.utility";
import { useAppDispatch } from "../../package/store";
import { signOut } from "../../package/slices";
import { deleteItemFromStorage } from "../../helpers/secure.storage";

export const GuestUserModal = ({onClose}) => {

  const dispatch = useAppDispatch();

  const ref = useClickOutside(() => {
    onClose()
  });

  const signIn = async () => {
      await deleteItemFromStorage();
      dispatch(signOut());
  }

  return (
    <Modal
      animationType={"none"}
      transparent={true}
      statusBarTranslucent={true}
      visible={true}
    >
      <ClickOutsideProvider>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            height: SIZES.height,
          }}
        >
          {/* @ts-ignore */}
          <ScrollView
            style={styles.modalContent}
            showsVerticalScrollIndicator={false}
            ref={ref}
          >
            <View style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                minHeight: "100%",
                position: "relative",
            }}>
                  <TouchableOpacity onPress={() => onClose()} activeOpacity={0.7} style={styles.closeButton}>
                    <XIcon width="12" />
                  </TouchableOpacity>
                <View style={{flex: 1, marginTop: 35}}>
                  <GuestIllustration />
                </View>
                <Text style={styles.title}>As a guest user, you have limited access to features</Text>
                <TouchableOpacity onPress={signIn} style={styles.button}>
                    <Text style={styles.buttonText}>Sign In</Text>
                </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </ClickOutsideProvider>
    </Modal>
  );
};
export const styles = StyleSheet.create({
  modalContent: {
    backgroundColor: "#fff",
    width: "95%",
    borderRadius: 15,
    maxHeight: 390,
    padding: 25,
  },
  closeButton: {
    padding: 15,
    position: "absolute",
    right: -5,
    top: -5,
    backgroundColor: "#DBDBDB",
    width: 35,
    height: 35,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "500",
    textAlign: "center",
    marginBottom: 20,
    marginTop: 15,
    color: COLORS.black,
    paddingHorizontal: 15
  },
  button: {
    backgroundColor: COLORS.primary,
    padding: 15,
    borderRadius: 12,
    paddingHorizontal: 15,
    marginRight: 0,
    flexDirection: "row",
    marginTop: 10,
    width: "100%",
    justifyContent: "center"
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    marginLeft: 5,
    fontWeight: "500"
  }
});
