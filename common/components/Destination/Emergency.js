import {
  Linking,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  AmbulanceIcon,
  CallIcon,
  FireBrigadeIcon,
  PoliceIcon,
} from "../../../utilities/SvgIcons.utility";
import { styles } from "../_styles";

export const Emergency = ({ DATA }) => {
  return (
    <ScrollView style={styles.tabWrapper} showsVerticalScrollIndicator={false}>
      <View style={styles.emergencyNumbers}>
        {DATA?.emergency?.emergency ? (
          <TouchableOpacity
            activeOpacity={0.7}
            style={[styles.emergencyButtonItem, { backgroundColor: "#af0101" }]}
            onPress={() => Linking.openURL(`tel:${DATA?.emergency?.emergency}`)}
          >
            <CallIcon />
            <Text style={styles.emergencyButtonItemText}>
              EU Emergency - {DATA?.emergency?.emergency}
            </Text>
          </TouchableOpacity>
        ) : null}

        {DATA?.emergency?.police ? (
          <TouchableOpacity
            activeOpacity={0.7}
            style={[styles.emergencyButtonItem, { backgroundColor: "#366dc2" }]}
            onPress={() => Linking.openURL(`tel:${DATA?.emergency?.police}`)}
          >
            <PoliceIcon />
            <Text style={styles.emergencyButtonItemText}>
              Police - {DATA?.emergency?.police}
            </Text>
          </TouchableOpacity>
        ) : null}
        {DATA?.emergency?.ambulance ? (
          <TouchableOpacity
            activeOpacity={0.7}
            style={[styles.emergencyButtonItem, { backgroundColor: "#f14e2f" }]}
            onPress={() => Linking.openURL(`tel:${DATA?.emergency?.ambulance}`)}
          >
            <AmbulanceIcon />
            <Text style={styles.emergencyButtonItemText}>
              Ambulance - {DATA?.emergency?.ambulance}
            </Text>
          </TouchableOpacity>
        ) : null}
        {DATA?.emergency?.fire ? (
          <TouchableOpacity
            activeOpacity={0.7}
            style={[styles.emergencyButtonItem, { backgroundColor: "#f10d00" }]}
            onPress={() => Linking.openURL(`tel:${DATA?.emergency?.fire}`)}
          >
            <FireBrigadeIcon />
            <Text style={styles.emergencyButtonItemText}>
              Fire brigade - {DATA?.emergency?.fire}
            </Text>
          </TouchableOpacity>
        ) : null}
      </View>
    </ScrollView>
  );
};
