import { useScrollToTop } from "@react-navigation/native";
import { useRef } from "react";
import { Platform, ScrollView, View } from "react-native";

import {
  useCountriesQuery,
  useGetCitiesQuery,
  useGetRandomCountriesGroupedByContinentQuery,
} from "../../api/api.trekspot";
import { TripToolkit } from "../../screen/Explore/TripToolkit";
import { CitiesContainer } from "./CitiesContainer";
import { DestinationContainer } from "./DestinationContainer";

export const ExploreContent = () => {
  const ref = useRef(null);
  useScrollToTop(ref);
  // const dispatch = useAppDispatch();
  // const [fetchWishlist] = useLazyWishlistsQuery();

  // useFocusEffect(
  //   useCallback(() => {
  //     (async () => {
  //       try {
  //         const { wishlists } = await fetchWishlist({
  //           skip: 0,
  //           take: 500,
  //         }).unwrap();
  //         dispatch(setWishlists(wishlists));
  //       } catch (error) {}
  //     })();
  //   }, [fetchWishlist])
  // );

  //data
  const {
    data: popularCountries,
    isLoading: popularCountriesLoading,
    // isSuccess,
  } = useCountriesQuery({ isPopular: true });

  const { data, isLoading: isCitiesLoading } = useGetCitiesQuery({
    skip: 0,
    take: 15,
    isTop: true,
  });
 
  const {
    data: randomCountriesByContinent,
    isLoading: isRandomCountriesByContinentLoading,
  } = useGetRandomCountriesGroupedByContinentQuery();

  /**
   * Transform data
   */
  const cities = data && data.cities ? data.cities : [];
  return (
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

      <View
        style={{
          paddingHorizontal: 15,
          marginTop: Platform.OS === "android" ? 20 : 30,
          zIndex: 1,
        }}
      >
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
        countries={randomCountriesByContinent?.groupedCountry.europe || []}
        isExplore={true}
      />
      <DestinationContainer
        isLoading={isRandomCountriesByContinentLoading}
        title="Africa"
        countries={randomCountriesByContinent?.groupedCountry.africa || []}
        isExplore={true}
      />

      <DestinationContainer
        isLoading={isRandomCountriesByContinentLoading}
        title="Oceania"
        countries={randomCountriesByContinent?.groupedCountry.oceania || []}
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
  );
};
