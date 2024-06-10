import { useNavigation } from "@react-navigation/native";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { CarLinearIcon, DishesIcon, EmergencyLinearIcon, FaqIcon, InsightIcon } from "../../../utilities/SvgIcons.utility";

export const TripHelpers = ({handleNavigate}) => {

  const navigation = useNavigation();

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
          onPress={handleNavigate}
        >
          <InsightIcon size={12} color={"#0b57d0"} />
          <Text style={styles.bottomActionsButtonlabel}>Insights</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.bottomActionsButton}
          activeOpacity={0.7}
          onPress={() => navigation.navigate("TripFAQ")}
        >
          <FaqIcon size={12} color={"#0b57d0"} />
          <Text style={styles.bottomActionsButtonlabel}>FAQ</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.bottomActionsButton}
          activeOpacity={0.7}
          onPress={() => navigation.navigate("TripTransport")}
        >
          <CarLinearIcon size={12} color={"#0b57d0"} />
          <Text style={styles.bottomActionsButtonlabel}>Transport</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.bottomActionsButton}
          activeOpacity={0.7}
          onPress={() => navigation.navigate("TripDishes")}
        >
          <DishesIcon size={12} color={"#0b57d0"} />
          <Text style={styles.bottomActionsButtonlabel}>What to eat?</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.bottomActionsButton}
          activeOpacity={0.7}
          onPress={() => navigation.navigate('TripTransportation')}
        >
          <EmergencyLinearIcon size={12} color={"#0b57d0"} />
          <Text style={styles.bottomActionsButtonlabel}>Emergency</Text>
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
    fontSize: 13,
    color: "#0b57d0",
    marginLeft: 3,
    fontWeight: "500",
  },
});
