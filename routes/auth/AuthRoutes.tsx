import React from "react";
import {
  StackNavigationProp,
  createStackNavigator,
} from "@react-navigation/stack";
import { SignInScreen } from "../../screen/auth/SignInScreen";
import { SignUpScreen } from "../../screen/auth/SignUpScreen";
import { GetStartedScreen } from "../../screen/auth/GetStartedScreen";

interface AuthRouteProps {}

export type AuthStackParamList = {
  SignIn: undefined;
  SignUp: undefined;
  GetStarted: undefined;
};

const Stack = createStackNavigator<AuthStackParamList>();

export type AuthStackNavigationProp = StackNavigationProp<AuthStackParamList>;

export const AuthRoute: React.FC<AuthRouteProps> = () => {
  return (
    <Stack.Navigator initialRouteName="GetStarted">
      <Stack.Screen
        name="GetStarted"
        component={GetStartedScreen}
        options={{
          header: () => null,
        }}
      />
      <Stack.Screen
        name="SignIn"
        component={SignInScreen}
        options={{
          header: () => null,
        }}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUpScreen}
        options={{
          header: () => null,
        }}
      />
    </Stack.Navigator>
  );
};
