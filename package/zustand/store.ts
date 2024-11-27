import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export const useTripStore = create(
  persist(
    (set) => ({
      onboardingSeen: false,
      tripStyle: false,
      guestActivityCount: 0,
      isVisitedUsed: false,
      setTripStyle: (tripStyle: boolean) => set({ tripStyle }),
      setOnboardingSeen: (onboardingSeen: boolean) => set({ onboardingSeen }),
      setVisitedUsed: (isVisitedUsed: boolean) => set({ isVisitedUsed }),
      increaseGuestActivityCount: () =>
        set((state: any) => {
          return {
            ...state,
            guestActivityCount: state.guestActivityCount + 1,
          };
        }),
    }),
    {
      name: "trekspot-trip-store",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
