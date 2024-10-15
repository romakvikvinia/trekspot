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
    signIn: (
      state,
      {
        payload,
      }: PayloadAction<{ token: string; expire: number; user: UserType }>
    ) => {
      state = {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        token: payload.token,
        user: payload.user,
      };
    },
    refreshToken: (state, { payload }: PayloadAction<{ token: string }>) => {
      state = {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        token: payload.token,
      };
    },
  },
});

export const { signOut, signIn, refreshToken } = slice.actions;
export default slice.reducer;

// export const selectIsAuthenticated = (state: RootState) =>
//   state.auth.isAuthenticated;
