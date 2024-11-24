import React, { useEffect } from "react";
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import { MapView } from "./MapView";
import { COLORS, SIZES } from "../../styles/theme";

import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { HomeRouteStackParamList } from "../../routes/home/HomeRoutes";
import Constants from "expo-constants";
import { Territories } from "./Territories";
import {
  AttractionsIcon,
  BeachesIcon,
  CasinosIcon,
  HistoricalPlacesIcon,
  MarketsIcon,
  MuseumsIcon,
  TopExperiencesIcon,
  TopsightsIcon,
} from "../../utilities/SvgIcons.utility";
import { useAnalyticsQuery } from "../../api/api.trekspot";
import { SightType } from "../../api/api.types";
import { DoneActivities } from "./DoneActivities";

type HomeProps = NativeStackScreenProps<HomeRouteStackParamList, "Main">;

export const HomeScreen: React.FC<HomeProps> = ({}) => {
  const { data: analyticsData, isLoading, isFetching } = useAnalyticsQuery();

  // transform data
  const activities: Record<string, SightType[]> = {};

  analyticsData?.analytics.activities.forEach((sight) => {
    if (sight.category in activities) {
      activities[sight.category] = [...activities[sight.category], sight];
    } else {
      activities[sight.category] = [sight];
    }
  });

  const categoryIcons: any = {
    "top sights": TopsightsIcon,
    museums: MuseumsIcon,
    "historical places": HistoricalPlacesIcon,
    "outdoor attractions": AttractionsIcon,
    markets: MarketsIcon,
    "top experiences": TopExperiencesIcon,
    beaches: BeachesIcon,
    casinos: CasinosIcon,
  };

  //
  const visitedCountries = analyticsData?.analytics.visitedCountries || [];
 
  return (
    <View style={[styles.safeArea]}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <MapView
          world={analyticsData?.analytics.world}
          isLoading={isLoading || isFetching}
          countryQuantity={analyticsData?.analytics.countries}
          visitedCountries={visitedCountries}
          territories={analyticsData?.analytics.territories}
        />

        <View style={styles.mapStats}>
          <Text style={styles.cardTitle}>Territories</Text>
          <Territories />
        </View>

        {Object.keys(activities) && Object.keys(activities).length > 0 && (
          <DoneActivities
            key={`DoneActivities-${Object.keys(activities).length}`}
            activities={activities}
            categoryIcons={categoryIcons}
          />
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f8f8f8",
    paddingTop: Constants?.statusBarHeight + 10,
  },
  lf: {
    maxWidth: "80%",
  },
  amount: {
    fontSize: 18,
    fontWeight: "bold",
  },
  categoryIcon: {
    width: 30,
    height: 30,
    backgroundColor: "#fff",
    borderRadius: 100,
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  visitedCategoryText: {
    fontSize: 14,
    fontWeight: "500",
  },
  statItem: {
    width: 150,
    height: 120,
    backgroundColor: "#fafafa",
    marginRight: 15,
    borderRadius: 10,
    padding: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
  },
  visitedStats: {
    marginTop: 15,
    backgroundColor: "#fff",
    paddingVertical: 20,
  },
  countriesAmountText: {
    fontSize: 8,
    fontWeight: "normal",
    marginTop: 2,
  },
  mapStats: {
    flex: 1,
    paddingHorizontal: 15,
    backgroundColor: "#fff",
    paddingVertical: 20,
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
    paddingVertical: 20,
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
    fontSize: 12,
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
    fontSize: 26,
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
