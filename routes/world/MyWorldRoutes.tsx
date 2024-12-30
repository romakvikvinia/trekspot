import {
  createStackNavigator,
  StackNavigationProp,
} from "@react-navigation/stack";
import React from "react";

import MyWorldScreen from "../../screen/world/MyWorldScreen";

interface MyWorldRouteProps {}

export type MyWorldRouteStackParamList = {
  World: undefined;
};

const Stack = createStackNavigator<MyWorldRouteStackParamList>();

export type MyWorldRouteStackNavigationProp =
  StackNavigationProp<MyWorldRouteStackParamList>;

export const MyWorldRouteStack: React.FC<MyWorldRouteProps> = ({}) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="World"
        component={MyWorldScreen}
        options={({ route, navigation }) => ({
          header: () => null,
        })}
      />
    </Stack.Navigator>
  );
};
