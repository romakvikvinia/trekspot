import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { ImageBackground } from "react-native";
import { Host } from "react-native-portalize";

import {
  FlightIcon,
  HomeBold,
  MyWorldBold,
  SearchBoldIcon,
  SearchIcon,
  SettingsBold,
  SettingsLine,
  TopSights,
  TripBold,
} from "../utilities/SvgIcons.utility";

import { HomeRouteStack } from "./home/HomeRoutes";
import { SettingRouteStack } from "./setting/SettingRoutes";
import { TripRouteStack } from "./trip/TripRoutes";
import { MyWorldRouteStack } from "./world/MyWorldRoutes";
import { ExploreRoutesStack } from "./explore/ExploreRoutes";

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
              case "Insights": {
                return <HomeBold color={focused ? "#000" : "#8e8e8e"} />;
              }
              case "Been": {
                return <MyWorldBold color={focused ? "#000" : "#8e8e8e"} />;
              }
              case "Trips": {
                return <FlightIcon color={focused ? "#000" : "#8e8e8e"} />;
              }
              case "Explore": {
                return <SearchBoldIcon color={focused ? "#000" : "#8e8e8e"} />;
              }
              case "Account": {
                return (
                  <ImageBackground
                    resizeMode="cover"
                    style={{
                      width: 25,
                      borderRadius: 50,
                      overflow: "hidden",
                      height: 25,
                    }}
                    source={{
                      uri: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=10&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                    }}
                  />
                );
              }
            }
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
        <Tab.Screen name="Explore" component={ExploreRoutesStack} />
        <Tab.Screen name="Trips" component={TripRouteStack} />
        <Tab.Screen name="Been" component={MyWorldRouteStack} />
        <Tab.Screen name="Insights" component={HomeRouteStack} />
        <Tab.Screen name="Account" component={SettingRouteStack} />
      </Tab.Navigator>
    </Host>
  );
};
