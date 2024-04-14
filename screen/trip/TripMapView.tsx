import { Image } from "expo-image";
import React, { useEffect, useRef } from "react";
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
import {
  BackIcon,
  MarkerFillIcon,
  SightsMarkerIcon,
} from "../../utilities/SvgIcons.utility";
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { customMapStyle } from "../../styles/mapView.style";
import { COLORS } from "../../styles/theme";

interface TripProps {}

export const TripMapViewScreen: React.FC<TripProps> = ({}) => {
  const mapRef = useRef<any>(null);
  const navigation = useNavigation();

  const markers = [
    {
      name: "Burj Khalifa",
      coordinates: {
        latitude: 25.1971636,
        longitude: 55.274249,
      },
    },
    {
      name: "Palm Jumeirah",
      coordinates: {
        latitude: 25.1125,
        longitude: 55.1381,
      },
    },
    {
      name: "The Dubai Mall",
      coordinates: {
        latitude: 25.1972,
        longitude: 55.2794,
      },
    },
    {
      name: "Burj Al Arab",
      coordinates: {
        latitude: 25.1413,
        longitude: 55.1853,
      },
    },
    {
      name: "Dubai Marina",
      coordinates: {
        latitude: 25.0673,
        longitude: 55.1401,
      },
    },
  ];

  useEffect(() => {
    mapRef.current?.animateToRegion({
      latitude: markers[0].coordinates?.latitude,
      longitude: markers[0].coordinates?.longitude,
      latitudeDelta: 0.00001,
      longitudeDelta: 0.5,
    });
  }, []);

  return (
    <View style={styles.safeArea}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}
      >
        <BackIcon size="30" />
      </TouchableOpacity>

      <MapView
        ref={mapRef}
        provider={Platform.OS === "android" ? PROVIDER_GOOGLE : undefined}
        style={styles.map}
        // onPress={handleMapPress}
        zoomEnabled
        zoomControlEnabled
        pitchEnabled
        //  followsUserLocation={true}
        // showsUserLocation={true}
        //customMapStyle={customMapStyle}
        mapType="standard"
        // onSnapToItem={() => alert("ss")}
      >
        {markers.map((marker: any, i: any) => {
          return (
            <Marker key={marker.id} coordinate={marker.coordinates}>
              <View style={{ width: 50, height: 50 }}>
                <SightsMarkerIcon size="50" color={COLORS.primary} />
                <Text
                  style={{
                    position: "absolute",
                    top: 18,
                    left: 18,
                    color: "#fff",
                  }}
                >
                  {i + 1}
                </Text>
              </View>
              <Callout style={{ width: 150 }}>
                <Text
                  numberOfLines={1}
                  style={{
                    textAlign: "center",
                    fontWeight: "500",
                    fontSize: 16,
                  }}
                >
                  {marker?.name}
                </Text>
              </Callout>
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
