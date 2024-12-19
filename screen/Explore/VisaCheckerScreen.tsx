import AsyncStorage from "@react-native-async-storage/async-storage";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import Constants from "expo-constants";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useRef, useState } from "react";
import {
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Modalize } from "react-native-modalize";
import { Portal } from "react-native-portalize";

import { CountrySelect } from "../../common/components/CountrySelect";
import { VisaCheckerContent } from "../../components/explore/VisaChecker";
import { ExploreRoutesStackParamList } from "../../routes/explore/ExploreRoutes";
import { globalStyles } from "../../styles/globalStyles";
import { Flags } from "../../utilities/flags";
import {
  BackIcon,
  DownIcon,
  GlobeIcon,
} from "../../utilities/SvgIcons.utility";

type Props = NativeStackScreenProps<
  ExploreRoutesStackParamList,
  "VisaCheckerScreen"
>;

export const VisaCheckerScreen: React.FC<Props> = ({ navigation }) => {
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
        <StatusBar style="light" />
        <KeyboardAvoidingView
          behavior={Platform.OS == "ios" ? "padding" : "height"}
          style={styles.screen}
        >
          <ImageBackground
            source={require("../../assets/visabg.webp")}
            resizeMode="cover"
            style={styles.screenHeaderWrapper}
          >
            <View
              style={[
                styles.screenHeader,
                {
                  paddingTop:
                    Constants?.statusBarHeight +
                    (Platform.OS === "android" ? 0 : 10),
                  paddingHorizontal: Platform.OS === "android" ? 5 : 15,
                },
              ]}
            >
               <Pressable
                onPress={() => navigation.goBack()}
                style={globalStyles.screenHeaderBackButton}
                hitSlop={20}
              >
                <BackIcon size="30" color="#fff" />
              </Pressable>
              <Text style={[globalStyles.screenTitle, { color: "#fff" }]}>
                Visa info by citizenship
              </Text>
              <TouchableOpacity
                style={globalStyles.screenHeaderBackButton}
              ></TouchableOpacity>
            </View>

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
        <CountrySelect
          onSelect={handleCountrySelect}
          onDestinationModalClose={onDestinationModalClose}
          modalCountryPassportSelectRef={modalCountryPassportSelectRef}
        />
      </Portal>
    </>
  );
};

const styles = StyleSheet.create({
  fromToText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "500",
    marginLeft: 10,
    maxWidth: 180,
  },
  passportDetails: {
    alignItems: "center",
    flexDirection: "row",
  },
  passportSelect: {
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    minWidth: 200,
    paddingHorizontal: 25,
    paddingVertical: 15,
    width: "70%",
  },
  passportSelectWrapper: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 15,
  },
  safeArea: {
    backgroundColor: "#f8f8f8",
    flex: 1,
  },
  screen: {
    flex: 1,
    width: "100%",
  },
  screenHeader: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 0,
    paddingBottom: 10,
    paddingHorizontal: 15,
  },
  screenHeaderWrapper: {
    backgroundColor: "#238D99",
    height: 200,
    width: "100%",
  },
});
