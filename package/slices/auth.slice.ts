import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { UserType } from "../../api/api.types";

type initialStateType = {
  user: null | UserType;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  expire: number | null;
  refresh_token: string | null;
};

const initialState: initialStateType = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
  expire: null,
  refresh_token: null,
};

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signOut: () => initialState,
    updateUser: (state, { payload }: PayloadAction<{ user: UserType }>) => {
      state.user = payload.user;
    },
    signIn: (
      state,
      {
        payload,
      }: PayloadAction<{ token: string; expire: number; user: UserType }>
    ) => {
      console.log("state change", payload);
      state.isAuthenticated = true;
      state.isLoading = false;
      state.token = payload.token;
      state.user = payload.user;
    },
    refreshToken: (state, { payload }: PayloadAction<{ token: string }>) => {
      state.isLoading = false;
      state.isAuthenticated = true;
      state.token = payload.token;
    },
  },
});

export const { signOut, signIn, refreshToken, updateUser } = slice.actions;
export default slice.reducer;

// export const selectIsAuthenticated = (state: RootState) =>
//   state.auth.isAuthenticated;
