import { FlashList } from "@shopify/flash-list";
import { Image } from "expo-image";
import React, { useCallback, useEffect, useState } from "react";
import { Platform, TouchableOpacity, useWindowDimensions, View } from "react-native";
import { StyleSheet, Text } from "react-native";
import { TabBar, TabView } from "react-native-tab-view";

import { SightType } from "../../api/api.types";
import { Loader } from "../../common/ui/Loader";
import { exploreStyles } from "../../components/explore/sights/_exploreStyles";
import { SightDetailModal } from "../../components/explore/sights/SightDetailModal";
import { COLORS, SIZES } from "../../styles/theme";
import { PlusIcon, StarIcon, TrashIcon } from "../../utilities/SvgIcons.utility";
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
}

export const TripActivitiesSelect: React.FC<ITripActivitiesSelectProps> = ({
  days,
  data,
  isLoading,
  handleAddToTrip,
  removeActivity,
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
    const filterImages = tabData?.[route?.key]?.filter(sightItem => sightItem?.images?.length > 0);  
    return (
      <View style={{ minHeight: SIZES.height - 180 }}> 
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
          renderItem={({ item, index }) => item?.images?.length > 0 && (
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
                    minHeight: 140,
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
                    <Text style={[styles.detailsButtonText, {
                      color: "red"
                    }]}>
                      Remove
                    </Text>
                  </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.addToButton, {
                        backgroundColor: "red"
                      }]}
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
                      <PlusIcon />
                    </TouchableOpacity>
                  </>
                  )}
                </View>
              </View>
            </TouchableOpacity>
          )}
          estimatedItemSize={200}
          numColumns={2}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 15,
            paddingTop: 25,
            paddingBottom: 25,
          }}
        />
      </View>
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
  
  return (
    <>
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
                  backgroundColor: "#F2F2F7",
                  paddingBottom: 15,
                }}
                contentContainerStyle={{
                  backgroundColor: "#F2F2F7",
                  paddingHorizontal: 0,
                }}
                inactiveColor="#000"
                tabStyle={{
                  paddingHorizontal: 0,
                  padding: 0,
                  height: 35,
                }}
                activeColor="#000"
                indicatorStyle={{ backgroundColor: COLORS.primaryDark }}
                labelStyle={{
                  textTransform: "capitalize",
                  fontWeight: "bold",
                  fontSize: 15,
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
  itemRow: {
    marginTop: 0,
    minHeight: SIZES.height - 100,
  },
  selectActivitesWrapper: {
    flex: 1,
  },
  thingsTodoItem: {
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 20,
    marginRight: 15,
    shadowColor: '#000',
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
});
