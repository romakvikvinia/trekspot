import * as Haptics from "expo-haptics";
import { useMemo, useRef, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import Animated, {
  Easing,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

import { COLORS } from "../../../styles/theme";
import {
  CloseCircleIcon,
  LocationLinearIcon,
  PlusIcon,
} from "../../../utilities/SvgIcons.utility";
import { SearchIcon } from "../../../utilities/SvgIcons.utility";
import { DestinationSuggestions } from "./DestinationSuggestions";
import { SelectedDestinations } from "./SelectedDestinations";

export const CreateTripDestinationStep = ({
  index = 0,
  setActiveIndex,
  setTripData,
  tripData,
}) => {
  const ref = useRef(null);
  const [clearVisible, setClearVisible] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const height = useMemo(() => {
    if(tripData.destinations.length > 1) {
      return 360;
    } 
    return 420
  },[tripData.destinations]);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      height:
        index === 0
          ? withTiming(height, {
              duration: 300,
              easing: Easing.bezier(0.25, 0.1, 0.25, 1.0),
            })
          : withTiming(0, {
              duration: 300,
              easing: Easing.bezier(0.25, 0.1, 0.25, 1.0),
            }),
      opacity:
        index === 0
          ? withTiming(1, {
              duration: 300,
              easing: Easing.bezier(0.25, 0.1, 0.25, 1.0),
            })
          : withTiming(0, {
              duration: 300,
              easing: Easing.bezier(0.25, 0.1, 0.25, 1.0),
            }),
    };
  });

  const handleReset = () => {
    if (ref.current) {
      ref.current.clear();
      ref.current.setAddressText("");
      setIsTyping(false);
    }
  };

  const handlePlaceSelect = (selectedData, selectedDetails) => {
    handleReset();
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

    // Construct the new city object
    const newCity = {
      destination: {
        name: selectedDetails?.name || null,
        description: selectedData?.description || null,
        place_id: selectedData?.place_id || null,
        structured_formatting: selectedData?.structured_formatting || null,
        address_components: selectedDetails?.address_components || null,
        formatted_address: selectedDetails?.formatted_address || null,
        geometry: selectedDetails?.geometry || null,
        utc_offset: selectedDetails?.utc_offset || null,
        vicinity: selectedDetails?.vicinity || null,
      },
      dates: {
        startDate: null,
        endDate: null,
      },
      days: null,
    };

    setTripData({
      ...tripData,
      destinations: [...tripData.destinations, newCity],
    });
  };

  const resetWhereTo = () => {
    setTripData({
      ...tripData,
      destinations: [],
    });
  };
 

  return (
    <View style={styles.accordion}>
      <TouchableOpacity activeOpacity={0.7} onPress={() => setActiveIndex(0)} style={styles.header}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            minHeight: 30,
          }}
        >
          <Text style={[styles.title,{
            fontSize: index === 0 ? 24 : 16,
            color: index === 0 ? COLORS.black : COLORS.gray
          }]}>
            Where to?
          </Text>
          {
            index !== 0 && (
              <Text style={styles.selectedPlaces}>{tripData?.destinations?.length} places</Text>
            )
          }
        </View>
      </TouchableOpacity>
      <Animated.View style={[styles.body, animatedStyles]}>
        <View style={styles.searchContainer}>
          {/* <GooglePlacesAutocomplete
            ref={ref}
            autoFocus={false}
            placeholder="Search cities, places"
            minLength={2}
            fetchDetails={true} //This should be true if we want to get more details about place
            debounce={200}
            keepResultsAfterBlur={true}
            GooglePlacesDetailsQuery={{
              fields:
                "address_components,geometry,formatted_address,name,place_id,vicinity,types,utc_offset",
            }}
            renderLeftButton={() => (
              <Pressable
                style={styles.icon}
                hitSlop={15}
                // onPress={handleCancel}
              >
                <SearchIcon width="18" />
              </Pressable>
            )}
            renderRightButton={() => (
              <Pressable
                style={[
                  styles.resetButton,
                  {
                    display:
                      ref.current?.getAddressText()?.length > 0
                        ? "flex"
                        : "none",
                  },
                ]}
                onPress={handleReset}
                hitSlop={20}
                key={Math.random()}
              >
                <CloseCircleIcon color="#86858c" size="15" />
              </Pressable>
            )}
            onPress={(data, details = null) => handlePlaceSelect(data, details)}
            onFail={(error) => console.error(error)}
            onNotFound={(error) => renderNotFound()}
            autoFillOnNotFound={true}
            listViewDisplayed={true}
            disableScroll={true}
            keyboardShouldPersistTaps="handled"
            listLoaderComponent={
              <View style={{ padding: 10, alignItems: "center" }}>
                <ActivityIndicator size="small" color="##000" />
              </View>
            }
            textInputProps={{
              placeholderTextColor: COLORS.gray,
              autoFocus: false,
              onChangeText: (text) => {
                if (text?.length > 0) {
                  setClearVisible(true);
                  setIsTyping(true);
                } else {
                  setClearVisible(false);
                  setIsTyping(false);
                }
              },
            }}
            query={{
              key: "AIzaSyDKZ8yCRk84OAV-57khymju5GI8Vhu4EGY",
              // key: "AIzaSyD3NwQOhUu_vCAQt6iJ7jtwH7RiABs8rzU",
              language: "en",
              // types: "(regions)",
              // sessiontoken: sessionToken, //This sessiontoken is for not to send request everytime; currently removed packages
            }}
            renderRow={(data, index) => index < 3 && (
              <View style={styles.rowItem}>
                <View style={styles.box}>
                  <LocationLinearIcon color="#3c4043" size="15" />
                </View>
                <View style={styles.gradientWrapper}>
                  <View
                    style={[
                      styles.labelItem,
                      {
                        flexDirection: "column",
                        justifyContent: "flex-start",
                        alignItems: "flex-start",
                      },
                    ]}
                  >
                    <Text style={[styles.labelItemText]}>
                      {data.description}
                    </Text>
                  </View>

                  <PlusIcon color={COLORS.darkgray} size="15" />
                </View>
              </View>
            )}
            listUnderlayColor="#fafafa"
            placeholderTextColor="#71767a"
            styles={{
              textInputContainer: {
                width: "100%",
                borderRadius: 6,
                paddingTop: 5,
                alignItems: "center",
                flexDirection: "row",
                color: "#000",
                fontSize: 15,
                fontWeight: "400",
                borderWidth: 1,
                borderColor: "#8c8c8c",
              },
              description: {
                fontWeight: "500",
              },
              predefinedPlacesDescription: {
                color: "#707579",
              },
              textInput: {
                color: COLORS.black,
                height: 40,
                fontSize: 16,
                fontWeight: "500",
                backgroundColor: "transparent",
                paddingLeft: 15,
              },
              listView: {
                backgroundColor: "transparent",
                marginTop: 10,
              },
              row: {
                backgroundColor: "transparent",
                padding: 0,
                height: "auto",
                borderBottomWidth: 0,
                // borderBottomColor: "#f2f2f7",
                alignItems: "center",
                paddingVertical: 0,
              },
              separator: {
                backgroundColor: "#dedee0",
                height: 0,
              },
            }}
            enablePoweredByContainer={false}
            isRowScrollable={false}
          /> */}
        </View>
        {tripData?.destinations?.length < 1 && !isTyping && (
          <DestinationSuggestions />
        )}
        
        {tripData.destinations.length > 0 && !isTyping ? ( 
          <SelectedDestinations tripData={tripData} setTripData={setTripData} />
        ) : null}
        {
        tripData?.destinations?.length > 0 && index === 0 && !isTyping && (
          <View style={styles.actionsRow}>
            <Pressable style={styles.actionButtonReset} onPress={resetWhereTo}>
              <Text style={styles.actionButtonResetText}>Reset</Text>
            </Pressable>
            <Pressable style={styles.actionButtonNext} onPress={() => setActiveIndex(1)}>
              <Text style={styles.actionButtonNextText}>Next</Text>
             </Pressable>
          </View>
        )}
      </Animated.View>
    </View>
  );
};
const styles = StyleSheet.create({
  accordion: {
    backgroundColor: "#fff",
    borderColor: "#e1e1e1",
    borderRadius: 15,
    elevation: 6,
    marginBottom: 18,
    marginTop: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  actionButtonNext: {
    alignItems: "center",
    backgroundColor: COLORS.black,
    borderRadius: 10,
    height: 40,
    justifyContent: "center",
    padding: 10,
    paddingHorizontal: 30,
  },
  actionButtonNextText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
  },
  actionButtonResetText: {
    fontSize: 16,
    fontWeight: "500",
    textDecorationLine: "underline",
  },
  actionsRow: {
    alignItems: "center",
    backgroundColor: "#fff",
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    borderColor: "#ddd",
    borderTopWidth: 1,
    bottom: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    left: 0,
    paddingHorizontal: 20,
    paddingVertical: 15,
    position: "absolute",
    right: 0,
  },
  body: {
    padding: 0,
    position: "relative",
  },
  box: {
    alignItems: "center",
    backgroundColor: "#f2f2f2",
    borderRadius: 100,
    height: 30,
    justifyContent: "center",
    marginRight: 5,
    overflow: "hidden",
    width: 30,
  },
  gradientWrapper: {
    alignItems: "center",
    borderBottomColor: "#f2f2f7",
    borderBottomWidth: 1,
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 15,
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    position: "relative",
    zIndex: 1
  },
  icon: {
    marginLeft: 15,
    padding: 0,
    position: "relative",
    top: -3,
  },
  labelItem: {
    alignItems: "center",
    flexDirection: "row",
    marginBottom: 2,
    maxWidth: "90%",
    padding: 10,
    paddingVertical: 0,
  },
  labelItemText: {
    color: "#000",
    fontSize: 14,
    fontWeight: "500",
    marginLeft: 0,
  },
  resetButton: {
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    height: 50,
    justifyContent: "center",
    paddingLeft: 10,
    paddingRight: 15,
    position: "absolute",
    right: 0,
    top: 0,
  },
  rowItem: {
    alignItems: "center",
    flexDirection: "row",
  },
  searchContainer: {
    flexDirection: "row",
    minWidth: "100%",
    paddingHorizontal: 20,
    position: "relative",
    width: "100%",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
});
