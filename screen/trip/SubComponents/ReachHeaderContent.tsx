import { LinearGradient } from "expo-linear-gradient";
import {
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import {
  BackIcon,
  DotsVerticlIcon,
  MapWithLocationIcon,
} from "../../../utilities/SvgIcons.utility";
import { TripHelpers } from "./TripHelpers";
import { useNavigation } from "@react-navigation/native";
import { COLORS } from "../../../styles/theme";
import { HeaderTextContent } from "./HeaderTextcontent";

type ReachHeaderContentProps = {
  data: any;
  iso2: string;
  tabData: any;
  onQuestion2ModalOpen: () => void;
  activeDay: number;
};

export const ReachHeaderContent = ({
  data,
  iso2,
  tabData,
  onQuestion2ModalOpen,
  activeDay,
}: ReachHeaderContentProps) => {
  const navigation = useNavigation();

  return (
    <>
      <View style={styles.reachContainer}>
        <ImageBackground
          source={{
            uri: data?.cities[0]?.image?.url,
          }}
          style={styles.reachImage}
        >
          <LinearGradient
            colors={["rgba(0,0,0,0.3)", "rgba(0,0,0,1)"]}
            style={styles.reachGradient}
          >
            <HeaderTextContent data={data} />
            <TripHelpers data={data} iso2={iso2} reachView />
          </LinearGradient>
        </ImageBackground>
      </View>

      <TouchableOpacity
        onPress={() => navigation.goBack()}
        activeOpacity={0.7}
        style={styles.backButton}
      >
        <BackIcon />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("TripMapViewScreen", {
            tabData,
            city: data?.cities[0],
            activeDay: activeDay,
          })
        }
        activeOpacity={0.7}
        style={styles.mapButton}
      >
        <MapWithLocationIcon width={15} color={COLORS.black} />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => onQuestion2ModalOpen()}
        activeOpacity={0.7}
        style={[
          styles.mapButton,
          {
            right: 20,
          },
        ]}
      >
        <DotsVerticlIcon size="15" color="#000" />
      </TouchableOpacity>

      {/* <MapHeader
            trip={data}
            topSights={topSights}
            key={data?.cities[0]?.city}
            /> */}
    </>
  );
};

const styles = StyleSheet.create({
  reachContainer: {
    position: "relative",
    overflow: "hidden",
  },
  textContent: {
    paddingHorizontal: 20,
  },
  reachGradient: {
    flex: 1,
    paddingTop: 110,
  },
  destTitle: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#fff",
  },
  reachImage: {
    height: 315,
    width: "100%",
  },
  uploadButton: {
    backgroundColor: COLORS.primaryDark,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 50,
    paddingHorizontal: 15,
    marginTop: 25,
    height: 50,
  },
  modalViewWrapper: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  modalViewCenter: {
    backgroundColor: "#F2F2F7",
    borderRadius: 15,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    width: "100%",
    height: "100%",
  },
  uploadButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
  },
  documentItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 60,
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
  },
  documentItemLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  documentItemTitle: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: "500",
  },
  documentItemOptions: {
    padding: 8,
    marginRight: -8,
  },
  rowItemHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    paddingTop: 15,
    paddingBottom: 25,
  },
  checkedIn: {
    opacity: 0.7,
  },
  sightRightActionsButtonText: {
    fontSize: 12,
    marginLeft: 5,
    fontWeight: "500",
    color: COLORS.gray,
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
    paddingHorizontal: 15,
    marginTop: 45,
  },
  noResultWrapperText: {
    fontSize: 16,
    color: COLORS.darkgray,
    marginTop: 25,
    textAlign: "center",
    lineHeight: 20,
    maxWidth: "80%",
  },
  invitedList: {
    marginTop: 15,
    // flex: 1,
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
  closeButton: {
    backgroundColor: "#DBDBDB",
    width: 30,
    height: 30,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  invitedUserName: {
    fontSize: 14,
    color: COLORS.black,
    fontWeight: "600",
  },
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
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 0,
    backgroundColor: "rgba(0, 0, 0, 0.2)",
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
  h2: {
    fontSize: 22,
    color: COLORS.black,
    fontWeight: "bold",
  },
  addActivityButton: {
    width: 50,
    height: 50,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: 25,
    right: 15,
    backgroundColor: COLORS.primary,
    zIndex: 2,
    borderRadius: 50,
    ...COLORS.shadow,
  },
  mapHeaderContainer: {
    position: "relative",
  },
  sightDetails: {
    width: "100%",
    marginTop: 15,
  },
  sightRightActionsButton: {
    width: 35,
    height: 35,
    backgroundColor: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
    marginLeft: 8,
  },
  sightRightActions: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkinButtonText: {
    fontSize: 12,
    marginLeft: 5,
    fontWeight: "500",
  },
  checkinButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 50,
    paddingHorizontal: 15,
    paddingVertical: 8,
  },
  sightTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: COLORS.black,
  },
  ratingLabel: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
  },
  ratingText: {
    fontWeight: "400",
    color: COLORS.darkgray,
    fontSize: 12,
    marginRight: 2,
  },
  sightType: {
    fontWeight: "400",
    color: COLORS.darkgray,
    fontSize: 12,
    marginRight: 5,
  },
  sightRight: {
    marginLeft: 15,
  },
  sightItem: {
    backgroundColor: "#fff",
    minHeight: 100,
    flex: 1,
    borderRadius: 10,
    marginLeft: 18,
    padding: 15,
    flexDirection: "column",
    position: "relative",
  },
  pinIcon: {
    position: "absolute",
    left: -31,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  sightBottomActions: {
    marginTop: 5,
    marginBottom: 45,
    width: "95%",
    marginLeft: "5%",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
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
  },
  invitationBox: {
    position: "relative",
    flexDirection: "row",
    maxWidth: 120,
  },
  bottomRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  otherUsersText: {
    fontWeight: "600",
    color: "#fff",
    fontSize: 10,
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
  tripName: {
    fontSize: 22,
    fontWeight: "bold",
    color: COLORS.black,
  },
  bottomActions: {
    flexDirection: "row",
    alignItems: "flex-end",
  },
  rightSide: {
    flexDirection: "column",
    alignItems: "flex-end",
    justifyContent: "space-between",
  },
  tripType: {
    fontSize: 14,
    fontWeight: "500",
    color: COLORS.black,
  },
  leftSide: {},
  tripDestination: {
    fontSize: 14,
    fontWeight: "500",
    color: COLORS.darkgray,
    marginTop: 0,
    marginLeft: 5,
    textTransform: "capitalize",
  },
  inviteOne: {
    width: 25,
    height: 25,
    borderRadius: 50,
  },
  editButton: {
    borderRadius: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    paddingVertical: 8,
    paddingHorizontal: 10,
    marginTop: -8,
  },
  editButtonText: {
    fontSize: 12,
    color: COLORS.black,
    marginLeft: 5,
  },
  customTab: {
    flex: 1,
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 0,
  },
  tripDetailsHeader: {
    backgroundColor: "#fff",
    paddingHorizontal: 0,
    paddingTop: 20,
    marginTop: -25,
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  customTabLabel: {
    fontWeight: "600",
    marginTop: 0,
    fontSize: 14,
  },
  backButton: {
    position: "absolute",
    top: 55,
    left: 20,
    width: 35,
    height: 35,
    backgroundColor: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
  },
  mapButton: {
    position: "absolute",
    top: 55,
    right: 70,
    width: 35,
    height: 35,
    backgroundColor: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
  },
});
