import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { ImageBackground, Platform } from "react-native";

import { useAppSelector } from "../package/store";
import { COLORS } from "../styles/theme";
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

const Tab = createBottomTabNavigator();

interface AppRouteProps {}

export const TabNavigator: React.FC<AppRouteProps> = ({}) => {
  const { user } = useAppSelector((state) => state.auth);

  return (
    <Tab.Navigator
      screenOptions={({ route }: any) => ({
        tabBarActiveTintColor: COLORS.primary,
        keyboardHidesTabBar: true,
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: "600",
          paddingBottom: 10,
        },
        tabBarIcon: ({ focused }: any) => {
          switch (route.name) {
            case "Insights": {
              return <HomeBold color={focused ? COLORS.primary : "#8e8e8e"} />;
            }
            case "Been": {
              return (
                <MyWorldBold color={focused ? COLORS.primary : "#8e8e8e"} />
              );
            }
            case "Trips": {
              return (
                <FlightIcon color={focused ? COLORS.primary : "#8e8e8e"} />
              );
            }
            case "Explore": {
              return (
                <SearchBoldIcon color={focused ? COLORS.primary : "#8e8e8e"} />
              );
            }
            case "Account": {
              return user?.image ? (
                <ImageBackground
                  resizeMode="cover"
                  style={{
                    width: 25,
                    borderRadius: 50,
                    overflow: "hidden",
                    height: 25,
                  }}
                  source={{
                    uri: user?.image,
                  }}
                />
              ) : (
                <UserCircleBoldIcon
                  color={focused ? COLORS.primary : "#8e8e8e"}
                />
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
          height: Platform.OS === "android" ? 65 : 95,
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
  );
};
