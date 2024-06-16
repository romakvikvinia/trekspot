import { Image } from "expo-image";
import { useState } from "react";
import { ImageBackground, Linking, Platform } from "react-native";
import { Text, TouchableOpacity, View } from "react-native";
import { COLORS } from "../../styles/theme";
import {
  CheckLiteIcon,
  DotsIcon,
  MapIcon,
  PinIcon,
  StarIcon,
} from "../../utilities/SvgIcons.utility";
import { tripDetailStyles } from "./_tripDetailStyles";
import * as Haptics from "expo-haptics";

export const TripActivityCard = ({
  item,
  index,
  onQuestionModalOpen,
  handleTopSightClick,
}) => {
  const [checkedIn, setCheckedIn] = useState(false);

  const openMap = (address: string) => {
    const scheme = Platform.select({
      ios: "maps://0,0?q=",
      android: "geo:0,0?q=",
    });
    const url = Platform.select({
      ios: `${scheme}${address}`,
      android: `${scheme}${address}`,
    });

    Linking.openURL(url);
  };

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
        onPress={() => { handleTopSightClick(item);Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);}}
      >
        <View style={tripDetailStyles.pinIcon}>
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
        </View>

        <View style={tripDetailStyles.imagesWrapper}>
          {item?.images?.slice(0, 2).map((image, index) => (
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

          <ImageBackground
            resizeMode="cover"
            source={{
              uri: item?.image?.url,
            }}
            style={ tripDetailStyles.lastImage }
          >
            <View
              style={tripDetailStyles.imageOverlay}
            >
              <Text style={{color:"#fff", fontWeight: "bold", fontSize: 14}}>+3</Text>
            </View>
          </ImageBackground>
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
          onPress={() => {
            setCheckedIn(!checkedIn);
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          }}
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
            {checkedIn ? "Checked in" : "Check in"}
          </Text>
        </TouchableOpacity>

        <View style={tripDetailStyles.sightRightActions}>
          <TouchableOpacity
            style={tripDetailStyles.sightRightActionsButton}
            activeOpacity={0.7}
            onPress={() => openMap(item?.title)}
          >
            <MapIcon width="15" color={COLORS.gray} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => onQuestionModalOpen()}
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
