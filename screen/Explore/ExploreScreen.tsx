import React, { useCallback, useRef, useState } from "react";
import { COLORS, SIZES } from "../../styles/theme";

import {
  ImageBackground,
  Keyboard,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";

import {
  Mark,
  PassportIcon,
  SearchIcon,
  StarIcon,
} from "../../utilities/SvgIcons.utility";
import { LinearGradient } from "expo-linear-gradient";
import { CountrySelect } from "../../common/components/CountrySelect";
import { CountrySearch } from "../../common/components/CountrySearch";
import { DestinationDetail } from "../../common/components/DestinationDetail";
import { Portal } from "react-native-portalize";
import { Modalize } from "react-native-modalize";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ExploreRoutesStackParamList } from "../../routes/explore/ExploreRoutes";
import { useCountriesQuery } from "../../api/api.trekspot";
import { CountryItem } from "../../components/explore/CountryItem";

const Popular = [
  {
    id: 0,
    image:
      "https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?q=10&w=1600&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "France",
    rating: 4.9,
    visitors: "80m",
  },
  {
    id: 0,
    image:
      "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?q=10&w=1600&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Italy",
    rating: 4.5,
    visitors: "75m",
  },
  {
    id: 0,
    image:
      "https://images.unsplash.com/photo-1494949360228-4e9bde560065?q=10&w=1600&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Thailand",
    rating: 4.2,
    visitors: "25m",
  },
];

type ExploreProps = NativeStackScreenProps<
  ExploreRoutesStackParamList,
  "Explore"
>;

type ExploreScreenState = {
  countryId: string;
};

export const ExploreScreen: React.FC<ExploreProps> = ({ navigation }) => {
  const {
    data: popularCountries,
    isLoading,
    isSuccess,
  } = useCountriesQuery({ isPopular: true });
  const [state, setState] = useState<ExploreScreenState>({ countryId: "" });
  const [searchActive, setSearchActive] = useState(false);
  const modalDestinationDetailsRef = useRef<Modalize>(null);

  const onDestinationModalOpen = useCallback((countryId: string) => {
    setState((prevState) => ({ ...prevState, countryId }));
    modalDestinationDetailsRef.current?.open();
  }, []);

  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);

  const modalDestinationSearchRef = useRef<Modalize>(null);
  const modalCountryPassportSelectRef = useRef<Modalize>(null);

  const onDestinationSearchOpen = () => {
    modalDestinationSearchRef.current?.open();
  };
  const onCountryPassportOpen = () => {
    modalCountryPassportSelectRef.current?.open();
  };

  /**
   * Transform data
   */

  const popularCountriesLength = popularCountries?.countries.length || 0;

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
                style={styles.passportBox}
                activeOpacity={0.7}
                onPress={() => onCountryPassportOpen()}
              >
                <PassportIcon />
                <View style={styles.passportTexts}>
                  <Text style={styles.passportLabel}>Passport</Text>
                  <Text style={styles.passportCountry}>Georgia</Text>
                </View>
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
          <View style={[styles.rowItem, { paddingTop: 5 }]}>
            <View style={styles.rowItemHeader}>
              <Text style={styles.h2}>Popular</Text>

              <TouchableOpacity
                activeOpacity={0.7}
                style={styles.seeAllButton}
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
          </View>
          <View style={[styles.rowItem]}>
            <View style={styles.rowItemHeader}>
              <Text style={styles.h2}>Visa free for you</Text>

              <TouchableOpacity activeOpacity={0.7} style={styles.seeAllButton}>
                <Text style={styles.seeAllButtonTxt}>See all</Text>
              </TouchableOpacity>
            </View>

            <ScrollView
              horizontal
              style={styles.contentBox}
              showsHorizontalScrollIndicator={false}
            >
              {Popular?.map((item, ind) => (
                <>
                  <ImageBackground
                    style={styles.box}
                    resizeMode="cover"
                    source={{
                      uri: item.image,
                    }}
                    key={ind}
                  >
                    <TouchableOpacity
                      style={styles.gradientWrapper}
                      activeOpacity={0.7}
                    >
                      <LinearGradient
                        style={styles.gradientWrapper}
                        colors={["rgba(0,0,0,0.01)", "rgba(0,0,0,0.6)"]}
                      >
                        <View style={styles.labelItem}>
                          <Mark color="#fff" size="sm" />
                          <Text style={[styles.labelItemText, styles.titleSm]}>
                            {item.title}
                          </Text>
                        </View>
                        <View style={styles.ratingLabel}>
                          <View
                            style={{
                              position: "relative",
                              top: -1,
                              opacity: 0.8,
                            }}
                          >
                            <StarIcon color="#FFBC3E" />
                          </View>
                          <Text
                            style={[styles.ratingText, styles.ratingTextXs]}
                          >
                            {item.rating} /
                          </Text>
                          <Text
                            style={[styles.ratingText, styles.ratingTextXs]}
                          >
                            {item.visitors} visitors
                          </Text>
                        </View>
                      </LinearGradient>
                    </TouchableOpacity>
                  </ImageBackground>
                  {Popular.length === ind + 1 && (
                    <View style={{ width: 20 }}></View>
                  )}
                </>
              ))}
            </ScrollView>
          </View>
          <View style={[styles.rowItem]}>
            <View style={styles.rowItemHeader}>
              <Text style={styles.h2}>Luxury</Text>

              <TouchableOpacity activeOpacity={0.7} style={styles.seeAllButton}>
                <Text style={styles.seeAllButtonTxt}>See all</Text>
              </TouchableOpacity>
            </View>

            <ScrollView
              horizontal
              style={styles.contentBox}
              showsHorizontalScrollIndicator={false}
            >
              {Popular?.map((item, ind) => (
                <>
                  <ImageBackground
                    style={styles.box}
                    resizeMode="cover"
                    source={{
                      uri: item.image,
                    }}
                    key={ind}
                  >
                    <TouchableOpacity
                      style={styles.gradientWrapper}
                      activeOpacity={0.7}
                    >
                      <LinearGradient
                        style={styles.gradientWrapper}
                        colors={["rgba(0,0,0,0.01)", "rgba(0,0,0,0.6)"]}
                      >
                        <View style={styles.labelItem}>
                          <Mark color="#fff" size="sm" />
                          <Text style={[styles.labelItemText, styles.titleSm]}>
                            {item.title}
                          </Text>
                        </View>
                        <View style={styles.ratingLabel}>
                          <View
                            style={{
                              position: "relative",
                              top: -1,
                              opacity: 0.8,
                            }}
                          >
                            <StarIcon color="#FFBC3E" />
                          </View>
                          <Text
                            style={[styles.ratingText, styles.ratingTextXs]}
                          >
                            {item.rating} /
                          </Text>
                          <Text
                            style={[styles.ratingText, styles.ratingTextXs]}
                          >
                            {item.visitors} visitors
                          </Text>
                        </View>
                      </LinearGradient>
                    </TouchableOpacity>
                  </ImageBackground>
                  {Popular.length === ind + 1 && (
                    <View style={{ width: 20 }}></View>
                  )}
                </>
              ))}
            </ScrollView>
          </View>
          <View style={[styles.rowItem]}>
            <View style={styles.rowItemHeader}>
              <Text style={styles.h2}>Budget friendly</Text>

              <TouchableOpacity activeOpacity={0.7} style={styles.seeAllButton}>
                <Text style={styles.seeAllButtonTxt}>See all</Text>
              </TouchableOpacity>
            </View>

            <ScrollView
              horizontal
              style={styles.contentBox}
              showsHorizontalScrollIndicator={false}
            >
              {Popular?.map((item, ind) => (
                <>
                  <ImageBackground
                    style={styles.box}
                    resizeMode="cover"
                    source={{
                      uri: item.image,
                    }}
                    key={ind}
                  >
                    <TouchableOpacity
                      style={styles.gradientWrapper}
                      activeOpacity={0.7}
                    >
                      <LinearGradient
                        style={styles.gradientWrapper}
                        colors={["rgba(0,0,0,0.01)", "rgba(0,0,0,0.6)"]}
                      >
                        <View style={styles.labelItem}>
                          <Mark color="#fff" size="sm" />
                          <Text style={[styles.labelItemText, styles.titleSm]}>
                            {item.title}
                          </Text>
                        </View>
                        <View style={styles.ratingLabel}>
                          <View
                            style={{
                              position: "relative",
                              top: -1,
                              opacity: 0.8,
                            }}
                          >
                            <StarIcon color="#FFBC3E" />
                          </View>
                          <Text
                            style={[styles.ratingText, styles.ratingTextXs]}
                          >
                            {item.rating} /
                          </Text>
                          <Text
                            style={[styles.ratingText, styles.ratingTextXs]}
                          >
                            {item.visitors} visitors
                          </Text>
                        </View>
                      </LinearGradient>
                    </TouchableOpacity>
                  </ImageBackground>
                  {Popular.length === ind + 1 && (
                    <View style={{ width: 20 }}></View>
                  )}
                </>
              ))}
            </ScrollView>
          </View>
          <View style={[styles.rowItem]}>
            <View style={styles.rowItemHeader}>
              <Text style={styles.h2}>For family</Text>

              <TouchableOpacity activeOpacity={0.7} style={styles.seeAllButton}>
                <Text style={styles.seeAllButtonTxt}>See all</Text>
              </TouchableOpacity>
            </View>

            <ScrollView
              horizontal
              style={styles.contentBox}
              showsHorizontalScrollIndicator={false}
            >
              {Popular?.map((item, ind) => (
                <>
                  <ImageBackground
                    style={styles.box}
                    resizeMode="cover"
                    source={{
                      uri: item.image,
                    }}
                    key={ind}
                  >
                    <TouchableOpacity
                      style={styles.gradientWrapper}
                      activeOpacity={0.7}
                    >
                      <LinearGradient
                        style={styles.gradientWrapper}
                        colors={["rgba(0,0,0,0.01)", "rgba(0,0,0,0.6)"]}
                      >
                        <View style={styles.labelItem}>
                          <Mark color="#fff" size="sm" />
                          <Text style={[styles.labelItemText, styles.titleSm]}>
                            {item.title}
                          </Text>
                        </View>
                        <View style={styles.ratingLabel}>
                          <View
                            style={{
                              position: "relative",
                              top: -1,
                              opacity: 0.8,
                            }}
                          >
                            <StarIcon color="#FFBC3E" />
                          </View>
                          <Text
                            style={[styles.ratingText, styles.ratingTextXs]}
                          >
                            {item.rating} /
                          </Text>
                          <Text
                            style={[styles.ratingText, styles.ratingTextXs]}
                          >
                            {item.visitors} visitors
                          </Text>
                        </View>
                      </LinearGradient>
                    </TouchableOpacity>
                  </ImageBackground>
                  {Popular.length === ind + 1 && (
                    <View style={{ width: 20 }}></View>
                  )}
                </>
              ))}
            </ScrollView>
          </View>
          <View style={[styles.rowItem]}>
            <View style={styles.rowItemHeader}>
              <Text style={styles.h2}>For couples</Text>

              <TouchableOpacity activeOpacity={0.7} style={styles.seeAllButton}>
                <Text style={styles.seeAllButtonTxt}>See all</Text>
              </TouchableOpacity>
            </View>

            <ScrollView
              horizontal
              style={styles.contentBox}
              showsHorizontalScrollIndicator={false}
            >
              {Popular?.map((item, ind) => (
                <>
                  <ImageBackground
                    style={styles.box}
                    resizeMode="cover"
                    source={{
                      uri: item.image,
                    }}
                    key={ind}
                  >
                    <TouchableOpacity
                      style={styles.gradientWrapper}
                      activeOpacity={0.7}
                    >
                      <LinearGradient
                        style={styles.gradientWrapper}
                        colors={["rgba(0,0,0,0.01)", "rgba(0,0,0,0.6)"]}
                      >
                        <View style={styles.labelItem}>
                          <Mark color="#fff" size="sm" />
                          <Text style={[styles.labelItemText, styles.titleSm]}>
                            {item.title}
                          </Text>
                        </View>
                        <View style={styles.ratingLabel}>
                          <View
                            style={{
                              position: "relative",
                              top: -1,
                              opacity: 0.8,
                            }}
                          >
                            <StarIcon color="#FFBC3E" />
                          </View>
                          <Text
                            style={[styles.ratingText, styles.ratingTextXs]}
                          >
                            {item.rating} /
                          </Text>
                          <Text
                            style={[styles.ratingText, styles.ratingTextXs]}
                          >
                            {item.visitors} visitors
                          </Text>
                        </View>
                      </LinearGradient>
                    </TouchableOpacity>
                  </ImageBackground>
                  {Popular.length === ind + 1 && (
                    <View style={{ width: 20 }}></View>
                  )}
                </>
              ))}
            </ScrollView>
          </View>
          <View style={[styles.rowItem]}>
            <View style={styles.rowItemHeader}>
              <Text style={styles.h2}>Best islands</Text>

              <TouchableOpacity activeOpacity={0.7} style={styles.seeAllButton}>
                <Text style={styles.seeAllButtonTxt}>See all</Text>
              </TouchableOpacity>
            </View>

            <ScrollView
              horizontal
              style={styles.contentBox}
              showsHorizontalScrollIndicator={false}
            >
              {Popular?.map((item, ind) => (
                <>
                  <ImageBackground
                    style={styles.box}
                    resizeMode="cover"
                    source={{
                      uri: item.image,
                    }}
                    key={ind}
                  >
                    <TouchableOpacity
                      style={styles.gradientWrapper}
                      activeOpacity={0.7}
                    >
                      <LinearGradient
                        style={styles.gradientWrapper}
                        colors={["rgba(0,0,0,0.01)", "rgba(0,0,0,0.6)"]}
                      >
                        <View style={styles.labelItem}>
                          <Mark color="#fff" size="sm" />
                          <Text style={[styles.labelItemText, styles.titleSm]}>
                            {item.title}
                          </Text>
                        </View>
                        <View style={styles.ratingLabel}>
                          <View
                            style={{
                              position: "relative",
                              top: -1,
                              opacity: 0.8,
                            }}
                          >
                            <StarIcon color="#FFBC3E" />
                          </View>
                          <Text
                            style={[styles.ratingText, styles.ratingTextXs]}
                          >
                            {item.rating} /
                          </Text>
                          <Text
                            style={[styles.ratingText, styles.ratingTextXs]}
                          >
                            {item.visitors} visitors
                          </Text>
                        </View>
                      </LinearGradient>
                    </TouchableOpacity>
                  </ImageBackground>
                  {Popular.length === ind + 1 && (
                    <View style={{ width: 20 }}></View>
                  )}
                </>
              ))}
            </ScrollView>
          </View>
          <View style={[styles.rowItem]}>
            <View style={styles.rowItemHeader}>
              <Text style={styles.h2}>Best beaches</Text>

              <TouchableOpacity activeOpacity={0.7} style={styles.seeAllButton}>
                <Text style={styles.seeAllButtonTxt}>See all</Text>
              </TouchableOpacity>
            </View>

            <ScrollView
              horizontal
              style={styles.contentBox}
              showsHorizontalScrollIndicator={false}
            >
              {Popular?.map((item, ind) => (
                <>
                  <ImageBackground
                    style={styles.box}
                    resizeMode="cover"
                    source={{
                      uri: item.image,
                    }}
                    key={ind}
                  >
                    <TouchableOpacity
                      style={styles.gradientWrapper}
                      activeOpacity={0.7}
                    >
                      <LinearGradient
                        style={styles.gradientWrapper}
                        colors={["rgba(0,0,0,0.01)", "rgba(0,0,0,0.6)"]}
                      >
                        <View style={styles.labelItem}>
                          <Mark color="#fff" size="sm" />
                          <Text style={[styles.labelItemText, styles.titleSm]}>
                            {item.title}
                          </Text>
                        </View>
                        <View style={styles.ratingLabel}>
                          <View
                            style={{
                              position: "relative",
                              top: -1,
                              opacity: 0.8,
                            }}
                          >
                            <StarIcon color="#FFBC3E" />
                          </View>
                          <Text
                            style={[styles.ratingText, styles.ratingTextXs]}
                          >
                            {item.rating} /
                          </Text>
                          <Text
                            style={[styles.ratingText, styles.ratingTextXs]}
                          >
                            {item.visitors} visitors
                          </Text>
                        </View>
                      </LinearGradient>
                    </TouchableOpacity>
                  </ImageBackground>
                  {Popular.length === ind + 1 && (
                    <View style={{ width: 20 }}></View>
                  )}
                </>
              ))}
            </ScrollView>
          </View>
        </ScrollView>

        <Portal>
          <Modalize
            ref={modalDestinationDetailsRef}
            modalTopOffset={0}
            withHandle={false}
            disableScrollIfPossible
            modalStyle={{
              minHeight: "100%",
            }}
            scrollViewProps={{
              alwaysBounceVertical: false,
            }}
          >
            <DestinationDetail
              id={state.countryId}
              modalDestinationDetailsRef={modalDestinationDetailsRef}
            />
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
  notFoundView: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 70,
  },
  notFoundViewText: {
    fontSize: 16,
    maxWidth: "80%",
    textAlign: "center",
    marginTop: 25,
    color: COLORS.darkgray,
  },
  backButton: {
    width: 40,
    height: 40,
    backgroundColor: "#fff",
    borderRadius: 100,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    ...COLORS.shadow,
  },
  searchButton: {
    width: 40,
    height: 40,
    backgroundColor: "#fff",
    borderRadius: 100,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    ...COLORS.shadow,
    marginLeft: 15,
  },
  bucketAmountWrapper: {
    position: "absolute",
    minWidth: 15,
    height: 15,
    borderRadius: 50,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 4,
    right: -18,
    top: -4,
  },
  bucketAmountText: {
    color: "#fff",
    fontSize: 10,
  },
  gradientWrapper: {
    flex: 1,
    justifyContent: "flex-end",
  },
  titleSm: {
    fontSize: 13,
    marginLeft: 2,
  },
  labelItemText: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
    marginLeft: 5,
  },
  labelItem: {
    padding: 10,
    paddingVertical: 0,
    flexDirection: "row",
    alignItems: "center",
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
  passportBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 15,
    paddingVertical: 9,
    borderRadius: 30,
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
  passportTexts: {
    marginLeft: 5,
  },
  passportLabel: {
    fontSize: 8,
    color: COLORS.darkgray,
    marginBottom: 1,
  },
  passportCountry: {
    fontSize: 10,
    color: "#000",
    fontWeight: "bold",
  },
  ratingLabel: {
    flexDirection: "row",
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 30,
    alignItems: "center",
    paddingBottom: 10,
  },
  ratingText: {
    color: "#fff",
    marginLeft: 3,
    fontSize: 12,
    opacity: 0.7,
  },
  addToBucketButton: {
    width: 30,
    height: 30,
    borderRadius: 50,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    right: 10,
    top: 10,
    zIndex: 3,
  },
  ratingTextXs: {
    fontSize: 10,
  },
  searchStyle: {
    width: "100%",
    height: 35,
    backgroundColor: "#eeeeee",
    paddingLeft: 10,
    borderRadius: 10,
    color: "#000",
  },
  selectCountryBox: {
    flexDirection: "row",
    alignItems: "center",
  },
  selectCountryText: {
    marginLeft: 8,
    color: "#fff",
    fontWeight: "bold",
    fontSize: 12,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
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
    fontWeight: "bold",
  },
  contentBox: {
    marginTop: 5,
    paddingLeft: 15,
  },
  box: {
    width: 130,
    height: 130,
    backgroundColor: "#fafafa",
    borderRadius: 15,
    overflow: "hidden",
    marginRight: 10,
  },
  halfBox: {
    width: "49%",
    flex: 1,
  },
  typeMd: {
    width: 160,
    height: 180,
    borderRadius: 10,
    overflow: "hidden",
  },
});
