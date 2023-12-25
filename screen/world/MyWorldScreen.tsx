import React, { useCallback, useEffect, useRef, useState } from "react";
import MapView, {
  Geojson,
  MapPressEvent,
  Marker,
  PROVIDER_GOOGLE,
} from "react-native-maps";
import * as ImagePicker from "expo-image-picker";
import Carousel from "react-native-snap-carousel";

import {
  ActivityIndicator,
  Image,
  ImageBackground,
  Platform,
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
  AnchorRightIcon,
  BackIcon,
  CloseCircleIcon,
  ImagesIcon,
  LivedIcon,
  TrashIcon,
  VisitedIcon,
  XIcon,
} from "../../utilities/SvgIcons.utility";
import { COLORS, SIZES } from "../../styles/theme";

import { AddMemoriesModal } from "../../common/components/AddMemoriesModal";
import { CountriesList, ICountry } from "../../utilities/countryList";
import { LinearGradient } from "expo-linear-gradient";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MyWorldRouteStackParamList } from "../../routes/world/MyWorldRoutes";
import { useMeQuery } from "../../api/api.trekspot";
import { uploadImage } from "../../api/api.file";
import { customMapStyle } from "../../styles/mapView.style";

type HomeProps = NativeStackScreenProps<MyWorldRouteStackParamList, "World">;

interface ILocation {
  type: string;
  features: any[];
}

const MyWorldScreen: React.FC<HomeProps> = ({ navigation }) => {
  const { data, isLoading, isSuccess } = useMeQuery();
  const [state, setState] = useState<{
    isSelectingImages: boolean;
    lived_countries: ICountry[];
    visited_countries: ICountry[];
    currentCountry: Location.LocationGeocodedAddress | null;
    location: ILocation | null;
    imagePath: any;
    pickedImages: ImagePicker.ImagePickerResult["assets"] | null;
  }>({
    isSelectingImages: false,
    lived_countries: [],
    visited_countries: [],
    currentCountry: null,
    location: null,
    imagePath: null,
    pickedImages: null,
  });

  const fillLivedAndVisitedCountries = useCallback(() => {
    if (!isSuccess || !data) return;

    const { lived_countries, visited_countries } = data.me;
    let lived: any = lived_countries.map((i) => i.iso2);
    let visited: any = visited_countries.map((i) => i.iso2);
    lived = lived.map((i: string) => {
      visited = visited.filter((j) => j !== i);
      return CountriesList.find((c) => c.iso2 === i);
    });
    visited = visited.map((i: string) =>
      CountriesList.find((c) => c.iso2 === i)
    );
    setState((prevState) => ({
      ...prevState,
      lived_countries: lived,
      visited_countries: visited,
    }));
  }, [isSuccess, data]);

  useEffect(() => {
    fillLivedAndVisitedCountries();
  }, [fillLivedAndVisitedCountries]);

  const setPickedImages = useCallback((assetId: string) => {
    setState((prevState) => ({
      ...prevState,
      pickedImages: prevState.pickedImages
        ? prevState.pickedImages.filter((img) => img.assetId !== assetId)
        : null,
    }));
  }, []);

  // must delete
  const [location, setLocation] = useState();
  const [currentCountry, setCurrentCountry] = useState();
  const [beenPlaces, setBeenPlaces] = useState([]);
  const [livedPlaces, setLivedPlaces] = useState([]);

  const [activeSlide, setActiveSlide] = useState({ index: 0 });

  const mapRef = useRef(null);
  const carouselRef = useRef(null);
  const countryDetailModalRef = useRef(null);
  const galleryRef = useRef(null);
  const memoriesModalRef = useRef(null);

  const onCountryDetailOpen = () => {
    countryDetailModalRef.current?.open();
  };

  const onMemoriesDetailOpen = () => {
    memoriesModalRef.current?.open();
  };

  const onGalleryOpen = () => {
    galleryRef.current?.open();
  };

  const handleMapPress = async (event: MapPressEvent) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    try {
      let [currentCountry] = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });

      let result = getCountry(currentCountry.isoCountryCode);
      if (currentCountry && result) {
        mapRef.current?.animateToRegion({
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 0.00001,
          longitudeDelta: 20,
        });

        setState((prevState) => ({
          ...prevState,
          currentCountry,
          imagePath:
            (currentCountry &&
              currentCountry.isoCountryCode &&
              currentCountry.isoCountryCode in Flags &&
              //@ts-ignore
              Flags[currentCountry.isoCountryCode]) ||
            null,
          location: {
            type: "FeatureCollection",
            features: [result],
          },
        }));
        onCountryDetailOpen();
      }
    } catch (error) {
      // console.log(error.message);
    }
  };
  const handleResetMap = useCallback(() => {
    setState((prevState) => ({
      ...prevState,
      currentCountry: null,
      imagePath: null,
      location: null,
    }));
  }, []);

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

  const pickImages = async () => {
    setState((prevSate) => ({
      ...prevSate,
      isSelectingImages: true,
      pickedImages: null,
    }));
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
      allowsMultipleSelection: true,
      selectionLimit: 10,
    });

    if (!result.canceled) {
      setState((prevSate) => ({
        ...prevSate,
        pickedImages: result.assets,
        isSelectingImages: false,
      }));
      onMemoriesDetailOpen();
    } else {
      setState((prevSate) => ({ ...prevSate, isSelectingImages: false }));
    }
  };

  const handleImportImages = useCallback(async () => {
    const { pickedImages } = state;
    if (!pickedImages) return;
    setState((prevState) => ({ ...prevState, isSelectingImages: true }));

    try {
      const formData = new FormData();

      pickedImages.forEach((file) => {
        // @ts-ignore
        formData.append("files", {
          uri:
            Platform.OS === "android"
              ? file.uri
              : file.uri.replace("file://", ""),
          type: "image/jpeg",
          name: file.fileName || file.uri.split("/").pop(),
        });
      });
      await uploadImage(formData);
      setState((prevState) => ({
        ...prevState,
        isSelectingImages: false,
        pickedImages: null,
      }));
    } catch (error) {
      setState((prevState) => ({ ...prevState, isSelectingImages: false }));
    }
    // console.log("currentCountry", beenPlaces, currentCountry);

    setBeenPlaces((prevState) => {
      const countryCode = currentCountry?.isoCountryCode;

      // Ensure prevState is always an array
      const placesArray = Array.isArray(prevState) ? prevState : [];

      // Check if the country code is already in the array
      const alreadyExists = placesArray.some(
        (place) => place.countryCode === countryCode
      );

      // If the country code is already in the array, remove it
      if (countryCode && alreadyExists) {
        return placesArray.filter((place) => place.countryCode !== countryCode);
      }

      // If not, add it to the array along with pickedImages
      const countryData = CountriesList?.find(
        (item) => item.iso2 === countryCode
      );

      return [
        ...placesArray,
        countryCode
          ? {
              countryCode,
              ...pickedImages,
              coordinates: countryData?.coordinates,
            }
          : null, // Ensure null values are filtered out
      ].filter(Boolean);
    });

    memoriesModalRef.current?.close();
  }, [state]);

  // console.log("beenPlaces", beenPlaces);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        // console.log("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      // setLocation(location);
    })();
  }, []);

  const images = [
    {
      id: 1,
      url: "https://images.unsplash.com/photo-1682687982141-0143020ed57a?q=10&w=1600&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 2,
      url: "https://images.unsplash.com/photo-1682687982502-b05f0565753a?q=10&w=1600&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 3,
      url: "https://images.unsplash.com/photo-1682685796766-0fddd3e480de?q=80&w=1600&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ];

  const RenderItem = ({ item, index }) => {
    return (
      <LinearGradient
        style={{
          width: SIZES.width,
          height: SIZES.height,
          flex: 1,
        }}
        colors={["rgba(255,255,255,0.2)", "rgba(0,0,0,0.1)"]}
      >
        <Image
          style={{
            width: SIZES.width,
            height: SIZES.height,
            flex: 1,
          }}
          source={{
            uri: item?.url,
          }}
          cachePolicy="memory"
          contentFit="cover"
          transition={1000}
          placeholder={<ActivityIndicator />}
        />
      </LinearGradient>
    );
  };

  /*
   * Transform data
   */

  const livedHere =
    state.currentCountry &&
    state.lived_countries.find(
      (place) => place.iso2 === state.currentCountry?.isoCountryCode
    );
  const visitedHere =
    state.currentCountry &&
    state.visited_countries.find(
      (place) => place.iso2 === state.currentCountry?.isoCountryCode
    );

  // console.log("livedHere", livedHere);
  // console.log("visitedHere", visitedHere);
  // console.log(state.currentCountry);

  // console.log("redux", redux.api.queries);

  return (
    <>
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
          provider={Platform.OS === "android" ? PROVIDER_GOOGLE : undefined}
          style={styles.map}
          onPress={handleMapPress}
          zoomEnabled
          zoomControlEnabled
          pitchEnabled
          followsUserLocation={true}
          showsUserLocation={true}
          customMapStyle={customMapStyle}
          mapType="standard"
          // onSnapToItem={() => alert("ss")}
        >
          {state.location && (
            <Geojson
              geojson={state.location} // geojson of the countries you want to highlight
              strokeColor="#fff"
              fillColor="rgba(255, 225, 255, 0.5)"
              strokeWidth={2}
            />
          )}
          {state.visited_countries.map((item) => (
            <Geojson
              key={`visited_countries-${item.iso2}`}
              geojson={{
                type: "FeatureCollection",
                features: [getCountry(item.iso2)],
              }} // geojson of the countries you want to highlight
              fillColor="rgba(80, 0, 116, 0.7)"
              strokeColor="#fff"
              strokeWidth={2}
            />
          ))}
          {state.lived_countries.map((item) => (
            <Geojson
              key={`lived_countries-${item.iso2}`}
              geojson={{
                type: "FeatureCollection",
                features: [getCountry(item.iso2)],
              }} // geojson of the countries you want to highlight
              strokeColor="#fff"
              fillColor="rgba(0, 134, 28, 0.6)"
              strokeWidth={2}
            />
          ))}
          {state.visited_countries.map((item) => (
            <Marker
              key={`marker-visited_countries-${item.iso2}`}
              onPress={() => onGalleryOpen()}
              coordinate={{
                latitude: item.coordinates.latitude,
                longitude: item.coordinates.longitude,
              }}
              // title={"title"}
              // description={"description"}
            >
              <View
                style={{
                  backgroundColor: "#fff",
                  padding: 0,
                  borderRadius: 50,
                  borderWidth: 2,
                  borderColor: "#fff",
                  shadowColor: "#000",
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                  shadowOpacity: 0.2,
                  shadowRadius: 3.84,
                  elevation: 5,
                  position: "relative",
                  zIndex: 2,
                }}
              >
                {item && "assets" in item ? (
                  <ImageBackground
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 50,
                      overflow: "hidden",
                    }}
                    source={{
                      //@ts-ignore
                      uri: item?.assets[0].uri,
                    }}
                  />
                ) : null}
              </View>
            </Marker>
          ))}
        </MapView>
      </View>

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
                  source={state.imagePath} // Set the image source
                />
                <Text style={styles.countryText}>
                  {state.currentCountry?.country}
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
                    backgroundColor: visitedHere
                      ? "rgba(80, 0, 116, 0.7)"
                      : "#fff",
                  },
                ]}
              >
                <VisitedIcon width="25" height="25" active={visitedHere} />
                <Text
                  style={[
                    styles.actionButtonsText,
                    {
                      color: visitedHere ? "#fff" : "#898B93",
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
                    backgroundColor: livedHere
                      ? "rgba(0, 134, 28, 0.7)"
                      : "#fff",
                  },
                ]}
              >
                <LivedIcon width="25" height="25" active={livedHere} />
                <Text
                  style={[
                    styles.actionButtonsText,
                    {
                      color: livedHere ? "#fff" : "#898B93",
                    },
                  ]}
                >
                  Lived
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => pickImages()}
                style={styles.actionButton}
              >
                {state.isSelectingImages ? (
                  <ActivityIndicator />
                ) : (
                  <>
                    <ImagesIcon width="25" height="25" active={false} />
                    <Text style={styles.actionButtonsText}>Add stories</Text>
                  </>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </Modalize>
      </Portal>
      <Portal>
        <Modalize
          ref={memoriesModalRef}
          // modalTopOffset={65}
          adjustToContentHeight
          // onClose={() => handleResetMap()}
          // closeOnOverlayTap={false}
          HeaderComponent={
            <View style={styles.memoriesModalHeader}>
              <View style={styles.currentCountry}>
                <ImageBackground
                  resizeMode="cover"
                  style={{
                    width: 25,
                    height: 15,
                  }}
                  source={state.imagePath} // Set the image source
                />
                <Text style={styles.countryText}>
                  {currentCountry?.country}
                </Text>
              </View>

              <TouchableOpacity
                style={styles.importImagesButton}
                onPress={() => handleImportImages()}
              >
                <Text style={styles.importImagesButtonText}>Import</Text>
                <AnchorRightIcon />
              </TouchableOpacity>
            </View>
          }
          childrenStyle={{
            minHeight: "50%",
          }}
          style={{ minHeight: "50%" }}
        >
          <AddMemoriesModal
            images={state.pickedImages}
            setPickedImages={setPickedImages}
            pickImages={pickImages}
            isSelectingImages={state.isSelectingImages}
          />
        </Modalize>
      </Portal>

      <Portal>
        <Modalize
          ref={galleryRef}
          modalTopOffset={0}
          withHandle={false}
          disableScrollIfPossible
          onClose={() => setActiveSlide({ index: 0 })}
          modalStyle={{
            minHeight: "100%",
            backgroundColor: "#000",
            flex: 1,
          }}
          scrollViewProps={{
            alwaysBounceVertical: false,
          }}
        >
          <View style={styles.galleryHeader}>
            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.galleryImageDeleteButton}
            >
              <TrashIcon color="#fff" width="17" />
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.closeGalleryButton}
              onPress={() => galleryRef?.current?.close()}
            >
              <XIcon color="#fff" />
            </TouchableOpacity>
          </View>

          <Carousel
            ref={carouselRef}
            data={images}
            renderItem={RenderItem}
            sliderWidth={SIZES.width}
            itemWidth={SIZES.width}
            inactiveSlideShift={0}
            onSnapToItem={(index) => setActiveSlide({ index })}
            useScrollView={true}
          />
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            resizeMode="cover"
            style={{
              position: "absolute",
              bottom: 50,
              width: "100%",
              paddingHorizontal: 15,
            }}
            contentContainerStyle={{
              justifyContent: "center",
              flexDirection: "row",
              flexGrow: 1,
            }}
          >
            {images?.map((item, ind) => (
              <TouchableOpacity
                key={`images-${ind}`}
                activeOpacity={0.7}
                style={{
                  borderColor:
                    activeSlide?.index === ind
                      ? "#fff"
                      : "rgba(255, 255, 255, 0.1)",
                  borderWidth: 2,
                  borderRadius: 10,
                  marginRight: 8,
                  overflow: "hidden",
                }}
                onPress={() => carouselRef?.current?.snapToItem(ind)}
              >
                <Image
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: 8,
                    overflow: "hidden",
                  }}
                  source={{
                    uri: item?.url,
                  }}
                  // placeholder={blurhash}
                  contentFit="cover"
                  transition={1000}
                />
              </TouchableOpacity>
            ))}
          </ScrollView>
        </Modalize>
      </Portal>
    </>
  );
};
export default MyWorldScreen;
const styles = StyleSheet.create({
  galleryHeader: {
    paddingTop: 55,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    position: "absolute",
    zIndex: 1,
    width: "100%",
  },
  galleryImageDeleteButton: {
    borderColor: "#000",
    borderRadius: 50,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 0,
    borderColor: "#000",
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  closeGalleryButton: {
    width: 40,
    height: 40,
    borderWidth: 0,
    borderColor: "#000",
    borderRadius: 50,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    alignItems: "center",
    justifyContent: "center",
  },
  currentCountry: {
    flexDirection: "row",
    alignItems: "center",
  },
  importImagesButton: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    paddingRight: 8,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "#000",
    flexDirection: "row",
    alignItems: "center",
  },
  importImagesButtonText: {
    fontSize: 14,
    color: "#000",
  },
  memoriesModalHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 15,
  },
  countryText: {
    marginLeft: 10,
    fontSize: 14,
    fontWeight: "bold",
  },
  countryTextLabel: {
    color: "#333",
    fontSize: 20,
    fontWeight: "bold",
    marginRight: 15,
  },
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
