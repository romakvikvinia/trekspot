import { FlashList } from "@shopify/flash-list";
import { usePostHog } from "posthog-react-native";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Modalize } from "react-native-modalize";
import { Portal } from "react-native-portalize";

import {
  trekSpotApi,
  useAllCountriesQuery,
  useCreateAnalyticsMutation,
  useVisitedCountriesQuery,
} from "../../api/api.trekspot";
import { AnalyticType, CountryType } from "../../api/api.types";
import { GuestUserModal } from "../../common/components/GuestUserModal";
import ShareModal from "../../common/components/ShareModal";
import { CountryItem } from "../../components/home/CountryItem";
import { formatPercentage } from "../../helpers/number.helper";
import {
  deleteFromAsyncStorage,
  getCountries,
  storeInitialCountries,
} from "../../helpers/secure.storage";
import { useAppDispatch, useAppSelector } from "../../package/store";
import { useTripStore } from "../../package/zustand/store";
import { COLORS, SIZES } from "../../styles/theme";
import { Events } from "../../utilities/Posthog";
import { MapSvg } from "../../utilities/svg/map";
import {
  ClearIcon,
  MarkLinear,
  SearchIcon,
  Share,
  VisitedIcon,
} from "../../utilities/SvgIcons.utility";

interface MapVIewProps {
  isLoading?: boolean;
  world?: number;
  countryQuantity?: number;
  visitedCountries: AnalyticType[];
  territories?: number;
  continent?: string;
  setContinent?: any;
}

export const MapView: React.FC<MapVIewProps> = ({
  world = 0,
  countryQuantity = 0,
  visitedCountries,
  territories = 0,
  isLoading = true,
  continent,
  setContinent
}) => {
  const posthog = usePostHog();
  const dispatch = useAppDispatch();

  const {
    isLoading: isVisitedCountries,
    data: visitedCountriesData,
    isSuccess: isVisitedCountriesSuccess,
  } = useVisitedCountriesQuery();

  const { user } = useAppSelector((state) => state.auth);

  const [searchValue, setSearchValue] = useState("");

  const [state, setState] = useState<{
    countries: CountryType[];
    countriesOnMap: string[];
    visitedCountries: Record<string, string>;
    hideMap: boolean;
  }>({
    countries: [],
    countriesOnMap: [],
    hideMap: false,
    visitedCountries: {},
  });

  const { data: countryList } = useAllCountriesQuery({});
  const [
    fetchCreateAnalytics,
    {
      isLoading: isUpdateAnalyticsLoading,
      isSuccess: isUpdateAnalyticsSuccess,
    },
  ] = useCreateAnalyticsMutation();

  const modalRef = useRef<Modalize>(null);
  const shareModalRef = useRef<Modalize>(null);

  const [showGuestModal, setShowGuestModal] = React.useState(false);
  const { guestActivityCount, increaseGuestActivityCount } = useTripStore(
    (state) => ({
      //@ts-ignore
      increaseGuestActivityCount: state.increaseGuestActivityCount,
      //@ts-ignore
      guestActivityCount: state.guestActivityCount,
    })
  );

  const onOpen = useCallback(() => {
    if (guestActivityCount >= 3 && user?.role === "guest") {
      setShowGuestModal(true);
      return;
    } else {
      increaseGuestActivityCount();
    }

    if (modalRef.current) {
      setState((prevState) => ({ ...prevState, hideMap: true }));
      modalRef.current.open();
    }
  }, []);

  const onShareModalOpen = useCallback(() => {
    if (shareModalRef.current) shareModalRef.current.open();
  }, []);

  const handleCountriesModalClose = useCallback(async () => {
    setSearchValue("");
    setContinent(null);

    const visitedCountries = await getCountries();

    console.log("must store", visitedCountries);

    await fetchCreateAnalytics({
      countries: Object.keys(visitedCountries) || [],
    }).unwrap();

    dispatch(
      trekSpotApi.util.invalidateTags(["visitedCountries", "analytics"])
    );
    setState((prevState) => ({
      ...prevState,
      hideMap: false,
      countriesOnMap: Object.values(visitedCountries),
      visitedCountries: visitedCountries ? visitedCountries : {},
    }));
  }, []);

  const handelSearch = (search: string) => {
    setSearchValue(search);
  };

  useEffect(() => {
    (async () => {
      if (countryList && countryList.allCountries) {
        setState((prevState) => ({
          ...prevState,
          countries: countryList.allCountries,
          hideMap: false,
        }));
      }
    })();
  }, [countryList]);

  useEffect(() => {
    (async () => {
      console.log("visitedCountriesData", visitedCountriesData);
      if (
        visitedCountriesData &&
        visitedCountriesData.visitedCountries.length
      ) {
        const visitedCountries: any = {};

        visitedCountriesData.visitedCountries.forEach((i) => {
          visitedCountries[i.id] = i.iso2;
        });
        console.log("visitedCountries", visitedCountries);
        setState((prevState) => ({
          ...prevState,
          visitedCountries,
          countriesOnMap: visitedCountries
            ? Object.values(visitedCountries)
            : [],
        }));
        await storeInitialCountries(visitedCountries);
      } else {
        console.log("clearing storage");
        await deleteFromAsyncStorage("visited_countries");
        setState((prevState) => ({
          ...prevState,
          visitedCountries: {},
          countriesOnMap: [],
        }));
      }
    })();
  }, [visitedCountriesData]);

  
  const isGuest = user?.role === "guest";
 
  const handleAddVisit = () => {
    if (guestActivityCount >= 3 && isGuest) {
      setShowGuestModal(true);
      return;
    } else {
      posthog.capture(Events.UserOpensAddVisitModal, {});
      onOpen();
    }
  };

  const filteredCountries = useMemo(() => {
    if(continent) {
      handleAddVisit();

      if(searchValue && searchValue.length > 1) {
        return state.countries.filter((country) => country.continents[0] === continent && country.name.toLowerCase().includes(searchValue.toLowerCase()));
      }

      return state.countries.filter((country) => country.continents[0] === continent);
    }
  const other = searchValue && searchValue.length > 1
    ? state.countries.filter((i) =>
        i.name.toLowerCase().includes(searchValue.toLowerCase())
      )
    : // .sort((a, b) => b.name.localeCompare(a.name))
      state.countries;
    return other;
  }, [searchValue, state.countries, continent]);

  const resetSearch = () => {
    setSearchValue("");
  };
 
  const handleShare = () => {
    if (guestActivityCount >= 3 && isGuest) {
      setShowGuestModal(true);
      return;
    } else {
      posthog.capture(Events.UserOpensShareStats, {});
      onShareModalOpen();
    }
  };

  const DrownMap = () =>
    React.useMemo(() => {
      return (
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
            countries={state.countriesOnMap}
            color={COLORS.primary}
          />
        </TouchableOpacity>
      );
    }, [state.countriesOnMap]);
   
  return (
    <>
      <View style={styles.mapContainer}>
        <View style={styles.topActions}>
          <View style={styles.left}>
            <TouchableOpacity
              onPress={handleAddVisit}
              style={[styles.btn, { marginRight: 10 }]}
            >
              <MarkLinear size="15" color={COLORS.black} />
              <Text style={styles.txt}>Add Visit</Text>
            </TouchableOpacity>
          </View>
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity style={styles.btn} onPress={handleShare}>
              <Share />
              <Text style={styles.txt}>Share</Text>
            </TouchableOpacity>
          </View>
        </View>

        {isLoading ? (
          <View style={styles.loadingWrapper}>
            <ActivityIndicator color={COLORS.primaryDark} />
          </View>
        ) : (
          <>
            {!state.hideMap &&
            !isUpdateAnalyticsLoading &&
            !isVisitedCountries ? (
              <>
                <DrownMap />
                <View style={styles.row}>
                  <View style={[styles.rowBox]}>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <Text style={styles.lg}>{formatPercentage(world)}</Text>
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
                      <Text style={styles.lg}>{visitedCountries.length}</Text>
                      <View style={styles.labelView}>
                        <Text style={styles.sublabel}>/</Text>
                        <Text style={[styles.sublabel, { marginTop: 2 }]}>
                          {countryQuantity}
                        </Text>
                      </View>
                    </View>

                    <Text style={styles.statLabel}>Countries</Text>
                  </View>
                  <View style={[styles.rowBox]}>
                    <View style={styles.amountView}>
                      <Text style={styles.lg}>{territories} </Text>
                      <View style={styles.labelView}>
                        <Text style={styles.sublabel}>/</Text>
                        <Text style={[styles.sublabel, { marginTop: 2 }]}>
                          6
                        </Text>
                      </View>
                    </View>
                    <Text style={styles.statLabel}>Territories</Text>
                  </View>
                </View>
              </>
            ) : (
              <View style={[styles.loadingWrapper, { height: 372 }]}>
                <ActivityIndicator color={COLORS.primaryDark} />
              </View>
            )}
          </>
        )}
      </View>

      <Portal>
        <Modalize
          key={`modal-${state.countriesOnMap.length}`}
          ref={modalRef}
          modalTopOffset={65}
          onClosed={handleCountriesModalClose}
          withHandle={false}
          panGestureEnabled={false}
          adjustToContentHeight
          HeaderComponent={
            <View style={styles.modalHeader}>
              <View
                style={{
                  flexDirection: "row",
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <View style={styles.searchBox}>
                  <View style={styles.searchIcon}>
                    <SearchIcon width={15} />
                  </View>
                  <TextInput
                    autoCorrect={false}
                    style={styles.searchInput}
                    placeholder="Search..."
                    placeholderTextColor={COLORS.darkgray}
                    onChangeText={handelSearch}
                    value={searchValue}
                  />

                  {searchValue ? (
                    <TouchableOpacity
                      onPress={resetSearch}
                      style={styles.clearButton}
                      activeOpacity={0.7}
                    >
                      <ClearIcon />
                    </TouchableOpacity>
                  ) : null}
                </View>
                <Pressable
                  style={styles.cancelButton}
                  onPress={() => modalRef?.current?.close()}
                  hitSlop={20}
                >
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </Pressable>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.countryAmount}>
                  {continent ? continent : "UN 195 Countries"}
                </Text>
                <View style={styles.lengend}>
                  <View style={styles.legendItem}>
                    <VisitedIcon />
                    <Text style={styles.legendItemText}>Visited</Text>
                  </View>
                  {/* <View style={styles.legendItem}>
                    <LivedIcon />
                    <Text style={styles.legendItemText}>Lived</Text>
                  </View> */}
                </View>
              </View>
            </View>
          }
          modalStyle={{ flex: 1 }}
          scrollViewProps={{
            keyboardShouldPersistTaps: "handled",
          }}
        >
          <View style={{ flex: 1, height: SIZES.height - 200 }}>
            <FlashList
              // keyExtractor={(item) =>
              //   `${item.id}-${state.visitedCountries[item.id] ? item.id : ""}`
              // }
              extraData={filteredCountries}
              data={filteredCountries}
              renderItem={({ item }) => (
                <CountryItem
                  key={`${item.id}-item-${
                    state.visitedCountries[item.id] ? item.id : ""
                  }`}
                  country={{ ...item }}
                  visitedCountries={state.visitedCountries}
                />
              )}
              estimatedItemSize={100}
              contentContainerStyle={{ paddingTop: 15 }}
              keyboardShouldPersistTaps="handled"
            />
          </View>
        </Modalize>
      </Portal>

      <Portal>
        <Modalize ref={shareModalRef} modalTopOffset={65} adjustToContentHeight>
          <ShareModal
            key={`share-on-map-${world}`}
            countries={state.countriesOnMap}
            world={world}
            achievedCountries={visitedCountries.length}
            territories={territories}
          />
        </Modalize>
      </Portal>

      {showGuestModal && (
        <GuestUserModal onClose={() => setShowGuestModal(false)} />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  amountView: {
    alignItems: "center",
    flexDirection: "row",
  },
  btn: {
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 20,
    display: "flex",
    elevation: 0.5,
    flexDirection: "row",
    height: 38,
    justifyContent: "center",
    paddingHorizontal: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.05,
    shadowRadius: 3.84,
  },
  cancelButton: {
    justifyContent: "center",
    marginLeft: 10,
  },
  cancelButtonText: {
    color: COLORS.darkgray,
    fontSize: 14,
    fontWeight: "500"
  },
  clearButton: {
    alignItems: "center",
    height: 25,
    justifyContent: "center",
    position: "absolute",
    right: 10,
    top: 7,
    width: 25,
  },
  countryAmount: {
    color: COLORS.darkgray,
    fontSize: SIZES.body4,
  },
  infoRow: {
    borderBottomWidth: 1,
    borderColor: "#efefef",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 5,
    paddingBottom: 10,
    width: "100%",
  },
  labelView: {
    alignItems: "center",
    bottom: 3,
    flexDirection: "row",
    marginLeft: 4,
    position: "relative",
  },
  left: {
    display: "flex",
    flexDirection: "row",
    flex: 1,
  },
  legendItem: {
    flexDirection: "row",
    marginLeft: 15,
  },
  legendItemText: {
    color: COLORS.darkgray,
    fontSize: SIZES.body4,
    marginLeft: 5,
  },
  lengend: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  lg: {
    color: COLORS.primaryDark,
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
    position: "relative",
  },
  loadingWrapper: {
    alignItems: "center",
    height: 372,
    justifyContent: "center",
    width: "100%",
  },
  map: {
    flex: 1,
  },

  mapContainer: {
    marginBottom: 15,
  },
  modalHeader: {
    flexWrap: "wrap",
    height: 100,
    paddingHorizontal: 15,
    paddingVertical: 0,
    width: "100%",
  },

  row: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
    marginTop: 0,
    paddingHorizontal: 15,
    position: "relative",
    top: 10,
  },
  rowBox: {
    alignItems: "center",
    backgroundColor: "#fff",
    borderColor: "#fff",
    borderRadius: 15,
    borderStyle: "solid",
    borderWidth: 2,
    display: "flex",
    height: 90,
    justifyContent: "center",
    width: "32%",
  },
  searchBox: {
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 30,
    flex: 1,
    flexDirection: "row",
    position: "relative",
    width: "100%",
  },
  searchIcon: {
    paddingLeft: 15,
    position: "absolute",
    zIndex: 1,
  },
  searchInput: {
    backgroundColor: "#ececec",
    borderRadius: SIZES.radius * 5,
    color: COLORS.black,
    flex: 1,
    fontSize: 16,
    height: 40,
    paddingLeft: 40,
  },
  statLabel: {
    color: COLORS.darkgray,
    fontSize: 12,
    fontWeight: "500",
  },
  sublabel: {
    alignItems: "center",
    color: COLORS.darkgray,
    flexDirection: "row",
    fontSize: 14,
    lineHeight: 25,
    position: "relative",
  },
  topActions: {
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 15,
    paddingHorizontal: 15,
    width: "100%",
  },
  txt: {
    color: "#333",
    fontSize: 14,
    marginLeft: 5,
  },
});
