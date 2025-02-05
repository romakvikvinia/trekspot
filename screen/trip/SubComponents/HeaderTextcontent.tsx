import { format } from "date-fns";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { COLORS } from "../../../styles/theme";
import {
  CalendarFilledIcon,
  LocationPin,
} from "../../../utilities/SvgIcons.utility";

type HeaderTextContentProps = {
  data: any;
};

export const HeaderTextContent = ({data} : HeaderTextContentProps) => {
  const [show, setShowAll] = useState(false);

  return (
    <View style={styles.textContent}>
      <Text style={styles.tripTitle}>{data?.name}</Text>
      <Pressable onPress={() => setShowAll(!show)} style={styles.contentRowItem}>
        <LocationPin width="12" color={COLORS.white} />
        <Text style={styles.tripDestination} numberOfLines={1}>
          {data?.cities[0]?.city}, Berlin, Rome
        </Text>
        {/* აქ თუ 3-ზე მეტი იქნება ქალაქი ვანახოთ ქვედა კომპონენტი
        და თუ დააწვება ვანახოთ ყველა */}
        <View style={styles.more}>
            <Text style={styles.moreText}>3+</Text>
        </View>
      </Pressable>
      <View style={styles.contentRowItem}>
        <CalendarFilledIcon size={12} color={COLORS.white} />
        <Text style={styles.tripDestination}>
          {format(data?.startAt, "dd MMM")} - {format(data?.endAt, "dd MMM")}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  contentRowItem: {
    alignItems: "center",
    flexDirection: "row",
    marginTop: 10,
    opacity: 0.9,
  },
  more: {
    marginLeft: 5,
    position: "relative",
    top: 1
  },
  moreText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
  textContent: {
    paddingHorizontal: 20,
  },
  tripDestination: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
    marginLeft: 8,
    marginTop: 0,
    maxWidth: "90%",
    position: "relative",
    textTransform: "capitalize",
    top: 1
  },
  tripTitle: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold",
  } 
});