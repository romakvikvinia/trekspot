import {
  Linking,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { DirectionIcon } from "../../../utilities/SvgIcons.utility";
import { COLORS } from "../../../styles/theme";

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
    padding: 10,
    borderRadius: 25,
    paddingHorizontal: 15,
    marginRight: 0,
    flexDirection: "row"
  },
  directionButtonText: {
    color: "#fff",
    fontSize: 14,
    marginLeft: 5,
  },
});
