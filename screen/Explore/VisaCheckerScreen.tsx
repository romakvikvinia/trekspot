import {
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Constants from "expo-constants";
import { globalStyles } from "../../styles/globalStyles";
import {
  BackIcon,
  DownIcon,
  GlobeIcon,
} from "../../utilities/SvgIcons.utility";
import { VisaCheckerContent } from "../../components/explore/VisaChecker";
import { Flags } from "../../utilities/flags";
import { Portal } from "react-native-portalize";
import { Modalize } from "react-native-modalize";
import { CountrySelect } from "../../common/components/CountrySelect";
import { useEffect, useRef, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const VisaCheckerScreen = ({ navigation }) => {
  const modalCountryPassportSelectRef = useRef<Modalize>(null);

  const [from, setFrom] = useState(null);

  const onDestinationModalClose = () => {
    modalCountryPassportSelectRef.current?.close();
  };

  const handleCountrySelect = (country) => {
    setFrom(country);
    storeCountryData(country);
    onDestinationModalClose();
  };

  const storeCountryData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem("user-country", jsonValue);
      // await AsyncStorage.clear();
    } catch (e) {
      console.log("Error storing to async storage", e);
    }
  };

  const getCountryDataFromStorage = async () => {
    try {
      const value = await AsyncStorage.getItem("user-country");

      if (value !== null) {
        const countryData = JSON.parse(value);
        setFrom(countryData);
      }
    } catch (error) {
      console.error("Error retrieving data: ", error);
    }
  };

  useEffect(() => {
    getCountryDataFromStorage();
  }, []);

  return (
    <>
      <View style={styles.safeArea}>
        <KeyboardAvoidingView
          behavior={Platform.OS == "ios" ? "padding" : "height"}
          style={styles.screen}
        >
          <ImageBackground
            source={require("../../assets/visabg.webp")}
            resizeMode="cover"
            style={styles.screenHeaderWrapper}
          >
            <View style={styles.screenHeader}>
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={globalStyles.screenHeaderBackButton}
              >
                <BackIcon size="30" color="#fff" />
              </TouchableOpacity>
              <Text style={[globalStyles.screenTitle, {color: "#fff"}]}>Visa info by citizenship</Text>
              <TouchableOpacity
                style={globalStyles.screenHeaderBackButton}
              ></TouchableOpacity>
            </View>
            {/* <Text style={styles.pageDescription}>
            Check visa rules by citizenship
            </Text> */}

            <View style={styles.passportSelectWrapper}>
              <TouchableOpacity
                onPress={() => modalCountryPassportSelectRef?.current?.open()}
                activeOpacity={0.7}
                style={styles.passportSelect}
              >
                <View style={styles.passportDetails}>
                  {Flags[from?.iso2] ? (
                    <ImageBackground
                      resizeMode="cover"
                      style={{
                        width: 25,
                        height: 18,
                        backgroundColor: "#ddd",
                      }}
                      source={Flags[from?.iso2] || null}
                    />
                  ) : (
                    <GlobeIcon size={15} color="#fff" />
                  )}
                  <Text style={styles.fromToText} numberOfLines={1}>
                    {from?.name || "Select your passport"}
                  </Text>
                </View>

                <DownIcon color="#fff" />
              </TouchableOpacity>
            </View>
          </ImageBackground>

          <VisaCheckerContent from={from} />
        </KeyboardAvoidingView>
      </View>


      <Portal>
        <Modalize
          ref={modalCountryPassportSelectRef}
          modalTopOffset={65}
          scrollViewProps={{
            keyboardShouldPersistTaps: "handled",
          }}
        >
          <CountrySelect
            onSelect={handleCountrySelect}
            onDestinationModalClose={onDestinationModalClose}
          />
        </Modalize>
      </Portal>
    </>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f8f8f8",
  },
  passportSelectWrapper: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 15,
  },
  passportDetails: {
    flexDirection: "row",
    alignItems: "center",
  },
  passportSelect: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 50,
    paddingVertical: 15,
    paddingHorizontal: 25,
    width: "70%",
    minWidth: 200,
  },
  fromToText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#fff",
    marginLeft: 10,
    maxWidth: 180,
  },
  screen: {
    flex: 1,
    width: "100%",
  },
  screenHeaderWrapper: {
    height: 200,
    width: "100%",
    backgroundColor: "#238D99",
  },
  screenHeader: {
    paddingTop: Constants?.statusBarHeight + 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    marginBottom: 0,
    paddingBottom: 10,
  },
  pageDescription: {
    fontSize: 18,
    paddingHorizontal: 40,
    color: "#fff",
    fontWeight: "500",
    lineHeight: 20,
    marginTop: 10,
    textAlign: "center",
    marginBottom: 5,
  },
});
