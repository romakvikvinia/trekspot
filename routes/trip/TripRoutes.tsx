import React from "react";
import {
  StackNavigationProp,
  createStackNavigator,
} from "@react-navigation/stack";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { TripScreen } from "../../screen/trip/TripScreen";
import { THeaderButton } from "../../common/ui/THeaderButton";
import { PrimaryColor } from "../../styles/colors";

interface TripRouteProps {}

type TripRouteStackParamList = {
  TripsScreen: undefined;
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
          // headerLeft: () => (
          //   <HeaderButtons HeaderButtonComponent={THeaderButton}>
          //     <Item
          //       title="UndoSignature"
          //       iconName="md-menu"
          //       color={PrimaryColor}
          //       onPress={navigation.toggleDrawer}
          //     />
          //   </HeaderButtons>
          // ),
        })}
      />
    </Stack.Navigator>
  );
};
