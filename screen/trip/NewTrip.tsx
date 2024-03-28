import { BlurView } from "expo-blur";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useRef, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import moment from "moment";
import { COLORS, SIZES } from "../../styles/theme";
import {
  CalendarFilledIcon,
  ImageIcon,
  OneUserIcon,
  PrivateIcon,
  StarsIcon,
  TripLocationIcon,
} from "../../utilities/SvgIcons.utility";
import { RangePicker } from "./RangePicker";
import { Portal } from "react-native-portalize";
import { Modalize } from "react-native-modalize";
import { Destination } from "./Destination";
// import { Accessibility } from "./_Forlater/Accessibility";
// import { TravelType } from "./TravelType";
import { useNavigation } from "@react-navigation/native";
import { TravelType } from "./TravelType";

export const CreateTripContent = ({
  newTripModalRef,
  gradient,
  setGradient,
  tripActivitesModal,
  range,
  setOpen,
  onDestinationModalOpen,
}) => {
  const navigation = useNavigation();

  const modalAccessibilityRef = useRef(null);
  const modalBackgroundRef = useRef(null);
  const modalTravelTypeRef = useRef(null);

  const [tripAccess, setTripAccess] = useState(false);
  const [destination, setDestination] = useState();
  const [travelType, setTravelType] = useState(false);

  const onAccessibilityModalOpen = () => {
    modalAccessibilityRef.current?.open();
  };
  const onTravelTypeModalOpen = () => {
    modalTravelTypeRef.current?.open();
  };
  const onBackgroundModalOpen = () => {
    modalBackgroundRef.current?.open();
  };

  const handleCreateNewTrip = () => {
    tripActivitesModal.current?.open();
    newTripModalRef.current?.close();
  };

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
            onPress={() => newTripModalRef?.current?.close()}
          >
            <Text style={styles.cancelTripButtonText}>Cancel</Text>
          </TouchableOpacity>

          {/* <TouchableOpacity
            style={styles.createTripButton}
            onPress={() => {
              navigation.navigate("TripDetailScreen");
              newTripModalRef?.current?.close();
            }}
          >
            <Text style={styles.createTripButtonText}>Create</Text>
          </TouchableOpacity> */}
        </View>
        {/* <BlurView intensity={100} style={styles.tripNameInputWrapper}> */}
        <TextInput
          placeholder="Enter trip name"
          placeholderTextColor="rgba(0, 0, 0, 0.4)"
          style={styles.tripNameInput}
          selectionColor="#000"
          autoFocus
        />
        {/* </BlurView> */}
        <ScrollView style={{ flex: 1 }}>
          <View style={styles.newTripBoxes}>
            <BlurView
              intensity={100}
              style={[styles.newTripBox, styles.fullBox]}
            >
              <TouchableOpacity
                activeOpacity={0.5}
                style={styles.datePickerTopRow}
              >
                <View style={styles.datePickerTopRowLeft}>
                  <CalendarFilledIcon />
                  <Text style={styles.datePickerTopRowLeftText}>Itinerary</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.5}
                style={styles.datePickerBottomRow}
                onPress={() => setOpen(true)}
              >
                <View style={styles.datePickerBottomRowLeft}>
                  <Text style={styles.startsDateLabel}>Start</Text>
                  <Text style={styles.startsDateText}>
                    {range?.startDate
                      ? moment(range?.startDate).format("DD MMM")
                      : "Set date"}
                  </Text>
                </View>
                <Text style={{ fontSize: 25, color: COLORS.black }}>-</Text>
                <View style={styles.datePickerBottomRowRight}>
                  <Text style={styles.startsDateLabel}>End</Text>
                  <Text style={styles.startsDateText}>
                    {range?.endDate
                      ? moment(range?.endDate).format("DD MMM")
                      : "Set date"}
                  </Text>
                </View>
              </TouchableOpacity>
            </BlurView>
            <BlurView
              intensity={100}
              style={[styles.newTripBox, styles.halfBox]}
            >
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => onDestinationModalOpen()}
              >
                <TripLocationIcon />
                <Text style={styles.halfBoxLabelText}>Where to?</Text>
                {destination ? (
                  <Text style={styles.halfBoxValueText}>{destination}</Text>
                ) : null}
              </TouchableOpacity>
            </BlurView>

            <BlurView
              intensity={100}
              style={[styles.newTripBox, styles.halfBox]}
            >
              <TouchableOpacity
                activeOpacity={0.5}
                style={styles.newTripBoxButton}
                onPress={() => onTravelTypeModalOpen()}
              >
                <OneUserIcon size="20" />
                <Text style={styles.halfBoxLabelText}>Travel type</Text>

                <Text style={styles.halfBoxValueText}>{travelType}</Text>
              </TouchableOpacity>
            </BlurView>
          </View>
        </ScrollView>
        <View
          style={{
            paddingBottom: 35,
          }}
        >
          <TouchableOpacity style={styles.aiPlanButton}>
            <LinearGradient
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "row",
                height: 50,
              }}
              colors={["#B0369B", "#BF369A", "#99329D"]}
            >
              <Text style={styles.aiPlanButtonText}>Generate AI Itinerary</Text>
              <StarsIcon width="15" color="#fff" />
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity style={styles.manualPlanButton}>
            <Text style={styles.manualPlanButtonText}>
              I will plan manually
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* <Portal>
        <Modalize
          modalStyle={{
            backgroundColor: "#F2F2F7",
            minHeight: "70%",
          }}
          ref={modalAccessibilityRef}
          modalTopOffset={65}
          adjustToContentHeight
          scrollViewProps={{
            alwaysBounceVertical: false,
            showsVerticalScrollIndicator: false,
          }}
        >
          <Accessibility
            tripAccess={tripAccess}
            setTripAccess={setTripAccess}
          />
        </Modalize>
      </Portal> */}
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
          <TravelType
            modalTravelTypeRef={modalTravelTypeRef}
            travelType={travelType}
            setTravelType={setTravelType}
          />
        </Modalize>
      </Portal>
    </>
  );
};

export const NewTrip = ({ newTripModalRef, tripActivitesModal }) => {
  const [gradient, setGradient] = useState(["#fff", "#fff", "#fff"]);
  const [range, setRange] = useState({
    startDate: undefined,
    endDate: undefined,
  });
  const [open, setOpen] = useState(false);

  const modalDestinationRef = useRef(null);
  const onDestinationModalOpen = () => {
    modalDestinationRef.current?.open();
  };
  return (
    <>
      <View
        style={[styles.tripModalGradient, { padding: 0 }]}
        // colors={gradient}
        // start={{ x: -1, y: 1 }}
        // end={{ x: 1, y: 0 }}
      >
        <CreateTripContent
          gradient={gradient}
          setGradient={setGradient}
          newTripModalRef={newTripModalRef}
          tripActivitesModal={tripActivitesModal}
          range={range}
          setOpen={setOpen}
          onDestinationModalOpen={onDestinationModalOpen}
        />
      </View>
      <RangePicker
        range={range}
        setRange={setRange}
        open={open}
        setOpen={setOpen}
      />

      <Portal>
        <Modalize
          ref={modalDestinationRef}
          modalTopOffset={65}
          scrollViewProps={{
            alwaysBounceVertical: false,
            showsVerticalScrollIndicator: false,
            keyboardShouldPersistTaps: "handled",
          }}
          modalStyle={{
            backgroundColor: "#F2F2F7",
            minHeight: "80%",
          }}
        >
          <Destination />
        </Modalize>
      </Portal>
    </>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F2F2F7",
  },
  aiPlanButton: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    height: 50,
    borderRadius: 50,
    overflow: "hidden",
  },
  aiPlanButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    marginRight: 5,
  },
  manualPlanButton: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    height: 50,
    borderRadius: 50,
    overflow: "hidden",
    backgroundColor: "#f2f2f2",
    marginTop: 15,
  },
  manualPlanButtonText: {
    fontSize: 16,
    fontWeight: "600",
  },
  cancelTripButton: {
    paddingVertical: 7,
    paddingHorizontal: 20,
    borderRadius: 30,
    backgroundColor: "rgba(0, 0, 0, 0.1)",
  },
  cancelTripButtonText: {
    color: COLORS.black,
    fontSize: 14,
    fontWeight: "500",
  },
  createTripButton: {
    paddingVertical: 7,
    paddingHorizontal: 20,
    borderRadius: 30,
    backgroundColor: COLORS.primaryDark,
  },
  createTripButtonText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: "500",
  },
  halfBoxLabelText: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: "500",
    color: COLORS.black,
  },
  halfBoxValueText: {
    marginTop: 5,
    fontSize: 13,
    opacity: 0.9,
    color: COLORS.black,
  },
  datePickerTopRow: {
    flexDirection: "row",
    width: "100%",
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255, 0.2)",
  },
  datePickerTopRowLeftText: {
    fontSize: 14,
    marginLeft: 8,
    color: COLORS.black,
    fontWeight: "500",
    marginTop: 2,
  },
  startsDateLabel: {
    fontSize: 12,
    color: COLORS.black,
    opacity: 0.8,
    marginBottom: 5,
  },
  startsDateText: {
    fontSize: 22,
    color: COLORS.black,
    fontWeight: "500",
  },
  datePickerBottomRowLeft: {
    position: "relative",
  },
  datePickerBottomRowRight: {
    position: "relative",
  },
  datePickerBottomRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 15,
    justifyContent: "space-between",
  },
  datePickerTopRowLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  newTripBoxButton: {
    height: "100%",
    justifyContent: "center",
  },
  rowItemHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    paddingVertical: 15,
  },
  h2: {
    fontSize: 22,
    color: COLORS.black,
    fontWeight: "bold",
  },
  newTripWrapper: {
    flex: 1,
  },
  newTripBoxes: {
    flexWrap: "wrap",
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  newTripBox: {
    width: 100,
    height: 100,
    backgroundColor: "rgba(204, 206, 206, 0.6)",
    borderRadius: 20,
    marginRight: 0,
    marginBottom: 15,
    overflow: "hidden",
  },
  halfBox: {
    width: "48%",
    padding: 15,
    height: 120,
    justifyContent: "center",
  },
  fullBox: {
    width: "100%",
    height: "auto",
  },
  newTripHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 25,
  },
  newTripHeaderTitleText: {
    fontSize: 24,
    color: "#fff",
    fontWeight: "600",
  },
  tripNameInputWrapper: {
    // backgroundColor: "rgba(204, 206, 206, 0.6)",
    borderRadius: 15,
    marginBottom: 15,
    overflow: "hidden",
  },
  tripNameInput: {
    height: 50,
    paddingLeft: 0,
    fontSize: 28,
    color: COLORS.primaryDark,
    fontWeight: "700",
    overflow: "hidden",
    marginBottom: 15,
    borderBottomColor: "rgba(255, 255, 255, 0.3)",
  },
  tripModalGradient: {
    flex: 1,
    minHeight: SIZES.height,
    paddingTop: 70,
    paddingHorizontal: 20,
  },
  invitationStatus: {
    fontSize: 12,
    color: COLORS.gray,
    marginTop: 3,
  },
  invitationBoxTexts: {
    flexDirection: "column",
    marginLeft: 10,
  },
  noResultWrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: 250,
    textAlign: "center",
    paddingHorizontal: 25,
    marginTop: 25,
  },
  noResultWrapperText: {
    fontSize: 14,
    color: COLORS.darkgray,
    marginTop: 25,
    textAlign: "center",
    lineHeight: 20,
    maxWidth: "80%",
  },
  invitedList: {
    marginTop: 15,
    flex: 1,
    paddingHorizontal: 15,
  },
  invitedListItem: {
    width: "100%",
    marginBottom: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: COLORS.lightGray,
    padding: 15,
    borderRadius: 10,
  },
  lfSide: {
    flexDirection: "row",
    alignItems: "center",
  },
  invitedUserImage: {
    minWidth: 25,
    minHeight: 25,
    width: 25,
    borderRadius: 50,
  },
  invitedUserName: {
    fontSize: 14,
    color: COLORS.black,
    fontWeight: "600",
  },
  removeInvitedUser: {},
  inviteBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    overflow: "hidden",
    paddingHorizontal: 15,
    paddingTop: 15,
  },
  inviteBoxInput: {
    height: 50,
    backgroundColor: "#fafafa",
    flex: 1,
    paddingLeft: 15,
    color: COLORS.black,
    borderTopLeftRadius: 10,
    borderBottomStartRadius: 10,
  },
  inviteButton: {
    paddingHorizontal: 25,
    backgroundColor: COLORS.primaryDark,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderTopRightRadius: 10,
    borderBottomEndRadius: 10,
  },
  inviteButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 0,
    backgroundColor: "rgba(0, 0, 0, 0.2)",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonWithContextMenu: {
    position: "absolute",
    right: 10,
    top: 10,
  },
  buttonWithContextMenuList: {
    position: "absolute",
    backgroundColor: "#fff",
    right: 0,
    top: 35,
    paddingVertical: 0,
    borderRadius: 6,
    ...COLORS.shadow,
    width: 125,
    zIndex: 1,
    overflow: "hidden",
  },
  buttonWithContextMenuListItem: {
    paddingHorizontal: 25,
    paddingVertical: 15,
    borderBottomColor: "#ddd",
    borderBottomWidth: 1,
  },
  buttonWithContextMenuListItemText: {
    fontSize: 14,
    color: COLORS.black,
    fontWeight: "600",
  },
  tripSettingsButton: {
    padding: 14,
    marginRight: -7,
    marginTop: -3,
  },
  headingTitle: {
    fontSize: 20,
    marginBottom: 25,
    color: COLORS.black,
    fontWeight: "600",
  },
  notFoundView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: 500,
  },
  notFoundViewText: {
    marginTop: 25,
    textAlign: "center",
    fontSize: 14,
    color: COLORS.darkgray,
    lineHeight: 20,
    maxWidth: "80%",
  },
  otherStats: {
    position: "absolute",
    bottom: 5,
    right: 15,
    flexDirection: "row",
    alignItems: "center",
    zIndex: 2,
  },
  statItem: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 5,
    padding: 5,
  },
  statItemText: {
    color: "#fff",
    marginLeft: 5,
    fontSize: 12,
  },
  otherDetailsBox: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 10,
  },
  invitationBox: {
    position: "relative",
    flexDirection: "row",
    maxWidth: 120,
  },
  otherDetailsBoxText: {
    fontWeight: "500",
    marginLeft: 3,
    fontSize: 11,
    color: COLORS.black,
    marginTop: 1,
  },
  inviteTwo: {
    position: "relative",
    left: -10,
    zIndex: 2,
    top: 0,
    width: 25,
    height: 25,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "#fff",
  },
  otherUsers: {
    position: "relative",
    left: -20,
    zIndex: 2,
    top: 0,
    width: 25,
    height: 25,
    borderRadius: 50,
    backgroundColor: "#8e8e8e",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#fff",
  },
  otherDetails: {
    flexDirection: "row",
  },
  otherUsersText: {
    fontWeight: "600",
    color: "#fff",
    fontSize: 10,
  },
  addUserButton: {
    position: "relative",
    left: -10,
    zIndex: 2,
    top: 0,
    width: 25,
    height: 25,
    borderRadius: 50,
    backgroundColor: "#8e8e8e",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#fff",
  },
  tripItem: {
    width: "100%",
    marginBottom: 25,
  },
  inviteOne: {
    width: 25,
    height: 25,
    borderRadius: 50,
  },
  tripDetails: {
    width: "100%",
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  invitationByText: {
    position: "absolute",
    bottom: 13,
    left: 20,
    color: "#fff",
    opacity: 0.9,
    fontSize: 12,
  },
  invitationByUserText: {
    color: "#fff",
    fontWeight: "600",
    opacity: 1,
  },
  tripInHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  tripItemHeader: {
    width: "100%",
    height: 150,
    position: "relative",
  },
  tripImage: {
    width: "100%",
    height: 150,
    borderRadius: 25,
    position: "relative",
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  gradientWrapper: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    padding: 20,
  },
  tripDate: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "400",
  },
  tripTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "600",
    marginTop: 5,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    alignItems: "center",
    marginBottom: 25,
  },
  myTripsText: {
    fontSize: 20,
    fontWeight: "600",
    color: COLORS.black,
  },
  newTripButton: {
    backgroundColor: COLORS.primaryDark,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 50,
    flexDirection: "row",
    alignItems: "center",
  },
  newTripButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
  },
});
