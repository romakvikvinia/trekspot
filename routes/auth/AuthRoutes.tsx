import React, { useEffect } from "react";
import {
  StackNavigationProp,
  createStackNavigator,
} from "@react-navigation/stack";
import { SignInScreen } from "../../screen/auth/SignInScreen";
import { SignUpScreen } from "../../screen/auth/SignUpScreen";
import { GetStartedScreen } from "../../screen/auth/GetStartedScreen";
import { ResetPasswordScreen } from "../../screen/auth/ResetPassword";
import { useNavigation } from "@react-navigation/native";
import { SIZES } from "../../styles/theme";

interface AuthRouteProps {}

export type AuthStackParamList = {
  SignIn: undefined;
  SignUp: undefined;
  GetStarted: undefined;
  ResetPassword: undefined;
};

const Stack = createStackNavigator<AuthStackParamList>();

export type AuthStackNavigationProp = StackNavigationProp<AuthStackParamList>;

export const AuthRoute: React.FC<AuthRouteProps> = () => {
  const navigation = useNavigation<AuthStackNavigationProp>();

  useEffect(() => {
    navigation.navigate("GetStarted");
  }, []);

  return (
    <Stack.Navigator initialRouteName="SignIn">
      <Stack.Screen
        name="SignIn"
        component={SignInScreen}
        options={{
          header: () => null,
          gestureEnabled: true,
          gestureResponseDistance: SIZES.width - 50, 
        }}
      />
      <Stack.Group
        screenOptions={{ presentation: "modal", headerShown: false }}
      >
        <Stack.Screen name="GetStarted" component={GetStartedScreen} />
      </Stack.Group>
      <Stack.Screen
        name="SignUp"
        component={SignUpScreen}
        options={{
          header: () => null,
          gestureEnabled: true,
          gestureResponseDistance: SIZES.width - 50, 
        }}
      />
      <Stack.Screen
        name="ResetPassword"
        component={ResetPasswordScreen}
        options={{
          header: () => null,
          gestureEnabled: true,
          gestureResponseDistance: SIZES.width - 50, 
        }}
      />
    </Stack.Navigator>
  );
};
