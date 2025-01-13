import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AnyAction,ThunkDispatch } from "@reduxjs/toolkit";
import { Image } from "expo-image";
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  ImageBackground,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import MapView, {
  Geojson,
  GeojsonProps,
  MapPressEvent,
  PROVIDER_GOOGLE,
} from "react-native-maps";
import { Modalize } from "react-native-modalize";
import { Portal } from "react-native-portalize";
import Carousel from "react-native-snap-carousel";
import { useDispatch } from "react-redux";

import { deleteImage, uploadImage } from "../../api/api.file";
import {
  trekSpotApi,
  useCreateOrUpdateStoriesMutation,
  useMeQuery,
  useStoriesQuery,
  useUpdateMeMutation,
} from "../../api/api.trekspot";
import { StoriesResponseType, StoryType } from "../../api/api.types";
import { AddMemoriesModal } from "../../common/components/AddMemoriesModal";
import { CarouselItem } from "../../components/world/CarouselItem";
import { VisitedCountryItem } from "../../components/world/VisitedCountryItem";
import { MyWorldRouteStackParamList } from "../../routes/world/MyWorldRoutes";
import { customMapStyle } from "../../styles/mapView.style";
import { COLORS, SIZES } from "../../styles/theme";
import { getCountry } from "../../utilities/countries";
import { CountriesList, ICountry } from "../../utilities/countryList";
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

type HomeProps = NativeStackScreenProps<MyWorldRouteStackParamList, "World">;

interface ILocation {
  type: string;
  features: any[];
}

const MyWorldScreen: React.FC<HomeProps> = ({ navigation }) => {
  const dispatch = useDispatch<ThunkDispatch<any, any, AnyAction>>();
  const mapRef = useRef<any>(null);
  const carouselRef = useRef<any>(null);
  const countryDetailModalRef = useRef<any>(null);
  const galleryRef = useRef<any>(null);
  const memoriesModalRef = useRef<any>(null);
  //
  const { data, isLoading, isSuccess } = useMeQuery();
  //
  const [updateMe, { isSuccess: isUpdateMeSuccess, data: updateMeData }] =
    useUpdateMeMutation();
  //
  const [
    createOrUpdateStories,
    { isSuccess: isStoriesUpdateSuccess, isLoading: isStoriesUpdateLoading },
  ] = useCreateOrUpdateStoriesMutation();
  const {
    data: storiesData,
    isLoading: isStoriesLoading,
    isSuccess: isStoriesSuccess,
  } = useStoriesQuery();

  const [state, setState] = useState<{
    story: StoryType | null;
    isDeleteImageLoading: boolean;
    isSelectingImages: boolean;
    lived_countries: ICountry[];
    visited_countries: ICountry[];
    currentCountry: Location.LocationGeocodedAddress | null;
    location: ILocation | null;
    imagePath: any;
    pickedImages: ImagePicker.ImagePickerResult["assets"] | null;
    activeSliderIndex: number;
  }>({
    story: null,
    isSelectingImages: false,
    isDeleteImageLoading: false,
    lived_countries: [],
    visited_countries: [],
    currentCountry: null,
    location: null,
    imagePath: null,
    pickedImages: null,
    activeSliderIndex: -1,
  });

  const fillLivedAndVisitedCountries = useCallback(() => {
    if (!isSuccess || !data) return;

    const { lived_countries, visited_countries } = data.me;
    let lived: any = lived_countries.map((i) => i.iso2);
    let visited: any = visited_countries.map((i) => i.iso2);

    visited = visited.map((i: string) => {
      lived = lived.filter((j: string) => j !== i);
      return CountriesList.find((c) => c.iso2 === i);
    });

    lived = lived.map((i: string) => CountriesList.find((c) => c.iso2 === i));

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

  // const [activeSlide, setActiveSlide] = useState({ index: 0 });

  const onCountryDetailOpen = useCallback(() => {
    countryDetailModalRef.current?.open();
  }, []);

  const onMemoriesDetailOpen = () => {
    memoriesModalRef.current?.open();
  };

  const onGalleryOpen = useCallback((story: StoryType) => {
    if (!story) return;
    setState((prevState) => ({ ...prevState, story }));
    galleryRef.current?.open();
  }, []);

  const handleMapPress = async (event: MapPressEvent) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    try {
      const [currentCountry] = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });

      const result = getCountry(currentCountry.isoCountryCode);
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
    } catch (error) {}
  };
  const handleResetMap = useCallback(() => {
    setState((prevState) => ({
      ...prevState,
      currentCountry: null,
      imagePath: null,
      location: null,
    }));
  }, []);

  const handleBeen = useCallback(() => {
    if (!state.currentCountry || !data || !state.currentCountry.isoCountryCode)
      return;
    const visited_countries = data.me.visited_countries.map((i) => i.iso2);
    const lived_countries = data.me.lived_countries.map((i) => i.iso2);

    if (
      !visited_countries.find(
        (i) => state.currentCountry && i === state.currentCountry.isoCountryCode
      )
    ) {
      visited_countries.push(state.currentCountry.isoCountryCode);

      // const currentVisited_countries: ICountry[] = [];
      // const currentLived_countries: ICountry[] = [];

      // visited_countries.forEach((i) => {
      //   let current = CountriesList.find((c) => c.iso2 === i);
      //   if (current) {
      //     currentVisited_countries.push(current);
      //   }
      // });
      // lived_countries.forEach((i) => {
      //   let current = CountriesList.find((c) => c.iso2 === i);
      //   if (current) {
      //     currentLived_countries.push(current);
      //   }
      // });

      // setState((prevState) => ({
      //   ...prevState,
      //   visited_countries: currentVisited_countries,
      //   lived_countries: currentLived_countries,
      // }));

      updateMe({ visited_countries, lived_countries });
    }
  }, [data, state.currentCountry]);

  const handleLived = useCallback(() => {
    if (!state.currentCountry || !data || !state.currentCountry.isoCountryCode)
      return;
    const lived_countries = data.me.lived_countries.map((i) => i.iso2);
    const visited_countries = data.me.visited_countries.map((i) => i.iso2);

    if (
      !lived_countries.find(
        (i) => state.currentCountry && i === state.currentCountry.isoCountryCode
      )
    ) {
      lived_countries.push(state.currentCountry.isoCountryCode);
      updateMe({ lived_countries, visited_countries });
    }
  }, [data, state.currentCountry]);

  const pickImages = async () => {
    setState((prevSate) => ({
      ...prevSate,
      isSelectingImages: true,
      pickedImages: null,
    }));
    const result = await ImagePicker.launchImageLibraryAsync({
      exif: true,
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
    const { pickedImages, currentCountry } = state;
    if (!pickedImages || !currentCountry) return;
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

      const images = (await uploadImage(formData)) as string[];

      if (currentCountry.isoCountryCode)
        createOrUpdateStories({ images, iso2: currentCountry.isoCountryCode });

      setState((prevState) => ({
        ...prevState,
        isSelectingImages: false,
        pickedImages: null,
        currentCountry: null,
      }));
      if (countryDetailModalRef.current) countryDetailModalRef.current.close();
    } catch (error) {
      setState((prevState) => ({ ...prevState, isSelectingImages: false }));
    }

    memoriesModalRef.current?.close();
  }, [state]);

  const handleTrashImage = useCallback(async () => {
    let { activeSliderIndex, story } = state;

    if (!story || !story.images.length) return;

    activeSliderIndex = activeSliderIndex == -1 ? 0 : activeSliderIndex;

    const image = story.images[activeSliderIndex];

    if (!image || !image.id) return;

    try {
      setState((prevState) => ({ ...prevState, isDeleteImageLoading: true }));

      await deleteImage(image.id);
      setState((prevState) => ({
        ...prevState,
        isDeleteImageLoading: false,
        story: prevState.story
          ? {
              ...prevState.story,
              images: prevState.story.images.filter((im) => im.id !== image.id),
            }
          : null,
      }));
      dispatch(
        trekSpotApi.util.updateQueryData(
          "stories",
          undefined,
          (res: StoriesResponseType) => {
            const currentStories = res.stories.find(
              (s) => s.iso2 === story.iso2
            );
            if (currentStories) {
              currentStories.images = currentStories.images.splice(
                activeSliderIndex,
                1
              );
            }
            // stories.splice(activeSliderIndex, 1);
            // return stories;
          }
        )
      );
    } catch (error) {
      setState((prevState) => ({ ...prevState, isDeleteImageLoading: false }));
    }
  }, [state]);

  // useEffect(() => {
  //   (async () => {
  //     let { status } = await Location.requestForegroundPermissionsAsync();
  //     if (status !== "granted") {

  //       return;
  //     }

  //     let location = await Location.getCurrentPositionAsync({});
  //     // setState((prevState) => ({ ...prevState, location }));
  //   })();
  // }, []);

  useEffect(() => {
    if (isStoriesUpdateSuccess) {
      dispatch(trekSpotApi.util.invalidateTags(["stories", "me", "analytics"]));
    }
  }, [isStoriesUpdateSuccess]);

  useEffect(() => {
    if (isUpdateMeSuccess) {
      dispatch(trekSpotApi.util.invalidateTags(["me", "analytics"]));
    }
  }, [isUpdateMeSuccess]);

  /*
   * Transform data
   */

  const visitedHere =
    state.currentCountry &&
    state.visited_countries.find(
      (place) => place.iso2 === state.currentCountry?.isoCountryCode
    );

  const livedHere =
    state.currentCountry &&
    state.lived_countries.find(
      (place) => place.iso2 === state.currentCountry?.isoCountryCode
    );

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
          // showsUserLocation={true}
          customMapStyle={customMapStyle}
          mapType="standard"
          // onSnapToItem={() => alert("ss")}
        >
          {state.location && (
            <Geojson
              geojson={state.location as GeojsonProps["geojson"]} // geojson of the countries you want to highlight
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
          {state.visited_countries.map((item) => {
            const story =
              storiesData &&
              storiesData.stories &&
              storiesData.stories.find((story) => story.iso2 === item.iso2);
            return (
              <VisitedCountryItem
                key={`marker-visited_countries-${item.iso2}`}
                item={item}
                story={story}
                onGalleryOpen={onGalleryOpen}
              />
            );
          })}
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
                <VisitedIcon width={25} height={25} active={!!visitedHere} />
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
                <LivedIcon width={25} height={25} active={!!livedHere} />
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
                  <ActivityIndicator color={COLORS.primaryDark} />
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
                  {state.currentCountry?.country}
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
          //@ts-ignore
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
          onClose={() =>
            setState((prevState) => ({
              ...prevState,
              activeSliderIndex: 0,
            }))
          }
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
              onPress={handleTrashImage}
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
            //@ts-ignore
            data={state.story && state.story.images}
            //@ts-ignore
            renderItem={CarouselItem}
            sliderWidth={SIZES.width}
            itemWidth={SIZES.width}
            inactiveSlideShift={0}
            onSnapToItem={(index) =>
              setState((prevState) => ({
                ...prevState,
                activeSliderIndex: index,
              }))
            }
            useScrollView={true}
          />
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
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
            {state.story &&
              state.story.images.map((item, ind) => (
                <TouchableOpacity
                  key={`images-${ind}`}
                  activeOpacity={0.7}
                  style={{
                    borderColor:
                      state.activeSliderIndex === ind
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
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    paddingTop: 55,
    position: "absolute",
    width: "100%",
    zIndex: 1,
  },
  galleryImageDeleteButton: {
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderColor: "#000",
    borderRadius: 50,
    borderWidth: 0,
    flexDirection: "row",
    height: 40,
    justifyContent: "center",
    width: 40,
  },
  closeGalleryButton: {
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderColor: "#000",
    borderRadius: 50,
    borderWidth: 0,
    height: 40,
    justifyContent: "center",
    width: 40,
  },
  currentCountry: {
    alignItems: "center",
    flexDirection: "row",
  },
  importImagesButton: {
    alignItems: "center",
    borderColor: "#000",
    borderRadius: 30,
    borderWidth: 1,
    flexDirection: "row",
    paddingHorizontal: 15,
    paddingRight: 8,
    paddingVertical: 8,
  },
  importImagesButtonText: {
    color: "#000",
    fontSize: 14,
  },
  memoriesModalHeader: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
  },

  countryTextLabel: {
    color: "#333",
    fontSize: 20,
    fontWeight: "bold",
    marginRight: 15,
  },
  actionButtons: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 40,
    marginTop: 35,
  },
  actionButton: {
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    elevation: 5,
    justifyContent: "center",
    minHeight: 90,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    width: "30%",
  },
  actionButtonsText: {
    color: "#898B93",
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 15,
  },
  mapCountryWrapper: {
    padding: 15,
  },
  mapCountryWrapperHeader: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  leftItems: {
    alignItems: "center",
    flexDirection: "row",
  },
  // countryText: {
  //   fontSize: 26,
  //   fontWeight: "bold",
  //   color: "#000",
  //   marginLeft: 8,
  // },
  countryText: {
    fontSize: 14,
    fontWeight: "bold",
    marginLeft: 10,
  },
  backButton: {
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 100,
    display: "flex",
    height: 40,
    justifyContent: "center",
    width: 40,
    ...COLORS.shadow,
    left: 15,
    position: "absolute",
    top: 55,
    zIndex: 1,
  },
  closeButton: {
    alignItems: "center",
    backgroundColor: "#000",
    borderRadius: 100,
    display: "flex",
    elevation: 5,
    height: 35,
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    width: 35,
  },
  rowItem: {
    marginTop: 30,
    paddingHorizontal: 15,
    width: "100%",
  },
  map: {
    flex: 1,
  },
  h2: {
    color: "#000",
    fontSize: 22,
    fontWeight: "bold",
  },
  container: {
    backgroundColor: "#fff",
    flex: 1,
  },
  mapContainer: {
    backgroundColor: "#f8fafb",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  contentBox: {
    marginTop: 15,
    width: "100%",
  },
  box: {
    backgroundColor: "#fafafa",
    borderRadius: 15,
    height: 100,
    marginRight: 15,
    width: 200,
  },
  topActions: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 15,
    paddingHorizontal: 15,
    width: "100%",
  },
  left: {
    display: "flex",
    flexDirection: "row",
  },
  row: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
    marginTop: 0,
    paddingHorizontal: 15,
  },
  rowBox: {
    alignItems: "center",
    backgroundColor: "#f8fafb",
    borderColor: "#fff",
    borderRadius: 15,
    borderStyle: "solid",
    borderWidth: 0,
    display: "flex",
    height: 90,
    justifyContent: "center",
    width: "32%",
  },
  lg: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  btn: {
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 15,
    display: "flex",
    flexDirection: "row",
    height: 30,
    justifyContent: "center",
    paddingHorizontal: 15,
  },
  txt: {
    fontSize: 14,
    marginLeft: 5,
  },
});
