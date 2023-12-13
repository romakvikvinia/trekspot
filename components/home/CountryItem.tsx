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
import { useState, memo } from "react";
import { storeCountries } from "../../helpers/secure.storage";
import { useVisitedOrLivedCountries } from "../../package/store";

interface HomeProps {
  name: string;
  iso2: string;
  capital: string;
  lived?: boolean;
  visited?: boolean;
  onVisited: (code: string) => void;
}

export const CountryItem: React.FC<HomeProps> = memo(
  ({ name, iso2, lived, visited, onVisited }) => {
    const onVisitedCountries = useVisitedOrLivedCountries(
      (state) => state.updateVisitedCountries
    );
    const [state, setState] = useState({ isVisited: visited, isLived: lived });
    // Assuming that `item` contains the ISO2 country code

    // Check if the image path exists in the mapping
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
            onPress={() => {
              // storeCountries(iso2);
              onVisitedCountries(iso2);
              setState((prevState) => ({
                ...prevState,
                isVisited: !prevState.isVisited,
              }));
            }}
          >
            <VisitedIcon active={state.isVisited} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.countryItemActionButton,
              lived ? styles.countryLived : null,
            ]}
            //   onPress={() => setLivedCountry(countryCode)}
          >
            <LivedIcon active={lived} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
);

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
