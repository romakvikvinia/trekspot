import React, { useCallback, useState } from "react";

import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { COLORS, SIZES } from "../../styles/theme";

import { CountryType } from "../../api/api.types";
import { CountryItem } from "./CountryItem";
import { CountryDetailModal } from "./destination/CountryDetailModal";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";

interface DestinationContainerProps {
  title: string;
  countries: CountryType[];
  seeAllItems?: boolean;
  popularCountriesLoading: boolean;
}

interface IState {
  countryId: string | null;
}

export const DestinationContainer: React.FC<DestinationContainerProps> = ({
  countries,
  title,
  seeAllItems = true,
  popularCountriesLoading,
}) => {
  const navigation = useNavigation();
  const [state, setState] = useState<IState>({ countryId: null });

  const handleDetailOfCountry = useCallback((countryId: string) => {
    // setState((prevState) => ({ ...prevState, countryId }));

    navigation.navigate("CountryDetailScreen", {
      countryId: countryId,
    });
  }, []);

  // const handleClearState = useCallback(() => {
  //   setState((prevState) => ({ ...prevState, countryId: null }));
  // }, []);
  console.log("countries", countries[0]);
  return (
    <>
      <View style={[styles.rowItem]} style={{ marginTop: 0 }}>
        <View style={styles.rowItemHeader}>
          <Text style={styles.h2}>{title}</Text>
          {seeAllItems && (
            <TouchableOpacity activeOpacity={0.7}>
              <Text style={styles.seeAllButtonTxt}>See all</Text>
            </TouchableOpacity>
          )}
        </View>
        {!popularCountriesLoading ? (
          <ScrollView
            horizontal
            style={styles.contentBox}
            showsHorizontalScrollIndicator={false}
          >
            {countries.map((country, ind) => (
              <CountryItem
                key={`countries-${country.id}-${country.name}-${title}`}
                item={country}
                isWith={countries.length - 1 === ind}
                openModal={handleDetailOfCountry}
              />
            ))}
          </ScrollView>
        ) : (
          <ScrollView
            contentContainerStyle={{ paddingHorizontal: 15 }}
            horizontal
            showsHorizontalScrollIndicator={false}
          >
            {[0, 1, 2, 3].map((item, ind) => (
              <View
                style={{
                  width: 160,
                  height: 185,
                  borderRadius: 10,
                  marginRight: 10,
                }}
                key={ind}
              >
                <LinearGradient
                  colors={["rgba(0,0,0,0.1)", "rgba(0,0,0,0.6)"]}
                  style={{
                    width: 160,
                    height: 185,
                    borderRadius: 10,
                  }}
                ></LinearGradient>
              </View>
            ))}
          </ScrollView>
        )}
      </View>
      {/** Country detail modal */}
      {/* {state.countryId && (
        <CountryDetailModal
          id={state.countryId}
          closeCallBack={handleClearState}
        />
      )} */}
    </>
  );
};

const styles = StyleSheet.create({
  gradientWrapper: {
    flex: 1,
    justifyContent: "flex-end",
  },
  titleSm: {
    fontSize: 14,
    marginLeft: 2,
  },
  labelItemText: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "500",
    marginLeft: 5,
  },
  labelItem: {
    padding: 10,
    paddingVertical: 0,
    flexDirection: "row",
    alignItems: "center",
  },

  ratingLabel: {
    flexDirection: "row",
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 30,
    alignItems: "center",
    paddingBottom: 10,
  },
  ratingText: {
    color: "#fff",
    marginLeft: 3,
    fontSize: 12,
    opacity: 0.7,
  },

  ratingTextXs: {
    fontSize: 10,
  },

  rowItem: {
    width: "100%",
    paddingTop: 25,
    backgroundColor: "#f8f8f8",
  },
  rowItemHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: SIZES.padding,
    paddingHorizontal: 15,
  },
  seeAllButtonTxt: {
    color: COLORS.primary,
    fontSize: SIZES.body4,
  },
  h2: {
    fontSize: 22,
    color: "#000",
    fontWeight: "600",
  },
  contentBox: {
    marginTop: 5,
    paddingLeft: 15,
  },
  box: {
    width: 130,
    height: 130,
    backgroundColor: "#fafafa",
    borderRadius: 15,
    overflow: "hidden",
    marginRight: 10,
  },
});
