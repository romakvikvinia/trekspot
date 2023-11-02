import React from "react";
import {
  StackNavigationProp,
  createStackNavigator,
} from "@react-navigation/stack";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { HomeScreen } from "../../screen/home/HomeScreen";
import { PrimaryColor } from "../../styles/colors";
import { THeaderButton } from "../../common/ui/THeaderButton";
import { Host } from "react-native-portalize";

interface HomeRouteProps {}

type HomeRouteStackParamList = {
  Main: undefined;
};

const Stack = createStackNavigator<HomeRouteStackParamList>();

export type HomeRouteStackNavigationProp =
  StackNavigationProp<HomeRouteStackParamList>;

export const HomeRouteStack: React.FC<HomeRouteProps> = ({}) => {
  return (
    <Host>
      <Stack.Navigator
        screenOptions={{
          headerTitle: "Home",
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
          name="Main"
          component={HomeScreen}
          options={() => ({
            header: () => null,
          })}
        />
      </Stack.Navigator>
    </Host>
  );
};
