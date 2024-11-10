import React, { useRef } from "react";
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
  XIcon,
} from "../../utilities/SvgIcons.utility";
import {
  useAnalyticsQuery,
} from "../../api/api.trekspot";
import { SightType } from "../../api/api.types";
import {  useAppSelector } from "../../package/store";
import { Modalize } from "react-native-modalize";
import { Portal } from "react-native-portalize";

type HomeProps = NativeStackScreenProps<HomeRouteStackParamList, "Main">;

export const HomeScreen: React.FC<HomeProps> = ({}) => {
  
  const { visitedCountries } = useAppSelector((state) => state.countries);
  const { data: analyticsData, isLoading } = useAnalyticsQuery();

  const [categoryKey, setCategoryKey] = React.useState<string | null>(null);
  const activitiesDetailRef = useRef(null)

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
    "casinos": CasinosIcon
  };

  const handleShowActivitiesByCategory = (category: string) => {
    setCategoryKey(category);
    activitiesDetailRef.current?.open()
  }
  console.log("activities", categoryKey && activities[categoryKey]);

  return (
    <>
      <View style={[styles.safeArea]}>
        <ScrollView
          style={styles.container}
          showsVerticalScrollIndicator={false}
        >
          <MapView
            world={analyticsData?.analytics.world}
            isLoading={isLoading}
            countryQuantity={analyticsData?.analytics.countries}
            visitedCountries={analyticsData?.analytics.visitedCountries}
            territories={analyticsData?.analytics.territories}
            countriesOnMap={
              (visitedCountries &&
                Object.values(visitedCountries).map((c) => c.iso2)) ||
              []
            }
          />
          <View style={styles.mapStats}>
            <Text style={styles.cardTitle}>Territories</Text>
            <Territories
            // isLoading={isVisitedCountriesLoading}
            // visitedCountries={visitedCountriesData?.visitedCountries || []}
            />
          </View>
          <View style={styles.visitedStats}>
            <Text
              style={[
                styles.cardTitle,
                { paddingHorizontal: 15, marginBottom: 15 },
              ]}
            >
              Activities
            </Text>
            <ScrollView
              showsHorizontalScrollIndicator={false}
              horizontal
              contentContainerStyle={{ paddingHorizontal: 15 }}
            >
              {Object.keys(activities).map((category, index) => {
                const IconComponent = categoryIcons[category.toLowerCase()];
                return (
                  <TouchableOpacity
                    style={styles.statItem}
                    key={`${category}-${index}`}
                    activeOpacity={0.7}
                    onPress={() => handleShowActivitiesByCategory(category)}
                  >
                    <View style={styles.lf}>
                      <View style={{ height: 40 }}>
                        <Text style={styles.visitedCategoryText}>
                          {category}
                        </Text>
                      </View>
                      <View style={styles.categoryIcon}>
                        <IconComponent />
                      </View>
                    </View>
                    <Text style={styles.amount}>
                      {activities[category].length}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>
        </ScrollView>
      </View>
      <Portal>
        <Modalize
          ref={activitiesDetailRef}
          modalTopOffset={65}
          adjustToContentHeight
        >
         <View style={styles.header}>
        <Text style={styles.title}>{categoryKey}</Text>
        <TouchableOpacity
          onPress={() => activitiesDetailRef.current?.close()}
          activeOpacity={0.7}
          style={styles.closeButton}
        >
          <XIcon width="10" />
        </TouchableOpacity>
      </View>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingHorizontal: 15 }}
      >
            <Text>dd</Text>
          </ScrollView>
        </Modalize>
      </Portal>
    </>
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
