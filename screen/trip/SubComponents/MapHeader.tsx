import { useNavigation } from "@react-navigation/native";
import { useEffect, useRef } from "react";
import { Platform, StyleSheet } from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps"

export const MapHeader = ({trip, topSights}) => {
    const navigation = useNavigation();
    
    const mapRef = useRef(null);
    useEffect(() => {
        if(trip) {
          const lat =  trip?.cities[0].lat;
          const lng =  trip?.cities[0].lng;
          console.log("dd", lat, lng)
          mapRef.current?.animateToRegion({
            latitude: lat,
            longitude: lng,
            latitudeDelta: 0.00001,
            longitudeDelta: 0.5,
          });
        } else {
          mapRef.current?.animateToRegion({
            latitude: 29.3606316,
            longitude: 11.8186065,
            latitudeDelta: 13,
            longitudeDelta: 0.5,
          });
        }
      
      }, [trip?.cities, topSights]);
    return (
        <MapView
        ref={mapRef}
        onPress={() => navigation.navigate("TripMapViewScreen", {
          topSights,
          city: trip?.cities[0]
        })}
        provider={Platform.OS === "android" ? PROVIDER_GOOGLE : undefined}
        style={styles.map}
        mapType="standard"
      ></MapView>

    )

}

const styles = StyleSheet.create({
    map: {
        height: 130,
      },
});