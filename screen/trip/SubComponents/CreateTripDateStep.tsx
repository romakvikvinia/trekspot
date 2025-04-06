import moment from "moment";
import { useCallback, useState } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { DefaultTheme, PaperProvider } from "react-native-paper";
import { DatePickerModal } from "react-native-paper-dates";
import Animated, {
  Easing,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { COLORS } from "../../../styles/theme";
import {
  CalendarLightIcon,
  MinusIcon,
  PlusIcon,
} from "../../../utilities/SvgIcons.utility";

export const CreateTripDateStep = ({
  index,
  setActiveIndex,
  setTripData,
  tripData,
  setNoDateError,
  noDateError
}) => {
  const [activeTab, setActiveTab] = useState("dates");
  const [open, setOpen] = useState(false);
  const onDismiss = useCallback(() => {
    setNoDateError(false);
    setOpen(false);
  }, [setOpen]);

    const handlePlaceSelect = (selectedData, selectedDetails) => {
      // Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
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

  const onConfirm = useCallback(
    ({ startDate, endDate }) => {
      setNoDateError(false);
      setOpen(false);
      setTripData((prevState) => {
        return {
          ...prevState,
          date: {
            startDate: startDate,
            endDate: endDate,
          },
          days: null
        };
      });
    },
    [setOpen, setTripData]
  );

  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: COLORS.black,
      primaryContainer: "#f1f1f1",
      surface: "#fff",
    },
  };

  const animatedStyles = useAnimatedStyle(() => {
    return {
      height:
        index === 1
          ? withTiming(280, {
              duration: 300,
              easing: Easing.bezier(0.25, 0.1, 0.25, 1.0),
            })
          : withTiming(0, {
              duration: 300,
              easing: Easing.bezier(0.25, 0.1, 0.25, 1.0),
            }),
      pointerEvents: index === 1 ? "auto" : "none",
      opacity:
        index === 1
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

  const handleTripLength = (type) => {
    setNoDateError(false);
    if (type === "increment") {
      setTripData((prevState) => {
        return {
          ...prevState,
          days: prevState.days + 1,
          date: {
            startDate: null,
            endDate: null
          }
        }
      });
    } else if (type === "decrement" && tripData?.days > 1) {
      setTripData((prevState) => {
        return {
          ...prevState, 
          days: prevState.days - 1,
          date: {
            startDate: null,
            endDate: null
          }
        }
      });
    }
  };

  const toggleAccordion = useCallback(() => {
    setNoDateError(false);
    if(index !== 1) {
      setActiveIndex(1)
    } else {
      setActiveIndex(0)
    }
}, [index])
 
  return (
    <>
      <View style={[styles.accordion, {
        borderWidth: 1,
        borderColor: noDateError ? COLORS.red : "transparent",
      }]}>
        <TouchableOpacity
          onPress={toggleAccordion}
          style={styles.header}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              minHeight: 30,
            }}
          >
            <Text
              style={[
                styles.title,
                {
                  fontSize: index === 1 ? 24 : 16,
                  color: index === 1 ? COLORS.black : COLORS.gray,
                },
              ]}
            >
              When?
            </Text>

            {index !== 1 && (
              <Text style={styles.selectedPlaces}>
                 {
                  tripData?.days ? `${tripData?.days} days` : tripData?.date?.startDate && tripData?.date?.endDate ? `${moment(tripData?.date?.startDate).format("DD MMM YYYY")} - ${moment(tripData?.date?.endDate).format("DD MMM YYYY")}` : null
                 }
              </Text>
            )}
          </View>
        </TouchableOpacity>
        <Animated.View style={[styles.body, animatedStyles]}>
          <View style={styles.datePickerContainer}>
            <View style={styles.tabBody}>
              <View style={styles.tabRow}>
                <Pressable
                  style={[
                    styles.tabButton,
                    activeTab === "dates" && styles.activeTab,
                  ]}
                  onPress={() => {setActiveTab("dates");setNoDateError(false);}}
                >
                  <Text style={styles.tabText}>Dates</Text>
                </Pressable>
                <Pressable
                  style={[
                    styles.tabButton,
                    activeTab === "days" && styles.activeTab,
                  ]}
                  onPress={() => {setActiveTab("days");setNoDateError(false);}}
                >
                  <Text style={styles.tabText}>Trip length</Text>
                </Pressable>
              </View>
              {activeTab === "dates" && (
                <>
                  <Text style={styles.tabBodyTitle}>Select dates</Text>
                  <Pressable
                    style={styles.datePickerButton}
                    onPress={() => {setOpen(true);}}
                  >
                    <CalendarLightIcon size={20} color="#000" />
                    <Text style={styles.datePickerButtonText}>
                      {tripData?.date?.startDate && tripData?.date?.endDate ? `${moment(tripData?.date?.startDate).format("DD MMM YYYY")} - ${moment(tripData?.date?.endDate).format("DD MMM YYYY")}` : moment().format("DD MMM YYYY") +  
                        " - " +
                        moment().add(1, "day").format("DD MMM YYYY")}
                    </Text>
                  </Pressable>
                  <PaperProvider theme={theme}>
                    <SafeAreaProvider>
                      <View
                        style={{
                          justifyContent: "center",
                          flex: 1,
                          alignItems: "center",
                        }}
                      >
                        <DatePickerModal
                          locale="en"
                          mode="range"
                          visible={open}
                          onDismiss={onDismiss}
                          onChange={(date) => console.log("onchnage", date)}
                          startDate={tripData?.date?.startDate}
                          endDate={tripData?.date?.endDate}
                          onConfirm={onConfirm}
                          presentationStyle={"pageSheet"}
                          disableStatusBarPadding={false}
                          saveLabel="Confirm"
                        />
                      </View>
                    </SafeAreaProvider>
                  </PaperProvider>
                </>
              )}
              {activeTab === "days" && (
                <View
                  style={[
                    styles.tripLengthContainer,
                    {
                      marginTop: 30,
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.tabBodyTitle,
                      {
                        marginBottom: 0,
                      },
                    ]}
                  >
                    Total days
                  </Text>
                  <View style={styles.tripLengthContainer}>
                    <Pressable style={styles.tripLengthButton} onPress={() => handleTripLength("decrement")}>
                      <MinusIcon size={15} color="#000" />
                    </Pressable>
                    <Text style={styles.tripLengthText}>{tripData?.days || 1}</Text>
                    <Pressable style={styles.tripLengthButton} onPress={() => handleTripLength("increment")}>
                      <PlusIcon size={15} color="#000" />
                    </Pressable>
                  </View>
                </View>
              )}
            </View>
            <View style={styles.actionsRow}>
              <Pressable style={styles.actionButtonReset}>
                <Text style={styles.actionButtonResetText}>Reset</Text>
              </Pressable>
              <Pressable style={styles.actionButtonNext} onPress={() => setActiveIndex(2)}>
                <Text style={styles.actionButtonNextText}>Next</Text>
              </Pressable>
            </View>
          </View>
        </Animated.View>
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  accordion: {
    backgroundColor: "#fff",
    borderColor: "#e1e1e1",
    borderRadius: 15,
    elevation: 6,
    marginBottom: 18,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
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
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  activeTab: {
    backgroundColor: "#fff",
    color: "#000",
  },
  body: {
    // backgroundColor: "#fff",
    padding: 0,
  },
  datePickerButton: {
    alignItems: "center",
    borderColor: "#ccc",
    borderRadius: 10,
    borderWidth: 1,
    flexDirection: "row",
    gap: 10,
    padding: 15,
  },
  datePickerButtonText: {
    color: "#000",
    fontSize: 15,
    fontWeight: "500",
  },
  datePickerContainer: {
    flex: 1,
    padding: 0,
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 15
  },
  tabBody: {
    flex: 1,
    paddingHorizontal: 20,
  },
  tabBodyTitle: {
    color: "#000",
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 10,
    marginTop: 25,
  },
  tabButton: {
    alignItems: "center",
    borderRadius: 30,
    height: 45,
    justifyContent: "center",
    width: "48%",
  },
  tabRow: {
    backgroundColor: "#ebebeb",
    borderRadius: 30,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 3,
  },
  tabText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "500",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  tripLengthButton: {
    alignItems: "center",
    backgroundColor: "#f1f1f1",
    borderRadius: 40,
    height: 40,
    justifyContent: "center",
    width: 40,
  },
  tripLengthContainer: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
    paddingHorizontal: 0,
  },
  tripLengthText: {
    color: "#000",
    fontSize: 22,
    fontVariant: ["tabular-nums"],
    fontWeight: "600",
    marginHorizontal: 20
  },
});
