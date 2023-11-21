import React, { useCallback, useEffect, useRef, useState } from "react";
import MapView, { Geojson, PROVIDER_GOOGLE } from "react-native-maps";
import { COLORS, SIZES } from "../../styles/theme";

import {
  Alert,
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import * as Location from "expo-location";
import { getCountry } from "../../utilities/countries";
import {
  BackIcon,
  BookmarkIcon,
  PlusIcon,
  TrashIcon,
} from "../../utilities/SvgIcons.utility";
import { Portal } from "react-native-portalize";
import { Modalize } from "react-native-modalize";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

const BucketList = () => {
  const navigation = useNavigation();
  const [location, setLocation] = useState();
  const [listSheetVisible, setListSheetVisible] = useState(false);
  const [searchFocus, setSearchFocus] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const modalRef = useRef<Modalize>(null);

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
      }
    } catch (error) {
      console.log(error.message);
    }
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

  useEffect(() => {
    // console.log("countriesssss", countries);
  }, []);

  // const c = Countries?.features?.find((item) => item?.id === "RUS");
  const GOOGLE_PLACES_API_KEY = "YOUR_GOOGLE_API_KEY";

  return (
    <>
      <View style={styles.container}>
        <View style={styles.mapHeader}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            activeOpacity={0.7}
            style={styles.backButton}
          >
            <BackIcon />
          </TouchableOpacity>
        </View>
        <MapView
          // provider={PROVIDER_GOOGLE}
          style={styles.map}
          // region={
          //   {
          //     latitude: location?.coords?.latitude,
          //     longitude: location?.coords?.longitude,
          //     latitudeDelta: 0.015,
          //     longitudeDelta: 0.0121,
          //   }
          // }
          // showsUserLocation
          // showsCompass
          // showsScale
          onPress={handleMapPress}
          zoomEnabled
          zoomControlEnabled
          pitchEnabled
          // customMapStyle={[
          //   {
          //     featureType: "road",
          //     elementType: "geometry",
          //     stylers: [
          //       {
          //         visibility: "off",
          //       },
          //     ],
          //   },
          //   {
          //     featureType: "poi",
          //     elementType: "geometry",
          //     stylers: [
          //       {
          //         visibility: "off",
          //       },
          //     ],
          //   },
          //   {
          //     featureType: "landscape",
          //     elementType: "geometry",
          //     stylers: [
          //       {
          //         color: "#fffffa",
          //       },
          //     ],
          //   },
          //   {
          //     featureType: "water",
          //     stylers: [
          //       {
          //         lightness: 50,
          //       },
          //     ],
          //   },
          //   {
          //     featureType: "road",
          //     elementType: "labels",
          //     stylers: [
          //       {
          //         visibility: "off",
          //       },
          //     ],
          //   },
          //   {
          //     featureType: "transit",
          //     stylers: [
          //       {
          //         visibility: "off",
          //       },
          //     ],
          //   },
          //   {
          //     featureType: "administrative",
          //     elementType: "geometry",
          //     stylers: [
          //       {
          //         lightness: 40,
          //       },
          //     ],
          //   },
          // ]}
        >
          <Geojson
            geojson={location || myPlace} // geojson of the countries you want to highlight
            strokeColor="#ccc"
            fillColor="#fafafa"
            strokeWidth={2}
          />
        </MapView>
      </View>
      <Portal>
        <Modalize
          ref={modalRef}
          modalTopOffset={65}
          alwaysOpen={100}
          onClose={() => setListSheetVisible(false)}
          HeaderComponent={
            <View style={styles.modalHeader}>
              {/* {wishlist?.length ? (
                <TouchableOpacity
                  onPress={() =>
                    Alert.prompt(
                      "Enter title",
                      "Enter anything what you want to do in the future",
                      [
                        {
                          text: "Cancel",
                          onPress: () => console.log("Cancel Pressed"),
                          style: "cancel",
                        },
                        {
                          text: "OK",
                          onPress: (text) => addItem(text),
                        },
                      ],
                      "plain-text"
                    )
                  }
                  style={styles.plusButton}
                >
                  <PlusIcon />
                </TouchableOpacity>
              ) : null} */}
            </View>
          }
        >
          <View style={styles.modalContent}>
            <GooglePlacesAutocomplete
              query={{
                key: GOOGLE_PLACES_API_KEY,
                language: "en", // language of the results
              }}
              onPress={(data, details) => console.log(data, details)}
              textInputProps={{
                InputComp: () => (
                  <TextInput
                    placeholder="Search..."
                    style={styles.searchStyle}
                    // onFocus={() => console.log("focused")}
                    placeholderTextColor="#8E8D8E"
                  />
                ),
                leftIcon: { type: "font-awesome", name: "chevron-left" },
                errorStyle: { color: "red" },
              }}
            />

            <View style={styles.searchResult}>
              <Text style={styles.sectionTitleLarge}>Restaurants</Text>
              <View style={styles.searchResultItem}>
                <View style={styles.leftSide}>
                  <ImageBackground
                    resizeMode="contain"
                    style={styles.locationTypeIcon}
                    source={{
                      uri: "https://cdn-icons-png.flaticon.com/512/10313/10313052.png",
                    }}
                  ></ImageBackground>
                  <View style={styles.locationInfo}>
                    <Text style={styles.locationInfoTitle}>
                      Paris em restaurant
                    </Text>
                    <Text style={styles.locationInfoSub}>Paris, France</Text>
                  </View>
                </View>
                <TouchableOpacity
                  activeOpacity={0.7}
                  style={styles.savePlaceButton}
                >
                  <TrashIcon />
                </TouchableOpacity>
              </View>
              <View style={styles.searchResultItem}>
                <View style={styles.leftSide}>
                  <ImageBackground
                    resizeMode="contain"
                    style={styles.locationTypeIcon}
                    source={{
                      uri: "https://cdn-icons-png.flaticon.com/512/10313/10313052.png",
                    }}
                  ></ImageBackground>
                  <View style={styles.locationInfo}>
                    <Text style={styles.locationInfoTitle}>
                      Paris em restaurant
                    </Text>
                    <Text style={styles.locationInfoSub}>Paris, France</Text>
                  </View>
                </View>
                <TouchableOpacity
                  activeOpacity={0.7}
                  style={styles.savePlaceButton}
                >
                  <TrashIcon />
                </TouchableOpacity>
              </View>
              <View style={styles.searchResultItem}>
                <View style={styles.leftSide}>
                  <ImageBackground
                    resizeMode="contain"
                    style={styles.locationTypeIcon}
                    source={{
                      uri: "https://cdn-icons-png.flaticon.com/512/10313/10313052.png",
                    }}
                  ></ImageBackground>
                  <View style={styles.locationInfo}>
                    <Text style={styles.locationInfoTitle}>
                      Paris em restaurant
                    </Text>
                    <Text style={styles.locationInfoSub}>Paris, France</Text>
                  </View>
                </View>
                <TouchableOpacity
                  activeOpacity={0.7}
                  style={styles.savePlaceButton}
                >
                  <TrashIcon />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.searchResult}>
              <View style={styles.searchResultItem}>
                <View style={styles.leftSide}>
                  <ImageBackground
                    resizeMode="contain"
                    style={styles.locationTypeIcon}
                    source={{
                      uri: "https://cdn-icons-png.flaticon.com/512/10313/10313052.png",
                    }}
                  ></ImageBackground>
                  <View style={styles.locationInfo}>
                    <Text style={styles.locationInfoTitle}>
                      Paris em restaurant
                    </Text>
                    <Text style={styles.locationInfoSub}>Paris, France</Text>
                  </View>
                </View>
                <TouchableOpacity
                  activeOpacity={0.7}
                  style={styles.savePlaceButton}
                >
                  <BookmarkIcon />
                </TouchableOpacity>
              </View>
              <View style={styles.searchResultItem}>
                <View style={styles.leftSide}>
                  <ImageBackground
                    resizeMode="contain"
                    style={styles.locationTypeIcon}
                    source={{
                      uri: "https://cdn-icons-png.flaticon.com/512/10313/10313052.png",
                    }}
                  ></ImageBackground>
                  <View style={styles.locationInfo}>
                    <Text style={styles.locationInfoTitle}>
                      Paris em restaurant
                    </Text>
                    <Text style={styles.locationInfoSub}>Paris, France</Text>
                  </View>
                </View>
                <TouchableOpacity
                  activeOpacity={0.7}
                  style={styles.savePlaceButton}
                >
                  <BookmarkIcon />
                </TouchableOpacity>
              </View>
              <View style={styles.searchResultItem}>
                <View style={styles.leftSide}>
                  <ImageBackground
                    resizeMode="contain"
                    style={styles.locationTypeIcon}
                    source={{
                      uri: "https://cdn-icons-png.flaticon.com/512/10313/10313052.png",
                    }}
                  ></ImageBackground>
                  <View style={styles.locationInfo}>
                    <Text style={styles.locationInfoTitle}>
                      Paris em restaurant
                    </Text>
                    <Text style={styles.locationInfoSub}>Paris, France</Text>
                  </View>
                </View>
                <TouchableOpacity
                  activeOpacity={0.7}
                  style={styles.savePlaceButton}
                >
                  <BookmarkIcon />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.listWrapper}>
              <Text style={styles.sectionTitle}>My Bucketlist</Text>
              <View style={styles.listItems}>
                <TouchableOpacity activeOpacity={0.7} style={styles.listItem}>
                  <Text style={styles.listItemTitle}>Restaurants</Text>
                  <Text style={styles.listItemPlacesText}>5 Place</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.7} style={styles.listItem}>
                  <Text style={styles.listItemTitle}>Lakes</Text>
                  <Text style={styles.listItemPlacesText}>54 Place</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() =>
                    Alert.prompt(
                      "Enter List Title",
                      "",
                      [
                        {
                          text: "Cancel",
                          onPress: () => console.log("Cancel Pressed"),
                          style: "cancel",
                        },
                        {
                          text: "OK",
                          onPress: (text) => addItem(text),
                        },
                      ],
                      "plain-text"
                    )
                  }
                  style={styles.addNewList}
                  activeOpacity={0.7}
                >
                  <PlusIcon color={COLORS.primaryDark} />
                  <Text style={styles.addNewListText}>Create New List</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* <View
          style={{
            flex: 1,
            height: SIZES.height - 200,
            marginTop: 15,
            paddingHorizontal: 15,
          }}
        >
          {wishlist?.length ? (
            <FlashList
              data={wishlist}
              renderItem={({ item }) => <ListItem item={item} />}
              estimatedItemSize={10}
            />
          ) : (
            <View style={styles.emptyWishlistWrapper}>
              <View style={styles.wishlistGetStarted}>
                <Image
                  width={100}
                  height={100}
                  source={{
                    url: "https://cdn-icons-png.flaticon.com/512/1950/1950589.png",
                  }}
                />
                <Text style={styles.wishlistGetStartedText}>
                  Your wishlist is empty. Add your favorite items to get
                  started!
                </Text>
                <TouchableOpacity
                  style={styles.addButton}
                  activeOpacity={0.7}
                  onPress={() =>
                    Alert.prompt(
                      "Enter title",
                      "Enter anything what you want to do in the future",
                      [
                        {
                          text: "Cancel",
                          onPress: () => console.log("Cancel Pressed"),
                          style: "cancel",
                        },
                        {
                          text: "OK",
                          onPress: (text) => addItem(text),
                        },
                      ],
                      "plain-text"
                    )
                  }
                >
                  <Text style={styles.addButtonText}>Add item</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View> */}
        </Modalize>
      </Portal>
    </>
  );
};
export default BucketList;

const styles = StyleSheet.create({
  mapHeader: {
    top: 55,
    position: "absolute",
    width: "100%",
    zIndex: 1,
    paddingHorizontal: 15,
  },
  backButton: {
    width: 50,
    height: 50,
    backgroundColor: "#fff",
    borderRadius: 100,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  listWrapper: {
    flex: 1,
    marginTop: 15,
  },
  sectionTitle: {
    fontSize: 12,
    color: "#8E8D8E",
    fontWeight: "bold",
  },
  sectionTitleLarge: {
    fontSize: 16,
    color: "#000",
    fontWeight: "bold",
    marginBottom: 15,
  },
  listItems: {
    backgroundColor: "#fafafa",
    marginTop: 8,
    padding: 15,
    borderRadius: 10,
  },
  listItem: {
    width: "100%",
    borderBottomWidth: 1,
    borderBottomColor: "#fff",
    paddingBottom: 15,
    marginBottom: 15,
  },
  listItemTitle: {
    fontWeight: "bold",
    fontSize: 14,
    color: "#000",
  },
  listItemPlacesText: {
    fontSize: 12,
    color: "#8E8D8E",
    marginTop: 3,
  },
  addNewList: {
    width: "100%",
    padding: 15,
    backgroundColor: "#fafafa",
    textAlign: "center",
    alignItems: "center",
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "center",
  },
  addNewListText: {
    color: COLORS.primaryDark,
    fontSize: 14,
    fontWeight: "bold",
  },
  savePlaceButton: {
    padding: 10,
  },
  map: {
    flex: 1,
  },
  modalContent: {
    padding: 15,
  },
  searchResult: {
    flex: 1,
    marginTop: 25,
  },
  searchResultItem: {
    flexDirection: "row",
    borderBottomColor: "#eee",
    borderBottomWidth: 1,
    paddingBottom: 15,
    marginBottom: 15,
    alignItems: "center",
    justifyContent: "space-between",
  },
  leftSide: {
    flexDirection: "row",
    alignItems: "center",
  },
  locationTypeIcon: {
    width: 30,
    height: 30,
  },
  locationInfo: {
    marginLeft: 10,
  },
  locationInfoTitle: {
    fontSize: 16,
    color: "#000",
  },
  locationInfoSub: {
    color: "#333",
    fontSize: 10,
    marginTop: 3,
  },
  searchStyle: {
    width: "100%",
    height: 45,
    backgroundColor: "#eeeeee",
    paddingLeft: 10,
    borderRadius: 10,
    color: "#000",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
