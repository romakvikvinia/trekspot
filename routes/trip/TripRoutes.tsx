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
import { TripActivityReview } from "../../screen/trip/TripActivityReview";

interface TripRouteProps {}

export type TripRouteStackParamList = {
  TripsScreen: undefined;
  TripDetailScreen: {
    trip: TripType;
    city: CityType;
    needResetStack?: boolean;
  };
  TripInsights: undefined;
  TripInsightDetailScreen: undefined;
  TripMapViewScreen: undefined;
  NewTripAndroidScreen: undefined;
  TripFAQ: undefined;
  TripDishes: undefined;
  TripTransport: { iso2: string };
  TripEmergency: { iso2: string };
  TripActivityReview: undefined;
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

      {/* <Stack.Group
        screenOptions={{ presentation: "modal", headerShown: false }}
      > */}

      {/* </Stack.Group> */}
      <Stack.Screen
        name="TripActivityReview"
        component={TripActivityReview}
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
