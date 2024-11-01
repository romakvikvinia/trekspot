import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export const useTripStore = create(
  persist(
    set => ({
      onboardingSeen: false,
      tripStyle: true,
      guestActivityCount: 0,
      isVisitedUsed: false,
      setTripStyle: tripStyle => set({ tripStyle }),
      setOnboardingSeen: onboardingSeen => set({ onboardingSeen }),
      setVisitedUsed: isVisitedUsed => set({ isVisitedUsed }),
      increaseGuestActivityCount: () =>
        set((state) => {
          return {
            ...state,
            guestActivityCount: state.guestActivityCount + 1
          };
        }),
    }),
    {
      name: 'trip-store',  
      storage: createJSONStorage(() => AsyncStorage)
    }
  )
);
