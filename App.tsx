import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import Constants from 'expo-constants';
// import * as SplashScreen from "expo-splash-screen";
import { Routes } from "./routes/Routes";
import { gestureHandlerRootHOC, GestureHandlerRootView } from "react-native-gesture-handler";
import { store } from "./package/store";
import { Provider } from "react-redux";
import * as Sentry from '@sentry/react-native';
 
const isRunningInExpoGo = Constants.appOwnership === 'expo';

if (!__DEV__) {
  Sentry.init({
    dsn: "https://0b2a9bad4daeb837a828e2e9a9305e63@o4508354636873728.ingest.us.sentry.io/4508354638249984",    
    debug: true,
    tracesSampleRate: 1.0,
    enableAutoPerformanceTracing: true,
    enableWatchdogTerminationTracking: false,
    integrations: [],
    environment: isRunningInExpoGo ? 'development' : 'production',
  });
}

Promise.allSettled = function (promises: any[]) {
  const mappedPromises = promises.map(p => {
    return p
      .then((value: any) => {
        return {
          status: 'fulfilled',
          value,
        };
      })
      .catch((reason: any) => {
        return {
          status: 'rejected',
          reason,
        };
      });
  });
  return Promise.all(mappedPromises);
};

const App = () =>  {
  
  return (
    <Provider store={store}>
      <GestureHandlerRootView style={styles.container}>
        <StatusBar style="auto" />
        <Routes />
      </GestureHandlerRootView>
    </Provider>
  );
}

export default gestureHandlerRootHOC(__DEV__ ? App : Sentry.wrap(App));

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
