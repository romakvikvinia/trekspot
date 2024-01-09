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
  AuthSocialLogInResponseType,
  AuthSocialLogInInput,
  StoriesResponseType,
  CreateOrUpdateStoriesInput,
  CreateOrUpdateStoriesResponseType,
} from "./api.types";
import { getFullToken } from "../helpers/secure.storage";
import { baseUrl } from "../helpers/baseUrl.helper";

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
    // url: "http://192.168.0.105:8080/graphql",
    url: `${baseUrl}/graphql`,
    // url: "http://localhost:8080/graphql",
    // url: "http://192.168.0.105:8080/graphql",
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
  tagTypes: [
    "authSocial",
    "signUp",
    "signIn",
    "analytics",
    "me",
    "updateMe",
    "stories",
    "createOrUpdateStories",
  ],
  endpoints: (builder) => ({
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
      invalidatesTags: (result, error) => (error ? [] : ["authSocial"]),
    }),

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
      transformResponse: (response: UpdateMeResponseType) => {
        // console.log("finish");
        return response;
      },

      // async onQueryStarted(old, { dispatch, queryFulfilled }) {
      //   // const patchResult = dispatch(
      //   //   trekSpotApi.util.updateQueryData("me", undefined, (draft) => {
      //   //     Object.assign(draft, {});

      //   //   })
      //   // );

      //   try {
      //     const { data } = await queryFulfilled;
      //     console.log("data", JSON.stringify(data.updateMe, null, 2));
      //     if (data.updateMe)
      //       dispatch(
      //         trekSpotApi.util.updateQueryData("me", undefined, (draft) => {
      //           //@ts-ignore
      //           Object.assign(draft, { ...data.updateMe });
      //           console.log("draft", data);
      //         })
      //       );
      //   } catch {
      //     // patchResult.undo();
      //   }
      // },
      // providesTags: ["updateMe"],
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
    /**
     * Get user stories
     *
     */
    stories: builder.query<StoriesResponseType, void>({
      query: () => ({
        document: gql`
          query {
            stories {
              iso2
              images {
                id
                url
              }
            }
          }
        `,
      }),
      transformResponse: (response: StoriesResponseType) => {
        return response;
      },
      providesTags: ["stories"],
    }),

    /**
     * Create or update Stories
     */
    createOrUpdateStories: builder.mutation<
      CreateOrUpdateStoriesResponseType,
      CreateOrUpdateStoriesInput
    >({
      query: ({ iso2, images }) => ({
        variables: { iso2, images },
        document: gql`
          mutation ($iso2: ID!, $images: [ID!]!) {
            createOrUpdateStore(input: { iso2: $iso2, images: $images }) {
              id
              iso2
              images {
                url
              }
            }
          }
        `,
      }),
      invalidatesTags: ["createOrUpdateStories"],
    }),

    //
  }),
});

export const {
  useAuthBySocialNetworkMutation,
  useSignInMutation,
  useSignUpMutation,
  useUpdateMeMutation,
  useMeQuery,
  useLazyMeQuery,
  useAnalyticsQuery,
  useStoriesQuery,
  useCreateOrUpdateStoriesMutation,
} = trekSpotApi;
