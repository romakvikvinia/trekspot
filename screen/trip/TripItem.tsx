import React, { useRef, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import {
  Alert,
  ImageBackground,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Modalize } from "react-native-modalize";
import { Portal } from "react-native-portalize";
import { QuestionModal } from "../../common/components/QuestionModal";
import { questionModaStyles } from "../../styles/questionModaStyles";
import {
  AddUser,
  CoupleIcon,
  DotsIcon,
  EditIcon,
  FamilyIcon,
  OneUserIcon,
  TrashIcon,
  UserIcon,
  UsersIcon,
} from "../../utilities/SvgIcons.utility";
import { _tripScreenStyles } from "./_tripScreenStyles";
import { TripType } from "../../api/api.types";
import moment from "moment";
import { TripRouteStackParamList } from "../../routes/trip/TripRoutes";
import { StackNavigationProp } from "@react-navigation/stack";

interface ITripItemProps {
  item: TripType;
}

type TripStackNavigationProp = StackNavigationProp<TripRouteStackParamList>;

export const TripItem: React.FC<ITripItemProps> = ({ item }) => {
  const navigation = useNavigation<TripStackNavigationProp>();
  const modalQuestionRef = useRef<Modalize>(null);

  const onQuestionModalOpen = () => {
    modalQuestionRef?.current?.open();
  };

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
                        {moment(item.startAt).format("DD MMM")}→{" "}
                        {moment(item.endAt).format("DD MMM")}
                      </Text>
                    </View>
                    <Text style={_tripScreenStyles.tripTitle}>
                      {city?.city}
                    </Text>
                  </View>
                  <TouchableOpacity onPress={() => onQuestionModalOpen()}>
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
              source={{
                uri: city.image.url,
              }}
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
                        {moment(item.startAt).format("DD MMM")}→{" "}
                        {moment(item.endAt).format("DD MMM")}
                      </Text>
                    </View>
                    <Text style={_tripScreenStyles.tripTitle}>
                      {city?.city}
                    </Text>
                  </View>
                  <TouchableOpacity onPress={() => onQuestionModalOpen()}>
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
                </View>
              </LinearGradient>
            </Image>
          )}
        </TouchableOpacity>
      </View>

      <Portal>
        <Modalize
          ref={modalQuestionRef}
          modalTopOffset={65}
          disableScrollIfPossible
          adjustToContentHeight
          velocity={100000}
          tapGestureEnabled={false}
          closeSnapPointStraightEnabled={false}
          modalStyle={{
            backgroundColor: "#F2F2F7",
            minHeight: "30%",
          }}
          scrollViewProps={{
            showsVerticalScrollIndicator: false,
          }}
        >
          <QuestionModal modalQuestionRef={modalQuestionRef} title="Action">
            <View style={questionModaStyles.buttonGroup}>
              <TouchableOpacity
                activeOpacity={0.7}
                style={[questionModaStyles.button]}
              >
                <Text style={questionModaStyles.buttonText}>Edit</Text>
                <EditIcon size="15" />
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() =>
                  Alert.alert("Do you really want to delete activity?", "", [
                    {
                      text: "Cancel",
                      onPress: () => console.log("Cancel Pressed"),
                      style: "cancel",
                    },
                    {
                      text: "Delete",
                      onPress: () => console.log("OK Pressed"),
                      style: "destructive",
                    },
                  ])
                }
                style={[questionModaStyles.button, { borderBottomWidth: 0 }]}
              >
                <Text style={[questionModaStyles.buttonText, { color: "red" }]}>
                  Delete
                </Text>
                <TrashIcon size="15" />
              </TouchableOpacity>
            </View>
          </QuestionModal>
        </Modalize>
      </Portal>
    </>
  );
};
