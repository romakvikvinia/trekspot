import { StyleSheet, Text, View } from "react-native";
import {
  CalendarFilledIcon,
  LocationPin,
} from "../../../utilities/SvgIcons.utility";
import { format } from "date-fns";
import { COLORS } from "../../../styles/theme";

type HeaderTextContentProps = {
  data: any;
};

export const HeaderTextContent = ({data} : HeaderTextContentProps) => {
  return (
    <View style={styles.textContent}>
      <Text style={styles.tripTitle}>{data?.name}</Text>
      <View style={styles.contentRowItem}>
        <LocationPin width="12" color={COLORS.white} />
        <Text style={styles.tripDestination}>
          {data?.cities[0]?.city}
        </Text>
      </View>
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
  textContent: {
    paddingHorizontal: 20,
  },
  tripTitle: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#fff",
  },
  tripDestination: {
    color: "#fff",
    marginTop: 0,
    textTransform: "capitalize",
    fontWeight: "bold",
    fontSize: 14,
    position: "relative",
    top: 1,
    marginLeft: 8
  },
  contentRowItem: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    opacity: 0.9
  } 
});