import React from "react";
import { useFocusEffect, useScrollToTop } from "@react-navigation/native";

import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import Constants from "expo-constants";

import { COLORS, SIZES } from "../../styles/theme";

import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ExploreRoutesStackParamList } from "../../routes/explore/ExploreRoutes";
import {
  useCountriesQuery,
  useGetCitiesQuery,
  useGetRandomCountriesGroupedByContinentQuery,
  useLazyWishlistsQuery,
  // useRandomSightQuery,
} from "../../api/api.trekspot";

import { DestinationContainer } from "../../components/explore/DestinationContainer";
import { CitiesContainer } from "../../components/explore/CitiesContainer";

import { ExploreHeader } from "./Header";
import { TripToolkit } from "./TripToolkit";
import { useAppDispatch } from "../../package/store";
import { setWishlists } from "../../package/slices";
import { StatusBar } from "expo-status-bar";

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
    flex: 1,
    backgroundColor: "#f8f8f8",
  },
  currentTrip: {
    backgroundColor: "#fef0ff",
    borderRadius: 50,
    flexDirection: "row",
    paddingHorizontal: 18,
    paddingLeft: 10,
    paddingVertical: 10,
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 5,
    borderWidth: 1,
    borderColor: "#dac9dc",
    marginBottom: 5,
  },
  currentTripLeft: {
    flexDirection: "row",
  },
  currentTripDotsButton: {
    width: 30,
    height: 30,
    alignItems: "flex-end",
    justifyContent: "center",
  },
  currentTripTitle: {
    fontSize: 18,
    color: COLORS.primaryDark,
    fontWeight: "bold",
  },
  currentTripTitleDate: {
    fontSize: 12,
    color: COLORS.primaryDark,
    marginTop: 3,
    opacity: 0.8,
    fontWeight: "500",
  },
  currentTripIcon: {
    height: 40,
    width: 40,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  cancelButton: {
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: 15,
  },
  cancelButtonText: {
    fontSize: 14,
    color: COLORS.darkgray,
  },
  closeButton: {
    backgroundColor: "#DBDBDB",
    width: 30,
    height: 30,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  bucketListButton: {
    minWidth: 45,
    height: 45,
    backgroundColor: "#fff",
    borderRadius: 50,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  searchBox: {
    flex: 1,
    backgroundColor: "#fff",
    flexDirection: "row",
    borderRadius: 30,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  searchIcon: {
    paddingLeft: 15,
  },
  searchInput: {
    height: 45,
    paddingLeft: 10,
    fontSize: 16,
    width: "100%",
    color: "#000",
  },
  right: {
    flexDirection: "row",
    alignItems: "center",
  },
  screenHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingBottom: 15,
  },
  rowItem: {
    width: "100%",
    paddingTop: 25,
    backgroundColor: "#f8f8f8",
  },
  rowItemHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: SIZES.padding,
    paddingHorizontal: 15,
  },
  seeAllButtonTxt: {
    color: COLORS.primary,
    fontSize: SIZES.body4,
  },
  h2: {
    fontSize: 22,
    color: "#000",
    fontWeight: "600",
  },
  contentBox: {
    marginTop: 5,
    paddingLeft: 15,
  },
});
