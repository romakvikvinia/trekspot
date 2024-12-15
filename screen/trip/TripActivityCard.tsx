import { Image } from "expo-image";
import React, { useCallback, useState } from "react";
import { Platform, StyleSheet } from "react-native";
import { TouchableOpacity, View } from "react-native";
import {
  AttractionsIcon,
  BeachesIcon,
  CasinosIcon,
  HistoricalPlacesIcon,
  MarketsIcon,
  MuseumsIcon,
  TopExperiencesIcon,
  TopsightsIcon,
} from "../../utilities/SvgIcons.utility";
import { tripDetailStyles } from "./_tripDetailStyles";
import * as Haptics from "expo-haptics";
import { SightType } from "../../api/api.types";
import { TripDaysType } from "./TripDetailScreen";
import {
  trekSpotApi,
  useChangeActivityVisitedMutation,
} from "../../api/api.trekspot";
import { CardContent } from "./components/CardContent";
import { ActivityCardActions } from "./components/ActivityCardActions";
import { useAppDispatch } from "../../package/store";
import { usePostHog } from "posthog-react-native";
import { Events } from "../../utilities/Posthog";

interface ITripActivityCardProps {
  visited: boolean;
  day: TripDaysType;
  item: SightType;
  index: number;
  lastIndex: number;
  activityAmount: number;
  onQuestionModalOpen: (sight: string) => void;
  handleTopSightClick: (sight: SightType) => void;
}

const ImgComponent = ({ item }: any) => {
  return (
    <View
      style={[
        tripDetailStyles.imagesWrapper,
        {
          width: 70,
          height: 70,
          backgroundColor: "#fafafa",
          borderRadius: 10,
        },
      ]}
    >
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
          item?.images[0]?.url
            ? {
                uri: item?.images[0]?.url,
              }
            : require("../../assets/no-image.png")
        }
        key={`img-${item?.title}`}
      ></Image>
    </View>
  );
};

export const ReturnIcon = ({ category }: any) => {
  switch (category) {
    case "Top sights":
      return <TopsightsIcon color="#333" size={25} />;
    case "Museums":
      return <MuseumsIcon color="#333" size={25} />;
    case "Historical places":
      return <HistoricalPlacesIcon color="#333" size={25} />;
    case "Outdoor attractions":
      return <AttractionsIcon color="#333" size={25} />;
    case "Markets":
      return <MarketsIcon color="#333" size={25} />;
    case "Top experiences":
      return <TopExperiencesIcon color="#333" size={25} />;
    case "Beaches":
      return <BeachesIcon color="#333" size={25} />;
    case "Casinos":
      return <CasinosIcon color="#333" size={25} />;
  }
};

export const TripActivityCard: React.FC<ITripActivityCardProps> = ({
  visited,
  item,
  day,
  handleTopSightClick,
  activityAmount,
  index,
  onQuestionModalOpen,
}) => {
  const posthog = usePostHog();
  const dispatch = useAppDispatch();

  const [changeActivityVisited, { isLoading }] =
    useChangeActivityVisitedMutation();

  const [checkedIn, setCheckedIn] = useState(visited);

  const handleChangeActivityVisited = useCallback(async () => {
    setCheckedIn(!checkedIn);
    posthog.capture(Events.UserUsesVisited, { activity: item.title });
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    await changeActivityVisited({
      day: day.id,
      visited: !checkedIn,
      route: day.route!,
      sight: item.id,
    }).unwrap();
    dispatch(trekSpotApi.util.invalidateTags(["analytics"]));
  }, [checkedIn]);

  return (
    <>
      {activityAmount > 1 && (
        <View
          style={[
            styles.verticalLine,
            {
              height: activityAmount * 175 - 170,
              backgroundColor: "#e0e0e0",
            },
          ]}
        >
          {/* <ImageBackground
            source={require("../../assets/dash.png")}
            imageStyle={{ resizeMode: "repeat" }}
            style={{
              width: 2,
              height: "100%",
            }}
          ></ImageBackground> */}
        </View>
      )}
      <TouchableOpacity
        activeOpacity={0.7}
        style={[
          tripDetailStyles.sightItem,
          styles.activityItem,
          {
            marginLeft: activityAmount > 1 ? 20 : 15,
            zIndex: index === 0 ? 5 : 1,
            backgroundColor: checkedIn ?  "#fffcf5" : "#fff"
          },
        ]}
        onPress={() => {
          handleTopSightClick(item);
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        }}
      >
        {activityAmount > 1 && (
          <View style={styles.activityIcon}>
            {/* <ReturnIcon category={item?.category} /> */}
            <View style={styles.circle}></View>
          </View>
        )}

        <View
          style={[
            checkedIn ? tripDetailStyles.checkedIn : null,
            styles.activityContent,
          ]}
        >
          <ImgComponent item={item} />

          <CardContent item={item} />
        </View>

        <ActivityCardActions
          item={item}
          handleChangeActivityVisited={handleChangeActivityVisited}
          checkedIn={checkedIn}
          index={index}
          onQuestionModalOpen={onQuestionModalOpen}
        />
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  activityContent: {
    width: "100%",
    flexDirection: "row",
    flex: 1,
    height: "100%",
    paddingHorizontal: 15,
    paddingTop: 15,
  },
  activityItem: {
    flexDirection: "column",
    padding: 0,
    marginRight: 15,
    marginBottom: 25,
    paddingBottom: 0,
    paddingTop: 0,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 0.84,
    position: "relative",
    ...Platform.select({
      android: {
        elevation: 2,
      },
    }),
    zIndex: 1,
  },
  activityIcon: {
    position: "absolute",
    top: 55,
    borderWidth: 8,
    borderColor: "#f7f7f7",
    zIndex: 2,
    left: -40,
    borderRadius: 100,
  },
  circle: {
    minWidth: 10,
    height: 10,
    backgroundColor: "#ccc",
    borderRadius: 100,
  },
  verticalLine: {
    position: "absolute",
    top: 100,
    left: 22,
    width: 2,
  },
});
