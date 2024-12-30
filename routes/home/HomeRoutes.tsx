import {
  createStackNavigator,
  StackNavigationProp,
} from "@react-navigation/stack";
import React from "react";

import { HomeScreen } from "../../screen/home/HomeScreen";
import { PrimaryColor } from "../../styles/colors";

interface HomeRouteProps {}

export type HomeRouteStackParamList = {
  Main: undefined;
  ShareStats: undefined;
};

const Stack = createStackNavigator<HomeRouteStackParamList>();

export type HomeRouteStackNavigationProp =
  StackNavigationProp<HomeRouteStackParamList>;

export const HomeRouteStack: React.FC<HomeRouteProps> = ({}) => {
  return (
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
  );
};
