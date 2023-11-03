import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { PrimaryColor } from "../styles/colors";

import {
  HomeBold,
  HomeLine,
  MyWorldBold,
  MyWorldLine,
  SettingsBold,
  SettingsLine,
  TripBold,
  TripLine,
} from "../utilities/SvgIcons.utility";
import { HomeRouteStack } from "./home/HomeRoutes";
import { SettingRouteStack } from "./setting/SettingRoutes";
import { TripRouteStack } from "./trip/TripRoutes";
import { MyWorldRouteStack } from "./world/MyWorldRoutes";

const Tab = createBottomTabNavigator();

interface AppRouteProps {}

export const AppRoute: React.FC<AppRouteProps> = ({}) => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: PrimaryColor,
        tabBarLabelStyle: {
          //   fontFamily: "",
        },
        tabBarIcon: ({ focused }) => {
          switch (route.name) {
            case "Home": {
              return focused ? <HomeBold /> : <HomeLine />;
            }
            case "MyWorld": {
              return focused ? <MyWorldBold /> : <MyWorldLine />;
            }
            case "Trip": {
              return focused ? <TripBold /> : <TripLine />;
            }
            case "Settings": {
              return focused ? <SettingsBold /> : <SettingsLine />;
            }
          }
          // You can return any component that you like here!
        },
        // tabBarShowLabel: false,
        headerShown: false,
      })}
      initialRouteName="Home"
    >
      <Tab.Screen name="Home" component={HomeRouteStack} />
      <Tab.Screen name="MyWorld" component={MyWorldRouteStack} />
      <Tab.Screen name="Trip" component={TripRouteStack} />
      <Tab.Screen name="Settings" component={SettingRouteStack} />
    </Tab.Navigator>
  );
};
