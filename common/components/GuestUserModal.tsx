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
} from "react-native-click-outside";
import { COLORS, SIZES } from "../../styles/theme";
import {  GuestIllustration } from "../../utilities/SvgIcons.utility";

export const GuestUserModal = () => {
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
          >
            <View style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                minHeight: "100%",
            }}>
                <GuestIllustration />
                <Text style={styles.title}>As a guest user, you have limited access to features</Text>
                <TouchableOpacity style={styles.button}>
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
    maxHeight: 400,
    padding: 25,
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
