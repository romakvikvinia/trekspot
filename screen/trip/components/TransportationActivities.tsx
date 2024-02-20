import { useRef, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { COLORS } from "../../../styles/theme";
import {
  BusIcon,
  CirclePin,
  DotsIcon,
  LocationPin,
  XIcon,
} from "../../../utilities/SvgIcons.utility";

const TransportationActivities = ({ modalTransportationActivitiesRef }) => {
  return (
    <>
      <View style={styles.activityHeader}>
        <View style={styles.activityHeaderLeft}>
          <View style={styles.activityIcon}>
            <BusIcon color="#fff" />
          </View>
          <View style={styles.activityTitles}>
            <Text style={styles.tripName}>My trip</Text>
            <Text style={styles.activityName}>Transport</Text>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => modalTransportationActivitiesRef?.current?.close()}
          activeOpacity={0.7}
          style={styles.closeButton}
        >
          <XIcon />
        </TouchableOpacity>
      </View>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          paddingHorizontal: 15,
        }}
      >
        <View style={styles.activityListItem}>
          <View style={styles.activityListItemLeft}>
            <Text style={styles.activityListItemTitle}>To Bali</Text>
            <View style={styles.fromToElement}>
              <CirclePin />
              <Text style={styles.fromToLabel}> Tbilisi -</Text>
              <LocationPin color="#666361" />
              <Text style={styles.fromToLabel}>Bali</Text>
            </View>
            <Text style={styles.dateLabel}>Tue, 05 Feb - Tue, 05 Feb</Text>
          </View>
          <TouchableOpacity activeOpacity={0.7}>
            <DotsIcon />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  );
};
export default TransportationActivities;

const styles = StyleSheet.create({
  activityHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 15,
  },
  activityHeaderLeft: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },
  activityTitles: {
    flexWrap: "wrap",
  },
  activityIcon: {
    width: 40,
    height: 40,
    backgroundColor: "#625E5C",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
    marginRight: 10,
  },
  tripName: {
    fontSize: 14,
    color: COLORS.darkgray,
    marginBottom: 2,
  },
  activityName: {
    color: COLORS.black,
    fontSize: 18,
    fontWeight: "500",
  },
  closeButton: {
    backgroundColor: "#DBDBDB",
    width: 40,
    height: 40,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
});
