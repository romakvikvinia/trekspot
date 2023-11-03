import React from "react";
import { View, Platform } from "react-native";
import {
  AccessToken,
  AuthenticationToken,
  LoginButton,
} from "react-native-fbsdk-next";

interface SignUpScreenProps {}

export const SignUpScreen: React.FC<SignUpScreenProps> = ({}) => {
  return (
    <View>
      <LoginButton
        onLoginFinished={(error, result: any) => {
          if (error) {
            console.log("login has error: " + result.error);
          } else if (result.isCancelled) {
            console.log("login is cancelled.");
          } else {
            if (Platform.OS === "ios") {
              AuthenticationToken.getAuthenticationTokenIOS().then((data) => {
                console.log(data?.authenticationToken);
              });
            } else {
              AccessToken.getCurrentAccessToken().then((data) => {
                console.log(data?.accessToken.toString());
              });
            }
          }
        }}
        onLogoutFinished={() => console.log("logout.")}
        loginTrackingIOS={"limited"}
        nonceIOS={"my_nonce"}
      />
    </View>
  );
};
