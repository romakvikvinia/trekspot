import React from "react";
import {
  StackNavigationProp,
  createStackNavigator,
} from "@react-navigation/stack";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import { SettingScreen } from "../../screen/setting/SettingScreen";
import { THeaderButton } from "../../common/ui/THeaderButton";
import { PrimaryColor } from "../../styles/colors";
import { EditoProfile } from "../../screen/setting/EditProfile";
import { ResetPassword } from "../../screen/setting/ResetPassword";
import { SIZES } from "../../styles/theme";

interface SettingRouteProps {}

type SettingRouteStackParamList = {
  Setting: undefined;
  EditProfile: undefined;
  ResetPasswordScreen: undefined;
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
          gestureResponseDistance: SIZES.width - 50
        })}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditoProfile}
        options={({ route, navigation }) => ({
          headerShown: false,
          gestureEnabled: true,
          gestureResponseDistance: SIZES.width - 50
        })}
      />
      <Stack.Screen
        name="ResetPasswordScreen"
        component={ResetPassword}
        options={({ route, navigation }) => ({
          headerShown: false,
          gestureEnabled: true,
          gestureResponseDistance: SIZES.width - 50
        })}
      />
    </Stack.Navigator>
  );
};
