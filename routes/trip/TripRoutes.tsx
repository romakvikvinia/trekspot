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

interface TripRouteProps {}

type TripRouteStackParamList = {
  TripsScreen: undefined;
  TripDetailScreen: undefined;
  TripInsights: undefined;
  TripInsightDetailScreen: undefined;
  TripMapViewScreen: undefined;
  NewTripAndroidScreen: undefined
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
          gestureResponseDistance: SIZES.width - 50
        })}
      />
      <Stack.Screen
        name="TripInsights"
        component={TripInsights}
        options={({ route, navigation }) => ({
          headerShown: false,
          gestureEnabled: true,
          gestureResponseDistance: SIZES.width - 50
        })}
      />
      <Stack.Screen
        name="TripInsightDetailScreen"
        component={TripInsightDetailScreen}
        options={({ route, navigation }) => ({
          headerShown: false,
          gestureEnabled: true,
          gestureResponseDistance: SIZES.width - 50, 
        })}
      />
      <Stack.Screen
        name="TripMapViewScreen"
        component={TripMapViewScreen}
        options={({ route, navigation }) => ({
          headerShown: false,
          gestureEnabled: true,
          gestureResponseDistance: SIZES.width - 50,
        })}
      />
    </Stack.Navigator>
  );
};
