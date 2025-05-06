import Constants from "expo-constants";
import { useEffect, useState } from "react";
import { Platform, Pressable, StyleSheet, Text, View } from "react-native";
import { StatusBar } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { Portal } from "react-native-portalize";
import { runOnJS } from "react-native-reanimated";
import {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { withSpring } from "react-native-reanimated";
import Animated from "react-native-reanimated";

import { globalStyles } from "../../styles/globalStyles";
import { BackIcon } from "../../utilities/SvgIcons.utility";

const SWIPE_THRESHOLD = 20;

export const FullscreenModal = ({
  visible,
  children,
  onClose,
  pageTitle
}: {
  visible: boolean;
  children: React.ReactNode;
  onClose: () => void;
  pageTitle?: string;
}) => {
  const scale = useSharedValue(visible ? 1 : 0.9);
  const opacity = useSharedValue(visible ? 1 : 0);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    scale.value = withTiming(visible ? 1 : 0.9, { duration: 300 });
    opacity.value = withTiming(visible ? 1 : 0, { duration: 300 });
  }, [visible]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  const handleClose = () => {
    opacity.value = withTiming(0, { duration: 300 });
    scale.value = withTiming(0.9, { duration: 300 });

    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    setTimeoutId(
      setTimeout(() => {
        onClose?.();
      }, 300)
    );
  };

  useEffect(() => {
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [timeoutId]);

  const translateX = useSharedValue(0);

  // Function to handle swipe completion (optional)
  const onSwipeComplete = () => {
    handleClose();
  };

  const panGesture = Gesture.Pan()
    .onBegin((event) => {
      // Check if the gesture starts near the left edge (optional)
      if (event.x < 20) {
        console.log("Started from left edge");
      }
    })
    .onUpdate((event) => {
      // Only allow rightward swipes (dx > 0)
      if (event.translationX > 0) {
        translateX.value = event.translationX;
      }
    })
    .onEnd((event) => {
      if (event.translationX > SWIPE_THRESHOLD) {
        // Swipe reached the center - trigger action
        runOnJS(onSwipeComplete)(); // Run JS callback
      }
      // Reset position with spring animation
      translateX.value = withSpring(0);
    });

  if (!visible) return null;

  return (
    <>
      <StatusBar style="dark" />
      <Portal>
        <GestureDetector gesture={panGesture}>
          <Animated.View style={[styles.container, animatedStyle]}>
            {pageTitle && (
              <View style={styles.header}>
                <Pressable
                  onPress={() => handleClose()}
                  hitSlop={20}
                  style={({ pressed }) => [
                    styles.backButton,
                    {
                      opacity: pressed ? 0.5 : 1,
                    },
                  ]}
                >
                  <BackIcon size="18" />
                </Pressable>
                <Text style={globalStyles.screenTitle}>{pageTitle}</Text>
              </View>
            )}
            {children}

            {/* <Animated.ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: 50 }}
              // onScroll={({ nativeEvent }) => {
              //   setIsScrolled(nativeEvent.contentOffset.y > 400);
              // }}
              bounces={false}
            >
              <View style={styles.content}>
               
              </View>
            </Animated.ScrollView> */}
          </Animated.View>
        </GestureDetector>
      </Portal>
    </>
  );
};

const styles = StyleSheet.create({
  backButton: {
    alignItems: "flex-start",
    backgroundColor: "#fff",
    borderRadius: 30,
    bottom: 15,
    display: "flex",
    justifyContent: "center",
    left: 15,
    position: "absolute",
  },
  container: {
    backgroundColor: "#fff",
    flex: 1,
  },
  header: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    padding: 15,
    paddingTop: Platform.OS === "android" ? Constants?.statusBarHeight + 5 : 60,
    position: "relative",
  },
});
