import React, { useCallback, useEffect, useRef, useState } from "react";

import { Alert, Platform, Text, TouchableOpacity, View } from "react-native";
import { COLORS, SIZES } from "../../styles/theme";
import { enGB, registerTranslation } from "react-native-paper-dates";
registerTranslation("en", enGB);
import { tripDetailStyles } from "./_tripDetailStyles";
import {
  EditIcon,
  PlusIcon,
  TrashIcon,
  XIcon,
} from "../../utilities/SvgIcons.utility";
import * as Haptics from "expo-haptics";

import { Portal } from "react-native-portalize";
import { Modalize } from "react-native-modalize";
import { MaterialTabBar, Tabs } from "react-native-collapsible-tab-view";
import { QuestionModal } from "../../common/components/QuestionModal";
import { questionModaStyles } from "../../styles/questionModaStyles";
import { TripActivitiesSelect } from "./TripActivitiesSelect";

import { MapEmbedView } from "../../common/components/MapEmbedView";

import { Header } from "./SubComponents/Header";
import { TripActivityCard } from "./TripActivityCard";
import { useLazyGetSightsQuery } from "../../api/api.trekspot";
import { SightDetailModal } from "../../components/explore/sights/SightDetailModal";

import { TripRouteStackParamList } from "../../routes/trip/TripRoutes";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { NoActivity } from "../../common/components/NoActivity";

type TripProps = NativeStackScreenProps<
  TripRouteStackParamList,
  "TripDetailScreen"
>;

export const TripDetailScreen: React.FC<TripProps> = ({
  route,
  navigation,
}) => {
  const { trip, city } = route.params;
  const [getSights, { data, isLoading: sightsLoading }] =
    useLazyGetSightsQuery();

  useEffect(() => {
    getSights({ iso2: "AE", city: "Dubai" });
  }, []);

  const [currentTabIndex, setCurrentTabIndex] = useState(0);
  const [topSightDetail, setTopSightDetail] = useState(null);
  const [tripData, setTrip] = useState({
    name: "Dubai vacation",
    startDate: "15 Nov",
    endDate: "24 Nov",
    type: "Solo",
    country: "UAE",
    city: "Dubai",
    mainTopSight: {
      coordinates: {
        latitude: 25.1971636,
        longitude: 55.274249,
      },
    },
    data: [
      {
        id: 0,
        date: "May 8",
        activities: [],
      },
      {
        id: 1,
        date: "May 9",
        activities: [],
      },
    ],
  });

  const handleTabChange = (i) => {
    setCurrentTabIndex(i);
  };

  const activitiesModal = useRef<Modalize>(null);
  const modalQuestionRef = useRef<Modalize>(null);
  const modalQuestionRef2 = useRef<Modalize>(null);
  const modalEmbedRef = useRef<Modalize>(null);

  const onActivitiesModalOpen = () => {
    activitiesModal.current?.open();
  };

  const onQuestionModalOpen = () => {
    modalQuestionRef.current?.open();
  };

  const onQuestion2ModalOpen = () => {
    modalQuestionRef2.current?.open();
  };

  const handleNavigate = () => {
    if (route?.params?.directVisit) {
      navigation.navigate("TripQuickInsights", {
        directVisit: true,
      });
    } else {
      navigation.navigate("TripInsights");
    }
  };

  const handleAddToTrip = (activity) => {
    console.log("activity,activity", activity);
    setTrip((prevTrip) => {
      const newTripData = prevTrip.data.map((day) => {
        if (day.id === currentTabIndex) {
          return {
            ...day,
            activities: [...day.activities, activity],
          };
        }
        return day;
      });

      return {
        ...prevTrip,
        data: newTripData,
      };
    });
  };

  const handleTopSightClick = (sight) => {
    setTopSightDetail(sight);
  };

  const handleClear = useCallback(() => {
    setTopSightDetail(null);
  }, []);

  return (
    <>
      <Tabs.Container
        minHeaderHeight={50}
        renderHeader={() => (
          <Header
            onQuestion2ModalOpen={onQuestion2ModalOpen}
            handleNavigate={handleNavigate}
            data={tripData}
          />
        )}
        headerHeight={300} // optional
        containerStyle={{
          flex: 1,
          backgroundColor: "#f7f7f7",
        }}
        headerContainerStyle={{
          elevation: 0,
          shadowColor: "#fff",
        }}
        renderTabBar={(props) => (
          <MaterialTabBar
            {...props}
            scrollEnabled
            indicatorStyle={{
              backgroundColor: COLORS.black,
              height: 3,
            }}
            style={{
              paddingLeft: 10,
              backgroundColor: COLORS.lightGray,
              marginTop: 15,
              paddingTop: 10,
            }}
            tabStyle={{
              height: 50,
              marginRight: 15,
            }}
            activeColor="red"
            inactiveColor="yellow"
          />
        )}
        revealHeaderOnScroll={true}
        onIndexChange={handleTabChange}
      >
        {tripData?.data.map((item, ind) => (
          <Tabs.Tab
            name={item?.date}
            label={(props) => (
              <View
                style={[
                  tripDetailStyles.customTab,
                  {
                    width:
                      tripData?.data?.length < 4
                        ? (SIZES.width - 40) / tripData?.data?.length
                        : "auto",
                  },
                ]}
                key={ind}
              >
                <Text
                  style={{
                    fontSize: 12,
                    marginBottom: 3,
                    color: COLORS.gray,
                  }}
                >
                  Mon
                </Text>
                <Text
                  style={[
                    tripDetailStyles.customTabLabel,
                    {
                      color: COLORS.black,
                      marginBottom: 5,
                    },
                  ]}
                >
                  {item?.date}
                </Text>
              </View>
            )}
          >
            <Tabs.ScrollView
              alwaysBounceVertical={false}
              bounces={false}
              showsVerticalScrollIndicator={false}
              style={{
                paddingTop: 25,
              }}
              contentContainerStyle={{
                paddingHorizontal: 20,
                position: "relative",
                paddingBottom: 60,
              }}
            >
              {tripData?.data[currentTabIndex]?.activities?.length > 0 &&
              Platform.OS === "ios" ? (
                <View
                  style={{
                    position: "absolute",
                    borderWidth: 1.5,
                    borderStyle: "dashed",
                    height: "96%",
                    top: 25,
                    left: 14,
                    borderColor: "#ddd",
                    borderRadius: 1,
                    opacity: 0.7,
                  }}
                ></View>
              ) : null}

              <View style={tripDetailStyles.sightItemList}>
                {item?.activities?.map((itm, ind) => (
                  <TripActivityCard
                    item={itm}
                    index={ind}
                    onQuestionModalOpen={onQuestionModalOpen}
                    handleTopSightClick={handleTopSightClick}
                  />
                ))}

                {item?.activities?.length < 1 ? (
                  <View style={tripDetailStyles.noActivitiesWrapper}>
                  
                    <Text style={{
                      color: COLORS.black,
                      fontSize: 18,
                      fontWeight: "bold",
                    }}>
                      You don't have activites for today
                    </Text>
                    <TouchableOpacity
                      style={tripDetailStyles.addActivityButtonItem}
                      activeOpacity={0.7}
                      onPress={() => {
                        onActivitiesModalOpen();
                        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                      }}
                    >
                      <Text style={tripDetailStyles.addActivityButtonText}>
                        Add activity
                      </Text>
                    </TouchableOpacity>
                  </View>
                ) : null}
              </View>
            </Tabs.ScrollView>
          </Tabs.Tab>
        ))}
      </Tabs.Container>

      {topSightDetail ? (
        <SightDetailModal data={topSightDetail} closeCallBack={handleClear} />
      ) : null}

      {tripData?.data[currentTabIndex]?.activities?.length > 0 ? (
        <TouchableOpacity
          onPress={() => {onActivitiesModalOpen();  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);}}
          activeOpacity={0.7}
          style={tripDetailStyles.addActivityButton}
        >
          <PlusIcon />
        </TouchableOpacity>
      ) : null}

      <Portal>
        <Modalize
          ref={activitiesModal}
          modalTopOffset={200}
          modalHeight={SIZES.height - 100}
          panGestureEnabled={true}
          HeaderComponent={
            <>
              <View style={tripDetailStyles.rowItemHeader}>
                <Text style={tripDetailStyles.h2}>
                  Activites -{" "}
                  <Text
                    style={{
                      fontWeight: "500",
                      color: COLORS.primary,
                    }}
                  >
                    {[tripData?.data[currentTabIndex].date]}
                  </Text>
                </Text>

                <TouchableOpacity
                  onPress={() => activitiesModal?.current?.close()}
                  activeOpacity={0.5}
                  style={tripDetailStyles.closeButton}
                >
                  <XIcon width="10" />
                </TouchableOpacity>
              </View>
            </>
          }
          modalStyle={{
            backgroundColor: "#F2F2F7",
          }}
          scrollViewProps={{
            showsVerticalScrollIndicator: false,
          }}
        >
          <TripActivitiesSelect
            trip={tripData}
            currentTabIndex={currentTabIndex}
            handleAddToTrip={handleAddToTrip}
            currentTabIndex={currentTabIndex}
            data={data}
            isLoading={sightsLoading}
          />
        </Modalize>
      </Portal>

      {/* Questions */}

      <Portal>
        <Modalize
          ref={modalQuestionRef2}
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
          <QuestionModal modalQuestionRef={modalQuestionRef2} title="Action">
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
                  Alert.alert("Do you really want to delete trip?", "", [
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
            minHeight: 200,
          }}
          scrollViewProps={{
            showsVerticalScrollIndicator: false,
          }}
        >
          <QuestionModal modalQuestionRef={modalQuestionRef} title="Action">
            <View style={questionModaStyles.buttonGroup}>
              {/* <TouchableOpacity
                activeOpacity={0.7}
                style={[questionModaStyles.button]}
              >
                <Text style={questionModaStyles.buttonText}>Edit</Text>
                <EditIcon size="15" />
              </TouchableOpacity> */}
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

      <Portal>
        <Modalize ref={modalEmbedRef} modalTopOffset={65} adjustToContentHeight>
          <MapEmbedView
            blogUrl="https://file-examples.com/wp-content/storage/2017/10/file-sample_150kB.pdf"
            placeTitle="Tbilisi"
            modalEmbedRef={modalEmbedRef}
          />
        </Modalize>
      </Portal>
    </>
  );
};

// <TouchableOpacity
// activeOpacity={0.7}
// onPress={() => onInvitedUsersModalOpen()}
// style={tripDetailStyles.invitationBox}
// >
// {invitedUsers?.length > 0 && (
//   <Image
//     cachePolicy="memory"
//     contentFit="cover"
//     transition={0}
//     source={{
//       uri: invitedUsers?.[0],
//     }}
//     style={tripDetailStyles.inviteOne}
//   />
// )}
// {invitedUsers?.length >= 2 && (
//   <Image
//     cachePolicy="memory"
//     contentFit="cover"
//     transition={0}
//     source={{
//       uri: invitedUsers?.[1],
//     }}
//     style={tripDetailStyles.inviteTwo}
//   />
// )}
// <View
//   style={[
//     styles.addUserButton,
//     {
//       left:
//         invitedUsers?.length === 2
//           ? -20
//           : invitedUsers?.length > 2
//           ? -28
//           : -10,
//     },
//   ]}
// >
//   <AddUser />
// </View>
// </TouchableOpacity>
{
  /* <Portal>
<Modalize
  ref={invitedUsersModal}
  modalTopOffset={65}
  HeaderComponent={
    <>
      <View style={tripDetailStyles.rowItemHeader}>
        <Text style={tripDetailStyles.h2}>Trip members</Text>

        <TouchableOpacity
          onPress={() => invitedUsersModal?.current?.close()}
          activeOpacity={0.5}
          style={tripDetailStyles.closeButton}
        >
          <XIcon width="10" />
        </TouchableOpacity>
      </View>
      <View style={tripDetailStyles.inviteBox}>
        <TextInput
          placeholder="Enter email"
          style={tripDetailStyles.inviteBoxInput}
          placeholderTextColor="#85858B"
          inputMode="email"
        />
        <TouchableOpacity
          style={tripDetailStyles.inviteButton}
          activeOpacity={0.7}
        >
          <Text style={tripDetailStyles.inviteButtonText}>Invite</Text>
        </TouchableOpacity>
      </View>
    </>
  }
  scrollViewProps={{
    keyboardShouldPersistTaps: "handled",
  }}
  modalStyle={{
    backgroundColor: "#F2F2F7",
    flex: 1,
  }}
>
  <ScrollView style={{ flex: 1 }}>
    {false ? (
      <View style={tripDetailStyles.invitedList}>
        <View style={tripDetailStyles.invitedListItem}>
          <View style={tripDetailStyles.lfSide}>
            <Image
              cachePolicy="memory"
              contentFit="cover"
              transition={0}
              source={{
                uri: invitedUsers?.[0],
              }}
              style={tripDetailStyles.invitedUserImage}
            />
            <View style={tripDetailStyles.invitationBoxTexts}>
              <Text style={tripDetailStyles.invitedUserName}>
                Giorgi Bitsadze
              </Text>
              <Text style={tripDetailStyles.invitationStatus}>Accepted</Text>
            </View>
          </View>
          <TouchableOpacity
            activeOpacity={0.7}
            style={tripDetailStyles.removeInvitedUser}
          >
            <TrashIcon color="#BBB" />
          </TouchableOpacity>
        </View>
        <View style={tripDetailStyles.invitedListItem}>
          <View style={tripDetailStyles.lfSide}>
            <Image
              cachePolicy="memory"
              contentFit="cover"
              transition={0}
              source={{
                uri: invitedUsers?.[0],
              }}
              style={tripDetailStyles.invitedUserImage}
            />
            <View style={tripDetailStyles.invitationBoxTexts}>
              <Text style={tripDetailStyles.invitedUserName}>Beka Arabidze</Text>
              <Text style={tripDetailStyles.invitationStatus}>Pending</Text>
            </View>
          </View>
          <TouchableOpacity
            activeOpacity={0.7}
            style={tripDetailStyles.removeInvitedUser}
          >
            <TrashIcon color="#BBB" />
          </TouchableOpacity>
        </View>
        <View style={tripDetailStyles.invitedListItem}>
          <View style={tripDetailStyles.lfSide}>
            <Image
              cachePolicy="memory"
              contentFit="cover"
              transition={0}
              source={{
                uri: invitedUsers?.[0],
              }}
              style={tripDetailStyles.invitedUserImage}
            />
            <View style={tripDetailStyles.invitationBoxTexts}>
              <Text style={tripDetailStyles.invitedUserName}>
                Giorgi Bitsadze
              </Text>
              <Text style={tripDetailStyles.invitationStatus}>Accepted</Text>
            </View>
          </View>
          <TouchableOpacity
            activeOpacity={0.7}
            style={tripDetailStyles.removeInvitedUser}
          >
            <TrashIcon color="#BBB" />
          </TouchableOpacity>
        </View>
      </View>
    ) : (
      <View style={tripDetailStyles.noResultWrapper}>
        <SearchNotFound />
        <Text style={tripDetailStyles.noResultWrapperText}>
          You haven't added trip members yet, enter email and send
          invitation
        </Text>
      </View>
    )}
  </ScrollView>
</Modalize>
</Portal> */
}

{
  /* <Modal
animationType="slide"
transparent={true}
visible={invitedUsersModalVisible}
onRequestClose={() => {
  setInvitedUsersModalVisible(false);
}}
>
<View style={tripDetailStyles.modalViewWrapper}>
  <View style={tripDetailStyles.modalViewCenter}>
    <View style={[styles.rowItemHeader, { width: "100%" }]}>
      <Text style={tripDetailStyles.h2}>Trip members</Text>

      <TouchableOpacity
        onPress={() => setInvitedUsersModalVisible(false)}
        activeOpacity={0.5}
        style={tripDetailStyles.closeButton}
      >
        <XIcon width="10" />
      </TouchableOpacity>
    </View>
    <View style={tripDetailStyles.inviteBox}>
      <TextInput
        placeholder="Enter email"
        style={tripDetailStyles.inviteBoxInput}
        placeholderTextColor="#85858B"
        inputMode="email"
      />
      <TouchableOpacity style={tripDetailStyles.inviteButton} activeOpacity={0.7}>
        <Text style={tripDetailStyles.inviteButtonText}>Invite</Text>
      </TouchableOpacity>
    </View>
    {true ? (
      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 0 }}
        style={[styles.invitedList]}
      >
        <View style={[styles.invitedListItem]}>
          <View style={tripDetailStyles.lfSide}>
            <Image
              cachePolicy="memory"
              contentFit="cover"
              transition={0}
              source={{
                uri: invitedUsers?.[0],
              }}
              style={tripDetailStyles.invitedUserImage}
            />
            <View style={tripDetailStyles.invitationBoxTexts}>
              <Text style={tripDetailStyles.invitedUserName}>
                Giorgi Bitsadze
              </Text>
              <Text style={tripDetailStyles.invitationStatus}>Accepted</Text>
            </View>
          </View>
          <TouchableOpacity
            activeOpacity={0.7}
            style={tripDetailStyles.removeInvitedUser}
          >
            <TrashIcon color="#BBB" />
          </TouchableOpacity>
        </View>
        <View style={tripDetailStyles.invitedListItem}>
          <View style={tripDetailStyles.lfSide}>
            <Image
              cachePolicy="memory"
              contentFit="cover"
              transition={0}
              source={{
                uri: invitedUsers?.[0],
              }}
              style={tripDetailStyles.invitedUserImage}
            />
            <View style={tripDetailStyles.invitationBoxTexts}>
              <Text style={tripDetailStyles.invitedUserName}>Beka Arabidze</Text>
              <Text style={tripDetailStyles.invitationStatus}>Pending</Text>
            </View>
          </View>
          <TouchableOpacity
            activeOpacity={0.7}
            style={tripDetailStyles.removeInvitedUser}
          >
            <TrashIcon color="#BBB" />
          </TouchableOpacity>
        </View>
        <View style={tripDetailStyles.invitedListItem}>
          <View style={tripDetailStyles.lfSide}>
            <Image
              cachePolicy="memory"
              contentFit="cover"
              transition={0}
              source={{
                uri: invitedUsers?.[0],
              }}
              style={tripDetailStyles.invitedUserImage}
            />
            <View style={tripDetailStyles.invitationBoxTexts}>
              <Text style={tripDetailStyles.invitedUserName}>
                Giorgi Bitsadze
              </Text>
              <Text style={tripDetailStyles.invitationStatus}>Accepted</Text>
            </View>
          </View>
          <TouchableOpacity
            activeOpacity={0.7}
            style={tripDetailStyles.removeInvitedUser}
          >
            <TrashIcon color="#BBB" />
          </TouchableOpacity>
        </View>
        <View style={[styles.invitedListItem]}>
          <View style={tripDetailStyles.lfSide}>
            <Image
              cachePolicy="memory"
              contentFit="cover"
              transition={0}
              source={{
                uri: invitedUsers?.[0],
              }}
              style={tripDetailStyles.invitedUserImage}
            />
            <View style={tripDetailStyles.invitationBoxTexts}>
              <Text style={tripDetailStyles.invitedUserName}>
                Giorgi Bitsadze
              </Text>
              <Text style={tripDetailStyles.invitationStatus}>Accepted</Text>
            </View>
          </View>
          <TouchableOpacity
            activeOpacity={0.7}
            style={tripDetailStyles.removeInvitedUser}
          >
            <TrashIcon color="#BBB" />
          </TouchableOpacity>
        </View>
        <View style={tripDetailStyles.invitedListItem}>
          <View style={tripDetailStyles.lfSide}>
            <Image
              cachePolicy="memory"
              contentFit="cover"
              transition={0}
              source={{
                uri: invitedUsers?.[0],
              }}
              style={tripDetailStyles.invitedUserImage}
            />
            <View style={tripDetailStyles.invitationBoxTexts}>
              <Text style={tripDetailStyles.invitedUserName}>Beka Arabidze</Text>
              <Text style={tripDetailStyles.invitationStatus}>Pending</Text>
            </View>
          </View>
          <TouchableOpacity
            activeOpacity={0.7}
            style={tripDetailStyles.removeInvitedUser}
          >
            <TrashIcon color="#BBB" />
          </TouchableOpacity>
        </View>
        <View style={tripDetailStyles.invitedListItem}>
          <View style={tripDetailStyles.lfSide}>
            <Image
              cachePolicy="memory"
              contentFit="cover"
              transition={0}
              source={{
                uri: invitedUsers?.[0],
              }}
              style={tripDetailStyles.invitedUserImage}
            />
            <View style={tripDetailStyles.invitationBoxTexts}>
              <Text style={tripDetailStyles.invitedUserName}>
                Giorgi Bitsadze
              </Text>
              <Text style={tripDetailStyles.invitationStatus}>Accepted</Text>
            </View>
          </View>
          <TouchableOpacity
            activeOpacity={0.7}
            style={tripDetailStyles.removeInvitedUser}
          >
            <TrashIcon color="#BBB" />
          </TouchableOpacity>
        </View>
        <View style={[styles.invitedListItem]}>
          <View style={tripDetailStyles.lfSide}>
            <Image
              cachePolicy="memory"
              contentFit="cover"
              transition={0}
              source={{
                uri: invitedUsers?.[0],
              }}
              style={tripDetailStyles.invitedUserImage}
            />
            <View style={tripDetailStyles.invitationBoxTexts}>
              <Text style={tripDetailStyles.invitedUserName}>
                Giorgi Bitsadze
              </Text>
              <Text style={tripDetailStyles.invitationStatus}>Accepted</Text>
            </View>
          </View>
          <TouchableOpacity
            activeOpacity={0.7}
            style={tripDetailStyles.removeInvitedUser}
          >
            <TrashIcon color="#BBB" />
          </TouchableOpacity>
        </View>
        <View style={tripDetailStyles.invitedListItem}>
          <View style={tripDetailStyles.lfSide}>
            <Image
              cachePolicy="memory"
              contentFit="cover"
              transition={0}
              source={{
                uri: invitedUsers?.[0],
              }}
              style={tripDetailStyles.invitedUserImage}
            />
            <View style={tripDetailStyles.invitationBoxTexts}>
              <Text style={tripDetailStyles.invitedUserName}>Beka Arabidze</Text>
              <Text style={tripDetailStyles.invitationStatus}>Pending</Text>
            </View>
          </View>
          <TouchableOpacity
            activeOpacity={0.7}
            style={tripDetailStyles.removeInvitedUser}
          >
            <TrashIcon color="#BBB" />
          </TouchableOpacity>
        </View>
        <View style={tripDetailStyles.invitedListItem}>
          <View style={tripDetailStyles.lfSide}>
            <Image
              cachePolicy="memory"
              contentFit="cover"
              transition={0}
              source={{
                uri: invitedUsers?.[0],
              }}
              style={tripDetailStyles.invitedUserImage}
            />
            <View style={tripDetailStyles.invitationBoxTexts}>
              <Text style={tripDetailStyles.invitedUserName}>
                Giorgi Bitsadze
              </Text>
              <Text style={tripDetailStyles.invitationStatus}>Accepted</Text>
            </View>
          </View>
          <TouchableOpacity
            activeOpacity={0.7}
            style={tripDetailStyles.removeInvitedUser}
          >
            <TrashIcon color="#BBB" />
          </TouchableOpacity>
        </View>
        <View style={[styles.invitedListItem]}>
          <View style={tripDetailStyles.lfSide}>
            <Image
              cachePolicy="memory"
              contentFit="cover"
              transition={0}
              source={{
                uri: invitedUsers?.[0],
              }}
              style={tripDetailStyles.invitedUserImage}
            />
            <View style={tripDetailStyles.invitationBoxTexts}>
              <Text style={tripDetailStyles.invitedUserName}>
                Giorgi Bitsadze
              </Text>
              <Text style={tripDetailStyles.invitationStatus}>Accepted</Text>
            </View>
          </View>
          <TouchableOpacity
            activeOpacity={0.7}
            style={tripDetailStyles.removeInvitedUser}
          >
            <TrashIcon color="#BBB" />
          </TouchableOpacity>
        </View>
        <View style={tripDetailStyles.invitedListItem}>
          <View style={tripDetailStyles.lfSide}>
            <Image
              cachePolicy="memory"
              contentFit="cover"
              transition={0}
              source={{
                uri: invitedUsers?.[0],
              }}
              style={tripDetailStyles.invitedUserImage}
            />
            <View style={tripDetailStyles.invitationBoxTexts}>
              <Text style={tripDetailStyles.invitedUserName}>Beka Arabidze</Text>
              <Text style={tripDetailStyles.invitationStatus}>Pending</Text>
            </View>
          </View>
          <TouchableOpacity
            activeOpacity={0.7}
            style={tripDetailStyles.removeInvitedUser}
          >
            <TrashIcon color="#BBB" />
          </TouchableOpacity>
        </View>
        <View style={tripDetailStyles.invitedListItem}>
          <View style={tripDetailStyles.lfSide}>
            <Image
              cachePolicy="memory"
              contentFit="cover"
              transition={0}
              source={{
                uri: invitedUsers?.[0],
              }}
              style={tripDetailStyles.invitedUserImage}
            />
            <View style={tripDetailStyles.invitationBoxTexts}>
              <Text style={tripDetailStyles.invitedUserName}>
                Giorgi Bitsadze
              </Text>
              <Text style={tripDetailStyles.invitationStatus}>Accepted</Text>
            </View>
          </View>
          <TouchableOpacity
            activeOpacity={0.7}
            style={tripDetailStyles.removeInvitedUser}
          >
            <TrashIcon color="#BBB" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    ) : (
      <View
        style={[
          styles.noResultWrapper,
          {
            marginTop: 0,
          },
        ]}
      >
        <SearchNotFound />
        <Text style={tripDetailStyles.noResultWrapperText}>
          You haven't added trip members yet, enter email and send
          invitation
        </Text>
      </View>
    )}
  </View>
</View>
</Modal> */
}

{
  /* <Portal>
<Modalize
  ref={documentsRefModal}
  modalTopOffset={200}
  HeaderComponent={
    <>
      <View style={tripDetailStyles.rowItemHeader}>
        <Text style={tripDetailStyles.h2}>Documents</Text>

        <TouchableOpacity
          onPress={() => documentsRefModal?.current?.close()}
          activeOpacity={0.5}
          style={tripDetailStyles.closeButton}
        >
          <XIcon width="10" />
        </TouchableOpacity>
      </View>
    </>
  }
  modalStyle={{
    backgroundColor: "#F2F2F7",
  }}
>
  {true ? (
    <>
      <View
        style={{
          paddingBottom: 50,
          paddingHorizontal: 15,
        }}
      >
        {[0, 1].map((item) => (
          <TouchableOpacity
            onPress={() => onEmbedModalOpen()}
            style={tripDetailStyles.documentItem}
          >
            <View style={tripDetailStyles.documentItemLeft}>
              {item == 0 && <PDFIcon />}
              {item == 1 && <FilesIcon />}
              {item == 2 && <DOCIcon />}
              {item == 3 && <ImgIcon />}
              {item == 4 && <DOCIcon />}
              <Text style={tripDetailStyles.documentItemTitle}>
                Flight tickets
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => onFileQuestionsModalOpen()}
              style={tripDetailStyles.documentItemOptions}
            >
              <VertDots color="#000" size="15" />
            </TouchableOpacity>
          </TouchableOpacity>
        ))}

        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <TouchableOpacity
            style={tripDetailStyles.uploadButton}
            onPress={() => onFileUploadsModalOpen()}
          >
            <PlusIcon />
            <Text style={tripDetailStyles.uploadButtonText}>Upload document</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  ) : (
    <View style={tripDetailStyles.noResultWrapper}>
      <DocsIcon />
      <Text style={tripDetailStyles.noResultWrapperText}>
        Start uploading documents to your trip. You can add photos,
        PDFs, text files and etc.
      </Text>

      <TouchableOpacity
        style={tripDetailStyles.uploadButton}
        onPress={() => onFileUploadsModalOpen()}
      >
        <PlusIcon />
        <Text style={tripDetailStyles.uploadButtonText}>Upload document</Text>
      </TouchableOpacity>
    </View>
  )}
</Modalize>
</Portal>
<Portal>
<Modalize
  ref={modalFileQuestionRef}
  modalTopOffset={65}
  disableScrollIfPossible
  adjustToContentHeight
  velocity={100000}
  tapGestureEnabled={false}
  closeSnapPointStraightEnabled={false}
  modalStyle={{
    backgroundColor: "#F2F2F7",
    minHeight: 200,
  }}
  scrollViewProps={{
    showsVerticalScrollIndicator: false,
  }}
>
  <QuestionModal modalQuestionRef={modalFileQuestionRef} title="Action">
    <View style={questionModaStyles.buttonGroup}>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() =>
          Alert.alert("Do you really want to delete document?", "", [
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
</Portal> */
}

// const pickImageCamera = async () => {
//   const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

//   if (permissionResult.granted === false) {
//     alert(
//       "You've refused to allow this app to access your camera! Go to settings, search for Schoolbook and allow access to camera"
//     );
//     return;
//   }

//   const result = await ImagePicker.launchCameraAsync();

//   if (!result.canceled) {
//     const formData = new FormData();

//     formData.append("file", {
//       uri: result?.assets[0]?.uri,
//       type: "image",
//       name: result?.assets[0]?.fileName || "no-name",
//     });

//     // const response = await send(formData);
//     if (response) {
//       // Toast.show(t("carmatebit.ganaxlda"), {
//       //   position: 70,
//       //   backgroundColor: "green",
//       //   textColor: "white",
//       //   hideOnPress: true,
//       //   duration: 3000,
//       //   shadow: true,
//       //   opacity: 1,
//       // });
//     }
//   }
// };

// const pickImage = async () => {
//   // No permissions request is necessary for launching the image library

//   const result = await ImagePicker.launchImageLibraryAsync({
//     mediaTypes: ImagePicker.MediaTypeOptions.All,
//     allowsEditing: true,
//     aspect: [4, 3],
//     quality: 1,
//   });

//   if (!result.canceled) {
//     const formData = new FormData();

//     formData.append("file", {
//       uri: result?.assets[0]?.uri,
//       type: "image/jpeg",
//       name:
//         result?.assets[0]?.fileName ||
//         result?.assets[0]?.uri.split("/").pop(),
//     });

//     // const response = await send(formData);

//     if (response) {
//       // Toast.show(t("carmatebit.ganaxlda"), {
//       //   position: 70,
//       //   backgroundColor: "green",
//       //   textColor: "white",
//       //   hideOnPress: true,
//       //   duration: 3000,
//       //   shadow: true,
//       //   opacity: 1,
//       // });
//     }
//   }
// };

// const pickDocument = async () => {
//   const result = await DocumentPicker.getDocumentAsync({
//     type: "*/*",
//     copyToCacheDirectory: true,
//     multiple: false,
//   });
//   if (result.type === "success") {
//     // setLoadingFile(true);
//     // setDocuments(result);
//     // const formData = new FormData();
//     // formData.append("file", {
//     //   uri: result.uri,
//     //   type: result.mimeType,
//     //   name: result.name,
//     // });
//     // const response = await send(formData);
//     // if (response) {
//     // }
//   }
// };

// <Portal>
// <Modalize
//   ref={modalFileUploadRef}
//   modalTopOffset={65}
//   disableScrollIfPossible
//   adjustToContentHeight
//   velocity={100000}
//   tapGestureEnabled={false}
//   closeSnapPointStraightEnabled={false}
//   modalStyle={{
//     backgroundColor: "#F2F2F7",
//     minHeight: 300,
//   }}
//   scrollViewProps={{
//     showsVerticalScrollIndicator: false,
//   }}
// >
//   <QuestionModal modalQuestionRef={modalQuestionRef2} title="Action">
//     <View style={questionModaStyles.buttonGroup}>
//       <TouchableOpacity
//         activeOpacity={0.7}
//         style={[questionModaStyles.button]}
//         onPress={() => pickImageCamera()}
//       >
//         <Text style={questionModaStyles.buttonText}>Take photo</Text>
//         <CameraIcon size="15" />
//       </TouchableOpacity>
//       <TouchableOpacity
//         activeOpacity={0.7}
//         onPress={() => pickImage()}
//         style={[questionModaStyles.button]}
//       >
//         <Text style={questionModaStyles.buttonText}>
//           Choose from library
//         </Text>
//         <PhotosLibraryIcon size="15" />
//       </TouchableOpacity>
//       <TouchableOpacity
//         activeOpacity={0.7}
//         onPress={() => pickDocument()}
//         style={[questionModaStyles.button, { borderBottomWidth: 0 }]}
//       >
//         <Text style={questionModaStyles.buttonText}>
//           Upload document
//         </Text>
//         <DocumentIcon size="15" />
//       </TouchableOpacity>
//     </View>
//   </QuestionModal>
// </Modalize>
// </Portal>

// <Portal>
// <Modalize
//   ref={feedbackModalRef}
//   modalTopOffset={200}
//   HeaderComponent={
//     <>
//       <View style={tripDetailStyles.rowItemHeader}>
//         <Text style={tripDetailStyles.h2}>Burj Khalifa</Text>

//         <TouchableOpacity
//           onPress={() => feedbackModalRef?.current?.close()}
//           activeOpacity={0.5}
//           style={tripDetailStyles.closeButton}
//         >
//           <XIcon width="10" />
//         </TouchableOpacity>
//       </View>
//     </>
//   }
//   modalStyle={{
//     backgroundColor: "#F2F2F7",
//     flex: 1,
//     position: "relative",
//   }}
//   modalHeight={SIZES.height - 100}
//   scrollViewProps={{
//     showsVerticalScrollIndicator: false,
//   }}
//   FooterComponent={
//     <View
//       style={{
//         paddingHorizontal: 15,
//         marginBottom: Platform?.OS === "android" ? 15 : 25,
//         paddingTop: 15,
//       }}
//     >
//       <TouchableOpacity
//         style={{
//           backgroundColor: COLORS.primaryDark,
//           paddingVertical: Platform.OS === "android" ? 10 : 15,
//           paddingHorizontal: 25,
//           borderRadius: 50,
//           justifyContent: "center",
//           alignItems: "center",
//           marginTop: 0,
//         }}
//       >
//         <Text
//           style={{
//             color: "#fff",
//             fontSize: 16,
//             fontWeight: "500",
//           }}
//         >
//           Post
//         </Text>
//       </TouchableOpacity>
//     </View>
//   }
// >
//   <Feedback />
// </Modalize>
// </Portal>

{
  /* 
      <Portal>
        <Modalize
          ref={activitiesModal}
          modalTopOffset={200}
          modalHeight={SIZES.height - 100}
          HeaderComponent={
            <>
              <View style={tripDetailStyles.rowItemHeader}>
                <Text style={tripDetailStyles.h2}>
                  Activites -{" "}
                  <Text
                    style={{
                      fontWeight: "500",
                      color: COLORS.primaryDark,
                    }}
                  >
                    Nov 18
                  </Text>
                </Text>

                <TouchableOpacity
                  onPress={() => activitiesModal?.current?.close()}
                  activeOpacity={0.5}
                  style={tripDetailStyles.closeButton}
                >
                  <XIcon width="10" />
                </TouchableOpacity>
              </View>
            </>
          }
          modalStyle={{
            backgroundColor: "#F2F2F7",
            flex: 1,
          }}
          scrollViewProps={{
            showsVerticalScrollIndicator: false,
          }}
          velocity={50000}
          tapGestureEnabled={false}
        >
          <TripActivitiesSelect />
        </Modalize>
      </Portal> */
}

{
  /* {false && (
        <SightDetailModal
          data={{
            title: "Dubai Burj Khalifa",
            description: "This is Largest building in Dubai",
            images: [
              {
                id: "0",
                url: "https://cdn.pixabay.com/photo/2019/03/09/21/30/downtown-4045035_1280.jpg",
              },
              {
                id: "1",
                url: "https://cdn.pixabay.com/photo/2021/11/26/17/26/desert-6826299_1280.jpg",
              },
              {
                id: "2",
                url: "https://cdn.pixabay.com/photo/2019/05/09/19/49/landscape-4191991_1280.jpg",
              },
              {
                id: "3",
                url: "https://cdn.pixabay.com/photo/2021/11/04/05/33/abu-dhabi-mosque-6767422_1280.jpg",
              },
              {
                id: "4",
                url: "https://cdn.pixabay.com/photo/2020/09/16/04/02/skyline-5575251_1280.jpg",
              },
            ],
            category: "Landmark",
            rate: 4.5,
            address: "Main street 13a",
          }}
        />
      )} */
}
