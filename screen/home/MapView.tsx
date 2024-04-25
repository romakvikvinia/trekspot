import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import {
  LivedIcon,
  Mark,
  Share,
  VisitedIcon,
} from "../../utilities/SvgIcons.utility";
import { Modalize } from "react-native-modalize";
import { Portal } from "react-native-portalize";
import { FlashList } from "@shopify/flash-list";
import { CountriesList, ICountry } from "../../utilities/countryList";
import { COLORS, SIZES } from "../../styles/theme";
import Constants from "expo-constants";

import ShareModal from "../../common/components/ShareModal";
import { CountryItem } from "../../components/home/CountryItem";
import {
  useUpdateMeMutation,
  trekSpotApi,
  useAnalyticsQuery,
} from "../../api/api.trekspot";
import {
  getCountries,
  storeInitialCountryCodes,
} from "../../helpers/secure.storage";
import { AnalyticsType } from "../../api/api.types";
import { formatPercentage } from "../../helpers/number.helper";
import { useDispatch } from "react-redux";
import { debounce } from "../../helpers/debounce.helper";
import { MapSvg } from "../../utilities/svg/map";
import { SkeletonLoaderImage } from "../../common/ui/Skeleton";

interface MapVIewProps {
  analytic?: AnalyticsType;
}

export const MapView: React.FC<MapVIewProps> = ({ analytic }) => {
  const dispatch = useDispatch();
  const [state, setState] = useState<{
    countries: ICountry[];
    visited_countries: string[];
    lived_countries: string[];
    search: string;
  }>({
    search: "",
    visited_countries: [],
    lived_countries: [],
    countries: CountriesList,
  });
  const { data: analyticsData, isLoading, isSuccess } = useAnalyticsQuery();
  const [refetch, { data, isSuccess: isMeSuccess }] =
    trekSpotApi.endpoints.me.useLazyQuery();

  const [updateMe, { isSuccess: isUpdateMeSuccess, data: updateMeData }] =
    useUpdateMeMutation();
  const modalRef = useRef<Modalize>(null);
  const shareModalRef = useRef<Modalize>(null);

  const onOpen = useCallback(() => {
    if (modalRef.current) modalRef.current.open();
  }, []);

  const onShareModalOpen = useCallback(() => {
    if (shareModalRef.current) shareModalRef.current.open();
  }, []);

  const handleCountriesModalClose = useCallback(async () => {
    let visited_countries = await getCountries();
    let lived_countries = await getCountries("lived_countries");

    const payload: {
      visited_countries?: string[];
      lived_countries?: string[];
    } = { visited_countries: [], lived_countries: [] };

    if (visited_countries && Array.isArray(visited_countries))
      payload.visited_countries = visited_countries;

    if (lived_countries && Array.isArray(lived_countries))
      payload.lived_countries = lived_countries;

    updateMe(payload);
  }, []);

  /**
   * First fetch about me
   */
  const handleFirstFetchMeInfo = useCallback(async () => {
    if (isMeSuccess && data && data.me) {
      const visited_countries = data.me.visited_countries.map((i) => i.iso2);
      const lived_countries = data.me.lived_countries.map((i) => i.iso2);
      storeInitialCountryCodes("visited_countries", visited_countries);
      storeInitialCountryCodes("lived_countries", lived_countries);
      setState((prevState) => ({
        ...prevState,
        visited_countries,
        lived_countries,
      }));
    }
  }, [isMeSuccess, data]);

  /**
   * handle fetch update me
   */

  const handleUpdateMeSuccess = useCallback(() => {
    if (isUpdateMeSuccess && updateMeData && updateMeData.updateMe) {
      const visited_countries = updateMeData.updateMe.visited_countries.map(
        (i) => i.iso2
      );
      const lived_countries = updateMeData.updateMe.lived_countries.map(
        (i) => i.iso2
      );

      setState((prevState) => ({
        ...prevState,
        visited_countries,
        lived_countries,
        search: "",
      }));
      dispatch(trekSpotApi.util.invalidateTags(["analytics"]));
      dispatch(trekSpotApi.util.invalidateTags(["me"]));
    }
  }, [isUpdateMeSuccess, dispatch]);

  useEffect(() => {
    handleFirstFetchMeInfo();
  }, [handleFirstFetchMeInfo]);

  useEffect(() => {
    handleUpdateMeSuccess();
  }, [handleUpdateMeSuccess]);

  useEffect(() => {
    if (refetch) refetch();
  }, [refetch]);

  const handelSearch = debounce(
    useCallback((search: string) => {
      setState((prevState) => ({
        ...prevState,
        search,
      }));
    }, []),
    1000
  );

  //

  // transform data

  let world =
    analyticsData?.analytics && analyticsData?.analytics.achievedCountries
      ? (analyticsData?.analytics.achievedCountries /
          analyticsData?.analytics.availableCountries) *
        100
      : 0;
  world = formatPercentage(world);

  let countriesOnMap: string[] = [];

  if (state.lived_countries.length >= state.visited_countries.length) {
    countriesOnMap = state.lived_countries;
    state.visited_countries.forEach((code) => {
      if (!countriesOnMap.includes(code)) {
        countriesOnMap.push(code);
      }
    });
  } else {
    countriesOnMap = state.visited_countries;
    state.lived_countries.forEach((code) => {
      if (!countriesOnMap.includes(code)) {
        countriesOnMap.push(code);
      }
    });
  }

  const filteredCountries =
    state.search && state.search.length > 1
      ? state.countries.filter((i) =>
          i.name.toLowerCase().includes(state.search.toLowerCase())
        )
      : state.countries;

  return (
    <>
      <View style={styles.mapContainer}>
        <View style={styles.topActions}>
          <View style={styles.left}>
            <TouchableOpacity
              onPress={() => onOpen()}
              style={[styles.btn, { marginRight: 10 }]}
            >
              <Mark size="15" />
              <Text style={styles.txt}>Add Visit</Text>
            </TouchableOpacity>
          </View>
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity
              style={styles.btn}
              onPress={() => onShareModalOpen()}
            >
              <Share />
              <Text style={styles.txt}>Share</Text>
            </TouchableOpacity>
          </View>
        </View>

        {isLoading ? (
          <View
            style={{
              width: "100%",
              height: 300,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ActivityIndicator color={COLORS.primaryDark} />
          </View>
        ) : (
          <>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => onOpen()}
              style={{
                padding: 15,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <MapSvg
                width={SIZES.width < 370 ? 340 : 370}
                countries={countriesOnMap}
              />
            </TouchableOpacity>

            <View style={styles.row}>
              <View style={[styles.rowBox]}>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Text style={styles.lg}>{world}</Text>
                  <Text
                    style={[
                      styles.sublabel,
                      { marginLeft: 2, marginBottom: 2 },
                    ]}
                  >
                    %
                  </Text>
                </View>

                <Text style={styles.statLabel}>World</Text>
              </View>
              <View style={[styles.rowBox]}>
                <View style={styles.amountView}>
                  <Text style={styles.lg}>
                    {analyticsData?.analytics &&
                    analyticsData?.analytics.achievedCountries
                      ? analyticsData?.analytics.achievedCountries
                      : 0}
                  </Text>
                  <View style={styles.labelView}>
                    <Text style={styles.sublabel}>/</Text>
                    <Text style={[styles.sublabel, { marginTop: 2 }]}>
                      {analyticsData?.analytics &&
                      analyticsData?.analytics.availableCountries
                        ? analyticsData?.analytics.availableCountries
                        : 0}
                    </Text>
                  </View>
                </View>

                <Text style={styles.statLabel}>Countries</Text>
              </View>
              <View style={[styles.rowBox]}>
                <View style={styles.amountView}>
                  <Text style={styles.lg}>
                    {analyticsData?.analytics &&
                    analyticsData?.analytics.territories &&
                    analyticsData?.analytics.territories.quantity
                      ? analyticsData?.analytics.territories.quantity
                      : 0}
                  </Text>
                  <View style={styles.labelView}>
                    <Text style={styles.sublabel}>/</Text>
                    <Text style={[styles.sublabel, { marginTop: 2 }]}>6</Text>
                  </View>
                </View>
                <Text style={styles.statLabel}>Territories</Text>
              </View>
            </View>
          </>
        )}
      </View>

      <Portal>
        <Modalize
          ref={modalRef}
          modalTopOffset={65}
          onClosed={handleCountriesModalClose}
          HeaderComponent={
            <View style={styles.modalHeader}>
              {Platform.OS === "ios" ? (
                <TextInput
                  style={styles.searchInput}
                  placeholder="Search..."
                  placeholderTextColor={COLORS.darkgray}
                  onChangeText={handelSearch}
                />
              ) : null}

              <View style={styles.infoRow}>
                <Text style={styles.countryAmount}>UN 195 Countries</Text>
                <View style={styles.lengend}>
                  <View style={styles.legendItem}>
                    <VisitedIcon />
                    <Text style={styles.legendItemText}>Visited</Text>
                  </View>
                  <View style={styles.legendItem}>
                    <LivedIcon />
                    <Text style={styles.legendItemText}>Lived</Text>
                  </View>
                </View>
              </View>
            </View>
          }
          modalStyle={{ flex: 1 }}
        >
          <View style={{ flex: 1, height: SIZES.height - 200 }}>
            <FlashList
              // keyExtractor={(item) =>
              //   `${item.iso2}-${item.name}-${item.capital}`
              // }
              extraData={filteredCountries}
              data={filteredCountries}
              renderItem={({ item }) => (
                <CountryItem
                  {...item}
                  visited_countries={state.visited_countries}
                  lived_countries={state.lived_countries}
                />
              )}
              estimatedItemSize={200}
            />
          </View>
        </Modalize>
      </Portal>

      <Portal>
        <Modalize ref={shareModalRef} modalTopOffset={65} adjustToContentHeight>
          <ShareModal
            key={`share-on-map-${world}`}
            countries={countriesOnMap}
            world={world}
            achievedCountries={
              analyticsData?.analytics &&
              analyticsData?.analytics.achievedCountries
                ? analyticsData?.analytics.achievedCountries
                : 0
            }
            territories={
              analyticsData?.analytics &&
              analyticsData?.analytics.territories &&
              analyticsData?.analytics.territories.quantity
                ? analyticsData?.analytics.territories.quantity
                : 0
            }
          />
        </Modalize>
      </Portal>
    </>
  );
};

const styles = StyleSheet.create({
  modalHeader: {
    width: "100%",
    padding: 15,
  },

  infoRow: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
    borderBottomWidth: 1,
    paddingBottom: 10,
    borderColor: "#efefef",
  },
  countryAmount: {
    color: COLORS.darkgray,
    fontSize: SIZES.body4,
  },
  lengend: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  legendItem: {
    flexDirection: "row",
    marginLeft: 15,
  },
  legendItemText: {
    marginLeft: 5,
    fontSize: SIZES.body4,
    color: COLORS.darkgray,
  },
  searchInput: {
    height: 40,
    backgroundColor: "#ececec",
    borderRadius: SIZES.radius * 5,
    paddingLeft: 20,
    fontSize: 16,
    color: COLORS.black,
  },
  mapContainer: {
    marginBottom: 15,
   },
  map: {
    flex: 1,
  },

  left: {
    flexDirection: "row",
    display: "flex",
    flex: 1,
  },
  btn: {
    backgroundColor: "#fff",
    height: 38,
    paddingHorizontal: 15,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    flexDirection: "row",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.05,
    shadowRadius: 3.84,
    elevation: 0.5,
  },

  amountView: {
    flexDirection: "row",
    alignItems: "center",
  },
  labelView: {
    position: "relative",
    bottom: 3,
    marginLeft: 4,
    flexDirection: "row",
    alignItems: "center",
  },
  txt: {
    fontSize: 14,
    marginLeft: 5,
    color: "#333",
  },
  sublabel: {
    fontSize: 14,
    position: "relative",
    flexDirection: "row",
    alignItems: "center",
    lineHeight: 25,
    color: COLORS.darkgray,
  },
  statLabel: {
    fontSize: 12,
    color: COLORS.darkgray,
  },
  topActions: {
    width: "100%",
    flexDirection: "row",
    display: "flex",
    paddingHorizontal: 15,
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 15,
  },
  rowBox: {
    width: "32%",
    height: 90,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
    backgroundColor: "#f8f8f8",
    borderColor: "#fff",
    borderWidth: 2,
    borderStyle: "solid",
  },
  row: {
    flexDirection: "row",
    display: "flex",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    marginTop: 0,
    marginBottom: 8,
  },
  lg: {
    fontSize: 24,
    marginBottom: 8,
    fontWeight: "bold",
    position: "relative",
    color: COLORS.primaryDark,
  },
});
