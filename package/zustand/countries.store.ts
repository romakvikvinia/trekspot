import { create } from "zustand";
import { CountryType } from "../../api/api.types";

interface CountriesState {
  countries: CountryType[];
  visitedCountries: Record<string, CountryType>;
  livedCountries: Record<string, CountryType>;
  setAllCountries: (countries: CountryType[]) => void;
  setVisitedCountries: (visitedCountries: Record<string, CountryType>) => void;
  toggleVisitedCountry: (country: CountryType) => void;
  toggleLivedCountry: (country: CountryType) => void;
}

export const useCountriesStore = create<CountriesState>()((set) => ({
  countries: [],
  visitedCountries: {},
  livedCountries: {},
  setVisitedCountries: (visitedCountries) =>
    set((state) => ({ ...state, visitedCountries })),
  setAllCountries: (countries) => set((state) => ({ ...state, countries })),
  toggleVisitedCountry: (country) =>
    set((state) => {
      const { visitedCountries } = state;

      if (country.id in visitedCountries) {
        delete visitedCountries[country.id];
      } else {
        visitedCountries[country.id] = country;
      }

      return { ...state, visitedCountries };
    }),
  toggleLivedCountry: (country) =>
    set((state) => {
      const { livedCountries } = state;

      if (country.id in livedCountries) {
        delete livedCountries[country.id];
      } else {
        livedCountries[country.id] = country;
      }

      return { ...state, livedCountries };
    }),

  //   increase: (by) => set((state) => ({ bears: state.bears + by })),
}));
