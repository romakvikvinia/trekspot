import {
  Linking,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";

import { COLORS } from "../../../styles/theme";
import { DirectionIcon } from "../../../utilities/SvgIcons.utility";

export const ShowDirectionButton = ({ data }) => {
const latitude = data?.location?.lat;
const longitude = data?.location?.lng;
const placeName = data?.title;

  const openMap = () => {
    const scheme = Platform.select({
      ios: `maps:${latitude},${longitude}?q=${encodeURIComponent(
        placeName
      )}&ll=${latitude},${longitude}`,
      android: `geo:${latitude},${longitude}?q=${latitude},${longitude}(${encodeURIComponent(
        placeName
      )})`,
    });

    const url = Platform.select({
      ios: `${scheme}`,
      android: `${scheme}`,
    });

    Linking.openURL(url!);
  };

  return (
    <TouchableOpacity
      style={styles.directionButton}
      activeOpacity={0.7}
      onPress={() => openMap()}
    > 
    <DirectionIcon/>
      <Text style={styles.directionButtonText}>Direction</Text>
    </TouchableOpacity>
  );
};

export const styles = StyleSheet.create({
  directionButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 25,
    flexDirection: "row",
    marginRight: 0,
    padding: 10,
    paddingHorizontal: 15
  },
  directionButtonText: {
    color: "#fff",
    fontSize: 14,
    marginLeft: 5,
  },
});
