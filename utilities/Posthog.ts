import Constants from 'expo-constants';
import PostHog from 'posthog-react-native';

export const posthogApiKey = "phc_2P2WPToXq0ZUrvtxynyL21hSdfYhBmxuoUMjFJZeIy0";

const isRunningInExpoGo = Constants.appOwnership === 'expo';

export const Events = {
    UseVisaCheckerFromToolkit: 'User used visa checker from toolkit',
    UseSeasonalExplorer: 'User used seasonal explorer',
    UseSearchExploreScreen: 'User used search on explore screen',
    UseCurrentTripExploreScreen: 'User used current trip on explore screen',
    UseWishlistExploreScreen: 'User used wishlist on explore screen',
    CreateNewTrip: 'User created new trip',
    CreateTripModalOpened: 'Create trip modal opened',
    CloseCreateTripModal: 'Close create trip modal',
    OpenTripDetailScreen: 'Open trip detail screen',
    UserChangedTripStyle: 'User changed trip style',
    UserUsesTripHelperEmergency: 'User uses trip helper emergency',
    UserUsesTriphelperInsights: 'User uses triphelper insights',
    UserUsesTriphelperApps: 'User uses triphelper apps',
    UserUsesTriphelperDishes: 'User uses triphelper dishes',
    UserUsesDirectionMaps: 'User uses direction maps',
    UserUsesVisited: 'User uses visited',
    UserUsesActivitySelectModal: 'User uses activity select modal',
    ContinueWithGuest: 'Continue with guest',
    ContinueWithGoogle: 'Continue with google',
    ContinueWithApple: 'Continue with apple',
    SignUp: 'Sign up',
    SignIn: 'Sign in',
    UserOpensShareStats: "User opens share stats",
    UserSharesStats: "User shares stats",
    UserOpensAddVisitModal: "User opens add visit modal",
    UserAddsVisits: "User adds visits",
  }

export const posthog = new PostHog(posthogApiKey, {
  host: 'https://app.posthog.com',
  enableSessionReplay: isRunningInExpoGo ? false : true,
  sessionReplayConfig: {
    maskAllTextInputs: false
  }
});
