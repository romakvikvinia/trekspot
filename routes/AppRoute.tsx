import { createStackNavigator } from "@react-navigation/stack";
import { Platform } from "react-native";
import { Host } from "react-native-portalize";

import { RestaurantDetail } from "../components/City/RestaurantDetail";
import { CityDetailScreen } from "../screen/Explore/city/CityDetailScreen";
import { CountryDetailScreen } from "../screen/Explore/Country/CountryDetailScreen";
import { ActivityNoteOrDescription } from "../screen/trip/ActivityNoteOrDescription";
import { Dine } from "../screen/trip/AddActivities/Dine";
import { Events } from "../screen/trip/AddActivities/Events";
import { FlightDetails } from "../screen/trip/AddActivities/Flights/FlightDetails";
import { Flights } from "../screen/trip/AddActivities/Flights/Flights";
import { SearchAirport } from "../screen/trip/AddActivities/Flights/SearchAirport";
import { Activity } from "../screen/trip/AddActivities/General";
import { Lodging } from "../screen/trip/AddActivities/Lodging";
import { Meeting } from "../screen/trip/AddActivities/Meeting";
import { Rental } from "../screen/trip/AddActivities/Rental";
import { Route } from "../screen/trip/AddActivities/Route";
import { Tour } from "../screen/trip/AddActivities/Tour";
import { TransportRoute } from "../screen/trip/AddActivities/Transport";
import { AutocompletePlaces } from "../screen/trip/AutocompletePlaces";
import { InviteTripMember } from "../screen/trip/InviteTripMember";
import { TripDetailScreen } from "../screen/trip/TripDetailScreen";
import { TripDishes } from "../screen/trip/TripDishes";
import { TripEmergency } from "../screen/trip/TripEmergency";
import { TripInsights } from "../screen/trip/TripInsights";
import { TripSettings } from "../screen/trip/TripSettings";
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
        <Stack.Screen
          name="InviteTripMember"
          component={InviteTripMember}
          options={() => ({
            header: () => null,
            animationEnabled: true,
            gestureEnabled: Platform.OS === "ios",
            gestureResponseDistance:
              Platform.OS === "android" ? 10 : SIZES.width - 50,
          })}
        />
        <Stack.Screen
          name="TripSettings"
          component={TripSettings}
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
          <Stack.Screen
            name="AutocompletePlaces"
            component={AutocompletePlaces}
          />
          <Stack.Screen name="SearchAirport" component={SearchAirport} />
          <Stack.Screen
            name="ActivityNoteOrDescription"
            component={ActivityNoteOrDescription}
          />
          <Stack.Screen name="Route" component={Route} />
          <Stack.Screen name="TransportRoute" component={TransportRoute} />
          <Stack.Screen name="Tour" component={Tour} />
          <Stack.Screen name="Lodging" component={Lodging} />
          <Stack.Screen name="Dine" component={Dine} />
          <Stack.Screen name="Meeting" component={Meeting} />
          <Stack.Screen name="Events" component={Events} />
          <Stack.Screen name="Activity" component={Activity} />
          <Stack.Screen name="Rental" component={Rental} />
          <Stack.Screen name="RestaurantDetail" component={RestaurantDetail} />
        </Stack.Group>

        <Stack.Screen
          name="FlightDetailsScreen"
          options={() => ({
            header: () => null,
            animationEnabled: true,
            gestureEnabled: Platform.OS === "ios",
            gestureResponseDistance:
              Platform.OS === "android" ? 10 : SIZES.width - 50,
          })}
          component={FlightDetails}
        />

        <Stack.Screen
          name="RouteScreen"
          options={() => ({
            header: () => null,
            animationEnabled: true,
            gestureEnabled: Platform.OS === "ios",
            gestureResponseDistance:
              Platform.OS === "android" ? 10 : SIZES.width - 50,
          })}
          component={Route}
        />
        <Stack.Screen
          name="TransportRouteScreen"
          options={() => ({
            header: () => null,
            animationEnabled: true,
            gestureEnabled: Platform.OS === "ios",
            gestureResponseDistance:
              Platform.OS === "android" ? 10 : SIZES.width - 50,
          })}
          component={TransportRoute}
        />
        <Stack.Screen
          name="TourScreen"
          options={() => ({
            header: () => null,
            animationEnabled: true,
            gestureEnabled: Platform.OS === "ios",
            gestureResponseDistance:
              Platform.OS === "android" ? 10 : SIZES.width - 50,
          })}
          component={Tour}
        />
        <Stack.Screen
          name="LodgingScreen"
          options={() => ({
            header: () => null,
            animationEnabled: true,
            gestureEnabled: Platform.OS === "ios",
            gestureResponseDistance:
              Platform.OS === "android" ? 10 : SIZES.width - 50,
          })}
          component={Lodging}
        />
        <Stack.Screen
          name="DineScreen"
          options={() => ({
            header: () => null,
            animationEnabled: true,
            gestureEnabled: Platform.OS === "ios",
            gestureResponseDistance:
              Platform.OS === "android" ? 10 : SIZES.width - 50,
          })}
          component={Dine}
        />
        <Stack.Screen
          name="MeetingScreen"
          options={() => ({
            header: () => null,
            animationEnabled: true,
            gestureEnabled: Platform.OS === "ios",
            gestureResponseDistance:
              Platform.OS === "android" ? 10 : SIZES.width - 50,
          })}
          component={Meeting}
        />
        <Stack.Screen
          name="EventsScreen"
          options={() => ({
            header: () => null,
            animationEnabled: true,
            gestureEnabled: Platform.OS === "ios",
            gestureResponseDistance:
              Platform.OS === "android" ? 10 : SIZES.width - 50,
          })}
          component={Events}
        />
        <Stack.Screen
          name="ActivityScreen"
          options={() => ({
            header: () => null,
            animationEnabled: true,
            gestureEnabled: Platform.OS === "ios",
            gestureResponseDistance:
              Platform.OS === "android" ? 10 : SIZES.width - 50,
          })}
          component={Activity}
        />
        <Stack.Screen
          name="RentalScreen"
          options={() => ({
            header: () => null,
            animationEnabled: true,
            gestureEnabled: Platform.OS === "ios",
            gestureResponseDistance:
              Platform.OS === "android" ? 10 : SIZES.width - 50,
          })}
          component={Rental}
        />
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
