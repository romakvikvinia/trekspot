import React, { useRef } from "react";
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
import { useNavigation } from "@react-navigation/native";
import { Tripitem } from "./TripItem";

interface TripProps {}

export const TripScreen: React.FC<TripProps> = ({}) => {
  const navigation = useNavigation();

  const newTripModal = useRef<Modalize>(null);
  const tripActivitesModal = useRef<Modalize>(null);

  return (
    <>
      <View style={_tripScreenStyles.safeArea}>
        <View style={_tripScreenStyles.header}>
          <Text style={_tripScreenStyles.myTripsText}>Trips</Text>

          <TouchableOpacity
            style={_tripScreenStyles.newTripButton}
            activeOpacity={0.7}
            onPress={() =>
              Platform.OS === "android"
                ? navigation.navigate("NewTripAndroidScreen")
                : newTripModal.current?.open()
            }
          >
            <PlusIcon color="" size="20" />
            <Text style={_tripScreenStyles.newTripButtonText}>New trip</Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={{ flex: 1, paddingHorizontal: 15 }}>
          {false ? (
            <View style={_tripScreenStyles.notFoundView}>
              <NoDestinationFoundIcon />
              <Text style={_tripScreenStyles.notFoundViewText}>
                You don't have any trip yet, click on New trip button and
                prepare for your next destination
              </Text>
            </View>
          ) : (
            <>
              <Tripitem />
                <Text style={_tripScreenStyles.headingTitle}>Past trips</Text>
              <Tripitem />
            </>
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
          <NewTrip
            newTripModalRef={newTripModal}
            tripActivitesModal={tripActivitesModal}
          />
        </Modalize>
      </Portal>
    </>
  );
};
