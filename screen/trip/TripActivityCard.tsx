import { Image } from "expo-image";
import React, { useCallback, useState } from "react";
import { ImageBackground, Platform, StyleSheet } from "react-native";
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
  const dispatch = useAppDispatch();

  const [changeActivityVisited, { isLoading }] =
    useChangeActivityVisitedMutation();

  const [checkedIn, setCheckedIn] = useState(visited);

  const handleChangeActivityVisited = useCallback(() => {
    setCheckedIn(!checkedIn);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    changeActivityVisited({
      day: day.id,
      visited: !checkedIn,
      route: day.route!,
      sight: item.id,
    });
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
            },
          ]}
        >
          <ImageBackground
            source={require("../../assets/dash.png")}
            imageStyle={{ resizeMode: "repeat" }}
            style={{
              width: 2,
              height: "100%",
            }}
          ></ImageBackground>
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
          },
        ]}
        onPress={() => {
          handleTopSightClick(item);
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        }}
      >
        {activityAmount > 1 && (
          <View style={styles.activityIcon}>
            <ReturnIcon category={item?.category} />
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
        elevation: 5,
      },
    }),
    zIndex: 1,
  },
  activityIcon: {
    position: "absolute",
    top: 55,
    borderWidth: 5,
    borderColor: "#f7f7f7",
    zIndex: 2,
    opacity: 1,
    left: -45,
  },
  verticalLine: {
    position: "absolute",
    top: 100,
    left: 22,
    width: 2,
    opacity: 0.05,
  },
});

//View with images

// <TouchableOpacity
//   activeOpacity={0.7}
//   style={[
//     tripDetailStyles.sightItem,
//     checkedIn ? tripDetailStyles.checkedIn : null,
//     {
//       flexDirection: "column",
//       padding: 0,
//       marginLeft: 15,
//       marginRight: 15,
//       marginBottom: lastIndex === index ? 80 : 25,
//       paddingBottom: 0,
//       paddingTop: 0,
//       shadowOffset: { width: 0, height: 2 },
//       shadowOpacity: 0.1,
//       shadowRadius: 0.84,
//       ...Platform.select({
//         android: {
//           elevation: 5,
//         },
//       }),
//     },
//   ]}
//   onPress={() => {
//     handleTopSightClick(item);
//     Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
//   }}
// >
//   <View
//     style={[
//       checkedIn ? tripDetailStyles.checkedIn : null,
//       {
//         width: "100%",
//         flexDirection: "column",
//         flex: 1,
//         height: "100%",
//         paddingHorizontal: 15,
//         paddingTop: 15,
//       },
//     ]}
//   >
//     <View style={tripDetailStyles.imagesWrapper}>
//       {item?.images?.length > 0 &&
//         item?.images?.slice(0, 2).map((image, index) => (
//           <Image
//             style={tripDetailStyles.mainImage}
//             contentFit="cover"
//             source={
//               image?.url
//                 ? {
//                     uri: image?.url,
//                   }
//                 : require("../../assets/no-image.png")
//             }
//             key={`img-${item?.title}-${index}`}
//           ></Image>
//         ))}

//       {item?.images?.length > 0 && (
//         <ImageBackground
//           resizeMode="cover"
//           source={{
//             uri: item?.image?.url,
//           }}
//           style={tripDetailStyles.lastImage}
//         >
//           <View style={tripDetailStyles.imageOverlay}>
//             <Text
//               style={{
//                 color: "#fff",
//                 fontWeight: "bold",
//                 fontSize: 14,
//               }}
//             >
//               +3
//             </Text>
//           </View>
//         </ImageBackground>
//       )}
//     </View>

//     <View
//       style={[
//         tripDetailStyles.sightDetails,
//         { flexDirection: "column", marginTop: 10 },
//       ]}
//     >
//       <Text style={tripDetailStyles.sightTitle}>{item?.title}</Text>
//       <View style={tripDetailStyles.ratingLabel}>
//         {item?.rate ? (
//           <>
//             <View
//               style={{
//                 position: "relative",
//                 top: -1,
//                 opacity: 0.8,
//                 marginRight: 3,
//               }}
//             >
//               <StarIcon color="#FFBC3E" />
//             </View>
//             <Text style={[tripDetailStyles.ratingText]}>
//               {item?.rate}
//             </Text>
//           </>
//         ) : null}

//         <Text style={[tripDetailStyles.sightType]}>
//           {item?.category}
//         </Text>
//       </View>
//       {item?.description?.length > 0 ? (
//         <Text style={tripDetailStyles.descText}>
//           {item?.description?.slice(0, 100)}...
//         </Text>
//       ) : null}
//     </View>
//   </View>
//   <View
//     style={[
//       tripDetailStyles.sightBottomActions,
//       {
//         marginTop: 15,
//         marginBottom: 0,
//         borderTopColor: "#f2f2f2",
//         borderTopWidth: 1,
//         width: "100%",
//       },
//     ]}
//   >
//     <TouchableOpacity
//       activeOpacity={0.7}
//       style={tripDetailStyles.checkinButton}
//       onPress={handleChangeActivityVisited}
//     >
//       <CheckLiteIcon
//         color={checkedIn ? COLORS.primary : COLORS.gray}
//         width="15"
//       />
//       <Text
//         style={[
//           tripDetailStyles.checkinButtonText,
//           { color: checkedIn ? COLORS.primary : COLORS.gray },
//         ]}
//       >
//         Visited
//       </Text>
//     </TouchableOpacity>

//     <View style={tripDetailStyles.sightRightActions}>
//       <TouchableOpacity
//         style={tripDetailStyles.sightRightActionsButton}
//         activeOpacity={0.7}
//         onPress={() => openMap(item?.title)}
//       >
//         <MapDirection width="15" color={COLORS.gray} />
//       </TouchableOpacity>
//       <TouchableOpacity
//         onPress={() => onQuestionModalOpen(item.id)}
//         style={[tripDetailStyles.sightRightActionsButton, {
//           marginRight: -5
//         }]}
//         activeOpacity={0.7}
//       >
//         <DotsIcon color={COLORS.gray} />
//       </TouchableOpacity>
//     </View>
//   </View>
// </TouchableOpacity>

{
  /* {lastIndex > 0 && (
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
)} */
}
{
  /* {item?.description?.length > 0 ? (
              <Text style={tripDetailStyles.descText} numberOfLines={1}>
                {item?.description}
              </Text>
) : null} */
}
