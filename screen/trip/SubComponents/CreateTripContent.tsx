import { useNavigation } from "@react-navigation/native";
import { BlurView } from "expo-blur";
import moment from "moment";
import React, { useCallback, useRef } from "react";
import {
  ActivityIndicator,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Modalize } from "react-native-modalize";
import { Portal } from "react-native-portalize";
import { COLORS } from "../../../styles/theme";
import {
  CalendarFilledIcon,
  OneUserIcon,
  StarsIcon,
  TripLocationIcon,
} from "../../../utilities/SvgIcons.utility";
import { TravelType } from "../TravelType";
import { styles } from "./CreateTripStyles";
import { IHandles } from "react-native-modalize/lib/options";
import * as Haptics from "expo-haptics";

interface ICreateTripContentProps {
  newTripModalRef: React.RefObject<IHandles>;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  formik: any;
  onDestinationModalOpen: () => void;
}

export const CreateTripContent: React.FC<ICreateTripContentProps> = ({
  newTripModalRef,
  setOpen,
  onDestinationModalOpen,
  formik,
}) => {
  const navigation = useNavigation();
  const modalTravelTypeRef = useRef<Modalize>(null);

  const onTravelTypeModalOpen = () => {
    modalTravelTypeRef.current?.open();
  };

  const handleCancelTrip = () => {
    if (Platform.OS === "android") {
      navigation.goBack();
    } else {
      newTripModalRef?.current?.close();
    }
  };
  const isInValid =
    !formik.values.name ||
    !Object.keys(formik.values.range).length ||
    !formik.values.travelType ||
    !formik.values.destination;

  const handelSubmit = useCallback(() => {
    if (!isInValid) {
      formik.submitForm();
    }
  }, [formik, isInValid]);

  return (
    <>
      <View style={styles.newTripWrapper}>
        <View style={styles.newTripHeader}>
          <Text
            style={{
              fontSize: 24,
              fontWeight: "600",
              color: COLORS.black,
            }}
          >
            New trip
          </Text>
          <TouchableOpacity
            style={styles.cancelTripButton}
            onPress={() => handleCancelTrip()}
          >
            <Text style={styles.cancelTripButtonText}>Cancel</Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={{ flex: 1 }} keyboardShouldPersistTaps={"handled"}>
          <TextInput
            placeholder="Enter trip name"
            placeholderTextColor="rgba(0, 0, 0, 0.4)"
            style={[
              styles.tripNameInput,
              {
                borderBottomWidth: false ? 1 : 0,
                borderBottomColor: false ? "red" : "",
              },
            ]}
            selectionColor="#000"
            value={formik.values.name}
            onChangeText={formik.handleChange("name")}
            onBlur={formik.handleBlur("name")}
            autoCorrect={false}
          />
          <View style={styles.newTripBoxes}>
            <BlurView
              intensity={100}
              style={[
                styles.newTripBox,
                styles.fullBox,
                {
                  borderWidth: false ? 1 : 0,
                  borderColor: false ? "red" : "",
                },
              ]}
            >
              <TouchableOpacity
                activeOpacity={0.5}
                style={styles.datePickerTopRow}
                onPress={() => {
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                  setOpen(true);
                }}
              >
                <View style={styles.datePickerTopRowLeft}>
                  <CalendarFilledIcon />
                  <Text style={styles.datePickerTopRowLeftText}>Itinerary</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.5}
                style={styles.datePickerBottomRow}
                onPress={() => {
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                  setOpen(true);
                }}
              >
                <View style={styles.datePickerBottomRowLeft}>
                  <Text style={styles.startsDateLabel}>Start</Text>
                  <Text style={styles.startsDateText}>
                    {formik?.values?.range?.startDate
                      ? moment(formik?.values?.range?.startDate).format(
                          "DD MMM"
                        )
                      : "Set date"}
                  </Text>
                </View>
                <Text style={{ fontSize: 25, color: COLORS.black }}>-</Text>
                <View style={styles.datePickerBottomRowRight}>
                  <Text style={styles.startsDateLabel}>End</Text>
                  <Text style={styles.startsDateText}>
                    {formik?.values?.range?.endDate
                      ? moment(formik?.values?.range?.endDate).format("DD MMM")
                      : "Set date"}
                  </Text>
                </View>
              </TouchableOpacity>
            </BlurView>
            <BlurView
              intensity={100}
              style={[
                styles.newTripBox,
                styles.halfBox,
                {
                  borderWidth: false ? 1 : 0,
                  borderColor: false ? "red" : "",
                },
              ]}
            >
              <TouchableOpacity
                activeOpacity={0.5}
                style={styles.newTripBoxButton}
                onPress={() => {
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                  onDestinationModalOpen();
                }}
              >
                <TripLocationIcon size="" color="" />
                <Text style={styles.halfBoxLabelText}>Where to?</Text>
                {formik.values.destination ? (
                  <Text style={styles.halfBoxValueText}>
                    {/* @ts-ignore */}
                    {formik.values.destination.city!}
                  </Text>
                ) : null}
              </TouchableOpacity>
            </BlurView>

            <BlurView
              intensity={100}
              style={[
                styles.newTripBox,
                styles.halfBox,
                {
                  borderWidth: false ? 1 : 0,
                  borderColor: false ? "red" : "",
                },
              ]}
            >
              <TouchableOpacity
                activeOpacity={0.5}
                style={styles.newTripBoxButton}
                onPress={() => {
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                  onTravelTypeModalOpen();
                }}
              >
                <OneUserIcon size="20" color="" />
                <Text style={styles.halfBoxLabelText}>Travel type</Text>
                {formik?.values?.travelType ? (
                  <Text style={styles.halfBoxValueText}>
                    {formik?.values?.travelType}
                  </Text>
                ) : null}
              </TouchableOpacity>
            </BlurView>
          </View>
          {isInValid && formik.dirty && (
            <Text
              style={{
                color: "red",
                fontSize: 16,
                textAlign: "center",
                marginTop: 25,
                fontWeight: "500",
              }}
            >
              Please fill in all fields to create your trip
            </Text>
          )}
        </ScrollView>
        <View
          style={{
            paddingBottom: 35,
          }}
        >
          {/* <TouchableOpacity
            style={styles.aiPlanButton}
            activeOpacity={0.7}
            onPress={handelSubmit}
            disabled={formik.isSubmitting}
          >
            <LinearGradient
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "row",
                height: 50,
              }}
              colors={[COLORS.primary, COLORS.primary, COLORS.primary]}
            >
              {formik.isSubmitting ? (
                <>
                  <ActivityIndicator color="#fff" />
                  <Text style={[styles.aiPlanButtonText, { marginLeft: 8 }]}>
                    Planning your itinerary...
                  </Text>
                </>
              ) : (
                <>
                  <Text style={styles.aiPlanButtonText}>
                    Generate AI Itinerary
                  </Text>
                  <StarsIcon width="15" color="#fff" />
                </>
              )}
            </LinearGradient>
          </TouchableOpacity> */}
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.manualPlanButton}
            disabled={formik.isSubmitting}
            onPress={handelSubmit}
          >
            {formik.isSubmitting && <ActivityIndicator />}
            <Text style={[styles.manualPlanButtonText, { marginLeft: 8 }]}>
              Create trip
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <Portal>
        <Modalize
          ref={modalTravelTypeRef}
          modalTopOffset={65}
          scrollViewProps={{
            alwaysBounceVertical: false,
            showsVerticalScrollIndicator: false,
          }}
          modalStyle={{
            backgroundColor: "#F2F2F7",
            minHeight: "70%",
          }}
          adjustToContentHeight
        >
          <TravelType modalTravelTypeRef={modalTravelTypeRef} formik={formik} />
        </Modalize>
      </Portal>
    </>
  );
};
