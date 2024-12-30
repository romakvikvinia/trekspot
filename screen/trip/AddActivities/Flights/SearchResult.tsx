import { Image } from "expo-image";
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { COLORS } from "../../../../styles/theme";
import { Flags } from "../../../../utilities/flags";

export const SearchResult = ({ handleClickSearchResult }) => {
  return (
    <>
      <TouchableOpacity
        style={styles.resultItem}
        onPress={() =>
          handleClickSearchResult({
            iata: "QR",
          })
        }
      >
        <Image
          style={styles.cardImage}
          contentFit="cover"
          source={
            true
              ? {
                  uri: "https://images.kiwi.com/airlines/64/QR.png",
                }
              : require("../../../../assets/no-image.png")
          }
        />
        <View style={styles.metaData}>
          <Text style={styles.metaTitle}>Qatar Airways</Text>
          <Text style={styles.metaSubTitle}>QR</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.resultItem}>
        <Image
          style={styles.cardImage}
          contentFit="cover"
          source={
            true
              ? {
                  uri: "https://images.kiwi.com/airlines/64/NU.png",
                }
              : require("../../../../assets/no-image.png")
          }
        />
        <View style={styles.metaData}>
          <Text style={styles.metaTitle} numberOfLines={1}>
            Japan Transocean Air
          </Text>
          <Text style={styles.metaSubTitle}>NU</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.resultItem}
        onPress={() =>
          handleClickSearchResult({
            airport: "TBS",
          })
        }
      >
        <ImageBackground
          resizeMode="contain"
          style={styles.CountryCardImage}
          source={Flags["GE"]} // Set the image source
        />
        <View style={styles.metaData}>
          <Text style={styles.metaTitle} numberOfLines={1}>
            Tbilisi International Airport
          </Text>
          <Text style={styles.metaSubTitle}>TBS · UGTB · Tbilisi</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.resultItem}>
        <ImageBackground
          resizeMode="contain"
          style={styles.CountryCardImage}
          source={Flags["AE"]} // Set the image source
        />
        <View style={styles.metaData}>
          <Text style={styles.metaTitle} numberOfLines={1}>
            Abu Dhabi International Airport
          </Text>
          <Text style={styles.metaSubTitle}>AUH · OMAA · Dubai</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.resultItem}>
        <Image
          style={styles.cardImage}
          contentFit="cover"
          source={
            true
              ? {
                  uri: "https://images.kiwi.com/airlines/64/QR.png",
                }
              : require("../../../../assets/no-image.png")
          }
        />
        <View style={styles.metaData}>
          <Text style={styles.metaTitle}>Qatar Airways</Text>
          <Text style={styles.metaSubTitle}>QR</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.resultItem}>
        <Image
          style={styles.cardImage}
          contentFit="cover"
          source={
            true
              ? {
                  uri: "https://images.kiwi.com/airlines/64/NU.png",
                }
              : require("../../../../assets/no-image.png")
          }
        />
        <View style={styles.metaData}>
          <Text style={styles.metaTitle} numberOfLines={1}>
            Japan Transocean Air
          </Text>
          <Text style={styles.metaSubTitle}>NU</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.resultItem}>
        <ImageBackground
          resizeMode="contain"
          style={styles.CountryCardImage}
          source={Flags["GE"]} // Set the image source
        />
        <View style={styles.metaData}>
          <Text style={styles.metaTitle} numberOfLines={1}>
            Tbilisi International Airport
          </Text>
          <Text style={styles.metaSubTitle}>TBS · UGTB · Tbilisi</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.resultItem}>
        <ImageBackground
          resizeMode="contain"
          style={styles.CountryCardImage}
          source={Flags["AE"]} // Set the image source
        />
        <View style={styles.metaData}>
          <Text style={styles.metaTitle} numberOfLines={1}>
            Abu Dhabi International Airport
          </Text>
          <Text style={styles.metaSubTitle}>AUH · OMAA · Dubai</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.resultItem}>
        <Image
          style={styles.cardImage}
          contentFit="cover"
          source={
            true
              ? {
                  uri: "https://images.kiwi.com/airlines/64/QR.png",
                }
              : require("../../../../assets/no-image.png")
          }
        />
        <View style={styles.metaData}>
          <Text style={styles.metaTitle}>Qatar Airways</Text>
          <Text style={styles.metaSubTitle}>QR</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.resultItem}>
        <Image
          style={styles.cardImage}
          contentFit="cover"
          source={
            true
              ? {
                  uri: "https://images.kiwi.com/airlines/64/NU.png",
                }
              : require("../../../../assets/no-image.png")
          }
        />
        <View style={styles.metaData}>
          <Text style={styles.metaTitle} numberOfLines={1}>
            Japan Transocean Air
          </Text>
          <Text style={styles.metaSubTitle}>NU</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.resultItem}>
        <ImageBackground
          resizeMode="contain"
          style={styles.CountryCardImage}
          source={Flags["GE"]} // Set the image source
        />
        <View style={styles.metaData}>
          <Text style={styles.metaTitle} numberOfLines={1}>
            Tbilisi International Airport
          </Text>
          <Text style={styles.metaSubTitle}>TBS · UGTB · Tbilisi</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.resultItem}>
        <ImageBackground
          resizeMode="contain"
          style={styles.CountryCardImage}
          source={Flags["AE"]} // Set the image source
        />
        <View style={styles.metaData}>
          <Text style={styles.metaTitle} numberOfLines={1}>
            Abu Dhabi International Airport
          </Text>
          <Text style={styles.metaSubTitle}>AUH · OMAA · Dubai</Text>
        </View>
      </TouchableOpacity>
    </>
  );
};
const styles = StyleSheet.create({
  CountryCardImage: {
    backgroundColor: "#ddd",
    borderRadius: 6,
    height: 30,
    marginRight: 10,
    overflow: "hidden",
    width: 40,
  },
  cardImage: {
    borderRadius: 50,
    height: 40,
    marginRight: 10,
    width: 40,
  },
  metaData: {
    position: "relative",
    width: "100%",
  },
  metaSubTitle: {
    color: COLORS.gray,
    fontSize: 14,
    fontWeight: "400",
    marginTop: 2,
    textTransform: "uppercase",
  },
  metaTitle: {
    color: COLORS.black,
    fontSize: 18,
    fontWeight: "600",
    width: "90%",
  },
  resultItem: {
    alignItems: "center",
    borderBottomColor: "#dedee0",
    borderBottomWidth: 1,
    flexDirection: "row",
    marginBottom: 15,
    paddingBottom: 15,
    width: "100%",
  },
});
