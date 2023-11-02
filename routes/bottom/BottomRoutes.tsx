import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Feather, Ionicons } from "@expo/vector-icons";
import { PrimaryColor } from "../../styles/colors";
import { HomeRouteStack } from "../home/HomeRoutes";
import { TripRouteStack } from "../trip/TripRoutes";
import { MyWorldRouteStack } from "../wolrd/MyWorldRoutes";
import { SettingRouteStack } from "../setting/SettingRoutes";
import {
  HomeBold,
  HomeLine,
  MyWorldBold,
  MyWorldLine,
  SettingsBold,
  SettingsLine,
  TripBold,
  TripLine,
} from "../../utilities/SvgIcons.utility";

const Tab = createBottomTabNavigator();

interface BottomProps {}

export const BottomRoutes: React.FC<BottomProps> = ({}) => {
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
