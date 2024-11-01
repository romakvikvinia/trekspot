import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { WishlistType } from "../../api/api.types";

type initialStateType = {
  wishlists: WishlistType[];
};

const initialState: initialStateType = {
  wishlists: [],
};

const slice = createSlice({
  name: "countries",
  initialState,
  reducers: {
    resetAllCountries: () => initialState,
    setAllCountries: (state, { payload }: PayloadAction<WishlistType[]>) => {
      state.wishlists = payload;
    },
  },
});

export const { resetAllCountries, setAllCountries } = slice.actions;
export default slice.reducer;
