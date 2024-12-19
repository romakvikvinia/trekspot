import {
  createStackNavigator,
  StackNavigationProp,
} from "@react-navigation/stack";
import React from "react";
import { Platform } from "react-native";

import { CityType } from "../../api/api.types";
import { ExploreScreen } from "../../screen/Explore/ExploreScreen";
import { SearchScreen } from "../../screen/Explore/SearchScreen";
import { SeasonalExplorerScreen } from "../../screen/Explore/SeasonalExplorerScreen";
import { VisaCheckerScreen } from "../../screen/Explore/VisaCheckerScreen";
import { WishlistScreen } from "../../screen/Explore/WishlistScreen";
import { TripInsights } from "../../screen/trip/TripInsights";
import { SIZES } from "../../styles/theme";

interface ExploreRoutesProps {}

export type ExploreRoutesStackParamList = {
  ExploreWorld: undefined;
  CountryDetailScreen: {
    countryId: string;
  };
  TripQuickDetailScreen: undefined;
  TripQuickInsights: undefined;
  CityDetail: {
    city: CityType;
  };
  Search: undefined;
  WishlistScreen: undefined;
  TripDetails: undefined,
  VisaCheckerScreen: undefined;
  SeasonalExplorerScreen: undefined;  
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
          name="VisaCheckerScreen"
          component={VisaCheckerScreen}
          options={() => ({
            header: () => null,
            gestureEnabled: Platform.OS === "ios",
            gestureResponseDistance:
              Platform.OS === "android" ? 10 : SIZES.width - 50,
          })}
        />
        <Stack.Screen
          name="SeasonalExplorerScreen"
          component={SeasonalExplorerScreen}
          options={() => ({
            header: () => null,
            gestureEnabled: Platform.OS === "ios",
            gestureResponseDistance:
              Platform.OS === "android" ? 10 : SIZES.width - 50,
          })}
        />
      <Stack.Screen
        name="Search"
        component={SearchScreen}
        options={() => ({
          header: () => null,
          gestureEnabled: Platform.OS === "ios",
          gestureResponseDistance:
            Platform.OS === "android" ? 10 : SIZES.width - 50,
        })}
      />
      <Stack.Screen
        name="WishlistScreen"
        component={WishlistScreen}
        options={() => ({
          header: () => null,
          gestureEnabled: Platform.OS === "ios",
          gestureResponseDistance:
            Platform.OS === "android" ? 10 : SIZES.width - 50,
        })}
      />
      
      {/* <Stack.Group
        screenOptions={{ presentation: "modal",   headerShown: true,
        headerLeft: () => null,
        headerTitle: "",
        headerRight: () => (
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{ paddingHorizontal: 15 }}
          >
            <Text>Close</Text>
          </TouchableOpacity>
        ),
      }}
      >
        <Stack.Screen name="TripDetails" component={TripDetailScreen} />
      </Stack.Group> */}
    </Stack.Navigator>
  );
};
