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
  MeResponseType,
  AnalyticsResponseType,
  StoriesResponseType,
  CreateOrUpdateStoriesInput,
  CreateOrUpdateStoriesResponseType,
  CountriesArgsType,
  CountriesResponseType,
  CountryArgsType,
  CountryResponseType,
  PassportIndexesArgsType,
  PassportIndexesResponseType,
  CitiesArgsType,
  CitiesResponseType,
  SightsArgsType,
  SightsResponseType,
  SightsFetchResponseType,
  RandomCountriesGroupByContinentResponseType,
  RandomSightsResponseType,
  RandomSightsArgsType,
  CountryDishesResponseType,
  CountryDishesArgsType,
  SearchResponseType,
  SearchArgsType,
  CreateTripResponseType,
  CreateTripArgsType,
  TripsResponseType,
  TripsArgsType,
  TopicsResponseType,
  TopicsArgsType,
  TopicType,
  TransformedTopicsResponseType,
  FaqResponseType,
  FaqType,
  TransformedFaqResponseType,
  FaqArgsType,
  TripDetailResponseType,
  TripDetailArgsType,
  UpdateTripRouteAndActivitiesResponseType,
  UpdateTripRouteAndActivitiesArgsType,
  RemoveActivityFromRouteResponseType,
  RemoveActivityFromRouteArgsType,
  ChangeActivityVisitedResponseType,
  ChangeActivityVisitedArgsType,
  DeleteTripResponseType,
  DeleteTripArgsType,
  UpdateTripResponseType,
  UpdateTripArgsType,
  WishlistArgsType,
  WishlistResponseType,
  RemoveWishlistItemArgsType,
  RemoveWishlistItemResponseType,
  ToggleWishlistResponseType,
  ToggleWishlistArgsType,
  UpComingTripsArgsType,
  UpComingTripsResponseType,
  AllCountriesResponseType,
  AllCountriesArgsType,
  CreateAnalyticArgsType,
  CreateAnalyticResponseType,
  VisitedCountriesResponseType,
  AuthSocialLogInInput,
  AuthSocialLogInResponseType,
} from "./api.types";
import { getFullToken } from "../helpers/secure.storage";
import { baseUrl } from "../helpers/baseUrl.helper";

const prepHeaders = async (headers: Headers) => {
  let token = await getFullToken();
  headers.set("Accept-Language", `en`);

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
    "getSights",
    "removeActivityFromRoute",
    "changeActivityVisited",
    "myTrips",
    "deleteTrip",
    "updateTrip",
    "createAnalytics",
    "visitedCountries",
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
              signIn(input: { email: $email, password: $password }) {
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
      query: ({ firstName, lastName, email, password }) => {
        return {
          variables: {
            firstName,
            lastName,
            email,
            password,
          },
          document: gql`
            mutation (
              $firstName: String
              $lastName: String
              $email: String
              $password: String
            ) {
              updateMe(
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
                role
                emailVerifiedAt
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
    me: builder.query<MeResponseType, void>({
      query: () => ({
        document: gql`
          query {
            me {
              firstName
              lastName
              email
              role
              emailVerifiedAt
            }
          }
        `,
      }),
      transformResponse: (response: MeResponseType) => {
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
              world
              countries
              livedCountries
              visitedCountries
              territories
              activities {
                id
                iso2
                title
                rate
                category
                price
                reviews
                iso2
                city
                address
                url
                description
                location {
                  lat
                  lng
                }
                workingHours {
                  day
                  hours
                }
                image {
                  url
                  html_attributions
                }
                images {
                  url
                  html_attributions
                }
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
     * Get user visited countries
     *
     */
    visitedCountries: builder.query<VisitedCountriesResponseType, void>({
      query: () => ({
        document: gql`
          query {
            visitedCountries {
              id
              iso2
              continents
            }
          }
        `,
      }),
      transformResponse: (response: VisitedCountriesResponseType) => {
        return response;
      },
      providesTags: ["visitedCountries"],
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

    /**
     * fetch popular countries
     */

    countries: builder.query<CountriesResponseType, CountriesArgsType>({
      query: ({ skip = 0, take = 20, isPopular = false }) => ({
        variables: { skip, take, isPopular },
        document: gql`
          query ($skip: Int!, $take: Int!, $isPopular: Boolean!) {
            countries(
              input: { skip: $skip, take: $take, isPopular: $isPopular }
            ) {
              id
              name
              rate
              visitors
              continents
              image {
                url
              }
            }
          }
        `,
      }),
    }),
    /**
     * fetch all countries
     */

    allCountries: builder.query<AllCountriesResponseType, AllCountriesArgsType>(
      {
        query: ({ skip = 0, take = 200 }) => ({
          variables: { skip, take },
          document: gql`
            query ($skip: Int, $take: Int) {
              allCountries(input: { skip: $skip, take: $take }) {
                id
                iso2
                name
              }
            }
          `,
        }),
      }
    ),

    /**
     * Get Country
     */

    country: builder.query<CountryResponseType, CountryArgsType>({
      query: ({ id }) => ({
        variables: { id },
        document: gql`
          query ($id: String!) {
            country(id: $id) {
              id
              name
              iso2
              capital
              continents
              isPopular
              coordinates {
                latitude
                longitude
              }
              rate
              visitors
              domain
              independent
              unMember
              currencies
              idd {
                root
                suffixes
              }
              region
              subregion
              languages
              population
              car {
                side
                signs
              }
              continents
              startOfWeek
              postalCode {
                format
                regex
              }
              overview
              telecoms
              emergency {
                emergency
                police
                ambulance
                fire
              }
              transportTypes
              taxi {
                name
                ios
                android
                logo
              }
              security
              recognizedFor {
                emoji
                title
              }
              religions
              whenToVisit
              nationalDay
              plugTypes
              weatherInformation {
                averageTemperatures {
                  summer
                  spring
                  autumn
                  winter
                }
                seasonalConsiderations
              }
              images {
                id
                url
              }
              image {
                url
              }
            }
          }
        `,
      }),
    }),
    // Get passport indexes for country
    getPassportIndexes: builder.query<
      PassportIndexesResponseType,
      PassportIndexesArgsType
    >({
      query: ({ from, to }) => ({
        variables: { from, to },
        document: gql`
          query ($from: String!, $to: String!) {
            passportIndex(input: { from: $from, to: $to }) {
              from
              to
              requirement
            }
          }
        `,
      }),
    }),
    /**
     *  cities
     */

    getCities: builder.query<CitiesResponseType, CitiesArgsType>({
      query: ({
        skip = 0,
        take = 20,
        iso2,
        inTopSight = false,
        isTop = false,
      }) => ({
        variables: { skip, take, iso2, inTopSight, isTop },
        document: gql`
          query (
            $skip: Int!
            $take: Int!
            $iso2: String
            $inTopSight: Boolean
            $isTop: Boolean
          ) {
            cities(
              input: {
                skip: $skip
                take: $take
                iso2: $iso2
                inTopSight: $inTopSight
                isTop: $isTop
              }
            ) {
              id
              city
              city_ascii
              country
              iso2
              capital
              lat
              lng
              rate
              description
              image {
                url
              }
              images {
                id
                url
              }
            }
          }
        `,
      }),
    }),
    /**
     * Sights
     */
    getSights: builder.query<SightsResponseType, SightsArgsType>({
      query: ({ skip = 0, take = 100, iso2, city = "" }) => ({
        variables: { skip, take, iso2, city },
        document: gql`
          query ($skip: Int!, $take: Int!, $iso2: String!, $city: String) {
            sights(
              input: { skip: $skip, take: $take, iso2: $iso2, city: $city }
            ) {
              id
              iso2
              title
              rate
              category
              price
              reviews
              iso2
              city
              address
              url
              description
              location {
                lat
                lng
              }
              workingHours {
                day
                hours
              }
              image {
                url
                html_attributions
              }
              images {
                url
                html_attributions
              }
            }
          }
        `,
      }),
      providesTags: ["getSights"],
      transformResponse: (response: SightsFetchResponseType) => {
        let transformedData: Record<string, any[]> = {};
        let sights = response.sights || [];

        if (sights.length) {
          transformedData["Top Sights"] = sights.splice(0, 10);
          if (sights.length) {
            sights.forEach((res) => {
              if (res.category in transformedData) {
                transformedData[res.category] = [
                  ...transformedData[res.category],
                  res,
                ];
              } else {
                transformedData[res.category] = [res];
              }
            });
          }
        }

        return transformedData;
      },
    }),
    //
    getRandomCountriesGroupedByContinent: builder.query<
      RandomCountriesGroupByContinentResponseType,
      void
    >({
      query: () => ({
        document: gql`
          query {
            groupedCountry {
              asia {
                ...CountryBasicFields
              }
              africa {
                ...CountryBasicFields
              }
              europe {
                ...CountryBasicFields
              }
              oceania {
                ...CountryBasicFields
              }
              southAmerica {
                ...CountryBasicFields
              }
              northAmerica {
                ...CountryBasicFields
              }
            }
          }
          fragment CountryBasicFields on Country {
            id
            name
            rate
            visitors
            continents
            image {
              url
            }
            images {
              url
            }
          }
        `,
      }),
    }),
    //
    randomSight: builder.query<RandomSightsResponseType, RandomSightsArgsType>({
      query: ({ take = 10, category, title, city }) => ({
        variables: { take, category, title, city },
        document: gql`
          query (
            $take: Int!
            $city: String
            $title: String
            $category: String
          ) {
            randomSights(
              input: {
                take: $take
                city: $city
                title: $title
                category: $category
              }
            ) {
              id
              iso2
              title
              rate
              category
              price
              reviews
              city
              address
              url
              description
              workingHours {
                day
                hours
              }
              image {
                url
              }
              images {
                url
              }
            }
          }
        `,
      }),
    }),
    /**
     * Get dishes by ISO2 code
     */

    dishesByISO2: builder.query<
      CountryDishesResponseType,
      CountryDishesArgsType
    >({
      query: ({ skip = 0, take = 100, iso2 }) => ({
        variables: { skip, take, iso2 },
        document: gql`
          query ($skip: Int!, $take: Int!, $iso2: String!) {
            dishes(input: { skip: $skip, take: $take, iso2: $iso2 }) {
              id
              title
              rate
              restaurant
              iso2
              url
              image {
                url
              }
            }
          }
        `,
      }),
    }),

    /**
     * Global Search
     */

    search: builder.query<SearchResponseType, SearchArgsType>({
      query: ({ skip = 0, take = 100, search = "" }) => ({
        variables: { skip, take, search },
        document: gql`
          query ($search: String, $skip: Int, $take: Int) {
            search(input: { skip: $skip, take: $take, search: $search }) {
              __typename
              ... on City {
                id
                city
                country
                iso2
                rate
                visitors
                image {
                  url
                }
                images {
                  id
                  url
                }
              }
              ... on Country {
                id
                name
                iso2
                image {
                  url
                }
              }
            }
          }
        `,
      }),
    }),

    /**
     * Global Search for cities
     */

    searchCities: builder.query<SearchResponseType, SearchArgsType>({
      query: ({ skip = 0, take = 100, search = "" }) => ({
        variables: { skip, take, search },
        document: gql`
          query ($search: String, $skip: Int, $take: Int) {
            search(input: { skip: $skip, take: $take, search: $search }) {
              __typename
              ... on City {
                id
                city
                country
                iso2
                rate
                visitors
                image {
                  url
                }
                images {
                  id
                  url
                }
              }
            }
          }
        `,
      }),
    }),

    /**
     * Create Trip
     */

    createTrip: builder.mutation<CreateTripResponseType, CreateTripArgsType>({
      query: ({ name, startAt, endAt, type, cities }) => ({
        variables: { name, startAt, endAt, type, cities },
        document: gql`
          mutation (
            $name: String!
            $startAt: DateTime!
            $endAt: DateTime!
            $type: TripType!
            $cities: [ID!]!
          ) {
            createTrip(
              input: {
                name: $name
                startAt: $startAt
                endAt: $endAt
                type: $type
                cities: $cities
              }
            ) {
              id
              name
              startAt
              endAt
              type
              cities {
                id
                city
                iso2
                lng
                lat
                image {
                  url
                }
              }
            }
          }
        `,
      }),
    }),
    /**
     * My trips
     */

    myTrips: builder.query<TripsResponseType, TripsArgsType>({
      query: ({ skip = 0, take = 1000, search = "" }) => ({
        variables: { skip, take, search },
        document: gql`
          query ($skip: Int, $take: Int, $search: String) {
            trips(input: { skip: $skip, take: $take, search: $search }) {
              id
              name
              startAt
              endAt
              type
              cities {
                id
                city
                iso2
                lng
                lat
                image {
                  url
                }
              }
            }
          }
        `,
      }),
      providesTags: ["myTrips"],
    }),
    /**
     * topics
     */

    topics: builder.query<TransformedTopicsResponseType, TopicsArgsType>({
      query: ({ skip = 0, take = 200, search = "", iso2 }) => ({
        variables: { skip, take, search, iso2 },
        document: gql`
          query ($skip: Int, $take: Int, $search: String, $iso2: String!) {
            topics(
              input: { skip: $skip, take: $take, search: $search, iso2: $iso2 }
            ) {
              itemId
              iso2
              title
              description
              image {
                url
              }
              category {
                itemId
                title
              }
            }
          }
        `,
      }),
      //@ts-ignore
      transformResponse: (response: TopicsResponseType) => {
        let transformedData: Record<string, TopicType[]> = {};
        let items = response.topics || [];

        if (items.length) {
          items.forEach((res) => {
            if (res.category.title in transformedData) {
              transformedData[res.category.title] = [
                ...transformedData[res.category.title],
                res,
              ];
            } else {
              transformedData[res.category.title] = [res];
            }
          });
        }

        return transformedData;
      },
    }),

    /**
     * faq
     */

    faq: builder.query<TransformedFaqResponseType, FaqArgsType>({
      query: ({ skip = 0, take = 200, search = "", iso2 }) => ({
        variables: { skip, take, search, iso2 },
        document: gql`
          query ($skip: Int, $take: Int, $search: String, $iso2: String!) {
            faqs(
              input: { skip: $skip, take: $take, search: $search, iso2: $iso2 }
            ) {
              itemId
              iso2
              question
              answer
              category {
                itemId
                title
              }
            }
          }
        `,
      }),
      //@ts-ignore
      transformResponse: (response: FaqResponseType) => {
        let transformedData: Record<string, FaqType[]> = {};
        let arr = response.faqs || [];
        const items = [...arr].reverse();

        if (items.length) {
          items.forEach((res) => {
            if (res.category.title in transformedData) {
              transformedData[res.category.title] = [
                ...transformedData[res.category.title],
                res,
              ];
            } else {
              transformedData[res.category.title] = [res];
            }
          });
        }
        return transformedData;
      },
    }),
    /**
     * trip
     */

    trip: builder.query<TripDetailResponseType, TripDetailArgsType>({
      query: ({ id }) => ({
        variables: { id },
        document: gql`
          query ($id: ID!) {
            trip(id: $id) {
              id
              type
              startAt
              endAt

              routes {
                id
                city {
                  id
                  city
                  iso2
                  lng
                  lat
                  image {
                    url
                  }
                }
                activities {
                  id
                  day
                  date
                  visited
                  sight {
                    id
                    title
                  }
                }
              }
            }
          }
        `,
      }),

      transformResponse: (response: TripDetailResponseType) => {
        return response;
      },
    }),

    // save trip details
    updateTripRouteAndActivities: builder.mutation<
      UpdateTripRouteAndActivitiesResponseType,
      UpdateTripRouteAndActivitiesArgsType
    >({
      query: ({ trip, city, iso2, location, days }) => {
        return {
          variables: { trip, city, iso2, location, days },
          document: gql`
            mutation (
              $trip: ID!
              $city: ID!
              $iso2: String!
              $location: RoueLocationInputType!
              $days: [RoueDayInputType!]!
            ) {
              createRouteAndActivities(
                input: {
                  trip: $trip
                  city: $city
                  iso2: $iso2
                  location: $location
                  days: $days
                }
              ) {
                id
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

    // removes particular sight from route activities
    removeActivityFromRoute: builder.mutation<
      RemoveActivityFromRouteResponseType,
      RemoveActivityFromRouteArgsType
    >({
      query: ({ day, route, sight }) => {
        return {
          variables: { day, route, sight },
          document: gql`
            mutation ($day: Int!, $route: ID!, $sight: ID!) {
              removeActivityFromRoute(
                input: { day: $day, route: $route, sight: $sight }
              ) {
                id
              }
            }
          `,
        };
      },
      transformResponse: (response: AuthLoginResponseType) => {
        return response;
      },
      invalidatesTags: (result, error) =>
        error ? [] : ["removeActivityFromRoute"],
    }),
    // change activity is visited or not
    changeActivityVisited: builder.mutation<
      ChangeActivityVisitedResponseType,
      ChangeActivityVisitedArgsType
    >({
      query: ({ day, route, sight, visited }) => {
        return {
          variables: { day, route, sight, visited },
          document: gql`
            mutation (
              $day: Int!
              $route: ID!
              $sight: ID!
              $visited: Boolean!
            ) {
              changeActivityVisited(
                input: {
                  visited: $visited
                  day: $day
                  route: $route
                  sight: $sight
                }
              ) {
                id
              }
            }
          `,
        };
      },
      transformResponse: (response: AuthLoginResponseType) => {
        return response;
      },
      invalidatesTags: (result, error) =>
        error ? [] : ["changeActivityVisited"],
    }),

    // delete trip
    updateTrip: builder.mutation<UpdateTripResponseType, UpdateTripArgsType>({
      query: ({ id, name, startAt, endAt, type, cities = [] }) => {
        return {
          variables: { id, name, startAt, endAt, type, cities },
          document: gql`
            mutation (
              $id: ID!
              $name: String
              $startAt: DateTime
              $endAt: DateTime
              $type: TripType
            ) {
              updateTrip(
                input: {
                  id: $id
                  name: $name
                  startAt: $startAt
                  endAt: $endAt
                  type: $type
                }
              ) {
                id
                name
                startAt
                endAt
                type
                cities {
                  id
                  city
                  iso2
                  lng
                  lat
                  image {
                    url
                  }
                }
              }
            }
          `,
        };
      },
      transformResponse: (response: UpdateTripResponseType) => {
        return response;
      },
      invalidatesTags: (result, error) => (error ? [] : ["updateTrip"]),
    }),
    // up coming trips
    upComingTrips: builder.query<
      UpComingTripsResponseType,
      UpComingTripsArgsType
    >({
      query: ({ skip, take }) => {
        return {
          variables: { skip, take },
          document: gql`
            query ($skip: Int, $take: Int) {
              upComingTrips(input: { skip: $skip, take: $take }) {
                id
                name
                startAt
                endAt
                cities {
                  id
                  city
                  iso2
                  lng
                  lat
                  image {
                    url
                  }
                }
              }
            }
          `,
        };
      },
    }),

    // delete trip
    deleteTrip: builder.mutation<DeleteTripResponseType, DeleteTripArgsType>({
      query: ({ id }) => {
        return {
          variables: { id },
          document: gql`
            mutation ($id: ID!) {
              removeTrip(input: { id: $id }) {
                id
              }
            }
          `,
        };
      },
      transformResponse: (response: DeleteTripResponseType) => {
        return response;
      },
      invalidatesTags: (result, error) => (error ? [] : ["deleteTrip"]),
    }),

    //

    wishlists: builder.query<WishlistResponseType, WishlistArgsType>({
      query: ({ skip = 0, take = 20, search, type }) => ({
        variables: { skip, take, search, type },
        document: gql`
          query ($skip: Int, $take: Int, $search: String, $type: WishlistType) {
            wishlists(
              input: { skip: $skip, take: $take, search: $search, type: $type }
            ) {
              id
              sight {
                id
                iso2
                title
                rate
                category
                price
                reviews
                iso2
                city
                address
                url
                description
                location {
                  lat
                  lng
                }
                workingHours {
                  day
                  hours
                }
                image {
                  url
                  html_attributions
                }
                images {
                  url
                  html_attributions
                }
              }
              city {
                id
                city
                city_ascii
                country
                iso2
                capital
                lat
                lng
                rate
                description
                image {
                  url
                }
                images {
                  id
                  url
                }
              }
            }
          }
        `,
      }),
    }),

    //

    toggleWishlist: builder.mutation<
      ToggleWishlistResponseType,
      ToggleWishlistArgsType
    >({
      query: ({ sight, city }) => ({
        variables: { sight, city },
        document: gql`
          mutation ($city: ID, $sight: ID) {
            toggleWishlist(input: { city: $city, sight: $sight }) {
              id
            }
          }
        `,
      }),
    }),

    //

    removeWishlistItem: builder.mutation<
      RemoveWishlistItemResponseType,
      RemoveWishlistItemArgsType
    >({
      query: ({ id }) => ({
        variables: { id },
        document: gql`
          mutation ($id: ID!) {
            removeWishlist(input: { id: $id }) {
              id
            }
          }
        `,
      }),
    }),

    /**
     * Create analytics
     */
    createAnalytics: builder.mutation<
      CreateAnalyticResponseType,
      CreateAnalyticArgsType
    >({
      query: ({ countries, sight, city, wasLiving }) => {
        return {
          variables: { countries, sight, city, wasLiving },
          document: gql`
            mutation (
              $countries: [ID]
              $city: ID
              $sight: ID
              $wasLiving: Boolean! = false
            ) {
              createAnalytic(
                input: {
                  countries: $countries
                  city: $city
                  sight: $sight
                  wasLiving: $wasLiving
                }
              ) {
                id
              }
            }
          `,
        };
      },
      transformResponse: (response: CreateAnalyticResponseType) => {
        return response;
      },
      invalidatesTags: (result, error) => (error ? [] : ["createAnalytics"]),
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
  useVisitedCountriesQuery,
  useStoriesQuery,
  useCreateOrUpdateStoriesMutation,
  useCountriesQuery,
  useLazyAllCountriesQuery,
  useCountryQuery,
  useLazyCountryQuery,
  useLazyGetPassportIndexesQuery,
  useGetCitiesQuery,
  useLazyGetCitiesQuery,
  useLazyGetSightsQuery,
  useGetRandomCountriesGroupedByContinentQuery,
  useRandomSightQuery,
  useDishesByISO2Query,
  useLazySearchQuery,
  useLazySearchCitiesQuery,
  useCreateTripMutation,
  useLazyMyTripsQuery,
  useLazyTopicsQuery,
  useLazyFaqQuery,
  //
  useTripQuery,
  useUpComingTripsQuery,
  useUpdateTripRouteAndActivitiesMutation,
  useRemoveActivityFromRouteMutation,
  useChangeActivityVisitedMutation,
  useUpdateTripMutation,
  useDeleteTripMutation,
  //
  useWishlistsQuery,
  useLazyWishlistsQuery,
  useRemoveWishlistItemMutation,
  useToggleWishlistMutation,
  //
  useCreateAnalyticsMutation,
} = trekSpotApi;
