import { configureStore } from "@reduxjs/toolkit";
import { trekSpotApi } from "../../api/api.trekspot";
import authReducer from "../slices/auth.slice";
import { TypedUseSelectorHook, useSelector } from "react-redux";
// reducers

export const store = configureStore({
  reducer: {
    auth: authReducer,
    // [chatAppApi.reducerPath]: (state, action) => action.type !== HYDRATE ? chatAppApi.reducer(state, action) : {...state, ...(action.payload as unknown)[chatAppApi.reducerPath]},
    // [trekSpotApi.reducerPath]: trekSpotApi.reducer,
  },
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware().concat(trekSpotApi.middleware),
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware().concat(trekSpotApi.middleware),
  devTools: true,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
