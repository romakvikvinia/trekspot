import { useFocusEffect, useScrollToTop } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import Constants from "expo-constants";
import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";

import {
  useCountriesQuery,
  useGetCitiesQuery,
  useGetRandomCountriesGroupedByContinentQuery,
  useLazyWishlistsQuery,
  // useRandomSightQuery,
} from "../../api/api.trekspot";
import { CitiesContainer } from "../../components/explore/CitiesContainer";
import { DestinationContainer } from "../../components/explore/DestinationContainer";
import { setWishlists } from "../../package/slices";
import { useAppDispatch } from "../../package/store";
import { ExploreRoutesStackParamList } from "../../routes/explore/ExploreRoutes";
import { ExploreHeader } from "./Header";
import { TripToolkit } from "./TripToolkit";

type ExploreProps = NativeStackScreenProps<
  ExploreRoutesStackParamList,
  "ExploreWorld"
>;

export const ExploreScreen: React.FC<ExploreProps> = ({ navigation }) => {
  /**
   * TODO:: maybe we will change this  approach
   * fetching wishlist on this screen
   */
  // const { wishlists } = useAppSelector((state) => state.wishlist);
  const ref = React.useRef(null);

  useScrollToTop(ref);
  const dispatch = useAppDispatch();
  const [fetchWishlist] = useLazyWishlistsQuery();

  useFocusEffect(
    React.useCallback(() => {
      (async () => {
        try {
          const { wishlists } = await fetchWishlist({
            skip: 0,
            take: 500,
          }).unwrap();
          dispatch(setWishlists(wishlists));
        } catch (error) {}
      })();
    }, [fetchWishlist])
  );

  //data
  const {
    data: popularCountries,
    isLoading: popularCountriesLoading,
    isSuccess,
  } = useCountriesQuery({ isPopular: true });

  const { data, isLoading: isCitiesLoading } = useGetCitiesQuery({
    skip: 0,
    take: 15,
    isTop: true,
  });

  // const { data: randomSightsData, isLoading: isRandomSightsLoading } =
  //   useRandomSightQuery({ take: 10 });

  const {
    data: randomCountriesByContinent,
    isLoading: isRandomCountriesByContinentLoading,
  } = useGetRandomCountriesGroupedByContinentQuery();

  /**
   * Transform data
   */
  const cities = data && data.cities ? data.cities : [];

  return (
    <>
      <View style={[styles.safeArea,{
        paddingTop: Constants?.statusBarHeight + 10,
      }]}>
        <StatusBar style="auto" />

        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS == "ios" ? "padding" : "height"}
        >
          <ExploreHeader />
      
          <ScrollView
            style={{ flex: 1 }}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 25 }}
            ref={ref}
          >
            {/**
             * Popular Countries
             */}

            <DestinationContainer
              key={`DestinationContainer-Popular-Countries`}
              title="Popular Countries"
              countries={(popularCountries && popularCountries.countries) || []}
              seeAllItems={false}
              isLoading={popularCountriesLoading}
            />

            {/**
             * Top cities
             */}
            <CitiesContainer
              title="Trending cities"
              cities={cities}
              seeAllItems={false}
              isCitiesLoading={isCitiesLoading}
            />

            <View style={{ paddingHorizontal: 15, marginTop: Platform.OS === "android" ? 20 : 30, zIndex: 1 }}>
              <TripToolkit />
            </View>

            {/**
             * Top sights
             */}

            {/* <ExploreSightListContainer
              items={(randomSightsData && randomSightsData.randomSights) || []}
              title="Top sights"
              isRandomSightsLoading={isRandomSightsLoading}
              seeAllItems
            /> */}
            {/*
             * Countries by Continent with random
             *
             */}
            <DestinationContainer
              isLoading={isRandomCountriesByContinentLoading}
              title="Asia"
              countries={randomCountriesByContinent?.groupedCountry.asia || []}
              seeAllItems={false}
              isExplore={true}
            />
            <DestinationContainer
              isLoading={isRandomCountriesByContinentLoading}
              title="Europe"
              countries={
                randomCountriesByContinent?.groupedCountry.europe || []
              }
              isExplore={true}
            />
            <DestinationContainer
              isLoading={isRandomCountriesByContinentLoading}
              title="Africa"
              countries={
                randomCountriesByContinent?.groupedCountry.africa || []
              }
              isExplore={true}
            />
          
            <DestinationContainer
              isLoading={isRandomCountriesByContinentLoading}
              title="Oceania"
              countries={
                randomCountriesByContinent?.groupedCountry.oceania || []
              }
              isExplore={true}
            />
            <DestinationContainer
              isLoading={isRandomCountriesByContinentLoading}
              title="South America"
              countries={
                randomCountriesByContinent?.groupedCountry.southAmerica || []
              }
              isExplore={true}
            />
            <DestinationContainer
              isLoading={isRandomCountriesByContinentLoading}
              title="North America"
              countries={
                randomCountriesByContinent?.groupedCountry.northAmerica || []
              }
              isExplore={true}
            />
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: "#f8f8f8",
    flex: 1,
  },
});
