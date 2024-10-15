import React, { useCallback } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";

import { trekSpotApi } from "./api/api.trekspot";
import { ApiProvider } from "@reduxjs/toolkit/dist/query/react";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { Routes } from "./routes/Routes";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { store } from "./package/store";
import { Provider } from "react-redux";

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
    <Provider store={store}>
      {/* <ApiProvider api={trekSpotApi}> */}
      <GestureHandlerRootView
        // onLayout={onLayoutRootView}
        style={styles.container}
      >
        <StatusBar style="auto" />
        <Routes />
      </GestureHandlerRootView>
      {/* </ApiProvider> */}
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
