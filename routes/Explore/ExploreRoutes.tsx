import React from "react";
import {
  StackNavigationProp,
  createStackNavigator,
} from "@react-navigation/stack";
import { ExploreScreen } from "../../screen/Explore/ExploreScreen";
import SeeAllScreen from "../../screen/Explore/BucketListAll";
import { TripDetailScreen } from "../../screen/trip/TripDetailScreen";
import { TripInsightDetailScreen } from "../../screen/trip/TripInsightDetail";
import { TripInsights } from "../../screen/trip/TripInsights";
import { SIZES } from "../../styles/theme";
import { Platform } from "react-native";
import { CityDetail } from "../../components/explore/destination/CityDetail";
import { CountryDetailScreen } from "../../screen/Explore/Country/CountryDetailScreen";
import { Search } from "../../screen/Explore/Search";

interface ExploreRoutesProps {}

export type ExploreRoutesStackParamList = {
  ExploreWorld: undefined;
  SeeAllScreen: undefined;
  CountryDetailScreen: {
    countryId: string;
  };
  TripQuickDetailScreen: undefined;
  TripQuickInsights: undefined;
  TripQuickInsightsDetail: undefined;
  CityDetail: undefined;
  Search: undefined
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
          gestureEnabled: Platform.OS === "ios",
          gestureResponseDistance:
            Platform.OS === "android" ? 10 : SIZES.width - 50,
        })}
      />
      <Stack.Screen
        name="TripQuickDetailScreen"
        component={TripDetailScreen}
        options={({ route, navigation }) => ({
          headerShown: false,
          gestureEnabled: Platform.OS === "ios",
          gestureResponseDistance:
            Platform.OS === "android" ? 10 : SIZES.width - 50,
        })}
      />
      <Stack.Screen
        name="TripQuickInsights"
        component={TripInsights}
        options={({ route, navigation }) => ({
          headerShown: false,
          gestureEnabled: Platform.OS === "ios",
          gestureResponseDistance:
            Platform.OS === "android" ? 10 : SIZES.width - 50,
        })}
      />
      <Stack.Screen
        name="TripQuickInsightsDetail"
        component={TripInsightDetailScreen}
        options={({ route, navigation }) => ({
          headerShown: false,
          gestureEnabled: Platform.OS === "ios",
          gestureResponseDistance:
            Platform.OS === "android" ? 10 : SIZES.width - 50,
        })}
      />
      <Stack.Screen
        name="CountryDetailScreen"
        component={CountryDetailScreen}
        options={() => ({
          header: () => null,
          gestureEnabled: Platform.OS === "ios",
          gestureResponseDistance:
            Platform.OS === "android" ? 10 : SIZES.width - 50,
        })}
      />
      <Stack.Screen
        name="CityDetail"
        component={CityDetail}
        options={() => ({
          header: () => null,
          gestureEnabled: Platform.OS === "ios",
          gestureResponseDistance:
            Platform.OS === "android" ? 10 : SIZES.width - 50,
        })}
      />
      <Stack.Screen
        name="Search"
        component={Search}
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
