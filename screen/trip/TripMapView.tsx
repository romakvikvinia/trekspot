import { Image } from "expo-image";
import React from "react";
import {
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { enGB, he, registerTranslation } from "react-native-paper-dates";
registerTranslation("en", enGB);

import { useNavigation } from "@react-navigation/native";
import { BackIcon, MarkerFillIcon } from "../../utilities/SvgIcons.utility";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { customMapStyle } from "../../styles/mapView.style";
import { COLORS } from "../../styles/theme";

interface TripProps {}

export const TripMapViewScreen: React.FC<TripProps> = ({}) => {
  const navigation = useNavigation();
  const LATITUDE = 41.6831501;
  const LONGITUDE = 44.8693082;
  const markers = [
    {
      id: 0,
      amount: 99,
      coordinate: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
      },
    },
    {
      id: 1,
      amount: 199,
      coordinate: {
        latitude: LATITUDE + 0.004,
        longitude: LONGITUDE - 0.004,
      },
    },
    {
      id: 2,
      amount: 285,
      coordinate: {
        latitude: LATITUDE - 0.004,
        longitude: LONGITUDE - 0.004,
      },
    },
  ];
  return (
    <View style={styles.safeArea}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}
      >
        <BackIcon size="30" />
      </TouchableOpacity>

      <MapView
        // ref={mapRef}
        provider={Platform.OS === "android" ? PROVIDER_GOOGLE : undefined}
        style={styles.map}
        // onPress={handleMapPress}
        zoomEnabled
        zoomControlEnabled
        pitchEnabled
        followsUserLocation={true}
        // showsUserLocation={true}
        customMapStyle={customMapStyle}
        mapType="standard"
        // onSnapToItem={() => alert("ss")}
      >
        {markers.map((marker: any, i: any) => {
          return (
            <Marker key={marker.id} coordinate={marker.coordinate}>
              <View style={{ width: 20, height: 20 }}>
                <MarkerFillIcon size="50" color={COLORS.primary} />
              </View>
            </Marker>
          );
        })}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F2F2F7",
  },
  map: {
    flex: 1,
  },
  backButton: {
    width: 35,
    backgroundColor: "#fff",
    height: 35,
    borderRadius: 50,
    position: "absolute",
    top: 55,
    zIndex: 1,
    left: 20,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});
