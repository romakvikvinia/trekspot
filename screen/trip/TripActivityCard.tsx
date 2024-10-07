import { Image } from "expo-image";
import React, { useCallback, useState } from "react";
import { ImageBackground, Linking, Platform } from "react-native";
import { Text, TouchableOpacity, View } from "react-native";
import { COLORS } from "../../styles/theme";
import {
  AttractionsIcon,
  BeachesIcon,
  CheckLiteIcon,
  DotsIcon,
  HistoricalPlacesIcon,
  LocationPin,
  MapDirection,
  MapIcon,
  MarketsIcon,
  MuseumsIcon,
  PinIcon,
  StarIcon,
  TopExperiencesIcon,
  TopsightsIcon,
} from "../../utilities/SvgIcons.utility";
import { tripDetailStyles } from "./_tripDetailStyles";
import * as Haptics from "expo-haptics";
import { SightType } from "../../api/api.types";
import { TripDaysType } from "./TripDetailScreen";
import { useChangeActivityVisitedMutation } from "../../api/api.trekspot";
import { useTripStore } from "../../components/store/store";

interface ITripActivityCardProps {
  visited: boolean;
  day: TripDaysType;
  item: SightType;
  index: number;
  lastIndex: number;
  onQuestionModalOpen: (sight: string) => void;
  handleTopSightClick: (sight: SightType) => void;
}

export const ReturnIcon = ({ category }) => {
  switch (category) {
    case "Top sights":
      return <TopsightsIcon color="" size={20} />;
    case "Museums":
      return <MuseumsIcon color="" size={20} />;
    case "Historical places":
      return <HistoricalPlacesIcon color="" size={20} />;
    case "Outdoor attractions":
      return <AttractionsIcon color="" size={20} />;
    case "Markets":
      return <MarketsIcon color="" size={20} />;
    case "Top experiences":
      return <TopExperiencesIcon color="" size={20} />;
    case "Beaches":
      return <BeachesIcon color="" size={20} />;
  }
};

export const TripActivityCard: React.FC<ITripActivityCardProps> = ({
  visited,
  item,
  day,
  onQuestionModalOpen,
  handleTopSightClick,
  index,
  lastIndex,
}) => {
  const [changeActivityVisited, { isLoading }] =
    useChangeActivityVisitedMutation();
  const { tripStyle } = useTripStore((state: any) => ({
    tripStyle: state.tripStyle,
  }));
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
      {tripStyle ? (
        <TouchableOpacity
          activeOpacity={0.7}
          style={[
            tripDetailStyles.sightItem,
            {
              flexDirection: "column",
              padding: 0,
              marginLeft: 25,
              marginRight: 15,
              marginBottom: 15,
              paddingBottom: 0,
              paddingTop: 0,
              borderWidth: 2,
              borderColor: "#f2f2f2",
            },
          ]}
          onPress={() => {
            handleTopSightClick(item);
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          }}
        >
          {lastIndex > 0 && (
            <View
              style={[
                tripDetailStyles.verticalLine,
                {
                  height: index === 0 || lastIndex === index ? 105 : 167,
                  top:
                    index !== 0 && index !== lastIndex
                      ? -10
                      : index === lastIndex
                      ? -20
                      : 60,
                },
              ]}
            >
              {index === 0 && (
                <View
                  style={[
                    tripDetailStyles.circleItem,
                    {
                      top: 0,
                    },
                  ]}
                >
                  <ReturnIcon category={item?.category} />
                </View>
              )}

              {index !== 0 && index !== lastIndex && (
                <View style={tripDetailStyles.circleItem}>
                  <ReturnIcon category={item?.category} />
                </View>
              )}
              {index === lastIndex && (
                <View
                  style={[
                    tripDetailStyles.circleItem,
                    {
                      bottom: 0,
                    },
                  ]}
                >
                  <ReturnIcon category={item?.category} />
                </View>
              )}
            </View>
          )}

          <View
            style={[
              checkedIn ? tripDetailStyles.checkedIn : null,
              {
                width: "100%",
                flexDirection: "row",
                flex: 1,
                height: "100%",
                paddingHorizontal: 15,
                paddingTop: 15,
              },
            ]}
          >
            <View
              style={[
                tripDetailStyles.imagesWrapper,
                {
                  width: 70,
                  height: 70,
                },
              ]}
            >
              {item?.images?.length > 0 && (
                <Image
                  style={[
                    tripDetailStyles.mainImage,
                    {
                      width: 70,
                      height: 70,
                    },
                  ]}
                  contentFit="cover"
                  source={
                    item?.images[0].url
                      ? {
                          uri: item?.images[0].url,
                        }
                      : require("../../assets/no-image.png")
                  }
                  key={`img-${item?.title}`}
                ></Image>
              )}
            </View>

            <View
              style={[
                tripDetailStyles.sightDetails,
                {
                  flexDirection: "column",
                  justifyContent: "center",
                  marginTop: 0,
                  flex: 1,
                  paddingLeft: 16,
                },
              ]}
            >
              <Text numberOfLines={2} style={tripDetailStyles.sightTitle}>
                {item?.title}
              </Text>
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
                    <Text style={[tripDetailStyles.ratingText]}>
                      {item?.rate}
                    </Text>
                  </>
                ) : null}

                <Text style={[tripDetailStyles.sightType]}>
                  {item?.category}
                </Text>
              </View>
              {item?.description?.length > 0 ? (
                <Text style={tripDetailStyles.descText} numberOfLines={1}>
                  {item?.description}
                </Text>
              ) : null}
            </View>
          </View>

          <View
            style={[
              tripDetailStyles.sightBottomActions,
              {
                marginTop: 15,
                marginBottom: 0,
                borderTopColor: "#f2f2f2",
                borderTopWidth: 1,
              },
            ]}
          >
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
                <MapDirection width="15" color={COLORS.gray} />
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
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          activeOpacity={0.7}
          style={[
            tripDetailStyles.sightItem,
            checkedIn ? tripDetailStyles.checkedIn : null,
            {
              flexDirection: "column",
              padding: 0,
              marginLeft: 15,
              marginRight: 15,
              marginBottom: 15,
              paddingBottom: 0,
              paddingTop: 0,
              borderWidth: 2,
              borderColor: "#f2f2f2",
            },
          ]}
          onPress={() => {
            handleTopSightClick(item);
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          }}
        >
          <View
            style={[
              checkedIn ? tripDetailStyles.checkedIn : null,
              {
                width: "100%",
                flexDirection: "column",
                flex: 1,
                height: "100%",
                paddingHorizontal: 15,
                paddingTop: 15,
              },
            ]}
          >
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
                      style={{
                        color: "#fff",
                        fontWeight: "bold",
                        fontSize: 14,
                      }}
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
                    <Text style={[tripDetailStyles.ratingText]}>
                      {item?.rate}
                    </Text>
                  </>
                ) : null}

                <Text style={[tripDetailStyles.sightType]}>
                  {item?.category}
                </Text>
              </View>
              {item?.description?.length > 0 ? (
                <Text style={tripDetailStyles.descText}>
                  {item?.description?.slice(0, 100)}...
                </Text>
              ) : null}
            </View>
          </View>
          <View
            style={[
              tripDetailStyles.sightBottomActions,
              {
                marginTop: 15,
                marginBottom: 0,
                borderTopColor: "#f2f2f2",
                borderTopWidth: 1,
                width: "100%",
              },
            ]}
          >
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
                <MapDirection width="15" color={COLORS.gray} />
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
        </TouchableOpacity>
      )}
    </>
  );
};
