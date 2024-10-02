import React, { useCallback, useContext, useEffect, useMemo, useRef } from "react";
import {
  Alert,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { COLORS, SIZES } from "../../styles/theme";
import { enGB, registerTranslation } from "react-native-paper-dates";
registerTranslation("en", enGB);
import { _tripScreenStyles } from "./_tripScreenStyles";

import {
  EditIcon,
  NoDestinationFoundIcon,
  PlusIcon,
  TrashIcon,
} from "../../utilities/SvgIcons.utility";

import { Portal } from "react-native-portalize";
import { Modalize } from "react-native-modalize";
import { NewTrip } from "./NewTrip";

import { TripItem } from "./TripItem";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { TripRouteStackParamList } from "../../routes/trip/TripRoutes";
import {
  trekSpotApi,
  useDeleteTripMutation,
  useLazyMyTripsQuery,
} from "../../api/api.trekspot";
import moment from "moment";
import { Loader } from "../../common/ui/Loader";
import * as Haptics from "expo-haptics";
import { AuthContext } from "../../package/context/auth.context";
import { UserContext } from "../../components/context/UserContext";
import { TrekSneckBar } from "../../common/components/TrekSneckBar";
import { PaperProvider } from "react-native-paper";
import { useDispatch } from "react-redux";

// action modal
import { QuestionModal } from "../../common/components/QuestionModal";
import { questionModaStyles } from "../../styles/questionModaStyles";
import { TripType } from "../../api/api.types";

type TripProps = NativeStackScreenProps<TripRouteStackParamList, "TripsScreen">;

interface IState {
  trip?: TripType;
}

export const TripScreen: React.FC<TripProps> = ({ navigation }) => {
  const createOrUpdateTripModal = useRef<Modalize>(null);
  const modalQuestionRef = useRef<Modalize>(null);
  const dispatch = useDispatch();
  const { signOut } = useContext(AuthContext);
  const { user } = useContext(UserContext);
  const [state, setState] = React.useState<IState>({ trip: undefined });
  const [tripType, setTripType] = React.useState("upcoming");

  const [fetchDate, { data, isLoading, isError }] = useLazyMyTripsQuery();

  const [
    fetchDeleteTrip,
    { isLoading: isDeleteTripLoading, isSuccess: isTripSuccessfullyDeleted },
  ] = useDeleteTripMutation();

  useEffect(() => {
    fetchDate({});
  }, []);

  const callBack = useCallback(() => {
    createOrUpdateTripModal.current?.close();
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
    if (user?.type === "guest") {
      Alert.alert("To create a new trip, you need to sign in", "", [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "Sign in",
          onPress: () => signOut(),
          style: "default",
        },
      ]);
    } else {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      Platform.OS === "android"
        ? navigation.navigate("NewTripAndroidScreen")
        : createOrUpdateTripModal.current?.open();
    }
  };

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
    }
  }, [isTripSuccessfullyDeleted, dispatch]);

  return (
    <PaperProvider>
      <View style={_tripScreenStyles.safeArea}>
        <View style={_tripScreenStyles.header}>
          <Text style={_tripScreenStyles.myTripsText}>Trips</Text>

          <TouchableOpacity
            style={_tripScreenStyles.newTripButton}
            activeOpacity={0.7}
            onPress={handleCreateNewTrip}
          >
            <PlusIcon color={COLORS.primary} size="20" />
            <Text style={_tripScreenStyles.newTripButtonText}>New trip</Text>
          </TouchableOpacity>
        </View>

        <View style={_tripScreenStyles.tabSwitchersWrapper}>
          <View style={_tripScreenStyles.tabSwitchers}>
            <TouchableOpacity style={[_tripScreenStyles.tabSwitcher, {
              backgroundColor: tripType === "upcoming" ? "#dddde4" : "white",
              marginLeft: 1
            }]}
              onPress={() => setTripType("upcoming")}
            >
              <Text style={_tripScreenStyles.tabSwitcherText}>
                Upcoming trips
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setTripType("past")}
              style={[
                _tripScreenStyles.tabSwitcher,
                {
                  backgroundColor: tripType === "past" ? "#dddde4" : "white",
                  marginRight: 1,
                },
              ]}
            >
              <Text style={_tripScreenStyles.tabSwitcherText}>Past trips</Text>
            </TouchableOpacity>
          </View>
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
              <NoDestinationFoundIcon />
              <Text style={_tripScreenStyles.notFoundViewTitleText}>
                You don't have any trip yet
              </Text>
              <Text style={_tripScreenStyles.notFoundViewText}>
                Click on New trip button and prepare for your next destination
              </Text>
            </View>
          )}
          <TrekSneckBar
            isVisible={isTripSuccessfullyDeleted}
            message="Trip deleted successfully"
          />
        </ScrollView>
      </View>

      {/* Create trip */}

      <Portal>
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
        >
          <NewTrip
            newTripModalRef={createOrUpdateTripModal}
            callBack={callBack}
            item={state.trip}
          />
        </Modalize>
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
          onClosed={() =>
            setState((prevState) => ({ ...prevState, selectedTrip: "" }))
          }
        >
          <QuestionModal modalQuestionRef={modalQuestionRef} title="Action">
            <View style={questionModaStyles.buttonGroup}>
              <TouchableOpacity
                activeOpacity={0.7}
                style={[questionModaStyles.button]}
                onPress={() => {
                  modalQuestionRef.current?.close();
                  createOrUpdateTripModal.current?.open();
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
    </PaperProvider>
  );
};
