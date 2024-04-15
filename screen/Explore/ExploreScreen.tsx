import React, { useCallback, useRef, useState } from "react";

import {
  Alert,
  Keyboard,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Constants from "expo-constants";

import { Portal } from "react-native-portalize";
import { Modalize } from "react-native-modalize";

import { COLORS, SIZES } from "../../styles/theme";
import {
  DotsIcon,
  FlightIcon,
  Mark2,
  SearchIcon,
  VertDots,
  XIcon,
} from "../../utilities/SvgIcons.utility";

import { CountrySelect } from "../../common/components/CountrySelect";
import { CountrySearch } from "../../common/components/CountrySearch";

import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ExploreRoutesStackParamList } from "../../routes/explore/ExploreRoutes";
import {
  useCountriesQuery,
  useGetCitiesQuery,
  useRandomSightQuery,
} from "../../api/api.trekspot";

import { BucketlistModal } from "../../common/components/BucketlistModal";
import { DestinationContainer } from "../../components/explore/DestinationContainer";
import { CitiesContainer } from "../../components/explore/CitiesContainer";
import { ExploreSightListContainer } from "../../components/explore/ExploreSightListContainer";
import {
  SkeletonLoaderCountry,
  SkeletonLoaderImage,
} from "../../common/ui/Skeleton";
import { LinearGradient } from "expo-linear-gradient";

type ExploreProps = NativeStackScreenProps<
  ExploreRoutesStackParamList,
  "ExploreWorld"
>;

export const ExploreScreen: React.FC<ExploreProps> = (props) => {
  // refs
  const BucketListModalRef = useRef<Modalize>(null);
  const modalDestinationSearchRef = useRef<Modalize>(null);
  const modalCountryPassportSelectRef = useRef<Modalize>(null);

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

  const { data: randomSightsData, isLoading: isRandomSightsLoading } =
    useRandomSightQuery({ take: 10 });

  const [searchActive, setSearchActive] = useState(false);

  const onBucketlistOpen = useCallback(() => {
    if (BucketListModalRef.current) BucketListModalRef.current.open();
  }, []);

  /**
   * Transform data
   */

  const cities = data && data.cities ? data.cities : [];

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
                <Mark2 size={16} color={COLORS.black} />
              </TouchableOpacity>
            )}
          </View>
        </View>

        <View
          style={{
            paddingHorizontal: 15,
          }}
        >
          <TouchableOpacity style={styles.currentTrip} activeOpacity={0.7}>
            <View style={styles.currentTripLeft}>
              <View style={styles.currentTripIcon}>
                <FlightIcon color={COLORS.primary} />
              </View>
              <View>
                <Text style={styles.currentTripTitle}>Dubai trip</Text>
                <Text style={styles.currentTripTitleDate}>12 Feb - 20 Feb</Text>
              </View>
            </View>

            <TouchableOpacity
              style={styles.currentTripDotsButton}
              onPress={() =>
                Alert.alert("Do you want to hide trip?", "", [
                  {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel",
                  },
                  {
                    text: "Hide",
                    onPress: () => console.log("OK Pressed"),
                    style: "destructive",
                  },
                ])
              }
            >
              <VertDots color={COLORS.primaryDark} />
            </TouchableOpacity>
          </TouchableOpacity>
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
            seeAllItems={false}
            popularCountriesLoading={popularCountriesLoading}
          />

          {/**
           * Top cities
           */}
          <CitiesContainer
            title="Top Cities"
            cities={cities}
            seeAllItems={false}
            isCitiesLoading={isCitiesLoading}
          />

          {/**
           * Top sights
           */}

          <ExploreSightListContainer
            items={(randomSightsData && randomSightsData.randomSights) || []}
            title="Top sights"
            isRandomSightsLoading={isRandomSightsLoading}
          />

          {/* <DestinationContainer title="South America" countries={[]} /> */}
        </ScrollView>

        <Portal>
          <Modalize
            ref={BucketListModalRef}
            modalTopOffset={65}
            disableScrollIfPossible
            adjustToContentHeight
            velocity={100000}
            tapGestureEnabled={false}
            closeSnapPointStraightEnabled={false}
            HeaderComponent={
              <View style={[styles.rowItemHeader, { paddingTop: 15 }]}>
                <Text style={styles.h2}>Bucket List</Text>

                <TouchableOpacity
                  onPress={() => BucketListModalRef?.current?.close()}
                  activeOpacity={0.7}
                  style={styles.closeButton}
                >
                  <XIcon width="13" height="13" />
                </TouchableOpacity>
              </View>
            }
            modalStyle={{
              backgroundColor: "#F2F2F7",
              minHeight: "90%",
            }}
            scrollViewProps={{
              showsVerticalScrollIndicator: false,
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
    paddingTop: Platform.OS === "android" ? Constants?.statusBarHeight + 10 : 0,
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
    marginTop: 10,
    borderWidth: 1,
    borderColor: "#dac9dc",
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
    width: 35,
    height: 35,
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
