import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  Animated,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Portal } from "react-native-portalize";

import { useLazyGetPassportIndexesQuery } from "../../api/api.trekspot";
import { CountrySelect } from "../../common/components/CountrySelect";
import { Loader } from "../../common/ui/Loader";
import { COLORS, SIZES } from "../../styles/theme";
import {
  CheckCircleIcon,
  CloseCircleIcon,
  GlobeIcon,
  VisaPassportIcon,
} from "../../utilities/SvgIcons.utility";

export const VisaInfoButton = ({ city }) => {

  // if(!city) {
  //   return;
  // }

  const [visible, setVisible] = useState(false);
  const modalCountryPassportSelectRef = useRef(null);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [fetchVisaInfo, { data, isLoading, isError }] =
    useLazyGetPassportIndexesQuery();


    const handleCountrySelect = (country) => {
      setSelectedDestination(country);
      storeCountryData(country);
      modalCountryPassportSelectRef.current?.close();
    };

    const storeCountryData = async (value) => {
      try {
    
        const jsonValue = JSON.stringify(value);
        console.log("jsonValue",jsonValue)
        await AsyncStorage.setItem("user-country", jsonValue);
        // await AsyncStorage.clear();
      } catch (e) {
        console.log("Error storing to async storage", e);
      }
    };
  
    const getCountryDataFromStorage = async () => {
      try {
        const value = await AsyncStorage.getItem("user-country");
        const keys = await AsyncStorage.getAllKeys();
        console.log("keys --",keys)
          if (value !== null) {
          const countryData = JSON.parse(value);
          setSelectedDestination(countryData);
        }
      } catch (error) {
        console.error("Error retrieving data: ", error);
      }
    };
   
  const onDestinationModalClose = () => {
    modalCountryPassportSelectRef.current?.close();
  };

  const openCountrySelectModal = () => {
    modalCountryPassportSelectRef.current?.open();
  };
 

  useEffect(() => {
    storeCountryData(selectedDestination);
    fetchVisaInfo({ from: selectedDestination?.iso2 || "", to: city.iso2 });
  }, [selectedDestination]);

  const isCitizen = useMemo(() => {
    return selectedDestination?.name === city?.country;
  }, [selectedDestination]);

  
  useEffect(() => {
    getCountryDataFromStorage();
  }, []);


  const showPopup = () => {
    setVisible(true);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 150,
      useNativeDriver: true,
    }).start();
  };

  const hidePopup = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 10,
      useNativeDriver: true,
    }).start(() => setVisible(false));
  };

  console.log("selectedDestination",data)


  return (
    <>
      <Pressable onPress={showPopup} hitSlop={15} style={styles.btn}>
        {!isCitizen && !data && !isLoading && (
          <Text style={[styles.labelItemText, { color: COLORS.primary }]}>
            Visa info
          </Text>
        )}
        {!isLoading && data && (
          <>
            {data.passportIndex.requirement !== "visa required" ? (
              <Text style={styles.labelItemText}>Visa free</Text>
            ) : (
              <Text style={[styles.labelItemText, { color: "#D74E4E" }]}>
                Visa required
              </Text>
            )}
          </>
        )}
      </Pressable>

      {visible && (
        <Portal>
          <View style={[StyleSheet.absoluteFillObject, styles.bg]}>
            <Animated.View style={[styles.contentCard, { opacity: fadeAnim }]}>
              <ScrollView style={styles.inner}>
                <Text style={styles.title}>Visa requirement</Text>

                {isLoading ? (
                  <View style={{ marginTop: 45 }}>
                    <Loader isLoading={isLoading} background="" size="small" />
                  </View>
                ) : null}

                {!isCitizen && !data && !isLoading && (
                  <View
                    style={{
                      alignItems: "center",
                      marginTop: 50,
                      paddingHorizontal: 15,
                    }}
                  >
                    <VisaPassportIcon />
                    <Text
                      style={{
                        marginVertical: 15,
                        textAlign: "center",
                        maxWidth: "80%",
                        color: COLORS.darkgray,
                      }}
                    >
                      Check visa requirements for your passport country
                    </Text>
                    <TouchableOpacity
                      style={[
                        styles.passportBox,
                        {
                          width: 200,
                          height: 40,
                          alignItems: "center",
                          justifyContent: "center",
                          borderRadius: 50,
                        },
                      ]}
                      activeOpacity={0.7}
                      onPress={() => openCountrySelectModal()}
                    >
                      <GlobeIcon size={15} />
                      <View style={styles.passportTexts}>
                        <Text
                          numberOfLines={1}
                          style={styles.whereAreyouFromLabel}
                        >
                          Where are you from?
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                )}

                {!isCitizen && !isLoading && data && data.passportIndex && (
                  <View style={styles.visaTabContent}>
                    {data.passportIndex.requirement !== "visa required" ? (
                      <View
                        style={[styles.textContentWrapper, styles.dangerBg]}
                      >
                        <CheckCircleIcon color="#1a806b" size={40} />
                        <Text style={styles.headingText}>
                          {selectedDestination?.name} passport holders don't
                          need visa to travel to {city.country}.
                        </Text>
                      </View>
                    ) : (
                      <View
                        style={[styles.textContentWrapper, styles.dangerBg]}
                      >
                        <CloseCircleIcon color="#D74E4E" size={40} />
                        <Text
                          style={[styles.headingText, { color: "#D74E4E" }]}
                        >
                          {selectedDestination?.name} passport holders need visa
                          to travel to {city?.country}
                        </Text>
                      </View>
                    )}

                    <Text style={styles.secondaryTitle}>Options</Text>
                    <View style={styles.visaTypes}>
                      <View style={styles.visaTypeCard}>
                        <Text style={styles.visaTypeCardTitle}>
                          Visitor visa
                        </Text>

                        <View style={styles.staysNtype}>
                          <View style={styles.staysNtypeRow}>
                            <Text style={styles.staysNtypeRowKey}>
                              Allowed stay:
                            </Text>
                            <Text style={styles.staysNtypeRowValue}>
                              {!isNaN(
                                parseFloat(data.passportIndex.requirement)
                              )
                                ? `${data.passportIndex.requirement} Days`
                                : data.passportIndex.requirement}
                            </Text>
                          </View>
                          <View style={styles.staysNtypeRow}>
                            <Text style={styles.staysNtypeRowKey}>Type:</Text>
                            <Text style={styles.staysNtypeRowValue}>
                              Tourism, business
                            </Text>
                          </View>
                        </View>
                      </View>
                    </View>
                  </View>
                )}
              </ScrollView>
              <Pressable onPress={hidePopup} style={styles.closeButton}>
                <Text style={styles.closeButtonText}>Close</Text>
              </Pressable>
            </Animated.View>
          </View>

          <CountrySelect
            onSelect={handleCountrySelect}
            onDestinationModalClose={onDestinationModalClose}
            modalCountryPassportSelectRef={modalCountryPassportSelectRef}
          />
        </Portal>
      )}
    </>
  );
};
const styles = StyleSheet.create({
  bg: {
    alignItems: "center",
    backgroundColor: "rgba(0,0,0, 0.4)",
    justifyContent: "center",
    position: "absolute",
    zIndex: 1,
  },
  btn: {
    marginLeft: 8,
  },
  closeButton: {
    backgroundColor: "#f2f2f2",
    borderRadius: 100,
    marginRight: 10,
    marginTop: 10,
    padding: 15,
  },
  closeButtonText: {
    color: COLORS.black,
    fontSize: 15,
    fontWeight: "500",
    textAlign: "center",
  },
  contentCard: {
    backgroundColor: "#fff",
    borderRadius: 15,
    elevation: 5,
    height: 400,
    justifyContent: "space-between",
    maxWidth: 500,
    minHeight: 410,
    padding: 15,
    paddingRight: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    width: SIZES.width - 60,
    zIndex: 1,
  },
  headingText: {
    color: "#1a806b",
    fontSize: 15,
    fontWeight: "500",
    marginTop: 15,
    paddingHorizontal: 25,
    textAlign: "center"
  },
  inner: {
    flex: 1,
    paddingRight: 10,
  },
  labelItemText: {
    color: "#1a806b",
    fontSize: 14,
    fontWeight: "500",
  },
  passportBox: {
    alignItems: "center",
    backgroundColor: "#fff",
    borderColor: "#f2f2f2",
    borderRadius: 6,
    flexDirection: "row",
    marginLeft: 0,
    paddingHorizontal: 8,
    paddingVertical: 7,
    position: "relative",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 0.84,
    width: 110,
    ...Platform.select({
      android: {
        elevation: 1,
      },
    }),
  },
  passportTexts: {
    marginLeft: 5,
  },
  secondaryTitle: {
    color: COLORS.darkgray,
    fontSize: 16,
    fontWeight: "600",
    marginTop: 25,
  },
  staysNtype: {
    marginTop: 10,
  },
  staysNtypeRow: {
    flexDirection: "row",
    marginVertical: 3,
  },
  staysNtypeRowKey: {
    color: COLORS.darkgray,
    fontSize: 12,
    fontWeight: "bold",
    width: 100,
  },
  staysNtypeRowValue: {
    color: "#000",
    fontSize: 12,
    fontWeight: "bold",
    textTransform: "capitalize",
  },
  textContentWrapper: {
    alignItems: "center",
    marginTop: 30,
    width: "100%",
  },
  title: {
    color: COLORS.black,
    fontSize: 18,
    fontWeight: "500",
  },
  visaTypeCard: {
    backgroundColor: "#f9fafb",
    borderColor: "#eee",
    borderRadius: 10,
    borderWidth: 1,
    marginTop: 15,
    padding: 15,
  },
  visaTypeCardTitle: {
    color: "#000",
    fontSize: 18,
    fontWeight: "bold",
  },
  visaTypes: {
    flex: 1,
  },
  whereAreyouFromLabel: {
    fontSize: 14,
    fontWeight: "500",
    marginLeft: 5,
    maxWidth: "100%",
  },
});
