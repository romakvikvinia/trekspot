import React from "react";
import {
  StackNavigationProp,
  createStackNavigator,
} from "@react-navigation/stack";
import { TripScreen } from "../../screen/trip/TripScreen";
import { TripDetailScreen } from "../../screen/trip/TripDetailScreen";
import { TripInsights } from "../../screen/trip/TripInsights";
import { TripInsightDetailScreen } from "../../screen/trip/TripInsightDetail";
import { TripMapViewScreen } from "../../screen/trip/TripMapView";
import { NewTripAndroid } from "../../screen/trip/NewTripAndroid";
import { SIZES } from "../../styles/theme";
import { Platform } from "react-native";
import { TripFAQ } from "../../screen/trip/TripFAQ";
import { TripDishes } from "../../screen/trip/TripDishes";
import { TripTransport } from "../../screen/trip/TripTransport";
import { TripEmergency } from "../../screen/trip/TripEmergency";
import { CityType, TripType } from "../../api/api.types";

interface TripRouteProps {}

export type TripRouteStackParamList = {
  TripsScreen: undefined;
  TripDetailScreen: {
    trip: TripType;
    city: CityType;
  };
  TripInsights: undefined;
  TripInsightDetailScreen: undefined;
  TripMapViewScreen: undefined;
  NewTripAndroidScreen: undefined;
  TripFAQ: undefined;
  TripDishes: undefined;
  TripTransport: undefined;
  TripTransportation: undefined;
};

const Stack = createStackNavigator<TripRouteStackParamList>();

export type TripRouteStackNavigationProp =
  StackNavigationProp<TripRouteStackParamList>;

export const TripRouteStack: React.FC<TripRouteProps> = ({}) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="TripsScreen"
        component={TripScreen}
        options={({ route, navigation }) => ({
          headerShown: false,
        })}
      />
      <Stack.Screen
        name="NewTripAndroidScreen"
        component={NewTripAndroid}
        options={({ route, navigation }) => ({
          headerShown: false,
        })}
      />

      <Stack.Screen
        name="TripDetailScreen"
        component={TripDetailScreen}
        options={({ route, navigation }) => ({
          headerShown: false,
          gestureEnabled: true,
          gestureResponseDistance:
            Platform.OS === "android" ? 10 : SIZES.width - 50,
        })}
      />
      <Stack.Screen
        name="TripInsights"
        component={TripInsights}
        options={({ route, navigation }) => ({
          headerShown: false,
          gestureEnabled: true,
          gestureResponseDistance:
            Platform.OS === "android" ? 10 : SIZES.width - 50,
        })}
      />
      <Stack.Screen
        name="TripInsightDetailScreen"
        component={TripInsightDetailScreen}
        options={({ route, navigation }) => ({
          headerShown: false,
          gestureEnabled: true,
          gestureResponseDistance:
            Platform.OS === "android" ? 10 : SIZES.width - 50,
        })}
      />
      <Stack.Screen
        name="TripMapViewScreen"
        component={TripMapViewScreen}
        options={({ route, navigation }) => ({
          headerShown: false,
          gestureEnabled: true,
          gestureResponseDistance:
            Platform.OS === "android" ? 10 : SIZES.width - 50,
        })}
      />
      <Stack.Screen
        name="TripFAQ"
        component={TripFAQ}
        options={() => ({
          header: () => null,
          gestureEnabled: Platform.OS === "ios",
          gestureResponseDistance:
            Platform.OS === "android" ? 10 : SIZES.width - 50,
        })}
      />
      <Stack.Screen
        name="TripDishes"
        component={TripDishes}
        options={() => ({
          header: () => null,
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
          gestureEnabled: Platform.OS === "ios",
          gestureResponseDistance:
            Platform.OS === "android" ? 10 : SIZES.width - 50,
        })}
      />
      <Stack.Screen
        name="TripTransportation"
        component={TripEmergency}
        options={() => ({
          header: () => null,
          gestureEnabled: Platform.OS === "ios",
          gestureResponseDistance:
            Platform.OS === "android" ? 10 : SIZES.width - 50,
        })}
      />
    </Stack.Navigator>
  );
};
