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

export const TripHelpers = ({ data, iso2 }) => {
  const navigation = useNavigation();
  console.log("data", data);
  return (
    <View style={styles.bottomRow}>
      <ScrollView
        horizontal
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingHorizontal: 20 }}
        showsHorizontalScrollIndicator={false}
      >
         <TouchableOpacity
          style={styles.bottomActionsButton}
          activeOpacity={0.7}
          onPress={() => navigation.navigate("TripEmergency")}
        >
          <EmergencyLinearIcon size={16} color={"#0b57d0"} />
          <Text style={styles.bottomActionsButtonlabel}>Emergency</Text>
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
          <InsightIcon size={16} color={"#0b57d0"} />
          <Text style={styles.bottomActionsButtonlabel}>Insights</Text>
        </TouchableOpacity>
        {/* <TouchableOpacity
          style={styles.bottomActionsButton}
          activeOpacity={0.7}
          onPress={() => navigation.navigate("TripFAQ",{
            iso2: iso2
          })}
        >
          <FaqIcon size={12} color={"#0b57d0"} />
          <Text style={styles.bottomActionsButtonlabel}>FAQ</Text>
        </TouchableOpacity> */}
        <TouchableOpacity
          style={styles.bottomActionsButton}
          activeOpacity={0.7}
          onPress={() =>
            navigation.navigate("TripTransport", {
              iso2: iso2,
            })
          }
        >
          <AppsIcon size={16} color={"#0b57d0"} />
          <Text style={styles.bottomActionsButtonlabel}>Apps</Text>
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
          <DishesIcon size={16} color={"#0b57d0"} />
          <Text style={styles.bottomActionsButtonlabel}>What to eat?</Text>
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
    marginTop: 15,
    paddingTop: 12,
    paddingBottom: 12,
  },
  bottomActionsButton: {
    borderRadius: 50,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ecf3fe",
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
