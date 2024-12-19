import { DefaultTheme,NavigationContainer } from "@react-navigation/native";
import * as SplashScreen from "expo-splash-screen";
import { PostHogProvider } from "posthog-react-native";
import React, { useCallback } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Toaster } from "sonner-native";

import { useLazyMeQuery } from "../api/api.trekspot";
import { Loader } from "../common/ui/Loader";
import { UserProvider } from "../components/context/UserContext";
import { deleteItemFromStorage, getFullToken } from "../helpers/secure.storage";
import { setIsLoading, signIn, signOut } from "../package/slices";
import { useAppDispatch, useAppSelector } from "../package/store";
import { posthog } from "../utilities/Posthog";
import AppRoute from "./AppRoute";
import { AuthRoute } from "./auth/AuthRoutes";

interface RoutesProps {}

SplashScreen.preventAutoHideAsync();

export const Routes: React.FC<RoutesProps> = ({}) => {
  const authState = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const [fetchMe] = useLazyMeQuery();

  const checkAuth = useCallback(async () => {
    dispatch(setIsLoading({ isLoading: true }));

    try {
      const token = await getFullToken();

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
      console.log("error", error);
      // Alert.alert(JSON.stringify(error));
      await deleteItemFromStorage();
      dispatch(signOut());
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
  console.log("e", authState);
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
