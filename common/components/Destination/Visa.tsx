import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useMemo, useRef, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { ScrollView } from "react-native";
import { Portal } from "react-native-portalize";

import { useLazyGetPassportIndexesFromToQuery } from "../../../api/api.trekspot";
import { CountryType } from "../../../api/api.types";
import { FeedbackCountryDetail } from "../../../components/explore/FeedbackCountryDetail";
import {
  CheckCircleIcon,
  CloseCircleIcon,
  GlobeIcon,
  PassportIcon,
  VisaPassportIcon,
} from "../../../utilities/SvgIcons.utility";
import { Loader } from "../../ui/Loader";
import { styles } from "../_styles";
import { CountrySelect } from "../CountrySelect";

type VisaProps = {
  country: CountryType;
};

export const Visa: React.FC<VisaProps> = ({ country }) => {
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [storageLoading, setStorageLoading] = useState(false);
  const [fetchVisaInfo, { data, isLoading, isError }] =
  useLazyGetPassportIndexesFromToQuery();
  const modalCountryPassportSelectRef = useRef(null);

  const openCountrySelectModal = () => {
    modalCountryPassportSelectRef.current?.open();
  };

  const storeCountryData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem("user-country", jsonValue);
      // await AsyncStorage.clear();
    } catch (e) {
      // console.log("Error storing to async storage", e);
    }
  };

  const getCountryDataFromStorage = async () => {
    try {
      setStorageLoading(true);
      const value = await AsyncStorage.getItem("user-country");
      setStorageLoading(false);
      if (value !== null) {
        const countryData = JSON.parse(value);
        setSelectedDestination(countryData);
      }
    } catch (error) {
      console.error("Error retrieving data: ", error);
    }
  };

  const handleCountrySelect = (country) => {
    setSelectedDestination(country);
    storeCountryData(country);
    modalCountryPassportSelectRef.current?.close();
  };

  const onDestinationModalClose = () => {
    modalCountryPassportSelectRef.current?.close();
  };

  useEffect(() => {
    getCountryDataFromStorage();
  }, []);

  useEffect(() => {
    storeCountryData(selectedDestination);
    console.log("selectedDestination---",selectedDestination)
    fetchVisaInfo({ from: selectedDestination?.iso2 || "", to: country.iso2 });
 
  }, [selectedDestination]);

  const isCitizen = useMemo(() => {
    return selectedDestination?.name === country.name;
  }, [selectedDestination]);


  return (
    <>
      <ScrollView
        style={[styles.tabWrapper, { paddingHorizontal: 0 }]}
        showsVerticalScrollIndicator={false}
        alwaysBounceVertical={false}
      >
        <View style={styles.visaTabHeader}>
          <Text style={styles.travelToText}>Traveling to {country.name}</Text>

          {selectedDestination ? (
            <TouchableOpacity
              style={styles.passportBox}
              activeOpacity={0.7}
              onPress={() => openCountrySelectModal()}
            >
              <PassportIcon />
              <View style={styles.passportTexts}>
                <Text style={styles.passportLabel}>Passport</Text>
                <Text numberOfLines={1} style={styles.passportCountry}>
                  {selectedDestination?.name || "Rezident of"}
                </Text>
              </View>
            </TouchableOpacity>
          ) : null}
        </View>
        {isCitizen ? (
          <View style={{ paddingHorizontal: 15 }}>
            <View
              style={[
                styles.textContentWrapper,
                styles.successBg,
                { marginTop: 50 },
              ]}
            >
              <CheckCircleIcon color="#1a806b" />
              <Text style={[styles.headingText, styles.success]}>
                You are citizen of {country.name} and don't need visa.
              </Text>
            </View>
          </View>
        ) : null}

        {isLoading ? (
          <View style={{ marginTop: 45 }}>
            <Loader isLoading={isLoading} background="" size="small" />
          </View>
        ) : null}

        {!isCitizen && !data && !isLoading && !selectedDestination && (
          <View
            style={{
              alignItems: "center",
              marginTop: 50,
              paddingHorizontal: 15
            }}
          >
            <VisaPassportIcon />
            <Text
              style={{
                marginVertical: 15,
                textAlign: "center",
                maxWidth: "80%",
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
                  style={[
                    styles.passportCountry,
                    { marginLeft: 5, maxWidth: "100%", fontSize: 14 },
                  ]}
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
              <View style={[styles.textContentWrapper, styles.successBg]}>
                <CheckCircleIcon color="#1a806b" />
                <Text style={[styles.headingText, styles.success]}>
                  {selectedDestination?.name} passport holders don't need visa
                  to travel to {country.name}.
                </Text>
              </View>
            ) : (
              <View style={[styles.textContentWrapper, styles.dangerBg]}>
                <CloseCircleIcon color="#D74E4E" />
                <Text style={[styles.headingText, styles.danger]}>
                  {selectedDestination?.name} passport holders need visa to
                  travel to {country.name}
                </Text>
              </View>
            )}

            <Text style={styles.secondaryTitle}>Options</Text>
            <View style={styles.visaTypes}>
              <View style={styles.visaTypeCard}>
                <Text style={styles.visaTypeCardTitle}>Visitor visa</Text>

                <View style={styles.staysNtype}>
                  <View style={styles.staysNtypeRow}>
                    <Text style={styles.staysNtypeRowKey}>Allowed stay:</Text>
                    <Text style={styles.staysNtypeRowValue}>
                      {!isNaN(parseFloat(data.passportIndex.requirement))
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

            <Text style={styles.infoText}>
              We are working to provide the latest updates, but please verify
              visa info accuracy with the embassy.
            </Text>
          </View>
        )}
        {!isLoading && data ? (
          <View style={{ marginTop: 30, width: "100%" }}>
            <FeedbackCountryDetail />
          </View>
        ) : null}
      </ScrollView>

      <Portal>
        <CountrySelect
          onSelect={handleCountrySelect}
          onDestinationModalClose={onDestinationModalClose}
          modalCountryPassportSelectRef={modalCountryPassportSelectRef}
        />
      </Portal>
    </>
  );
};
