import React from "react";
import { useNavigation } from "@react-navigation/native";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import {
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import {
  DotsIcon,
  LocationPin,
  UsersIcon,
} from "../../utilities/SvgIcons.utility";
import { _tripScreenStyles } from "./_tripScreenStyles";
import { TripType } from "../../api/api.types";
import { TripRouteStackParamList } from "../../routes/trip/TripRoutes";
import { StackNavigationProp } from "@react-navigation/stack";
import { format, parseISO } from "date-fns";
import { FlagIcon } from "./components/FlagIcon";
import { usePostHog } from "posthog-react-native";
import { Events } from "../../utilities/Posthog";

interface ITripItemProps {
  item: TripType;
  onContextMenu: () => void;
}

type TripStackNavigationProp = StackNavigationProp<TripRouteStackParamList>;

export const TripItem: React.FC<ITripItemProps> = ({ item, onContextMenu }) => {
  const posthog = usePostHog();
  const navigation = useNavigation<TripStackNavigationProp>();

  const city = item.cities[0];

  return (
    <>
      <View style={_tripScreenStyles.tripItem}>
        <TouchableOpacity
          style={[
            _tripScreenStyles.tripItemHeader,
            {
              position: "relative",
            },
          ]}
          activeOpacity={0.7}
          onPress={() => {
            posthog.capture(Events.OpenTripDetailScreen, {
              destinationCity: city?.city,
            });
            navigation.navigate("TripDetailScreen", { trip: item, city });
          }}
        >
          <Image
            source={
              city?.image?.url
                ? {
                    uri: city.image.url,
                  }
                : require("../../assets/no-image.png")
            }
            cachePolicy="memory"
            contentFit="cover"
            transition={0}
            style={_tripScreenStyles.tripImage}
          ></Image>
          <LinearGradient
            style={[
              _tripScreenStyles.gradientWrapper,
              {
                borderRadius: 15,
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
              },
            ]}
            colors={["rgba(0,0,0,1)", "rgba(0,0,0,0.4)"]}
            start={{ x: -1, y: 1 }}
            end={{ x: 1, y: 0 }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "flex-start",
              }}
            >
              <View>
                <View style={_tripScreenStyles.tripInHeader}>
                  <Text style={_tripScreenStyles.tripDate}>
                    {format(parseISO(item.startAt), "dd MMM")} →{" "}
                    {format(parseISO(item.endAt), "dd MMM")}
                  </Text>
                </View>
                <Text style={_tripScreenStyles.tripTitle}>{item?.name}</Text>
              </View>
              <TouchableOpacity
                style={{
                  padding: 15,
                  marginTop: -10,
                  marginRight: -10,
                  // width: 35,
                  // height: 35,
                  // backgroundColor: "rgba(0, 0, 0, 0.6)",
                  // alignItems: "center",
                  // justifyContent: "center",
                  // borderRadius: 100
                }}
                onPress={onContextMenu}
              >
                <DotsIcon color="#fff" />
              </TouchableOpacity>
            </View>
            <View style={_tripScreenStyles.tripDetails}>
              {/* <View style={_tripScreenStyles.typeTag}>
                    <OneUserIcon size="10" color="#ececec" />
                    <Text style={_tripScreenStyles.typeTagText}>Solo</Text>
                  </View> */}
              {/* <View style={_tripScreenStyles.typeTag}>
                    <CoupleIcon size="10" color="#ececec" />
                    <Text style={_tripScreenStyles.typeTagText}>Couple</Text>
                  </View> */}
              {/* <View style={_tripScreenStyles.typeTag}>
                    <FamilyIcon size="10" color="#ececec" />
                    <Text style={_tripScreenStyles.typeTagText}>Family</Text>
                  </View> */}
              <View style={_tripScreenStyles.tripLocation}>
                <LocationPin width="10" color="#ececec" />
                <Text style={_tripScreenStyles.tripLocationText}>
                  {item?.cities[0].city}
                </Text>
                <FlagIcon iso2={item?.cities[0]?.iso2} />
              </View>

              <View style={_tripScreenStyles.typeTag}>
                <UsersIcon size="10" color="#ececec" />
                <Text style={_tripScreenStyles.typeTagText}>
                  {item.type.toLowerCase()}
                </Text>
              </View>
            </View>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </>
  );
};
