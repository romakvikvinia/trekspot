import { Image } from "expo-image";
import {
  ImageBackground,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import * as Haptics from "expo-haptics";
import { Mark, StarIcon } from "../../../utilities/SvgIcons.utility";

type CityImageProps = {
  item: Object;
  handleCity: (item: Object) => void;
};

export const CityImage = ({ item, handleCity }: CityImageProps) => {
  return (
    <View style={styles.androidImageContainer}>
      <Image
        style={styles.box}
        contentFit="cover"
        source={
          item?.image?.url
            ? {
                uri: item?.image?.url,
              }
            : require("../../../assets/no-image.png")
        }
        
      ></Image>
      <TouchableOpacity
        style={styles.gradientWrapper}
        activeOpacity={0.7}
        onPress={() => handleCity(item)}
      >
        <LinearGradient
          style={styles.gradientWrapper}
          colors={["rgba(0,0,0,0.01)", "rgba(0,0,0,0.6)"]}
        >
          <View style={styles.labelItem}>
            {/* <Mark color="#fff" /> */}
            <Text
              numberOfLines={2}
              style={[styles.labelItemText, styles.titleSm]}
            >
              {item.city}
            </Text>
          </View>
          <View style={styles.ratingLabel}>
            {item?.rate ? (
              <>
                <View
                  style={{
                    position: "relative",
                    top: -1,
                    opacity: 0.8,
                  }}
                >
                  <StarIcon color="#FFBC3E" />
                </View>
                <Text style={styles.ratingText}>{item.rate}</Text>
              </>
            ) : null}
            {item?.visitors ? (
              <Text style={styles.ratingText}>{item.visitors} visitors</Text>
            ) : null}
          </View>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  androidImageContainer: {
    width: 160,
    minWidth: 160,
    height: 140,
    backgroundColor: "#fafafa",
    borderRadius: 15,
    overflow: "hidden",
    marginRight: 10,
    position: "relative",
  },
  gradientWrapper: {
    flex: 1,
    justifyContent: "flex-end",
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
  },
  titleSm: {
    fontSize: 16,
    marginLeft: 2,
    marginTop: -1,
  },
  labelItemText: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
    marginLeft: 0,
    paddingRight: 10,
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
    opacity: 0.8,
    fontWeight: "500",
  },

  contentBox: {
    marginTop: 5,
    paddingLeft: 15,
  },
  box: {
    width: 160,
    minWidth: 160,
    height: 140,
    backgroundColor: "#fafafa",
    borderRadius: 15,
    overflow: "hidden",
  },
});
