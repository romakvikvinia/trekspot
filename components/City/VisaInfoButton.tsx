import { useRef, useState } from "react";
import {
  Animated,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Portal } from "react-native-portalize";

import { COLORS, SIZES } from "../../styles/theme";
import { CheckCircleIcon } from "../../utilities/SvgIcons.utility";

export const VisaInfoButton = () => {
  const [visible, setVisible] = useState(false);

  const fadeAnim = useRef(new Animated.Value(0)).current;

  const showPopup = () => {
    setVisible(true);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 150,
      useNativeDriver: true,
    }).start();
  };

  const hidePopup = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 10,
      useNativeDriver: true,
    }).start(() => setVisible(false));
  };

  return (
    <>
      <Pressable onPress={showPopup} hitSlop={15} style={styles.btn}>
        <Text style={styles.labelItemText}>Visa free</Text>
      </Pressable>

      {visible && (
        <Portal>
          <View style={[StyleSheet.absoluteFillObject, styles.bg]}>
            <Animated.View style={[styles.contentCard, { opacity: fadeAnim }]}>
              <ScrollView style={styles.inner}>
                <Text style={styles.title}>Visa requirement</Text>

                <View style={styles.textContentWrapper}>
                  <CheckCircleIcon color="#1a806b" size={40} />
                  <Text style={styles.headingText}>
                    Georgian passport holders don't need visa to travel to
                    Germany.
                  </Text>
                </View>

                 {/* <View style={[styles.textContentWrapper, styles.dangerBg]}>
                    <CloseCircleIcon color="#D74E4E" size={40} />
                    <Text style={styles.headingText}>
                      Georgian passport holders need visa to travel to Japan.
                    </Text>
                  </View>   */}

                <Text style={styles.secondaryTitle}>Options</Text>
                <View style={styles.visaTypes}>
                  <View style={styles.visaTypeCard}>
                    <Text style={styles.visaTypeCardTitle}>Visitor visa</Text>
                    <View style={styles.staysNtype}>
                      <View style={styles.staysNtypeRow}>
                        <Text style={styles.staysNtypeRowKey}>
                          Allowed stay:
                        </Text>
                        <Text style={styles.staysNtypeRowValue}>3 Days</Text>
                      </View>
                      <View style={styles.staysNtypeRow}>
                        <Text style={styles.staysNtypeRowKey}>Type:</Text>
                        <Text style={styles.staysNtypeRowValue}>
                          Tourism, business
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              </ScrollView>
              <Pressable onPress={hidePopup} style={styles.closeButton}>
                <Text style={styles.closeButtonText}>Close</Text>
              </Pressable>
            </Animated.View>
          </View>
        </Portal>
      )}
    </>
  );
};
const styles = StyleSheet.create({
  bg: {
    alignItems: "center",
    backgroundColor: "rgba(0,0,0, 0.4)",
    justifyContent: "center",
    position: "absolute",
    zIndex: 1,
  },
  btn: {
    marginLeft: 5,
  },
  closeButton: {
    backgroundColor: "#f2f2f2",
    borderRadius: 100,
    marginRight: 10,
    marginTop: 10,
    padding: 15
  },
  closeButtonText: {
    color: COLORS.black,
    fontSize: 15,
    fontWeight: "500",
    textAlign: "center",
  },
  contentCard: {
    backgroundColor: "#fff",
    borderRadius: 15,
    elevation: 5,
    height: 400,
    justifyContent: "space-between",
    maxWidth: 500,
    minHeight: 410,
    padding: 15,
    paddingRight: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    width: SIZES.width - 60,
    zIndex: 1,
  },
  headingText: {
    fontSize: 16,
    fontWeight: "400",
    marginTop: 15,
    textAlign: "center",
  },
  inner: {
    flex: 1,
    paddingRight: 10,
  },
  labelItemText: {
    color: "green",
    fontSize: 14,
    fontWeight: "500",
  },
  secondaryTitle: {
    color: COLORS.darkgray,
    fontSize: 16,
    fontWeight: "600",
    marginTop: 25,
  },
  staysNtype: {
    marginTop: 10,
  },
  staysNtypeRow: {
    flexDirection: "row",
    marginVertical: 3,
  },
  staysNtypeRowKey: {
    color: COLORS.darkgray,
    fontSize: 12,
    fontWeight: "bold",
    width: 100,
  },
  staysNtypeRowValue: {
    color: "#000",
    fontSize: 12,
    fontWeight: "bold",
    textTransform: "capitalize",
  },
  textContentWrapper: {
    alignItems: "center",
    marginTop: 30,
    width: "100%",
  },
  title: {
    color: COLORS.black,
    fontSize: 18,
    fontWeight: "500",
  },
  visaTypeCard: {
    backgroundColor: "#f9fafb",
    borderColor: "#eee",
    borderRadius: 10,
    borderWidth: 1,
    marginTop: 15,
    padding: 15,
  },
  visaTypeCardTitle: {
    color: "#000",
    fontSize: 18,
    fontWeight: "bold",
  },
  visaTypes: {
    flex: 1,
  },
});
