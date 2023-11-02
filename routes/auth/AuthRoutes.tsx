import React from "react";
import {
  StackNavigationProp,
  createStackNavigator,
} from "@react-navigation/stack";
import { SignInScreen } from "../../screen/auth/SignInScreen";

interface AuthRouteProps {}

type AuthStackParamList = {
  SignIn: undefined;
};

const Stack = createStackNavigator<AuthStackParamList>();

export type AuthStackNavigationProp = StackNavigationProp<AuthStackParamList>;

export const AuthRoute: React.FC<AuthRouteProps> = ({}) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SignIn"
        component={SignInScreen}
        options={{
          header: () => null,
        }}
      />
    </Stack.Navigator>
  );
};
