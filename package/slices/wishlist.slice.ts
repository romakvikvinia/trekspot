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
  name: "wishlist",
  initialState,
  reducers: {
    resetWishlists: () => initialState,
    setWishlists: (state, { payload }: PayloadAction<WishlistType[]>) => {
      state.wishlists = payload;
    },
    toggleWishlistItem: (state, { payload }: PayloadAction<WishlistType>) => {
      if (
        state.wishlists.some(
          (i) =>
            (payload.city && i.city.id === payload.city.id) ||
            (payload.sight && i.sight.id === payload.sight.id)
        )
      ) {
        state.wishlists = state.wishlists.filter(
          (i) =>
            (payload.city && i.city.id === payload.city.id) ||
            (payload.sight && i.sight.id === payload.sight.id)
        );
      } else {
        state.wishlists.push(payload);
      }
    },
    addItemIntoWishlist: (state, { payload }: PayloadAction<WishlistType>) => {
      state.wishlists.push(payload);
    },
    removeItemFromWishlist: (
      state,
      { payload }: PayloadAction<WishlistType>
    ) => {
      state.wishlists = state.wishlists.filter((i) => {
        if (payload.city && i.city) {
          return i.city.id !== payload.city.id;
        }
        if (payload.sight && i.sight) {
          return i.sight.id !== payload.sight.id;
        }
        return true; // Keep item if no match
      });
    },
  },
});

export const {
  resetWishlists,
  setWishlists,
  toggleWishlistItem,
  addItemIntoWishlist,
  removeItemFromWishlist,
} = slice.actions;
export default slice.reducer;
