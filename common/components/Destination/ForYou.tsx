import { FlashList } from "@shopify/flash-list";
import { Image } from "expo-image";
import { useCallback, useEffect, useRef, useState } from "react";
import { Text, Touchable, TouchableOpacity, View } from "react-native";
// import { Modalize } from "react-native-modalize";
// import { Portal } from "react-native-portalize";
// import { CityDetailModal } from "../../../components/explore/destination/CityDetailModal";
// import { MarkerFillIcon } from "../../../utilities/SvgIcons.utility";
// import { MapEmbedView } from "../MapEmbedView";
import { styles } from "../_styles";
import { CityType, CountryType } from "../../../api/api.types";
import { useLazyGetCitiesQuery } from "../../../api/api.trekspot";
import { Loader } from "../../ui/Loader";
import { ForYouCountryItem } from "../../../components/explore/ForYouCountryItem";
import { useNavigation } from "@react-navigation/native";
import { FaqItem } from "./_FaqItem";

import { ExploreRoutesStackParamList } from "../../../routes/explore/ExploreRoutes";
import { StackNavigationProp } from "@react-navigation/stack";

type ForYouPros = {
  DATA: any;
  country: CountryType;
};

interface IState {
  showMoreCities: boolean;
  city: CityType | null;
}

type ExploreStackNavigationProp =
  StackNavigationProp<ExploreRoutesStackParamList>;

export const ForYou: React.FC<ForYouPros> = ({ DATA, country }) => {
  const navigation = useNavigation<ExploreStackNavigationProp>();

  // const modalEmbedRef = useRef(null);

  const [state, setState] = useState<IState>({
    showMoreCities: false,
    city: null,
  });
  const [fetchCountryCities, { data, isLoading: isCitiesLoading }] =
    useLazyGetCitiesQuery();
  const [blogUrl, setBlogUrl] = useState("");

  // const onEmbedModalOpen = () => {
  //   modalEmbedRef.current?.open();
  // };

  const onPlaceDetailOpen = useCallback((city: CityType) => {
    navigation.navigate("CityDetail", { city });
  }, []);

  useEffect(() => {
    fetchCountryCities({
      iso2: country.iso2,
      inTopSight: true,
    });
  }, [fetchCountryCities, country]);

  const faqData = [
    {
      question: "When is the best time to visit France?",
      answer:
        "<ul><li><strong>Spring (April to June):</strong> Mild weather and blooming flowers make this a great time to visit.</li><li><strong>Summer (July to August):</strong> Warm weather and long days, but it's also the peak tourist season.</li><li><strong>Autumn (September to November):</strong> Pleasant weather and fewer tourists.</li><li><strong>Winter (December to February):</strong> Best for visiting ski resorts in the Alps or experiencing Paris without the crowds.</li></ul>",
    },
    {
      question: "Do I need a visa to visit France?",
      answer:
        "<ul><li><strong>EU Citizens:</strong> No visa is required for EU citizens.</li><li><strong>US Citizens:</strong> No visa is required for stays up to 90 days within a 180-day period.</li><li><strong>Other Nationalities:</strong> Check the French consulate website for specific visa requirements.</li></ul>",
    },
    {
      question: "What is the currency in France?",
      answer: "<ul><li>The currency in France is the Euro (€).</li></ul>",
    },
    {
      question: "What language is spoken in France?",
      answer:
        "<ul><li>The official language is French. In tourist areas, many people speak English, but learning a few basic French phrases is appreciated.</li></ul>",
    },
    {
      question: "What is the time zone in France?",
      answer:
        "France is in the Central European Time (CET) zone, which is UTC+1. During daylight saving time (late March to late October), it is UTC+2.",
    },
  ];

  return (
    <>
      <View style={[styles.forYouRow, { marginTop: 25 }]}>
        <Text style={styles.forYouRowTitle}>Cities to visit </Text>
        {!isCitiesLoading ? (
          <>
            <View
              style={[
                styles.tabWrapper,
                {
                  paddingBottom: 5,
                  marginBottom: 0,
                  flexWrap: "wrap",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  minHeight: 230,
                },
              ]}
            >
              <FlashList
                renderItem={({ item }) => (
                  <ForYouCountryItem
                    key={`ForYouCountryItem-${item.id}`}
                    item={item}
                    onPlaceDetailOpen={onPlaceDetailOpen}
                  />
                )}
                numColumns={3}
                estimatedItemSize={10}
                showsVerticalScrollIndicator={false}
                data={
                  data?.cities.slice(
                    0,
                    state.showMoreCities ? data.cities.length : 6
                  ) || []
                }
              />
            </View>

            <View style={styles.showMoreButtonWrapper}>
              <TouchableOpacity
                activeOpacity={0.7}
                style={styles.showMoreButton}
                onPress={() =>
                  setState((prevState) => ({
                    ...prevState,
                    showMoreCities: !prevState.showMoreCities,
                  }))
                }
              >
                <Text style={styles.showMoreButtonText}>
                  {state.showMoreCities ? `Show less` : `Show more`}
                </Text>
              </TouchableOpacity>
            </View>
          </>
        ) : (
          <View style={{ height: 230 }}>
            <Loader isLoading />
          </View>
        )}
      </View>

      <View style={[styles.forYouRow, { marginBottom: 50 }]}>
        <Text style={styles.forYouRowTitle}>FAQ</Text>

        <Text style={styles.forYouRowTitleSub}>General Travel Questions</Text>
        <FlashList
          contentContainerStyle={{ paddingHorizontal: 15 }}
          renderItem={({ item, ind }) => {
            return <FaqItem item={item} />;
          }}
          // numColumns={3}
          estimatedItemSize={20}
          data={faqData}
        />

        <Text style={[styles.forYouRowTitleSub, { marginTop: 15 }]}>
          Accommodation and Food
        </Text>
        <FlashList
          contentContainerStyle={{ paddingHorizontal: 15 }}
          renderItem={({ item, ind }) => {
            return <FaqItem item={item} />;
          }}
          // numColumns={3}
          estimatedItemSize={20}
          data={faqData}
        />
      </View>

      {/* <Portal>
        <Modalize ref={modalEmbedRef} modalTopOffset={65} adjustToContentHeight>
          <MapEmbedView
            blogUrl={blogUrl}
            placeTitle={state.city && state.city.city}
            modalEmbedRef={modalEmbedRef}
          />
        </Modalize>
      </Portal> */}

      {/* <View style={[styles.forYouRow]}>
        <Text style={styles.forYouRowTitle}>Top spots</Text>
        <View
          style={[
            styles.tabWrapper,
            {
              paddingBottom: 5,
              marginBottom: 0,
              flexWrap: "wrap",
              flexDirection: "row",
              justifyContent: "space-between",
              minHeight: 200,
            },
          ]}
        >
          <FlashList
            renderItem={({ item, ind }) => {
              return (
                <TouchableOpacity
                  activeOpacity={0.7}
                  style={[
                    styles.thingsTodoItem,
                    {
                      width: "95%",
                      marginBottom: 10,
                    },
                  ]}
                  key={ind}
                  onPress={() => {
                    onEmbedModalOpen();
                    setBlogUrl("");
                  }}
                >
                  <Image
                    style={[
                      styles.thingsTodoItemImage,
                      {
                        minHeight: 120,
                      },
                    ]}
                    cachePolicy="memory"
                    contentFit="cover"
                    transition={0}
                    source={{
                      uri: item.thumbnail,
                    }}
                  >
                    <View style={styles.mapButton}>
                      <MarkerFillIcon color="#fff" size="10" />
                      <Text style={styles.mapButtonText}>Map</Text>
                    </View>
                  </Image>

                  <View style={styles.thingsTodoItemDetails}>
                    <Text style={styles.thingsTodoItemTitle}>
                      {item?.title}
                    </Text>
                    {item?.description ? (
                      <View style={styles.thingsTodoItemiIn}>
                        <Text
                          style={[
                            styles.thingsTodoItemiIntypeText,
                            { fontSize: 12 },
                          ]}
                        >
                          {item.description}
                        </Text>
                      </View>
                    ) : null}
                    {item?.type ? (
                      <View style={styles.thingsTodoItemiIn}>
                        <Text style={styles.thingsTodoItemiIntypeText}>
                          {item.type}
                        </Text>
                      </View>
                    ) : null}
                  </View>
                </TouchableOpacity>
              );
            }}
            numColumns={3}
            estimatedItemSize={10}
            data={DATA?.topSights?.slice(0, 6)}
          />
        </View>
        <View style={styles.showMoreButtonWrapper}>
          <TouchableOpacity activeOpacity={0.7} style={styles.showMoreButton}>
            <Text style={styles.showMoreButtonText}>Show more</Text>
          </TouchableOpacity>
        </View>
      </View> */}

      {/* <View style={[styles.forYouRow]}>
        <Text style={styles.forYouRowTitle}>Historical places</Text>
        <View
          style={[
            styles.tabWrapper,
            {
              paddingBottom: 5,
              marginBottom: 0,
              flexWrap: "wrap",
              flexDirection: "row",
              justifyContent: "space-between",
              minHeight: 200,
            },
          ]}
        >
          <FlashList
            renderItem={({ item, ind }) => {
              return (
                <TouchableOpacity
                  activeOpacity={0.7}
                  style={[
                    styles.thingsTodoItem,
                    {
                      width: "95%",
                      marginBottom: 10,
                    },
                  ]}
                  key={ind}
                  onPress={() => {
                    onEmbedModalOpen();
                    setBlogUrl("");
                  }}
                >
                  <Image
                    style={[
                      styles.thingsTodoItemImage,
                      {
                        minHeight: 120,
                      },
                    ]}
                    cachePolicy="memory"
                    contentFit="cover"
                    transition={0}
                    source={{
                      uri: item.thumbnail,
                    }}
                  >
                    <View style={styles.mapButton}>
                      <MarkerFillIcon color="#fff" size="10" />
                      <Text style={styles.mapButtonText}>Map</Text>
                    </View>
                  </Image>

                  <View style={styles.thingsTodoItemDetails}>
                    <Text style={styles.thingsTodoItemTitle}>
                      {item?.title}
                    </Text>
                    {item?.description ? (
                      <View style={styles.thingsTodoItemiIn}>
                        <Text
                          style={[
                            styles.thingsTodoItemiIntypeText,
                            { fontSize: 12 },
                          ]}
                        >
                          {item.description}
                        </Text>
                      </View>
                    ) : null}
                    {item?.type ? (
                      <View style={styles.thingsTodoItemiIn}>
                        <Text style={styles.thingsTodoItemiIntypeText}>
                          {item.type}
                        </Text>
                      </View>
                    ) : null}
                  </View>
                </TouchableOpacity>
              );
            }}
            numColumns={3}
            estimatedItemSize={10}
            data={DATA?.historicalPlaces?.slice(0, 6)}
          />
        </View>
        <View style={styles.showMoreButtonWrapper}>
          <TouchableOpacity activeOpacity={0.7} style={styles.showMoreButton}>
            <Text style={styles.showMoreButtonText}>Show more</Text>
          </TouchableOpacity>
        </View>
      </View> */}

      {/* 
      <View style={[styles.forYouRow]}>
        <Text style={styles.forYouRowTitle}>Blogs</Text>
        <View
          style={[
            styles.tabWrapper,
            {
              paddingBottom: 5,
              marginBottom: 0,
              flexWrap: "wrap",
              flexDirection: "row",
              justifyContent: "space-between",
              minHeight: 200,
            },
          ]}
        >
          <FlashList
            renderItem={({ item, ind }) => {
              return (
                <TouchableOpacity
                  activeOpacity={0.7}
                  style={[
                    styles.thingsTodoItem,
                    {
                      width: "95%",
                    },
                  ]}
                  key={ind}
                  onPress={() => {
                    onEmbedModalOpen();
                    setBlogUrl(item?.url);
                  }}
                >
                  <Image
                    style={[
                      styles.thingsTodoItemImage,
                      {
                        minHeight: 160,
                      },
                    ]}
                    source={{
                      uri: item.thumbnail,
                    }}
                    cachePolicy="memory"
                    contentFit="cover"
                    transition={0}
                  >
                    <View
                      style={[
                        styles.mapButton,
                        { backgroundColor: "rgba(0,0,0, 0.5)" },
                      ]}
                    >
                      <Text style={styles.mapButtonText}>Details</Text>
                    </View>
                  </Image>

                  <View style={styles.thingsTodoItemDetails}>
                    <Text style={styles.thingsTodoItemTitle}>{item.title}</Text>
                  </View>
                </TouchableOpacity>
              );
            }}
            numColumns={2}
            estimatedItemSize={10}
            data={DATA?.blogs?.slice(0, 6)}
          />
        </View>
        <View style={styles.showMoreButtonWrapper}>
          <TouchableOpacity activeOpacity={0.7} style={styles.showMoreButton}>
            <Text style={styles.showMoreButtonText}>Show more</Text>
          </TouchableOpacity>
        </View>
      </View> */}

      {/* {state.city && <CityDetailModal city={state.city} />} */}
    </>
  );
};
