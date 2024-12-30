import {
  createStackNavigator,
  StackNavigationProp,
} from "@react-navigation/stack";
import React from "react";
import { Platform } from "react-native";

import { EditProfile } from "../../screen/setting/EditProfile";
import { ResetPassword } from "../../screen/setting/ResetPassword";
import { SettingScreen } from "../../screen/setting/SettingScreen";
import { PrimaryColor } from "../../styles/colors";
import { SIZES } from "../../styles/theme";

interface SettingRouteProps {}

export type SettingRouteStackParamList = {
  Setting: undefined;
  EditProfile: undefined;
  ResetPasswordScreen: undefined;
  PasswordUpdate: undefined;
};

const Stack = createStackNavigator<SettingRouteStackParamList>();

export type SettingRouteStackNavigationProp =
  StackNavigationProp<SettingRouteStackParamList>;

export const SettingRouteStack: React.FC<SettingRouteProps> = ({}) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitle: "Settings",
        headerTintColor: PrimaryColor,
        headerTitleStyle: {
          // fontFamily: "",
        },
        cardStyle: {
          backgroundColor: "#f5f6f8",
        },
      }}
    >
      <Stack.Screen
        name="Setting"
        component={SettingScreen}
        options={({ route, navigation }) => ({
          headerShown: false,
          gestureEnabled: true,
          gestureResponseDistance:
            Platform.OS === "android" ? 10 : SIZES.width - 50,
        })}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfile}
        options={({ route, navigation }) => ({
          headerShown: false,
          gestureEnabled: true,
          gestureResponseDistance:
            Platform.OS === "android" ? 10 : SIZES.width - 50,
        })}
      />
      <Stack.Screen
        name="ResetPasswordScreen"
        component={ResetPassword}
        options={({ route, navigation }) => ({
          headerShown: false,
          gestureEnabled: true,
          gestureResponseDistance:
            Platform.OS === "android" ? 10 : SIZES.width - 50,
        })}
      />
    </Stack.Navigator>
  );
};
