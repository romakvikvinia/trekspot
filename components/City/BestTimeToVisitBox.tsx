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

export const BestTimeToVisitBox = () => {
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
      <Pressable
        style={({ pressed }) => [
          styles.boxItem,
          {
            opacity: pressed ? 0.5 : 1,
          },
        ]}
        onPress={showPopup}
      >
        <Text style={styles.boxItemTitle}>Best time to visit</Text>
        <View style={styles.boxItemIn}>
          <View style={styles.boxItemInTitleWrapper}>
            <Text style={styles.boxItemInTitleText}>2 Days</Text>
            <Text style={styles.boxItemInSubTitle}>Typical visit</Text>
          </View>
          <View
            style={[
              styles.boxItemInTitleWrapper,
              {
                marginTop: 10,
              },
            ]}
          >
            <Text style={styles.boxItemInTitleText}>Apr-May</Text>
            <Text style={styles.boxItemInSubTitle}>High season</Text>
          </View>
        </View>
        <Text style={styles.moreDetails}>
            More details →
        </Text>
      </Pressable>

      {visible && (
        <Portal>
          <View style={[StyleSheet.absoluteFillObject, styles.bg]}>
            <Animated.View style={[styles.contentCard, { opacity: fadeAnim }]}>
              <ScrollView style={styles.inner}></ScrollView>
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
  boxItem: {
    backgroundColor: "#fff",
    borderColor: "#fafafa",
    borderRadius: 15,
    borderWidth: 1,
    height: 185,
    marginRight: 15,
    padding: 15,
    width: 180,
  },
  boxItemIn: {
    flexDirection: "column",
    marginTop: 15,
  },
  boxItemInSubTitle: {
    color: COLORS.gray,
    fontSize: 12,
    fontWeight: "500",
    marginTop: 5,
    width: "100%",
  },
  boxItemInTitleText: {
    color: COLORS.black,
    fontSize: 18,
    fontWeight: "600",
    maxWidth: "80%",
  },
  boxItemInTitleWrapper: {
    flexDirection: "column",
    flexWrap: "wrap",
  },
  boxItemTitle: {
    fontSize: 14,
    fontWeight: "400",
    textTransform: "uppercase",
  },
  closeButton: {
    backgroundColor: "#f2f2f2",
    borderRadius: 100,
    marginTop: 10,
    padding: 15,
    width: "100%",
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
    minHeight: SIZES.height - 200,
    padding: 15,
    paddingRight: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    width: SIZES.width - 30,
    zIndex: 1,
  },
  inner: {
    flex: 1,
    paddingRight: 10,
  },
  moreDetails: {
    color: COLORS.primary,
    fontSize: 14,
    marginTop: 15
  },
});
