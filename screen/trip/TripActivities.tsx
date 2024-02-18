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
  DownCircleIcon,
  EditIcon,
  FlightIcon,
  ImageIcon,
  OneUserIcon,
  PlusIcon,
  PrivateIcon,
  Share,
  TripLocationIcon,
  BusIcon,
  ShipIcon,
  USDIcon,
  NotesIcon,
  TicketIcon,
  StarsIcon,
  LodgeIcon,
  ToursIcon,
  MuseumIcon,
  EatIcon,
  MapIcon,
  ToDoIcon,
} from "../../utilities/SvgIcons.utility";
import { RangePicker } from "./RangePicker";
import { Portal } from "react-native-portalize";
import { Modalize } from "react-native-modalize";
import { Destination } from "./Destination";
import { Accessibility } from "./Accessibility";
import { TravelType } from "./TravelType";
import { Background } from "./Background";
import { ActivityList } from "./ActivityList";

export const CreateTripContent = ({
  tripActivitesModal,
  gradient,
  setGradient,
}) => {
  const modalDestinationRef = useRef(null);
  const modalActivityRef = useRef(null);
  const modalBackgroundRef = useRef(null);
  const modalTravelTypeRef = useRef(null);

  const [range, setRange] = useState({
    startDate: undefined,
    endDate: undefined,
  });
  const [destination, setDestination] = useState();
  const [activity, setActivity] = useState([]);

  const [open, setOpen] = useState(false);
  const onDestinationModalOpen = () => {
    modalDestinationRef.current?.open();
  };
  const onActivityModalOpen = () => {
    modalActivityRef.current?.open();
  };
  const onTravelTypeModalOpen = () => {
    modalTravelTypeRef.current?.open();
  };
  const onBackgroundModalOpen = () => {
    modalBackgroundRef.current?.open();
  };

  return (
    <>
      <View style={styles.newTripWrapper}>
        <View style={styles.newTripHeader}>
          <TouchableOpacity
            style={styles.cancelTripButton}
            onPress={() => tripActivitesModal?.current?.close()}
          >
            <DownCircleIcon color="#fff" size="25" />
          </TouchableOpacity>
          <View style={{ flexDirection: "row" }}>
            {/* <TouchableOpacity style={styles.createTripButton}>
              <Share size="22" color="#fff" />
            </TouchableOpacity> */}
            <TouchableOpacity
              activeOpacity={0.5}
              style={[styles.createTripButton]}
            >
              <Text style={{ fontSize: 16, color: COLORS.black }}>Edit</Text>
            </TouchableOpacity>
          </View>
        </View>
        <Text style={styles.tripName}>My trip</Text>
        <ScrollView style={{ flex: 1 }}>
          <View style={styles.newTripBoxes}>
            <View
              style={{
                width: "100%",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <BlurView
                intensity={100}
                style={[styles.newTripBox, styles.fullBox, { width: "60%" }]}
              >
                <View style={styles.datePickerTopRow}>
                  <Text style={styles.datePickerTopRowLeftText}>Itinerary</Text>
                  <Text
                    style={[
                      styles.datePickerTopRowLeftText,
                      { fontWeight: "400", fontSize: 12 },
                    ]}
                  >
                    14 days
                  </Text>
                </View>
                <TouchableOpacity
                  activeOpacity={0.5}
                  style={styles.datePickerBottomRow}
                  onPress={() => setOpen(true)}
                >
                  <View style={styles.datePickerBottomRowLeft}>
                    <Text style={styles.startsDateLabel}>Dates</Text>
                    <Text style={styles.startsDateText}>22 Nov</Text>
                  </View>
                  <Text
                    style={{
                      fontSize: 25,
                      color: COLORS.black,
                      position: "relative",
                      top: 10,
                    }}
                  >
                    -
                  </Text>
                  <View style={styles.datePickerBottomRowRight}>
                    <Text style={styles.startsDateLabel}></Text>
                    <Text style={styles.startsDateText}>28 Nov</Text>
                  </View>
                </TouchableOpacity>
              </BlurView>
              <BlurView
                intensity={100}
                style={[styles.newTripBox, styles.halfBox, { width: "38%" }]}
              >
                <View style={styles.iconBox}>
                  <TripLocationIcon color="#C6C6C6" />
                </View>
                <Text style={styles.halfBoxLabelText}>London</Text>
                <Text
                  style={[styles.halfBoxLabelText, { opacity: 0.5 }]}
                  numberOfLines={1}
                >
                  United Kingdom
                </Text>
              </BlurView>
            </View>
            <BlurView
              intensity={100}
              style={[styles.newTripBox, styles.halfBox, { width: "32%" }]}
            >
              <TouchableOpacity
                activeOpacity={0.5}
                style={{ flex: 1, justifyContent: "center" }}
              >
                <View style={styles.iconBox}>
                  <USDIcon width="18" color="#C6C6C6" />
                </View>
                <Text
                  style={[
                    styles.halfBoxLabelText,
                    {
                      marginTop: 25,
                      fontSize: 14,
                      color: "#424242",
                    },
                  ]}
                >
                  Expenses
                </Text>
              </TouchableOpacity>
            </BlurView>
            <BlurView
              intensity={100}
              style={[styles.newTripBox, styles.halfBox, { width: "32%" }]}
            >
              <TouchableOpacity
                activeOpacity={0.5}
                style={{ flex: 1, justifyContent: "center" }}
              >
                <View style={styles.iconBox}>
                  <NotesIcon width="18" color="#C6C6C6" />
                </View>
                <Text
                  style={[
                    styles.halfBoxLabelText,
                    {
                      marginTop: 25,
                      fontSize: 14,
                      color: "#424242",
                    },
                  ]}
                >
                  Notes
                </Text>
              </TouchableOpacity>
            </BlurView>
            {/* <BlurView
              intensity={100}
              style={[styles.newTripBox, styles.halfBox, { width: "32%" }]}
            >
              <TouchableOpacity
                activeOpacity={0.5}
                style={{ flex: 1, justifyContent: "center" }}
              >
                <Text style={styles.amount}>5</Text>
                <View style={styles.iconBox}>
                  <FlightIcon width="18" color="#C6C6C6" />
                </View>
                <Text
                  style={[
                    styles.halfBoxLabelText,
                    {
                      marginTop: 25,
                      fontSize: 14,
                      color: "#424242",
                    },
                  ]}
                >
                  Flight
                </Text>
              </TouchableOpacity>
            </BlurView> */}
            <BlurView
              intensity={100}
              style={[styles.newTripBox, styles.halfBox, { width: "32%" }]}
            >
              <TouchableOpacity
                activeOpacity={0.5}
                style={{ flex: 1, justifyContent: "center" }}
              >
                <View style={styles.iconBox}>
                  <BusIcon width="18" color="#C6C6C6" />
                </View>
                <Text
                  style={[
                    styles.halfBoxLabelText,
                    {
                      marginTop: 25,
                      fontSize: 14,
                      color: "#424242",
                    },
                  ]}
                >
                  Transport
                </Text>
              </TouchableOpacity>
            </BlurView>
            <BlurView
              intensity={100}
              style={[styles.newTripBox, styles.halfBox, { width: "32%" }]}
            >
              <TouchableOpacity
                activeOpacity={0.5}
                style={{ flex: 1, justifyContent: "center" }}
              >
                <View style={styles.iconBox}>
                  <ShipIcon width="20" color="#C6C6C6" />
                </View>
                <Text
                  style={[
                    styles.halfBoxLabelText,
                    {
                      marginTop: 25,
                      fontSize: 14,
                      color: "#424242",
                    },
                  ]}
                >
                  Cruise
                </Text>
              </TouchableOpacity>
            </BlurView>
            <BlurView
              intensity={100}
              style={[styles.newTripBox, styles.halfBox, { width: "32%" }]}
            >
              <TouchableOpacity
                activeOpacity={0.5}
                style={{ flex: 1, justifyContent: "center" }}
              >
                <View style={styles.iconBox}>
                  <TicketIcon width="20" color="#C6C6C6" />
                </View>
                <Text
                  style={[
                    styles.halfBoxLabelText,
                    {
                      marginTop: 25,
                      fontSize: 14,
                      color: "#424242",
                    },
                  ]}
                >
                  Event
                </Text>
              </TouchableOpacity>
            </BlurView>
            <BlurView
              intensity={100}
              style={[styles.newTripBox, styles.halfBox, { width: "32%" }]}
            >
              <TouchableOpacity
                activeOpacity={0.5}
                style={{ flex: 1, justifyContent: "center" }}
              >
                <View style={styles.iconBox}>
                  <ToDoIcon width="20" color="#C6C6C6" />
                </View>
                <Text
                  style={[
                    styles.halfBoxLabelText,
                    {
                      marginTop: 25,
                      fontSize: 14,
                      color: "#424242",
                    },
                  ]}
                >
                  Other
                </Text>
              </TouchableOpacity>
            </BlurView>
            <BlurView
              intensity={100}
              style={[styles.newTripBox, styles.halfBox, { width: "32%" }]}
            >
              <TouchableOpacity
                activeOpacity={0.5}
                style={{ flex: 1, justifyContent: "center" }}
              >
                <View style={styles.iconBox}>
                  <LodgeIcon width="20" color="#C6C6C6" />
                </View>
                <Text
                  style={[
                    styles.halfBoxLabelText,
                    {
                      marginTop: 25,
                      fontSize: 14,
                      color: "#424242",
                    },
                  ]}
                >
                  Lodging
                </Text>
              </TouchableOpacity>
            </BlurView>
            <BlurView
              intensity={100}
              style={[styles.newTripBox, styles.halfBox, { width: "32%" }]}
            >
              <TouchableOpacity
                activeOpacity={0.5}
                style={{ flex: 1, justifyContent: "center" }}
              >
                <View style={styles.iconBox}>
                  <MapIcon width="20" color="#C6C6C6" />
                </View>
                <Text
                  style={[
                    styles.halfBoxLabelText,
                    {
                      marginTop: 25,
                      fontSize: 14,
                      color: "#424242",
                    },
                  ]}
                >
                  Tour
                </Text>
              </TouchableOpacity>
            </BlurView>
            <BlurView
              intensity={100}
              style={[styles.newTripBox, styles.halfBox, { width: "32%" }]}
            >
              <TouchableOpacity
                activeOpacity={0.5}
                style={{ flex: 1, justifyContent: "center" }}
              >
                <View style={styles.iconBox}>
                  <MuseumIcon width="20" color="#C6C6C6" />
                </View>
                <Text
                  style={[
                    styles.halfBoxLabelText,
                    {
                      marginTop: 25,
                      fontSize: 14,
                      color: "#424242",
                    },
                  ]}
                >
                  Museum
                </Text>
              </TouchableOpacity>
            </BlurView>
            <BlurView
              intensity={100}
              style={[styles.newTripBox, styles.halfBox, { width: "32%" }]}
            >
              <TouchableOpacity
                activeOpacity={0.5}
                style={{ flex: 1, justifyContent: "center" }}
              >
                <View style={styles.iconBox}>
                  <EatIcon width="20" color="#C6C6C6" />
                </View>
                <Text
                  style={[
                    styles.halfBoxLabelText,
                    {
                      marginTop: 25,
                      fontSize: 14,
                      color: "#424242",
                    },
                  ]}
                >
                  Restaurant
                </Text>
              </TouchableOpacity>
            </BlurView>
            <BlurView
              intensity={100}
              style={[styles.newTripBox, styles.halfBox, { width: "32%" }]}
            >
              <TouchableOpacity
                activeOpacity={0.5}
                style={{ flex: 1, justifyContent: "center" }}
                onPress={() => onActivityModalOpen()}
              >
                <View style={styles.iconBox}>
                  <PlusIcon size="30" color="#C6C6C6" />
                </View>
                <Text
                  style={[
                    styles.halfBoxLabelText,
                    {
                      marginTop: 25,
                      fontSize: 14,
                      color: "#424242",
                    },
                  ]}
                >
                  Add activity
                </Text>
              </TouchableOpacity>
            </BlurView>

            {/* This should be visible always to preserve space */}
            <View
              style={[
                styles.newTripBox,
                styles.halfBox,
                { width: "32%", backgroundColor: "transparent" },
              ]}
            ></View>
            {/* This should be visible always to preserve space */}
          </View>
        </ScrollView>
      </View>

      <Portal>
        <Modalize
          ref={modalDestinationRef}
          modalTopOffset={65}
          scrollViewProps={{
            alwaysBounceVertical: false,
            showsVerticalScrollIndicator: false,
          }}
          modalStyle={{
            backgroundColor: "#F2F2F7",
            minHeight: "80%",
          }}
        >
          <Destination />
        </Modalize>
      </Portal>
      <Portal>
        <Modalize
          modalStyle={{
            backgroundColor: "#F2F2F7",
            minHeight: "95%",
            flex: 1,
          }}
          ref={modalActivityRef}
          modalTopOffset={65}
          adjustToContentHeight
          scrollViewProps={{
            alwaysBounceVertical: false,
            showsVerticalScrollIndicator: false,
            keyboardShouldPersistTaps: "handled",
          }}
        >
          <ActivityList
            modalActivityRef={modalActivityRef}
            activity={activity}
            setActivity={setActivity}
          />
        </Modalize>
      </Portal>
      {/* 
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
          <TravelType travelType={travelType} setTravelType={setTravelType} />
        </Modalize>
      </Portal> */}
      <Portal>
        <Modalize
          ref={modalBackgroundRef}
          modalTopOffset={65}
          scrollViewProps={{
            alwaysBounceVertical: false,
            showsVerticalScrollIndicator: false,
          }}
          adjustToContentHeight
          modalStyle={{
            backgroundColor: "#F2F2F7",
          }}
        >
          <Background gradient={gradient} setGradient={setGradient} />
        </Modalize>
      </Portal>
    </>
  );
};

export const TripActivites = ({ tripActivitesModal }) => {
  const [gradient, setGradient] = useState(["#756A95", "#975B76", "#B75E68"]);

  return gradient ? (
    <LinearGradient
      style={[styles.tripModalGradient, { padding: 0 }]}
      colors={gradient}
      start={{ x: -1, y: 1 }}
      end={{ x: 1, y: 0 }}
    >
      <CreateTripContent
        gradient={gradient}
        setGradient={setGradient}
        tripActivitesModal={tripActivitesModal}
      />
    </LinearGradient>
  ) : (
    <Image
      source={{
        uri: "https://cdn.pixabay.com/photo/2018/04/25/09/26/eiffel-tower-3349075_1280.jpg",
      }}
      cachePolicy="memory"
      contentFit="cover"
      transition={0}
      style={styles.tripModalGradient}
    >
      <CreateTripContent tripActivitesModal={tripActivitesModal} />
    </Image>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F2F2F7",
  },
  cancelTripButton: {
    position: "relative",
  },
  cancelTripButtonText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: "500",
  },
  tripName: {
    fontSize: 28,
    color: COLORS.white,
    fontWeight: "700",
    marginBottom: 15,
  },
  iconBox: {
    width: 35,
    height: 35,
    backgroundColor: "#333",
    borderRadius: 100,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  createTripButton: {
    marginRight: 0,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 25,
    paddingVertical: 7,
    paddingHorizontal: 20,
  },
  createTripButtonText: {
    color: COLORS.black,
    fontSize: 16,
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
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255, 0.2)",
  },
  datePickerTopRowLeftText: {
    fontSize: 14,
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
    fontSize: 24,
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
    paddingTop: 5,
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
  amount: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.black,
    position: "absolute",
    right: 0,
    top: 0,
  },
  newTripBox: {
    width: 100,
    height: 100,
    backgroundColor: "rgba(204, 206, 206, 0.6)",
    borderRadius: 20,
    marginRight: 0,
    marginBottom: 10,
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
    color: COLORS.white,
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
