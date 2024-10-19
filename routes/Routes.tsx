import React, { useCallback, useReducer } from "react";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import * as SplashScreen from "expo-splash-screen";
import { Toaster } from 'sonner-native';

import { AuthRoute } from "./auth/AuthRoutes";
import { deleteItemFromStorage, getFullToken } from "../helpers/secure.storage";
import { AppRoute } from "./AppRoute";
import { Loader } from "../common/ui/Loader";

import { UserProvider } from "../components/context/UserContext";
import { signIn, signOut } from "../package/slices";

import { useAppDispatch, useAppSelector } from "../package/store";
import { useLazyMeQuery } from "../api/api.trekspot";
import { SafeAreaProvider } from "react-native-safe-area-context";

//reselect

interface RoutesProps {}

SplashScreen.preventAutoHideAsync();

export const Routes: React.FC<RoutesProps> = ({}) => {
  const authState = useAppSelector((state) => state);
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
  console.log("authState", authState.auth);
  return (
    <>
      <SafeAreaProvider>
        <NavigationContainer onReady={checkAuth} theme={theme}>
          {authState && !authState.auth.isLoading ? (
            !authState.auth.isAuthenticated ? (
              <AuthRoute />
            ) : (
              <UserProvider>
                <AppRoute />
              </UserProvider>
            )
          ) : (
            <Loader isLoading={authState.auth.isLoading} />
          )}
        </NavigationContainer>

        <Toaster />
      </SafeAreaProvider>
    </>
  );
};
