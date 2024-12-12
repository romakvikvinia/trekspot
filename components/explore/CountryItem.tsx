import React from "react";
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { CountryType } from "../../api/api.types";
import { StarIcon, TwoHeadsIcon } from "../../utilities/SvgIcons.utility";
import * as Haptics from "expo-haptics";
import { Image } from "expo-image";

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
  gradientWrapper: {
    flex: 1,
    justifyContent: "flex-end",
  },
  androidImageContainer: {
    width: 160,
    position: "relative",
    backgroundColor: "#fafafa",
    borderRadius: 15,
    overflow: "hidden",
    marginRight: 10,
  },
  labelItemText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "700",
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
    paddingVertical: 0,
    borderRadius: 30,
    alignItems: "center",
    paddingBottom: 10,
    marginTop: 8,
  },
  ratingText: {
    color: "#fff",
    marginLeft: 3,
    fontSize: 12,
    opacity: 0.8,
    fontWeight: "500",
  },
  addToBucketButton: {
    width: 30,
    height: 30,
    borderRadius: 50,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    right: 10,
    top: 10,
    zIndex: 3,
  },
  box: {
    width: 130,
    height: 130,
    backgroundColor: "#fafafa",
    borderRadius: 15,
    overflow: "hidden",
    marginRight: 10,
  },
  typeMd: {
    width: 160,
    height: 180,
    overflow: "hidden",
  },
});
