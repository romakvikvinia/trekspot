import { useCallback, useEffect, useRef, useState } from "react";
import {
  Alert,
  ImageBackground,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Modalize } from "react-native-modalize";
import { Portal } from "react-native-portalize";
import { useLazyGetPassportIndexesQuery } from "../../api/api.trekspot";
import { CountrySelect } from "../../common/components/CountrySelect";
import { Loader } from "../../common/ui/Loader";
import { NotFound } from "../../components/common/NotFound";
import { COLORS } from "../../styles/theme";
import { Flags } from "../../utilities/flags";
import {
  CheckCircleIcon,
  CloseCircleIcon,
  DownIcon,
  FlightIcon,
  GlobeIcon,
} from "../../utilities/SvgIcons.utility";
import * as Haptics from "expo-haptics";

export const VisaChecker = () => {
  const [fetchVisaInfo, { data, isLoading, isError }] =
    useLazyGetPassportIndexesQuery();

  const [from, setFrom] = useState(null);
  const [to, setTo] = useState(null);
  const [selectingFor, setSelectingFor] = useState(null);

  const modalCountryPassportSelectRef = useRef(null);
  const openCountrySelectModal = (type) => {
    setSelectingFor(type);
    modalCountryPassportSelectRef.current?.open();
  };
  const resetHandler = () => {
    setFrom(null);
    setTo(null);
  };
  const showAlert = () => {
    Alert.alert(
      "Warning",
      "Your 'From' and 'To' destinations can't be the same. Please choose different locations.",
      [{ text: "Got it!" }]
    );
  };

  const handleCountrySelect = (country) => {
    if ((from && from === country) || (to && to === country)) {
      showAlert();
      return;
    }

    if (selectingFor === "from") {
      setFrom(country);
    } else if (selectingFor === "to") {
      setTo(country);
    }
    modalCountryPassportSelectRef.current?.close();
  };

  const onDestinationModalClose = () => {
    modalCountryPassportSelectRef.current?.close();
  };

  useEffect(() => {
    if (from && to && from !== to) {
      fetchVisaInfo({ from: from?.iso2 || "", to: to?.iso2 || "" });
    }
  }, [from, to]);

  return (
    <>
      <View style={styles.visaCheckerCard}>
        <Text style={styles.visaCheckerCardTitle}>Travel Visa Checker</Text>
        <Text style={styles.visaCheckerCardSub}>
          Select your country and destination
        </Text>

        <View style={styles.countrySelects}>
          <TouchableOpacity
            onPress={() => {
              openCountrySelectModal("from");
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            }}
            activeOpacity={0.7}
            style={styles.fromTo}
          >
            <View style={styles.lf}>
              {Flags[from?.iso2] ? (
                <ImageBackground
                  resizeMode="cover"
                  style={{
                    width: 25,
                    height: 15,
                    backgroundColor: "#ddd",
                  }}
                  source={Flags[from.iso2] || null}
                />
              ) : (
                <GlobeIcon size={15} />
              )}

              <Text style={styles.fromToText} numberOfLines={1}>
                {from?.name || "Resident of"}
              </Text>
            </View>
            <DownIcon size={10} />
          </TouchableOpacity>
          <View
            style={{ width: 30, marginHorizontal: 10, alignItems: "center" }}
          >
            <FlightIcon color={COLORS.black} />
          </View>
          <TouchableOpacity
            onPress={() => {
              openCountrySelectModal("to");
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            }}
            activeOpacity={0.7}
            style={styles.fromTo}
          >
            <View style={styles.lf}>
              {Flags[to?.iso2] ? (
                <ImageBackground
                  resizeMode="cover"
                  style={{
                    width: 25,
                    height: 15,
                    backgroundColor: "#ddd",
                  }}
                  source={Flags[to?.iso2] || null}
                />
              ) : (
                <GlobeIcon size={15} />
              )}

              <Text style={styles.fromToText} numberOfLines={1}>
                {to?.name || "Anywhere"}
              </Text>
            </View>
            <DownIcon size={10} />
          </TouchableOpacity>
        </View>

        {isLoading ? (
          <View style={{ marginTop: 15 }}>
            <Loader size="small" background="#f9fafb" isLoading={isLoading} />
          </View>
        ) : null}

        {!data && from?.name && to?.name && !isLoading && (
          <NotFound text="Data not found! Please select the country that issued your passport." />
        )}

        {!isLoading && data && from?.name && to?.name && data.passportIndex && (
          <>
            {data.passportIndex.requirement !== "visa required" ? (
              <View style={[styles.textContentWrapper, styles.successBg]}>
                <CheckCircleIcon color="#1a806b" />
                <Text style={[styles.headingText, styles.success]}>
                  {from?.name} passport holders don't need visa to travel to{" "}
                  {to?.name}.
                </Text>
              </View>
            ) : (
              <View style={[styles.textContentWrapper, styles.dangerBg]}>
                <CloseCircleIcon color="#D74E4E" />
                <Text style={[styles.headingText, styles.danger]}>
                  {from?.name} passport holders need visa to travel to {to.name}
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

            <View style={styles.resetButtonWrapper}>
              <TouchableOpacity
                onPress={resetHandler}
                activeOpacity={0.7}
                style={styles.resetButton}
              >
                <Text style={styles.resetButtonText}>Reset</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
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
  resetButtonWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 25,
  },
  infoText: {
    marginTop: 15,
    lineHeight: 13,
    fontSize: 10,
    textAlign: "center",
    maxWidth: 300,
    color: "#000",
    opacity: 0.6,
  },
  resetButton: {
    backgroundColor: "#f2f2f2",
    paddingVertical: 10,
    width: "100%",
    borderRadius: 15,
    alignItems: "center",
  },
  resetButtonText: {
    fontWeight: "500",
  },
  lf: {
    flexDirection: "row",
    alignItems: "center",
  },
  textContentWrapper: {
    backgroundColor: "#fafafa",
    padding: 15,
    borderRadius: 10,
    marginTop: 25,
    flexDirection: "row",
    alignItems: "center",
  },
  headingText: {
    fontWeight: "500",
    fontSize: 14,
    marginLeft: 10,
    color: "#000",
    lineHeight: 18,
    maxWidth: "80%",
  },
  secondaryTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 25,
    color: COLORS.darkgray,
  },
  danger: {
    color: "#D74E4E",
  },
  success: {
    color: "#1a806b",
  },
  warning: {
    color: "#d27d00",
  },
  successBg: {
    backgroundColor: "#e8f1ef",
  },
  staysNtype: {
    marginTop: 10,
  },
  staysNtypeRow: {
    flexDirection: "row",
    marginVertical: 3,
  },
  staysNtypeRowKey: {
    width: 100,
    color: COLORS.darkgray,
    fontSize: 12,
    fontWeight: "bold",
  },
  staysNtypeRowValue: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#000",
    textTransform: "capitalize",
  },
  box: {
    height: 300,
    borderTopEndRadius: 0,
    borderTopLeftRadius: 0,
    overflow: "hidden",
  },
  keyValue: {
    display: "flex",
    marginBottom: 30,
  },
  key: {
    fontWeight: "600",
    fontSize: 14,
    color: COLORS.darkgray,
    marginRight: 5,
    marginBottom: 10,
  },
  value: {
    fontWeight: "bold",
    fontSize: 15,
    color: COLORS.black,
    marginRight: 5,
  },
  multiValues: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  dangerBg: {
    backgroundColor: "#ffe8e8",
  },
  warningBg: {
    backgroundColor: "#fff3e4",
  },
  visaTypes: {
    flex: 1,
  },
  visaTypeCard: {
    backgroundColor: "#f3f3f3",
    marginTop: 20,
    padding: 15,
    borderRadius: 10,
  },
  visaTypeCardTitle: {
    fontWeight: "bold",
    fontSize: 18,
    color: "#000",
  },
  visaCheckerCard: {
    borderWidth: 1,
    backgroundColor: "#fff",
    borderColor: "#eee",
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 1.84, 
    ...Platform.select({
      android: {
        elevation: 5,
      },
    }),
  },
  visaCheckerCardTitle: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "600",
    color: COLORS.black,
  },
  countrySelects: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 25,
    marginBottom: 15,
  },
  visaCheckerCardSub: {
    textAlign: "center",
    fontSize: 15,
    fontWeight: "400",
    color: COLORS.gray,
    marginTop: 5,
  },
  fromTo: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    maxWidth: 140,
    backgroundColor: "#f2f2f2",
    paddingHorizontal: 8,
    paddingVertical: 10,
    borderRadius: 8,
    position: "relative",
    justifyContent: "space-between",
  },
  fromToText: {
    marginRight: 8,
    marginLeft: 8,
    fontSize: 13,
    fontWeight: "600",
    maxWidth: 75,
  },
});
