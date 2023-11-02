import React from "react";
import {
  StackNavigationProp,
  createStackNavigator,
} from "@react-navigation/stack";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import { SettingScreen } from "../../screen/setting/SettingScreen";
import { THeaderButton } from "../../common/ui/THeaderButton";
import { PrimaryColor } from "../../styles/colors";

interface SettingRouteProps {}

type SettingRouteStackParamList = {
  Setting: undefined;
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
          headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={THeaderButton}>
              <Item
                title="UndoSignature"
                iconName="md-menu"
                color={PrimaryColor}
                onPress={navigation.toggleDrawer}
              />
            </HeaderButtons>
          ),
        })}
      />
    </Stack.Navigator>
  );
};
