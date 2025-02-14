/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigation } from "@react-navigation/native";
import { Image } from "expo-image";
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { COLORS } from "../../../styles/theme";
import {
  ClockLinearIcon,
  PlaneIcon,
  SeatIcon,
} from "../../../utilities/SvgIcons.utility";
import { tripDetailStyles } from "../_tripDetailStyles";
import { ActivityCardActions } from "./ActivityCardActions";
import { NoteDescriptionGallery } from "./NoteDescriptionGallery";

interface TripActivityFlightCardProps {
  activityAmount: number;
  checkedIn: boolean;
  item: any;
  index: number;
  onQuestionModalOpen: any;
  handleChangeActivityVisited: any;
}

export const TripActivityFlightCard: React.FC<TripActivityFlightCardProps> = ({
  activityAmount,
  checkedIn,
  item,
  index,
  onQuestionModalOpen,
  handleChangeActivityVisited,
}) => {

  const navigation = useNavigation();

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => navigation.navigate("FlightDetailsScreen", {
        isPreview: true
      })}
      style={[
        styles.activityItem,
        {
          marginLeft: activityAmount > 1 ? 20 : 15,
          zIndex: index === 0 ? 5 : 1,
          backgroundColor: checkedIn ? "#fffcf5" : "#fff",
          height: "auto",
        },
      ]}
    >
      {activityAmount > 1 && (
        <View style={styles.activityIcon}>
          <View style={styles.circle}></View>
        </View>
      )}

      <View
        style={[
          checkedIn ? tripDetailStyles.checkedIn : null,
          styles.activityContent,
        ]}
      >
        <View style={styles.cardHeader}>
          <Text style={styles.fromToText}>Tbilisi → Dubai</Text>
          <View style={styles.rightView}>
            <SeatIcon size={15} color={COLORS.gray} />
            <Text style={styles.rightViewText}>15C</Text>
          </View>
        </View>

        <View style={styles.cardBody}>
          <View style={styles.flightDatesColumn}>
            <View style={styles.flightDates}>
              <Text style={styles.flightDatesClockText}>17:20</Text>
              <Text style={styles.flightDatesDateText}>Sat 20 Mar</Text>
            </View>
            <Text style={styles.flightDurationText}>3h 05m</Text>
            <View style={styles.flightDates}>
              <Text style={styles.flightDatesClockText}>20:25</Text>
              <Text style={styles.flightDatesDateText}>Sat 20 Mar</Text>
            </View>
          </View>
          <View style={styles.verticalLine}>
            <View style={styles.topCircle}></View>
            <View style={styles.plane}>
              <PlaneIcon />
            </View>
            <View style={styles.bottomCircle}></View>
          </View>
          <View style={styles.airportsData}>
            <View style={styles.fromTo}>
              <Text style={styles.airportCityText}>Tbilisi · TBS</Text>
              <Text style={styles.airportText}>Tbilisi International</Text>
            </View>
            <View style={styles.airline}>
              <Image
                contentFit="cover"
                transition={100}
                source={{
                  uri: "https://images.kiwi.com/airlines/64/G9.png",
                }}
                style={styles.airlineLogo}
              />
              <Text style={styles.airlineName}>Air Arabia</Text>
            </View>
            <View style={styles.fromTo}>
              <Text style={styles.airportCityText}>Dubai · SHJ</Text>
              <Text style={styles.airportText}>Sharjah International</Text>
            </View>
          </View>
        </View>

        <View style={styles.layoverRow}>
          <ClockLinearIcon size={15} color={COLORS.gray} />
          <Text style={styles.layoverRowText}>7h 00m layover</Text>
        </View>
      </View>

      <NoteDescriptionGallery
        notes="This is test note"
        // description="This is description"
      />
  
      <ActivityCardActions
        item={item}
        handleChangeActivityVisited={handleChangeActivityVisited}
        checkedIn={checkedIn}
        index={index}
        onQuestionModalOpen={onQuestionModalOpen}
        type="flight"
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  activityContent: {
    flexDirection: "column",
    flex: 1,
    height: "100%",
    paddingHorizontal: 15,
    paddingTop: 15,
    position: "relative",
    width: "100%",
  },
  activityIcon: {
    borderColor: "#f7f7f7",
    borderRadius: 100,
    borderWidth: 8,
    left: -40,
    marginTop: -12,
    position: "absolute",
    top: "50%",
    zIndex: 2
  },
  activityItem: {
    borderRadius: 10,
    flexDirection: "column",
    marginBottom: 25,
    marginRight: 15,
    padding: 0,
    paddingBottom: 0,
    paddingTop: 0,
    position: "relative",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 0.84,
    ...Platform.select({
      android: {
        elevation: 2,
      },
    }),
    zIndex: 1,
  },
  airline: {
    alignItems: "center",
    flexDirection: "row",
    marginVertical: 20,
    position: "relative",
  },
  airlineLogo: {
    borderRadius: 100,
    height: 20,
    width: 20,
  },
  airlineName: {
    color: COLORS.black,
    fontSize: 14,
    fontWeight: "600",
    marginLeft: 5,
  },
  airportCityText: {
    color: COLORS.black,
    fontSize: 14,
    fontWeight: "600",
  },
  airportText: {
    color: COLORS.black,
    fontSize: 14,
    fontWeight: "500",
    marginTop: 5,
    opacity: 0.5
  },
  airportsData: {
    marginLeft: 20,
  },
  bottomCircle: {
    backgroundColor: "#000",
    borderRadius: 50,
    height: 6,
    width: 6,
  },
  cardBody: {
    flex: 1,
    flexDirection: "row",
    marginTop: 15,
  },
  cardHeader: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  circle: {
    backgroundColor: "#ccc",
    borderRadius: 100,
    height: 10,
    minWidth: 10,
  },
  
  flightDates: {},
  flightDatesClockText: {
    color: COLORS.black,
    fontSize: 14,
    fontWeight: "600",
  },
  flightDatesColumn: {
    marginRight: 20,
  },
  flightDatesDateText: {
    color: COLORS.black,
    fontSize: 14,
    fontWeight: "500",
    marginTop: 5,
    opacity: 0.5,
  },
  flightDurationText: {
    color: COLORS.black,
    fontSize: 14,
    fontWeight: "600",
    marginVertical: 20,
  },
  fromTo: {},
  fromToText: {
    color: COLORS.black,
    fontSize: 14,
    fontWeight: "bold",
  },
  layoverRow: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  layoverRowText: {
    color: COLORS.gray,
    fontSize: 14,
    fontWeight: "600",
    marginLeft: 5,
  },
  
  plane: {
    backgroundColor: "#fff",
    paddingVertical: 5,
  },
  rightView: {
    alignItems: "center",
    flexDirection: "row",
  },
  rightViewText: {
    color: COLORS.black,
    fontSize: 14,
    fontWeight: "600",
    lineHeight: 16,
    marginLeft: 2,
  },
  topCircle: {
    backgroundColor: "#000",
    borderRadius: 50,
    height: 6,
    marginTop: -1,
    width: 6,
  },
  verticalLine: {
    alignItems: "center",
    backgroundColor: "#e0e0e0",
    height: 105,
    justifyContent: "space-between",
    marginTop: 18,
    position: "relative",
    width: 2,
  },
});
