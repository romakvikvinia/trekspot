import React, { useCallback, useEffect, useRef } from "react";
import {
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SIZES } from "../../styles/theme";
import { enGB, registerTranslation } from "react-native-paper-dates";
registerTranslation("en", enGB);
import { _tripScreenStyles } from "./_tripScreenStyles";

import {
  NoDestinationFoundIcon,
  PlusIcon,
} from "../../utilities/SvgIcons.utility";

import { Portal } from "react-native-portalize";
import { Modalize } from "react-native-modalize";
import { NewTrip } from "./NewTrip";

import { TripItem } from "./TripItem";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { TripRouteStackParamList } from "../../routes/trip/TripRoutes";
import { useLazyMyTripsQuery } from "../../api/api.trekspot";
import moment from "moment";
import { Loader } from "../../common/ui/Loader";
import * as Haptics from "expo-haptics";

type TripProps = NativeStackScreenProps<TripRouteStackParamList, "TripsScreen">;

export const TripScreen: React.FC<TripProps> = ({ navigation }) => {
  const newTripModal = useRef<Modalize>(null);

  const [fetchDate, { data, isLoading, isError }] = useLazyMyTripsQuery();

  useEffect(() => {
    fetchDate({});
  }, []);

  const callBack = useCallback(() => {
    fetchDate({});
  }, []);

  const upComingTrips =
    data?.trips.filter((i) => moment(i.endAt).valueOf() > moment().valueOf()) ||
    [];
  const oldTrips =
    data?.trips.filter((i) => moment(i.endAt).valueOf() < moment().valueOf()) ||
    [];

  return (
    <>
      <View style={_tripScreenStyles.safeArea}>
        <View style={_tripScreenStyles.header}>
          <Text style={_tripScreenStyles.myTripsText}>Trips</Text>

          <TouchableOpacity
            style={_tripScreenStyles.newTripButton}
            activeOpacity={0.7}
            onPress={() =>
              {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              Platform.OS === "android"
                ? navigation.navigate("NewTripAndroidScreen")
                : newTripModal.current?.open()
              }
            }
          >
            <PlusIcon color="" size="20" />
            <Text style={_tripScreenStyles.newTripButtonText}>New trip</Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={{ flex: 1, paddingHorizontal: 15, paddingTop: 15 }}>

          {
            isLoading && <View style={{marginTop: 30}}><Loader isLoading={true} background="#F2F2F7" size="small" /></View>
          }

          {!isLoading &&
            upComingTrips.map((i) => (
              <TripItem key={`trip-${i.id}`} item={i} />
            ))}

          {!isLoading && oldTrips?.length > 0 && (
            <>
              <Text style={_tripScreenStyles.headingTitle}>Past trips</Text>
              {!isLoading &&
                oldTrips.map((i) => <TripItem key={`trip-${i.id}`} item={i} />)}
            </>
          )}

          {!isLoading && !data?.trips.length && (
            <View style={_tripScreenStyles.notFoundView}>
              <NoDestinationFoundIcon />
              <Text style={_tripScreenStyles.notFoundViewText}>
                You don't have any trip yet, click on New trip button and
                prepare for your next destination
              </Text>
            </View>
          )}
        </ScrollView>
      </View>

      {/* Create trip */}

      <Portal>
        <Modalize
          ref={newTripModal}
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
          <NewTrip newTripModalRef={newTripModal} callBack={callBack} />
        </Modalize>
      </Portal>
    </>
  );
};
