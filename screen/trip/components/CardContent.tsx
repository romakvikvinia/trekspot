import { useMemo } from "react";
import { StyleSheet, Text, View } from "react-native";

import { COLORS } from "../../../styles/theme";
import { tripDetailStyles } from "../_tripDetailStyles";
import { Rating } from "./Rating";

type CardContentProps = {
    item: any;
}

export const CardContent = ({ item }: CardContentProps) => {
 const workingHours = [
    {
        "day": "Monday",
        "hours": "9:30 AM – 6:00 PM"
    },
    {
        "day": "Tuesday",
        "hours": "9:30 AM – 6:00 PM"
    },
    {
        "day": "Wednesday",
        "hours": "9:30 AM – 6:00 PM"
    },
    {
        "day": "Thursday",
        "hours": "9:30 AM – 6:00 PM"
    },
    {
        "day": "Friday",
        "hours": "9:30 AM – 6:00 PM"
    },
    {
        "day": "Saturday",
        "hours": "9:30 AM – 6:00 PM"
    },
    {
        "day": "Sunday",
        "hours": "9:30 AM – 6:00 PM"
    }
]

const getStatus = useMemo(() => {
  const currentHour = new Date().getHours();
  const currentMinute = new Date().getMinutes();

  const isOpen = workingHours.some(day => { 
    const [openHour, openMinute] = day.hours.split(':').map(Number);
    const [closeHour, closeMinute] = day.hours.split(':').map(Number);

    if (openHour === closeHour) {
      return currentHour >= openHour && currentMinute >= openMinute;
    }

    return currentHour >= openHour && currentMinute >= openMinute;
  })

  return isOpen;
}, [item]);
  console.log(item)
  return (
    <View style={[tripDetailStyles.sightDetails, styles.textContent]}>
      <Text numberOfLines={1} style={tripDetailStyles.sightTitle}>
        {item?.title}
      </Text> 
      <View style={styles.rowItem}>
        <Rating data={item} />
        <Text style={[tripDetailStyles.sightType]}>⋅ {item?.category}</Text> 
      </View>
      <View style={styles.rowItem}>
        <View style={styles.workingHours}>
          <Text style={styles.workingHoursStatus}>{getStatus ? "Open" : "Closed"}</Text>
          <Text style={styles.workingHoursText}>⋅ Opens at 9AM</Text>
        </View>
      </View>
      <View style={styles.rowItem}>
        <Text style={styles.address}>{item?.address}{!item?.address && "Tower Bridge Rd, London SE1 2UP"}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  address: {
    color: COLORS.darkgray,
    fontSize: 13,
    fontWeight: "400",
    marginTop: 0,
  },
  rowItem: {
    alignItems: "center",
    flexDirection: "row",
    marginTop: 5,
  },
  textContent: {
    flexDirection: "column",
    flex: 1,
    justifyContent: "center",
    marginTop: 0,
    paddingLeft: 15,
  },
  workingHours: {
    alignItems: "center",
    flexDirection: "row",
    gap: 5,
  },
  workingHoursStatus: {
    color: COLORS.red,
    fontSize: 13,
    fontWeight: "400",
  },
  workingHoursText: {
    color: COLORS.darkgray,
    fontSize: 13,
    fontWeight: "400",
  },
  
});
