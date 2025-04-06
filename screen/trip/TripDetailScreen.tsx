import Constants from "expo-constants";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Alert,
  Animated,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { enGB, registerTranslation } from "react-native-paper-dates";
import { Host } from "react-native-portalize";

import { COLORS, SIZES } from "../../styles/theme";
registerTranslation("en", enGB);
import { useNavigation } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { addDays, differenceInDays, format } from "date-fns";
import * as Haptics from "expo-haptics";
import { usePostHog } from "posthog-react-native";
import { Modalize } from "react-native-modalize";
import { Portal } from "react-native-portalize";
import {
  NavigationState,
  Route,
  SceneRendererProps,
  TabBar,
  TabView,
} from "react-native-tab-view";

import {
  useLazyGetSightsQuery,
  useRemoveActivityFromRouteMutation,
  useTripQuery,
  useUpdateTripRouteAndActivitiesMutation,
} from "../../api/api.trekspot";
import { SightType } from "../../api/api.types";
import { Loader } from "../../common/ui/Loader";
import { TripRouteStackParamList } from "../../routes/trip/TripRoutes";
import {
  PlusCircleIcon,
  TelescopeIcon,
  XIcon,
} from "../../utilities/SvgIcons.utility";
import { tripDetailStyles } from "./_tripDetailStyles";
import { TopSightDetail } from "./components/TopSightDetail";
import { TripActivityRestCard } from "./components/TripActivityRestCard";
import { getAndReturnCurrentDay } from "./helper";
import { AddActivityButton } from "./SubComponents/AddActivityButton";
import { AddCustomActivity } from "./SubComponents/AddCustomActivity";
// import { MapEmbedView } from "../../common/components/MapEmbedView";
import { Header } from "./SubComponents/Header";
import { TripActivitiesSelect } from "./TripActivitiesSelect";
import { TripActivityCard } from "./TripActivityCard";

type TripProps = NativeStackScreenProps<
  TripRouteStackParamList,
  "TripDetailScreen"
>;

export type TripDaysType = {
  key: string;
  route?: string;
  id: number;
  date: string;
  weekDay: string;
  activities: SightType[];
};

interface IState {
  days: TripDaysType[];
}

export const TabLabel = ({ route }: any) => {
  return (
    <View style={[tripDetailStyles.customTab, { width: 100 }]} key={route?.key}>
      <Text
        style={{
          fontSize: 12,
          marginBottom: 5,
          color: COLORS.gray,
          fontWeight: "500"
        }}
      >
        {route?.weekDay} - {route?.id < 2 ? "Hon." : "Bar."}
      </Text>
      <Text
        style={[
          tripDetailStyles.customTabLabel,
          {
            color: COLORS.black,
            marginBottom: 5,
          },
        ]}
      >
        {route?.date}
      </Text>
    </View>
  );
};

export const TripDetailScreen: React.FC<TripProps> = ({ route }) => {
  const { trip, city } = route.params;
  const posthog = usePostHog();
  const layout = useWindowDimensions();
  const navigation = useNavigation();

  const modalQuestionRef = useRef<Modalize>(null);
  const modalQuestionRef2 = useRef<Modalize>(null);
  const addActivitiesModal = useRef<Modalize>(null);
  const [index, setIndex] = useState(0);

  const [deleteIndexes, setDeleteIndexes] = useState<{
    route: string;
    day: number;
    sight: string;
  }>();
  

  const [topSightDetail, setTopSightDetail] = useState<SightType | null>();
  const [state, setState] = useState<IState>({
    days: [],
  });

  const { isLoading: isTripDetailLoading, data: tripDetail } = useTripQuery({
    id: trip.id,
  });

  const [getSights, { data, isLoading: sightsLoading }] =
    useLazyGetSightsQuery();

  const [
    fetchUpdateRouteAndActivities,
    { isLoading: isUpdateRouteAndActivitiesLoading, isError },
  ] = useUpdateTripRouteAndActivitiesMutation();

  const [
    removeActivityFromRoute,
    { isLoading: isRemoveActivityFromRouteLoading },
  ] = useRemoveActivityFromRouteMutation();

  useEffect(() => {
    getSights({ iso2: city.iso2, city: city.city });
  }, [city]);

  const transformDataForDays = useCallback(() => {
    if (!trip) return;

    const diff = differenceInDays(trip.endAt, trip.startAt) + 1;

    setState((prevState) => ({
      ...prevState,
      days: Array.from(Array(diff).keys()).map((i: number) => {
        const currentRoute = tripDetail?.trip.routes.find(
          (route) => route.city.iso2 === city.iso2
        );
        const currentActivities = currentRoute?.activities
          .filter((j) => j.day == i)
          ?.map((act) => act.sight.id);

        const activities = [];

        if (data && Object.keys(data).length) {
          for (const key in data) {
            const sight = data[key].filter((j) =>
              currentActivities?.some((k) => k == j.id)
            );

            if (sight) activities.push(...sight);
          }
        }

        return {
          route: currentRoute?.id,
          key: `days-${i}`,
          id: i,
          date: format(addDays(trip.startAt, i), "MMM d"),
          weekDay: format(addDays(trip.startAt, i), "EEE"),
          activities,
        };
      }),
    }));
  }, [trip, tripDetail, data]);

  useEffect(() => {
    transformDataForDays();
  }, [transformDataForDays]);
 
  const onAddActivitiesModal = () => {
    addActivitiesModal.current?.open();
  };

  const onQuestionModalOpen = () => {
    modalQuestionRef.current?.open();
  };

  const onQuestion2ModalOpen = () => {
    modalQuestionRef2.current?.open();
  };

  const handleAddToTrip = (activity: SightType) => {
    setState((prevTrip) => {
      const newstate = prevTrip.days.map((day) => {
        if (day.id === index) {
          return {
            ...day,
            activities: [...day.activities, activity],
          };
        }
        return day;
      });

      return {
        ...prevTrip,
        days: newstate,
      };
    });
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  const handleTopSightClick = (sight: SightType) => {
    setTopSightDetail(sight);
    // navigation.navigate("SightDetail", {
    //   sight
    // });
  };

  const handleClear = useCallback(() => {
    setTopSightDetail(null);
  }, []);

  const handleDeleteActivity = useCallback(() => {
    if (!deleteIndexes || !Object.keys(deleteIndexes).length) return;

    removeActivityFromRoute({
      day: deleteIndexes.day,
      sight: deleteIndexes.sight,
      route: deleteIndexes.route,
    });

    setState((prevState) => {
      const newDays = [...prevState.days];
      newDays[deleteIndexes?.day].activities = newDays[
        deleteIndexes?.day
      ].activities.filter((i) => i.id !== deleteIndexes.sight);
      return {
        ...prevState,
        days: newDays,
      };
    });
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  }, [deleteIndexes]);

  const handleSaveActivities = useCallback(() => {
    if (!city || !trip) return;

    const payload = {
      city: city.id!,
      trip: trip.id,
      location: { lat: city.lat, lng: city.lng },
      iso2: city.iso2,
      days: state.days.map((day) => ({
        date: format(addDays(trip.startAt, day.id), "yyyy-MM-dd"),
        day: day.id,
        activities: day.activities.map((i) => i.id),
      })),
    };

    fetchUpdateRouteAndActivities(payload);
  }, [state, trip, city]);

  const removeActivity = useCallback(
    (deleteIndexes: { day: number; sight: string; route: string }) => {
      removeActivityFromRoute({
        day: deleteIndexes.day,
        sight: deleteIndexes.sight,
        route: deleteIndexes.route,
      });

      setState((prevState) => {
        const newDays = [...prevState.days];
        newDays[deleteIndexes?.day].activities = newDays[
          deleteIndexes?.day
        ].activities.filter((i) => i.id !== deleteIndexes.sight);
        return {
          ...prevState,
          days: newDays,
        };
      });
    },
    []
  );

  const [visible, setVisible] = useState(false);

  const fadeAnim = useRef(new Animated.Value(0)).current;

  const showPopup = () => {
    setVisible(true);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 150,
      useNativeDriver: true,
    }).start();
  };

  const hidePopup = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 10,
      useNativeDriver: true,
    }).start(() => setVisible(false));
  };

  const renderCurrentScene: React.FC<
    SceneRendererProps & {
      route: Route;
    }
  > = (props) => {
    const route = props.route as unknown as TripDaysType;

    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: 30,
          paddingBottom: 80,
          paddingLeft: route?.activities?.length > 1 ? 30 : 0,
        }}
      >
        {route?.activities.length > 1 && (
          <View
            style={[
              styles.verticalLine,
              {
                height: "100%",
                backgroundColor: "#e0e0e0",
              },
            ]}
          >
            <View style={styles.hideEnd}></View>
          </View>
        )}
        {route?.activities?.map((itm, activityIndex) => (
          <TripActivityCard
            visited={
              tripDetail?.trip.routes
                .find((route) => route.city.iso2 === city.iso2)
                ?.activities.find((i) => i.sight.id === itm.id)?.visited ||
              false
            }
            item={itm}
            key={itm.id + route.key}
            day={route}
            index={activityIndex}
            lastIndex={route?.activities.length - 1}
            deleteActivityTrigger={(sight: string) => {
              setDeleteIndexes({
                day: route.id,
                sight,
                route: route.route!,
              });
              Alert.alert("Do you really want to delete activity?", "", [
                {
                  text: "Cancel",
                  onPress: () => console.log("Cancel Pressed"),
                  style: "cancel",
                },
                {
                  text: "Delete",
                  onPress: handleDeleteActivity,
                  style: "destructive",
                },
              ]);
            }}
            handleTopSightClick={handleTopSightClick}
            activityAmount={route?.activities.length}
          />
        ))}
        <>
        <TripActivityRestCard
            activityAmount={2}
            // checkedIn={checkedIn}
            // item={item}
            index={index}
            onQuestionModalOpen={onQuestionModalOpen}
            // handleChangeActivityVisited={handleChangeActivityVisited}
          />
          {/* <TripActivityFlightCard
            activityAmount={2}
            // checkedIn={checkedIn}
            // item={item}
            index={index}
            onQuestionModalOpen={() => {}}
            // handleChangeActivityVisited={handleChangeActivityVisited}
          /> */}
          {/* <TripActivityDirectionCard
            activityAmount={2}
            // checkedIn={checkedIn}
            // item={item}
            index={index}
            onQuestionModalOpen={onQuestionModalOpen}
            // handleChangeActivityVisited={handleChangeActivityVisited}
          />
          <TripActivityTourCardCard
            activityAmount={2}
            // checkedIn={checkedIn}
            // item={item}
            index={index}
            onQuestionModalOpen={onQuestionModalOpen}
            // handleChangeActivityVisited={handleChangeActivityVisited}
          />
          <TripActivityLodgingsCard
            activityAmount={2}
            // checkedIn={checkedIn}
            // item={item}
            index={index}
            onQuestionModalOpen={onQuestionModalOpen}
            // handleChangeActivityVisited={handleChangeActivityVisited}
          />
         
          <TripActivityMeetingCard
            activityAmount={2}
            // checkedIn={checkedIn}
            // item={item}
            index={index}
            onQuestionModalOpen={onQuestionModalOpen}
            // handleChangeActivityVisited={handleChangeActivityVisited}
          />

          <TripActivityEventCard
            activityAmount={2}
            //  checkedIn={checkedIn}
            //  item={item}
            index={index}
            onQuestionModalOpen={onQuestionModalOpen}
            //  handleChangeActivityVisited={handleChangeActivityVisited}
          />

          <TripActivityActivityCard
            activityAmount={2}
            // checkedIn={checkedIn}
            // item={item}
            index={index}
            onQuestionModalOpen={onQuestionModalOpen}
            // handleChangeActivityVisited={handleChangeActivityVisited}
          />
          <TripActivityTransportCard
            activityAmount={2}
            // index={index}
            // checkedIn={checkedIn}
            // item={item}
            // handleChangeActivityVisited={handleChangeActivityVisited}
            onQuestionModalOpen={onQuestionModalOpen}
            type="bus"
          />
          <TripActivityTransportCard
            activityAmount={2}
            // index={index}
            // checkedIn={checkedIn}
            // item={item}
            // handleChangeActivityVisited={handleChangeActivityVisited}
            onQuestionModalOpen={onQuestionModalOpen}
            type="train"
          />
          <TripActivityTransportCard
            activityAmount={2}
            // index={index}
            // checkedIn={checkedIn}
            // item={item}
            // handleChangeActivityVisited={handleChangeActivityVisited}
            onQuestionModalOpen={onQuestionModalOpen}
            type="cruise"
          />
          <TripActivityCarRentalCard
            activityAmount={2}
            // checkedIn={checkedIn}
            // item={item}
            index={index}
            onQuestionModalOpen={onQuestionModalOpen}
            // handleChangeActivityVisited={handleChangeActivityVisited}
          /> */}
        </>

        {!isTripDetailLoading && route?.activities.length === 0 ? (
          <View style={tripDetailStyles.noActivitiesWrapper}>
            <TelescopeIcon size={60} color="" />
            <Text
              style={{
                color: COLORS.black,
                fontSize: 16,
                fontWeight: "500",
                marginTop: 15,
              }}
            >
              Click <PlusCircleIcon size="15" /> button to add activities
            </Text>
          </View>
        ) : null}
      </ScrollView>
    );
  };

  const navigationState: NavigationState<TripDaysType> = {
    index,
    routes: state.days,
  };
  const currentDay = getAndReturnCurrentDay();
  const getIndexByDate =
    state && state?.days?.findIndex((day) => day?.date === currentDay);

  useEffect(() => {
    if (getIndexByDate >= 0) {
      setIndex(getIndexByDate);
    }
  }, [getIndexByDate]);

  return (
    <Host>
      <Header
        onQuestion2ModalOpen={onQuestion2ModalOpen}
        data={trip}
        iso2={city.iso2}
        tabData={state.days}
        activeDay={index}
      />
      {isTripDetailLoading || sightsLoading ? (
        <View
          style={[
            styles.loaderWrapper,
            {
              marginTop: -60,
            },
          ]}
        >
          <Loader
            isLoading={isTripDetailLoading || sightsLoading}
            color=""
            background="#F2F2F7"
          />
        </View>
      ) : (
        !!state.days.length && (
          <TabView
            navigationState={navigationState}
            renderScene={renderCurrentScene}
            onIndexChange={setIndex}
            initialLayout={{ width: layout.width }}
            sceneContainerStyle={{
              backgroundColor: "#f7f7f7",
              flex: 1,
            }}
            lazy
            renderLazyPlaceholder={() => (
              <View
                style={[
                  styles.loaderWrapper,
                  {
                    marginTop: -60,
                  },
                ]}
              >
                <Loader isLoading={true} color="" background="#F2F2F7" />
              </View>
            )}
            style={[
              styles.tabViewStyles,
              {
                marginTop: -60,
              },
            ]}
            pagerStyle={{
              backgroundColor: "#F2F2F7",
            }}
            renderTabBar={(props) => (
              <TabBar
                scrollEnabled={true}
                {...props}
                style={{
                  backgroundColor: "#fbfbfb",
                  paddingBottom: 2,
                }}
                contentContainerStyle={{
                  backgroundColor: "#fbfbfb",
                  paddingHorizontal: 0,
                }}
                inactiveColor="#000"
                // onTabLongPress={() =>
                //   Alert.alert("Day details", "Something went wrong", [
                //     {
                //       onPress: () => {},
                //       text: "OK",
                //     },
                //   ])
                // }
                tabStyle={[
                  styles.tabStyles,
                  {
                    width:
                      state?.days?.length <= 5
                        ? SIZES.width / state?.days?.length
                        : "auto",
                  },
                ]}
                activeColor="#000"
                indicatorStyle={{ backgroundColor: COLORS.primaryDark }}
                labelStyle={{
                  textTransform: "capitalize",
                  fontWeight: "600",
                }}
                renderLabel={({ route }) => <TabLabel route={route} />}
              />
            )}
          />
        )
      )}

      {topSightDetail ? ( 
        <TopSightDetail
        visible={topSightDetail}
        onClose={handleClear}
        data={topSightDetail}
      />
      ) : null}

      <AddActivityButton
        onActivitiesModalOpen={showPopup}
        onAddActivitiesModal={onAddActivitiesModal}
      />
      {visible && (
        <Portal>
          <View style={[StyleSheet.absoluteFillObject, styles.bg]}>
            <Animated.View style={[styles.contentCard, { opacity: fadeAnim }]}>
              <TripActivitiesSelect
                days={state.days}
                handleAddToTrip={handleAddToTrip}
                data={data}
                isLoading={sightsLoading}
                removeActivity={removeActivity}
                hidePopup={hidePopup}
                activeDay={index}
                setActiveDay={setIndex}
              />
            </Animated.View>
          </View>
        </Portal>
      )}

      <Portal>
        <Modalize
          ref={addActivitiesModal}
          modalTopOffset={50}
          adjustToContentHeight
          withHandle={false}
          // panGestureEnabled={false}
          HeaderComponent={
            <>
              <View
                style={[tripDetailStyles.rowItemHeader, { paddingTop: 15 }]}
              >
                <Text style={tripDetailStyles.h2}>Add activity</Text>

                <Pressable
                  onPress={() => addActivitiesModal?.current?.close()}
                  hitSlop={20}
                  style={tripDetailStyles.closeButton}
                >
                  <XIcon width="10" />
                </Pressable>
              </View>
            </>
          }
          modalStyle={{
            backgroundColor: "#f8f8f8",
            height: "100%",
          }}
          scrollViewProps={{
            showsVerticalScrollIndicator: false,
          }}
        >
          <AddCustomActivity />
        </Modalize>
      </Portal>
    </Host>
  );
};


const styles = StyleSheet.create({
  contentCard: {
    backgroundColor: "#fff",
    borderRadius: 15,
    elevation: 5,
    justifyContent: "space-between",
    minHeight: SIZES.height,
    paddingRight: 5,
    paddingTop: Constants?.statusBarHeight + 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    width: SIZES.width,
    zIndex: 1,
  },
  hideEnd: {
    backgroundColor: "#f7f7f7",
    bottom: 0,
    height: 185,
    left: 0,
    position: "absolute",
    width: 5,
  },
  loaderWrapper: {
    alignItems: "center",
    backgroundColor: "#F2F2F7",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    flex: 1,
    justifyContent: "center",
    paddingBottom: 200,
  },
  tabStyles: {
    height: 55,
    paddingHorizontal: 0,
    padding: 0,
    paddingTop: 5,
  },
  tabViewStyles: {
    backgroundColor: "#F2F2F7",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    flex: 1,
    marginTop: -35,
    overflow: "hidden",
  },
  verticalLine: {
    left: 22,
    position: "absolute",
    top: 100,
    width: 2,
  },
});
