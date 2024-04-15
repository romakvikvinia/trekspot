/* eslint-disable react/prop-types */
import React from "react";
import { Animated, Dimensions, StyleSheet, View } from "react-native";
import { COLORS } from "../../styles/theme";

export const SkeletonLoader = ({
  height = 50,
  amount = 1,
  marginTop,
  marginBottom,
}) => {
  const circleAnimatedValue = new Animated.Value(0);

  const translateX2 = circleAnimatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [-10, Dimensions.get("window").width],
  });

  const circleAnimated = () => {
    circleAnimatedValue.setValue(0);
    Animated.timing(circleAnimatedValue, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start(() => {
      setTimeout(() => {
        circleAnimated();
      }, 700);
    });
  };
  circleAnimated();

  return (
    <View
      style={[
        {
          marginBottom: marginBottom || 25,
          marginTop: marginTop || 25,
        },
        styles.card,
      ]}
    >
      <View
        style={{ flex: 1, justifyContent: "space-evenly", overflow: "hidden" }}
      >
        <Animated.View
          style={{
            backgroundColor: "#fff",
            height: 20,
            marginVertical: 5,
            width: "30%",
            borderRadius: 6,
          }}
        >
          <Animated.View
            style={{
              width: "20%",
              height: "100%",
              backgroundColor: "#edf2fb",
              opacity: 0.5,
              transform: [{ translateX: translateX2 }],
            }}
          ></Animated.View>
        </Animated.View>
        {Array.from(Array(amount).keys()).map((item, ind) => (
          <Animated.View
            key={ind}
            style={{
              backgroundColor: "#fff",
              height,
              marginVertical: 5,
              borderRadius: 6,
            }}
          >
            <Animated.View
              style={{
                width: "20%",
                height: "100%",
                backgroundColor: "#edf2fb",
                opacity: 0.5,
                transform: [{ translateX: translateX2 }],
              }}
            ></Animated.View>
          </Animated.View>
        ))}
      </View>
    </View>
  );
};

export const SkeletonLoaderImage = ({
  height = 50,
  width = 100,
  amount = 1,
  marginTop,
  marginBottom,
}) => {
  const circleAnimatedValue = new Animated.Value(0);

  const translateX2 = circleAnimatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [-10, Dimensions.get("window").width],
  });

  const circleAnimated = () => {
    circleAnimatedValue.setValue(0);
    Animated.timing(circleAnimatedValue, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start(() => {
      setTimeout(() => {
        circleAnimated();
      }, 700);
    });
  };
  circleAnimated();

  return (
    <View
      style={[
        {
          marginBottom: marginBottom || 25,
          marginTop: marginTop || 25,
          width: width,
          height: height,
          marginRight: 15,
        },
        styles.card,
      ]}
    >
      <View
        style={{ flex: 1, justifyContent: "space-evenly", overflow: "hidden" }}
      >
        <Animated.View
          style={{
            backgroundColor: "#fff",
            height: 20,
            marginVertical: 5,
            width: width,
            height: height,
            borderRadius: 15,
          }}
        >
          <Animated.View
            style={{
              width: width,
              height: height,
              backgroundColor: "#edf2fb",
              opacity: 0.5,
              transform: [{ translateX: translateX2 }],
            }}
          ></Animated.View>
        </Animated.View>
      </View>
    </View>
  );
};

export const SkeletonLoaderCountry = ({
  width = 160,
  height = 180,
  amount = 1,
  marginTop,
  marginBottom,
}) => {
  const circleAnimatedValue = new Animated.Value(0);

  const translateX2 = circleAnimatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [-10, Dimensions.get("window").width],
  });

  const circleAnimated = () => {
    circleAnimatedValue.setValue(0);
    Animated.timing(circleAnimatedValue, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start(() => {
      setTimeout(() => {
        circleAnimated();
      }, 700);
    });
  };
  circleAnimated();

  return (
    <View
      style={[
        {
          marginBottom: marginBottom || 25,
          marginTop: marginTop || 25,
          width: width,
          height: height,
          marginRight: 15,
        },
        styles.card,
      ]}
    >
      <View
        style={{ flex: 1, justifyContent: "space-evenly", overflow: "hidden" }}
      >
        <Animated.View
          style={{
            backgroundColor: "#fff",
            height: 20,
            marginVertical: 5,
            width: width,
            height: height,
            borderRadius: 15,
          }}
        >
          <Animated.View
            style={{
              width: width,
              height: height,
              backgroundColor: "#edf2fb",
              opacity: 0.5,
              transform: [{ translateX: translateX2 }],
            }}
          ></Animated.View>
        </Animated.View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 4,
    // ...COLORS.shadow,
    flexDirection: "row",
    overflow: "hidden",
  },
});
