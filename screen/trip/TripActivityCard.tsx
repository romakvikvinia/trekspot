import { Image } from "expo-image";
import React, { useCallback, useState } from "react";
import { ImageBackground, Linking, Platform } from "react-native";
import { Text, TouchableOpacity, View } from "react-native";
import { COLORS } from "../../styles/theme";
import {
  CheckLiteIcon,
  DotsIcon,
  LocationPin,
  MapIcon,
  PinIcon,
  StarIcon,
} from "../../utilities/SvgIcons.utility";
import { tripDetailStyles } from "./_tripDetailStyles";
import * as Haptics from "expo-haptics";
import { SightType } from "../../api/api.types";
import { TripDaysType } from "./TripDetailScreen";
import { useChangeActivityVisitedMutation } from "../../api/api.trekspot";

interface ITripActivityCardProps {
  visited: boolean;
  day: TripDaysType;
  item: SightType;
  index: number;
  onQuestionModalOpen: (sight: string) => void;
  handleTopSightClick: (sight: SightType) => void;
}

export const TripActivityCard: React.FC<ITripActivityCardProps> = ({
  visited,
  item,
  day,
  onQuestionModalOpen,
  handleTopSightClick,
}) => {
  const [changeActivityVisited, { isLoading }] =
    useChangeActivityVisitedMutation();
  const [checkedIn, setCheckedIn] = useState(visited);

  const openMap = (address: string) => {
    const scheme = Platform.select({
      ios: "maps://0,0?q=",
      android: "geo:0,0?q=",
    });
    const url = Platform.select({
      ios: `${scheme}${address}`,
      android: `${scheme}${address}`,
    });

    Linking.openURL(url!);
  };

  const handleChangeActivityVisited = useCallback(() => {
    setCheckedIn(!checkedIn);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    changeActivityVisited({
      day: day.id,
      visited: !checkedIn,
      route: day.route!,
      sight: item.id,
    });
  }, [checkedIn]);

  return (
    <>
      <TouchableOpacity
        activeOpacity={0.7}
        style={[
          tripDetailStyles.sightItem,
          checkedIn ? tripDetailStyles.checkedIn : null,
          {
            flexDirection: "row",
            padding: 15,
          },
        ]}
        onPress={() => {
          handleTopSightClick(item);
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        }}
      >
        {/* <View style={tripDetailStyles.pinIcon}>
          <PinIcon
            size="20"
            color={checkedIn ? COLORS.primary : COLORS.darkgray}
          />
          <Text
            style={{
              color: "#fff",
              position: "absolute",
              fontSize: 10,
              top: Platform.OS === "ios" ? 3 : 2,
              left: 7,
            }}
          >
            {index + 1}
          </Text>
        </View> */}

        <View style={tripDetailStyles.imagesWrapper}>
          {item?.images?.length > 0 &&
            item?.images?.slice(0, 2).map((image, index) => (
              <Image
                style={tripDetailStyles.mainImage}
                contentFit="cover"
                source={
                  image?.url
                    ? {
                        uri: image?.url,
                      }
                    : require("../../assets/no-image.png")
                }
                key={`img-${item?.title}-${index}`}
              ></Image>
            ))}

          {item?.images?.length > 0 && (
            <ImageBackground
              resizeMode="cover"
              source={{
                uri: item?.image?.url,
              }}
              style={tripDetailStyles.lastImage}
            >
              <View style={tripDetailStyles.imageOverlay}>
                <Text
                  style={{ color: "#fff", fontWeight: "bold", fontSize: 14 }}
                >
                  +3
                </Text>
              </View>
            </ImageBackground>
          )}
        </View>

        <View
          style={[
            tripDetailStyles.sightDetails,
            { flexDirection: "column", marginTop: 10 },
          ]}
        >
          <Text style={tripDetailStyles.sightTitle}>{item?.title}</Text>
          <View style={tripDetailStyles.ratingLabel}>
            {item?.rate ? (
              <>
                <View
                  style={{
                    position: "relative",
                    top: -1,
                    opacity: 0.8,
                    marginRight: 3,
                  }}
                >
                  <StarIcon color="#FFBC3E" />
                </View>
                <Text style={[tripDetailStyles.ratingText]}>{item?.rate}</Text>
              </>
            ) : null}

            <Text style={[tripDetailStyles.sightType]}>{item?.category}</Text>
          </View>
          {item?.description?.length > 0 ? (
            <Text style={tripDetailStyles.descText}>
              {item?.description?.slice(0, 100)}...
            </Text>
          ) : null}
        </View>
      </TouchableOpacity>
      <View style={tripDetailStyles.sightBottomActions}>
        <TouchableOpacity
          activeOpacity={0.7}
          style={tripDetailStyles.checkinButton}
          onPress={handleChangeActivityVisited}
        >
          <CheckLiteIcon
            color={checkedIn ? COLORS.primary : COLORS.gray}
            width="15"
          />
          <Text
            style={[
              tripDetailStyles.checkinButtonText,
              { color: checkedIn ? COLORS.primary : COLORS.gray },
            ]}
          >
            Visited
          </Text>
        </TouchableOpacity>

        <View style={tripDetailStyles.sightRightActions}>
          <TouchableOpacity
            style={tripDetailStyles.sightRightActionsButton}
            activeOpacity={0.7}
            onPress={() => openMap(item?.title)}
          >
            <LocationPin width="15" color={COLORS.gray} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => onQuestionModalOpen(item.id)}
            style={tripDetailStyles.sightRightActionsButton}
            activeOpacity={0.7}
          >
            <DotsIcon color={COLORS.gray} />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};
