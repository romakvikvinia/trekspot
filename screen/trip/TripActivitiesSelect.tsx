import { FlashList } from "@shopify/flash-list";
import { Image } from "expo-image";
import { StatusBar } from "expo-status-bar";
import React, { useCallback, useEffect, useState } from "react";
import {
  Platform,
  Pressable,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import { StyleSheet, Text } from "react-native";
import { TabBar, TabView } from "react-native-tab-view";

import { SightType } from "../../api/api.types";
import { Loader } from "../../common/ui/Loader";
import { FloatingActionButton } from "../../components/common/FloatingButtons";
import { exploreStyles } from "../../components/explore/sights/_exploreStyles";
import { SightDetailModal } from "../../components/explore/sights/SightDetailModal";
import { COLORS, SIZES } from "../../styles/theme";
import {
  BackIcon,
  DownIcon,
  PlusIcon,
  StarIcon,
  TrashIcon,
} from "../../utilities/SvgIcons.utility";
import { tripDetailStyles } from "./_tripDetailStyles";
import { TripDaysType } from "./TripDetailScreen";

interface ITripActivitiesSelectProps {
  days: TripDaysType[];
  data: any;
  isLoading: boolean;

  handleAddToTrip: (data: SightType) => void;
  removeActivity: (deleteIndexes: {
    day: number;
    sight: string;
    route: string;
  }) => void;
  hidePopup: () => void;
}

export const TripActivitiesSelect: React.FC<ITripActivitiesSelectProps> = ({
  days,
  data,
  isLoading,
  handleAddToTrip,
  removeActivity,
  hidePopup,
  activeDay,
  setActiveDay,
}) => {
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [topSightDetail, setTopSightDetail] = useState(null);
  const [routes, setRoutes] = useState([]);
  const [tabData, setTabData] = useState({});

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

  const renderScene = ({ route }) => {
    if (isLoading) {
      return (
        <View
          style={[
            styles.scene,
            { justifyContent: "center", alignItems: "center", marginTop: 150 },
          ]}
        >
          <Loader isLoading={isLoading} color="" background="" />
        </View>
      );
    }
    const filterImages = tabData?.[route?.key]?.filter(
      (sightItem) => sightItem?.images?.length > 0
    );
    return (
      // <View style={{ minHeight: SIZES.height - 180 }}>
      <FlashList
        data={filterImages}
        keyExtractor={(item, index) =>
          `${route.key}-${index}-${
            days &&
            days.some((day) =>
              day.activities.some((activity) => activity?.id === item?.id)
            )
          }`
        }
        renderItem={({ item, index }) =>
          item?.images?.length > 0 && (
            <TouchableOpacity
              activeOpacity={0.7}
              style={[
                styles.thingsTodoItem,
                {
                  marginRight: index % 2 === 0 ? "auto" : undefined,
                  marginLeft: index % 2 === 1 ? "auto" : undefined,
                },
              ]}
              onPress={() => showTopSight(item)}
            >
              <Image
                style={[
                  {
                    minHeight: 160,
                    borderTopLeftRadius: 12,
                    borderTopRightRadius: 12,
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

                <View style={styles.actionButtons}>
                  {days &&
                  days.some((day) =>
                    day.activities.some((activity) => activity?.id === item?.id)
                  ) ? (
                    <>
                      <TouchableOpacity
                        onPress={() => {
                          const day = days.find((day) =>
                            day.activities.some(
                              (activity) => activity?.id === item?.id
                            )
                          );
                          removeActivity({
                            route: day?.route!,
                            day: day?.id!,
                            sight: item?.id!,
                          });
                        }}
                        activeOpacity={0.7}
                        style={styles.detailsButton}
                      >
                        <Text
                          style={[
                            styles.detailsButtonText,
                            {
                              color: "red",
                            },
                          ]}
                        >
                          Remove
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={[
                          styles.addToButton,
                          {
                            backgroundColor: "red",
                          },
                        ]}
                        onPress={() => {
                          const day = days.find((day) =>
                            day.activities.some(
                              (activity) => activity?.id === item?.id
                            )
                          );
                          removeActivity({
                            route: day?.route!,
                            day: day?.id!,
                            sight: item?.id!,
                          });
                        }}
                      >
                        <TrashIcon color="#fff" />
                      </TouchableOpacity>
                    </>
                  ) : (
                    <>
                      <TouchableOpacity
                        onPress={() => handleAddToTrip(item)}
                        activeOpacity={0.7}
                        style={styles.detailsButton}
                      >
                        <Text style={styles.detailsButtonText}>
                          Add to trip
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.addToButton}
                        onPress={() => handleAddToTrip(item)}
                      >
                        <PlusIcon color="#fff" size="15" />
                      </TouchableOpacity>
                    </>
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
      // </View>
    );
  };

  const handleClear = useCallback(() => {
    setTopSightDetail(null);
  }, []);
  const [tabViewKey, setTabViewKey] = useState(0);

  useEffect(() => {
    if (routes.length) {
      setTabViewKey((prev) => prev + 1);
    }
  }, [routes]);

  const cities = [
    {
      name: "Milan",
      id: 1,
    },
    {
      name: "Berlin",
      id: 2,
    },
    {
      name: "Rome",
      id: 3,
    },
  ];
  const [selectedCity, setSelectedCity] = useState(cities[0]);

  console.log(days);

  return (
    <>
      <StatusBar style="dark" />
      <View style={tripDetailStyles.rowItemHeader}>
        <Pressable onPress={() => hidePopup()} hitSlop={15}>
          <BackIcon size="18" />
        </Pressable>

        <View style={styles.rg}>
          <FloatingActionButton
            withHeader={true}
            title="Select dates"
            //@ts-expect-error ///
            buttons={days.map((day, i) => ({
              label: day.date,
              onPress: () => setActiveDay(i),
              icon: null,
              isDanger: false,
              isActive: day.id === days[activeDay]?.id,
            }))}
            //@ts-expect-error ///
            renderTrigger={() => (
              <View style={styles.dropDownButton}>
                <Text style={styles.txtLabel}>
                  Add to:{" "}
                  <Text
                    style={{
                      fontWeight: "bold",
                      color: COLORS.black,
                      fontSize: 14,
                    }}
                  >
                    {[days[activeDay]?.date]}
                  </Text>
                </Text>
                <DownIcon size={10} />
              </View>
            )}
          />

          <FloatingActionButton
            withHeader={true}
            title="Select city"
            //@ts-expect-error ///
            buttons={cities.map((city, i) => ({
              label: city.name,
              onPress: () => setSelectedCity(city),
              icon: null,
              isDanger: false,
              isActive: city.id === selectedCity?.id,
            }))}
            //@ts-expect-error ///
            renderTrigger={() => (
              <View style={[styles.dropDownButton, {
                justifyContent: "space-between",
              }]}>
                <Text
                  style={{
                    fontWeight: "bold",
                    color: COLORS.black,
                    marginRight: 5,
                    fontSize: 14,
                  }}
                >
                  Berlin{" "}
                </Text>
                <DownIcon size={10} />
              </View>
            )}
          />
        </View>
      </View>

      <View style={styles.selectActivitesWrapper}>
        <View style={styles.itemRow}>
          <TabView
            key={tabViewKey}
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={{ width: layout.width }}
            sceneContainerStyle={{
              backgroundColor: "#F2F2F7",
            }}
            style={{
              backgroundColor: "#F2F2F7",
            }}
            pagerStyle={{
              backgroundColor: "#F2F2F7",
            }}
            renderTabBar={(props) => (
              <TabBar
                scrollEnabled={true}
                {...props}
                style={{
                  backgroundColor: "#fff",
                  paddingBottom: 15,
                  ...COLORS.shadow,
                }}
                contentContainerStyle={{
                  backgroundColor: "#fff",
                  paddingHorizontal: 0,
                }}
                inactiveColor={COLORS.darkgray}
                tabStyle={{
                  paddingHorizontal: 0,
                  padding: 0,
                  height: 35,
                }}
                activeColor={COLORS.primary}
                indicatorStyle={{
                  backgroundColor: COLORS.primary,
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
      {topSightDetail ? (
        <SightDetailModal data={topSightDetail} closeCallBack={handleClear} />
      ) : null}
    </>
  );
};
const styles = StyleSheet.create({
  actionButtons: {
    alignItems: "center",
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 25,
    overflow: "hidden",
  },
  addToButton: {
    alignItems: "center",
    backgroundColor: COLORS.primary,
    borderBottomEndRadius: 12,
    display: "flex",
    height: 45,
    justifyContent: "center",
    textAlign: "center",
    width: 45,
  },
  detailsButton: {
    backgroundColor: COLORS.lightGray,
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    paddingHorizontal: 10,
    paddingVertical: 15,
    textAlign: "center",
  },
  detailsButtonText: {
    color: COLORS.primary,
    fontSize: 14,
    fontWeight: "bold",
  },
  dropDownButton: {
    alignItems: "center",
    backgroundColor: "#f2f2f2",
    borderRadius: 8,
    flexDirection: "row",
    marginLeft: 15,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  itemRow: {
    backgroundColor: "#F2F2F7",
    marginTop: 0,
    minHeight: SIZES.height - 100,
  },
  rg: {
    alignItems: "center",
    flexDirection: "row",
  },
  selectActivitesWrapper: {
    backgroundColor: "#F2F2F7",
    flex: 1,
  },
  thingsTodoItem: {
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 20,
    marginRight: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 1.84,
    width: "96%",
    ...Platform.select({
      android: {
        elevation: 2,
      },
    }),
  },
  thingsTodoItemDetails: {},
  thingsTodoItemTitle: {
    fontSize: 18,
    fontWeight: "500",
    marginTop: 15,
    paddingHorizontal: 15,
  },
  thingsTodoItemiIn: {
    paddingHorizontal: 15,
  },
  txtLabel: {
    marginRight: 8,
  },
});
