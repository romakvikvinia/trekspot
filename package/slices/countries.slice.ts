import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { CountryType } from "../../api/api.types";

type initialStateType = {
  countries: CountryType[];
  visitedCountries: Record<string, CountryType>;
  livedCountries: Record<string, CountryType>;
};

const initialState: initialStateType = {
  countries: [],
  visitedCountries: {},
  livedCountries: {},
};

const slice = createSlice({
  name: "countries",
  initialState,
  reducers: {
    resetAllCountries: () => initialState,
    setAllCountries: (state, { payload }: PayloadAction<CountryType[]>) => {
      state.countries = payload;
    },
    toggleVisitedCountry: (state, { payload }: PayloadAction<CountryType>) => {
      if (payload.id in state.visitedCountries) {
        delete state.visitedCountries[payload.id];
      } else {
        state.visitedCountries[payload.id] = payload;
      }
    },
    toggleLivedCountry: (state, { payload }: PayloadAction<CountryType>) => {
      if (payload.id in state.livedCountries) {
        delete state.livedCountries[payload.id];
      } else {
        state.livedCountries[payload.id] = payload;
      }
    },
    setVisitedCountries: (
      state,
      { payload }: PayloadAction<Record<string, CountryType>>
    ) => {
      state.visitedCountries = payload;
    },
  },
});

export const {
  resetAllCountries,
  setAllCountries,
  toggleVisitedCountry,
  toggleLivedCountry,
  setVisitedCountries,
} = slice.actions;
export default slice.reducer;
