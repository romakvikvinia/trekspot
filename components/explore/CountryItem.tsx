import * as Haptics from "expo-haptics";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { CountryType } from "../../api/api.types";
import { StarIcon, TwoHeadsIcon } from "../../utilities/SvgIcons.utility";

type CountryItemProps = {
  item: CountryType;
  isWith?: boolean;
  isExplore?: boolean;
  openModal: (countryId: string) => void;
};

export const CountryItem: React.FC<CountryItemProps> = ({
  item,
  isWith,
  openModal,
  isExplore,
}) => {
  return (
    <>
      {Platform.OS === "ios" ? (
        <Image
          style={[
            styles.box,
            styles.typeMd,
            {
              height: isExplore ? 140 : 180,
            },
          ]}
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
            onPress={() => {
              openModal(item.id!),
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            }}
          >
            <LinearGradient
              style={styles.gradientWrapper}
              colors={["rgba(0,0,0,0.01)", "rgba(0,0,0,0.6)"]}
            >
              <View
                style={[
                  styles.labelItem,
                  {
                    marginBottom: isExplore ? 12 : 0,
                  },
                ]}
              >
                {/* <Mark color="#fff" size={15} /> */}
                <Text style={[styles.labelItemText, {
                  fontSize: isExplore ? 18 : 20,
                }]} numberOfLines={2}>
                  {item.name}
                </Text>
              </View>
              {!isExplore && (
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
                  <Text style={styles.ratingText}>{item.rate} /</Text>
                  <Text style={[styles.ratingText, {marginRight: 3}]}>
                    {item.visitors}
                  </Text>
                  <TwoHeadsIcon />
                </View>
              )}
            </LinearGradient>
          </TouchableOpacity>
        </Image>
      ) : (
        <View style={[styles.androidImageContainer,{
          height: isExplore ? 140 : 180,
        }]}>
          <Image
            style={[
              styles.box,
              styles.typeMd,
              {
                height: isExplore ? 140 : 180,
              },
            ]}
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
          </Image>
          <TouchableOpacity
              style={[styles.gradientWrapper,{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
              }]}
              activeOpacity={0.7}
              onPress={() => {
                openModal(item.id!),
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              }}
            >
              <LinearGradient
                style={styles.gradientWrapper}
                colors={["rgba(0,0,0,0.01)", "rgba(0,0,0,0.6)"]}
              >
                <View
                  style={[
                    styles.labelItem,
                    {
                      marginBottom: isExplore ? 12 : 0,
                    },
                  ]}
                >
                  {/* <Mark color="#fff" size={15} /> */}
                  <Text style={[styles.labelItemText, {
                    fontSize: isExplore ? 18 : 20,
                  }]} numberOfLines={2}>
                    {item.name}
                  </Text>
                </View>
                {!isExplore && (
                  <View style={[styles.ratingLabel, {
                    marginTop: 5
                  }]}>
                    <View
                      style={{
                        position: "relative",
                        top: -1,
                        opacity: 0.8,
                      }}
                    >
                      <StarIcon color="#FFBC3E" />
                    </View>
                    <Text style={styles.ratingText}>{item.rate} /</Text>
                    <Text style={[styles.ratingText, {marginRight: 3}]}>
                      {item.visitors}
                    </Text>
                    <TwoHeadsIcon />
                  </View>
                )}
              </LinearGradient>
          </TouchableOpacity>
        </View>
      )}
      {isWith && <View style={{ width: 20 }}></View>}
    </>
  );
};

const styles = StyleSheet.create({
  androidImageContainer: {
    backgroundColor: "#fafafa",
    borderRadius: 15,
    marginRight: 10,
    overflow: "hidden",
    position: "relative",
    width: 160,
  },
  box: {
    backgroundColor: "#fafafa",
    borderRadius: 15,
    height: 130,
    marginRight: 10,
    overflow: "hidden",
    width: 130,
  },
  gradientWrapper: {
    flex: 1,
    justifyContent: "flex-end",
  },
  labelItem: {
    alignItems: "center",
    flexDirection: "row",
    padding: 10,
    paddingVertical: 0,
  },
  labelItemText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "700",
    marginLeft: 0,
    paddingRight: 10,
  },
  ratingLabel: {
    alignItems: "center",
    borderRadius: 30,
    flexDirection: "row",
    marginTop: 8,
    paddingBottom: 10,
    paddingHorizontal: 10,
    paddingVertical: 0,
  },
  ratingText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "500",
    marginLeft: 3,
    opacity: 0.8,
  },
  typeMd: {
    height: 180,
    overflow: "hidden",
    width: 160,
  },
});
