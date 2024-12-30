/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { COLORS } from "../../../styles/theme";
import { MeetingIcon } from "../../../utilities/SvgIcons.utility";
import { tripDetailStyles } from "../_tripDetailStyles";
import { ActivityCardActions } from "./ActivityCardActions";

interface TripActivityMeetingCardProps {
  activityAmount: number;
  checkedIn: boolean;
  item: any;
  index: number;
  onQuestionModalOpen: any;
  handleChangeActivityVisited: any;
}

export const TripActivityMeetingCard: React.FC<TripActivityMeetingCardProps> = ({
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
        <View style={styles.cardBody}>
          <View style={styles.icon}>
            <MeetingIcon size={32} color="#fff" />
          </View>
          <View style={styles.contentSide}>
            <Text numberOfLines={2} style={tripDetailStyles.sightTitle}>
              Zoom meeting
            </Text>

            <View style={styles.checkin}>
              <Text style={styles.checkinText}>
                Start: <Text style={styles.time}>15:00</Text>
              </Text> 
              <Text style={styles.checkinText}>
                End: <Text style={styles.time}>18:00</Text>
              </Text> 
            </View>
          </View>
        </View>
      </View>

      <Text style={styles.note}>
        This is quite large text from me, which is like a note. So I mention that this is big thing.
      </Text>

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
    paddingTop: 0,
    position: "relative",
    width: "100%",
  },
  activityIcon: {
    borderColor: "#f7f7f7",
    borderRadius: 100,
    borderWidth: 8,
    left: -40,
    position: "absolute",
    top: "50%",
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
  cardBody: {
    flex: 1,
    flexDirection: "row",
    marginTop: 15,
  },
  checkin: {
    marginTop: 5,
  },
  checkinText: {
    color: COLORS.gray,
    fontSize: 12,
    fontWeight: "500",
    marginTop: 5,
  },
  circle: {
    backgroundColor: "#ccc",
    borderRadius: 100,
    height: 10,
    minWidth: 10,
  },
  contentSide: {
    flexDirection: "column",
    flex: 1,
    justifyContent: "center",
    paddingLeft: 15,
    paddingRight: 15,
  },
  icon: {
    alignItems: "center",
    backgroundColor: "#1e69f3",
    borderRadius: 10,
    height: 70,
    justifyContent: "center",
    width: 70,
  },
  note: {
    color: COLORS.black,
    fontSize: 14,
    padding: 15,
    paddingBottom: 0
  },
  time: {
    color: COLORS.black,
    fontSize: 12,
    fontWeight: "bold",
  },
});
