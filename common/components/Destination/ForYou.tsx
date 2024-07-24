import { FlashList } from "@shopify/flash-list";
import { useCallback, useEffect, useRef, useState } from "react";
import { Text, Touchable, TouchableOpacity, View } from "react-native";
// import { Modalize } from "react-native-modalize";
// import { Portal } from "react-native-portalize";
// import { CityDetailModal } from "../../../components/explore/destination/CityDetailModal";
// import { MarkerFillIcon } from "../../../utilities/SvgIcons.utility";
// import { MapEmbedView } from "../MapEmbedView";
import { styles } from "../_styles";
import { CityType, CountryType } from "../../../api/api.types";
import {
  useLazyFaqQuery,
  useLazyGetCitiesQuery,
} from "../../../api/api.trekspot";
import { Loader } from "../../ui/Loader";
import { ForYouCountryItem } from "../../../components/explore/ForYouCountryItem";
import { useNavigation } from "@react-navigation/native";
import { FaqItem } from "./_FaqItem";

import { ExploreRoutesStackParamList } from "../../../routes/explore/ExploreRoutes";
import { StackNavigationProp } from "@react-navigation/stack";
import { DownCircleIcon } from "../../../utilities/SvgIcons.utility";

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

export const FaqRowItem = ({ item, title, index, openIndex, setOpenIndex }) => {
  const isOpen = openIndex === index;

  const toggleItem = () => {
    setOpenIndex(isOpen ? null : index);
  };

  return (
    <View
      style={{
        minHeight: 10,
        backgroundColor: isOpen ? "#f2f2f2" : "transparent",
        paddingVertical: 5,
        marginBottom: 8,
        borderRadius: 6,
        paddingBottom: isOpen ? 15 : 0,
      }}
    >
      <TouchableOpacity
        onPress={toggleItem}
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingRight: 15,
          marginBottom: 0,
          paddingVertical: 15,
        }}
      >
        <Text style={[styles.forYouRowTitleSub]}>{title}</Text>
        <DownCircleIcon />
      </TouchableOpacity>

      {isOpen ? (
        <FlashList
          contentContainerStyle={{ paddingHorizontal: 15 }}
          renderItem={({ item, ind }) => {
            return <FaqItem item={item} />;
          }}
          // numColumns={3}
          estimatedItemSize={20}
          data={item}
        />
      ) : null}
    </View>
  );
};

export const ForYou: React.FC<ForYouPros> = ({ DATA, country }) => {
  const navigation = useNavigation<ExploreStackNavigationProp>();

  // const modalEmbedRef = useRef(null);

  const [state, setState] = useState<IState>({
    showMoreCities: false,
    city: null,
  });
  const [fetchCountryCities, { data, isLoading: isCitiesLoading }] =
    useLazyGetCitiesQuery();
  const [fetchData, { isLoading, data: faqDataList }] = useLazyFaqQuery();

  // const onEmbedModalOpen = () => {
  //   modalEmbedRef.current?.open();
  // };
  const [openIndex, setOpenIndex] = useState(0);

  const onPlaceDetailOpen = useCallback((city: CityType) => {
    navigation.navigate("CityDetail", { city });
  }, []);

  useEffect(() => {
    fetchData({
      iso2: country.iso2,
    });
    fetchCountryCities({
      iso2: country.iso2,
      inTopSight: true,
    });
  }, [fetchCountryCities, country, fetchData]);

  return (
    <>
      <View style={[styles.forYouRow, { marginTop: 25 }]}>
        <Text style={[styles.forYouRowTitle, { paddingHorizontal: 15 }]}>
          Cities to visit{" "}
        </Text>
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
            {data && data?.cities?.length > 6 && (
              <View style={styles.showMoreButtonWrapper}>
                <TouchableOpacity
                  activeOpacity={0.7}
                  style={[styles.showMoreButton, { marginBottom: 0 }]}
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
            )}
          </>
        ) : (
          <View style={{ height: 230 }}>
            <Loader isLoading background="" />
          </View>
        )}
      </View>
      {!isLoading ? (
        <View
          style={[
            styles.forYouRow,
            { marginBottom: 50, paddingHorizontal: 15, marginTop: 25 },
          ]}
        >
          <Text style={styles.forYouRowTitle}>FAQ</Text>

          {faqDataList &&
            Object.keys(faqDataList)?.map((item, index) => (
              <FaqRowItem
                item={faqDataList[item]}
                title={item}
                index={index}
                openIndex={openIndex}
                setOpenIndex={setOpenIndex}
              />
            ))}
        </View>
      ) : (
        <View style={{ height: 230 }}>
          <Loader isLoading background="" />
        </View>
      )}

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
