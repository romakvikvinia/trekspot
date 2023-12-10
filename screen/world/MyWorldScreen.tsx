import React, { useCallback, useEffect, useRef, useState } from "react";
import MapView, { Geojson, PROVIDER_GOOGLE } from "react-native-maps";

import {
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import * as Location from "expo-location";
import { getCountry } from "../../utilities/countries";
import { Portal } from "react-native-portalize";
import { Modalize } from "react-native-modalize";
import { Flags } from "../../utilities/flags";
import {
  BackIcon,
  CloseCircleIcon,
  ImagesIcon,
  LivedIcon,
  VisitedIcon,
} from "../../utilities/SvgIcons.utility";
import { COLORS } from "../../styles/theme";
import { useNavigation } from "@react-navigation/native";

const MyWorldScreen = () => {
  const navigation = useNavigation();

  const [location, setLocation] = useState();
  const [currentCountry, setCurrentCountry] = useState();
  const [beenPlaces, setBeenPlaces] = useState([]);
  const [livedPlaces, setLivedPlaces] = useState([]);

  const [imagePath, setImagePath] = useState();
  const mapRef = useRef(null);
  const countryDetailModalRef = useRef(null);

  const onCountryDetailOpen = () => {
    countryDetailModalRef.current?.open();
  };

  const handleMapPress = async (event) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    try {
      let [currentCountry] = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });

      console.log("currentCountry", currentCountry);
      let result = getCountry(currentCountry.isoCountryCode);
      if (currentCountry && result) {
        setLocation({
          type: "FeatureCollection",
          features: [result],
        });

        mapRef.current?.animateToRegion({
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 0.00001,
          longitudeDelta: 20,
        });
        setImagePath(Flags[currentCountry.isoCountryCode]);
        setCurrentCountry(currentCountry);
        onCountryDetailOpen();
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  const handleResetMap = () => {
    setImagePath("");
    setCurrentCountry("");
    setLocation("");
  };

  const handleBeen = () => {
    setBeenPlaces((prevState) => {
      const countryCode = currentCountry?.isoCountryCode;

      if (countryCode && prevState.includes(countryCode)) {
        return prevState.filter((code) => code !== countryCode);
      }

      return [...prevState, countryCode].filter(Boolean);
    });
  };

  const handleLived = () => {
    setLivedPlaces((prevState) => {
      const countryCode = currentCountry?.isoCountryCode;

      if (countryCode && prevState.includes(countryCode)) {
        return prevState.filter((code) => code !== countryCode);
      }

      return [...prevState, countryCode].filter(Boolean);
    });
  };

  const myPlace = {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        id: "ARG",
        properties: { name: "Argentina" },
        geometry: {
          type: "MultiPolygon",
          coordinates: [
            [
              [
                [-65.5, -55.2],
                [-66.45, -55.25],
                [-66.95992, -54.89681],
                [-67.56244, -54.87001],
                [-68.63335, -54.8695],
                [-68.63401, -52.63637],
                [-68.25, -53.1],
                [-67.75, -53.85],
                [-66.45, -54.45],
                [-65.05, -54.7],
                [-65.5, -55.2],
              ],
            ],
            [
              [
                [-64.964892, -22.075862],
                [-64.377021, -22.798091],
                [-63.986838, -21.993644],
                [-62.846468, -22.034985],
                [-62.685057, -22.249029],
                [-60.846565, -23.880713],
                [-60.028966, -24.032796],
                [-58.807128, -24.771459],
                [-57.777217, -25.16234],
                [-57.63366, -25.603657],
                [-58.618174, -27.123719],
                [-57.60976, -27.395899],
                [-56.486702, -27.548499],
                [-55.695846, -27.387837],
                [-54.788795, -26.621786],
                [-54.625291, -25.739255],
                [-54.13005, -25.547639],
                [-53.628349, -26.124865],
                [-53.648735, -26.923473],
                [-54.490725, -27.474757],
                [-55.162286, -27.881915],
                [-56.2909, -28.852761],
                [-57.625133, -30.216295],
                [-57.874937, -31.016556],
                [-58.14244, -32.044504],
                [-58.132648, -33.040567],
                [-58.349611, -33.263189],
                [-58.427074, -33.909454],
                [-58.495442, -34.43149],
                [-57.22583, -35.288027],
                [-57.362359, -35.97739],
                [-56.737487, -36.413126],
                [-56.788285, -36.901572],
                [-57.749157, -38.183871],
                [-59.231857, -38.72022],
                [-61.237445, -38.928425],
                [-62.335957, -38.827707],
                [-62.125763, -39.424105],
                [-62.330531, -40.172586],
                [-62.145994, -40.676897],
                [-62.745803, -41.028761],
                [-63.770495, -41.166789],
                [-64.73209, -40.802677],
                [-65.118035, -41.064315],
                [-64.978561, -42.058001],
                [-64.303408, -42.359016],
                [-63.755948, -42.043687],
                [-63.458059, -42.563138],
                [-64.378804, -42.873558],
                [-65.181804, -43.495381],
                [-65.328823, -44.501366],
                [-65.565269, -45.036786],
                [-66.509966, -45.039628],
                [-67.293794, -45.551896],
                [-67.580546, -46.301773],
                [-66.597066, -47.033925],
                [-65.641027, -47.236135],
                [-65.985088, -48.133289],
                [-67.166179, -48.697337],
                [-67.816088, -49.869669],
                [-68.728745, -50.264218],
                [-69.138539, -50.73251],
                [-68.815561, -51.771104],
                [-68.149995, -52.349983],
                [-68.571545, -52.299444],
                [-69.498362, -52.142761],
                [-71.914804, -52.009022],
                [-72.329404, -51.425956],
                [-72.309974, -50.67701],
                [-72.975747, -50.74145],
                [-73.328051, -50.378785],
                [-73.415436, -49.318436],
                [-72.648247, -48.878618],
                [-72.331161, -48.244238],
                [-72.447355, -47.738533],
                [-71.917258, -46.884838],
                [-71.552009, -45.560733],
                [-71.659316, -44.973689],
                [-71.222779, -44.784243],
                [-71.329801, -44.407522],
                [-71.793623, -44.207172],
                [-71.464056, -43.787611],
                [-71.915424, -43.408565],
                [-72.148898, -42.254888],
                [-71.746804, -42.051386],
                [-71.915734, -40.832339],
                [-71.680761, -39.808164],
                [-71.413517, -38.916022],
                [-70.814664, -38.552995],
                [-71.118625, -37.576827],
                [-71.121881, -36.658124],
                [-70.364769, -36.005089],
                [-70.388049, -35.169688],
                [-69.817309, -34.193571],
                [-69.814777, -33.273886],
                [-70.074399, -33.09121],
                [-70.535069, -31.36501],
                [-69.919008, -30.336339],
                [-70.01355, -29.367923],
                [-69.65613, -28.459141],
                [-69.001235, -27.521214],
                [-68.295542, -26.89934],
                [-68.5948, -26.506909],
                [-68.386001, -26.185016],
                [-68.417653, -24.518555],
                [-67.328443, -24.025303],
                [-66.985234, -22.986349],
                [-67.106674, -22.735925],
                [-66.273339, -21.83231],
                [-64.964892, -22.075862],
              ],
            ],
          ],
        },
      },
    ],
  };
  console.log("currentCountry++", beenPlaces);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          navigation.goBack();
          handleResetMap();
          countryDetailModalRef.current &&
            countryDetailModalRef.current.close();
        }}
        activeOpacity={0.7}
        style={styles.backButton}
      >
        <BackIcon />
      </TouchableOpacity>
      <MapView
        ref={mapRef}
        // provider={PROVIDER_GOOGLE}
        style={styles.map}
        onPress={handleMapPress}
        zoomEnabled
        zoomControlEnabled
        pitchEnabled
        followUserLocation={true}
        showsUserLocation={true}
        customMapStyle={[
          {
            featureType: "all",
            elementType: "geometry.fill",
            stylers: [
              {
                weight: "2.00",
              },
            ],
          },
          {
            featureType: "all",
            elementType: "geometry.stroke",
            stylers: [
              {
                color: "#9c9c9c",
              },
            ],
          },
          {
            featureType: "all",
            elementType: "labels.text",
            stylers: [
              {
                visibility: "on",
              },
            ],
          },
          {
            featureType: "administrative",
            elementType: "geometry.fill",
            stylers: [
              {
                color: "#930707",
              },
            ],
          },
          {
            featureType: "administrative.country",
            elementType: "geometry.stroke",
            stylers: [
              {
                color: "#57585e",
              },
            ],
          },
          {
            featureType: "administrative.province",
            elementType: "geometry.stroke",
            stylers: [
              {
                color: "#ffffff",
              },
            ],
          },
          {
            featureType: "landscape",
            elementType: "all",
            stylers: [
              {
                color: "#f2f2f2",
              },
            ],
          },
          {
            featureType: "landscape",
            elementType: "geometry.fill",
            stylers: [
              {
                color: "#ffffff",
              },
            ],
          },
          {
            featureType: "landscape.man_made",
            elementType: "geometry.fill",
            stylers: [
              {
                color: "#ffffff",
              },
            ],
          },
          {
            featureType: "landscape.natural.landcover",
            elementType: "geometry.fill",
            stylers: [
              {
                color: "#ffffff",
              },
            ],
          },
          {
            featureType: "landscape.natural.terrain",
            elementType: "geometry.fill",
            stylers: [
              {
                color: "#7c7a00",
              },
            ],
          },
          {
            featureType: "poi",
            elementType: "all",
            stylers: [
              {
                visibility: "off",
              },
            ],
          },
          {
            featureType: "road",
            elementType: "all",
            stylers: [
              {
                saturation: -100,
              },
              {
                lightness: 45,
              },
            ],
          },
          {
            featureType: "road",
            elementType: "geometry.fill",
            stylers: [
              {
                color: "#eeeeee",
              },
            ],
          },
          {
            featureType: "road",
            elementType: "labels.text.fill",
            stylers: [
              {
                color: "#7b7b7b",
              },
            ],
          },
          {
            featureType: "road",
            elementType: "labels.text.stroke",
            stylers: [
              {
                color: "#ffffff",
              },
            ],
          },
          {
            featureType: "road.highway",
            elementType: "all",
            stylers: [
              {
                visibility: "simplified",
              },
            ],
          },
          {
            featureType: "road.arterial",
            elementType: "labels.icon",
            stylers: [
              {
                visibility: "off",
              },
            ],
          },
          {
            featureType: "transit",
            elementType: "all",
            stylers: [
              {
                visibility: "off",
              },
            ],
          },
          {
            featureType: "water",
            elementType: "all",
            stylers: [
              {
                color: "#46bcec",
              },
              {
                visibility: "on",
              },
            ],
          },
          {
            featureType: "water",
            elementType: "geometry.fill",
            stylers: [
              {
                color: "#a4d7f7",
              },
            ],
          },
          {
            featureType: "water",
            elementType: "labels.text.fill",
            stylers: [
              {
                color: "#070707",
              },
            ],
          },
          {
            featureType: "water",
            elementType: "labels.text.stroke",
            stylers: [
              {
                color: "#ffffff",
              },
            ],
          },
        ]}
        mapType="none"
      >
        {location && (
          <Geojson
            geojson={location || myPlace} // geojson of the countries you want to highlight
            strokeColor="#fff"
            fillColor="rgba(0, 115, 255, 0.7)"
            strokeWidth={2}
          />
        )}
        {beenPlaces?.map((item) => (
          <Geojson
            geojson={{
              type: "FeatureCollection",
              features: [getCountry(item)],
            }} // geojson of the countries you want to highlight
            strokeColor="#fff"
            fillColor="#500074"
            strokeWidth={2}
          />
        ))}
        {livedPlaces?.map((item) => (
          <Geojson
            geojson={{
              type: "FeatureCollection",
              features: [getCountry(item)],
            }} // geojson of the countries you want to highlight
            strokeColor="#fff"
            fillColor="#00d52d"
            strokeWidth={2}
          />
        ))}
      </MapView>

      <Portal>
        <Modalize
          ref={countryDetailModalRef}
          modalStyle={{
            minHeight: 250,
          }}
          adjustToContentHeight
          overlayStyle={{
            display: "none",
          }}
          withOverlay={false}
          onClose={() => handleResetMap()}
          // closeOnOverlayTap={false}
        >
          <View style={styles.mapCountryWrapper}>
            <View style={styles.mapCountryWrapperHeader}>
              <View style={styles.leftItems}>
                <ImageBackground
                  resizeMode="cover"
                  style={{
                    width: 35,
                    height: 25,
                  }}
                  source={imagePath ? imagePath : null} // Set the image source
                />
                <Text style={styles.countryText}>
                  {currentCountry?.country}
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => {
                  countryDetailModalRef.current &&
                    countryDetailModalRef.current.close();
                  handleResetMap();
                }}
                activeOpacity={0.7}
                style={styles.closeButton}
              >
                <CloseCircleIcon color="#fff" size="35" />
              </TouchableOpacity>
            </View>

            <View style={styles.actionButtons}>
              <TouchableOpacity
                onPress={() => handleBeen()}
                style={[
                  styles.actionButton,
                  {
                    backgroundColor:
                      currentCountry?.isoCountryCode &&
                      beenPlaces?.includes(currentCountry?.isoCountryCode)
                        ? COLORS.primaryDark
                        : "#fff",
                  },
                ]}
              >
                <VisitedIcon
                  width="25"
                  height="25"
                  active={
                    currentCountry?.isoCountryCode &&
                    beenPlaces?.includes(currentCountry?.isoCountryCode)
                  }
                />
                <Text
                  style={[
                    styles.actionButtonsText,
                    {
                      color:
                        currentCountry?.isoCountryCode &&
                        beenPlaces?.includes(currentCountry?.isoCountryCode)
                          ? "#fff"
                          : "#898B93",
                    },
                  ]}
                >
                  I've been
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => handleLived()}
                style={[
                  styles.actionButton,
                  {
                    backgroundColor:
                      currentCountry?.isoCountryCode &&
                      livedPlaces?.includes(currentCountry?.isoCountryCode)
                        ? "#00d52d"
                        : "#fff",
                  },
                ]}
              >
                <LivedIcon
                  width="25"
                  height="25"
                  active={
                    currentCountry?.isoCountryCode &&
                    livedPlaces?.includes(currentCountry?.isoCountryCode)
                  }
                />
                <Text
                  style={[
                    styles.actionButtonsText,
                    {
                      color:
                        currentCountry?.isoCountryCode &&
                        livedPlaces?.includes(currentCountry?.isoCountryCode)
                          ? "#fff"
                          : "#898B93",
                    },
                  ]}
                >
                  Lived
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton}>
                <ImagesIcon width="25" height="25" active={false} />
                <Text style={styles.actionButtonsText}>Add stories</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modalize>
      </Portal>
    </View>
  );
};
export default MyWorldScreen;
const styles = StyleSheet.create({
  actionButtons: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 35,
    marginBottom: 40,
  },
  actionButton: {
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    width: "30%",
    minHeight: 90,
    borderRadius: 10,
    justifyContent: "center",
  },
  actionButtonsText: {
    marginTop: 15,
    fontSize: 14,
    color: "#898B93",
    fontWeight: "bold",
  },
  mapCountryWrapper: {
    padding: 15,
  },
  mapCountryWrapperHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  leftItems: {
    flexDirection: "row",
    alignItems: "center",
  },
  countryText: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#000",
    marginLeft: 8,
  },
  backButton: {
    width: 40,
    height: 40,
    backgroundColor: "#fff",
    borderRadius: 100,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    ...COLORS.shadow,
    position: "absolute",
    left: 15,
    top: 55,
    zIndex: 1,
  },
  closeButton: {
    width: 35,
    height: 35,
    borderRadius: 100,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    backgroundColor: "#000",
  },
  rowItem: {
    width: "100%",
    marginTop: 30,
    paddingHorizontal: 15,
  },
  map: {
    flex: 1,
  },
  h2: {
    fontSize: 22,
    color: "#000",
    fontWeight: "bold",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  mapContainer: {
    backgroundColor: "#f8fafb",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  contentBox: {
    width: "100%",
    marginTop: 15,
  },
  box: {
    width: 200,
    height: 100,
    backgroundColor: "#fafafa",
    borderRadius: 15,
    marginRight: 15,
  },
  topActions: {
    width: "100%",
    flexDirection: "row",
    display: "flex",
    paddingHorizontal: 15,
    justifyContent: "space-between",
    paddingBottom: 15,
  },
  left: {
    flexDirection: "row",
    display: "flex",
  },
  row: {
    flexDirection: "row",
    display: "flex",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    marginTop: 0,
    marginBottom: 8,
  },
  rowBox: {
    width: "32%",
    height: 90,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
    backgroundColor: "#f8fafb",
    borderColor: "#fff",
    borderWidth: 0,
    borderStyle: "solid",
  },
  lg: {
    fontSize: 24,
    marginBottom: 8,
    fontWeight: "bold",
  },
  btn: {
    backgroundColor: "#fff",
    height: 30,
    paddingHorizontal: 15,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
    flexDirection: "row",
  },
  txt: {
    fontSize: 14,
    marginLeft: 5,
  },
});
