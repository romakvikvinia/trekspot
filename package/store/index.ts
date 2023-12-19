import { create } from "zustand";

type State = {
  visited_countries: string[];
  lived_countries: string[];
};

type Action = {
  updateVisitedCountries: (code: string) => void;
};

// Create your store, which includes both state and (optionally) actions
export const useVisitedOrLivedCountries = create<State & Action>((set) => ({
  visited_countries: [],
  lived_countries: [],
  updateVisitedCountries: (code: string) =>
    set((state) => ({
      visited_countries: state.visited_countries.includes(code)
        ? state.visited_countries.filter((i) => i !== code)
        : [...state.visited_countries, code],
    })),
}));
