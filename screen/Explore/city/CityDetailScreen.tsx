import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useRef, useState } from "react";
import { Dimensions, Pressable, ScrollView, Text, View } from "react-native";
import { toast } from "sonner-native";

import {
  useCountryByIso2Query,
  useLazyGetSightsQuery,
} from "../../../api/api.trekspot";
import { styles } from "../../../common/components/_styles";
import { Apps } from "../../../components/City/Apps";
import { CityGalleryRow } from "../../../components/City/CityGalleryRow";
import { CityLoader } from "../../../components/City/CityLoader";
import { CityOverview } from "../../../components/City/CityOverview";
import { CityTitleRow } from "../../../components/City/CityTitleRow";
import { ExploreTab } from "../../../components/City/ExploreTab";
import { FoodAndDrinkTab } from "../../../components/City/FoodAndDrinkTab";
import { Header } from "../../../components/City/Header";
import { NationalDishes } from "../../../components/City/NationalDishes";
import { Tips } from "../../../components/City/Tips";
import { ExploreRoutesStackParamList } from "../../../routes/explore/ExploreRoutes";
import { COLORS } from "../../../styles/theme";

type Props = NativeStackScreenProps<ExploreRoutesStackParamList, "CityDetail">;

const TABS = ["Explore", "Food", "Tips", "National dishes", "Apps"];

export const CityDetailScreen: React.FC<Props> = ({ route }) => {
  const { city } = route?.params;
  const [activeTab, setActiveTab] = useState("Explore");
  const [getSights, { data, isLoading, isError }] = useLazyGetSightsQuery();

  useEffect(() => {
    if (city) getSights({ iso2: city.iso2, city: city.city });
  }, [city]);

  const {
    data: countyData,
    isLoading: countryLoading,
    isError: countryFetchError,
  } = useCountryByIso2Query({ iso2: city.iso2 });

  if (countryFetchError) {
    toast.error("Error fetching country data");
  }

  const [isSticky, setIsSticky] = useState(false);
  const [updateTitle, setUpdateTitle] = useState(false);
  const parentScrollY = useRef(0);
  const stickyThreshold = 625;

  const handleParentScroll = (event) => {
    const y = event.nativeEvent.contentOffset.y;
    parentScrollY.current = y;
    setIsSticky(y > stickyThreshold);
    setUpdateTitle(y > 10);
  };

  const scrollViewRef = useRef();

  const handleScrollTo = () => {
    scrollViewRef?.current?.scrollTo({
      x: 0,
      y: stickyThreshold,
      animated: true,
    });
  };

  const scrollView1Ref = useRef(null);
  const scrollView2Ref = useRef(null);
  const tabRefs = useRef(TABS.map(() => React.createRef()));

  const centerTabInBothScrollViews = (index) => {
    const tabRef = tabRefs.current[index];

    tabRef?.current?.measure((x, y, width, height, pageX, pageY) => {
      const windowWidth = Dimensions.get("window").width;
      const scrollOffset = pageX - windowWidth / 2 + width / 2;
      scrollView1Ref?.current?.scrollTo({ x: scrollOffset, animated: true });
      scrollView2Ref?.current?.scrollTo({ x: scrollOffset, animated: true });
    });
  };

  const renderTabs = () =>
    TABS.map((tab, i) => (
      <Pressable
        style={[
          styles.tabItem,
          {
            paddingLeft: i === 0 ? 0 : 20,
          },
        ]}
        key={i}
        ref={tabRefs.current[i]}
        onPress={() => {
          setActiveTab(tab);
          handleScrollTo();
          centerTabInBothScrollViews(i);
        }}
      >
        <Text
          style={[
            styles.tabItemLabel,
            {
              color: tab === activeTab ? COLORS.primary : COLORS.black,
            },
          ]}
        >
          {tab === "Food"
            ? "Food & Drink"
            : tab === "Tips"
              ? "Tips & Insights"
              : tab}
        </Text>
        {tab === activeTab ? (
          <View
            style={[
              styles.activeIndicator,
              {
                left: i === 0 ? 0 : 20,
              },
            ]}
          ></View>
        ) : null}
      </Pressable>
    ));

  return (
    <View style={{ flex: 1, backgroundColor: "#f8f8f8" }}>
      <StatusBar style="dark" />
      {!isLoading || !countryLoading ? (
        <>
          <Header
            key={updateTitle}
            city={city}
            title={
              parentScrollY?.current > 10
                ? city?.city
                : city?.country
                  ? `City in ${city?.country}`
                  : ""
            }
          />
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            ref={scrollView1Ref}
            contentContainerStyle={{
              paddingHorizontal: 15,
            }}
            style={[
              styles.tabsWrapper,
              {
                display: "flex",
                flexDirection: "row",
                maxHeight: 50,
                zIndex: 4,
                backgroundColor: "#fff",
                borderBottomColor: "#ccc",
                marginTop: 0
              },
            ]}
          >
            {renderTabs()}
          </ScrollView>
        </>
      ) : null}

      {/* Loading State */}

      {isLoading && <CityLoader isLoading={isLoading} />}

      <ScrollView
        style={{ flex: 1 }}
        nestedScrollEnabled
        onScroll={handleParentScroll}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        ref={scrollViewRef} 
      >
        {/* Content */}
      
        {!isLoading ? (
          <>
            <CityTitleRow
              city={city}
              securityLevel={
                !countryLoading && countyData?.countryByIso2?.security
              }
            />

            <CityGalleryRow city={city} />

            <CityOverview
              recognizedFor={countyData?.countryByIso2?.recognizedFor}
              plugTypes={countyData?.countryByIso2?.plugTypes}
              currencies={countyData?.countryByIso2?.currencies}
            />
 
            <ExploreTab
              activeTab={activeTab}
              data={data}
              isLoading={isLoading}
            />
            <FoodAndDrinkTab activeTab={activeTab} />
            <Tips activeTab={activeTab} iso2={city?.iso2} />
            <NationalDishes iso2={city?.iso2} activeTab={activeTab} />
            <Apps
              activeTab={activeTab}
              apps={countyData?.countryByIso2?.taxi}
            />
          </>
        ) : null}
      </ScrollView>
    </View>
  );
};
