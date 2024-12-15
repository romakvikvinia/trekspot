import React from "react";
import {
  StackNavigationProp,
  createStackNavigator,
} from "@react-navigation/stack";
import { TripScreen } from "../../screen/trip/TripScreen";
 
interface TripRouteProps {}

export type TripRouteStackParamList = {
  TripsScreen: undefined;
  TripInsightDetailScreen: undefined;
  // TripMapViewScreen: undefined;
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
      {/* <Stack.Screen
        name="TripMapViewScreen"
        component={TripMapViewScreen}
        options={({ route, navigation }) => ({
          headerShown: false,
          gestureEnabled: true,
          gestureResponseDistance:
            Platform.OS === "android" ? 10 : SIZES.width - 50,
        })}
      /> */}
   
      {/* <Stack.Group
        screenOptions={{ presentation: "modal", headerShown: false }}
      > */}

      {/* </Stack.Group> */}
      {/* <Stack.Screen
        name="TripActivityReview"
        component={TripActivityReview}
        options={() => ({
          header: () => null,
          gestureEnabled: Platform.OS === "ios",
          gestureResponseDistance:
            Platform.OS === "android" ? 10 : SIZES.width - 50,
        })}
      /> */}
    </Stack.Navigator>
  );
};
