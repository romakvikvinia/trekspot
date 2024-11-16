import React, { useCallback } from "react";

import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import { COLORS, SIZES } from "../../styles/theme";
import { CityType } from "../../api/api.types";
import * as Haptics from "expo-haptics";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { ExploreRoutesStackParamList } from "../../routes/explore/ExploreRoutes";
import { useTripStore } from "../../package/zustand/store";
import { GuestUserModal } from "../../common/components/GuestUserModal";
import { useAppSelector } from "../../package/store";
import { CityImage } from "./subComponents/CityImage";

interface CitiesContainerProps {
  title: string;
  cities: CityType[];
  seeAllItems?: boolean;
  isCitiesLoading: boolean;
}

type ExploreStackNavigationProp =
  StackNavigationProp<ExploreRoutesStackParamList>;

export const CitiesContainer: React.FC<CitiesContainerProps> = ({
  cities,
  title,
  seeAllItems = true,
  isCitiesLoading,
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
  const handleCity = useCallback((city: CityType) => {
    if (guestActivityCount >= 3 && isGuest) {
      setShowGuestModal(true);
      return;
    }
    increaseGuestActivityCount();
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    navigation.navigate("CityDetail", {
      city,
    });
  }, []);

  const citiesByRating =
    cities &&
    [...cities].sort((a, b) => {
      if (a.rate && b.rate) {
        return b.rate - a.rate;
      }
      return 0;
    });

  return (
    <>
      <View style={[styles.rowItem]}>
        <View style={styles.rowItemHeader}>
          <Text style={styles.h2}>{title}</Text>

          {seeAllItems && (
            <TouchableOpacity activeOpacity={0.7}>
              <Text style={styles.seeAllButtonTxt}>See all</Text>
            </TouchableOpacity>
          )}
        </View>

        {!isCitiesLoading ? (
          <ScrollView
            horizontal
            style={styles.contentBox}
            showsHorizontalScrollIndicator={false}
          >
            {citiesByRating.map((item, ind) => (
              <React.Fragment
                key={`${title}-cities-${item.id}-${item.city}-${ind}`}
              >
               <CityImage item={item} handleCity={handleCity} />
                {cities.length === ind + 1 && (
                  <View style={{ width: 20 }}></View>
                )}
              </React.Fragment>
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
                  width: 170,
                  minWidth: 160,
                  height: 145,
                  borderRadius: 15,
                  marginRight: 10,
                }}
                key={`ind-${ind}`}
              >
                <LinearGradient
                  colors={["rgba(0,0,0,0.1)", "rgba(0,0,0,0.6)"]}
                  style={{
                    width: 170,
                    minWidth: 160,
                    height: 145,
                    borderRadius: 10,
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
  rowItem: {
    width: "100%",
    paddingTop: 30,
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
    fontSize: 20,
    color: "#000",
    fontWeight: "700",
  },
  contentBox: {
    marginTop: 5,
    paddingLeft: 15,
  },
  box: {
    width: 170,
    minWidth: 160,
    height: 140,
    backgroundColor: "#fafafa",
    borderRadius: 15,
    overflow: "hidden",
    marginRight: 10,
  },
});
