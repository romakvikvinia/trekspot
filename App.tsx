import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import { useFonts } from "expo-font";
// import * as SplashScreen from "expo-splash-screen";
import { Routes } from "./routes/Routes";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { store } from "./package/store";
import { Provider } from "react-redux";

// SplashScreen.preventAutoHideAsync();

export default function App() {
  
  return (
    <Provider store={store}>
      <GestureHandlerRootView style={styles.container}>
        <StatusBar style="auto" />
        <Routes />
      </GestureHandlerRootView>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
