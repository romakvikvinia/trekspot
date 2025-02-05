/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigation } from "@react-navigation/native";
import { Platform, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { COLORS } from "../../../styles/theme";
import { BusIcon, CruiseIcon, ShipIcon, TrainIcon } from "../../../utilities/SvgIcons.utility";
import { tripDetailStyles } from "../_tripDetailStyles";
import { ActivityCardActions } from "./ActivityCardActions";

interface TripActivityTransportCardProps {
  activityAmount: number;
  index: number;
  checkedIn: boolean;
  item: any;
  handleChangeActivityVisited: any;
  onQuestionModalOpen: any;
  type: string
}

export const TripActivityTransportCard: React.FC<
  TripActivityTransportCardProps
> = ({
  activityAmount,
  index,
  checkedIn,
  item,
  handleChangeActivityVisited,
  onQuestionModalOpen,
  type = "bus"
}) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => navigation.navigate("TransportRouteScreen", {
        isPreview: true,
        type
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
          <Text style={styles.topLeftText} numberOfLines={1}>
            Flixbus 
            {/* Or name of carrier */}
          </Text>
          <Text style={styles.confirmText} numberOfLines={1}>
            Seat: <Text style={{ fontWeight: "600" }}>15B</Text> 
          </Text>
        </View>
        <View style={styles.cardBody}>
          <View style={styles.columnItem}>
            <Text style={styles.dateText}>Mon 14 Dec</Text>
            <Text style={styles.timeText}>08:40</Text>
            <Text style={styles.cityText} numberOfLines={1}>London</Text>
          </View>
          <View style={[styles.columnItem, 
              {
                width:"40%",
                justifyContent: "center"
              }
            ]}>
            <Text style={styles.durationText}>{" "}</Text>
            <View style={styles.horizontalLine}>
              <View style={styles.startCircle}></View>
              <View style={styles.transport}>
                {
                  type === "train" &&  <TrainIcon size={18} color="" />
                }
                {
                   type === "bus" &&  <BusIcon size={16} color="" />
                }
                {
                   type === "cruise" &&  <CruiseIcon size={24} color="#000" />
                }
                {
                   type === "ferry" &&  <ShipIcon size={24} color="#000" />
                }
              </View>
              <View style={styles.bottomCircle}></View>
            </View>
            <Text style={styles.durationText}>5h 00m</Text>
          </View>
          <View style={[styles.columnItem,{
            justifyContent: "flex-end",
            alignItems: "flex-end"
          }]}>
            <Text style={styles.dateText}>Mon 19 Dec</Text>
            <Text style={styles.timeText}>09:00</Text>
            <Text style={styles.cityText} numberOfLines={1}>Paris</Text>
          </View>
        </View>
      </View>

      <ActivityCardActions
        item={item}
        handleChangeActivityVisited={handleChangeActivityVisited}
        checkedIn={checkedIn}
        index={index}
        onQuestionModalOpen={onQuestionModalOpen}
        type="Bus"
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
  bottomCircle: {
    backgroundColor: "#000",
    borderRadius: 50,
    height: 6,
    width: 6,
  },
  cardBody: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15
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
  cityText:{
    color: COLORS.black,
    fontSize: 14,
    opacity: 0.8,
  },
  columnItem: {
    width: "30%"
  },
  confirmText: {
    textAlign: "right",
    width: "40%"
  },
  dateText: {
    color: COLORS.black,
    fontSize: 12,
    fontWeight: "500",
    opacity: 0.8
  },
  durationText: {
    color: COLORS.gray,
    fontSize: 12,
    fontWeight: "600",
    marginTop: 12,
    textAlign: "center"
  },
  horizontalLine: {
    alignItems: "center",
    backgroundColor: "#e0e0e0",
    flexDirection: "row",
    height: 2,
    justifyContent: "space-between"
  }, 
  startCircle: {
    backgroundColor: "#000",
    borderRadius: 50,
    height: 6,
    width: 6,
  },
  timeText: {
    color: COLORS.black,
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 5,
  },
  topLeftText: {
    fontSize: 14,
    fontWeight: "600",
  },
  transport: {
    backgroundColor: "#fff",
    paddingHorizontal: 5,
  },
});
