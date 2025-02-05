import { useNavigation } from "@react-navigation/native";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { COLORS } from "../../../styles/theme";
import {
  ActivityIcon,
  CarRentalIcon,
  CruiseIcon,
  EventIcon,
  FlightIcon,
  LodgeIcon,
  MeetingIcon,
  RestaurantIcon,
  RouteIcon,
  ShipIcon,
  TourFlagIcon,
  TrainIcon,
  TransportIcon,
} from "../../../utilities/SvgIcons.utility";

const activityButtons = [
  { id: 1, label: "Restaurants", color: "#f78e45", Icon: RestaurantIcon },
  { id: 2, label: "Car rental", color: "#1da1fd", Icon: CarRentalIcon },
  { id: 3, label: "Train", color: "#ae8155", Icon: TrainIcon },
  { id: 4, label: "Ferry", color: "#5674d0", Icon: ShipIcon },
  { id: 5, label: "Cruise", color: "#13acfb", Icon: CruiseIcon },
  { id: 6, label: "Route", color: "#29a265", Icon: RouteIcon },
  { id: 7, label: "Events", color: "#e46cd5", Icon: EventIcon },
  { id: 8, label: "Activity", color: "#959595", Icon: ActivityIcon },
  {
    id: 9,
    label: "Meeting",
    color: "#1e69f3",
    Icon: MeetingIcon,
    borderBottom: 0,
  },
];

export const AddCustomActivity = () => {
  const navigation = useNavigation();

  const handleNavigate = (label: string) => {
    switch (label) {
      case "Restaurants":
        return navigation.navigate("Dine", {
          isPreview: false,
        });
      case "Car rental":
        return navigation.navigate("Rental", {
          isPreview: false,
        });
      case "Train":
        return navigation.navigate("TransportRoute", {
          type: "train",
          isPreview: false,
        });
      case "Ferry":
        return navigation.navigate("TransportRoute", {
          type: "Ferry",
          isPreview: false,
        });
      case "Cruise":
          return navigation.navigate("TransportRoute", {
            type: "Cruise",
            isPreview: false,
      });
      case "Route":
        return navigation.navigate("Route", {
          isPreview: false,
        });
      case "Events":
        return navigation.navigate("Events", {
          isPreview: false,
        });
      case "Activity":
        return navigation.navigate("Activity", {
          isPreview: false,
        });
      case "Meeting":
        return navigation.navigate("Meeting", {
          isPreview: false,
        });
    }
  };

  return (
    <ScrollView style={{ flex: 1, padding: 15, paddingBottom: 30 }}>
      <View style={styles.activitesRow}>
        <TouchableOpacity
          onPress={() => navigation.navigate("Flights")}
          activeOpacity={0.7}
          style={styles.activitybutton}
        >
          <View style={[styles.icon, { backgroundColor: "#3295fc" }]}>
            <FlightIcon color="#fff" width={30} />
          </View>
          <Text style={styles.activityText}>Flights</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("TransportRoute", {
              type: "transport",
              isPreview: false,
            })
          }
          activeOpacity={0.7}
          style={styles.activitybutton}
        >
          <View style={[styles.icon, { backgroundColor: "#7083b3" }]}>
            <TransportIcon color="#fff" size="30" />
          </View>
          <Text style={styles.activityText}>Transport</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("Lodging", {
              isPreview: false,
            })
          }
          activeOpacity={0.7}
          style={styles.activitybutton}
        >
          <View style={[styles.icon, { backgroundColor: "#A658C2" }]}>
            <LodgeIcon color="#fff" width="30" />
          </View>
          <Text style={styles.activityText}>Lodgings</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("Tour", {
              isPreview: false,
            })
          }
          activeOpacity={0.7}
          style={styles.activitybutton}
        >
          <View
            style={[
              styles.icon,
              {
                backgroundColor: "#5A58C2",
              },
            ]}
          >
            <TourFlagIcon width="30" color="#fff" />
          </View>
          <Text style={styles.activityText}>Tour</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.title}>Other activities</Text>
      <>
        {activityButtons.map(({ id, label, color, Icon, borderBottom }) => (
          <TouchableOpacity
            key={id}
            activeOpacity={0.7}
            style={[
              styles.activitesColumn,
              borderBottom !== undefined && { borderBottomWidth: borderBottom },
            ]}
            onPress={() => handleNavigate(label)}
          >
            <View style={[styles.icon, styles.sm, { backgroundColor: color }]}>
              <Icon size={18} color="#fff" />
            </View>
            <Text style={styles.activityTextSm}>{label}</Text>
          </TouchableOpacity>
        ))}
      </>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  activitesColumn: {
    alignItems: "center",
    borderBottomColor: "#e5e5e5",
    borderBottomWidth: 1,
    flexDirection: "row",
    marginBottom: 15,
    paddingBottom: 15,
    width: "100%",
  },
  activitesRow: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  activityText: {
    color: COLORS.gray,
    fontSize: 14,
    fontWeight: "500",
    textAlign: "center",
  },
  activityTextSm: {
    color: COLORS.black,
    fontSize: 16,
    fontWeight: "600",
  },
  activitybutton: {
    marginHorizontal: 5,
  },
  icon: {
    alignItems: "center",
    borderRadius: 50,
    height: 70,
    justifyContent: "center",
    marginBottom: 10,
    width: 70,
  },
  sm: {
    backgroundColor: "#fff",
    height: 35,
    marginBottom: 0,
    marginRight: 10,
    width: 35,
  },
  title: {
    color: COLORS.gray,
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 15,
    marginTop: 25,
  },
});
