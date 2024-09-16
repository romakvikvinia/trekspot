import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useTripStore = create(
  persist(
    set => ({
      tripStyle: false,
      setTripStyle: tripStyle => set({ tripStyle }),
    }),
    {
      name: 'trip-store',  
      getStorage: () => AsyncStorage,
    }
  )
);
