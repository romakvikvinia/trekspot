import { Image } from "expo-image";
import React, { useCallback, useEffect, useRef, useState } from "react";
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
import { SightDetailModal } from "../../components/explore/sights/SightDetailModal";

interface TripProps {}

export const TripMapViewScreen: React.FC<TripProps> = ({route}) => {
  const mapRef = useRef<any>(null);
  const navigation = useNavigation();
  const [topSightDetail, setTopSightDetail] = useState(null);

  const showTopSight = (sight: object) => {
    setTopSightDetail(sight);
  };

  const handleClear = useCallback(() => {
    setTopSightDetail(null);
  }, []);

  useEffect(() => {
    mapRef.current?.animateToRegion({
      latitude: route?.params?.topSights[0]?.location?.lat,
      longitude: route?.params?.topSights[0]?.location?.lng,
      latitudeDelta: 0.00001,
      longitudeDelta: 0.5,
    });
  }, []);
 
  return (
    <>
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
        {route?.params?.topSights.map((marker: any, i: any) => {
          return (
            <Marker key={marker.id} coordinate={{
              latitude: marker?.location?.lat,
              longitude: marker?.location?.lng,
            }}
            onPress={() => showTopSight(marker)}
            >
              <View style={{ width: 50, height: 50 }}>
                <SightsMarkerIcon size="50" color={COLORS.primary} />
              </View>
              {/* <Callout style={{ width: 150 }}>
                <Text
                  numberOfLines={1}
                  style={{
                    textAlign: "center",
                    fontWeight: "500",
                    fontSize: 16,
                  }}
                >
                  {marker?.title}
                </Text>
              </Callout> */}
            </Marker>
          );
        })}
      </MapView>
    </View>
    {topSightDetail ? (
        <SightDetailModal data={topSightDetail} closeCallBack={handleClear} />
      ) : null}
    </>
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
