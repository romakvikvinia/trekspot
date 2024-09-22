import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useTripStore = create(
  persist(
    set => ({
      onboardingSeen: false,
      tripStyle: false,
      setTripStyle: tripStyle => set({ tripStyle }),
      setOnboardingSeen: onboardingSeen => set({ onboardingSeen }),
    }),
    {
      name: 'trip-store',  
      getStorage: () => AsyncStorage,
    }
  )
);
