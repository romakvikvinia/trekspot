import React, { useCallback } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { trekSpotApi } from "./api/api.trekspot";
import { ApiProvider } from "@reduxjs/toolkit/dist/query/react";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { Routes } from "./routes/Routes";
import "react-native-gesture-handler";

// SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded] = useFonts({
    //  fontName: require("./assets/fonts/FontName.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }
  return (
    <ApiProvider api={trekSpotApi}>
      <View
        // onLayout={onLayoutRootView}
        style={styles.container}
      >
        <StatusBar style="auto" />
        <Routes />
      </View>
    </ApiProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
