import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Host } from "react-native-portalize";

import {
  HomeBold,
  MyWorldBold,
  SearchIcon,
  SettingsBold,
  SettingsLine,
  TopSights,
  TripBold,
} from "../utilities/SvgIcons.utility";
import { ExploreRoutesStack } from "./Explore/ExploreRoutes";
import { HomeRouteStack } from "./home/HomeRoutes";
import { SettingRouteStack } from "./setting/SettingRoutes";
import { TripRouteStack } from "./trip/TripRoutes";
import { MyWorldRouteStack } from "./world/MyWorldRoutes";

const Tab = createBottomTabNavigator();

interface AppRouteProps {}

export const AppRoute: React.FC<AppRouteProps> = ({}) => {
  return (
    <Host>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarActiveTintColor: "#000",
          tabBarLabelStyle: {
            fontSize: 10,
          },
          tabBarIcon: ({ focused }) => {
            switch (route.name) {
              case "Home": {
                return <HomeBold color={focused ? "#000" : "#8e8e8e"} />;
              }
              case "Been": {
                return <MyWorldBold color={focused ? "#000" : "#8e8e8e"} />;
              }
              case "Trips": {
                return <TripBold color={focused ? "#000" : "#8e8e8e"} />;
              }
              case "Explore": {
                return <SearchIcon color={focused ? "#000" : "#8e8e8e"} />;
              }
              case "Settings": {
                return <SettingsBold color={focused ? "#000" : "#8e8e8e"} />;
              }
            }
            // You can return any component that you like here!
          },
          // tabBarShowLabel: false,
          headerShown: false,
          tabBarStyle: {
            borderTopColor: "#f6f6f6",
            borderTopWidth: 1,
            paddingTop: 5,
            backgroundColor: "#fff",
          },
        })}
        initialRouteName="Home"
      >
        <Tab.Screen name="Home" component={HomeRouteStack} />
        <Tab.Screen name="Been" component={MyWorldRouteStack} />
        <Tab.Screen name="Explore" component={ExploreRoutesStack} />
        <Tab.Screen name="Trips" component={TripRouteStack} />
        <Tab.Screen name="Settings" component={SettingRouteStack} />
      </Tab.Navigator>
    </Host>
  );
};
