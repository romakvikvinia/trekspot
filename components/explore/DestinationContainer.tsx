import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { LinearGradient } from "expo-linear-gradient";
import React, { useCallback } from "react";
import { Platform, ScrollView, StyleSheet, Text, View } from "react-native";

import { CountryType } from "../../api/api.types";
import { GuestUserModal } from "../../common/components/GuestUserModal";
import { useAppSelector } from "../../package/store";
import { useTripStore } from "../../package/zustand/store";
import { ExploreRoutesStackParamList } from "../../routes/explore/ExploreRoutes";
import { SIZES } from "../../styles/theme";
import { CountryItem } from "./CountryItem";

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
        style={[
          styles.rowItem,
          {
            paddingTop: isExplore
              ? Platform.OS === "android"
                ? 20
                : 30
              : Platform.OS === "android"
                ? 0
                : 15,
          },
        ]}
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
            removeClippedSubviews
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
  contentBox: {
    marginTop: 5,
    paddingLeft: 15,
  },

  h2: {
    color: "#000",
    fontSize: 20,
    fontWeight: "700",
  },

  rowItem: {
    backgroundColor: "#f8f8f8",
    paddingTop: 25,
    width: "100%",
  },
  rowItemHeader: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: SIZES.padding,
    paddingHorizontal: 15,
  },
});
