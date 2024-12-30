import * as Haptics from "expo-haptics";
import { usePostHog } from "posthog-react-native";
import React, { useCallback, useEffect, useState } from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { CountryType } from "../../api/api.types";
import { storeCountries } from "../../helpers/secure.storage";
import { COLORS } from "../../styles/theme";
import { Flags } from "../../utilities/flags";
import { Events } from "../../utilities/Posthog";
import {
  //LivedIcon,
  VisitedIcon,
} from "../../utilities/SvgIcons.utility";

interface HomeProps {
  country: CountryType;
  visitedCountries: Record<string, string>;
}

export const CountryItem: React.FC<HomeProps> = ({
  country,
  visitedCountries,
}) => {
  const posthog = usePostHog();
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

  const handleVisited = useCallback(async (country: CountryType) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    posthog.capture(Events.UserAddsVisits, { country: country.name });
    await storeCountries({ id: country.id, iso2: country.iso2 });
    setState((prevState) => ({ ...prevState, visited: !prevState.visited }));
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
  countryActive: {
    backgroundColor: COLORS.primary,
  },
  countryItem: {
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    paddingHorizontal: 15,
  },
  countryItemActionButton: {
    backgroundColor: "#fafafa",
    borderRadius: 5,
    marginLeft: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  countryItemActions: {
    alignItems: "center",
    flexDirection: "row",
  },
  countryItemLeft: {
    alignItems: "center",
    flexDirection: "row",
  },
  countryLived: {
    backgroundColor: "#00d52d",
  },
  itemTitle: {
    color: "#000",
    fontSize: 14,
    fontWeight: "bold",
    marginLeft: 10,
  },
});
