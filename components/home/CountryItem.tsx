import React, { useCallback, useEffect, useState } from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Flags } from "../../utilities/flags";
import {
  //LivedIcon,
  VisitedIcon,
} from "../../utilities/SvgIcons.utility";
import { COLORS } from "../../styles/theme";

import * as Haptics from "expo-haptics";

import { CountryType } from "../../api/api.types";
import { storeCountries } from "../../helpers/secure.storage";

interface HomeProps {
  country: CountryType;
  visitedCountries: Record<string, string>;
}

export const CountryItem: React.FC<HomeProps> = ({
  country,
  visitedCountries,
}) => {
  const [state, setState] = useState({
    visited: false,
    lived: false,
  });

  useEffect(() => {
    (async () => {
      setState((prevState) => ({
        ...prevState,
        visited: visitedCountries && country.id in visitedCountries,
      }));
    })();
  }, [visitedCountries]);

  const handleVisited = useCallback((country: CountryType) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setState((prevState) => ({ ...prevState, visited: !prevState.visited }));
    storeCountries({ id: country.id, iso2: country.iso2 });
  }, []);

  // @ts-ignore
  const imagePath = Flags[country.iso2];

  return (
    <View style={styles.countryItem}>
      <View style={styles.countryItemLeft}>
        <View
          style={{
            width: 31,
            height: 21,
            borderRadius: 3,
            overflow: "hidden",
            borderWidth: 1,
            borderColor: "#fafafa",
          }}
        >
          <ImageBackground
            resizeMode="cover"
            style={{
              width: 30,
              height: 20,
              backgroundColor: "#ddd",
            }}
            source={imagePath ? imagePath : null} // Set the image source
          />
        </View>
        <Text style={styles.itemTitle}>{country.name} </Text>
      </View>
      <View style={styles.countryItemActions}>
        <TouchableOpacity
          style={[
            styles.countryItemActionButton,
            state.visited ? styles.countryActive : null,
          ]}
          onPress={() => handleVisited(country)}
        >
          <VisitedIcon active={state.visited} />
        </TouchableOpacity>
        {/* <TouchableOpacity
          style={[
            styles.countryItemActionButton,
            state.isLived ? styles.countryLived : null,
          ]}
          onPress={() => handleLived(iso2)}
        >
          <LivedIcon active={state.isLived} />
        </TouchableOpacity> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  itemTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginLeft: 10,
    color: "#000",
  },
  countryItem: {
    paddingHorizontal: 15,
    marginBottom: 20,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  countryItemActionButton: {
    backgroundColor: "#fafafa",
    paddingVertical: 8,
    paddingHorizontal: 10,
    marginLeft: 8,
    borderRadius: 5,
  },
  countryItemLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  countryItemActions: {
    flexDirection: "row",
    alignItems: "center",
  },
  countryActive: {
    backgroundColor: COLORS.primary,
  },
  countryLived: {
    backgroundColor: "#00d52d",
  },
});
