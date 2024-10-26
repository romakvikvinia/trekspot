import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import {
  Alert,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import { COLORS, SIZES } from "../../styles/theme";
import { enGB, registerTranslation } from "react-native-paper-dates";
registerTranslation("en", enGB);
import { tripDetailStyles } from "./_tripDetailStyles";
import {
  EditIcon,
  PlusIcon,
  TrashIcon,
  TwoSideArrows,
  XIcon,
} from "../../utilities/SvgIcons.utility";
import * as Haptics from "expo-haptics";

import { Portal } from "react-native-portalize";
import { Modalize } from "react-native-modalize";

import { QuestionModal } from "../../common/components/QuestionModal";
import { questionModaStyles } from "../../styles/questionModaStyles";
import { TripActivitiesSelect } from "./TripActivitiesSelect";

// import { MapEmbedView } from "../../common/components/MapEmbedView";

import { Header } from "./SubComponents/Header";
import { TripActivityCard } from "./TripActivityCard";
import {
  useLazyGetSightsQuery,
  useRemoveActivityFromRouteMutation,
  useTripQuery,
  useUpdateTripRouteAndActivitiesMutation,
} from "../../api/api.trekspot";
import { SightDetailModal } from "../../components/explore/sights/SightDetailModal";

import { TripRouteStackParamList } from "../../routes/trip/TripRoutes";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { addDays, differenceInDays, format } from "date-fns";
import { SightType } from "../../api/api.types";
import {
  NavigationState,
  Route,
  SceneRendererProps,
  TabBar,
  TabView,
} from "react-native-tab-view";
import { Loader } from "../../common/ui/Loader";
import { useTripStore } from "../../components/store/store";
import { useNavigation } from "@react-navigation/native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";

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

export const TabLabel = ({
  route
}: any) => {

  return ( 
    <View style = {[tripDetailStyles.customTab, {width: 100,}]} key = {route?.key}>
      <Text style = {{
              fontSize: 12,
              marginBottom: 3,
              color: COLORS.gray,
          }}>
          {route?.weekDay} 
      </Text> 
      <Text style = {[
              tripDetailStyles.customTabLabel,
              {
                  color: COLORS.black,
                  marginBottom: 5,
              },
          ]}>
          { route?.date} 
      </Text> 
    </View>
  )
}

export const TripDetailScreen: React.FC<TripProps> = ({ route }) => {
  const navigation = useNavigation();
  const { trip, city } = route.params;

  const layout = useWindowDimensions();

  const activitiesModal = useRef<Modalize>(null);
  const modalQuestionRef = useRef<Modalize>(null);
  const modalQuestionRef2 = useRef<Modalize>(null);
  // const modalEmbedRef = useRef<Modalize>(null);
  const [index, setIndex] = useState(0);

  const [deleteIndexes, setDeleteIndexes] = useState<{
    route: string;
    day: number;
    sight: string;
  }>();
  const { setTripStyle, tripStyle } = useTripStore((state: any) => ({
    setTripStyle: state.setTripStyle,
    tripStyle: state.tripStyle,
  }));

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
            let sight = data[key].filter((j) =>
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

  const onActivitiesModalOpen = () => {
    activitiesModal.current?.open();
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
      let newDays = [...prevState.days];
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

  const combineObjectArrays = (obj: any) => {
    let combinedArray: any[] = [];
    for (let key in obj) {
      if (Array.isArray(obj[key])) {
        combinedArray = combinedArray.concat(obj[key]);
      }
    }
    return combinedArray;
  };
  const combinedArray = combineObjectArrays(data);

  const removeActivity = useCallback(
    (deleteIndexes: { day: number; sight: string; route: string }) => {
      removeActivityFromRoute({
        day: deleteIndexes.day,
        sight: deleteIndexes.sight,
        route: deleteIndexes.route,
      });

      setState((prevState) => {
        let newDays = [...prevState.days];
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
 

  useEffect(() => {
    navigation.getParent()?.setOptions({
      tabBarStyle: {
        display: "none",
      },
    });
    return () => {
      navigation.getParent()?.setOptions({
        tabBarStyle: {
          display: "flex",
        },
      });
    };
  }, []);

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
            onQuestionModalOpen={(sight: string) => {
              onQuestionModalOpen();
              setDeleteIndexes({
                day: route.id,
                sight,
                route: route.route!,
              });
            }}
            handleTopSightClick={handleTopSightClick}
            activityAmount={route?.activities.length}
          />
        ))}

        {!isTripDetailLoading && route?.activities.length === 0 ? (
          <View style={tripDetailStyles.noActivitiesWrapper}>
            <Text
              style={{
                color: COLORS.black,
                fontSize: 18,
                fontWeight: "bold",
              }}
            >
              You don't have activites for today
            </Text>
            <TouchableOpacity
              style={tripDetailStyles.addActivityButtonItem}
              activeOpacity={0.7}
              onPress={() => {
                onActivitiesModalOpen();
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              }}
            >
              <Text style={tripDetailStyles.addActivityButtonText}>
                Add activity
              </Text>
            </TouchableOpacity>
          </View>
        ) : null}
      </ScrollView>
    );
  };

  const navigationState: NavigationState<TripDaysType> = {
    index,
    routes: state.days,
  };

  return (
    <>
      <Header
        onQuestion2ModalOpen={onQuestion2ModalOpen}
        data={trip}
        iso2={city.iso2}
        tabData={state.days}
        activeDay={index}
      />
      {isTripDetailLoading || sightsLoading ? (
        <View style={styles.loaderWrapper}>
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
            style={[
              styles.tabViewStyles,
              {
                marginTop: !tripStyle ? -35 : 0,
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
        <SightDetailModal showDirection={true} data={topSightDetail} closeCallBack={handleClear} />
      ) : null}

      {state?.days[index]?.activities?.length > 0 ? (
        <TouchableOpacity
          onPress={() => {
            onActivitiesModalOpen();
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          }}
          activeOpacity={0.7}
          style={tripDetailStyles.addActivityButton}
        >
          <PlusIcon />
        </TouchableOpacity>
      ) : null}

      <Portal>
        <Modalize
          ref={activitiesModal}
          modalTopOffset={200}
          modalHeight={SIZES.height - 100}
          panGestureEnabled={true}
          onClosed={handleSaveActivities}
          HeaderComponent={
            <>
              <View style={tripDetailStyles.rowItemHeader}>
                <Text style={tripDetailStyles.h2}>
                  Activities -{" "}
                  <Text
                    style={{
                      fontWeight: "500",
                      color: COLORS.primary,
                    }}
                  >
                    {[state.days[index]?.date]}
                  </Text>
                </Text>

                <TouchableOpacity
                  onPress={() => activitiesModal?.current?.close()}
                  activeOpacity={0.5}
                  style={tripDetailStyles.closeButton}
                >
                  <XIcon width="10" />
                </TouchableOpacity>
              </View>
            </>
          }
          modalStyle={{
            backgroundColor: "#F2F2F7",
          }}
          scrollViewProps={{
            showsVerticalScrollIndicator: false,
          }}
        >
          <TripActivitiesSelect
            days={state.days}
            handleAddToTrip={handleAddToTrip}
            data={data}
            isLoading={sightsLoading}
            removeActivity={removeActivity}
          />
        </Modalize>
      </Portal>

      {/* Questions */}

      <Portal>
        <Modalize
          ref={modalQuestionRef2}
          modalTopOffset={65}
          disableScrollIfPossible
          adjustToContentHeight
          velocity={100000}
          tapGestureEnabled={false}
          closeSnapPointStraightEnabled={false}
          modalStyle={{
            backgroundColor: "#F2F2F7",
            minHeight: "35%",
          }}
          scrollViewProps={{
            showsVerticalScrollIndicator: false,
          }}
        >
          <QuestionModal
            onClose={() => modalQuestionRef2?.current?.close()}
            title="Action"
          >
            <View style={questionModaStyles.buttonGroup}>
              <TouchableOpacity
                activeOpacity={0.7}
                style={[questionModaStyles.button]}
                onPress={() => {
                  setTripStyle(!tripStyle);
                  modalQuestionRef2.current?.close();
                }}
              >
                <Text style={questionModaStyles.buttonText}>
                  {!tripStyle ? "Classic" : "Reach"} view
                </Text>
                <TwoSideArrows size="15" />
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.7}
                style={[questionModaStyles.button]}
              >
                <Text style={questionModaStyles.buttonText}>Edit</Text>
                <EditIcon size="15" />
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() =>
                  Alert.alert("Do you really want to delete trip?", "", [
                    {
                      text: "Cancel",
                      onPress: () => console.log("Cancel Pressed"),
                      style: "cancel",
                    },
                    {
                      text: "Delete",
                      onPress: () => console.log("OK Pressed"),
                      style: "destructive",
                    },
                  ])
                }
                style={[questionModaStyles.button, { borderBottomWidth: 0 }]}
              >
                <Text style={[questionModaStyles.buttonText, { color: "red" }]}>
                  Delete
                </Text>
                <TrashIcon size="15" />
              </TouchableOpacity>
            </View>
          </QuestionModal>
        </Modalize>
      </Portal>

      <Portal>
        <Modalize
          ref={modalQuestionRef}
          modalTopOffset={65}
          disableScrollIfPossible
          adjustToContentHeight
          velocity={100000}
          tapGestureEnabled={false}
          closeSnapPointStraightEnabled={false}
          modalStyle={{
            backgroundColor: "#F2F2F7",
            minHeight: 200,
          }}
          scrollViewProps={{
            showsVerticalScrollIndicator: false,
          }}
        >
          <QuestionModal
            onClose={() => modalQuestionRef?.current?.close()}
            title="Action"
          >
            <View style={questionModaStyles.buttonGroup}>
              {/* <TouchableOpacity
                activeOpacity={0.7}
                style={[questionModaStyles.button]}
              >
                <Text style={questionModaStyles.buttonText}>Edit</Text>
                <EditIcon size="15" />
              </TouchableOpacity> */}
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => {
                  modalQuestionRef.current?.close();
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
                style={[questionModaStyles.button, { borderBottomWidth: 0 }]}
              >
                <Text style={[questionModaStyles.buttonText, { color: "red" }]}>
                  Delete
                </Text>
                <TrashIcon size="15" />
              </TouchableOpacity>
            </View>
          </QuestionModal>
        </Modalize>
      </Portal>

      {/* <Portal>
        <Modalize ref={modalEmbedRef} modalTopOffset={65} adjustToContentHeight>
          <MapEmbedView
            blogUrl="https://file-examples.com/wp-content/storage/2017/10/file-sample_150kB.pdf"
            placeTitle="Tbilisi"
            modalEmbedRef={modalEmbedRef}
          />
        </Modalize>
      </Portal> */}
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 0,
  },
  contentContainer: {
    backgroundColor: "white",
  },
  itemContainer: {
    padding: 6,
    margin: 6,
    backgroundColor: "#eee",
  },
  tabViewStyles: {
    backgroundColor: "#F2F2F7",
    flex: 1,
    overflow: "hidden",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    marginTop: -35
  },
  tabStyles: {
    paddingHorizontal: 0,
    padding: 0,
    height: 55,
    paddingTop: 5,
  },
  loaderWrapper: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: -35,
    backgroundColor: "#F2F2F7",
    flex: 1,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    paddingBottom: 200,
  }
});