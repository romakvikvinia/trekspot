import React, { useCallback } from "react";

import {
  ImageBackground,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import { COLORS, SIZES } from "../../styles/theme";
import { Mark, StarIcon } from "../../utilities/SvgIcons.utility";
import { CityType } from "../../api/api.types";
import * as Haptics from "expo-haptics";
import { useNavigation } from "@react-navigation/native";
import { Image } from "expo-image";
import { StackNavigationProp } from "@react-navigation/stack";
import { ExploreRoutesStackParamList } from "../../routes/explore/ExploreRoutes";
import { useTripStore } from "../store/store";
import { GuestUserModal } from "../../common/components/GuestUserModal";
import { useAppSelector } from "../../package/store";

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
  const { guestActivityCount, increaseGuestActivityCount } = useTripStore((state) => ({
    increaseGuestActivityCount: state.increaseGuestActivityCount,
    guestActivityCount: state.guestActivityCount,
  }));
  const handleCity = useCallback((city: CityType) => {
    if(guestActivityCount >= 3 && isGuest) {
      setShowGuestModal(true);
      return;
    }
    increaseGuestActivityCount();
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    navigation.navigate("CityDetail", {
      city,
    });
  }, []);

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
            {cities.map((item, ind) => (
              <React.Fragment
                key={`${title}-cities-${item.id}-${item.city}-${ind}`}
              >
                {Platform.OS === "ios" ? (
                  <Image
                    style={styles.box}
                    contentFit="cover"
                    source={
                      item?.image?.url
                        ? {
                            uri: item?.image?.url,
                          }
                        : require("../../assets/no-image.png")
                    }
                    cachePolicy="memory-disk"
                  >
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
                              <Text
                                style={[styles.ratingText, styles.ratingTextXs]}
                              >
                                {item.rate} /
                              </Text>
                            </>
                          ) : null}
                          {item?.visitors ? (
                            <Text
                              style={[styles.ratingText, styles.ratingTextXs]}
                            >
                              {item.visitors} visitors
                            </Text>
                          ) : null}
                        </View>
                      </LinearGradient>
                    </TouchableOpacity>
                  </Image>
                ) : (
                  <ImageBackground
                    style={styles.box}
                    resizeMode="cover"
                    source={
                      item?.image?.url
                        ? {
                            uri: item?.image?.url,
                          }
                        : require("../../assets/no-image.png")
                    }
                  >
                    <TouchableOpacity
                      style={styles.gradientWrapper}
                      activeOpacity={0.7}
                      onPress={() => {
                        handleCity(item);
                        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                      }}
                    >
                      <LinearGradient
                        style={styles.gradientWrapper}
                        colors={["rgba(0,0,0,0.01)", "rgba(0,0,0,0.6)"]}
                      >
                        <View style={styles.labelItem}>
                          <Mark color="#fff" />
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
                              <Text
                                style={[styles.ratingText, styles.ratingTextXs]}
                              >
                                {item.rate} /
                              </Text>
                            </>
                          ) : null}
                          {item?.visitors ? (
                            <Text
                              style={[styles.ratingText, styles.ratingTextXs]}
                            >
                              {item.visitors} visitors
                            </Text>
                          ) : null}
                        </View>
                      </LinearGradient>
                    </TouchableOpacity>
                  </ImageBackground>
                )}
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
                  height: 130,
                  borderRadius: 10,
                  marginRight: 10,
                }}
                key={`ind-${ind}`}
              >
                <LinearGradient
                  colors={["rgba(0,0,0,0.1)", "rgba(0,0,0,0.6)"]}
                  style={{
                    width: 170,
                    minWidth: 160,
                    height: 130,
                    borderRadius: 10,
                  }}
                ></LinearGradient>
              </View>
            ))}
          </ScrollView>
        )}
      </View>
      {
        showGuestModal && <GuestUserModal onClose={() => setShowGuestModal(false)} />
      }
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
    width: 170,
    minWidth: 160,
    height: 130,
    backgroundColor: "#fafafa",
    borderRadius: 15,
    overflow: "hidden",
    marginRight: 10,
  },
});
