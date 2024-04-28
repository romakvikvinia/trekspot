import { useNavigation } from "@react-navigation/native";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useRef, useState } from "react";
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
import { AddUser, CoupleIcon, DotsIcon, EditIcon, FamilyIcon, OneUserIcon, TrashIcon, UserIcon, UsersIcon } from "../../utilities/SvgIcons.utility";
import { _tripScreenStyles } from "./_tripScreenStyles";

export const Tripitem = () => {
  const navigation = useNavigation();
  const modalQuestionRef = useRef<Modalize>(null);

  const onQuestionModalOpen = () => {
    modalQuestionRef?.current?.open();
  }

  return (
    <>
      <View style={_tripScreenStyles.tripItem}>
        <TouchableOpacity
          style={_tripScreenStyles.tripItemHeader}
          activeOpacity={0.7}
          onPress={() => navigation.navigate("TripDetailScreen")}
        >
          {Platform.OS === "android" ? (
            <ImageBackground
              source={{
                uri: "https://images.unsplash.com/photo-1550340499-a6c60fc8287c?q=20&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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
                        14 Nov → 20 Nov
                      </Text>
                    </View>
                    <Text style={_tripScreenStyles.tripTitle}>
                      Hangover Paris
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
                    <Text style={_tripScreenStyles.typeTagText}>Friends</Text>
                  </View>
                </View>
              </LinearGradient>
            </ImageBackground>
          ) : (
            <Image
              source={{
                uri: "https://images.unsplash.com/photo-1550340499-a6c60fc8287c?q=20&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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
                        14 Nov → 20 Nov
                      </Text>
                    </View>
                    <Text style={_tripScreenStyles.tripTitle}>
                      Hangover Paris
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
                    <Text style={_tripScreenStyles.typeTagText}>Friends</Text>
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
