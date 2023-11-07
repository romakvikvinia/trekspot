import { createApi } from "@reduxjs/toolkit/query/react";
import { gql } from "graphql-request";
import { graphqlRequestBaseQuery } from "@rtk-query/graphql-request-base-query";
import { AuthLoginType, AuthResponseType, TokenType } from "./api.types";
import { getFullToken } from "../helpers/secure.storage";

const prepHeaders = async (headers: Headers) => {
  let token = await getFullToken();

  if (token && new Date().getTime() < token.expire) {
    // set Token
    headers.set("Authorization", `Bearer ${token.token}`);
  }

  return headers;
};

export const trekSpotApi = createApi({
  baseQuery: graphqlRequestBaseQuery({
    url: "http://localhost:8080/graphql",
    prepareHeaders: prepHeaders,
  }),
  endpoints: (builder) => ({
    signIn: builder.mutation<AuthResponseType, AuthLoginType>({
      query: ({ email, password }) => {
        return {
          variables: { email, password },
          document: gql`
            mutation ($email: String!, $password: String!) {
              login(input: { email: $email, password: $password }) {
                token
                expire
              }
            }
          `,
        };
      },
      transformResponse: (response: AuthResponseType) => {
        return response;
      },
    }),
  }),
});

export const { useSignInMutation } = trekSpotApi;
