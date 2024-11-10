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
  ClearIcon,
  MarkLinear,
  SearchIcon,
  Share,
  VisitedIcon,
} from "../../utilities/SvgIcons.utility";
import { Modalize } from "react-native-modalize";
import { Portal } from "react-native-portalize";
import { FlashList } from "@shopify/flash-list";

import { COLORS, SIZES } from "../../styles/theme";

import ShareModal from "../../common/components/ShareModal";
import { CountryItem } from "../../components/home/CountryItem";
import {
  useAllCountriesQuery,
  useCreateAnalyticsMutation,
} from "../../api/api.trekspot";

import { formatPercentage } from "../../helpers/number.helper";

import { MapSvg } from "../../utilities/svg/map";

import { useAppSelector } from "../../package/store";
import { useTripStore } from "../../package/zustand/store";
import { GuestUserModal } from "../../common/components/GuestUserModal";
import { useFocusEffect } from "@react-navigation/native";
import { CountryType } from "../../api/api.types";
import { useCountriesStore } from "../../package/zustand/countries.store";

interface MapVIewProps {
  isLoading?: boolean;
  world?: number;
  countryQuantity?: number;
  visitedCountries?: number;
  territories?: number;
}

export const MapView: React.FC<MapVIewProps> = ({
  world = 0,
  countryQuantity = 0,
  visitedCountries = 0,
  territories = 0,
  isLoading = true,
}) => {
  const { user } = useAppSelector((state) => state.auth);
  // const reduxCountries = useCountriesStore();

  const [searchValue, setSearchValue] = useState("");

  const [state, setState] = useState<{
    countries: CountryType[];
    countriesOnMap: string[];
    hideMap: boolean;
  }>({
    countries: [],
    countriesOnMap: [],
    hideMap: false,
  });

  const { data: countryList } = useAllCountriesQuery({});
  const [fetchCreateAnalytics] = useCreateAnalyticsMutation();

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
    if (modalRef.current) {
      // setState((prevState) => ({ ...prevState, hideMap: true }));
      modalRef.current.open();
    }
  }, []);

  const onShareModalOpen = useCallback(() => {
    if (shareModalRef.current) shareModalRef.current.open();
  }, []);

  const handleCountriesModalClose = useCallback(async () => {
    // setState((prevState) => ({ ...prevState, hideMap: false }));
    setSearchValue("");
    // if (Object.keys(reduxCountries.visitedCountries).length) {
    //   fetchCreateAnalytics({
    //     countries: Object.keys(reduxCountries.visitedCountries),
    //   });
    // }
  }, []);

  const handelSearch = (search: string) => {
    setSearchValue(search);
  };

  useEffect(() => {
    if (countryList && countryList.allCountries) {
      setState((prevState) => ({
        ...prevState,
        countries: countryList.allCountries,
      }));
    }
  }, [countryList]);

  // transform data

  const isGuest = user?.role === "guest";

  const filteredCountries =
    searchValue && searchValue.length > 1
      ? state.countries.filter((i) =>
          i.name.toLowerCase().includes(searchValue.toLowerCase())
        )
      : state.countries;

  const resetSearch = () => {
    setSearchValue("");
  };

  const handleAddVisit = () => {
    if (guestActivityCount >= 3 && isGuest) {
      setShowGuestModal(true);
      return;
    } else {
      onOpen();
    }
  };

  const handleShare = () => {
    if (guestActivityCount >= 3 && isGuest) {
      setShowGuestModal(true);
      return;
    } else {
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
  //

  console.log("here");

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
            {!state.hideMap ? <DrownMap /> : null}

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
                  <Text style={styles.lg}>{visitedCountries}</Text>
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
                  <TouchableOpacity
                    style={styles.cancelButton}
                    onPress={() => modalRef?.current?.close()}
                  >
                    <Text style={styles.cancelButtonText}>Cancel</Text>
                  </TouchableOpacity>
                </View>
              ) : null}

              <View style={styles.infoRow}>
                <Text style={styles.countryAmount}>UN 195 Countries</Text>
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
        >
          <View style={{ flex: 1, height: SIZES.height - 200 }}>
            <FlashList
              // keyExtractor={(item) =>
              //   `${item.iso2}-${item.name}-${item.capital}`
              // }
              extraData={filteredCountries}
              data={filteredCountries}
              renderItem={({ item }) => <CountryItem country={item} />}
              estimatedItemSize={100}
              contentContainerStyle={{ paddingTop: 15 }}
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
            achievedCountries={visitedCountries}
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
  modalHeader: {
    width: "100%",
    paddingHorizontal: 15,
    flexWrap: "wrap",
    paddingVertical: 0,
    height: 100,
  },
  searchBox: {
    flex: 1,
    backgroundColor: "#fff",
    flexDirection: "row",
    borderRadius: 30,
    alignItems: "center",
    position: "relative",
    width: "100%",
  },
  searchIcon: {
    paddingLeft: 15,
    position: "absolute",
    zIndex: 1,
  },
  clearButton: {
    position: "absolute",
    width: 25,
    height: 25,
    top: 7,
    right: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  infoRow: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 5,
    borderBottomWidth: 1,
    paddingBottom: 10,
    borderColor: "#efefef",
  },
  cancelButton: {
    marginLeft: 10,
    justifyContent: "center",
  },
  cancelButtonText: {
    fontSize: 14,
    color: COLORS.darkgray,
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
    paddingLeft: 40,
    fontSize: 16,
    color: COLORS.black,
    flex: 1,
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
