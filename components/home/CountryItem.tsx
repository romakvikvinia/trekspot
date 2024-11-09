import { useCallback, useEffect, useState } from "react";
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
import { toggleVisitedCountry, toggleLivedCountry } from "../../package/slices";
import { CountryType } from "../../api/api.types";
import { useAppDispatch } from "../../package/store";

interface HomeProps {
  country: CountryType;
  visited_countries: Record<string, CountryType>;
  lived_countries: Record<string, CountryType>;
}

export const CountryItem: React.FC<HomeProps> = ({
  country,
  visited_countries,
  lived_countries,
}) => {
  const dispatch = useAppDispatch();
  const [state, setState] = useState({
    isVisited: country.id in visited_countries,
    isLived: country.id in lived_countries,
  });

  const handleVisited = useCallback((country: CountryType) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    // storeCountries(code);
    dispatch(toggleVisitedCountry(country));
    setState((prevState) => ({
      ...prevState,
      isVisited: !prevState.isVisited,
    }));
  }, []);

  // const handleLived = useCallback((code: string) => {
  //   Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  //   dispatch(toggleLivedCountry(country));
  //   setState((prevState) => ({
  //     ...prevState,
  //     isLived: !prevState.isLived,
  //   }));
  // }, []);

  useEffect(() => {
    setState((prevState) => ({
      ...prevState,
      isVisited: country.id in visited_countries,
    }));
  }, [visited_countries, country.iso2]);

  useEffect(() => {
    setState((prevState) => ({
      ...prevState,
      isLived: country.id in lived_countries,
    }));
  }, [lived_countries, country.iso2]);

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
        <Text style={styles.itemTitle}>{country.name}</Text>
      </View>
      <View style={styles.countryItemActions}>
        <TouchableOpacity
          style={[
            styles.countryItemActionButton,
            state.isVisited ? styles.countryActive : null,
          ]}
          onPress={() => handleVisited(country)}
        >
          <VisitedIcon active={state.isVisited} />
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
