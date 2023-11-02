import React, { useState, useEffect, useCallback, useReducer } from "react";
import { NavigationContainer } from "@react-navigation/native";
import * as SplashScreen from "expo-splash-screen";

// import { deleteItemFromStorage, getFullToken } from "../helpers/storage";
// import { setToken } from "../helpers/baseUrl";
import { authReducer, defaultState } from "../package/reducers/auth.reducer";
import { AuthContext } from "../package/context/auth.context";
import { AppRoute } from "./AppRoute";
import { AuthRoute } from "./auth/AuthRoutes";

//reselect

interface RoutesProps {}

SplashScreen.preventAutoHideAsync();

export const Routes: React.FC<RoutesProps> = ({}) => {
  const initialState = defaultState();
  const [state, dispatch] = useReducer(authReducer, initialState);

  const checkAuth = useCallback(async () => {
    try {
      //   let tokens = await getFullToken();

      //   if (!tokens || new Date().getTime() >= tokens.expires_in) {
      //     // unauthorize
      //     deleteItemFromStorage();
      //     return;
      //   }

      //   setToken(tokens.access_token);
      //   dispatch({ type: "SIGN_IN", payload: { token: tokens.access_token } });
      await SplashScreen.hideAsync();
    } catch (error) {}
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: async (data: any) => {
        dispatch({
          type: "SIGN_IN",
          payload: {
            token: data.access_token,
            refresh_token: data.access_token,
            expires_in: data.expires_in,
          },
        });
      },
      signOut: async () => {
        // await deleteItemFromStorage();
        dispatch({ type: "SIGN_OUT" });
      },
    }),
    []
  );

  return (
    <NavigationContainer onReady={checkAuth}>
      <AuthContext.Provider value={authContext}>
        {/* {!state.isAuthenticated ? <AuthRoute /> : <AppRoute />} */}
        <AppRoute />
      </AuthContext.Provider>
    </NavigationContainer>
  );
};
