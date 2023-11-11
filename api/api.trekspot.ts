import { createApi } from "@reduxjs/toolkit/query/react";
import { gql } from "graphql-request";
import { graphqlRequestBaseQuery } from "@rtk-query/graphql-request-base-query";
import {
  AuthLoginType,
  AuthLoginResponseType,
  AuthLogUpType,
  AuthSignUpResponseType,
  AuthSocialLogInResponseType,
  AuthSocialLogInInput,
} from "./api.types";
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
  // refetchOnMountOrArgChange: true,
  baseQuery: graphqlRequestBaseQuery({
    url: "http://localhost:8080/graphql",
    prepareHeaders: prepHeaders,
    customErrors: ({ name, response }) => {
      console.log(name);
      return {
        name,
        stack: null,
        //@ts-ignore
        message: response?.errors[0]?.extensions?.originalError?.message,
        // @ts-ignore
        errorCode: response?.errors[0]?.extensions?.originalError?.statusCode,
      };
    },
  }),
  tagTypes: ["signUp", "signIn"],
  endpoints: (builder) => ({
    /**
     * Sign In
     */
    signIn: builder.mutation<AuthLoginResponseType, AuthLoginType>({
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
      transformResponse: (response: AuthLoginResponseType) => {
        return response;
      },
      invalidatesTags: (result, error) => (error ? [] : ["signIn"]),
    }),
    /**
     * Sign Up
     */
    signUp: builder.mutation<AuthSignUpResponseType, AuthLogUpType>({
      query: ({ firstName, lastName, email, password }) => {
        return {
          variables: { firstName, lastName, email, password },
          document: gql`
            mutation (
              $email: String!
              $password: String!
              $firstName: String!
              $lastName: String!
            ) {
              signUp(
                input: {
                  firstName: $firstName
                  lastName: $lastName
                  email: $email
                  password: $password
                }
              ) {
                firstName
                lastName
                email
              }
            }
          `,
        };
      },
      transformResponse: (response: AuthSignUpResponseType) => {
        return response;
      },
      invalidatesTags: (result, error) => (error ? [] : ["signUp"]),
    }),

    /**
     * Social Auth with provider
     */

    authBySocialNetwork: builder.mutation<
      AuthSocialLogInResponseType,
      AuthSocialLogInInput
    >({
      query: ({ token, provider }) => ({
        variables: { token, provider },
        document: gql`
          mutation ($token: String!, $provider: Provider!) {
            socialLogin(input: { token: $token, provider: $provider }) {
              token
              expire
            }
          }
        `,
      }),
      transformResponse: (response: AuthSocialLogInResponseType) => {
        return response;
      },
    }),
  }),
});

export const {
  useSignInMutation,
  useSignUpMutation,
  useAuthBySocialNetworkMutation,
} = trekSpotApi;
