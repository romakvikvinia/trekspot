import { FlashList } from "@shopify/flash-list";
import React, { useCallback, useEffect, useState } from "react";
import { Image } from "expo-image";
import { Platform, TouchableOpacity, useWindowDimensions, View } from "react-native";
import { StyleSheet, Text } from "react-native";
import { SightDetailModal } from "../../components/explore/sights/SightDetailModal";
import { exploreStyles } from "../../components/explore/sights/_exploreStyles";
import { COLORS, SIZES } from "../../styles/theme";
import { PlusIcon, StarIcon, TrashIcon } from "../../utilities/SvgIcons.utility";
import { TabBar, TabView } from "react-native-tab-view";
import { Loader } from "../../common/ui/Loader";
import { TripDaysType } from "./TripDetailScreen";
import { SightType } from "../../api/api.types";

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
    return (
      <View style={{ minHeight: SIZES.height - 205 }}>
        <FlashList
          data={tabData[route.key]}
          keyExtractor={(item, index) =>
            `${route.key}-${index}-${
              days &&
              days.some((day) =>
                day.activities.some((activity) => activity?.id === item?.id)
              )
            }`
          }
          renderItem={({ item, index }) => (
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
                <Text style={styles.thingsTodoItemTitle} numberOfLines={1}>
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

  return (
    <>
      <View style={styles.selectActivitesWrapper}>
        <View style={styles.itemRow}>
          <TabView
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
                  fontSize: 15
                }}
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
  selectActivitesWrapper: {
    flex: 1,
  },
  tabBar: {
    flexDirection: "row",
  },
  eventsRowTitle: {
    color: COLORS.black,
    fontSize: 22,
    marginBottom: 15,
    paddingHorizontal: 15,
  },
  thingsTodoItemTitle: {
    fontSize: 18,
    fontWeight: "500",
    paddingHorizontal: 15,
    marginTop: 15,
  },
  thingsTodoItemiIn: {
    paddingHorizontal: 15,
  },
  detailsButton: {
    backgroundColor: COLORS.lightGray,
    paddingVertical: 15,
    paddingHorizontal: 10,
    flex: 1,
    textAlign: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  addToButton: { 
    textAlign: "center",
    justifyContent: "center",
    display: "flex",
    backgroundColor: COLORS.primary,
    width: 45,
    height: 45,
    alignItems: "center",
    borderBottomEndRadius: 12,
  },
  addToButtonText: {
    color: COLORS.primary,
    fontSize: 14,
    fontWeight: "bold",
  },
  detailsButtonText: {
    color: COLORS.primary,
    fontSize: 14,
    fontWeight: "bold",
  },
  thingsTodoItem: {
    backgroundColor: "#fff",
    width: "96%",
    marginRight: 15,
    borderRadius: 12,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 1.84, 
    ...Platform.select({
      android: {
        elevation: 5,
      },
    }),
  },
  thingsTodoItemDetails: {},
  actionButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 25,
    alignItems: "center",
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    overflow: "hidden",
  },
  thingsTodoItemiIntypeText: {
    fontSize: 12,
    color: COLORS.gray,
    marginTop: 5,
    marginBottom: 5,
  },
  thingsTodoItemiInprice: {
    fontSize: 14,
    color: COLORS.gray,
    marginTop: 5,
    marginBottom: 5,
  },
  itemRow: {
    marginTop: 0,
    minHeight: SIZES.height - 100,
  },
  rowTitle: {
    fontSize: 22,
    fontWeight: "500",
    color: COLORS.black,
  },
  categories: {
    marginTop: 15,
    marginBottom: 15,
    paddingHorizontal: 15,
  },
  categoryitem: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: "#fff",
    borderRadius: 50,
    marginRight: 8,
  },
  categoryitemText: {
    fontSize: 14,
    color: COLORS.black,
  },
  active: {
    backgroundColor: COLORS.primaryDark,
  },
  activeText: {
    color: "#fff",
  },
});

{
  /* <View style={[styles.itemRow, { marginTop: 35, marginBottom: 45 }]}>
          <Text style={styles.eventsRowTitle}>
            Events <Text style={{ fontSize: 14 }}>(During trip dates)</Text>
          </Text>
          <FlashList
            data={[0, 1, 2, 3, 4, 5]}
            renderItem={({ item }) => (
              <TouchableOpacity
                activeOpacity={0.7}
                style={[
                  styles.thingsTodoItem,
                  {
                    width: 170,
                    marginRight: 15,
                  },
                ]}
                onPress={() => onEmbedModalOpen()}
              >
                <Image
                  style={[
                    {
                      minHeight: 140,
                    },
                  ]}
                  cachePolicy="memory"
                  contentFit="cover"
                  transition={0}
                  source={{
                    uri: "https://cdn.pixabay.com/photo/2019/03/09/21/30/downtown-4045035_1280.jpg",
                  }}
                ></Image>

                <View style={styles.thingsTodoItemDetails}>
                  <Text style={styles.thingsTodoItemTitle}>Event title</Text>

                  <View
                    style={[styles.thingsTodoItemiIn, { paddingBottom: 15 }]}
                  >
                    <Text
                      style={[
                        styles.thingsTodoItemiIntypeText,
                        {
                          fontSize: 14,
                          color: COLORS.black,
                          marginTop: 10,
                        },
                      ]}
                    >
                      <CalendarFilledIcon size="12" color={COLORS.darkgray} />{" "}
                      14 Nov
                    </Text>

                    <Text style={[styles.thingsTodoItemiInprice]}>
                      <TripLocationIcon size="12" color={COLORS.darkgray} />{" "}
                      Tbilisi
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            )}
            estimatedItemSize={200}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingHorizontal: 15,
            }}
          />
        </View> */
}
{
  /* <Portal>
        <Modalize ref={modalEmbedRef} modalTopOffset={65} adjustToContentHeight>
          <MapEmbedView
            blogUrl="https://www.ticketmaster.fr/en/resultat?ipSearch=lara+fabian"
            placeTitle="Tbilisi"
            modalEmbedRef={modalEmbedRef}
          />
        </Modalize>
      </Portal> */
}
