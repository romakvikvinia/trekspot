import { Platform, StyleSheet } from "react-native";
import { COLORS } from "../../styles/theme";
import Constants from "expo-constants";

export const styles = StyleSheet.create({
  showMoreButtonWrapper: {
    width: "100%",
    justifyContent: "center",
    flexDirection: "row",
  },
  infoText: {
    marginTop: 15, 
    lineHeight: 15, 
    fontSize: 12, 
    textAlign: 'center', 
    maxWidth: "100%", 
    color: "#000", 
    opacity: 0.6
  },
  showMoreButton: {
    width: 150,
    height: 35,
    backgroundColor: "#ddd",
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 30,
  },
  showMoreButtonText: {
    fontSize: 12,
    color: COLORS.black,
    fontWeight: "500",
  },
  tabContentHeader: {
    paddingHorizontal: 15,
    marginTop: 20,
    marginBottom: 15,
  },
  tabContentHeaderText: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.darkgray,
  },
  eventDate: {
    width: "100%",
    marginVertical: 15,
  },
  eventDateText: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.black,
    marginBottom: 15,
  },
  eventItem: {
    flexDirection: "row",
    width: "100%",
    marginBottom: 25,
    alignItems: "center",
  },
  eventRight: {
    maxWidth: "80%",
    marginLeft: 10,
  },
  eventTitle: {
    fontWeight: "600",
    color: COLORS.black,
    fontSize: 14,
    marginBottom: 5,
  },
  eventLocation: {
    fontWeight: "500",
    color: COLORS.gray,
    fontSize: 12,
  },
  weatherRows: {
    width: "100%",
    marginTop: 25,
    padding: 15,
    borderRadius: 8,
    backgroundColor: "#f9fafb",
    borderWidth: 1,
    borderColor: "#eee"
  },
  weatherRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  weatherLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  temperatureText: {
    fontSize: 16,
    color: COLORS.black,
  },
  seasonText: {
    fontSize: 16,
    color: COLORS.black,
    fontWeight: "500",
    marginLeft: 8,
  },
  customTabLabel: {
    fontWeight: "600",
    marginTop: 8,
    fontSize: 12,
  },
  customTab: {
    flex: 1,
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 15,
  },
  swiperWrapper: {
    height: 300,
  },
  cityWrapper: {
    paddingHorizontal: 15,
    paddingTop: 15,
    marginBottom: 10,
    flexWrap: "wrap",
    flexDirection: "row",
  },
  citySelectBtn: {
    marginRight: 15,
    paddingHorizontal: 8,
    paddingVertical: 5,
    backgroundColor: "#fafafa",
    borderRadius: 5,
    marginVertical: 3,
  },
  citySelectBtnText: {
    fontSize: 13,
  },
  selectedCity: {
    color: COLORS.primaryDark,
    fontWeight: "bold",
  },
  selectedCityActive: {
    backgroundColor: "#fdecff",
  },
  currencyWrapper: {
    marginTop: 25,
    marginBottom: 15,
  },
  currencyConverter: {
    backgroundColor: "#fafafa",
    alignItems: "center",
    overflow: "hidden",
    borderRadius: 10,
    flexDirection: "row",
    padding: 20,
  },
  left: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f1f1f1",
    overflow: "hidden",
    borderRadius: 5,
    marginRight: 15,
  },
  tags: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 5,
  },
  tag: {
    paddingVertical: 5,
    paddingHorizontal: 8,
    borderRadius: 5,
    marginRight: 5,
    marginBottom: 5,
    backgroundColor: "#f2f2f2",
  },
  tagText: {
    fontSize: 13,
    fontWeight: "600",
  },
  currencySelectButton: {
    paddingLeft: 15,
    flexDirection: "row",
    alignItems: "center",
  },
  currencySelectedText: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.primary,
    marginRight: 5,
  },
  currencyInput: {
    height: 40,
    backgroundColor: "#fff",
    width: 100,
    textAlign: "center",
    marginTop: 0,
    marginLeft: 10,
    color: "#000",
    borderWidth: 1,
    borderColor: "#f1f1f1",
    fontSize: 18,
    fontWeight: "bold",
    paddingHorizontal: 5,
  },
  valueText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  emergencyNumbers: {
    flex: 1,
    marginTop: 25,
  },
  emergencyButtonItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fafafa",
    paddingHorizontal: 15,
    borderRadius: 10,
    paddingVertical: 15,
    marginBottom: 15,
  },
  emergencyButtonItemText: {
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 10,
    color: "#fff",
  },
  thingsTodoItemHead: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  mapButton: {
    position: "absolute",
    backgroundColor: "rgba(0,0,0, 0.3)",
    padding: 5,
    right: 5,
    top: 5,
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
  },
  mapButtonText: {
    justifyContent: "center",
    alignItems: "center",
    color: "#fff",
    fontSize: 12,
    marginLeft: 3,
  },
  dictionaryWrapper: {
    marginTop: 25,
  },
  dictionaryCategory: {
    width: "100%",
    marginBottom: 25,
    shadowColor: "#cccdd0",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 10,
    borderRadius: 10,
    backgroundColor: "white",
    padding: 20,
  },
  dictionaryCategoryTitle: {
    fontSize: 16,
    color: "#000",
    fontWeight: "bold",
    marginBottom: 15,
  },
  dictionaryCategoryRow: {
    flexDirection: "row",
    marginVertical: 5,
  },
  dictionaryCategoryRowKey: {
    width: 140,
    fontSize: 14,
    color: "#000",
  },
  dictionaryCategoryRowValue: {
    fontWeight: "bold",
    fontSize: 14,
    color: "#000",
    flex: 1,
  },
  visaTabContent: {
    flex: 1,
    marginBottom: 25,
  },
  thingsTodo: {
    marginTop: 25,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 15,
  },
  thingsTodoItemDetails: {
    marginTop: 10,
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  thingsTodoItemImage: {
    width: "100%",
    minHeight: 110,
    borderTopEndRadius: 10,
    borderTopLeftRadius: 10,
    overflow: "hidden",
    position: "relative",
  },
  // gradientWrapper: {
  //   flex: 1,
  //   justifyContent: "flex-end",
  // },
  thingsTodoItemiIn: {
    marginTop: 10,
    paddingBottom: 15,
  },
  thingsTodoItemTitle: {
    fontSize: 14,
    color: "#000",
    fontWeight: "600",
  },
  thingsTodoItemiInprice: {
    fontSize: 12,
    color: "#000",
  },
  thingsTodoItem: {
    marginBottom: 25,
    width: "96%",
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#f1f1f1",
    backgroundColor: "#f2f2f2",
    minHeight: 200,
    // marginHorizontal: "2%",
  },
  forYouRow: {
    marginVertical: 0,
  },
  forYouRowTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: COLORS.black,
    paddingHorizontal: 0,
    marginBottom: 15,
  },
  forYouRowTitleSub: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.black,
    paddingHorizontal: 15,
    maxWidth:"90%"
  },
  thingsTodoItemiIntypeText: {
    fontSize: 12,
    color: COLORS.darkgray,
    marginRight: 5,
    marginBottom: 5,
  },
  drivingSide: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
  },
  drivingSideText: {
    color: "#000",
    fontSize: 20,
    fontWeight: "bold",
  },
  transports: {
    flexDirection: "row",
    marginTop: 5,
    flexWrap: "wrap",
    justifyContent: "space-between"
  },
  transportItem: {
    backgroundColor: "#f2f2f2",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 5,
    overflow: "hidden",
    marginVertical: 5,
    width: "48%"
  },
  transportItemIcon: {
    backgroundColor: "#eee",
    padding: 0,
    width: 50, 
    height: 50,
    alignItems: "center"
  },
  transportText: {
    fontSize: 14,
    fontWeight: "bold",
    paddingHorizontal: 10,
    maxWidth: "70%"
  },
  textContentWrapper: {
    backgroundColor: "#fafafa",
    padding: 15,
    borderRadius: 10,
    marginTop: 25,
    flexDirection: "row",
    alignItems: "center",
  },
  headingText: {
    fontWeight: "500",
    fontSize: 14,
    marginLeft: 10,
    color: "#000",
    lineHeight: 18,
    maxWidth: "80%",
  },
  secondaryTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 25,
    color: COLORS.darkgray,
  },
  danger: {
    color: "#D74E4E",
  },
  success: {
    color: "#1a806b",
  },
  warning: {
    color: "#d27d00",
  },
  successBg: {
    backgroundColor: "#e8f1ef",
  },
  dangerBg: {
    backgroundColor: "#ffe8e8",
  },
  warningBg: {
    backgroundColor: "#fff3e4",
  },
  visaTypes: {
    flex: 1,
  },
  visaTypeCard: {
    borderWidth: 1,
    backgroundColor: "#f9fafb",
    borderColor: "#eee",
    marginTop: 20,
    padding: 15,
    borderRadius: 10,
  },
  visaTypeCardTitle: {
    fontWeight: "bold",
    fontSize: 18,
    color: "#000",
  },
  staysNtype: {
    marginTop: 10,
  },
  staysNtypeRow: {
    flexDirection: "row",
    marginVertical: 3,
  },
  staysNtypeRowKey: {
    width: 100,
    color: COLORS.darkgray,
    fontSize: 12,
    fontWeight: "bold",
  },
  staysNtypeRowValue: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#000",
    textTransform: "capitalize"
  },
  box: {
    height: 300,
    borderTopEndRadius: 0,
    borderTopLeftRadius: 0,
    overflow: "hidden",
 
  },
  keyValue: {
    display: "flex",
    marginBottom: 30,
  },
  key: {
    fontWeight: "600",
    fontSize: 14,
    color: COLORS.darkgray,
    marginRight: 5,
    marginBottom: 10,
  },
  value: {
    fontWeight: "bold",
    fontSize: 15,
    color: COLORS.black,
    marginRight: 5,
  },
  multiValues: {
    flexDirection: "row",
    flexWrap: "wrap"
  },
  visaTabHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 20,
  },
  travelToText: {
    fontSize: 16,
    fontWeight: "bold",
    maxWidth: "70%"
  },
  backButton: {
    width: Platform.OS === "android" ? 30 : 40,
    height: Platform.OS === "android" ? 30 : 40,
    backgroundColor: "#fff",
    borderRadius: 100,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    ...COLORS.shadow,
    position: "absolute",
    top: Platform.OS === "android" ? Constants?.statusBarHeight + 10 : 55,
    left: 15,
    zIndex: 1,
  },
  generalRow: {
    width: "100%",
    marginTop: 20,
    paddingHorizontal: 15,
    borderBottomWidth: 5,
    borderColor: "#eeeeee",
    paddingBottom: 20,
  },
  overviewText: {
    fontSize: 13,
    color: COLORS.black,
    fontWeight: "500",
    lineHeight: 18,
  },

  gradientWrapper: {
    flex: 1,
    zIndex: 2,
    position: "absolute",
    top: 0,
    left: 0,
    height: 400,
    width: "100%",
  },
  tabWrapper: {
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  addToBucketButton: {
    width: Platform.OS === "android" ? 30 : 40,
    height: Platform.OS === "android" ? 30 : 40,
    borderRadius: 50,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    right: 15,
    top: Platform.OS === "android" ? Constants?.statusBarHeight + 10 : 55,
    zIndex: 3,
  },
  otherInfo: {
    position: "absolute",
    bottom: 5,
    left: 5,
  },
  labelItem: {
    padding: 10,
    paddingVertical: 0,
    flexDirection: "row",
    alignItems: "center",
  },
  labelItemText: {
    color: "#fff",
    fontSize: 34,
    fontWeight: "bold",
    marginLeft: 0,
  },
  ratingLabel: {
    flexDirection: "row",
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 30,
    alignItems: "center",
    paddingBottom: 10,
  },
  ratingText: {
    color: "#fff",
    marginLeft: 3,
    fontSize: 14,
    opacity: 0.9,
    fontWeight: "500"
  },
  passportBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 8,
    paddingVertical: 7,
    borderRadius: 6,
    ...COLORS.shadow,
    marginLeft: 0,
    width: 110,
  },
  passportTexts: {
    marginLeft: 5,
  },
  passportLabel: {
    fontSize: 8,
    color: COLORS.gray,
    marginBottom: 1,
  },
  passportCountry: {
    fontSize: 10,
    color: "#000",
    fontWeight: "bold",
    maxWidth: 60
  },
});
