import React from "react";
import { useNavigation } from "@react-navigation/native";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import {
  ImageBackground,
  Platform,
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

interface ITripItemProps {
  item: TripType;
  onContextMenu: () => void;
}

type TripStackNavigationProp = StackNavigationProp<TripRouteStackParamList>;

export const TripItem: React.FC<ITripItemProps> = ({ item, onContextMenu }) => {
  const navigation = useNavigation<TripStackNavigationProp>();

  const city = item.cities[0];

  return (
    <>
      <View style={_tripScreenStyles.tripItem}>
        <TouchableOpacity
          style={_tripScreenStyles.tripItemHeader}
          activeOpacity={0.7}
          onPress={() =>
            navigation.navigate("TripDetailScreen", { trip: item, city })
          }
        >
          {Platform.OS === "android" ? (
            <ImageBackground
              source={{
                uri: city.image.url,
              }}
              resizeMode="cover"
              style={_tripScreenStyles.tripImage}
            >
              <LinearGradient
                style={_tripScreenStyles.gradientWrapper}
                colors={["rgba(0,0,0,1)", "rgba(0,0,0,0.2)"]}
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
                    <Text style={_tripScreenStyles.tripTitle}>
                      {item?.name}
                    </Text>
                  </View>
                  <TouchableOpacity onPress={onContextMenu}>
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
                  <View style={_tripScreenStyles.typeTag}>
                    <UsersIcon size="10" color="#ececec" />
                    <Text style={_tripScreenStyles.typeTagText}>
                      {item.type}
                    </Text>
                  </View>
                </View>
              </LinearGradient>
            </ImageBackground>
          ) : (
            <Image
              source={ city?.image?.url ? {
                uri: city.image.url,
              } : require("../../assets/no-image.png")
            }
              cachePolicy="memory"
              contentFit="cover"
              transition={0}
              style={_tripScreenStyles.tripImage}
            >
              <LinearGradient
                style={_tripScreenStyles.gradientWrapper}
                colors={["rgba(0,0,0,1)", "rgba(0,0,0,0.2)"]}
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
                    <Text style={_tripScreenStyles.tripTitle}>
                      {item?.name}
                    </Text>
                  </View>
                  <TouchableOpacity style={{
                    padding: 15,
                    marginTop: -10,
                    marginRight: -10
                  }} onPress={onContextMenu}>
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
                  <View style={_tripScreenStyles.typeTag}>
                    <UsersIcon size="10" color="#ececec" />
                    <Text style={_tripScreenStyles.typeTagText}>
                      {item.type.toLowerCase()}
                    </Text>
                  </View>
                  <View style={_tripScreenStyles.tripLocation}>
                    <LocationPin width="10" color="#ececec" />
                    <Text style={_tripScreenStyles.tripLocationText}>
                      {item?.cities[0].city}
                    </Text>
                  </View>
                </View>
              </LinearGradient>
            </Image>
          )}
        </TouchableOpacity>
      </View>
    </>
  );
};
