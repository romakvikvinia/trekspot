import Constants from "expo-constants";
import * as Haptics from "expo-haptics";
import { usePostHog } from "posthog-react-native";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Animated,
  Platform,
  Pressable,
  Text,
  View,
} from "react-native";
import { IHandles } from "react-native-modalize/lib/options";

import { COLORS } from "../../../styles/theme";
import { Events } from "../../../utilities/Posthog";
import { XIcon } from "../../../utilities/SvgIcons.utility";
import { CreateTripDateStep } from "./CreateTripDateStep";
import { CreateTripDestinationStep } from "./CreateTripDestinationStep";
import { CreateTripIteneryStep } from "./CreateTripIteneryStep";
import { styles } from "./CreateTripStyles";

interface ICreateTripContentProps {
  isLoading: boolean;
  newTripModalRef: React.RefObject<IHandles>;
  formik: any;
  showPopup: () => void;
  editMode: boolean;
  hideCreateTripModal: () => void;
}

export const CreateTripContent: React.FC<ICreateTripContentProps> = ({
  isLoading,
  newTripModalRef,
  showPopup,
  formik,
  editMode,
  hideCreateTripModal,
}) => {
  const posthog = usePostHog();
  const [activeIndex, setActiveIndex] = useState(0);
  const [noDateError, setNoDateError] = useState(false);
  const [isError, setIsError] = React.useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const [tripData, setTripData] = useState({
    destinations: [],
    date: {
      startDate: null,
      endDate: null,
    },
    days: null,
  });

  const isInValid =
    !Object.keys(formik.values.range).length || !formik.values.destination;

  const handelSubmit = useCallback(() => {
    if (!isInValid) {
      posthog?.capture(Events.CreateNewTrip, {});
      formik.submitForm();
    } else {
      setIsError(true);
    }
  }, [formik, isInValid]);

  useEffect(() => {
    setIsError(false);
  }, [formik.values]);

  const handleWhereTo = () => {
    if (!formik?.values?.range?.startDate || !formik?.values?.range?.endDate) {
      Alert.alert("Please choose a date range first.", "");

      return;
    }

    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    showPopup();
  };

  const disabledButton = useMemo(() => {
    return formik.isSubmitting || tripData?.destinations?.length < 1 || tripData?.date?.startDate === null || tripData?.date?.endDate === null
  }, [formik.isSubmitting, tripData]);

  return (
    <>
      <View
        style={{
          flex: 1,
          paddingTop:
            Constants?.statusBarHeight + (Platform.OS === "android" ? 5 : 10),
          backgroundColor: "#f9f9f9",
        }}
      >
        <View style={styles.newTripWrapper}>
          <View style={styles.newTripHeader}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: "600",
                color: COLORS.black,
              }}
            >
              {editMode ? "Edit trip" : "New trip"}
            </Text>
            <Pressable
              style={styles.cancelTripButton}
              onPress={() => hideCreateTripModal()}
              hitSlop={20}
            >
               <XIcon width="12" />
            </Pressable>
          </View>
          
          <CreateTripDestinationStep index={activeIndex} setActiveIndex={setActiveIndex} tripData={tripData}  setTripData={setTripData}/>
          <CreateTripDateStep noDateError={noDateError} setNoDateError={setNoDateError} index={activeIndex} setActiveIndex={setActiveIndex} tripData={tripData} setTripData={setTripData} />
            {tripData?.destinations?.length > 1 &&
             <CreateTripIteneryStep setNoDateError={setNoDateError} index={activeIndex} setActiveIndex={setActiveIndex} tripData={tripData} setTripData={setTripData} />
            }
          <View style={styles.tripCreationFooter}>
            <Pressable hitSlop={15} style={styles.clearAllButton}>
              <Text style={styles.clearAllButtonText}>Clear all</Text>
            </Pressable>
            <Pressable
              style={({pressed}) => [
                styles.manualPlanButton,
                {
                  opacity: pressed || disabledButton ? 0.7 : 1
                },
              ]}
              disabled={disabledButton}
              onPress={handelSubmit}
            >
              {isLoading && <ActivityIndicator color="#fff" size="small" />}
              <Text style={[styles.manualPlanButtonText, { marginLeft: isLoading ? 8 : 0 }]}>
                {editMode ? "Save trip" : "Create trip"}
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
      {/* <Portal>
        <Modalize
          ref={modalTravelTypeRef}
          modalTopOffset={65}
          scrollViewProps={{
            alwaysBounceVertical: false,
            showsVerticalScrollIndicator: false,
            keyboardShouldPersistTaps: "handled",
          }}
          modalStyle={{
            backgroundColor: "#F2F2F7",
            minHeight: "70%",
          }}
          adjustToContentHeight
        >
          <TravelType modalTravelTypeRef={modalTravelTypeRef} formik={formik} />
        </Modalize>
      </Portal> */}
    </>
  );
};
