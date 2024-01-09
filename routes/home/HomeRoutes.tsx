import React from "react";
import {
  StackNavigationProp,
  createStackNavigator,
} from "@react-navigation/stack";
import { HomeScreen } from "../../screen/home/HomeScreen";
import { PrimaryColor } from "../../styles/colors";
import BucketList from "../../screen/BucketList";
import BucketListAllScreen from "../../screen/BucketList/BucketListAll";

interface HomeRouteProps {}

export type HomeRouteStackParamList = {
  Main: undefined;
  BucketList: undefined;
  BucketListAll: undefined;
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
      <Stack.Screen
        name="BucketList"
        component={BucketList}
        options={() => ({
          header: () => null,
        })}
      />
      <Stack.Screen
        name="BucketListAll"
        component={BucketListAllScreen}
        options={() => ({
          header: () => null,
        })}
      />
    </Stack.Navigator>
  );
};
