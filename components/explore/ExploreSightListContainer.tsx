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

import { SightType } from "../../api/api.types";
import { SightDetailModal } from "./sights/SightDetailModal";

interface ExploreSightListContainerProps {
  title: string;
  items: SightType[];
  seeAllItems?: boolean;
}

interface IState {
  item: SightType | null;
}

export const ExploreSightListContainer: React.FC<
  ExploreSightListContainerProps
> = ({ items, title, seeAllItems = true }) => {
  const [state, setState] = useState<IState>({ item: null });

  const handleItem = useCallback((item: SightType) => {
    setState((prevState) => ({ ...prevState, item }));
  }, []);

  const handleClear = useCallback(() => {
    setState((prevState) => ({ ...prevState, item: null }));
  }, []);

  //   console.log("itemsContainer", state);

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

        <ScrollView
          horizontal
          style={styles.contentBox}
          showsHorizontalScrollIndicator={false}
        >
          {items.map((item, ind) => (
            <React.Fragment
              key={`${title}-items-${item.id}-${item.city}-${ind}`}
            >
              <ImageBackground
                style={styles.box}
                resizeMode="cover"
                source={{
                  uri: item.image?.url,
                }}
              >
                <TouchableOpacity
                  style={styles.gradientWrapper}
                  activeOpacity={0.7}
                  onPress={() => handleItem(item)}
                >
                  <LinearGradient
                    style={styles.gradientWrapper}
                    colors={["rgba(0,0,0,0.01)", "rgba(0,0,0,0.6)"]}
                  >
                    <View style={styles.labelItem}>
                      <Mark color="#fff" size="sm" />
                      <Text style={[styles.labelItemText, styles.titleSm]}>
                        {item.title}
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
                        {item.rate}
                      </Text>
                    </View>
                  </LinearGradient>
                </TouchableOpacity>
              </ImageBackground>
              {items.length === ind + 1 && <View style={{ width: 20 }}></View>}
            </React.Fragment>
          ))}
        </ScrollView>
        {/**
         * city detail modal
         */}
        {state.item && (
          <SightDetailModal data={state.item!} closeCallBack={handleClear} />
        )}
      </View>
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
