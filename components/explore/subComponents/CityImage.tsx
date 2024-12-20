import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { StarIcon } from "../../../utilities/SvgIcons.utility";

type CityImageProps = {
  item: object;
  handleCity: (item: object) => void;
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
        // cachePolicy="memory-disk"
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
    backgroundColor: "#fafafa",
    borderRadius: 15,
    height: 140,
    marginRight: 10,
    minWidth: 160,
    overflow: "hidden",
    position: "relative",
    width: 160,
  },
  box: {
    backgroundColor: "#fafafa",
    borderRadius: 15,
    height: 140,
    minWidth: 160,
    overflow: "hidden",
    width: 160,
  },
  gradientWrapper: {
    flex: 1,
    height: "100%",
    justifyContent: "flex-end",
    left: 0,
    position: "absolute",
    top: 0,
    width: "100%",
  },
  labelItem: {
    alignItems: "center",
    flexDirection: "row",
    padding: 10,
    paddingVertical: 0,
  },

  labelItemText: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
    marginLeft: 0,
    paddingRight: 10,
  },
  ratingLabel: {
    alignItems: "center",
    borderRadius: 30,
    flexDirection: "row",
    paddingBottom: 10,
    paddingHorizontal: 10,
    paddingVertical: 3,
  },

  ratingText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "500",
    marginLeft: 3,
    opacity: 0.8,
  },
  titleSm: {
    fontSize: 16,
    marginLeft: 2,
    marginTop: -1,
  },
});
