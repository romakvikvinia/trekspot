import React, { useCallback } from "react";

import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { COLORS, SIZES } from "../../styles/theme";

import { CountryType } from "../../api/api.types";
import { CountryItem } from "./CountryItem";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { StackNavigationProp } from "@react-navigation/stack";
import { ExploreRoutesStackParamList } from "../../routes/explore/ExploreRoutes";
import { useTripStore } from "../../package/zustand/store";
import { GuestUserModal } from "../../common/components/GuestUserModal";
import { useAppSelector } from "../../package/store";

interface DestinationContainerProps {
  title: string;
  countries: CountryType[];
  seeAllItems?: boolean;
  isLoading: boolean;
  isExplore?: boolean;
}

interface IState {
  countryId: string | null;
}

type ExploreStackNavigationProp =
  StackNavigationProp<ExploreRoutesStackParamList>;

export const DestinationContainer: React.FC<DestinationContainerProps> = ({
  countries,
  title,
  seeAllItems = false,
  isLoading,
  isExplore = false,
}) => {
  const navigation = useNavigation<ExploreStackNavigationProp>();

  const { user } = useAppSelector((state) => state.auth);
  const isGuest = user?.role === "guest";
  const [showGuestModal, setShowGuestModal] = React.useState(false);
  const { guestActivityCount, increaseGuestActivityCount } = useTripStore(
    (state) => ({
      increaseGuestActivityCount: state.increaseGuestActivityCount,
      guestActivityCount: state.guestActivityCount,
    })
  );
  const handleDetailOfCountry = useCallback((countryId: string) => {
    if (guestActivityCount >= 3 && isGuest) {
      setShowGuestModal(true);
      return;
    }
    increaseGuestActivityCount();
    navigation.navigate("CountryDetailScreen", { countryId });
  }, []);

  const sortedCountries =
    !isLoading && [...countries].sort((a, b) => b.rate - a.rate);

  return (
    <>
      <View
        style={[styles.rowItem]}
        style={{ paddingTop: isExplore ? 30 : 15 }}
      >
        <View style={styles.rowItemHeader}>
          <Text style={styles.h2}>{title}</Text>
          {/* {seeAllItems && (
            <TouchableOpacity activeOpacity={0.7}>
              <Text style={styles.seeAllButtonTxt}>See all</Text>
            </TouchableOpacity>
          )} */}
        </View>
        {!isLoading ? (
          <ScrollView
            horizontal
            style={styles.contentBox}
            showsHorizontalScrollIndicator={false}
          >
            {sortedCountries?.length > 0 &&
              sortedCountries.map((country, ind) => (
                <CountryItem
                  key={`countries-${country.id}-${country.name}-${title}`}
                  item={country}
                  isWith={countries.length - 1 === ind}
                  openModal={handleDetailOfCountry}
                  isExplore={isExplore}
                />
              ))}
          </ScrollView>
        ) : (
          <ScrollView
            contentContainerStyle={{ paddingHorizontal: 15 }}
            horizontal
            showsHorizontalScrollIndicator={false}
          >
            {[0, 1, 2, 3].map((item, ind) => (
              <View
                style={{
                  width: 160,
                  height: 185,
                  borderRadius: 15,
                  marginRight: 10,
                }}
                key={ind}
              >
                <LinearGradient
                  colors={["rgba(0,0,0,0.1)", "rgba(0,0,0,0.6)"]}
                  style={{
                    width: 160,
                    height: 185,
                    borderRadius: 15,
                  }}
                ></LinearGradient>
              </View>
            ))}
          </ScrollView>
        )}
      </View>
      {showGuestModal && (
        <GuestUserModal onClose={() => setShowGuestModal(false)} />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  gradientWrapper: {
    flex: 1,
    justifyContent: "flex-end",
  },
  titleSm: {
    fontSize: 14,
    marginLeft: 2,
  },
  labelItemText: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "500",
    marginLeft: 5,
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
    opacity: 0.7,
  },

  ratingTextXs: {
    fontSize: 10,
  },

  rowItem: {
    width: "100%",
    paddingTop: 25,
    backgroundColor: "#f8f8f8",
  },
  rowItemHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: SIZES.padding,
    paddingHorizontal: 15,
  },
  seeAllButtonTxt: {
    color: COLORS.primary,
    fontSize: SIZES.body4,
  },
  h2: {
    fontSize: 22,
    color: "#000",
    fontWeight: "600",
  },
  contentBox: {
    marginTop: 5,
    paddingLeft: 15,
  },
  box: {
    width: 130,
    height: 130,
    backgroundColor: "#fafafa",
    borderRadius: 15,
    overflow: "hidden",
    marginRight: 10,
  },
});
