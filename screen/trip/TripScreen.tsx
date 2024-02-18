import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import React, { useRef, useState } from "react";
import {
  KeyboardAvoidingView,
  Modal,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { COLORS, SIZES } from "../../styles/theme";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { DatePickerModal } from "react-native-paper-dates";
import { enGB, registerTranslation } from "react-native-paper-dates";
registerTranslation("en", enGB);

import {
  AddUser,
  CalendarFilledIcon,
  CoupleIcon,
  DownIcon,
  EyeIcon,
  FamilyIcon,
  ImageIcon,
  NoDestinationFoundIcon,
  OneUserIcon,
  PlusIcon,
  PrivateIcon,
  PublicLockIcon,
  SearchNotFound,
  TrashIcon,
  TripLocationIcon,
  TryIcon,
  UsersIcon,
  VertDots,
} from "../../utilities/SvgIcons.utility";
import { BlurView } from "expo-blur";

import { Portal } from "react-native-portalize";
import { Modalize } from "react-native-modalize";
import { TextInput } from "react-native-gesture-handler";
import { CreateTrip } from "./CreateTrip";
import { TripActivites } from "./TripActivities";

interface TripProps {}

export const TripScreen: React.FC<TripProps> = ({}) => {
  const [invitedUsers, setInvitedUsers] = useState([
    "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=20&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1704642408219-977150048504?q20&w=3325&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1704642408219-977150048504?q20&w=3325&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  ]);

  const invitedUsersModal = useRef<Modalize>(null);

  const newTripModal = useRef<Modalize>(null);
  const tripActivitesModal = useRef<Modalize>(null);

  return (
    <>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <Text style={styles.myTripsText}>Trips</Text>

          <TouchableOpacity
            style={styles.newTripButton}
            activeOpacity={0.7}
            onPress={() => newTripModal.current?.open()}
          >
            <PlusIcon color="" size="20" />
            <Text style={styles.newTripButtonText}>New trip</Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={{ flex: 1, paddingHorizontal: 15 }}>
          {false ? (
            <View style={styles.notFoundView}>
              <NoDestinationFoundIcon />
              <Text style={styles.notFoundViewText}>
                You don't have any trip yet, click on New trip button and
                prepare for your next destination
              </Text>
            </View>
          ) : (
            <>
              <View style={styles.tripItem}>
                <TouchableOpacity
                  style={styles.tripItemHeader}
                  activeOpacity={0.7}
                >
                  <Image
                    source={{
                      uri: "https://images.unsplash.com/photo-1550340499-a6c60fc8287c?q=20&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                    }}
                    cachePolicy="memory"
                    contentFit="cover"
                    transition={0}
                    style={styles.tripImage}
                  >
                    <LinearGradient
                      style={styles.gradientWrapper}
                      colors={["rgba(0,0,0,1)", "rgba(0,0,0,0.2)"]}
                      start={{ x: -1, y: 1 }}
                      end={{ x: 1, y: 0 }}
                    >
                      <View style={styles.tripInHeader}>
                        <Text style={styles.tripDate}>14 Nov → 20 Nov</Text>
                      </View>
                      <Text style={styles.tripTitle}>Hangover Paris</Text>

                      <View style={styles.otherDetailsBox}>
                        {/* <OneUserIcon size="10" color="#fff" /> */}
                        {/* <UsersIcon size="10" color="#fff" />
                        <Text style={styles.otherDetailsBoxText}>Solo</Text> */}
                        {/* <FamilyIcon /> */}
                        {/* <CoupleIcon /> */}
                        {/* 
                        TODO: Friends, Family, Couple

                        <Text style={styles.otherDetailsBoxText}>Solo</Text> */}
                      </View>
                    </LinearGradient>
                  </Image>
                </TouchableOpacity>
              </View>
              <Text style={styles.headingTitle}>Past trips</Text>

              <View style={styles.tripItem}>
                <TouchableOpacity
                  style={styles.tripItemHeader}
                  activeOpacity={0.7}
                >
                  <Image
                    source={{
                      uri: "https://images.unsplash.com/photo-1550340499-a6c60fc8287c?q=20&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                    }}
                    cachePolicy="memory"
                    contentFit="cover"
                    transition={0}
                    style={styles.tripImage}
                  >
                    <LinearGradient
                      style={styles.gradientWrapper}
                      colors={["rgba(0,0,0,1)", "rgba(0,0,0,0.2)"]}
                      start={{ x: -1, y: 1 }}
                      end={{ x: 1, y: 0 }}
                    >
                      <View style={styles.tripInHeader}>
                        <Text style={styles.tripDate}>14 Nov → 20 Nov</Text>
                      </View>
                      <Text style={styles.tripTitle}>Hangover Paris</Text>
                    </LinearGradient>
                  </Image>
                </TouchableOpacity>
              </View>

              {/* <Text style={styles.headingTitle}>Past trips</Text>
              <View style={styles.tripItem}>
                <TouchableOpacity
                  style={styles.tripItemHeader}
                  activeOpacity={0.7}
                >
                  <Image
                    source={{
                      uri: "https://images.unsplash.com/photo-1533281808624-e9b07b4294ff?q=20&w=3426&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                    }}
                    cachePolicy="memory"
                    contentFit="cover"
                    transition={0}
                    style={styles.tripImage}
                  >
                    <LinearGradient
                      style={styles.gradientWrapper}
                      colors={["rgba(0,0,0,1)", "rgba(0,0,0,0.2)"]}
                      start={{ x: -1, y: 1 }}
                      end={{ x: 1, y: 0 }}
                    >
                      <View style={styles.tripInHeader}>
                        <Text style={styles.tripDate}>14 Nov → 20 Nov</Text>
                      </View>
                      <Text style={styles.tripTitle}>Singapore holidays</Text>

                      <Text style={styles.invitationByText}>
                        Invited by{" "}
                        <Text style={styles.invitationByUserText}>Miller</Text>
                      </Text>
                      <View style={styles.otherStats}>
                        <TouchableOpacity
                          activeOpacity={0.7}
                          style={styles.statItem}
                        >
                          <EyeIcon />
                          <Text style={styles.statItemText}>9</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          activeOpacity={0.7}
                          style={styles.statItem}
                        >
                          <TryIcon />
                          <Text style={styles.statItemText}>12</Text>
                        </TouchableOpacity>
                      </View>
                    </LinearGradient>
                  </Image>
                </TouchableOpacity>

                <View style={styles.tripDetails}>
                  <View style={styles.invitationBox}>
                    {invitedUsers?.length > 0 && (
                      <Image
                        cachePolicy="memory"
                        contentFit="cover"
                        transition={0}
                        source={{
                          uri: invitedUsers?.[0],
                        }}
                        style={styles.inviteOne}
                      />
                    )}
                    {invitedUsers?.length >= 2 && (
                      <Image
                        cachePolicy="memory"
                        contentFit="cover"
                        transition={0}
                        source={{
                          uri: invitedUsers?.[1],
                        }}
                        style={styles.inviteTwo}
                      />
                    )}
                    {invitedUsers?.length > 2 && (
                      <View style={styles.otherUsers}>
                        <Text style={styles.otherUsersText}>2+</Text>
                      </View>
                    )}
                    <TouchableOpacity
                      activeOpacity={0.7}
                      style={[
                        styles.addUserButton,
                        {
                          left:
                            invitedUsers?.length === 2
                              ? -20
                              : invitedUsers?.length > 2
                              ? -28
                              : -10,
                        },
                      ]}
                    >
                      <AddUser />
                    </TouchableOpacity>
                  </View>
                  <View style={styles.otherDetails}>
                    <View style={styles.otherDetailsBox}>
                      <PrivateIcon />
                      <Text style={styles.otherDetailsBoxText}>Private</Text>

                      <GlobeIcon />
                       
                <Text style={styles.otherDetailsBoxText}>Private</Text>
                    </View>
                    <View style={styles.otherDetailsBox}>
                      <OneUserIcon size="10" />

                      <Text style={styles.otherDetailsBoxText}>Solo</Text>

                      <UsersIcon />  
                      <FamilyIcon />
                      <CoupleIcon />
                  Friends, Family, Couple

                <Text style={styles.otherDetailsBoxText}>Solo</Text>
                    </View>
                  </View>
                </View>
              </View> */}
            </>
          )}
        </ScrollView>
      </SafeAreaView>

      <Portal>
        <Modalize
          ref={invitedUsersModal}
          modalTopOffset={200}
          HeaderComponent={
            <>
              <View style={styles.rowItemHeader}>
                <Text style={styles.h2}>Trip members</Text>
              </View>
              <View style={styles.inviteBox}>
                <TextInput
                  placeholder="Enter email"
                  style={styles.inviteBoxInput}
                  placeholderTextColor="#85858B"
                  inputMode="email"
                />
                <TouchableOpacity
                  style={styles.inviteButton}
                  activeOpacity={0.7}
                >
                  <Text style={styles.inviteButtonText}>Invite</Text>
                </TouchableOpacity>
              </View>
            </>
          }
          modalStyle={{
            backgroundColor: "#F2F2F7",
            minHeight: "80%",
          }}
        >
          {false ? (
            <View style={styles.invitedList}>
              <View style={styles.invitedListItem}>
                <View style={styles.lfSide}>
                  <Image
                    cachePolicy="memory"
                    contentFit="cover"
                    transition={0}
                    source={{
                      uri: invitedUsers?.[0],
                    }}
                    style={styles.invitedUserImage}
                  />
                  <View style={styles.invitationBoxTexts}>
                    <Text style={styles.invitedUserName}>Giorgi Bitsadze</Text>
                    <Text style={styles.invitationStatus}>Accepted</Text>
                  </View>
                </View>
                <TouchableOpacity
                  activeOpacity={0.7}
                  style={styles.removeInvitedUser}
                >
                  <TrashIcon color="#BBB" />
                </TouchableOpacity>
              </View>
              <View style={styles.invitedListItem}>
                <View style={styles.lfSide}>
                  <Image
                    cachePolicy="memory"
                    contentFit="cover"
                    transition={0}
                    source={{
                      uri: invitedUsers?.[0],
                    }}
                    style={styles.invitedUserImage}
                  />
                  <View style={styles.invitationBoxTexts}>
                    <Text style={styles.invitedUserName}>Beka Arabidze</Text>
                    <Text style={styles.invitationStatus}>Pending</Text>
                  </View>
                </View>
                <TouchableOpacity
                  activeOpacity={0.7}
                  style={styles.removeInvitedUser}
                >
                  <TrashIcon color="#BBB" />
                </TouchableOpacity>
              </View>
              <View style={styles.invitedListItem}>
                <View style={styles.lfSide}>
                  <Image
                    cachePolicy="memory"
                    contentFit="cover"
                    transition={0}
                    source={{
                      uri: invitedUsers?.[0],
                    }}
                    style={styles.invitedUserImage}
                  />
                  <View style={styles.invitationBoxTexts}>
                    <Text style={styles.invitedUserName}>Giorgi Bitsadze</Text>
                    <Text style={styles.invitationStatus}>Accepted</Text>
                  </View>
                </View>
                <TouchableOpacity
                  activeOpacity={0.7}
                  style={styles.removeInvitedUser}
                >
                  <TrashIcon color="#BBB" />
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <View style={styles.noResultWrapper}>
              <SearchNotFound />
              <Text style={styles.noResultWrapperText}>
                You haven't added trip members yet, enter email and send
                invitation
              </Text>
            </View>
          )}
        </Modalize>
      </Portal>

      {/* Create trip */}

      <Portal>
        <Modalize
          ref={newTripModal}
          modalTopOffset={0}
          withHandle={false}
          disableScrollIfPossible
          scrollViewProps={{
            alwaysBounceVertical: false,
          }}
          modalStyle={{
            minHeight: "100%",
          }}
        >
          <CreateTrip
            newTripModalRef={newTripModal}
            tripActivitesModal={tripActivitesModal}
          />
        </Modalize>
      </Portal>

      <Portal>
        <Modalize
          ref={tripActivitesModal}
          modalTopOffset={0}
          withHandle={false}
          disableScrollIfPossible
          scrollViewProps={{
            alwaysBounceVertical: false,
          }}
          modalStyle={{
            minHeight: "100%",
          }}
        >
          <TripActivites tripActivitesModal={tripActivitesModal} />
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
  cancelTripButton: {
    paddingVertical: 7,
    paddingHorizontal: 12,
    borderRadius: 30,
    backgroundColor: "#fff",
  },
  cancelTripButtonText: {
    color: COLORS.black,
    fontSize: 14,
    fontWeight: "500",
  },
  createTripButton: {
    paddingVertical: 7,
    paddingHorizontal: 12,
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
  },
  startsDateLabel: {
    fontSize: 12,
    color: COLORS.black,
    opacity: 0.8,
    marginBottom: 5,
  },
  startsDateText: {
    fontSize: 16,
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
    borderRadius: 15,
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
    fontSize: 24,
    color: COLORS.white,
    fontWeight: "600",
    overflow: "hidden",
    marginBottom: 15,
    borderBottomColor: "rgba(255, 255, 255, 0.3)",
    borderBottomWidth: 1,
  },
  tripModalGradient: {
    flex: 1,
    minHeight: SIZES.height,
    paddingTop: 70,
    paddingHorizontal: 15,
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
    position: "absolute",
    left: 20,
    bottom: 15,
    zIndex: 1,
  },
  invitationBox: {
    position: "relative",
    flexDirection: "row",
    maxWidth: 120,
  },
  otherDetailsBoxText: {
    fontWeight: "500",
    marginLeft: 3,
    fontSize: 12,
    color: COLORS.white,
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
