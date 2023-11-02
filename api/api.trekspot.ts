import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const headers = () => ({
  Authorization: "Bearer " + "",
});

export const trekSpotApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "" }),
  tagTypes: ["Tokens", "UserInfoMe"],
  endpoints: (builder) => ({
    signIn: builder.mutation({
      query: ({ username, password }) => ({
        url: `/oauth/token`,
        method: "POST",
        body: {
          username,
          password,
        },
        headers: headers(),
      }),
      invalidatesTags: ["Tokens"],
    }),

    me: builder.query({
      query: () => ({ url: "/api/v1/me", headers: headers() }),
      providesTags: ["UserInfoMe"],
    }),
  }),
});
