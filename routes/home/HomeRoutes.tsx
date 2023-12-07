import React from "react";
import {
  StackNavigationProp,
  createStackNavigator,
} from "@react-navigation/stack";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { HomeScreen } from "../../screen/home/HomeScreen";
import { PrimaryColor } from "../../styles/colors";
import { THeaderButton } from "../../common/ui/THeaderButton";
import BucketList from "../../screen/BucketList";
import BucketListAllScreen from "../../screen/BucketList/BucketListAll";
import ShareStats from "../../screen/Share";

interface HomeRouteProps {}

type HomeRouteStackParamList = {
  Main: undefined;
  BucketList: undefined;
  BucketListAll: undefined;
  Share: undefined;
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

      <Stack.Screen
        name="ShareStats"
        component={ShareStats}
        options={() => ({
          header: () => null,
        })}
      />
    </Stack.Navigator>
  );
};
