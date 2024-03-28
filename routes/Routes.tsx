import React, { useCallback, useReducer } from "react";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import * as SplashScreen from "expo-splash-screen";

import { authReducer, defaultState } from "../package/reducers/auth.reducer";
import { AuthContext } from "../package/context/auth.context";

import { AuthRoute } from "./auth/AuthRoutes";
import { deleteItemFromStorage, getFullToken } from "../helpers/secure.storage";
import { AppRoute } from "./AppRoute";
import { Loader } from "../common/ui/Loader";
import { Alert } from "react-native";

//reselect

interface RoutesProps {}

SplashScreen.preventAutoHideAsync();

export const Routes: React.FC<RoutesProps> = ({}) => {
  const initialState = defaultState();
  const [state, dispatch] = useReducer(authReducer, initialState);

  const checkAuth = useCallback(async () => {
    try {
      let token = await getFullToken();

      // await deleteItemFromStorage();
      if (!token || (token && new Date().getTime() >= token.expire)) {
        // unauthorize

        await deleteItemFromStorage();
        dispatch({ type: "SIGN_OUT" });
        await SplashScreen.hideAsync();
        return;
      }

      // // setToken(tokens.access_token);
      dispatch({ type: "SIGN_IN", payload: { token: token.token } });
    } catch (error) {
      // console.log("error", error);
      // Alert.alert(JSON.stringify(error));
    }
    await SplashScreen.hideAsync();
  }, [dispatch]);

  const authContext = React.useMemo(
    () => ({
      signIn: async (data: any) => {
        dispatch({
          type: "SIGN_IN",
          payload: {
            token: data.access_token,
            expire: data.expire,
          },
        });
      },
      signOut: async () => {
        await deleteItemFromStorage();
        dispatch({ type: "SIGN_OUT" });
      },
    }),
    []
  );

  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      border: "transparent",
    },
  };

  return (
    <NavigationContainer onReady={checkAuth} theme={theme}>
      <AuthContext.Provider value={authContext}>
        {/* {!state.isLoading ? (
          !state.isAuthenticated ? (
            <AuthRoute />
          ) : (
            <AppRoute />
          )
        ) : (
          <Loader isLoading={state.isLoading} />
        )} */}
        <AppRoute />
      </AuthContext.Provider>
    </NavigationContainer>
  );
};
