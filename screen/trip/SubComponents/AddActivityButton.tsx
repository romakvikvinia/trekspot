import * as Haptics from "expo-haptics";
import { useEffect, useRef, useState } from "react";
import {
  Animated,
  Platform,
  Pressable,
  StyleSheet,
  Text,
} from "react-native";

import { COLORS } from "../../../styles/theme";
import { LightBulbIcon, PlusCircleIcon, PlusIcon } from "../../../utilities/SvgIcons.utility";
import { tripDetailStyles } from "../_tripDetailStyles";

export const AddActivityButton = ({ onActivitiesModalOpen, onAddActivitiesModal }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Animation Values
  const overlayOpacity = useRef(new Animated.Value(0)).current;
  const buttonsOpacity = useRef(new Animated.Value(0)).current; // Floating buttons opacity
  const plusRotation = useRef(new Animated.Value(0)).current; // For button rotation

  const onClose = () => {
    setIsOpen(false);
  };

  const handleShow = () => {
    setIsOpen(!isOpen);
  };

  const handleSelectSuggestions = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setIsOpen(false);
    onActivitiesModalOpen();
  }

  const handleAddCustomActivity = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setIsOpen(false);
    onAddActivitiesModal()
  }

  useEffect(() => {
    if (isOpen) {
      // Animate overlay and buttons in
      Animated.parallel([
        Animated.timing(overlayOpacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(buttonsOpacity, {
          toValue: 1,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(plusRotation, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      // Animate overlay and buttons out
      Animated.parallel([
        Animated.timing(overlayOpacity, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(buttonsOpacity, {
          toValue: 0,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(plusRotation, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [isOpen]);

  const rotateInterpolate = plusRotation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "45deg"],
  });

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <Pressable
          onPress={onClose}
          style={[StyleSheet.absoluteFillObject]}
          pointerEvents={isOpen ? "auto" : "none"}
        >
          <Animated.View
            style={[
              StyleSheet.absoluteFillObject,
              {
                backgroundColor: "rgba(0, 0, 0, 0.2)",
                opacity: overlayOpacity,
              },
            ]}
          />
        </Pressable>
      )}

      {isOpen && (
        <Animated.View
          style={[styles.floatingButtonsWrapper, { opacity: buttonsOpacity }]}
        >
          <Pressable 
            onPress={handleAddCustomActivity}
            style={({pressed}) => [
            {
                backgroundColor: pressed ? "#fafafa" : "#fff",
            },
            styles.floatingButton
          ]}>
            <Text style={styles.floatingButtonText}>Add activity</Text>
            <PlusCircleIcon color="#000" size="20" />
          </Pressable>
          <Pressable
           onPress={handleSelectSuggestions}
           style={({pressed}) => [
            styles.floatingButton,
            {
                backgroundColor: pressed ? "#fafafa" : "#fff",
                borderBottomWidth: 0
            },
          ]}>
            <Text style={styles.floatingButtonText}>Select Suggestions</Text>
            <LightBulbIcon color="#000" size="20" />
          </Pressable>
        </Animated.View>
      )}

      {/* Plus Button */}
      <Pressable
        onPress={() => {
          handleShow();
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        }}
        hitSlop={30}
        style={tripDetailStyles.addActivityButton}
      >
        <Animated.View style={{ transform: [{ rotate: rotateInterpolate }] }}>
          <PlusIcon color="#fff" size="18" />
        </Animated.View>
      </Pressable>
    </>
  );
};

const styles = StyleSheet.create({
  floatingButton: {
    alignItems: "center",
    borderBottomColor: "#f2f2f2",
    borderBottomWidth: 1,
    flexDirection:"row",
    justifyContent: "space-between",
    padding: 20,
  },
  floatingButtonText: {
    color: COLORS.black,
    fontSize: 16,
    fontWeight: "500",
  },
  floatingButtonsWrapper: {
    backgroundColor: "#fff",
    borderRadius: 15,
    bottom: 90,
    height: 120,
    position: "absolute",
    right: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    width: 290,
    ...Platform.select({
      android: {
        elevation: 1,
      },
    }),
    overflow: "hidden"
  },
});
