import React from "react";
import {
  Linking,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { CountryType } from "../../../api/api.types";
import { FeedbackCountryDetail } from "../../../components/explore/FeedbackCountryDetail";
import {
  AmbulanceIcon,
  CallIcon,
  FireBrigadeIcon,
  PoliceIcon,
} from "../../../utilities/SvgIcons.utility";
import { styles } from "../_styles";

interface EmergencyProps {
  data: CountryType["emergency"];
  isSeparatePage: boolean
}

export const Emergency: React.FC<EmergencyProps> = ({ data, isSeparatePage = false }) => {
  return (
      <ScrollView
        style={[styles.tabWrapper, { paddingHorizontal: 0 }]}
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.emergencyNumbers, {
          marginTop: isSeparatePage ? 15 : 25
        }]}>
          {data?.emergency ? (
            <TouchableOpacity
              activeOpacity={0.7}
              style={[
                styles.emergencyButtonItem,
                { backgroundColor: "#af0101" },
              ]}
              onPress={() => Linking.openURL(`tel:${data.emergency}`)}
            >
              <CallIcon />
              <Text style={styles.emergencyButtonItemText}>
                Emergency - {data.emergency}
              </Text>
            </TouchableOpacity>
          ) : null}

          {data?.police ? (
            <TouchableOpacity
              activeOpacity={0.7}
              style={[
                styles.emergencyButtonItem,
                { backgroundColor: "#366dc2" },
              ]}
              onPress={() => Linking.openURL(`tel:${data.police}`)}
            >
              <PoliceIcon />
              <Text style={styles.emergencyButtonItemText}>
                Police - {data.police}
              </Text>
            </TouchableOpacity>
          ) : null}
          {data?.ambulance ? (
            <TouchableOpacity
              activeOpacity={0.7}
              style={[
                styles.emergencyButtonItem,
                { backgroundColor: "#f14e2f" },
              ]}
              onPress={() => Linking.openURL(`tel:${data.ambulance}`)}
            >
              <AmbulanceIcon />
              <Text style={styles.emergencyButtonItemText}>
                Ambulance - {data.ambulance}
              </Text>
            </TouchableOpacity>
          ) : null}
          {data?.fire ? (
            <TouchableOpacity
              activeOpacity={0.7}
              style={[
                styles.emergencyButtonItem,
                { backgroundColor: "#f10d00" },
              ]}
              onPress={() => Linking.openURL(`tel:${data.fire}`)}
            >
              <FireBrigadeIcon />
              <Text style={styles.emergencyButtonItemText}>
                Fire brigade - {data.fire}
              </Text>
            </TouchableOpacity>
          ) : null}
        </View>
        {data && data?.emergency && (
          <View style={{ marginTop: 30, width: "100%" }}>
            <FeedbackCountryDetail />
          </View>
        )}
      </ScrollView>
  );
};
