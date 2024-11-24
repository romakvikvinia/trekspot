import Constants from 'expo-constants';
import PostHog from 'posthog-react-native';

export const posthogApiKey = "phc_2P2WPToXq0ZUrvtxynyL21hSdfYhBmxuoUMjFJZeIy0";

const isRunningInExpoGo = Constants.appOwnership === 'expo';

export const Events = {
    WorkoutStarted: 'Workout started',
    WorkoutDiscarded: 'Workout discarded',
    WorkoutRepeated: 'Workout repeated',
    WorkoutFinishPressed: 'Workout finish pressed',
    WorkoutModalClosed: 'Workout modal closed',
    DescriptionMissing: 'Description missing',
    ExerciseAdded: 'Exercise added',
    ExerciseDeleted: 'Exercise deleted',
    ExerciseAddModalOpened: 'Exercise add modal opened',
    ExerciseSelectReset: 'Exercise select reset',
    SetAdded: 'Set added',
    SetDeleted: 'Set deleted',
    SetUpdated: 'Set updated',
    CategorySelected: 'Category selected',
    FavouriteAdded: 'Favourite added',
    FavouriteRemoved: 'Favourite removed',
    ExerciseSelectStartWorkout: 'Exercise select start workout',
    SignInEmailPressed: 'signin:email:pressed',
    SignInOtpPressed: 'signin:otp:pressed',
  }

export const posthog = new PostHog(posthogApiKey, {
  host: 'https://app.posthog.com',
  enableSessionReplay: isRunningInExpoGo ? false : true,
  sessionReplayConfig: {
    maskAllTextInputs: false
  }
});
