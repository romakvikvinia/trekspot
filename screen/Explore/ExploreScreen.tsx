import React, { useCallback, useRef, useState } from "react";

import {
  Keyboard,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { Portal } from "react-native-portalize";
import { Modalize } from "react-native-modalize";

import { COLORS, SIZES } from "../../styles/theme";
import { Mark2, SearchIcon } from "../../utilities/SvgIcons.utility";

import { CountrySelect } from "../../common/components/CountrySelect";
import { CountrySearch } from "../../common/components/CountrySearch";
import { DestinationDetail } from "../../components/explore/destination/CountryDetailModal";

import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ExploreRoutesStackParamList } from "../../routes/explore/ExploreRoutes";
import { useCountriesQuery, useGetCitiesQuery } from "../../api/api.trekspot";

import { BucketlistModal } from "../../common/components/BucketlistModal";
import { DestinationContainer } from "../../components/explore/DestinationContainer";
import { CitiesContainer } from "../../components/explore/CitiesContainer";
import { CountryType } from "../../api/api.types";

type ExploreProps = NativeStackScreenProps<
  ExploreRoutesStackParamList,
  "Explore"
>;

type ExploreScreenState = {
  countryId: string;
};

export const ExploreScreen: React.FC<ExploreProps> = ({ navigation }) => {
  // refs
  const BucketListModalRef = useRef<Modalize>(null);
  const modalDestinationSearchRef = useRef<Modalize>(null);
  const modalCountryPassportSelectRef = useRef<Modalize>(null);
  const modalDestinationDetailsRef = useRef<Modalize>(null);

  //data
  const {
    data: popularCountries,
    isLoading,
    isSuccess,
  } = useCountriesQuery({ isPopular: true });

  const { data, isLoading: isCitiesLoading } = useGetCitiesQuery({
    skip: 0,
    take: 10,
    isTop: true,
  });

  let { data: notPopularCountries, isLoading: isNotPopularCountriesLoading } =
    useCountriesQuery({ isPopular: false });

  const [state, setState] = useState<ExploreScreenState>({ countryId: "" });

  const [searchActive, setSearchActive] = useState(false);

  const onDestinationModalOpen = useCallback((countryId: string) => {
    setState((prevState) => ({ ...prevState, countryId }));
    modalDestinationDetailsRef.current?.open();
  }, []);

  const onBucketlistOpen = useCallback(() => {
    if (BucketListModalRef.current) BucketListModalRef.current.open();
  }, []);

  /**
   * Transform data
   */

  const cities = data && data.cities ? data.cities : [];

  const countriesAreNotPopular =
    notPopularCountries && notPopularCountries.countries
      ? notPopularCountries.countries
      : [];

  const countriesAreNotPopularMap: Record<string, CountryType[]> = {};

  countriesAreNotPopular.forEach((country) => {
    if (country.continent in countriesAreNotPopularMap) {
      countriesAreNotPopularMap[country.continent] = [
        country,
        ...countriesAreNotPopularMap[country.continent],
      ];
    } else {
      countriesAreNotPopularMap[country.continent] = [country];
    }
  });

  return (
    <>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.screenHeader}>
          <View style={styles.searchBox}>
            <View style={styles.searchIcon}>
              <SearchIcon width={15} />
            </View>
            <TextInput
              placeholder="Search here"
              placeholderTextColor="#333"
              autoFocus={false}
              style={styles.searchInput}
              onFocus={() => setSearchActive(true)}
            />
          </View>
          <View style={styles.right}>
            {searchActive ? (
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => {
                  setSearchActive(false);
                  Keyboard.dismiss();
                }}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => onBucketlistOpen()}
                style={styles.bucketListButton}
              >
                <Mark2 color={COLORS.black} />
              </TouchableOpacity>
            )}
          </View>
        </View>

        <ScrollView
          style={{ flex: 1 }}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 25 }}
        >
          {/**
           * Popular Countries
           */}

          <DestinationContainer
            key={`DestinationContainer-Popular-Countries`}
            title="Popular Countries"
            countries={(popularCountries && popularCountries.countries) || []}
          />

          {/* <View style={[styles.rowItem, { paddingTop: 5 }]}>
            <View style={styles.rowItemHeader}>
              <Text style={styles.h2}>Popular</Text>

              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => navigation.navigate("SeeAllScreen")}
              >
                <Text style={styles.seeAllButtonTxt}>See all</Text>
              </TouchableOpacity>
            </View>
            <ScrollView
              horizontal
              style={styles.contentBox}
              showsHorizontalScrollIndicator={false}
            >
              {popularCountries &&
                popularCountries.countries.map((item, ind) => (
                  <CountryItem
                    key={`popular-country-${item.id}`}
                    item={item}
                    isWith={popularCountriesLength - 1 === ind}
                    openModal={onDestinationModalOpen}
                  />
                ))}
            </ScrollView>
          </View> */}

          {/**
           * Top cities
           */}
          <CitiesContainer title="Top Cities" cities={cities} />

          {Object.keys(countriesAreNotPopularMap).length
            ? Object.keys(countriesAreNotPopularMap).map((continent) => (
                <DestinationContainer
                  key={`DestinationContainer-${continent}`}
                  title={continent}
                  countries={countriesAreNotPopularMap[continent]}
                />
              ))
            : null}
        </ScrollView>

        <Portal>
          <Modalize
            ref={BucketListModalRef}
            modalTopOffset={65}
            disableScrollIfPossible
            adjustToContentHeight
            HeaderComponent={
              <View style={[styles.rowItemHeader, { paddingTop: 15 }]}>
                <Text style={styles.h2}>Bucket List</Text>
              </View>
            }
            modalStyle={{
              backgroundColor: "#F2F2F7",
              minHeight: "80%",
            }}
          >
            <BucketlistModal />
          </Modalize>
        </Portal>
        {searchActive ? (
          <View
            style={{
              position: "absolute",
              backgroundColor: "#fff",
              top: 110,
              left: 0,
              width: "100%",
              height: SIZES.height - 170,
            }}
          >
            <CountrySearch
              modalDestinationSearchRef={modalDestinationSearchRef}
            />
          </View>
        ) : null}

        <Portal>
          <Modalize ref={modalCountryPassportSelectRef} modalTopOffset={65}>
            <CountrySelect />
          </Modalize>
        </Portal>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f8f8f8",
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
  bucketListButton: {
    minWidth: 40,
    height: 40,
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
    height: 40,
    paddingLeft: 10,
    fontSize: 14,
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
