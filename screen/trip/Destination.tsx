import { addDays, differenceInDays } from "date-fns";
import Constants from "expo-constants";
import * as Haptics from "expo-haptics";
import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Pressable,
  StyleSheet,
  View,
} from "react-native";
import { Text } from "react-native";
import DraggableFlatList from "react-native-draggable-flatlist";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import Svg, { Circle } from "react-native-svg";

import { CityType } from "../../api/api.types";
import { COLORS, SIZES } from "../../styles/theme";
import {
  BackIcon,
  CloseCircleIcon,
  DraggableIcon,
  LocationLinearIcon,
  MinusIcon,
  PlusIcon,
} from "../../utilities/SvgIcons.utility";

// import 'react-native-get-random-values';

// import { v4 as uuidv4 } from 'uuid';

interface IDestinationProps {
  onDestinationModalClose: (city?: CityType, cities?: string[]) => void;
}

export const ItineraryHeader = ({ tripRange, calculateTotalNights, setOpen }) => {
  const totalNights = moment(tripRange.endDate).diff(moment(tripRange.startDate), "days");
  const currentNights = calculateTotalNights();
  const percentage =
    totalNights === 0 ? 0 : (currentNights / totalNights) * 100;

  const radius = 20; // radius of the circle
  const strokeWidth = 3; // width of the stroke
  const circumference = 2 * Math.PI * radius; // circumference of the circle

  // Calculate the stroke dash offset based on the percentage
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  // Determine the color based on whether the nights exceed the range
  const progressColor = currentNights > totalNights ? "#f44336" : COLORS.primary; // red if exceeded, green otherwise


  return (
    <View
      style={{
        height: 65,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Pressable onPress={() => setOpen(true)}>
        <Text style={styles.titleH2}>Itinerary</Text>
        <Text style={styles.subTitle}>{moment(tripRange.startDate).format("DD MMM")} - {moment(tripRange.endDate).format("DD MMM")}</Text>
      </Pressable>

      <View style={styles.rgHeader}>
        <Text
          style={[
            styles.titleH2,
            { fontSize: 14, marginBottom: 0, marginRight: 50, },
          ]}
        >
          Nights
        </Text>
        <View style={styles.circleContainer}>
          <Svg width="110" height="110">
            <Circle
              cx="55"
              cy="55"
              r={radius}
              stroke={currentNights > totalNights ? "#f44336" : "#e0e0e0"} // red or gray background
              strokeWidth={strokeWidth}
              fill="none"
            />
            <Circle
              cx="55"
              cy="55"
              r={radius}
              stroke={progressColor} // dynamic color for progress
              strokeWidth={strokeWidth}
              fill="none"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              rotation="-90"
              origin="55, 55"
            />
          </Svg>
          <Text style={styles.nightText}>
            {currentNights}/{totalNights}
          </Text>
        </View>
      </View>
    </View>
  );
};

export const Destination: React.FC<IDestinationProps> = ({
  onDestinationModalClose,
  formik,
  setOpen
}) => {

  const [destinationSelected, setDestinationSelected] = useState<Array<string>>(
    [ ]
  );
  const [isTyping, setIsTyping] = useState(false);
  const [tripRange, setTripRange] = useState({
    startDate: null,
    endDate: null
  });
  // const [sessionToken, setSessionToken] = useState(uuidv4());

  // const [fetchData, { isLoading, isError, data }] = useLazySearchCitiesQuery();
  const [clearVisible, setClearVisible] = useState(false);
  const ref = useRef(null);

  console.log("formik -",formik?.values?.range)


  useEffect(() => {
    setTripRange({
      startDate: formik?.values?.range?.startDate || null,
      endDate: formik?.values?.range?.endDate || null,
    })
  }, [formik])

  console.log("tripRange",tripRange)
 

  const handleSave = () => {
    onDestinationModalClose(destinationSelected[0], destinationSelected);
    setDestinationSelected([]);
  };

  const removeSelectedCity = (cityItem) => {
    setDestinationSelected((prevSelected) => {
      const updatedCities = prevSelected.filter(
        (place) => place.destination.name !== cityItem.destination.name
      );

      console.log("updatedCities",prevSelected, cityItem)

      // Adjust the ranges for the remaining cities
      for (let i = 0; i < updatedCities.length; i++) {
        const previousCityTo =
          i === 0
            ? new Date(tripRange.startDate)
            : new Date(updatedCities[i - 1].dates.endDate);
        const currentCityRange =
          new Date(updatedCities[i].dates.endDate) -
          new Date(updatedCities[i].dates.startDate);
        const rangeDays = currentCityRange / (1000 * 60 * 60 * 24); // Range in days

        const newFrom = new Date(previousCityTo.getTime());
        const newTo = new Date(newFrom.getTime());
        newTo.setDate(newFrom.getDate() + rangeDays);

        updatedCities[i] = {
          ...updatedCities[i],
          dates: {
            startDate: newFrom.toISOString(),
            endDate: newTo.toISOString(),
          },
        };
      }

      // Determine min and max dates after city removal
      if (updatedCities.length > 0) {
        const minDate = new Date(
          Math.min(
            ...updatedCities.map((d) => new Date(d.dates.startDate).getTime())
          )
        );
        const maxDate = new Date(
          Math.max(
            ...updatedCities.map((d) => new Date(d.dates.endDate).getTime())
          )
        );

        // Update trip range **only if maxDate is less than initial endDate**
        setTripRange((prevTripRange) => {
          if (
            !formik?.values?.range?.endDate ||
            maxDate < new Date(formik?.values?.range?.endDate)
          ) {
            return {
              startDate: minDate.toISOString(),
              endDate: maxDate.toISOString(),
            };
          }
          return prevTripRange; // Keep previous tripRange if condition isn't met
        });
      } else {
        // Reset trip range if no cities are left
        setTripRange({ startDate: null, endDate: null });
      }

      return updatedCities;
    });
  
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  };
   
  const handleCancel = () => {
    onDestinationModalClose();
    setDestinationSelected([]);
  };

  // const NotFound = {
  //   return (
  //     <View style={styles.notesWarning}>
  //       <NotFound text="Can't find destination? No worries! We're adding new ones every day, so check back soon" />
  //     </View>
  //   );
  // }

  const handleDragEnd = ({ data }) => {
    setDestinationSelected(() => {
      const updatedCities = [...data];

      for (let i = 0; i < updatedCities.length; i++) {
        const previousCityTo =
          i === 0
            ? new Date(tripRange.startDate)
            : new Date(updatedCities[i - 1].dates.endDate);
        const currentCityRange =
          new Date(updatedCities[i].dates.endDate) - new Date(updatedCities[i].dates.startDate);
        const rangeDays = currentCityRange / (1000 * 60 * 60 * 24); // Range in days

        const newFrom = new Date(previousCityTo.getTime());
        const newTo = new Date(newFrom.getTime());
        newTo.setDate(newFrom.getDate() + rangeDays);

        updatedCities[i] = {
          ...updatedCities[i],
          dates: {
            startDate: newFrom.toISOString(),
            endDate: newTo.toISOString(),
          }
        };
      }
  
      return updatedCities;
    });
  };

  const updateCityNights = (city, action) => {
    setDestinationSelected((prevSelected) => {
      const updatedCities = [...prevSelected];
      let adjustmentDays = 0;

      for (let i = 0; i < updatedCities.length; i++) {
        const current = updatedCities[i];
        const fromDate = new Date(current.dates.startDate);
        const toDate = new Date(current.dates.endDate);
      
        if (current.destination.name === city) {
          // Adjust the range of the selected city
          if (action === "increment") {
            toDate.setDate(toDate.getDate() + 1);
            adjustmentDays = 1;
          } else if (action === "decrement" && toDate > fromDate) {
            const currentRangeDays = (toDate - fromDate) / (1000 * 60 * 60 * 24);
            if (currentRangeDays > 1) {
              toDate.setDate(toDate.getDate() - 1);
              adjustmentDays = -1;
            }
          }
      
          // Update current city
          updatedCities[i] = {
            ...current,
            dates: {
              startDate: fromDate.toISOString(),
              endDate: toDate.toISOString(),
            },
          };
        }
      
        // Adjust subsequent cities based on previous city's new endDate
        if (adjustmentDays !== 0 && i < updatedCities.length - 1) {
          const prevCity = updatedCities[i];
          const prevCityEnd = new Date(prevCity.dates.endDate);
      
          const nextCity = updatedCities[i + 1];
          const nextCityDuration =
            (new Date(nextCity.dates.endDate) - new Date(nextCity.dates.startDate)) /
            (1000 * 60 * 60 * 24); // Keep original range
      
          // New start date = previous city's end date
          const newStart = new Date(prevCityEnd.getTime());
          const newEnd = new Date(newStart.getTime());
          newEnd.setDate(newStart.getDate() + nextCityDuration);
      
          updatedCities[i + 1] = {
            ...nextCity,
            dates: {
              startDate: newStart.toISOString(),
              endDate: newEnd.toISOString(),
            },
          };
        }
      }
      
      
      // Update the trip range
      const minDate = new Date(
        Math.min(...updatedCities.map((d) => new Date(d.dates.startDate).getTime()))
      );
      const maxDate = new Date(
        Math.max(...updatedCities.map((d) => new Date(d.dates.endDate).getTime()))
      );
 
      setTripRange((prevTripRange) => {
        // Only update if maxDate is greater than initial endDate
        if (!formik?.values?.range?.endDate || maxDate > new Date(formik?.values?.range?.endDate)) {
          return {
            startDate: minDate.toISOString(),
            endDate: maxDate.toISOString(),
          };
        }
        return prevTripRange;
      });
  

      return updatedCities;
    });
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  };

  const renderItem = ({ item, drag, isActive }) => (
    <Pressable
      onLongPress={() => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        drag();
      }}
      style={[
        styles.item,
        // { backgroundColor: isActive ? '#f0f0f0' : '#fff' },
      ]}
    >
      <View
        style={{ flexDirection: "row", alignItems: "center", maxWidth: "50%" }}
      >
        {destinationSelected?.length > 1 ? <DraggableIcon size={15} /> : null}
        <View style={{ marginLeft: destinationSelected?.length > 1 ? 8 : 0 }}>
          <Text style={styles.city} numberOfLines={1}>
            {item.destination.name}
          </Text>
          <Text style={styles.subText}>
          {moment(item.dates.startDate).format("ddd DD MMM")} -{" "}
          {moment(item.dates.endDate).format("ddd DD MMM")}
          </Text>
        </View>
      </View>
      <View style={styles.rg}>
        <View style={styles.daySwitcher}>
          <Pressable
            style={styles.plusMinusButton}
            hitSlop={10}
            onPress={() => updateCityNights(item.destination.name, "decrement")}
          >
            <MinusIcon size={15} color={
              Math.round(
                (new Date(item.dates.endDate).getTime() - new Date(item.dates.startDate).getTime()) /
                  (1000 * 60 * 60 * 24)
              ) == 1 ? "#ccc" : "#000"
            } />
          </Pressable>
          <View style={styles.nights}>
            <Text style={styles.nightsNumber}>
            {Math.round(
                (new Date(item.dates.endDate).getTime() - new Date(item.dates.startDate).getTime()) /
                  (1000 * 60 * 60 * 24)
              )}
            </Text>
            <Text style={styles.nightsLabel} numberOfLines={1}>
              Nights
            </Text>
          </View>
          <Pressable
            style={styles.plusMinusButton}
            hitSlop={10}
            onPress={() => updateCityNights(item.destination.name, "increment")}
          >
            <PlusIcon color="#000" size={15} />
          </Pressable>
        </View>

        <Pressable
          style={styles.remove}
          hitSlop={10}
          onPress={() => removeSelectedCity(item)}
        >
          <MinusIcon color="#cf3030" size={8} />
        </Pressable>
      </View>
    </Pressable>
  );

  const handleReset = () => {
    if (ref.current) {
      ref.current.clear();
      ref.current.setAddressText("");
      setIsTyping(false);
    }
  };

  const calculateTotalNights = () => {
    // Sum all the nights for each destination
    return destinationSelected.reduce((totalNights, destination) => {
      const fromDate = moment(destination.dates?.startDate);
      const toDate = moment(destination.dates?.endDate);

      // Add the number of nights for this destination
      const numberOfNights = toDate.diff(fromDate, "days");
      return totalNights + numberOfNights;
    }, 0); // Initial totalNights is 0
  };

  const handlePlaceSelect = (selectedData, selectedDetails) => {
    handleReset();
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    // Access current formik values
    const currentCities = destinationSelected || []; // Get existing cities array.
    const initialStartDate = tripRange?.startDate 
      ? new Date(tripRange?.startDate) 
      : new Date(); // Default to today if startDate is not set.
    const initialEndDate = tripRange?.endDate 
      ? new Date(tripRange?.endDate) 
      : addDays(initialStartDate, 1); // Default to 1 day after startDate if endDate is not set.
  
    // Determine the total nights currently available in the range
    const totalNights = differenceInDays(initialEndDate, initialStartDate);
  
    // Determine startDate for the new city
    const lastCity = currentCities[currentCities.length - 1];
    const startDate = lastCity?.dates?.endDate
      ? new Date(lastCity.dates.endDate)
      : initialStartDate;
  
    // Calculate the new city's endDate (one-night range)
    const endDate = addDays(startDate, 1);
  
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
        startDate: startDate.toISOString(), // Format as YYYY-MM-DD
        endDate: endDate.toISOString(), // Format as YYYY-MM-DD
      },
    };
  
    // Check if the current range is sufficient; if not, extend it
    const requiredNights = currentCities.length + 1; // Total places after adding the new city
    const updatedEndDate =
      requiredNights > totalNights
        ? addDays(initialStartDate, requiredNights) // Extend the range dynamically
        : initialEndDate; // Keep the existing range if sufficient
  
    // Update formik values
    setDestinationSelected([...currentCities, newCity])
    // formik.setFieldValue("cities", [...currentCities, newCity]); // Add the new city to the list.
    // formik.setFieldValue("range", {
    //   startDate: initialStartDate.toISOString(),
    //   endDate: updatedEndDate.toISOString(), // Update only if range was extended.
    // });
  };

  return (
    <KeyboardAvoidingView style={styles.safeArea}>
      
      <View style={styles.searchBox}>
        <GooglePlacesAutocomplete
          ref={ref}
          autoFocus={true}
          placeholder="Search cities, places"
          minLength={2}
          fetchDetails={true} //This should be true if we want to get more details about place
          debounce={200}
          keepResultsAfterBlur={true}
          GooglePlacesDetailsQuery={{
            fields: 'address_components,geometry,formatted_address,name,place_id,vicinity,types,utc_offset'
          }}
          renderLeftButton={() => (
            <Pressable style={styles.icon} hitSlop={15} onPress={handleCancel}>
               <BackIcon size="20" />
            </Pressable>
          )}
          renderRightButton={() => (
            <Pressable
              style={{
                position: "absolute",
                right: 0,
                top: 18,
                display:
                  ref.current?.getAddressText()?.length > 0 ? "flex" : "none",
                backgroundColor: "#f2f2f2",
                paddingRight: 15,
                paddingLeft: 10
              }}
              onPress={handleReset}
              hitSlop={20}
              key={Math.random()}
            >
              <CloseCircleIcon color="#86858c" size="15" />
            </Pressable>
          )}
          onPress={(data, details = null) =>
            handlePlaceSelect(data, details) 
          }
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
            autoFocus: true,
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
          renderRow={(data) => (
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
              borderRadius: 30,
              paddingTop: 5,
              alignItems: "center",
              flexDirection: "row",
              backgroundColor: "#f2f2f2",
              borderColor: "#eeeeee",
              borderWidth: 1,
              color: "#000",
              fontSize: 15,
              fontWeight: "400",
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
        />
      </View>
      {/* {isLoading && (
            <View style={{ marginTop: 25 }}>
              <Loader background="#F2F2F7" isLoading={true} size="small" />
            </View>
          )} */}

      {destinationSelected?.length > 0 && !isTyping && (
        <View style={styles.selectedCities}>
          <View style={{width: "100%"}}>
            <ItineraryHeader
              calculateTotalNights={calculateTotalNights}
              tripRange={tripRange}
              setOpen={setOpen}
            />

            <DraggableFlatList
              data={destinationSelected}
              renderItem={renderItem}
              keyExtractor={(item, index) => `${item.city}-${index}`}
              onDragEnd={handleDragEnd}
              containerStyle={{
                height: SIZES.height - 310
              }}
              showsVerticalScrollIndicator={false}
            />
          </View>
          <Pressable
           onPress={handleSave}
           style={({pressed}) => [styles.saveButton, {
            opacity: pressed ? 0.5 : 1
          }]}>
            <Text style={styles.saveButtonLabel}>Save</Text>
          </Pressable>
        </View>
      )}
    </KeyboardAvoidingView>
  );
};


const styles = StyleSheet.create({
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
  circleContainer: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    position: "absolute",
    right: -35,
  },
  city: {
    color: COLORS.black,
    fontSize: 18,
    fontWeight: "600",
  },
  daySwitcher: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    marginRight: 10,
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
  icon: {
    paddingBottom: 5,
    paddingLeft: 15,
  },
  item: {
    alignItems: "center",
    borderTopColor: "#eee",
    borderTopWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 25,
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
  nightText: {
    color: "#000",
    fontSize: 12,
    fontWeight: "500",
    position: "absolute",
  },
  nights: {
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 10,
    position: "relative",
    width: 40
  },
  nightsLabel: {
    color: COLORS.darkgray,
    fontSize: 11,
    fontWeight: "500",
    position: "absolute",
    textAlign: "center",
    top: 25,
    width: 40
  },
  nightsNumber: {
    color: COLORS.black,
    fontSize: 18,
    fontVariant: ['tabular-nums'],
    fontWeight: "bold",
  },
  plusMinusButton: {
  },
  remove: {
    alignItems: "center",
    borderColor: "#cf3030",
    borderRadius: 50,
    borderWidth: 1,
    height: 17,
    justifyContent: "center",
    marginLeft: 15,
    width: 17,
  },
  rg: {
    alignItems: "center",
    flexDirection: "row",
  },
  rgHeader: {
    alignItems: "center",
    flexDirection: "row",
    paddingRight: 0,
    position: "relative",
  },
  rowItem: {
    alignItems: "center",
    flexDirection: "row",
  },
  safeArea: {
    backgroundColor: "#ffffff",
    flex: 1,
    paddingTop: Constants?.statusBarHeight + 10,
  },
  saveButton: {
    alignItems: "center",
    backgroundColor: "#000",
    borderRadius: 30,
    flexDirection: "row",
    height: 50,
    justifyContent: "center",
    textAlign: "right",
    width: "100%"
  },
  saveButtonLabel: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500"
  },
  searchBox: {
    flexDirection: "row",
    paddingHorizontal: 15,
    position: "relative",
    width: "100%",
  },
  selectedCities: {
    borderTopColor: "#eee",
    borderTopWidth: 8,
    flex: 1,
    justifyContent: "space-between",
    marginBottom: 40,
    marginTop: 15,
    paddingHorizontal: 15,
    paddingTop: 0,
    width: "100%"
  },
  subText: {
    color: COLORS.darkgray,
    fontSize: 12,
    fontWeight: "500",
    marginTop: 5,
  },
  subTitle: {
    color: COLORS.primary,
    fontSize: 14,
    fontWeight: "500",
    marginTop: 5
  },
  titleH2: {
    color: COLORS.black,
    fontSize: 18,
    fontWeight: "500",
  }
});
