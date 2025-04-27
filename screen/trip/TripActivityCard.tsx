import * as Haptics from "expo-haptics";
import { usePostHog } from "posthog-react-native";
import React, { useCallback, useState } from "react";
import { Platform, StyleSheet } from "react-native";
import { TouchableOpacity, View } from "react-native";

import {
  trekSpotApi,
  useChangeActivityVisitedMutation,
} from "../../api/api.trekspot";
import { SightType } from "../../api/api.types";
import { useAppDispatch } from "../../package/store";
import { Events } from "../../utilities/Posthog";
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
import { ActivityCardActions } from "./components/ActivityCardActions";
import { CardContent } from "./components/CardContent";
import { ImgComponent } from "./components/ImgComponent";
import { TripDaysType } from "./TripDetailScreen";

interface ITripActivityCardProps {
  visited: boolean;
  day: TripDaysType;
  item: SightType;
  index: number;
  lastIndex: number;
  activityAmount: number;
  deleteActivityTrigger: (sight: string) => void;
  handleTopSightClick: (sight: SightType) => void;
}

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
  deleteActivityTrigger,
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
      <TouchableOpacity
        activeOpacity={0.7}
        style={[
          tripDetailStyles.sightItem,
          styles.activityItem,
          {
            marginLeft: activityAmount > 1 ? 20 : 15,
            zIndex: index === 0 ? 5 : 1,
            backgroundColor: checkedIn ? "#fffcf5" : "#fff",
            height: "auto",
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
          deleteActivityTrigger={deleteActivityTrigger}
          type=""
        />
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  activityContent: {
    flexDirection: "row",
    flex: 1,
    height: "100%",
    paddingHorizontal: 15,
    paddingTop: 15,
    width: "100%",
  },
  activityIcon: {
    borderColor: "#f7f7f7",
    borderRadius: 100,
    borderWidth: 8,
    left: -40,
    position: "absolute",
    top: 55,
    zIndex: 2,
  },
  activityItem: {
    flexDirection: "column",
    height: "auto",
    marginBottom: 25,
    marginRight: 15,
    padding: 0,
    paddingBottom: 0,
    paddingTop: 0,
    position: "relative",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 0.84,
    ...Platform.select({
      android: {
        elevation: 2,
      },
    }),
    zIndex: 1,
  },
  circle: {
    backgroundColor: "#ccc",
    borderRadius: 100,
    height: 10,
    minWidth: 10,
  },
});
