/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { COLORS } from "../../../styles/theme";
import {
    CarBoldIcon,
} from "../../../utilities/SvgIcons.utility";
import { tripDetailStyles } from "../_tripDetailStyles";
import { ActivityCardActions } from "./ActivityCardActions";

interface TripActivityCarRentalCardProps {
  activityAmount: number;
  checkedIn: boolean;
  item: any;
  index: number;
  onQuestionModalOpen: any;
  handleChangeActivityVisited: any;
}

export const TripActivityCarRentalCard: React.FC<TripActivityCarRentalCardProps> = ({
  activityAmount,
  checkedIn,
  item,
  index,
  onQuestionModalOpen,
  handleChangeActivityVisited,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
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
          <Text style={styles.title}>Car rental</Text>
        </View>

        <View style={styles.cardBody}>
          <View style={styles.datesColumn}>
            <View style={styles.dates}>
              <Text style={styles.datesClockText}>17:20</Text>
              <Text style={styles.datesDateText}>Sat 1 Mar</Text>
            </View>
            <View style={[styles.dates, {marginTop: 60}]}>
              <Text style={styles.datesClockText}>20:25</Text>
              <Text style={styles.datesDateText}>Sat 1 Mar</Text>
            </View>
          </View>
          <View style={styles.verticalLine}>
            <View style={styles.topCircle}></View>
            <View style={styles.transporticon}>
              <CarBoldIcon size={20} color="" />
            </View>
            <View style={styles.bottomCircle}></View>
          </View>
          <View style={styles.addressColumn}>
            <View style={styles.fromTo}>
              <Text style={styles.pickUpDropOffText}>Pick up</Text>
              <Text style={styles.addressText}>Tbilisi International</Text>
            </View>
            <View style={[styles.fromTo, {marginTop: 60}]}>
              <Text style={styles.pickUpDropOffText}>Drop off</Text>
              <Text style={styles.addressText}>Berlin Brandenburg Airport</Text>
            </View>
          </View>
        </View> 
      </View>

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
    position: "absolute",
    top: 55,
    zIndex: 2,
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
  addressColumn: {
    marginLeft: 20,
  },
  addressText: {
    color: COLORS.black,
    fontSize: 14,
    marginTop: 5,
    opacity: 0.8,
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
  dates: {},
  datesClockText: {
    color: COLORS.black,
    fontSize: 14,
    fontWeight: "600",
  },
  datesColumn: {
    marginRight: 20,
  },
  datesDateText: {
    color: COLORS.black,
    fontSize: 14,
    marginTop: 5,
    opacity: 0.8,
  },
  pickUpDropOffText: {
    color: COLORS.black,
    fontSize: 14,
    fontWeight: "600",
  },
  title: {
    color: COLORS.black,
    fontSize: 14,
    fontWeight: "bold",
  },
  topCircle: {
    backgroundColor: "#000",
    borderRadius: 50,
    height: 6,
    marginTop: -1,
    width: 6,
  },
  transporticon: {
    backgroundColor: "#fff",
    paddingVertical: 5,
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
