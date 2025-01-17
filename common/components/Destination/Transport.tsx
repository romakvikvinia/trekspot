import React from "react";
import {
  ImageBackground,
  Linking,
  Platform,
  TouchableOpacity,
  View,
} from "react-native";
import { ScrollView, Text } from "react-native";

import { CountryType } from "../../../api/api.types";
import { FeedbackCountryDetail } from "../../../components/explore/FeedbackCountryDetail";
import {
  DrivingSideLeft,
  DrivingSideRight,
} from "../../../utilities/SvgIcons.utility";
import { styles } from "../_styles";

interface TransportProps {
  country: CountryType;
}

export const Transport: React.FC<TransportProps> = ({ country }) => {
  return (
    <ScrollView
      style={[styles.tabWrapper, {paddingHorizontal: 0}]}
      contentContainerStyle={{
        paddingBottom: 30,
      }}
      showsVerticalScrollIndicator={false}
    > 
      {country?.taxi?.length > 0 && (
        <>
          <Text style={[styles.secondaryTitle, {paddingHorizontal: 15}]}>Helpful apps</Text>
          <View style={styles.transports}>
            {country?.taxi.map((item, ind) => (
              <TouchableOpacity
                activeOpacity={0.7}
                style={styles.transportItem}
                key={`taxt-${ind}`}
                onPress={() =>
                  Linking.openURL(
                    `${Platform.OS === "android" ? item.android : item.ios}`
                  )
                }
              >
                <View style={styles.transportItemIcon}>
                  <ImageBackground
                    source={{
                      uri: item.logo,
                    }}
                    resizeMode="contain"
                    style={{ 
                      width: 50, 
                      height: 50,
                     }}
                  />
                </View>
                <Text numberOfLines={1} style={styles.transportText}>{item.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </>
      )}

      <Text style={[styles.secondaryTitle, {paddingHorizontal: 15}]}>Driving side</Text>
      <View style={styles.drivingSide}>
        {country.car.side === "Right" ? (
          <>
            <Text style={styles.drivingSideText}>Right</Text>
            <DrivingSideRight />
          </>
        ) : (
          <>
            <Text style={styles.drivingSideText}>Left</Text>
            <DrivingSideLeft />
          </>
        )}
      </View>
      <View style={{marginTop: 50, width: "100%"}}><FeedbackCountryDetail /></View>
    </ScrollView>
  );
};
