import React from "react";
import {
  ImageBackground,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { CountryType } from "../../api/api.types";
import { Mark, Mark2, StarIcon } from "../../utilities/SvgIcons.utility";
import * as Haptics from "expo-haptics";
import { Image } from "expo-image";

type CountryItemProps = {
  item: CountryType;
  isWith?: boolean;
  openModal: (countryId: string) => void;
};

export const CountryItem: React.FC<CountryItemProps> = ({
  item,
  isWith,
  openModal,
}) => {
  return (
    <>
      {Platform.OS === "ios" ? (
        <Image
          style={[styles.box, styles.typeMd]}
          contentFit="cover"
          source={
            item?.image?.url
              ? {
                  uri: item?.image?.url,
                }
              : 
             
              item.name === "France" ? "https://cdn.pixabay.com/photo/2018/04/25/09/26/eiffel-tower-3349075_1280.jpg"

              
              :  item.name === "Germany" ? "https://cdn.pixabay.com/photo/2020/05/01/11/00/castle-5116436_1280.jpg" :
              item.name === "Italy" ? "https://cdn.pixabay.com/photo/2019/03/31/14/31/houses-4093227_1280.jpg" :
              require("../../assets/no-image.png")
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
              <View style={styles.labelItem}>
                {/* <Mark color="#fff" size={15} /> */}
                <Text style={styles.labelItemText} numberOfLines={2}>
                  {item.name}
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
                <Text style={styles.ratingText}>{item.rate} /</Text>
                <Text style={styles.ratingText}>{item.visitors} visitors</Text>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        </Image>
      ) : (
        <ImageBackground
          style={[styles.box, styles.typeMd]}
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
              openModal(item.id!),
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            }}
          >
            <LinearGradient
              style={styles.gradientWrapper}
              colors={["rgba(0,0,0,0.01)", "rgba(0,0,0,0.6)"]}
            >
              <View style={styles.labelItem}>
                <Mark color="#fff" size={15} />
                <Text style={styles.labelItemText} numberOfLines={2}>
                  {item.name}
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
                <Text style={styles.ratingText}>{item.rate} /</Text>
                <Text style={styles.ratingText}>{item.visitors} visitors</Text>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        </ImageBackground>
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
  labelItemText: {
    color: "#fff",
    fontSize: 20,
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
    borderRadius: 15,
    overflow: "hidden",
  },
});
