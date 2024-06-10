import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { BackIcon } from "../../utilities/SvgIcons.utility";
import Constants from "expo-constants";
import { COLORS } from "../../styles/theme";
import { useNavigation } from "@react-navigation/native";
import { Emergency } from "../../common/components/Destination/Emergency";

export const TripEmergency = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <BackIcon size="30" />
        </TouchableOpacity>

        <Text style={styles.destination}>Emergency</Text>
        <TouchableOpacity style={styles.backButton}></TouchableOpacity>
      </View>

      <ScrollView
        style={{ flex: 1, flexGrow: 1 }}
        contentContainerStyle={{ paddingHorizontal: 0 }}
      >
        <Emergency
          country={{
            emergency: {
              emergency: "323",
              police: "344",
              ambulance: "3434",
              fire: "34",
            },
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F2F2F7",
    paddingTop: Constants?.statusBarHeight + 10,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    marginBottom: 10,
  },
  destination: {
    fontSize: 18,
    fontWeight: "500",
  },
  backButton: {
    width: 30,
  },
  heading: {
    fontSize: 20,
    fontWeight: "600",
    color: COLORS.black,
    marginTop: 25,
    marginBottom: 10,
  },
});
