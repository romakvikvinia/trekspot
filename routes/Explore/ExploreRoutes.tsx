import React from "react";
import {
  StackNavigationProp,
  createStackNavigator,
} from "@react-navigation/stack";
import { ExploreScreen } from "../../screen/Explore/ExploreScreen";
import SeeAllScreen from "../../screen/Explore/BucketListAll";
import { CountryDetailModal } from "../../components/explore/destination/CountryDetailModal";
import { TripDetailScreen } from "../../screen/trip/TripDetailScreen";
import { TripInsightDetailScreen } from "../../screen/trip/TripInsightDetail";
import { TripInsights } from "../../screen/trip/TripInsights";

interface ExploreRoutesProps {}

export type ExploreRoutesStackParamList = {
  ExploreWorld: undefined;
  SeeAllScreen: undefined;
  CountryDetailScreen: undefined;
  TripQuickDetailScreen: undefined;
  TripQuickInsights: undefined
  TripQuickInsightsDetail: undefined
};

const Stack = createStackNavigator<ExploreRoutesStackParamList>();

export type ExploreRoutesStackNavigationProp =
  StackNavigationProp<ExploreRoutesStackParamList>;

export const ExploreRoutesStack: React.FC<ExploreRoutesProps> = ({}) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ExploreWorld"
        component={ExploreScreen}
        options={({ route, navigation }) => ({
          header: () => null,
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
      <Stack.Screen
        name="SeeAllScreen"
        component={SeeAllScreen}
        options={() => ({
          header: () => null,
        })}
      />
       <Stack.Screen
        name="TripQuickDetailScreen"
        component={TripDetailScreen}
        options={({ route, navigation }) => ({
          headerShown: false,
        })}
      />
       <Stack.Screen
        name="TripQuickInsights"
        component={TripInsights}
        options={({ route, navigation }) => ({
          headerShown: false,
        })}
      />
        <Stack.Screen
        name="TripQuickInsightsDetail"
        component={TripInsightDetailScreen}
        options={({ route, navigation }) => ({
          headerShown: false,
        })}
      />
       <Stack.Screen
        name="CountryDetailScreen"
        component={CountryDetailModal}
        options={() => ({
          header: () => null,
        })}
      />
    </Stack.Navigator>
  );
};
