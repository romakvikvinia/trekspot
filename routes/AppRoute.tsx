import { createStackNavigator } from "@react-navigation/stack";
import { Platform } from "react-native";
import { Host } from "react-native-portalize";

import { CityDetailScreen } from "../screen/Explore/city/CityDetailScreen";
import { CountryDetailScreen } from "../screen/Explore/Country/CountryDetailScreen";
import { FlightDetails } from "../screen/trip/AddActivities/Flights/FlightDetails";
import { Flights } from "../screen/trip/AddActivities/Flights/Flights";
import { TripDetailScreen } from "../screen/trip/TripDetailScreen";
import { TripDishes } from "../screen/trip/TripDishes";
import { TripEmergency } from "../screen/trip/TripEmergency";
import { TripInsights } from "../screen/trip/TripInsights";
import { TripTransport } from "../screen/trip/TripTransport";
import { SIZES } from "../styles/theme";
import { TabNavigator } from "./TabNavigator";

const Stack = createStackNavigator();
 
const AppRoute = () => {
  return (
    <Host>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          animationEnabled: false,
        }}
        initialRouteName="Tabs"
      >
        <Stack.Screen
          name="Tabs"
          options={{
            gestureEnabled: true,
            gestureResponseDistance:
              Platform.OS === "android" ? 5 : SIZES.width - 50,
          }}
          component={TabNavigator}
        />

        <Stack.Screen
          name="TripDetailScreen"
          component={TripDetailScreen}
          options={({ route, navigation }) => ({
            animationEnabled: true,
            headerShown: false,
            gestureEnabled: true,
          })}
        />
        <Stack.Screen
          name="CountryDetailScreen"
          component={CountryDetailScreen}
          options={() => ({
            header: () => null,
            animationEnabled: true,
            gestureEnabled: Platform.OS === "ios",
            gestureResponseDistance:
              Platform.OS === "android" ? 10 : SIZES.width - 50,
          })}
        />
        <Stack.Screen
          name="CityDetail"
          component={CityDetailScreen}
          options={() => ({
            header: () => null,
            animationEnabled: true,
            gestureEnabled: Platform.OS === "ios",
            gestureResponseDistance:
              Platform.OS === "android" ? 10 : SIZES.width - 50,
          })}
        />
        <Stack.Screen
          name="TripTransport"
          component={TripTransport}
          options={() => ({
            header: () => null,
            animationEnabled: true,
            gestureEnabled: Platform.OS === "ios",
            gestureResponseDistance:
              Platform.OS === "android" ? 10 : SIZES.width - 50,
          })}
        />
        <Stack.Screen
          name="TripEmergency"
          component={TripEmergency}
          options={() => ({
            header: () => null,
            animationEnabled: true,
            gestureEnabled: Platform.OS === "ios",
            gestureResponseDistance:
              Platform.OS === "android" ? 10 : SIZES.width - 50,
          })}
        />
        <Stack.Screen
          name="TripInsights"
          component={TripInsights}
          options={({ route, navigation }) => ({
            headerShown: false,
            animationEnabled: true,
            gestureEnabled: true,
            gestureResponseDistance:
              Platform.OS === "android" ? 10 : SIZES.width - 50,
          })}
        />
        <Stack.Screen
          name="TripDishes"
          component={TripDishes}
          options={() => ({
            header: () => null,
            animationEnabled: true,
            gestureEnabled: Platform.OS === "ios",
            gestureResponseDistance:
              Platform.OS === "android" ? 10 : SIZES.width - 50,
          })}
        />
        <Stack.Group
          screenOptions={{
            presentation: "modal",
            headerShown: false,
            headerLeft: () => null,
            headerTitle: "",
            headerRight: () => null,
            animationEnabled: true,
           }}
        >
          <Stack.Screen name="Flights" component={Flights} />
          <Stack.Screen name="FlightDetails" component={FlightDetails} />
        </Stack.Group>
     

        {/* <Stack.Screen
          name="Onboarding"
          component={OnboardingView}
          options={{ animationEnabled: true, gestureEnabled: true,  gestureResponseDistance: Platform.OS === "android" ? 5 : SIZES.width - 50, }}
        /> */}
      </Stack.Navigator>
    </Host>
  );
};
export default AppRoute;
