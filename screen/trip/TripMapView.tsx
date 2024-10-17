import { Image } from "expo-image";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  ImageBackground,
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

export const TripMapViewScreen: React.FC<TripProps> = ({ route }) => {
  const currentDay = route?.params?.activeDay;
  const currentTabActivites = route?.params?.tabData;

  const mapRef = useRef<any>(null);
  const navigation = useNavigation();
  const [topSightDetail, setTopSightDetail] = useState(null);

  const showTopSight = (sight: object) => {
    setTopSightDetail(sight);
  };

  const handleClear = useCallback(() => {
    setTopSightDetail(null);
  }, []);

  const activities = useMemo(() => {
    const all =
      route?.params?.tabData &&
      Object.values(route?.params?.tabData).reduce((acc, current) => {
        return acc.concat(current.activities);
      }, []);

    return all;
  }, [route?.params?.tabData]);

  useEffect(() => {
    mapRef.current?.animateToRegion({
      latitude: route?.params?.city?.lat,
      longitude: route?.params?.city?.lng,
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
        {(!activities || activities?.length === 0) && (
          <View style={styles.calloutBox}>
            <Text style={styles.calloutBoxTitle}>
              Here will appear activities that you have added to your trip. To
              add an activity go back to the trip page.
            </Text>

            <TouchableOpacity activeOpacity={0.7} style={styles.gotItButton}>
              <Text
                style={styles.gotItButtonText}
                onPress={() => navigation.goBack()}
              >
                Got it
              </Text>
            </TouchableOpacity>
          </View>
        )}

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
          mapType="mutedStandard"
          // onSnapToItem={() => alert("ss")}
        >{
          console.log(currentTabActivites[currentDay]?.activities)
        }
          {currentTabActivites[currentDay]?.activities?.map(
            (marker: any, i: any) => {
              return (
                <Marker
                  key={marker.id}
                  coordinate={{
                    latitude: marker?.location?.lat,
                    longitude: marker?.location?.lng,
                  }}
                  onPress={() => showTopSight(marker)}
                >
                  <View style={{ width: 65, height: 65 }}>
                    <SightsMarkerIcon size="65" color={COLORS.primary} />
                    <ImageBackground
                      source={{ uri: marker?.image?.url }}
                      style={{
                        width: 53,
                        height: 53,
                        borderRadius: 50,
                        position: "absolute",
                        top: 4,
                        left: 6,
                        overflow: "hidden",
                        borderWidth: 0,
                      }}
                    />
                    {/* <View
                      style={{
                        position: "absolute",
                        top: 0,
                        right: 0,
                        backgroundColor: COLORS.primary,
                        width: 25,
                        height: 25,
                        borderRadius: 50,
                        justifyContent: "center",
                        alignItems: "center",
                        borderWidth: 2,
                        borderColor: "#fff",
                      }}
                    >
                      <Text
                        style={{
                          color: "#fff",
                          fontSize: 11,
                          fontWeight: "bold",
                        }}
                      >
                        {i + 1}
                      </Text>
                    </View> */}
                  </View>
                  {/* <Callout style={{ width: 150 }} >
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
            }
          )}
        </MapView>
      </View>
      {topSightDetail ? (
        <SightDetailModal
          showDirection
          data={topSightDetail}
          closeCallBack={handleClear}
        />
      ) : null}
    </>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F2F2F7",
  },
  gotItButton: {
    backgroundColor: "#000",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 15,
  },
  gotItButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "500",
  },
  calloutBox: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    position: "absolute",
    top: 100,
    zIndex: 2,
    left: 20,
    width: "90%",
    opacity: 0.9,
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  calloutBoxTitle: {
    fontSize: 16,
    fontWeight: "400",
    textAlign: "left",
    width: "100%",
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
