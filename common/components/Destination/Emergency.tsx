import React from "react";
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
import { CountryType } from "../../../api/api.types";

interface EmergencyProps {
  country: CountryType;
}

export const Emergency: React.FC<EmergencyProps> = ({ country }) => {
  return (
    <ScrollView style={styles.tabWrapper} showsVerticalScrollIndicator={false}>
      <View style={styles.emergencyNumbers}>
        {country?.emergency?.emergency ? (
          <TouchableOpacity
            activeOpacity={0.7}
            style={[styles.emergencyButtonItem, { backgroundColor: "#af0101" }]}
            onPress={() =>
              Linking.openURL(`tel:${country?.emergency?.emergency}`)
            }
          >
            <CallIcon />
            <Text style={styles.emergencyButtonItemText}>
              EU Emergency - {country?.emergency?.emergency}
            </Text>
          </TouchableOpacity>
        ) : null}

        {country?.emergency?.police ? (
          <TouchableOpacity
            activeOpacity={0.7}
            style={[styles.emergencyButtonItem, { backgroundColor: "#366dc2" }]}
            onPress={() => Linking.openURL(`tel:${country?.emergency?.police}`)}
          >
            <PoliceIcon />
            <Text style={styles.emergencyButtonItemText}>
              Police - {country?.emergency?.police}
            </Text>
          </TouchableOpacity>
        ) : null}
        {country?.emergency?.ambulance ? (
          <TouchableOpacity
            activeOpacity={0.7}
            style={[styles.emergencyButtonItem, { backgroundColor: "#f14e2f" }]}
            onPress={() =>
              Linking.openURL(`tel:${country?.emergency?.ambulance}`)
            }
          >
            <AmbulanceIcon />
            <Text style={styles.emergencyButtonItemText}>
              Ambulance - {country?.emergency?.ambulance}
            </Text>
          </TouchableOpacity>
        ) : null}
        {country?.emergency?.fire ? (
          <TouchableOpacity
            activeOpacity={0.7}
            style={[styles.emergencyButtonItem, { backgroundColor: "#f10d00" }]}
            onPress={() => Linking.openURL(`tel:${country?.emergency?.fire}`)}
          >
            <FireBrigadeIcon />
            <Text style={styles.emergencyButtonItemText}>
              Fire brigade - {country?.emergency?.fire}
            </Text>
          </TouchableOpacity>
        ) : null}
      </View>
    </ScrollView>
  );
};
