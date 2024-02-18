import { configureStore } from "@reduxjs/toolkit";
import { trekSpotApi } from "../../api/api.trekspot";
// reducers

export const store = configureStore({
  reducer: {
    // [chatAppApi.reducerPath]: (state, action) => action.type !== HYDRATE ? chatAppApi.reducer(state, action) : {...state, ...(action.payload as unknown)[chatAppApi.reducerPath]},
    [trekSpotApi.reducerPath]: trekSpotApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(trekSpotApi.middleware),
  devTools: true,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
