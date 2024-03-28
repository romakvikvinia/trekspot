import { Image } from "expo-image";
import React, { useRef, useState } from "react";
import {
  Animated,
  KeyboardAvoidingView,
  Linking,
  Modal,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { COLORS, SIZES } from "../../styles/theme";
import { enGB, registerTranslation } from "react-native-paper-dates";
registerTranslation("en", enGB);

import {
  AddUser,
  BackIcon,
  CheckLiteIcon,
  DotsIcon,
  EditIcon,
  FileLiteIcon,
  GlobeIcon,
  MapIcon,
  NotesIcon,
  NotesIcon2,
  PinIcon,
  PlusIcon,
  SearchNotFound,
  StarIcon,
  StarsIcon,
  ToursIcon,
  TrashIcon,
  USDIcon,
  XIcon,
} from "../../utilities/SvgIcons.utility";

import { Portal } from "react-native-portalize";
import { Modalize } from "react-native-modalize";
import { TextInput } from "react-native-gesture-handler";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { customMapStyle } from "../../styles/mapView.style";
import {
  MaterialTabBar,
  Tabs,
  useCurrentTabScrollY,
  useHeaderMeasurements,
} from "react-native-collapsible-tab-view";
import Swiper from "react-native-swiper";
import { QuestionModal } from "../../common/components/QuestionModal";
import { questionModaStyles } from "../../styles/questionModaStyles";
import { TripActivitiesSelect } from "./TripActivitiesSelect";
import { Feedback } from "./Feedback";
import { SightDetail } from "../../components/explore/sights/SightDetail";
import { LinearGradient } from "expo-linear-gradient";
import {
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
} from "react-native-reanimated";

interface TripProps {}

export const TripDetailScreen: React.FC<TripProps> = ({}) => {
  const [invitedUsers, setInvitedUsers] = useState([
    // "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=20&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    // "https://images.unsplash.com/photo-1704642408219-977150048504?q20&w=3325&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1704642408219-977150048504?q20&w=3325&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  ]);

  const [topSightVisible, setTopSightVisible] = useState(false);

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

  const invitedUsersModal = useRef<Modalize>(null);
  const activitiesModal = useRef<Modalize>(null);
  const modalQuestionRef = useRef<Modalize>(null);
  const feedbackModalRef = useRef<Modalize>(null);

  const pageRef = useRef();

  const onInvitedUsersModalOpen = () => {
    invitedUsersModal.current?.open();
  };
  const onActivitiesModalOpen = () => {
    activitiesModal.current?.open();
  };

  const onQuestionModalOpen = () => {
    modalQuestionRef.current?.open();
  };

  const onFeedbackModalOpen = () => {
    feedbackModalRef.current?.open();
  };

  const Header = () => {
    const scrollY = useCurrentTabScrollY();

    console.log("scrollYText", scrollY.value.toFixed(2));

    // const stylez = useAnimatedStyle(() => {
    //   return {
    //     opacity: interpolate(top.value, [0, 1], [1, 0]), // Adjust the input and output ranges as needed
    //   };
    // });

    return (
      <Animated.View style={[styles.mapHeaderContainer]}>
        <MapView
          // ref={mapRef}
          provider={Platform.OS === "android" ? PROVIDER_GOOGLE : undefined}
          style={styles.map}
          // onPress={handleMapPress}
          zoomEnabled
          zoomControlEnabled
          pitchEnabled
          followsUserLocation={true}
          // showsUserLocation={true}
          customMapStyle={customMapStyle}
          mapType="standard"
          // onSnapToItem={() => alert("ss")}
        ></MapView>
        <TouchableOpacity activeOpacity={0.7} style={styles.backButton}>
          <BackIcon />
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.7} style={styles.mapButton}>
          <MapIcon width={15} color />
        </TouchableOpacity>

        <View style={styles.tripDetailsHeader}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <View style={styles.leftSide}>
              <Text style={styles.tripName}>Trip name</Text>
              <Text style={styles.tripDestination}>Berlin, Germany</Text>
            </View>
            <View style={styles.rightSide}>
              <TouchableOpacity style={styles.editButton} activeOpacity={0.7}>
                <DotsIcon />
              </TouchableOpacity>
              <View style={styles.bottomActions}>
                <Text style={styles.tripDestination}>
                  14 Nov - 28 Nov | Solo
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.bottomRow}>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => onInvitedUsersModalOpen()}
              style={styles.invitationBox}
            >
              {invitedUsers?.length > 0 && (
                <Image
                  cachePolicy="memory"
                  contentFit="cover"
                  transition={0}
                  source={{
                    uri: invitedUsers?.[0],
                  }}
                  style={styles.inviteOne}
                />
              )}
              {invitedUsers?.length >= 2 && (
                <Image
                  cachePolicy="memory"
                  contentFit="cover"
                  transition={0}
                  source={{
                    uri: invitedUsers?.[1],
                  }}
                  style={styles.inviteTwo}
                />
              )}
              <View
                style={[
                  styles.addUserButton,
                  {
                    left:
                      invitedUsers?.length === 2
                        ? -20
                        : invitedUsers?.length > 2
                        ? -28
                        : -10,
                  },
                ]}
              >
                <AddUser />
              </View>
            </TouchableOpacity>

            <View style={styles.bottomRight}>
              <TouchableOpacity
                style={styles.bottomActionsButton}
                activeOpacity={0.7}
              >
                <StarsIcon width={12} color={COLORS.primaryDark} />
                <Text style={styles.bottomActionsButtonlabel}>Insights</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.bottomActionsButton}
                activeOpacity={0.7}
              >
                <FileLiteIcon width={12} color={COLORS.primaryDark} />
                <Text style={styles.bottomActionsButtonlabel}>Files</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Animated.View>
    );
  };

  return (
    <>
      <Tabs.Container
        minHeaderHeight={50}
        renderHeader={() => <Header />}
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
      >
        {["Nov 18", "Nov 19", "Nov 20", "Nov 21", "Nov 22", "Nov 23"].map(
          (item, ind) => (
            <Tabs.Tab
              name={item}
              label={(props) => (
                <View style={styles.customTab} key={ind}>
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
                      styles.customTabLabel,
                      {
                        color: COLORS.black,
                        marginBottom: 5,
                      },
                    ]}
                  >
                    {item}
                  </Text>
                </View>
              )}
            >
              <Tabs.ScrollView
                alwaysBounceVertical={false}
                bounces={false}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                  paddingHorizontal: 20,
                  position: "relative",
                  paddingTop: 25,
                }}
              >
                {Platform.OS === "ios" ? (
                  <View
                    style={{
                      position: "absolute",
                      borderWidth: 1.5,
                      borderStyle: "dashed",
                      height: "96%",
                      top: 25,
                      left: 15,
                      borderColor: "#ddd",
                      borderRadius: 1,
                      opacity: 0.7,
                    }}
                  ></View>
                ) : null}

                <View style={styles.sightItemList}>
                  {[0, 1, 2, 3, 4, 5, 6].map((item, ind) => (
                    <>
                      <TouchableOpacity
                        activeOpacity={0.7}
                        style={styles.sightItem}
                        onPress={() => setTopSightVisible(true)}
                      >
                        {Platform.OS === "ios" ? (
                          <View style={styles.pinIcon}>
                            <PinIcon size="20" color={COLORS.darkgray} />
                            <Text
                              style={{
                                color: "#fff",
                                position: "absolute",
                                fontSize: 10,
                                top: 3,
                                left: 7,
                              }}
                            >
                              {ind + 1}
                            </Text>
                          </View>
                        ) : (
                          <View
                            style={[
                              styles.pinIcon,
                              {
                                backgroundColor: COLORS.gray,
                                width: 20,
                                height: 20,
                                borderRadius: 50,
                                position: "absolute",
                                justifyContent: "center",
                                alignItems: "center",
                              },
                            ]}
                          >
                            <Text
                              style={{
                                color: "#fff",
                                fontSize: 10,
                              }}
                            >
                              {ind}
                            </Text>
                          </View>
                        )}

                        <ScrollView
                          horizontal
                          showsHorizontalScrollIndicator={false}
                        >
                          {[
                            "https://cdn.pixabay.com/photo/2019/03/09/21/30/downtown-4045035_1280.jpg",
                            "https://cdn.pixabay.com/photo/2016/11/23/15/32/pedestrians-1853552_1280.jpg",
                            "https://cdn.pixabay.com/photo/2019/03/09/21/30/downtown-4045037_1280.jpg",
                            "https://cdn.pixabay.com/photo/2017/04/08/10/42/burj-khalifa-2212978_1280.jpg",
                            "https://cdn.pixabay.com/photo/2020/01/25/10/36/ferris-wheel-4792152_1280.jpg",
                          ].map((item) => (
                            <Image
                              style={{
                                width: 80,
                                height: 80,
                                borderRadius: 10,
                                marginRight: 10,
                              }}
                              resizeMode="cover"
                              source={{
                                uri: item,
                              }}
                              // key={`slide-${item.id}`}
                            ></Image>
                          ))}
                        </ScrollView>

                        <View style={styles.sightDetails}>
                          <Text style={styles.sightTitle}>Burj khalifa</Text>
                          <View style={styles.ratingLabel}>
                            <Text style={styles.sightType}>Landmark</Text>
                            <Text style={[styles.ratingText]}>4.5</Text>
                            <View
                              style={{
                                position: "relative",
                                top: -1,
                                opacity: 0.8,
                              }}
                            >
                              <StarIcon color="#FFBC3E" />
                            </View>
                          </View>

                          <Text
                            style={{
                              fontSize: 14,
                              fontWeight: "400",
                              color: COLORS.darkgray,
                              marginTop: 5,
                            }}
                          >
                            The Burj Khalifa is a skyscraper in Dubai. It is the
                            world's tallest structure. With a total height of
                            829.8 m and a roof height...
                          </Text>
                        </View>
                      </TouchableOpacity>
                      <View style={styles.sightBottomActions}>
                        <TouchableOpacity
                          activeOpacity={0.7}
                          style={styles.checkinButton}
                          onPress={() => {
                            onFeedbackModalOpen();
                          }}
                        >
                          <CheckLiteIcon color={COLORS.gray} width="15" />
                          <Text
                            style={[
                              styles.checkinButtonText,
                              { color: COLORS.gray },
                            ]}
                          >
                            Check in
                          </Text>
                        </TouchableOpacity>

                        <View style={styles.sightRightActions}>
                          {/* <TouchableOpacity
                            style={[
                              styles.sightRightActionsButton,
                              { width: "auto", paddingHorizontal: 25 },
                            ]}
                            activeOpacity={0.7}
                          >
                            <Text style={styles.sightRightActionsButtonText}>
                              Review
                            </Text>
                          </TouchableOpacity> */}
                          <TouchableOpacity
                            style={styles.sightRightActionsButton}
                            activeOpacity={0.7}
                            onPress={() => openMap("Burj khalifa")}
                          >
                            <MapIcon width="15" color={COLORS.gray} />
                          </TouchableOpacity>
                          <TouchableOpacity
                            onPress={() => onQuestionModalOpen()}
                            style={styles.sightRightActionsButton}
                            activeOpacity={0.7}
                          >
                            <DotsIcon color={COLORS.gray} />
                          </TouchableOpacity>
                        </View>
                      </View>
                    </>
                  ))}
                </View>
              </Tabs.ScrollView>
            </Tabs.Tab>
          )
        )}
      </Tabs.Container>

      <Portal>
        <Modalize
          ref={invitedUsersModal}
          modalTopOffset={200}
          HeaderComponent={
            <>
              <View style={styles.rowItemHeader}>
                <Text style={styles.h2}>Trip members</Text>

                <TouchableOpacity
                  onPress={() => invitedUsersModal?.current?.close()}
                  activeOpacity={0.5}
                  style={styles.closeButton}
                >
                  <XIcon width="10" />
                </TouchableOpacity>
              </View>
              <View style={styles.inviteBox}>
                <TextInput
                  placeholder="Enter email"
                  style={styles.inviteBoxInput}
                  placeholderTextColor="#85858B"
                  inputMode="email"
                />
                <TouchableOpacity
                  style={styles.inviteButton}
                  activeOpacity={0.7}
                >
                  <Text style={styles.inviteButtonText}>Invite</Text>
                </TouchableOpacity>
              </View>
            </>
          }
          modalStyle={{
            backgroundColor: "#F2F2F7",
            minHeight: "80%",
          }}
        >
          {false ? (
            <View style={styles.invitedList}>
              <View style={styles.invitedListItem}>
                <View style={styles.lfSide}>
                  <Image
                    cachePolicy="memory"
                    contentFit="cover"
                    transition={0}
                    source={{
                      uri: invitedUsers?.[0],
                    }}
                    style={styles.invitedUserImage}
                  />
                  <View style={styles.invitationBoxTexts}>
                    <Text style={styles.invitedUserName}>Giorgi Bitsadze</Text>
                    <Text style={styles.invitationStatus}>Accepted</Text>
                  </View>
                </View>
                <TouchableOpacity
                  activeOpacity={0.7}
                  style={styles.removeInvitedUser}
                >
                  <TrashIcon color="#BBB" />
                </TouchableOpacity>
              </View>
              <View style={styles.invitedListItem}>
                <View style={styles.lfSide}>
                  <Image
                    cachePolicy="memory"
                    contentFit="cover"
                    transition={0}
                    source={{
                      uri: invitedUsers?.[0],
                    }}
                    style={styles.invitedUserImage}
                  />
                  <View style={styles.invitationBoxTexts}>
                    <Text style={styles.invitedUserName}>Beka Arabidze</Text>
                    <Text style={styles.invitationStatus}>Pending</Text>
                  </View>
                </View>
                <TouchableOpacity
                  activeOpacity={0.7}
                  style={styles.removeInvitedUser}
                >
                  <TrashIcon color="#BBB" />
                </TouchableOpacity>
              </View>
              <View style={styles.invitedListItem}>
                <View style={styles.lfSide}>
                  <Image
                    cachePolicy="memory"
                    contentFit="cover"
                    transition={0}
                    source={{
                      uri: invitedUsers?.[0],
                    }}
                    style={styles.invitedUserImage}
                  />
                  <View style={styles.invitationBoxTexts}>
                    <Text style={styles.invitedUserName}>Giorgi Bitsadze</Text>
                    <Text style={styles.invitationStatus}>Accepted</Text>
                  </View>
                </View>
                <TouchableOpacity
                  activeOpacity={0.7}
                  style={styles.removeInvitedUser}
                >
                  <TrashIcon color="#BBB" />
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <View style={styles.noResultWrapper}>
              <SearchNotFound />
              <Text style={styles.noResultWrapperText}>
                You haven't added trip members yet, enter email and send
                invitation
              </Text>
            </View>
          )}
        </Modalize>
      </Portal>

      <Portal>
        <Modalize
          ref={activitiesModal}
          modalTopOffset={200}
          adjustToContentHeight
          HeaderComponent={
            <>
              <View style={styles.rowItemHeader}>
                <Text style={styles.h2}>
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
                  style={styles.closeButton}
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
          <TripActivitiesSelect />
        </Modalize>
      </Portal>

      <Portal>
        <Modalize
          ref={feedbackModalRef}
          modalTopOffset={200}
          HeaderComponent={
            <>
              <View style={styles.rowItemHeader}>
                <Text style={styles.h2}>Burj Khalifa</Text>

                <TouchableOpacity
                  onPress={() => feedbackModalRef?.current?.close()}
                  activeOpacity={0.5}
                  style={styles.closeButton}
                >
                  <XIcon width="10" />
                </TouchableOpacity>
              </View>
            </>
          }
          modalStyle={{
            backgroundColor: "#F2F2F7",
            flex: 1,
            position: "relative",
          }}
          modalHeight={SIZES.height - 100}
          scrollViewProps={{
            showsVerticalScrollIndicator: false,
          }}
          FooterComponent={
            <View
              style={{
                paddingHorizontal: 15,
                marginBottom: Platform?.OS === "android" ? 15 : 25,
                paddingTop: 15,
              }}
            >
              <TouchableOpacity
                style={{
                  backgroundColor: COLORS.primaryDark,
                  paddingVertical: Platform.OS === "android" ? 10 : 15,
                  paddingHorizontal: 25,
                  borderRadius: 50,
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: 0,
                }}
              >
                <Text
                  style={{
                    color: "#fff",
                    fontSize: 16,
                    fontWeight: "500",
                  }}
                >
                  Post
                </Text>
              </TouchableOpacity>
            </View>
          }
        >
          <Feedback />
        </Modalize>
      </Portal>

      <Portal>
        <Modalize
          ref={activitiesModal}
          modalTopOffset={200}
          modalHeight={SIZES.height - 100}
          HeaderComponent={
            <>
              <View style={styles.rowItemHeader}>
                <Text style={styles.h2}>
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
                  style={styles.closeButton}
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

      {true && (
        <SightDetail
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
      )}
      <TouchableOpacity
        onPress={() => onActivitiesModalOpen()}
        activeOpacity={0.7}
        style={styles.addActivityButton}
      >
        <PlusIcon />
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  rowItemHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    paddingVertical: 15,
  },
  sightRightActionsButtonText: {
    fontSize: 12,
    marginLeft: 5,
    fontWeight: "500",
    color: COLORS.gray,
  },
  invitationStatus: {
    fontSize: 12,
    color: COLORS.gray,
    marginTop: 3,
  },
  invitationBoxTexts: {
    flexDirection: "column",
    marginLeft: 10,
  },
  noResultWrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: 250,
    textAlign: "center",
    paddingHorizontal: 25,
    marginTop: 25,
  },
  noResultWrapperText: {
    fontSize: 14,
    color: COLORS.darkgray,
    marginTop: 25,
    textAlign: "center",
    lineHeight: 20,
    maxWidth: "80%",
  },
  invitedList: {
    marginTop: 15,
    flex: 1,
    paddingHorizontal: 15,
  },
  invitedListItem: {
    width: "100%",
    marginBottom: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: COLORS.lightGray,
    padding: 15,
    borderRadius: 10,
  },
  lfSide: {
    flexDirection: "row",
    alignItems: "center",
  },
  invitedUserImage: {
    minWidth: 25,
    minHeight: 25,
    width: 25,
    borderRadius: 50,
  },
  closeButton: {
    backgroundColor: "#DBDBDB",
    width: 30,
    height: 30,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  invitedUserName: {
    fontSize: 14,
    color: COLORS.black,
    fontWeight: "600",
  },
  inviteBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    overflow: "hidden",
    paddingHorizontal: 15,
    paddingTop: 15,
  },
  inviteBoxInput: {
    height: 50,
    backgroundColor: "#fafafa",
    flex: 1,
    paddingLeft: 15,
    color: COLORS.black,
    borderTopLeftRadius: 10,
    borderBottomStartRadius: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 0,
    backgroundColor: "rgba(0, 0, 0, 0.2)",
  },
  inviteButton: {
    paddingHorizontal: 25,
    backgroundColor: COLORS.primaryDark,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderTopRightRadius: 10,
    borderBottomEndRadius: 10,
  },
  inviteButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
  h2: {
    fontSize: 22,
    color: COLORS.black,
    fontWeight: "bold",
  },
  addActivityButton: {
    width: 50,
    height: 50,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: 25,
    right: 15,
    backgroundColor: COLORS.primary,
    zIndex: 2,
    borderRadius: 50,
    ...COLORS.shadow,
  },
  mapHeaderContainer: {
    position: "relative",
  },
  sightDetails: {
    width: "100%",
    marginTop: 15,
  },
  sightRightActionsButton: {
    width: 35,
    height: 35,
    backgroundColor: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
    marginLeft: 8,
  },
  sightRightActions: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkinButtonText: {
    fontSize: 12,
    marginLeft: 5,
    fontWeight: "500",
  },
  checkinButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 50,
    paddingHorizontal: 15,
    paddingVertical: 8,
  },
  sightTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: COLORS.black,
  },
  ratingLabel: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
  },
  ratingText: {
    fontWeight: "400",
    color: COLORS.darkgray,
    fontSize: 12,
    marginRight: 2,
  },
  sightType: {
    fontWeight: "400",
    color: COLORS.darkgray,
    fontSize: 12,
    marginRight: 5,
  },
  sightRight: {
    marginLeft: 15,
  },
  sightItem: {
    backgroundColor: "#fff",
    minHeight: 100,
    flex: 1,
    borderRadius: 10,
    marginLeft: 18,
    padding: 15,
    flexDirection: "column",
    position: "relative",
  },
  pinIcon: {
    position: "absolute",
    left: -31,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  sightBottomActions: {
    marginTop: 5,
    marginBottom: 45,
    width: "95%",
    marginLeft: "5%",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  addUserButton: {
    position: "relative",
    left: -10,
    zIndex: 2,
    top: 0,
    width: 25,
    height: 25,
    borderRadius: 50,
    backgroundColor: "#8e8e8e",
    alignItems: "center",
    justifyContent: "center",
  },
  invitationBox: {
    position: "relative",
    flexDirection: "row",
    maxWidth: 120,
  },
  bottomRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  otherUsersText: {
    fontWeight: "600",
    color: "#fff",
    fontSize: 10,
  },
  otherUsers: {
    position: "relative",
    left: -20,
    zIndex: 2,
    top: 0,
    width: 25,
    height: 25,
    borderRadius: 50,
    backgroundColor: "#8e8e8e",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#fff",
  },
  bottomRow: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderTopColor: "#f2f2f2",
    borderTopWidth: 1,
    marginTop: 15,
    paddingTop: 8,
  },
  invitedUserImage: {
    minWidth: 25,
    minHeight: 25,
    width: 25,
    borderRadius: 50,
  },
  inviteTwo: {
    position: "relative",
    left: -10,
    zIndex: 2,
    top: 0,
    width: 25,
    height: 25,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "#fff",
  },
  tripName: {
    fontSize: 22,
    fontWeight: "bold",
    color: COLORS.black,
  },
  bottomActions: {
    flexDirection: "row",
    alignItems: "flex-end",
  },
  rightSide: {
    flexDirection: "column",
    alignItems: "flex-end",
    justifyContent: "space-between",
  },
  tripType: {
    fontSize: 14,
    fontWeight: "500",
    color: COLORS.black,
  },
  leftSide: {},
  tripDestination: {
    fontSize: 14,
    fontWeight: "500",
    color: COLORS.darkgray,
    marginTop: 10,
  },
  inviteOne: {
    width: 25,
    height: 25,
    borderRadius: 50,
  },
  editButton: {
    borderRadius: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    paddingVertical: 8,
    paddingHorizontal: 10,
    marginTop: -8,
  },
  editButtonText: {
    fontSize: 12,
    color: COLORS.black,
    marginLeft: 5,
  },
  bottomActionsButton: {
    borderRadius: 50,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fef0ff",
    marginLeft: 8,
    paddingVertical: 10,
    paddingHorizontal: 15,
    flexDirection: "row",
  },
  bottomActionsButtonText: {
    alignItems: "center",
    flexDirection: "row",
  },
  bottomActionsButtonlabel: {
    fontSize: 12,
    color: COLORS.primaryDark,
    marginLeft: 3,
    fontWeight: "500",
  },
  customTab: {
    flex: 1,
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 0,
  },
  tripDetailsHeader: {
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingTop: 20,
    marginTop: -25,
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  customTabLabel: {
    fontWeight: "600",
    marginTop: 0,
    fontSize: 14,
  },
  backButton: {
    position: "absolute",
    top: 55,
    left: 20,
    width: 35,
    height: 35,
    backgroundColor: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
  },
  mapButton: {
    position: "absolute",
    top: 55,
    right: 20,
    width: 35,
    height: 35,
    backgroundColor: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
  },
  map: {
    height: 130,
  },
});
