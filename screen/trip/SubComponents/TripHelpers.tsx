import { useNavigation } from "@react-navigation/native";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  AppsIcon,
  DishesIcon,
  EmergencyLinearIcon,
  InsightIcon,
} from "../../../utilities/SvgIcons.utility";

type TripHelpersProps = {
  data: any;
  iso2: string;
  reachView?: boolean;
}

export const TripHelpers = ({ data, iso2, reachView = false }: TripHelpersProps) => {
  const navigation = useNavigation();

  return (
    <View style={[styles.bottomRow, {
      borderTopWidth: reachView ? 0 : 1,
    }]}>
      <ScrollView
        horizontal
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingHorizontal: reachView ? 20 : 20 }}
        showsHorizontalScrollIndicator={false}
      >
         <TouchableOpacity
          style={styles.bottomActionsButton}
          activeOpacity={0.7}
          onPress={() => navigation.navigate("TripEmergency")}
        >
          <EmergencyLinearIcon size={16} color={reachView ? "#000" : "#0b57d0"} />
          <Text style={[styles.bottomActionsButtonlabel, {
            color: reachView ? "#000" : "#0b57d0",
          }]}>Emergency</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.bottomActionsButton}
          activeOpacity={0.7}
          onPress={() =>
            navigation.navigate("TripInsights", {
              data: data,
              iso2: iso2,
            })
          }
        >
          <InsightIcon size={16} color={reachView ? "#000" : "#0b57d0"} />
          <Text style={[styles.bottomActionsButtonlabel, {
            color: reachView ? "#000" : "#0b57d0",
          }]}>Insights</Text>
        </TouchableOpacity>
       
        <TouchableOpacity
          style={styles.bottomActionsButton}
          activeOpacity={0.7}
          onPress={() =>
            navigation.navigate("TripTransport", {
              iso2: iso2,
            })
          }
        >
          <AppsIcon size={16} color={reachView ? "#000" : "#0b57d0"} />
          <Text style={[styles.bottomActionsButtonlabel, {
            color: reachView ? "#000" : "#0b57d0",
          }]}>Apps</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.bottomActionsButton}
          activeOpacity={0.7}
          onPress={() =>
            navigation.navigate("TripDishes", {
              iso2: iso2,
            })
          }
        >
          <DishesIcon size={16} color={reachView ? "#000" : "#0b57d0"} />
          <Text style={[styles.bottomActionsButtonlabel, {
            color: reachView ? "#000" : "#0b57d0",
          }]}>What to eat?</Text>
        </TouchableOpacity>
       
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomRow: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderTopColor: "#f2f2f2",
    borderTopWidth: 1,
    marginTop: 10,
    paddingTop: 12,
    paddingBottom: 12,
    marginBottom: 15
  },
  bottomActionsButton: {
    borderRadius: 50,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    marginRight: 8,
    paddingVertical: 10,
    paddingHorizontal: 15,
    flexDirection: "row",
  },
  bottomActionsButtonText: {
    alignItems: "center",
    flexDirection: "row",
  },
  bottomActionsButtonlabel: {
    fontSize: 14,
    color: "#0b57d0",
    marginLeft: 8,
    fontWeight: "500",
  },
});
