import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { ImageBackground } from "react-native";
import { Host } from "react-native-portalize";

import {
  FlightIcon,
  HomeBold,
  MyWorldBold,
  SearchBoldIcon,
  UserCircleBoldIcon,
} from "../utilities/SvgIcons.utility";
import { ExploreRoutesStack } from "./explore/ExploreRoutes";

import { HomeRouteStack } from "./home/HomeRoutes";
import { SettingRouteStack } from "./setting/SettingRoutes";
import { TripRouteStack } from "./trip/TripRoutes";
import { COLORS } from "../styles/theme";

const Tab = createBottomTabNavigator();

interface AppRouteProps {}

export const AppRoute: React.FC<AppRouteProps> = ({}) => {
  return (
    <Host>
      <Tab.Navigator
        screenOptions={({ route }: any) => ({
          tabBarActiveTintColor: COLORS.primary,
          keyboardHidesTabBar: true,
          tabBarLabelStyle: {
            fontSize: 10,
            fontWeight: "600",
          },
          tabBarIcon: ({ focused }: any) => {
            switch (route.name) {
              case "Insights": {
                return <HomeBold color={focused ? COLORS.primary : "#8e8e8e"} />;
              }
              case "Been": {
                return <MyWorldBold color={focused ? COLORS.primary : "#8e8e8e"} />;
              }
              case "Trips": {
                return <FlightIcon color={focused ? COLORS.primary : "#8e8e8e"} />;
              }
              case "Explore": {
                return <SearchBoldIcon color={focused ? COLORS.primary : "#8e8e8e"} />;
              }
              case "Account": {
                return false ? (
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
                ) : (
                  <UserCircleBoldIcon color={focused ? COLORS.primary : "#8e8e8e"} />
                );
              }
            }
          },
          // tabBarShowLabel: false,
          headerShown: false,
          tabBarStyle: {
            borderTopColor: "#eee",
            borderTopWidth: 1,
            // paddingTop: 5,
            backgroundColor: "#fff",
            height: 80
          },
        })}
        initialRouteName="Home"
      >
        <Tab.Screen name="Explore" component={ExploreRoutesStack} />
        <Tab.Screen name="Trips" component={TripRouteStack} />
        {/* <Tab.Screen name="Been" component={MyWorldRouteStack} /> */}
        <Tab.Screen name="Insights" component={HomeRouteStack} />
        <Tab.Screen name="Account" component={SettingRouteStack} />
      </Tab.Navigator>
    </Host>
  );
};
