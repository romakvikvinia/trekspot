import Constants from "expo-constants";
import { Platform, StyleSheet } from "react-native";

import { COLORS } from "../../styles/theme";

export const styles = StyleSheet.create({
  showMoreButtonWrapper: {
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
  },
  aboutBox: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 1.84, 
    ...Platform.select({
      android: {
        elevation: 2,
      },
    }),
  },
  infoText: {
    color: "#000", 
    fontSize: 12, 
    lineHeight: 15, 
    marginTop: 15, 
    maxWidth: "100%", 
    opacity: 0.6, 
    textAlign: 'center'
  },
  showMoreButton: {
    alignItems: "center",
    backgroundColor: "#ddd",
    borderRadius: 30,
    flexDirection: "row",
    height: 35,
    justifyContent: "center",
    width: 150,
  },
  showMoreButtonText: {
    color: COLORS.black,
    fontSize: 12,
    fontWeight: "500",
  },
  tabContentHeader: {
    marginBottom: 15,
    marginTop: 20,
    paddingHorizontal: 15,
  },
  tabContentHeaderText: {
    color: COLORS.darkgray,
    fontSize: 16,
    fontWeight: "600",
  },
  eventDate: {
    marginVertical: 15,
    width: "100%",
  },
  eventDateText: {
    color: COLORS.black,
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
  },
  eventItem: {
    alignItems: "center",
    flexDirection: "row",
    marginBottom: 25,
    width: "100%",
  },
  eventRight: {
    marginLeft: 10,
    maxWidth: "80%",
  },
  eventTitle: {
    color: COLORS.black,
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 5,
  },
  eventLocation: {
    color: COLORS.gray,
    fontSize: 12,
    fontWeight: "500",
  },
  weatherRows: {
    backgroundColor: "#f9fafb",
    borderColor: "#eee",
    borderRadius: 8,
    borderWidth: 1,
    marginTop: 25,
    padding: 15,
    width: "100%"
  },
  weatherRow: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  weatherLeft: {
    alignItems: "center",
    flexDirection: "row",
  },
  temperatureText: {
    color: COLORS.black,
    fontSize: 16,
  },
  seasonText: {
    color: COLORS.black,
    fontSize: 16,
    fontWeight: "500",
    marginLeft: 8,
  },
  customTabLabel: {
    fontSize: 12,
    fontWeight: "600",
    marginTop: 8,
  },
  customTab: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    paddingVertical: 15,
    position: "relative",
  },
  swiperWrapper: {
    height: 300,
  },
  cityWrapper: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 10,
    paddingHorizontal: 15,
    paddingTop: 15,
  },
  citySelectBtn: {
    backgroundColor: "#fafafa",
    borderRadius: 5,
    marginRight: 15,
    marginVertical: 3,
    paddingHorizontal: 8,
    paddingVertical: 5,
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
    marginBottom: 15,
    marginTop: 25,
  },
  currencyConverter: {
    alignItems: "center",
    backgroundColor: "#fafafa",
    borderRadius: 10,
    flexDirection: "row",
    overflow: "hidden",
    padding: 20,
  },
  left: {
    alignItems: "center",
    backgroundColor: "#f1f1f1",
    borderRadius: 5,
    flexDirection: "row",
    marginRight: 15,
    overflow: "hidden",
  },
  tags: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 5,
  },
  tag: {
    backgroundColor: "#f2f2f2",
    borderRadius: 5,
    marginBottom: 5,
    marginRight: 5,
    paddingHorizontal: 8,
    paddingVertical: 6,
  },
  tagText: {
    fontSize: 13,
    fontWeight: "600",
  },
  currencySelectButton: {
    alignItems: "center",
    flexDirection: "row",
    paddingLeft: 15,
  },
  currencySelectedText: {
    color: COLORS.primary,
    fontSize: 18,
    fontWeight: "bold",
    marginRight: 5,
  },
  currencyInput: {
    backgroundColor: "#fff",
    borderColor: "#f1f1f1",
    borderWidth: 1,
    color: "#000",
    fontSize: 18,
    fontWeight: "bold",
    height: 40,
    marginLeft: 10,
    marginTop: 0,
    paddingHorizontal: 5,
    textAlign: "center",
    width: 100,
  },
  valueText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  emergencyNumbers: {
    flex: 1,
    marginTop: 25,
    paddingHorizontal: 15
  },
  emergencyButtonItem: {
    alignItems: "center",
    backgroundColor: "#fafafa",
    borderRadius: 10,
    flexDirection: "row",
    marginBottom: 15,
    paddingHorizontal: 15,
    paddingVertical: 15,
  },
  emergencyButtonItemText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 10,
  },
  thingsTodoItemHead: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  mapButton: {
    alignItems: "center",
    backgroundColor: "rgba(0,0,0, 0.3)",
    borderRadius: 5,
    flexDirection: "row",
    padding: 5,
    position: "absolute",
    right: 5,
    top: 5,
  },
  mapButtonText: {
    alignItems: "center",
    color: "#fff",
    fontSize: 12,
    justifyContent: "center",
    marginLeft: 3,
  },
  dictionaryWrapper: {
    marginTop: 25,
  },
  dictionaryCategory: {
    backgroundColor: "white",
    borderRadius: 10,
    elevation: 10,
    marginBottom: 25,
    padding: 20,
    shadowColor: "#cccdd0",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    width: "100%",
  },
  dictionaryCategoryTitle: {
    color: "#000",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 15,
  },
  dictionaryCategoryRow: {
    flexDirection: "row",
    marginVertical: 5,
  },
  dictionaryCategoryRowKey: {
    color: "#000",
    fontSize: 14,
    width: 140,
  },
  dictionaryCategoryRowValue: {
    color: "#000",
    flex: 1,
    fontSize: 14,
    fontWeight: "bold",
  },
  visaTabContent: {
    flex: 1,
    marginBottom: 25,
    paddingHorizontal: 15
  },
  thingsTodo: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 25,
    paddingHorizontal: 15,
  },
  thingsTodoItemDetails: {
    marginTop: 10,
    paddingBottom: 10,
    paddingHorizontal: 10,
  },
  imageWrapper: {
    backgroundColor: "#f2f2f2",
    borderRadius: 15,
    overflow: "hidden"
  },
  thingsTodoItemImage: {
    borderRadius: 15,
    minHeight: 130,
    overflow: "hidden",
    position: "relative",
    width: "100%",
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
    color: "#000",
    fontSize: 14,
    fontWeight: "600",
  },
  thingsTodoItemiInprice: {
    color: "#000",
    fontSize: 12,
  },
  thingsTodoItem: {
    marginBottom: 25,
    width: "96%",
    borderRadius: 10,
    // backgroundColor: "#f2f2f2",
    minHeight: 200,
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.1,
    // shadowRadius: 1.84, 
    // ...Platform.select({
    //   android: {
    //     elevation: 5,
    //   },
    // }),
  },
  forYouRow: {
    marginVertical: 0,
  },
  forYouRowTitle: {
    color: COLORS.black,
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    paddingHorizontal: 0,
  },
  forYouRowTitleSub: {
    color: COLORS.black,
    fontSize: 16,
    fontWeight: "600",
    maxWidth:"90%",
    paddingHorizontal: 15
  },
  thingsTodoItemiIntypeText: {
    color: COLORS.darkgray,
    fontSize: 12,
    marginBottom: 5,
    marginRight: 5,
  },
  drivingSide: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
    paddingHorizontal: 15
  },
  drivingSideText: {
    color: "#000",
    fontSize: 20,
    fontWeight: "bold",
  },
  transports: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 5,
    paddingHorizontal: 15
  },
  transportItem: {
    alignItems: "center",
    backgroundColor: "#f2f2f2",
    borderRadius: 5,
    flexDirection: "row",
    marginVertical: 5,
    overflow: "hidden",
    width: "48%"
  },
  transportItemIcon: {
    alignItems: "center",
    backgroundColor: "#eee",
    height: 50, 
    padding: 0,
    width: 50
  },
  transportText: {
    fontSize: 14,
    fontWeight: "bold",
    maxWidth: "70%",
    paddingHorizontal: 10
  },
  textContentWrapper: {
    alignItems: "center",
    backgroundColor: "#fafafa",
    borderRadius: 10,
    flexDirection: "row",
    marginTop: 25,
    padding: 15,
  },
  headingText: {
    color: "#000",
    fontSize: 14,
    fontWeight: "500",
    lineHeight: 18,
    marginLeft: 10,
    maxWidth: "80%",
  },
  secondaryTitle: {
    color: COLORS.darkgray,
    fontSize: 16,
    fontWeight: "600",
    marginTop: 25,
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
    backgroundColor: "#f9fafb",
    borderColor: "#eee",
    borderRadius: 10,
    borderWidth: 1,
    marginTop: 20,
    padding: 15,
  },
  visaTypeCardTitle: {
    color: "#000",
    fontSize: 18,
    fontWeight: "bold",
  },
  staysNtype: {
    marginTop: 10,
  },
  staysNtypeRow: {
    flexDirection: "row",
    marginVertical: 3,
  },
  staysNtypeRowKey: {
    color: COLORS.darkgray,
    fontSize: 12,
    fontWeight: "bold",
    width: 100,
  },
  staysNtypeRowValue: {
    color: "#000",
    fontSize: 12,
    fontWeight: "bold",
    textTransform: "capitalize"
  },
  box: {
    borderTopEndRadius: 0,
    borderTopLeftRadius: 0,
    height: 300,
    overflow: "hidden",
 
  },
  keyValue: {
    display: "flex",
    marginBottom: 30,
  },
  key: {
    color: COLORS.darkgray,
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 10,
    marginRight: 5,
  },
  value: {
    color: COLORS.black,
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 5,
  },
  multiValues: {
    flexDirection: "row",
    flexWrap: "wrap"
  },
  visaTabHeader: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    paddingHorizontal: 15
  },
  travelToText: {
    fontSize: 16,
    fontWeight: "bold",
    maxWidth: "70%",
    paddingRight: 10
  },
  backButton: {
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 100,
    display: "flex",
    height: 40,
    justifyContent: "center",
    width: 40,
    ...COLORS.shadow,
    left: 15,
    position: "absolute",
    top: Platform.OS === "android" ? Constants?.statusBarHeight + 5 : 55,
    zIndex: 1,
  },
  generalRow: {
    borderBottomWidth: 5,
    borderColor: "#eeeeee",
    marginTop: 20,
    paddingBottom: 20,
    paddingHorizontal: 15,
    width: "100%",
  },
  overviewText: {
    color: COLORS.black,
    fontSize: 14,
    fontWeight: "500",
    lineHeight: 20,
  },

  gradientWrapper: {
    flex: 1,
    height: 400,
    left: 0,
    position: "absolute",
    top: 0,
    width: "100%",
    zIndex: 2,
  },
  tabWrapper: {
    marginBottom: 20,
    paddingHorizontal: 15,
  },
  addToBucketButton: {
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 50,
    height: 40,
    justifyContent: "center",
    position: "absolute",
    right: 15,
    top: Platform.OS === "android" ? Constants?.statusBarHeight + 10 : 55,
    width: 40,
    zIndex: 3,
  },
  otherInfo: {
    bottom: 5,
    left: 5,
    position: "absolute",
  },
  labelItem: {
    alignItems: "center",
    flexDirection: "row",
    padding: 10,
    paddingVertical: 0,
  },
  labelItemText: {
    color: "#fff",
    fontSize: 34,
    fontWeight: "bold",
    marginLeft: 0,
  },
  ratingLabel: {
    alignItems: "center",
    borderRadius: 30,
    flexDirection: "row",
    paddingBottom: 10,
    paddingHorizontal: 10,
    paddingVertical: 3,
  },
  ratingText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "500",
    marginLeft: 3,
    opacity: 0.9
  },
  passportBox: {
    alignItems: "center",
    backgroundColor: "#fff",
    borderColor: "#f2f2f2",
    borderRadius: 6,
    flexDirection: "row",
    marginLeft: 0,
    paddingHorizontal: 8,
    paddingVertical: 7,
    position: "relative",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 0.84,
    width: 110,
    ...Platform.select({
      android: {
        elevation: 1,
      },
    }),
  },
  passportTexts: {
    marginLeft: 5,
  },
  passportLabel: {
    color: COLORS.gray,
    fontSize: 8,
    marginBottom: 1,
  },
  passportCountry: {
    color: "#000",
    fontSize: 10,
    fontWeight: "bold",
    maxWidth: 60
  },
  vertImages: {
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  tabsWrapper: {
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    marginTop: 15,
  },
  tabItemLabel: {
    color: COLORS.darkgray,
    fontSize: 14,
    fontWeight: "600",
  },
  tabItem: {
    alignItems: "center",
    borderBottomWidth: 2,
    borderColor: "transparent",
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 15,
    position: "relative"
  },
  activeIndicator: {
    backgroundColor: COLORS.primary,
    borderRadius: 2,
    bottom: -2,
    height: 2,
    position: "absolute",
    width: "100%",
    zIndex: 1,
  },
  cityDetailsLeft: {
    width: "60%"
  },
  cityDetailsRight: {
    alignItems: "flex-end",
    width: "40%"
  },

});
