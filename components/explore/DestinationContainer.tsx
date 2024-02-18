import React, { useCallback, useState } from "react";

import {
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

interface DestinationContainerProps {
  title: string;
  countries: CountryType[];
  seeAllItems?: boolean;
}

interface IState {
  countryId: string | null;
}

export const DestinationContainer: React.FC<DestinationContainerProps> = ({
  countries,
  title,
  seeAllItems = true,
}) => {
  const [state, setState] = useState<IState>({ countryId: null });

  const handleDetailOfCountry = useCallback((countryId: string) => {
    setState((prevState) => ({ ...prevState, countryId }));
  }, []);

  return (
    <>
      <View style={[styles.rowItem]}>
        <View style={styles.rowItemHeader}>
          <Text style={styles.h2}>{title}</Text>
          {seeAllItems && (
            <TouchableOpacity activeOpacity={0.7}>
              <Text style={styles.seeAllButtonTxt}>See all</Text>
            </TouchableOpacity>
          )}
        </View>

        <ScrollView
          horizontal
          style={styles.contentBox}
          showsHorizontalScrollIndicator={false}
        >
          {countries.map((country, ind) => (
            <CountryItem
              key={`popular-country-${country.id}`}
              item={country}
              isWith={countries.length - 1 === ind}
              openModal={() => handleDetailOfCountry(country.id!)}
            />
          ))}
        </ScrollView>
      </View>
      {/** Country detail modal */}
      {state.countryId && <CountryDetailModal id={state.countryId} />}
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
