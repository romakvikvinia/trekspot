import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Pressable, Text } from "react-native";
import { ScrollView, View } from "react-native";

import { useLazyGetSightsQuery } from "../../../api/api.trekspot";
import { SightType } from "../../../api/api.types";
import { styles } from "../../../common/components/_styles";
import { CityGalleryRow } from "../../../components/City/CityGalleryRow";
import { CityLoader } from "../../../components/City/CityLoader";
import { CityOverview } from "../../../components/City/CityOverview";
import { CityTitleRow } from "../../../components/City/CityTitleRow";
import { FloatingTab } from "../../../components/City/FloatingTab";
import { Header } from "../../../components/City/Header";
import { NotFound } from "../../../components/common/NotFound";
import { exploreStyles } from "../../../components/explore/sights/_exploreStyles";
import { SightDetailModal } from "../../../components/explore/sights/SightDetailModal";
import { SightItem } from "../../../components/explore/sights/SightItem";
import { SightsContainer } from "../../../components/explore/sights/SightsContainer";
import { ExploreRoutesStackParamList } from "../../../routes/explore/ExploreRoutes";

type Props = NativeStackScreenProps<ExploreRoutesStackParamList, "CityDetail">;

interface IState {
  sight: SightType | null;
}

export const CityDetailScreen: React.FC<Props> = ({ route }) => {
  const { city } = route?.params;
  const [state, setState] = useState<IState>({ sight: null });
  const [getSights, { data, isLoading, isError }] = useLazyGetSightsQuery();

  useEffect(() => {
    if (city) getSights({ iso2: city.iso2, city: city.city });
  }, [city]);

  const handleSetSightItem = useCallback((sight: SightType) => {
    setState((prevState) => ({ ...prevState, sight }));
  }, []);

  const handleOnClose = useCallback(() => {
    setState((prevState) => ({ ...prevState, sight: null }));
  }, []);

  // transform data

  const topSights = (data && "Top Sights" in data && data["Top Sights"]) || [];
  const sights = data && { ...data };
  if (sights && data && "Top Sights" in data && data["Top Sights"]) {
    delete sights["Top Sights"];
  }

  const dataNotFound = useMemo(
    () =>
      !isLoading && !topSights.length && sights && !Object.keys(sights).length,
    [isLoading, topSights, sights]
  );

  const [isSticky, setIsSticky] = useState(false);
  const [updateTitle, setUpdateTitle] = useState(false);
  const parentScrollY = useRef(0);
  const stickyThreshold = 450; // Adjust to the point where you want the child to stick

  const handleParentScroll = (event) => {
    const y = event.nativeEvent.contentOffset.y;
    parentScrollY.current = y;
    setIsSticky(y > stickyThreshold);
    setUpdateTitle(y > 10)
  };
 
  return (
    <View style={{ flex: 1, backgroundColor: "#f8f8f8" }}>
      {!isLoading ? (
        <>
          <Header key={updateTitle} city={city} title={parentScrollY?.current > 10 ? city?.city : city?.country ? `City in ${city?.country}` : ""} />
          <FloatingTab isSticky={isSticky} />
        </>
      ) : null}

      <ScrollView
        style={{ flex: 1 }}
        nestedScrollEnabled
        onScroll={handleParentScroll}
        scrollEventThrottle={16}
      >
        {/* Loading State */}
        {isLoading && (
          <CityLoader isLoading={isLoading} />
        )}

        {/* Content */}

        {!isLoading ? (
          <>
            <CityTitleRow city={city} />

            <CityGalleryRow city={city} />
            
            <CityOverview />
            
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{
                paddingHorizontal: 15,
              }}
              style={[
                styles.tabsWrapper,
                {
                  opacity: isSticky ? 0 : 1,
                },
              ]}
            >
              <Pressable style={styles.tabItem}>
                <Text style={styles.tabItemLabel}>Explore</Text>
                <View style={styles.activeIndicator}></View>
              </Pressable>
              <Pressable style={styles.tabItem}>
                <Text style={styles.tabItemLabel}>Food & Drink</Text>
              </Pressable>
              <Pressable style={styles.tabItem}>
                <Text style={styles.tabItemLabel}>Tips</Text>
              </Pressable>
              <Pressable style={styles.tabItem}>
                <Text style={styles.tabItemLabel}>National dishes</Text>
              </Pressable>
              <Pressable style={styles.tabItem}>
                <Text style={styles.tabItemLabel}>Apps</Text>
              </Pressable>
            </ScrollView>

            {/* Top sights */}
            {dataNotFound && (
              <View style={{ flex: 1, marginTop: 30 }}>
                <NotFound />
              </View>
            )}
            <>
              {topSights?.length > 0 && (
                <View
                  style={[
                    exploreStyles.placeSpotsRow,
                    {
                      borderTopWidth: 0,
                    },
                  ]}
                >
                  <Text
                    style={[
                      exploreStyles.placeSpotsRowTitle,
                      { fontSize: 20, fontWeight: "bold" },
                    ]}
                  >
                    Top sights
                  </Text>
                  <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{
                      paddingHorizontal: 15,
                    }}
                  >
                    {topSights?.map(
                      (item) =>
                        item?.image && (
                          <SightItem
                            key={`top-sights-${item.id}-${item.title}`}
                            item={item}
                            onHandleItem={handleSetSightItem}
                          />
                        )
                    )}
                  </ScrollView>
                </View>
              )}

              {/* Top sights */}

              {sights && Object.keys(sights).length ? (
                <SightsContainer items={sights} />
              ) : null}
            </>

            {state.sight && (
              <SightDetailModal
                showDirection={false}
                data={state.sight}
                closeCallBack={handleOnClose}
              />
            )}
          </>
        ) : null}
      </ScrollView>
    </View>
  );
};
 
