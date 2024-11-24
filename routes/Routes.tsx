import React, { useCallback } from "react";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import * as SplashScreen from "expo-splash-screen";
import { Toaster } from "sonner-native";
import { PostHogProvider } from "posthog-react-native";
import { AuthRoute } from "./auth/AuthRoutes";
import { deleteItemFromStorage, getFullToken } from "../helpers/secure.storage";
import { Loader } from "../common/ui/Loader";

import { UserProvider } from "../components/context/UserContext";
import { signIn, signOut } from "../package/slices";

import { useAppDispatch, useAppSelector } from "../package/store";
import { useLazyMeQuery } from "../api/api.trekspot";
import { SafeAreaProvider } from "react-native-safe-area-context";
import AppRoute from "./AppRoute";
import { posthog } from "../utilities/Posthog";

interface RoutesProps {}

SplashScreen.preventAutoHideAsync();

export const Routes: React.FC<RoutesProps> = ({}) => {
  const authState = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const [fetchMe] = useLazyMeQuery();

  const checkAuth = useCallback(async () => {
    try {
      let token = await getFullToken();

      if (!token || (token && new Date().getTime() >= token.expire)) {
        // unauthorize

        await deleteItemFromStorage();
        dispatch(signOut());
        await SplashScreen.hideAsync();
        return;
      }

      const user = await fetchMe().unwrap();

      dispatch(
        signIn({
          token: token.token,
          user: user.me,
          expire: token.expire,
        })
      );
    } catch (error) {
      // console.log("error", error);
      // Alert.alert(JSON.stringify(error));
    }
    await SplashScreen.hideAsync();
  }, [dispatch]);

  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      border: "transparent",
    },
  };

  return (
    <>
      <SafeAreaProvider>
        <NavigationContainer onReady={checkAuth} theme={theme}>
          <PostHogProvider
            client={posthog}
            options={{
              enableSessionReplay: true,
            }}
            autocapture={{
              captureTouches: true,
              captureLifecycleEvents: true,
              captureScreens: true,
            }}
          >
            {authState && !authState.isLoading ? (
              !authState.isAuthenticated ? (
                <AuthRoute />
              ) : (
                <UserProvider>
                  <AppRoute />
                </UserProvider>
              )
            ) : (
              <Loader isLoading={authState.isLoading} />
            )}
          </PostHogProvider>
        </NavigationContainer>

        <Toaster />
      </SafeAreaProvider>
    </>
  );
};
