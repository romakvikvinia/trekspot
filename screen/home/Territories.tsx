import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { formatPercentage } from "../../helpers/number.helper";
import { COLORS, SIZES } from "../../styles/theme";
import {
  AfricaIcon,
  AsiaIcon,
  Australia,
  EuropeIcon,
  NAmerica,
  SAmerica,
} from "../../utilities/svg";
import React from "react";
import { useVisitedCountriesQuery } from "../../api/api.trekspot";

export const Territories = ({ setContinent }) => {
  const {
    isLoading,
    data: visitedCountriesData,
    isSuccess: isVisitedCountriesSuccess,
  } = useVisitedCountriesQuery();

  // transform data
  const europeCountries =
    !isLoading && visitedCountriesData?.visitedCountries?.length
      ? visitedCountriesData?.visitedCountries?.filter((i) =>
          i.continents.includes("Europe")
        ).length
      : 0;
  const asiaCountries =
    !isLoading && visitedCountriesData?.visitedCountries?.length
      ? visitedCountriesData?.visitedCountries?.filter((i) =>
          i.continents.includes("Asia")
        ).length
      : 0;

  const africaCountries =
    !isLoading && visitedCountriesData?.visitedCountries?.length
      ? visitedCountriesData?.visitedCountries?.filter((i) =>
          i.continents.includes("Africa")
        ).length
      : 0;

  const northAmericaCountries =
    !isLoading && visitedCountriesData?.visitedCountries?.length
      ? visitedCountriesData?.visitedCountries?.filter((i) =>
          i.continents.includes("North America")
        ).length
      : 0;

  const southAmericaCountries =
    !isLoading && visitedCountriesData?.visitedCountries?.length
      ? visitedCountriesData?.visitedCountries?.filter((i) =>
          i.continents.includes("South America")
        ).length
      : 0;

  const oceaniaCountries =
    !isLoading && visitedCountriesData?.visitedCountries?.length
      ? visitedCountriesData?.visitedCountries?.filter((i) =>
          i.continents.includes("Oceania")
        ).length
      : 0;

  return (
    <View
      style={{
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        marginTop: 20,
      }}
    >
      {isLoading ? (
        <>
          <View
            style={[
              styles.mapStatRow,
              { backgroundColor: "#f2f2f2", height: 70 },
            ]}
          ></View>
          <View
            style={[styles.mapStatRow, { backgroundColor: "#f2f2f2" }]}
          ></View>
          <View
            style={[
              styles.mapStatRow,
              { backgroundColor: "#f2f2f2", height: 70 },
            ]}
          ></View>
          <View
            style={[styles.mapStatRow, { backgroundColor: "#f2f2f2" }]}
          ></View>
          <View
            style={[
              styles.mapStatRow,
              { backgroundColor: "#f2f2f2", height: 70 },
            ]}
          ></View>
          <View
            style={[styles.mapStatRow, { backgroundColor: "#f2f2f2" }]}
          ></View>
        </>
      ) : (
        <>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => setContinent("Europe")}
            style={styles.mapStatRow}
          >
            <View style={styles.leftSide}>
              <EuropeIcon />
              <View>
                <Text style={styles.mapStatsText}>Europe</Text>
                <Text style={[styles.mapStatsText, styles.countriesAmountText]}>
                  47 countries
                </Text>
              </View>
            </View>
            <View style={styles.statWrapp}>
              <Text style={styles.mapStatsPercentText}>
                {formatPercentage(
                  europeCountries ? (europeCountries / 47) * 100 : 0
                )}
              </Text>
              <Text style={styles.percentText}>%</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => setContinent("Asia")}
            style={[styles.mapStatRow, { backgroundColor: "#A88955" }]}
          >
            <View style={styles.leftSide}>
              <AsiaIcon />
              <View>
                <Text style={styles.mapStatsText}>Asia</Text>
                <Text style={[styles.mapStatsText, styles.countriesAmountText]}>
                  44 countries
                </Text>
              </View>
            </View>

            <View style={styles.statWrapp}>
              <Text style={styles.mapStatsPercentText}>
                {formatPercentage(
                  asiaCountries ? (asiaCountries / 44) * 100 : 0
                )}
              </Text>
              <Text style={styles.percentText}>%</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => setContinent("Africa")}
            style={[styles.mapStatRow, { backgroundColor: "#C68A4A" }]}
          >
            <View style={styles.leftSide}>
              <AfricaIcon />
              <View>
                <Text style={styles.mapStatsText}>Africa</Text>
                <Text style={[styles.mapStatsText, styles.countriesAmountText]}>
                  54 countries
                </Text>
              </View>
            </View>
            <View style={styles.statWrapp}>
              <Text style={styles.mapStatsPercentText}>
                {formatPercentage(
                  africaCountries ? (africaCountries / 54) * 100 : 0
                )}
              </Text>
              <Text style={styles.percentText}>%</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => setContinent("North America")}
            style={[styles.mapStatRow, { backgroundColor: "#438E6A" }]}
          >
            <View style={styles.leftSide}>
              <NAmerica />
              <View>
                <Text style={styles.mapStatsText}>N. America</Text>
                <Text style={[styles.mapStatsText, styles.countriesAmountText]}>
                  23 countries
                </Text>
              </View>
            </View>
            <View style={styles.statWrapp}>
              <Text style={styles.mapStatsPercentText}>
                {formatPercentage(
                  northAmericaCountries ? (northAmericaCountries / 23) * 100 : 0
                )}
              </Text>
              <Text style={styles.percentText}>%</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => setContinent("South America")}
            style={[styles.mapStatRow, { backgroundColor: "#893B70" }]}
          >
            <View style={styles.leftSide}>
              <SAmerica />
              <View>
                <Text style={styles.mapStatsText}>S. America</Text>
                <Text style={[styles.mapStatsText, styles.countriesAmountText]}>
                  12 countries
                </Text>
              </View>
            </View>
            <View style={styles.statWrapp}>
              <Text style={styles.mapStatsPercentText}>
                {formatPercentage(
                  southAmericaCountries ? (southAmericaCountries / 12) * 100 : 0
                )}
              </Text>
              <Text style={styles.percentText}>%</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => setContinent("Oceania")}
            style={[styles.mapStatRow, { backgroundColor: "#4490AA" }]}
          >
            <View style={styles.leftSide}>
              <Australia />
              <View>
                <Text style={styles.mapStatsText}>Oceania</Text>
                <Text style={[styles.mapStatsText, styles.countriesAmountText]}>
                  15 countries
                </Text>
              </View>
            </View>
            <View style={styles.statWrapp}>
              <Text style={styles.mapStatsPercentText}>
                {formatPercentage(
                  oceaniaCountries ? (oceaniaCountries / 15) * 100 : 0
                )}
              </Text>
              <Text style={styles.percentText}>%</Text>
            </View>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f8f8f8",
  },
  countriesAmountText: {
    fontSize: 10,
    fontWeight: "400",
    marginTop: 2,
  },
  mapStats: {
    flex: 1,
    paddingHorizontal: 15,
    backgroundColor: "#fff",
    paddingVertical: 25,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  percentText: {
    fontSize: 12,
    color: "#fff",
    marginTop: 8,
  },
  percentView: {
    marginLeft: 1,
    flexDirection: "row",
  },
  mapStatRow: {
    backgroundColor: "#4D3893",
    borderRadius: SIZES.radius * 2,
    paddingVertical: Platform.OS === "android" ? 12 : 20,
    paddingLeft: 15,
    paddingRight: 10,
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
    width: "49%",
  },
  statWrapp: {
    flexDirection: "row",
    alignItems: "center",
  },
  mapStatsText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: SIZES.width < 370 ? 12 : 13,
    marginLeft: 8,
  },
  rowItem: {
    width: "100%",
    paddingHorizontal: 15,
    backgroundColor: "#fff",
    paddingVertical: 25,
  },
  rowItemHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: SIZES.padding,
  },
  mapStatsPercentText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: Platform.OS === "android" ? 20 : SIZES.width < 400 ? 20 : 26,
  },
  leftSide: {
    flexDirection: "row",
    alignItems: "center",
  },
  seeAllButtonTxt: {
    color: COLORS.darkgray,
    fontSize: SIZES.body4,
  },
  h2: {
    fontSize: 22,
    color: "#000",
    fontWeight: "bold",
  },
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
  },

  contentBox: {
    width: "100%",
    marginTop: 15,
  },
  box: {
    width: 230,
    height: 130,
    backgroundColor: "#fafafa",
    borderRadius: 15,
    marginRight: 15,
    overflow: "hidden",
  },
});
