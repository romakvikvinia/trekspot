import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from "react";
import {
  Alert,
  Animated,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { enGB, registerTranslation } from "react-native-paper-dates";

import { COLORS } from "../../styles/theme";
registerTranslation("en", enGB);
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import * as Haptics from "expo-haptics";
import { Image } from "expo-image";
import moment from "moment";
import { usePostHog } from "posthog-react-native";
import { Modalize } from "react-native-modalize";
import { Portal } from "react-native-portalize";
// import { TrekSneckBar } from "../../common/components/TrekSneckBar";
import { useDispatch } from "react-redux";
import { toast } from "sonner-native";

import {
  trekSpotApi,
  useDeleteTripMutation,
  useLazyMyTripsQuery,
} from "../../api/api.trekspot";
import { TripType } from "../../api/api.types";
import { GuestUserModal } from "../../common/components/GuestUserModal";
// action modal
import { QuestionModal } from "../../common/components/QuestionModal";
import { Loader } from "../../common/ui/Loader";
import { useAppSelector } from "../../package/store";
import { TripRouteStackParamList } from "../../routes/trip/TripRoutes";
import { questionModaStyles } from "../../styles/questionModaStyles";
import { Events } from "../../utilities/Posthog";
import {
  EditIcon,
  PlusIcon,
  TrashIcon,
} from "../../utilities/SvgIcons.utility";
import { _tripScreenStyles } from "./_tripScreenStyles";
import { NewTrip } from "./NewTrip";
import { TripItem } from "./TripItem";

type TripProps = NativeStackScreenProps<TripRouteStackParamList, "TripsScreen">;

interface IState {
  trip?: TripType;
}

export const TripScreen: React.FC<TripProps> = ({ navigation }) => {
  const posthog = usePostHog();
  const createOrUpdateTripModal = useRef<Modalize>(null);
  const modalQuestionRef = useRef<Modalize>(null);
  const dispatch = useDispatch();
  const { user } = useAppSelector((state) => state.auth);

  const [state, setState] = React.useState<IState>({ trip: undefined });
  const [tripType, setTripType] = React.useState("upcoming");
  const [showGuestModal, setShowGuestModal] = React.useState(false);
  const [editMode, setEditMode] = React.useState(false);
  const [createTripModal, setCreateTripModal] = React.useState(false);
  const [fetchDate, { data, isLoading, isError }] = useLazyMyTripsQuery();
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const [
    fetchDeleteTrip,
    { isLoading: isDeleteTripLoading, isSuccess: isTripSuccessfullyDeleted },
  ] = useDeleteTripMutation();

  useEffect(() => {
    fetchDate({});
  }, []);

  const callBack = useCallback(() => {
    createOrUpdateTripModal.current?.close();
    posthog.capture(Events.CloseCreateTripModal);
    setState((prevState) => ({ ...prevState, trip: undefined }));
    fetchDate({});
  }, []);

  const upComingTrips =
    data?.trips
      .filter((i) => moment(i.endAt).valueOf() > moment().valueOf())
      .sort(
        (a, b) => moment(a.startAt).valueOf() - moment(b.startAt).valueOf()
      ) || [];

  const oldTrips =
    data?.trips
      .filter((i) => moment(i.endAt).valueOf() < moment().valueOf())
      .sort(
        (a, b) => moment(b.startAt).valueOf() - moment(a.startAt).valueOf()
      ) || [];

  const handleCreateNewTrip = () => {
    if (user?.role === "guest") {
      setShowGuestModal(true);
    } else {
      posthog.capture(Events.CreateTripModalOpened);
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      setCreateTripModal(true);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }).start();
    }
  };

  const hideCreateTripModal = () => {
    setCreateTripModal(false);
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 150,
      useNativeDriver: true,
    }).start();
  } 

  const handleOpenContextMenu = useCallback(
    (trip: TripType) => {
      setState((prevState) => ({ ...prevState, trip }));
      modalQuestionRef.current?.open();
    },
    [modalQuestionRef]
  );

  const handelDeleteTrip = useCallback(() => {
    if (state.trip) fetchDeleteTrip({ id: state.trip?.id });
  }, [state.trip]);

  useEffect(() => {
    if (isTripSuccessfullyDeleted) {
      dispatch(trekSpotApi.util.invalidateTags(["myTrips"]));
      setState((prevState) => ({ ...prevState, trip: undefined }));
      toast.success('Trip deleted successfully', {
        duration: 2000,
      })
    }
  }, [isTripSuccessfullyDeleted, dispatch]);

  const showNotFound = useMemo(() => {
    if (isLoading) return false;

    if (tripType === "upcoming" && upComingTrips.length === 0) return true;

    if (tripType === "past" && oldTrips.length === 0) return true;

    return false;
  }, [isLoading, tripType, upComingTrips, oldTrips]);


  return (
    <>
      <View style={_tripScreenStyles.safeArea}>
        <View style={_tripScreenStyles.header}>
          <View style={_tripScreenStyles.tabSwitchers}>
            <TouchableOpacity
              style={[
                _tripScreenStyles.tabSwitcher,
                {
                  backgroundColor:
                    tripType === "upcoming" ? "#dfebff" : "white",
                  marginLeft: 1,
                },
              ]}
              onPress={() => setTripType("upcoming")}
            >
              <Text
                style={[
                  _tripScreenStyles.tabSwitcherText,
                  {
                    color:
                      tripType === "upcoming"
                        ? COLORS.primary
                        : COLORS.primaryDark,
                  },
                ]}
              >
                Upcoming
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setTripType("past")}
              style={[
                _tripScreenStyles.tabSwitcher,
                {
                  backgroundColor: tripType === "past" ? "#dfebff" : "white",
                  marginRight: 1,
                },
              ]}
            >
              <Text
                style={[
                  _tripScreenStyles.tabSwitcherText,
                  {
                    color:
                      tripType === "past" ? COLORS.primary : COLORS.primaryDark,
                  },
                ]}
              >
                Past
              </Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={_tripScreenStyles.newTripButton}
            activeOpacity={0.7}
            onPress={handleCreateNewTrip}
          >
            <PlusIcon color={COLORS.white} size="15" />
          </TouchableOpacity>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: 30,
          }}
          style={{ flex: 1, paddingHorizontal: 15, paddingTop: 15 }}
        >
          {isLoading && (
            <View style={{ marginTop: 30 }}>
              <Loader isLoading={true} background="#F2F2F7" size="small" />
            </View>
          )}

          {!isLoading &&
            tripType === "upcoming" &&
            upComingTrips.map((i) => (
              <TripItem
                key={`trip-${i.id}`}
                item={i}
                onContextMenu={() => handleOpenContextMenu(i)}
              />
            ))}

          {!isLoading && tripType === "past" && oldTrips?.length > 0 && (
            <>
              {!isLoading &&
                oldTrips.map((i) => (
                  <TripItem
                    key={`trip-${i.id}`}
                    item={i}
                    onContextMenu={() => handleOpenContextMenu(i)}
                  />
                ))}
            </>
          )}

          {showNotFound && (
            <View style={_tripScreenStyles.notFoundView}>
              <Image
                style={{
                  width: 200,
                  height: 220,
                  alignSelf: "center",
                  marginBottom: 10,
                }}
                source={require("../../assets/tripStart.webp")}
                contentFit="cover"
                
              ></Image>
              <Text style={_tripScreenStyles.notFoundViewTitleText}>
                {tripType === "past"
                  ? "No previous journeys"
                  : "When if not today?"}
              </Text>
              <Text style={_tripScreenStyles.notFoundViewText}>
                {tripType === "past"
                  ? "Your travel history will appear here"
                  : "It's time to plan your next trip"}
              </Text>

              <TouchableOpacity
                style={_tripScreenStyles.createNewTripButton}
                onPress={() => handleCreateNewTrip()}
              >
                <Text style={_tripScreenStyles.createNewTripButtonText}>
                  {tripType === "past"
                    ? "Add a past trip"
                    : "Create a new trip"}
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>
      </View>
      {showGuestModal && (
        <GuestUserModal onClose={() => setShowGuestModal(false)} />
      )}

      {/* Create trip */}

      {/* <Portal>
        <Modalize
          closeAnimationConfig={{ timing: { duration: 0 } }}
          ref={createOrUpdateTripModal}
          modalTopOffset={0}
          withHandle={false}
          scrollViewProps={{
            alwaysBounceVertical: false,
            keyboardShouldPersistTaps: "handled",
          }}
          modalStyle={{
            flex: 1,
          }}
          modalHeight={SIZES.height}
          onClosed={() => {
              setState((prevState) => ({ ...prevState, trip: undefined }));
              setEditMode(false);
            }
          }
          onOverlayPress={() => {
              setState((prevState) => ({ ...prevState, trip: undefined }));
              setEditMode(false);
            }
          }
        > */}
      <Portal>
        {createTripModal && (
          <Animated.View style={[{ opacity: fadeAnim, flex: 1 }]}>
            <NewTrip
              newTripModalRef={createOrUpdateTripModal}
              callBack={callBack}
              item={state.trip}
              editMode={editMode}
              hideCreateTripModal={hideCreateTripModal}
            />
          </Animated.View>
        )}
      </Portal>

      {/* Actions modal */}

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
            minHeight: "30%",
          }}
          scrollViewProps={{
            showsVerticalScrollIndicator: false,
          }}
          onOverlayPress={() =>
            setState((prevState) => ({ ...prevState, trip: undefined }))
          }
        >
          <QuestionModal
            onClose={() => {
              if (modalQuestionRef.current) modalQuestionRef.current.close();
              setState((prevState) => ({ ...prevState, trip: undefined }));
            }}
            title="Action"
          >
            <View style={questionModaStyles.buttonGroup}>
              <TouchableOpacity
                activeOpacity={0.7}
                style={[questionModaStyles.button]}
                onPress={() => {
                  modalQuestionRef.current?.close();
                  createOrUpdateTripModal.current?.open();
                  setEditMode(true);
                }}
              >
                <Text style={questionModaStyles.buttonText}>Edit</Text>
                <EditIcon size="15" />
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() =>
                  Alert.alert("Do you really want to delete activity?", "", [
                    {
                      text: "Cancel",
                      onPress: () => console.log("Cancel Pressed"),
                      style: "cancel",
                    },
                    {
                      text: "Delete",
                      onPress: () => {
                        handelDeleteTrip();
                        modalQuestionRef.current?.close();
                      },
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
    </>
  );
};
