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

import { deleteItemFromStorage } from "../../helpers/secure.storage";
import { signOut } from "../../package/slices";
import { useAppDispatch } from "../../package/store";
import { COLORS, SIZES } from "../../styles/theme";
import { GuestIllustration, XIcon } from "../../utilities/SvgIcons.utility";

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
  button: {
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "center",
    marginRight: 0,
    marginTop: 10,
    padding: 15,
    paddingHorizontal: 15,
    width: "100%"
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "500",
    marginLeft: 5
  },
  closeButton: {
    alignItems: "center",
    backgroundColor: "#DBDBDB",
    borderRadius: 50,
    height: 35,
    justifyContent: "center",
    padding: 15,
    position: "absolute",
    right: -5,
    top: -5,
    width: 35,
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 15,
    maxHeight: 390,
    padding: 25,
    width: "95%",
  },
  title: {
    color: COLORS.black,
    fontSize: 18,
    fontWeight: "500",
    marginBottom: 20,
    marginTop: 15,
    paddingHorizontal: 15,
    textAlign: "center"
  }
});
