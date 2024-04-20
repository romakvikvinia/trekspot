import React, { useCallback, useState } from "react";

import {
  ImageBackground,
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
import { CityDetailModal } from "./destination/CityDetailModal";

interface CitiesContainerProps {
  title: string;
  cities: CityType[];
  seeAllItems?: boolean;
  isCitiesLoading: boolean;
}

interface IState {
  city: CityType | null;
}

export const CitiesContainer: React.FC<CitiesContainerProps> = ({
  cities,
  title,
  seeAllItems = true,
  isCitiesLoading,
}) => {
  const [state, setState] = useState<IState>({ city: null });

  const handleCity = useCallback((city: CityType) => {
    setState((prevState) => ({ ...prevState, city }));
  }, []);

  const handleClear = useCallback(() => {
    setTimeout(() => {
      setState((prevState) => ({ ...prevState, city: null }))
    }, 500);
  }, []);

  //   console.log("CitiesContainer", state);

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
                <ImageBackground
                  style={styles.box}
                  resizeMode="cover"
                  source={{
                    uri: "https://cdn.pixabay.com/photo/2023/09/25/19/58/piran-8275931_1280.jpg",
                    //item.image?.url,
                  }}
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
                        <Mark color="#fff" />
                        <Text
                          numberOfLines={2}
                          style={[styles.labelItemText, styles.titleSm]}
                        >
                          {item.city}
                        </Text>
                      </View>
                      <View style={styles.ratingLabel}>
                        <View
                          style={{
                            position: "relative",
                            top: -1,
                            opacity: 0.8,
                          }}
                        >
                          <StarIcon color="#FFBC3E" />
                        </View>
                        <Text style={[styles.ratingText, styles.ratingTextXs]}>
                          {item.rate} /
                        </Text>
                        <Text style={[styles.ratingText, styles.ratingTextXs]}>
                          {item.visitors} visitors
                        </Text>
                      </View>
                    </LinearGradient>
                  </TouchableOpacity>
                </ImageBackground>
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
                  width: 130,
                  height: 135,
                  borderRadius: 10,
                  marginRight: 10,
                }}
                key={ind}
              >
                <LinearGradient
                  colors={["rgba(0,0,0,0.1)", "rgba(0,0,0,0.6)"]}
                  style={{
                    width: 130,
                    height: 135,
                    borderRadius: 10,
                  }}
                ></LinearGradient>
              </View>
            ))}
          </ScrollView>
        )}
       
      </View>
       {/**
         * city detail modal
         */}
        {state.city && (
          <CityDetailModal city={state.city} closeCallBack={handleClear} />
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
    width: 130,
    height: 130,
    backgroundColor: "#fafafa",
    borderRadius: 15,
    overflow: "hidden",
    marginRight: 10,
  },
});
