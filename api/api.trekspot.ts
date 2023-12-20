import { createApi } from "@reduxjs/toolkit/query/react";
import { gql } from "graphql-request";
import { graphqlRequestBaseQuery } from "@rtk-query/graphql-request-base-query";
import {
  AuthLoginType,
  AuthLoginResponseType,
  AuthLogUpType,
  AuthSignUpResponseType,
  UpdateMeResponseType,
  UserArgType,
  meResponseType,
  AnalyticsResponseType,
} from "./api.types";
import { getFullToken } from "../helpers/secure.storage";

const prepHeaders = async (headers: Headers) => {
  let token = await getFullToken();

  // if (token && new Date().getTime() < token.expire) {
  if (token && new Date().getTime() < token.expire) {
    // set Token
    headers.set("Authorization", `Bearer ${token.token}`);
  } else {
    // refetch
  }

  return headers;
};

export const trekSpotApi = createApi({
  refetchOnMountOrArgChange: true,
  // refetchOnFocus: true,
  baseQuery: graphqlRequestBaseQuery({
    url: "http://localhost:8080/graphql",
    // url: "https://trekspot.io/graphql",
    prepareHeaders: prepHeaders,
    customErrors: ({ name, response }) => {
      // console.log(name, response);
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
  tagTypes: ["signUp", "signIn", "analytics", "me", "updateMe"],
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
     * Update me
     * this updates user information
     */

    updateMe: builder.mutation<UpdateMeResponseType, UserArgType>({
      query: ({ visited_countries = [], lived_countries = [] }) => {
        return {
          variables: { visited_countries, lived_countries },
          document: gql`
            mutation (
              $visited_countries: [String!]
              $lived_countries: [String!]
            ) {
              updateMe(
                input: {
                  visited_countries: $visited_countries
                  lived_countries: $lived_countries
                }
              ) {
                firstName
                lastName
                email
                role
                emailVerifiedAt
                visited_countries {
                  id
                  name
                  iso2
                }
                lived_countries {
                  id
                  name
                  iso2
                }
              }
            }
          `,
        };
      },
      providesTags: ["updateMe"],
    }),

    /**
     * Get user info
     *
     */
    me: builder.query<meResponseType, void>({
      query: () => ({
        document: gql`
          query {
            me {
              firstName
              lastName
              email
              role
              emailVerifiedAt
              visited_countries {
                id
                name
                iso2
              }
              lived_countries {
                id
                name
                iso2
              }
            }
          }
        `,
      }),
      transformResponse: (response: meResponseType) => {
        return response;
      },
      providesTags: ["me"],
    }),
    /**
     * Get user analytics
     *
     */
    analytics: builder.query<AnalyticsResponseType, void>({
      query: () => ({
        document: gql`
          query {
            analytics {
              availableCountries
              achievedCountries
              territories {
                quantity
                items
              }
            }
          }
        `,
      }),
      transformResponse: (response: AnalyticsResponseType) => {
        return response;
      },
      providesTags: ["analytics"],
    }),
  }),
});

export const {
  useSignInMutation,
  useSignUpMutation,
  useUpdateMeMutation,
  useMeQuery,
  useLazyMeQuery,
  useAnalyticsQuery,
} = trekSpotApi;
