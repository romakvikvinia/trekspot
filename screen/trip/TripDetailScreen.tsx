import { Image } from "expo-image";
import React, { Fragment, useEffect, useRef, useState } from "react";
import * as ImagePicker from "expo-image-picker";

import {
  Alert,
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
import * as DocumentPicker from "expo-document-picker";

import {
  AddUser,
  BackIcon,
  CameraIcon,
  CheckLiteIcon,
  DOCIcon,
  DocsIcon,
  DocumentIcon,
  DotsIcon,
  EditIcon,
  FileLiteIcon,
  FilesIcon,
  GlobeIcon,
  ImgIcon,
  InsightIcon,
  MapIcon,
  NotesIcon,
  NotesIcon2,
  PDFIcon,
  PhotosLibraryIcon,
  PinIcon,
  PlusIcon,
  SearchNotFound,
  StarIcon,
  StarsIcon,
  ToursIcon,
  TrashIcon,
  USDIcon,
  VertDots,
  XIcon,
} from "../../utilities/SvgIcons.utility";

import { Portal } from "react-native-portalize";
import { Modalize } from "react-native-modalize";
import { TapGestureHandler, TextInput } from "react-native-gesture-handler";
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

import { MapEmbedView } from "../../common/components/MapEmbedView";
import { useNavigation } from "@react-navigation/native";
import { SightDetailModal } from "../../components/explore/sights/SightDetailModal";

const DATA = [
  {
    id: 0,
    date: "May 8",
    activities: [
      {
        id: 0,
        name: "Burjh-Khalifa",
        images: [
          "https://cdn.pixabay.com/photo/2019/03/09/13/35/dubai-4044174_1280.jpg",
          "https://cdn.pixabay.com/photo/2022/01/15/23/03/burj-khalifa-6940925_1280.jpg",
          "https://cdn.pixabay.com/photo/2022/01/20/21/34/dubai-6953421_1280.jpg",
          "https://cdn.pixabay.com/photo/2022/02/16/22/31/skyscraper-7017634_1280.jpg",
        ],
        coordinates: {
          lat: 25.1972,
          long: 55.2744,
        },
        rating: "4.9",
        description:
          "The Burj Khalifa, located in Dubai, United Arab Emirates, is the tallest building in the world, standing at a staggering height of 828 meters (2,717 feet). Renowned for its futuristic design and breathtaking views, the Burj Khalifa is an iconic symbol of Dubai's ambition and innovation.",
      },
      {
        id: 1,
        name: "Burjh Al Arabi",
        coordinates: {
          lat: 25.1413,
          long: 55.1855,
        },
        images: [
          "https://cdn.pixabay.com/photo/2015/09/14/17/31/dubai-939844_1280.jpg",
          "https://cdn.pixabay.com/photo/2017/08/10/16/11/burj-al-arab-2624317_1280.jpg",
          "https://cdn.pixabay.com/photo/2021/08/22/18/53/hotel-6565940_1280.jpg",
          "https://cdn.pixabay.com/photo/2020/07/31/17/47/u-a-e-5453672_1280.jpg",
        ],
        rating: "4.8",
        description:
          "The Burj Al Arab, situated in Dubai, United Arab Emirates, is a luxury hotel known for its distinctive sail-shaped silhouette and opulent amenities. Standing on its own artificial island, it is often hailed as one of the most luxurious and iconic hotels in the world.",
      },
      {
        id: 2,
        name: "Dubai miracle garden",
        coordinates: {
          lat: 25.0675,
          long: 55.235,
        },
        images: [
          "https://cdn.pixabay.com/photo/2020/03/01/02/13/dubai-4891560_1280.jpg",
          "https://cdn.pixabay.com/photo/2016/03/04/12/21/dubai-miracle-garden-1235962_1280.jpg",
          "https://cdn.pixabay.com/photo/2020/01/15/18/22/miracle-garden-4768619_1280.jpg",
          "https://cdn.pixabay.com/photo/2018/09/18/13/29/miracle-garden-dubai-3686191_1280.jpg",
        ],
        rating: "4.8",
        description:
          "The Dubai Miracle Garden is a botanical paradise located in Dubai, United Arab Emirates, featuring an impressive array of colorful floral displays, intricate designs, and themed gardens spread across 72,000 square meters. As one of the world's largest natural flower gardens, it captivates visitors with its stunning beauty and imaginative landscapes, making it a must-visit attraction in Dubai.",
      },
    ],
  },
  {
    id: 0,
    date: "May 9",
    activities: [
      {
        id: 0,
        name: "Burjh-Khalifa",
        images: [
          "https://cdn.pixabay.com/photo/2019/03/09/13/35/dubai-4044174_1280.jpg",
          "https://cdn.pixabay.com/photo/2022/01/15/23/03/burj-khalifa-6940925_1280.jpg",
          "https://cdn.pixabay.com/photo/2022/01/20/21/34/dubai-6953421_1280.jpg",
          "https://cdn.pixabay.com/photo/2022/02/16/22/31/skyscraper-7017634_1280.jpg",
        ],
        coordinates: {
          lat: 25.1972,
          long: 55.2744,
        },
        rating: "4.9",
        description:
          "The Burj Khalifa, located in Dubai, United Arab Emirates, is the tallest building in the world, standing at a staggering height of 828 meters (2,717 feet). Renowned for its futuristic design and breathtaking views, the Burj Khalifa is an iconic symbol of Dubai's ambition and innovation.",
      },
      {
        id: 1,
        name: "Burjh Al Arabi",
        coordinates: {
          lat: 25.1413,
          long: 55.1855,
        },
        images: [
          "https://cdn.pixabay.com/photo/2015/09/14/17/31/dubai-939844_1280.jpg",
          "https://cdn.pixabay.com/photo/2017/08/10/16/11/burj-al-arab-2624317_1280.jpg",
          "https://cdn.pixabay.com/photo/2021/08/22/18/53/hotel-6565940_1280.jpg",
          "https://cdn.pixabay.com/photo/2020/07/31/17/47/u-a-e-5453672_1280.jpg",
        ],
        rating: "4.8",
        description:
          "The Burj Al Arab, situated in Dubai, United Arab Emirates, is a luxury hotel known for its distinctive sail-shaped silhouette and opulent amenities. Standing on its own artificial island, it is often hailed as one of the most luxurious and iconic hotels in the world.",
      },
      {
        id: 2,
        name: "Dubai miracle garden",
        coordinates: {
          lat: 25.0675,
          long: 55.235,
        },
        images: [
          "https://cdn.pixabay.com/photo/2020/03/01/02/13/dubai-4891560_1280.jpg",
          "https://cdn.pixabay.com/photo/2016/03/04/12/21/dubai-miracle-garden-1235962_1280.jpg",
          "https://cdn.pixabay.com/photo/2020/01/15/18/22/miracle-garden-4768619_1280.jpg",
          "https://cdn.pixabay.com/photo/2018/09/18/13/29/miracle-garden-dubai-3686191_1280.jpg",
        ],
        rating: "4.8",
        description:
          "The Dubai Miracle Garden is a botanical paradise located in Dubai, United Arab Emirates, featuring an impressive array of colorful floral displays, intricate designs, and themed gardens spread across 72,000 square meters. As one of the world's largest natural flower gardens, it captivates visitors with its stunning beauty and imaginative landscapes, making it a must-visit attraction in Dubai.",
      },
    ],
  },
  {
    id: 0,
    date: "May 10",
    activities: [
      {
        id: 0,
        name: "Burjh-Khalifa",
        images: [
          "https://cdn.pixabay.com/photo/2019/03/09/13/35/dubai-4044174_1280.jpg",
          "https://cdn.pixabay.com/photo/2022/01/15/23/03/burj-khalifa-6940925_1280.jpg",
          "https://cdn.pixabay.com/photo/2022/01/20/21/34/dubai-6953421_1280.jpg",
          "https://cdn.pixabay.com/photo/2022/02/16/22/31/skyscraper-7017634_1280.jpg",
        ],
        coordinates: {
          lat: 25.1972,
          long: 55.2744,
        },
        rating: "4.9",
        description:
          "The Burj Khalifa, located in Dubai, United Arab Emirates, is the tallest building in the world, standing at a staggering height of 828 meters (2,717 feet). Renowned for its futuristic design and breathtaking views, the Burj Khalifa is an iconic symbol of Dubai's ambition and innovation.",
      },
      {
        id: 1,
        name: "Burjh Al Arabi",
        coordinates: {
          lat: 25.1413,
          long: 55.1855,
        },
        images: [
          "https://cdn.pixabay.com/photo/2015/09/14/17/31/dubai-939844_1280.jpg",
          "https://cdn.pixabay.com/photo/2017/08/10/16/11/burj-al-arab-2624317_1280.jpg",
          "https://cdn.pixabay.com/photo/2021/08/22/18/53/hotel-6565940_1280.jpg",
          "https://cdn.pixabay.com/photo/2020/07/31/17/47/u-a-e-5453672_1280.jpg",
        ],
        rating: "4.8",
        description:
          "The Burj Al Arab, situated in Dubai, United Arab Emirates, is a luxury hotel known for its distinctive sail-shaped silhouette and opulent amenities. Standing on its own artificial island, it is often hailed as one of the most luxurious and iconic hotels in the world.",
      },
      {
        id: 2,
        name: "Dubai miracle garden",
        coordinates: {
          lat: 25.0675,
          long: 55.235,
        },
        images: [
          "https://cdn.pixabay.com/photo/2020/03/01/02/13/dubai-4891560_1280.jpg",
          "https://cdn.pixabay.com/photo/2016/03/04/12/21/dubai-miracle-garden-1235962_1280.jpg",
          "https://cdn.pixabay.com/photo/2020/01/15/18/22/miracle-garden-4768619_1280.jpg",
          "https://cdn.pixabay.com/photo/2018/09/18/13/29/miracle-garden-dubai-3686191_1280.jpg",
        ],
        rating: "4.8",
        description:
          "The Dubai Miracle Garden is a botanical paradise located in Dubai, United Arab Emirates, featuring an impressive array of colorful floral displays, intricate designs, and themed gardens spread across 72,000 square meters. As one of the world's largest natural flower gardens, it captivates visitors with its stunning beauty and imaginative landscapes, making it a must-visit attraction in Dubai.",
      },
    ],
  },
  {
    id: 0,
    date: "May 11",
    activities: [
      {
        id: 0,
        name: "Burjh-Khalifa",
        images: [
          "https://cdn.pixabay.com/photo/2019/03/09/13/35/dubai-4044174_1280.jpg",
          "https://cdn.pixabay.com/photo/2022/01/15/23/03/burj-khalifa-6940925_1280.jpg",
          "https://cdn.pixabay.com/photo/2022/01/20/21/34/dubai-6953421_1280.jpg",
          "https://cdn.pixabay.com/photo/2022/02/16/22/31/skyscraper-7017634_1280.jpg",
        ],
        coordinates: {
          lat: 25.1972,
          long: 55.2744,
        },
        rating: "4.9",
        description:
          "The Burj Khalifa, located in Dubai, United Arab Emirates, is the tallest building in the world, standing at a staggering height of 828 meters (2,717 feet). Renowned for its futuristic design and breathtaking views, the Burj Khalifa is an iconic symbol of Dubai's ambition and innovation.",
      },
      {
        id: 1,
        name: "Burjh Al Arabi",
        coordinates: {
          lat: 25.1413,
          long: 55.1855,
        },
        images: [
          "https://cdn.pixabay.com/photo/2015/09/14/17/31/dubai-939844_1280.jpg",
          "https://cdn.pixabay.com/photo/2017/08/10/16/11/burj-al-arab-2624317_1280.jpg",
          "https://cdn.pixabay.com/photo/2021/08/22/18/53/hotel-6565940_1280.jpg",
          "https://cdn.pixabay.com/photo/2020/07/31/17/47/u-a-e-5453672_1280.jpg",
        ],
        rating: "4.8",
        description:
          "The Burj Al Arab, situated in Dubai, United Arab Emirates, is a luxury hotel known for its distinctive sail-shaped silhouette and opulent amenities. Standing on its own artificial island, it is often hailed as one of the most luxurious and iconic hotels in the world.",
      },
      {
        id: 2,
        name: "Dubai miracle garden",
        coordinates: {
          lat: 25.0675,
          long: 55.235,
        },
        images: [
          "https://cdn.pixabay.com/photo/2020/03/01/02/13/dubai-4891560_1280.jpg",
          "https://cdn.pixabay.com/photo/2016/03/04/12/21/dubai-miracle-garden-1235962_1280.jpg",
          "https://cdn.pixabay.com/photo/2020/01/15/18/22/miracle-garden-4768619_1280.jpg",
          "https://cdn.pixabay.com/photo/2018/09/18/13/29/miracle-garden-dubai-3686191_1280.jpg",
        ],
        rating: "4.8",
        description:
          "The Dubai Miracle Garden is a botanical paradise located in Dubai, United Arab Emirates, featuring an impressive array of colorful floral displays, intricate designs, and themed gardens spread across 72,000 square meters. As one of the world's largest natural flower gardens, it captivates visitors with its stunning beauty and imaginative landscapes, making it a must-visit attraction in Dubai.",
      },
    ],
  },
  {
    id: 0,
    date: "May 12",
    activities: [
      {
        id: 0,
        name: "Burjh-Khalifa",
        images: [
          "https://cdn.pixabay.com/photo/2019/03/09/13/35/dubai-4044174_1280.jpg",
          "https://cdn.pixabay.com/photo/2022/01/15/23/03/burj-khalifa-6940925_1280.jpg",
          "https://cdn.pixabay.com/photo/2022/01/20/21/34/dubai-6953421_1280.jpg",
          "https://cdn.pixabay.com/photo/2022/02/16/22/31/skyscraper-7017634_1280.jpg",
        ],
        coordinates: {
          lat: 25.1972,
          long: 55.2744,
        },
        rating: "4.9",
        description:
          "The Burj Khalifa, located in Dubai, United Arab Emirates, is the tallest building in the world, standing at a staggering height of 828 meters (2,717 feet). Renowned for its futuristic design and breathtaking views, the Burj Khalifa is an iconic symbol of Dubai's ambition and innovation.",
      },
      {
        id: 1,
        name: "Burjh Al Arabi",
        coordinates: {
          lat: 25.1413,
          long: 55.1855,
        },
        images: [
          "https://cdn.pixabay.com/photo/2015/09/14/17/31/dubai-939844_1280.jpg",
          "https://cdn.pixabay.com/photo/2017/08/10/16/11/burj-al-arab-2624317_1280.jpg",
          "https://cdn.pixabay.com/photo/2021/08/22/18/53/hotel-6565940_1280.jpg",
          "https://cdn.pixabay.com/photo/2020/07/31/17/47/u-a-e-5453672_1280.jpg",
        ],
        rating: "4.8",
        description:
          "The Burj Al Arab, situated in Dubai, United Arab Emirates, is a luxury hotel known for its distinctive sail-shaped silhouette and opulent amenities. Standing on its own artificial island, it is often hailed as one of the most luxurious and iconic hotels in the world.",
      },
      {
        id: 2,
        name: "Dubai miracle garden",
        coordinates: {
          lat: 25.0675,
          long: 55.235,
        },
        images: [
          "https://cdn.pixabay.com/photo/2020/03/01/02/13/dubai-4891560_1280.jpg",
          "https://cdn.pixabay.com/photo/2016/03/04/12/21/dubai-miracle-garden-1235962_1280.jpg",
          "https://cdn.pixabay.com/photo/2020/01/15/18/22/miracle-garden-4768619_1280.jpg",
          "https://cdn.pixabay.com/photo/2018/09/18/13/29/miracle-garden-dubai-3686191_1280.jpg",
        ],
        rating: "4.8",
        description:
          "The Dubai Miracle Garden is a botanical paradise located in Dubai, United Arab Emirates, featuring an impressive array of colorful floral displays, intricate designs, and themed gardens spread across 72,000 square meters. As one of the world's largest natural flower gardens, it captivates visitors with its stunning beauty and imaginative landscapes, making it a must-visit attraction in Dubai.",
      },
    ],
  },
];

interface TripProps {}

export const TripDetailScreen: React.FC<TripProps> = ({ route }) => {
  // console.log("route", route?.params?.directVisit);
  const navigation = useNavigation();

  const [invitedUsers, setInvitedUsers] = useState([
    // "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=20&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    // "https://images.unsplash.com/photo-1704642408219-977150048504?q20&w=3325&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1704642408219-977150048504?q20&w=3325&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  ]);
  const [invitedUsersModalVisible, setInvitedUsersModalVisible] =
    useState(false);
  const mapRef = useRef(null);

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
  const modalQuestionRef2 = useRef<Modalize>(null);
  const feedbackModalRef = useRef<Modalize>(null);
  const documentsRefModal = useRef<Modalize>(null);
  const modalEmbedRef = useRef<Modalize>(null);
  const modalFileQuestionRef = useRef<Modalize>(null);
  const modalFileUploadRef = useRef<Modalize>(null);

  const onFileQuestionsModalOpen = () => {
    modalFileQuestionRef.current?.open();
  };
  const onFileUploadsModalOpen = () => {
    modalFileUploadRef.current?.open();
  };

  const onInvitedUsersModalOpen = () => {
    if (Platform.OS === "android") {
      setInvitedUsersModalVisible(true);
    } else {
      invitedUsersModal.current?.open();
    }
  };
  const onActivitiesModalOpen = () => {
    activitiesModal.current?.open();
  };

  const onQuestionModalOpen = () => {
    modalQuestionRef.current?.open();
  };

  const onQuestion2ModalOpen = () => {
    modalQuestionRef2.current?.open();
  };
  const onDocumentsModalOpen = () => {
    documentsRefModal.current?.open();
  };
  const onEmbedModalOpen = () => {
    modalEmbedRef.current?.open();
  };

  const onFeedbackModalOpen = () => {
    feedbackModalRef.current?.open();
  };

  const pickImageCamera = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      alert(
        "You've refused to allow this app to access your camera! Go to settings, search for Schoolbook and allow access to camera"
      );
      return;
    }

    const result = await ImagePicker.launchCameraAsync();

    if (!result.canceled) {
      const formData = new FormData();

      formData.append("file", {
        uri: result?.assets[0]?.uri,
        type: "image",
        name: result?.assets[0]?.fileName || "no-name",
      });

      // const response = await send(formData);
      if (response) {
        // Toast.show(t("carmatebit.ganaxlda"), {
        //   position: 70,
        //   backgroundColor: "green",
        //   textColor: "white",
        //   hideOnPress: true,
        //   duration: 3000,
        //   shadow: true,
        //   opacity: 1,
        // });
      }
    }
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const formData = new FormData();

      formData.append("file", {
        uri: result?.assets[0]?.uri,
        type: "image/jpeg",
        name:
          result?.assets[0]?.fileName ||
          result?.assets[0]?.uri.split("/").pop(),
      });

      // const response = await send(formData);

      if (response) {
        // Toast.show(t("carmatebit.ganaxlda"), {
        //   position: 70,
        //   backgroundColor: "green",
        //   textColor: "white",
        //   hideOnPress: true,
        //   duration: 3000,
        //   shadow: true,
        //   opacity: 1,
        // });
      }
    }
  };

  const pickDocument = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: "*/*",
      copyToCacheDirectory: true,
      multiple: false,
    });
    if (result.type === "success") {
      // setLoadingFile(true);
      // setDocuments(result);
      // const formData = new FormData();
      // formData.append("file", {
      //   uri: result.uri,
      //   type: result.mimeType,
      //   name: result.name,
      // });
      // const response = await send(formData);
      // if (response) {
      // }
    }
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

  useEffect(() => {
    mapRef.current?.animateToRegion({
      latitude: DATA[0].activities[0].coordinates?.lat,
      longitude: DATA[0].activities[0].coordinates?.long,
      latitudeDelta: 0.00001,
      longitudeDelta: 0.5,
    });
  }, []);

  const Header = ({ onQuestion2ModalOpen }) => {
    return (
      <View style={[styles.mapHeaderContainer]}>
        <MapView
          ref={mapRef}
          onPress={() => navigation.navigate("TripMapViewScreen")}
          provider={Platform.OS === "android" ? PROVIDER_GOOGLE : undefined}
          style={styles.map}
          mapType="standard"
        ></MapView>

        <TouchableOpacity
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
          style={styles.backButton}
        >
          <BackIcon />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("TripMapViewScreen")}
          activeOpacity={0.7}
          style={styles.mapButton}
        >
          <MapIcon width={15} color="black" />
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
              <Text style={styles.tripName}>Dubai vacation</Text>
              <Text style={styles.tripDestination}>Dubai, UAE</Text>
            </View>
            <View style={styles.rightSide}>
              <TouchableOpacity
                onPress={() => onQuestion2ModalOpen()}
                style={styles.editButton}
                activeOpacity={0.7}
              >
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
                onPress={handleNavigate}
              >
                <InsightIcon size={12} color={COLORS.primaryDark} />
                <Text style={styles.bottomActionsButtonlabel}>Insights</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.bottomActionsButton}
                activeOpacity={0.7}
                onPress={() => onDocumentsModalOpen()}
              >
                <FileLiteIcon width={12} color={COLORS.primaryDark} />
                <Text style={styles.bottomActionsButtonlabel}>Docs</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  };

  return (
    <>
      <Tabs.Container
        minHeaderHeight={50}
        renderHeader={() => (
          <Header onQuestion2ModalOpen={onQuestion2ModalOpen} />
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
      >
        {DATA.map((item, ind) => (
          <Tabs.Tab
            name={item?.date}
            label={(props) => (
              <View
                style={[
                  styles.customTab,
                  {
                    width:
                      DATA?.length < 4
                        ? (SIZES.width - 80) / DATA?.length
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
                    styles.customTabLabel,
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
                // paddingTop: 25,
                paddingBottom: 60,
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
                {item?.activities.map((itm, ind) => (
                  <Fragment key={ind}>
                    <TouchableOpacity
                      activeOpacity={0.7}
                      style={[
                        styles.sightItem,
                        // item === 0 ? styles.checkedIn : null,
                      ]}
                      onPress={() => setTopSightVisible(true)}
                    >
                      <View style={styles.pinIcon}>
                        <PinIcon size="20" color={COLORS.darkgray} />
                        <Text
                          style={{
                            color: "#fff",
                            position: "absolute",
                            fontSize: 10,
                            top: Platform.OS === "ios" ? 3 : 2,
                            left: 7,
                          }}
                        >
                          {ind + 1}
                        </Text>
                      </View>

                      <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                      >
                        {Platform?.OS === "ios"
                          ? itm?.images.map((image, index) => (
                              <Image
                                style={{
                                  width: 80,
                                  height: 80,
                                  borderRadius: 10,
                                  marginRight: 10,
                                }}
                                resizeMode="cover"
                                source={{
                                  uri: image,
                                }}
                                key={`slide-${index}`}
                              ></Image>
                            ))
                          : itm?.images.splice(0, 3).map((image, index) => (
                              <Image
                                style={{
                                  width: 80,
                                  height: 80,
                                  borderRadius: 10,
                                  marginRight: 10,
                                }}
                                resizeMode="cover"
                                source={{
                                  uri: image,
                                }}
                                key={`slide-${index}`}
                              ></Image>
                            ))}
                      </ScrollView>

                      <View style={styles.sightDetails}>
                        <Text style={styles.sightTitle}>{itm.name}</Text>
                        <View style={styles.ratingLabel}>
                          <Text style={styles.sightType}>Landmark</Text>
                          <Text style={[styles.ratingText]}>{itm.rating}</Text>
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
                          numberOfLines={3}
                        >
                          {itm.description}
                        </Text>
                      </View>
                    </TouchableOpacity>
                    <View style={styles.sightBottomActions}>
                      <TouchableOpacity
                        activeOpacity={0.7}
                        style={styles.checkinButton}
                        onPress={() => {
                          // onFeedbackModalOpen();
                        }}
                      >
                        <CheckLiteIcon color={COLORS.gray} width="15" />
                        <Text
                          style={[
                            styles.checkinButtonText,
                            { color: COLORS.gray },
                          ]}
                        >
                          Checked in
                          {/* {ititem === 0 ? "Checked in" : "Check in"} */}
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
                  </Fragment>
                ))}
              </View>
            </Tabs.ScrollView>
          </Tabs.Tab>
        ))}
      </Tabs.Container>

      <Portal>
        <Modalize
          ref={invitedUsersModal}
          modalTopOffset={65}
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
                      <Text style={styles.invitedUserName}>
                        Giorgi Bitsadze
                      </Text>
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
                      <Text style={styles.invitedUserName}>
                        Giorgi Bitsadze
                      </Text>
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
          </ScrollView>
        </Modalize>
      </Portal>

      {/* For android */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={invitedUsersModalVisible}
        onRequestClose={() => {
          setInvitedUsersModalVisible(false);
        }}
      >
        <View style={styles.modalViewWrapper}>
          <View style={styles.modalViewCenter}>
            <View style={[styles.rowItemHeader, { width: "100%" }]}>
              <Text style={styles.h2}>Trip members</Text>

              <TouchableOpacity
                onPress={() => setInvitedUsersModalVisible(false)}
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
              <TouchableOpacity style={styles.inviteButton} activeOpacity={0.7}>
                <Text style={styles.inviteButtonText}>Invite</Text>
              </TouchableOpacity>
            </View>
            {true ? (
              <ScrollView
                contentContainerStyle={{ paddingHorizontal: 0 }}
                style={[styles.invitedList]}
              >
                <View style={[styles.invitedListItem]}>
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
                      <Text style={styles.invitedUserName}>
                        Giorgi Bitsadze
                      </Text>
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
                      <Text style={styles.invitedUserName}>
                        Giorgi Bitsadze
                      </Text>
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
                <View style={[styles.invitedListItem]}>
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
                      <Text style={styles.invitedUserName}>
                        Giorgi Bitsadze
                      </Text>
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
                      <Text style={styles.invitedUserName}>
                        Giorgi Bitsadze
                      </Text>
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
                <View style={[styles.invitedListItem]}>
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
                      <Text style={styles.invitedUserName}>
                        Giorgi Bitsadze
                      </Text>
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
                      <Text style={styles.invitedUserName}>
                        Giorgi Bitsadze
                      </Text>
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
                <View style={[styles.invitedListItem]}>
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
                      <Text style={styles.invitedUserName}>
                        Giorgi Bitsadze
                      </Text>
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
                      <Text style={styles.invitedUserName}>
                        Giorgi Bitsadze
                      </Text>
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
                <Text style={styles.noResultWrapperText}>
                  You haven't added trip members yet, enter email and send
                  invitation
                </Text>
              </View>
            )}
          </View>
        </View>
      </Modal>

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

      {false && (
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
      )}
      <TouchableOpacity
        onPress={() => onActivitiesModalOpen()}
        activeOpacity={0.7}
        style={styles.addActivityButton}
      >
        <PlusIcon />
      </TouchableOpacity>

      {/* Documents */}
      <Portal>
        <Modalize
          ref={documentsRefModal}
          modalTopOffset={200}
          HeaderComponent={
            <>
              <View style={styles.rowItemHeader}>
                <Text style={styles.h2}>Documents</Text>

                <TouchableOpacity
                  onPress={() => documentsRefModal?.current?.close()}
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
                    style={styles.documentItem}
                  >
                    <View style={styles.documentItemLeft}>
                      {item == 0 && <PDFIcon />}
                      {item == 1 && <FilesIcon />}
                      {item == 2 && <DOCIcon />}
                      {item == 3 && <ImgIcon />}
                      {item == 4 && <DOCIcon />}
                      <Text style={styles.documentItemTitle}>
                        Flight tickets
                      </Text>
                    </View>
                    <TouchableOpacity
                      onPress={() => onFileQuestionsModalOpen()}
                      style={styles.documentItemOptions}
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
                    style={styles.uploadButton}
                    onPress={() => onFileUploadsModalOpen()}
                  >
                    <PlusIcon />
                    <Text style={styles.uploadButtonText}>Upload document</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </>
          ) : (
            <View style={styles.noResultWrapper}>
              <DocsIcon />
              <Text style={styles.noResultWrapperText}>
                Start uploading documents to your trip. You can add photos,
                PDFs, text files and etc.
              </Text>

              <TouchableOpacity
                style={styles.uploadButton}
                onPress={() => onFileUploadsModalOpen()}
              >
                <PlusIcon />
                <Text style={styles.uploadButtonText}>Upload document</Text>
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
      </Portal>

      <Portal>
        <Modalize
          ref={modalFileUploadRef}
          modalTopOffset={65}
          disableScrollIfPossible
          adjustToContentHeight
          velocity={100000}
          tapGestureEnabled={false}
          closeSnapPointStraightEnabled={false}
          modalStyle={{
            backgroundColor: "#F2F2F7",
            minHeight: 300,
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
                onPress={() => pickImageCamera()}
              >
                <Text style={questionModaStyles.buttonText}>Take photo</Text>
                <CameraIcon size="15" />
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => pickImage()}
                style={[questionModaStyles.button]}
              >
                <Text style={questionModaStyles.buttonText}>
                  Choose from library
                </Text>
                <PhotosLibraryIcon size="15" />
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => pickDocument()}
                style={[questionModaStyles.button, { borderBottomWidth: 0 }]}
              >
                <Text style={questionModaStyles.buttonText}>
                  Upload document
                </Text>
                <DocumentIcon size="15" />
              </TouchableOpacity>
            </View>
          </QuestionModal>
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

const styles = StyleSheet.create({
  uploadButton: {
    backgroundColor: COLORS.primaryDark,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 50,
    paddingHorizontal: 15,
    marginTop: 25,
    height: 50,
  },
  modalViewWrapper: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  modalViewCenter: {
    backgroundColor: "#F2F2F7",
    borderRadius: 15,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    width: "100%",
    height: "100%",
  },
  uploadButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
  },
  documentItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 60,
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
  },
  documentItemLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  documentItemTitle: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: "500",
  },
  documentItemOptions: {
    padding: 8,
    marginRight: -8,
  },
  rowItemHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    paddingTop: 15,
    paddingBottom: 25,
  },
  checkedIn: {
    opacity: 0.7,
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
    paddingHorizontal: 15,
    marginTop: 45,
  },
  noResultWrapperText: {
    fontSize: 16,
    color: COLORS.darkgray,
    marginTop: 25,
    textAlign: "center",
    lineHeight: 20,
    maxWidth: "80%",
  },
  invitedList: {
    marginTop: 15,
    // flex: 1,
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
