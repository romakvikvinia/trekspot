import * as Haptics from "expo-haptics";
import { Image } from "expo-image";
import { useRef, useState } from "react";
import { Animated, Pressable, StyleSheet, Text, View } from "react-native";
import { Portal } from "react-native-portalize";

import { COLORS } from "../../styles/theme";
import { PlusCircleIcon } from "../../utilities/SvgIcons.utility";

export const FloatingActionButton = ({
  PrimaryIcon = PlusCircleIcon,
  buttons = [],
  renderTrigger = null,
  overlayBGOpacity = 0.2,
  withHeader = false,
  title = null,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  // Animation Values
  const overlayOpacity = useRef(new Animated.Value(0)).current;
  const buttonsOpacity = useRef(new Animated.Value(0)).current;
  const plusRotation = useRef(new Animated.Value(0)).current;
  const buttonsTranslateY = useRef(new Animated.Value(100)).current; // Start off-screen

  const toggleMenu = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    if (isOpen) {
      // Close Animation
      Animated.parallel([
        Animated.timing(overlayOpacity, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(buttonsOpacity, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(plusRotation, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(buttonsTranslateY, {
          toValue: 100,
          duration: 150,
          useNativeDriver: true,
        }),
      ]).start(() => setIsOpen(false)); // Ensure state updates after animation
    } else {
      // Open Animation
      setIsOpen(true);
      Animated.parallel([
        Animated.timing(overlayOpacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(buttonsOpacity, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(plusRotation, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(buttonsTranslateY, {
          toValue: 0,
          duration: 150,
          useNativeDriver: true,
        }),
      ]).start();
    }
  };

  return (
    <>
      <Portal>
        {/* Overlay */}
        {isOpen && (
          <Pressable
            onPress={toggleMenu}
            style={[StyleSheet.absoluteFillObject]}
            pointerEvents={isOpen ? "auto" : "none"}
          >
            <Animated.View
              style={{
                backgroundColor: `rgba(0, 0, 0, ${overlayBGOpacity})`,
                opacity: overlayOpacity,
                ...StyleSheet.absoluteFillObject,
              }}
            />
          </Pressable>
        )}

        {/* Buttons */}
        {isOpen && (
          <Animated.View
            style={[
              styles.floatingButtonsWrapper,
              {
                opacity: buttonsOpacity,
                transform: [{ translateY: buttonsTranslateY }],
              },
            ]}
          >
            <Animated.View style={styles.buttonWrapper}>
              {withHeader ? (
                <View style={styles.heading}>
                  <Text style={styles.headingText}>{title}</Text>
                </View>
              ) : null}
              {buttons.map((button, index) => (
                <Pressable
                  key={index}
                  onPress={() => {
                    button.onPress();
                    toggleMenu();
                  }}
                  style={({ pressed }) => [
                    styles.floatingButton,
                    { backgroundColor: pressed ? "#fafafa" : "#fff" },
                  ]}
                >
                  <Text
                    style={[
                      styles.floatingButtonText,
                      {
                        color: button.isDanger ? "#ff0000" : "#000",
                      },
                    ]}
                  >
                    {button.label}
                  </Text>
                  {button.image && (
                    <Image
                      style={styles.imgItem}
                      source={{
                        uri: button.image,
                      }}
                      contentFit="cover"
                      cachePolicy="memory-disk"
                    ></Image>
                  )}
                  {button.icon && (
                    <button.icon
                      color={button.isDanger ? "#ff0000" : "#000"}
                      size={20}
                    />
                  )}
                </Pressable>
              ))}
            </Animated.View>
            <Pressable style={styles.cancelButton} onPress={toggleMenu}>
              <Text style={styles.floatingButtonText}>Cancel</Text>
            </Pressable>
          </Animated.View>
        )}
      </Portal>

      {/* Plus Button */}
      <Pressable
        onPress={toggleMenu}
        hitSlop={15}
        style={({ pressed }) => [
          styles.addActivityButton,
          {
            opacity: pressed ? 0.5 : 1,
          },
        ]}
      >
        {renderTrigger ? (
          renderTrigger()
        ) : (
          <PrimaryIcon color="#fff" size="24" />
        )}
      </Pressable>
    </>
  );
};

const styles = StyleSheet.create({
  addActivityButton: {
    // width: "100%",
  },
  buttonWrapper: {
    backgroundColor: "#fff",
    borderRadius: 15,
  },
  cancelButton: {
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 15,
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
    padding: 20,
  },
  floatingButton: {
    alignItems: "center",
    borderBottomColor: "#f2f2f2",
    borderBottomWidth: 1,
    borderRadius: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
  },
  floatingButtonText: {
    color: COLORS.black,
    fontSize: 16,
    fontWeight: "500",
  },
  floatingButtonsWrapper: {
    bottom: 30,
    left: 15,
    position: "absolute",
    right: 15,
  },
  heading: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 10,
    width: "100%",
  },
  headingText: {
    color: COLORS.gray,
    fontSize: 16,
    fontWeight: "600",
  },
  imgItem: {
    borderRadius: 5,
    height: 30,
    width: 30,
  },
});
