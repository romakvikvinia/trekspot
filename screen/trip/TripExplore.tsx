import { useNavigation } from "@react-navigation/native";
import { FlashList } from "@shopify/flash-list";
import Constants from "expo-constants";
import { Image } from "expo-image";
import { useEffect, useState } from "react";
import {
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import { TabBar } from "react-native-tab-view";
import { TabView } from "react-native-tab-view";

import { useLazyGetSightsQuery } from "../../api/api.trekspot";
import { MustTryBadge } from "../../common/components/MustTryBadge";
import { Loader } from "../../common/ui/Loader";
import { exploreStyles } from "../../components/explore/sights/_exploreStyles";
import { globalStyles } from "../../styles/globalStyles";
import { COLORS } from "../../styles/theme";
import { BackIcon, StarIcon } from "../../utilities/SvgIcons.utility";
import { TopSightDetail } from "./components/TopSightDetail";

export const TripExplore = ({ route }) => {
  const { trip } = route.params;
  const navigation = useNavigation();
  const [getSights, { data, isLoading: sightsLoading }] =
    useLazyGetSightsQuery();

  useEffect(() => {
    getSights({ iso2: trip.cities[0].iso2, city: trip.cities[0].city });
  }, [trip.cities[0]]);
 
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [routes, setRoutes] = useState([]);
  const [tabData, setTabData] = useState({});
  const [tabViewKey, setTabViewKey] = useState(0);
  const [topSightDetail, setTopSightDetail] = useState(null);

  useEffect(() => {
    if (routes.length) {
      setTabViewKey((prev) => prev + 1);
    }
  }, [routes]);

  useEffect(() => {
    if (data) {
      const keys = Object.keys(data);
      const newRoutes = keys.map((key) => ({ key, title: key }));
      setRoutes(newRoutes);
      const initialTabData = keys.reduce((acc, key) => {
        acc[key] = data[key];
        return acc;
      }, {});
      setTabData(initialTabData);
    }
  }, [data]);

  const showTopSight = (sight: object) => {
    setTopSightDetail(sight);
  };

  const handleClear = () => {
    setTopSightDetail(null);
  };

  const renderScene = ({ route }) => {
    if (sightsLoading) {
      return (
        <View
          style={[
            styles.scene,
            { justifyContent: "center", alignItems: "center", marginTop: 150 },
          ]}
        >
          <Loader isLoading={sightsLoading} color="" background="" />
        </View>
      );
    }
    const filterImages = tabData?.[route?.key]?.filter(
      (sightItem) => sightItem?.images?.length > 0
    );
    return (
      <FlashList
        data={filterImages}
        keyExtractor={(item, index) => `${route.key}-${index}`}
        renderItem={({ item, index }) =>
          item?.images?.length > 0 && (
            <TouchableOpacity
              style={[
                styles.thingsTodoItem,
                {
                  marginRight: index % 2 === 0 ? "auto" : undefined,
                  marginLeft: index % 2 === 1 ? "auto" : undefined,
                },
              ]}
              onPress={() => showTopSight(item)}
              activeOpacity={0.7}
            >
              <MustTryBadge label="Must visit" />
              <Image
                style={[
                  {
                    minHeight: 240,
                    borderRadius: 12,
                  },
                ]}
                cachePolicy="memory-disk"
                contentFit="cover"
                transition={0}
                source={
                  item?.image?.url?.length
                    ? {
                        uri: item?.image?.url,
                      }
                    : require("../../assets/no-image.png")
                }
              ></Image>

              <View style={styles.thingsTodoItemDetails}>
                <Text style={styles.thingsTodoItemTitle} numberOfLines={2}>
                  {item?.title}
                </Text>

                <View style={styles.thingsTodoItemiIn}>
                  {item?.rate && (
                    <View style={exploreStyles.ratingWrapper}>
                      <View
                        style={{
                          position: "relative",
                          top: -1,
                          opacity: 0.8,
                        }}
                      >
                        <StarIcon size={15} color="#FFBC3E" />
                      </View>
                      <Text style={exploreStyles.ratingText}>{item?.rate}</Text>
                    </View>
                  )}
                </View>
              </View>
            </TouchableOpacity>
          )
        }
        estimatedItemSize={200}
        numColumns={2}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 15,
          paddingTop: 25,
          paddingBottom: 60,
        }}
      />
    );
  };

  return (
    <>
      <View style={styles.safeArea}>
        <StatusBar barStyle="dark-content" />

        <View
          style={[
            globalStyles.screenHeader,
            { borderBottomWidth: 0, paddingBottom: 5 },
          ]}
        >
          <View style={{ width: 100 }}>
            <Pressable
              onPress={() => navigation.goBack()}
              style={globalStyles.screenHeaderBackButton}
              hitSlop={20}
            >
              <BackIcon size="18" />
            </Pressable>
          </View>

          <Text style={globalStyles.screenTitle}>Explore</Text>
          <View
            style={[
              {
                width: 100,
              },
            ]}
          ></View>
        </View>
        <View style={styles.selectActivitesWrapper}>
          <TabView
            key={tabViewKey}
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={{ width: layout.width }}
            sceneContainerStyle={{
              backgroundColor: "#f8f8f8",
            }}
            style={{
              backgroundColor: "#f8f8f8",
            }}
            pagerStyle={{
              backgroundColor: "#f8f8f8",
            }}
            renderTabBar={(props) => (
              <TabBar
                scrollEnabled={true}
                {...props}
                style={{
                  backgroundColor: "#f8f8f8",
                  paddingBottom: 15,
                  ...COLORS.shadow,
                }}
                contentContainerStyle={{
                  backgroundColor: "#f8f8f8",
                  paddingHorizontal: 0,
                }}
                inactiveColor={COLORS.darkgray}
                tabStyle={{
                  paddingHorizontal: 0,
                  padding: 0,
                  height: 35,
                }}
                activeColor={COLORS.black}
                indicatorStyle={{
                  backgroundColor: COLORS.black,
                }} 
                labelStyle={{
                  textTransform: "capitalize",
                  fontWeight: "600",
                  fontSize: 14,
                }}
                android_ripple={{ color: "#F2F2F7" }}
              />
            )}
          />
        </View>
      </View>
      <TopSightDetail
        visible={topSightDetail}
        onClose={handleClear}
        data={topSightDetail}
        showAddToTrip={true}
      />
    </>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: "#f8f8f8",
    flex: 1,
    paddingTop: Constants?.statusBarHeight + 15,
  },
  selectActivitesWrapper: {
    backgroundColor: "#F2F2F7",
    flex: 1,
  },
  thingsTodoItem: {
    borderRadius: 12,
    marginBottom: 30,
    marginRight: 15,
    width: "96%",
  },
  thingsTodoItemTitle: {
    fontSize: 16,
    fontWeight: "500",
    marginTop: 10,
  },
});
