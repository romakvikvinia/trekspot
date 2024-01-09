import { useCallback, useEffect, useState } from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Flags } from "../../utilities/flags";
import { LivedIcon, VisitedIcon } from "../../utilities/SvgIcons.utility";
import { COLORS } from "../../styles/theme";
import { storeCountries } from "../../helpers/secure.storage";

interface HomeProps {
  name: string;
  iso2: string;
  capital: string;
  visited_countries: string[];
  lived_countries: string[];
}

export const CountryItem: React.FC<HomeProps> = ({
  name,
  iso2,
  visited_countries,
  lived_countries,
}) => {
  const [state, setState] = useState({
    isVisited: visited_countries.includes(iso2),
    isLived: lived_countries.includes(iso2),
  });

  const handleVisited = useCallback((code: string) => {
    storeCountries(code);
    setState((prevState) => ({
      ...prevState,
      isVisited: !prevState.isVisited,
    }));
  }, []);

  const handleLived = useCallback((code: string) => {
    storeCountries(code, "lived_countries");
    setState((prevState) => ({
      ...prevState,
      isLived: !prevState.isLived,
    }));
  }, []);

  useEffect(() => {
    setState((prevState) => ({
      ...prevState,
      isVisited: visited_countries.includes(iso2),
    }));
  }, [visited_countries, iso2]);

  useEffect(() => {
    setState((prevState) => ({
      ...prevState,
      isLived: lived_countries.includes(iso2),
    }));
  }, [lived_countries, iso2]);

  // @ts-ignore
  const imagePath = Flags[iso2];

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
        <Text style={styles.itemTitle}>{name}</Text>
      </View>
      <View style={styles.countryItemActions}>
        <TouchableOpacity
          style={[
            styles.countryItemActionButton,
            state.isVisited ? styles.countryActive : null,
          ]}
          onPress={() => handleVisited(iso2)}
        >
          <VisitedIcon active={state.isVisited} />
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.countryItemActionButton,
            state.isLived ? styles.countryLived : null,
          ]}
          onPress={() => handleLived(iso2)}
        >
          <LivedIcon active={state.isLived} />
        </TouchableOpacity>
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
