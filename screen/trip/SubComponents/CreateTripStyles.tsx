import Constants from "expo-constants";
import { Platform, StyleSheet } from "react-native";

import { COLORS, SIZES } from "../../../styles/theme";

export const styles = StyleSheet.create({
  addUserButton: {
    alignItems: "center",
    backgroundColor: "#8e8e8e",
    borderColor: "#fff",
    borderRadius: 50,
    borderWidth: 1,
    height: 25,
    justifyContent: "center",
    left: -10,
    position: "relative",
    top: 0,
    width: 25,
    zIndex: 2,
  },
  aiPlanButton: {
    alignItems: "center",
    borderRadius: 50,
    flexDirection: "row",
    height: 50,
    justifyContent: "center",
    overflow: "hidden",
    width: "100%",
  },
  aiPlanButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    marginRight: 5,
  },
  buttonWithContextMenu: {
    position: "absolute",
    right: 10,
    top: 10,
  },
  buttonWithContextMenuList: {
    backgroundColor: "#fff",
    borderRadius: 6,
    paddingVertical: 0,
    position: "absolute",
    right: 0,
    top: 35,
    ...COLORS.shadow,
    overflow: "hidden",
    width: 125,
    zIndex: 1,
  },
  buttonWithContextMenuListItem: {
    borderBottomColor: "#ddd",
    borderBottomWidth: 1,
    paddingHorizontal: 25,
    paddingVertical: 15,
  },
  buttonWithContextMenuListItemText: {
    color: COLORS.black,
    fontSize: 14,
    fontWeight: "600",
  },
  cancelTripButton: {
    alignItems: 'center',
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    borderRadius: 30,
    height: 35,
    justifyContent: 'center',
    padding: 10,
    width: 35
  },
  cancelTripButtonText: {
    color: COLORS.black,
    fontSize: 14,
    fontWeight: "500",
  },
  centeredView: {
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    flex: 1,
    justifyContent: "center",
    marginTop: 0,
  },
  clearAllButton: {
    alignItems: "center",
    height: 40,
    justifyContent: "center",
  },
  clearAllButtonText: {
    color: COLORS.black,
    fontSize: 14,
    fontWeight: "600",
    textDecorationLine: "underline",
  },
  createTripButton: {
    backgroundColor: COLORS.primaryDark,
    borderRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 7,
  },
  createTripButtonText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: "500",
  },
  datePickerBottomRow: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    paddingVertical: 15,
  },
  datePickerBottomRowLeft: {
    position: "relative",
  },
  datePickerBottomRowRight: {
    position: "relative",
  },
  datePickerTopRow: {
    borderBottomColor: "rgba(255,255,255, 0.2)",
    borderBottomWidth: 1,
    flexDirection: "row",
    paddingHorizontal: 15,
    paddingVertical: 15,
    width: "100%",
  },
  datePickerTopRowLeft: {
    alignItems: "center",
    flexDirection: "row",
  },
  datePickerTopRowLeftText: {
    color: COLORS.black,
    fontSize: 14,
    fontWeight: "500",
    marginLeft: 8,
    marginTop: 2,
  },
  fullBox: {
    height: "auto",
    width: "100%",
  },
  gradientWrapper: {
    height: "100%",
    left: 0,
    padding: 20,
    position: "absolute",
    top: 0,
    width: "100%",
  },
  h2: {
    color: COLORS.black,
    fontSize: 22,
    fontWeight: "bold",
  },
  halfBox: {
    height: 120,
    justifyContent: "center",
    width: "48%",
  },
  halfBoxLabelText: {
    color: COLORS.black,
    fontSize: 16,
    fontWeight: "500",
    marginTop: 10,
  },
  halfBoxValueText: {
    color: COLORS.black,
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 5,
    opacity: 1,
    textTransform: "capitalize",
  },
  header: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 25,
    paddingHorizontal: 15,
  },
  headingTitle: {
    color: COLORS.black,
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 25,
  },
  invitationBox: {
    flexDirection: "row",
    maxWidth: 120,
    position: "relative",
  },
  invitationBoxTexts: {
    flexDirection: "column",
    marginLeft: 10,
  },
  invitationByText: {
    bottom: 13,
    color: "#fff",
    fontSize: 12,
    left: 20,
    opacity: 0.9,
    position: "absolute",
  },
  invitationByUserText: {
    color: "#fff",
    fontWeight: "600",
    opacity: 1,
  },
  invitationStatus: {
    color: COLORS.gray,
    fontSize: 12,
    marginTop: 3,
  },
  inviteBox: {
    alignItems: "center",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    overflow: "hidden",
    paddingHorizontal: 15,
    paddingTop: 15,
  },
  inviteBoxInput: {
    backgroundColor: "#fafafa",
    borderBottomStartRadius: 10,
    borderTopLeftRadius: 10,
    color: COLORS.black,
    flex: 1,
    height: 50,
    paddingLeft: 15,
  },
  inviteButton: {
    alignItems: "center",
    backgroundColor: COLORS.primaryDark,
    borderBottomEndRadius: 10,
    borderTopRightRadius: 10,
    height: 50,
    justifyContent: "center",
    paddingHorizontal: 25,
  },
  inviteButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
  inviteOne: {
    borderRadius: 50,
    height: 25,
    width: 25,
  },
  inviteTwo: {
    borderColor: "#fff",
    borderRadius: 50,
    borderWidth: 1,
    height: 25,
    left: -10,
    position: "relative",
    top: 0,
    width: 25,
    zIndex: 2,
  },
  invitedList: {
    flex: 1,
    marginTop: 15,
    paddingHorizontal: 15,
  },
  invitedListItem: {
    alignItems: "center",
    backgroundColor: COLORS.lightGray,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
    padding: 15,
    width: "100%",
  },
  invitedUserImage: {
    borderRadius: 50,
    minHeight: 25,
    minWidth: 25,
    width: 25,
  },
  invitedUserName: {
    color: COLORS.black,
    fontSize: 14,
    fontWeight: "600",
  },
  lfSide: {
    alignItems: "center",
    flexDirection: "row",
  },
  manualPlanButton: {
    alignItems: "center",
    backgroundColor: COLORS.black,
    borderRadius: 10,
    flexDirection: "row",
    height: 50,
    justifyContent: "center",
    marginTop: 0,
    paddingHorizontal: 20,
  },
  manualPlanButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  modalView: {
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 20,
    elevation: 5,
    margin: 20,
    padding: 35,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  modalViewCenter: {
    alignItems: "center",
    backgroundColor: "#F2F2F7",
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    height: "100%",
    width: "100%",
  },
  modalViewWrapper: {
    alignItems: "center",
    backgroundColor: "red",
    flex: 1,
    justifyContent: "center",
    marginTop: 22,
  },
  myTripsText: {
    color: COLORS.black,
    fontSize: 20,
    fontWeight: "600",
  },
  newTripBox: {
    backgroundColor: "rgba(204, 206, 206, 0.6)",
    borderRadius: 20,
    height: 100,
    marginBottom: 15,
    marginRight: 0,
    overflow: "hidden",
    width: 100,
  },
  newTripBoxButton: {
    height: "100%",
    justifyContent: "center",
    padding: 15,
  },
  newTripBoxes: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    width: "100%",
  },
  newTripButton: {
    alignItems: "center",
    backgroundColor: COLORS.primaryDark,
    borderRadius: 50,
    flexDirection: "row",
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  newTripButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
  newTripHeader: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  newTripHeaderTitleText: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "600",
  },
  newTripWrapper: {
    flex: 1,
    paddingHorizontal: 15,
  },
  noResultWrapper: {
    alignItems: "center",
    flex: 1,
    height: 250,
    justifyContent: "center",
    marginTop: 25,
    paddingHorizontal: 25,
    textAlign: "center",
  },
  noResultWrapperText: {
    color: COLORS.darkgray,
    fontSize: 14,
    lineHeight: 20,
    marginTop: 25,
    maxWidth: "80%",
    textAlign: "center",
  },
  notFoundView: {
    alignItems: "center",
    flex: 1,
    height: 500,
    justifyContent: "center",
  },
  notFoundViewText: {
    color: COLORS.darkgray,
    fontSize: 14,
    lineHeight: 20,
    marginTop: 25,
    maxWidth: "80%",
    textAlign: "center",
  },
  otherDetails: {
    flexDirection: "row",
  },
  otherDetailsBox: {
    alignItems: "center",
    flexDirection: "row",
    marginLeft: 10,
  },
  otherDetailsBoxText: {
    color: COLORS.black,
    fontSize: 11,
    fontWeight: "500",
    marginLeft: 3,
    marginTop: 1,
  },
  otherStats: {
    alignItems: "center",
    bottom: 5,
    flexDirection: "row",
    position: "absolute",
    right: 15,
    zIndex: 2,
  },
  otherUsers: {
    alignItems: "center",
    backgroundColor: "#8e8e8e",
    borderColor: "#fff",
    borderRadius: 50,
    borderWidth: 1,
    height: 25,
    justifyContent: "center",
    left: -20,
    position: "relative",
    top: 0,
    width: 25,
    zIndex: 2,
  },
  otherUsersText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "600",
  },
  removeInvitedUser: {},
  rowItemHeader: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    paddingVertical: 15,
  },
  safeArea: {
    backgroundColor: "#F2F2F7",
    flex: 1,
  },
  startsDateLabel: {
    color: COLORS.black,
    fontSize: 12,
    marginBottom: 5,
    opacity: 0.8,
  },
  startsDateText: {
    color: COLORS.black,
    fontSize: 22,
    fontWeight: "bold",
  },
  statItem: {
    alignItems: "center",
    flexDirection: "row",
    marginLeft: 5,
    padding: 5,
  },
  statItemText: {
    color: "#fff",
    fontSize: 12,
    marginLeft: 5,
  },
  tripCreationFooter: {
    alignItems: "center",
    backgroundColor: "#fff",
    borderTopColor: "#e1e1e1",
    borderTopWidth: 1,
    bottom: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    left: 0,
    paddingBottom: 45,
    paddingHorizontal: 20,
    paddingTop: 15,
    position: "absolute",
    right: 0,
    width: SIZES.width,
    zIndex: 2,
  },
  tripDate: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "400",
  },
  tripDetails: {
    alignItems: "center",
    backgroundColor: "#fff",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 10,
    width: "100%",
  },
  tripImage: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderRadius: 25,
    height: 150,
    position: "relative",
    width: "100%",
  },
  tripInHeader: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  tripItem: {
    marginBottom: 25,
    width: "100%",
  },
  tripItemHeader: {
    height: 150,
    position: "relative",
    width: "100%",
  },
  tripModalGradient: {
    flex: 1,
    minHeight: SIZES.height,
    paddingHorizontal: 20,
    paddingTop:
      Platform.OS === "android" ? 25 : Constants?.statusBarHeight + 10,
  },
  tripNameInput: {
    borderBottomColor: "rgba(255, 255, 255, 0.3)",
    color: COLORS.primary,
    fontSize: 28,
    fontWeight: "700",
    height: 50,
    marginBottom: 15,
    overflow: "hidden",
    paddingLeft: 0,
  },
  tripNameInputWrapper: {
    // backgroundColor: "rgba(204, 206, 206, 0.6)",
    borderRadius: 15,
    marginBottom: 15,
    overflow: "hidden",
  },
  tripSettingsButton: {
    marginRight: -7,
    marginTop: -3,
    padding: 14,
  },
  tripTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "600",
    marginTop: 5,
  },
});