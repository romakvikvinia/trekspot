import { useNavigation } from "@react-navigation/native";
import { Image } from "expo-image";
import { useRef, useState } from "react";
import {
  Linking,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Modalize } from "react-native-modalize";
import { Portal } from "react-native-portalize";
import Carousel from "react-native-snap-carousel";

import { COLORS, SIZES } from "../../styles/theme";
import {
  CallIcon,
  DirectionIcon,
  DownIcon,
  StarIcon,
  WheelChair,
  XIcon,
} from "../../utilities/SvgIcons.utility";
import { CarouselItem } from "../world/CarouselItem";

const IMGS = [
  {
    url: "https://lh5.googleusercontent.com/p/AF1QipM_IFXIjNs-IrGF9FrTVq6qKBmEzfNeVyc3KhYQ=s870-k-no",
  },
  {
    url: "https://lh5.googleusercontent.com/p/AF1QipNeHv7osdSZnnZI9dtb9ZTzUEgF8RwKaXc0kTla=s870-k-no",
  },
  {
    url: "https://lh5.googleusercontent.com/p/AF1QipOF-JcEAshABRetGuFLMrnedxiv4g820gFlQou9=s1016-k-no",
  },
];

export const RestaurantDetail = () => {

  const [toggleVisible, setToggleVisible] = useState(false);

  const galleryRef = useRef(null);
  const carouselRef = useRef(null);
  const navigation = useNavigation();

  const openMap = (address: string) => {
    const scheme = Platform.select({
      ios: "maps://0,0?q=",
      android: "geo:0,0?q=",
    });
    const url = Platform.select({
      ios: `${scheme}${address}`,
      android: `${scheme}${address}`,
    });

    Linking.openURL(url!);
  };

  return (
    <>
      <View style={styles.header}>
        <Text style={styles.title}>Tresid dubai</Text>
        <Pressable
          style={styles.closeButton}
          onPress={() => navigation.goBack()}
        >
          <XIcon width="12" />
        </Pressable>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 0 }}
      >
        <View
          style={[
            styles.detailsRow,
            {
              marginTop: 0,
            },
          ]}
        >
          <View style={styles.rating}>
            <StarIcon color="#FFBC3E" size={15} />
            <Text style={styles.ratingnumber}>4.5</Text>
            <Text
              style={[
                styles.general,
                { marginLeft: 5, position: "relative", top: 1 },
              ]}
            >
              Google
            </Text>
          </View>
        </View>
        <View style={styles.detailsRow}>
          <Text style={styles.general}>Asian</Text>
          <Text style={styles.general}>· $$ ·</Text>
          <WheelChair color={COLORS.primary} />
        </View>
        <View style={styles.detailsRow}>
          <Text style={[styles.general, { color: COLORS.green }]}>Open</Text>
          <Text style={styles.general}>· Closes 23:00</Text>
        </View>
        <View style={styles.buttons}>
          <Pressable style={styles.button} onPress={() => openMap("address")}>
            <DirectionIcon color={COLORS.primary} />
            <Text style={styles.buttonLabel}>Direction</Text>
          </Pressable>
          <Pressable
            style={styles.button}
            // onPress={() => Linking.openURL(`tel:${phoneNumber}`)}
          >
            <CallIcon color={COLORS.primary} size={12} />
            <Text style={styles.buttonLabel}>Call</Text>
          </Pressable>
        </View>
        <ScrollView
          horizontal
          contentContainerStyle={{ paddingHorizontal: 15 }}
          showsHorizontalScrollIndicator={false}
        >
          {IMGS?.map((item, k) => (
            <Pressable key={k} onPress={() => galleryRef.current?.open()}>
              <Image
                style={styles.itemImage}
                source={
                  item
                    ? {
                        uri: item?.url,
                      }
                    : require("../../assets/no-image.png")
                }
                contentFit="cover"
                cachePolicy="memory-disk"
              ></Image>
            </Pressable>
          ))}
        </ScrollView>

        <View style={styles.details}>
          <Pressable
            style={styles.collapsable}
            onPress={() => setToggleVisible(!toggleVisible)}
          >
            <View style={styles.collapsableTop}>
              <Text style={styles.label}>Hours</Text>
              <DownIcon color={COLORS.darkgray} size={12} />
            </View>
            <View style={styles.detailsRow}>
                <Text style={[styles.general, { color: COLORS.green }]}>
                  Open
                </Text>
                <Text style={styles.general}>· Closes 23:00</Text>
              </View>
            {toggleVisible &&
              <View style={styles.detailsBody}>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Monday</Text>
                  <Text style={styles.detailValue}>12:00 - 02:00</Text>
                </View>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Tuesday</Text>
                  <Text style={styles.detailValue}>12:00 - 02:00</Text>
                </View>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Wednesday</Text>
                  <Text style={styles.detailValue}>12:00 - 02:00</Text>
                </View>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Thursday</Text>
                  <Text style={styles.detailValue}>12:00 - 02:00</Text>
                </View>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Friday</Text>
                  <Text style={styles.detailValue}>12:00 - 02:00</Text>
                </View>
              </View>
            }
          </Pressable>
          <View style={styles.detailsGroup}>
            <View style={styles.detailsGroupRow}>
              <Text style={styles.detailsGroupLabel}>Phone</Text>
              <Pressable
                style={styles.detailsGroupvalue}
                onPress={() => Linking.openURL(`tel:444`)}
              >
                <Text style={styles.detailsGroupvalueText}>+995 555 999 444</Text>
              </Pressable>
            </View>
            <View style={styles.detailsGroupRow}>
              <Text style={styles.detailsGroupLabel}>Website</Text>
              <Pressable
                style={styles.detailsGroupvalue}
                onPress={() => Linking.openURL(`https://google.com`)}
              >
                <Text style={styles.detailsGroupvalueText}>Google.com</Text>
              </Pressable>
            </View>
            <View style={styles.detailsGroupRow}>
              <Text style={styles.detailsGroupLabel}>Address</Text>
              <Pressable
                style={styles.detailsGroupvalue}
                onPress={() => openMap("Via Lodovico Ariosto, 22, 20145 Milano MI")}
              >
                <Text style={styles.detailsGroupvalueText}>
                    Via Lodovico Ariosto, 22, 20145 Milano MI
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </ScrollView>

      <Portal>
        <Modalize
          ref={galleryRef}
          modalTopOffset={0}
          withHandle={false}
          disableScrollIfPossible
          modalStyle={{
            minHeight: "100%",
            backgroundColor: "#000",
            flex: 1,
          }}
          scrollViewProps={{
            alwaysBounceVertical: false,
          }}
        >
          <View style={styles.galleryHeader}>
            <Pressable
              style={styles.closeGalleryButton}
              onPress={() => galleryRef?.current?.close()}
            >
              <XIcon color="#fff" />
            </Pressable>
          </View>

          <Carousel
            ref={carouselRef}
            //@ts-ignore
            data={IMGS}
            //@ts-ignore
            renderItem={CarouselItem}
            sliderWidth={SIZES.width}
            itemWidth={SIZES.width}
            inactiveSlideShift={0}
            useScrollView={true}
          />
        </Modalize>
      </Portal>
    </>
  );
};
export const styles = StyleSheet.create({
    button: {
    alignItems: "center",
    backgroundColor: "#dceaff",
    borderRadius: 30,
    flexDirection: "row",
    height: 35,
    marginRight: 15,
    paddingHorizontal: 15,
    paddingVertical: 5,
  },
    buttonLabel: {
    color: COLORS.primary,
    fontSize: 14,
    fontWeight: "500",
    marginLeft: 8,
  },
    buttons: {
    alignItems: "center",
    flexDirection: "row",
    marginBottom: 20,
    marginTop: 15,
    paddingHorizontal: 15,
  },
    closeButton: {
    alignItems: "center",
    backgroundColor: "#DBDBDB",
    borderRadius: 50,
    height: 30,
    justifyContent: "center",
    width: 30,
  },
    closeGalleryButton: {
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderColor: "#000",
    borderRadius: 50,
    borderWidth: 0,
    height: 40,
    justifyContent: "center",
    width: 40,
  },
    collapsable: {
    backgroundColor: "#fff",
    borderRadius: 15,
    paddingVertical: 15,
  },
  collapsableTop: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 15,
  },
  detailLabel: {
        color: COLORS.darkgray,
        fontSize: 14
    },
  detailRow: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
    paddingHorizontal: 0
  },
  detailValue: {
    color: COLORS.black,
    fontSize: 14,
    fontWeight: "500"
  },
  details: {
    marginTop: 15,
    paddingHorizontal: 15,
  },
  detailsBody: {
    marginTop: 5,
    paddingHorizontal: 15,
    width: "100%"
  },
  detailsGroup:{
        backgroundColor: "#fff",
        borderRadius: 15,
        marginTop: 15
    },
  detailsGroupLabel: {
        color: COLORS.darkgray,
        fontSize: 14,
    },
  detailsGroupRow: {
        borderBottomColor: "#f2f2f2",
        borderBottomWidth: 1,
        padding: 15
    },
  detailsGroupvalue: {
        marginTop: 10
    },
  detailsGroupvalueText: {
        color: COLORS.primary,
        fontSize: 15,
        fontWeight: "500"
    },
  detailsRow: {
    alignItems: "center",
    flexDirection: "row",
    marginTop: 5,
    paddingHorizontal: 15,
  },
  galleryHeader: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingHorizontal: 15,
    paddingTop: 55,
    position: "absolute",
    width: "100%",
    zIndex: 1,
  },
  general: {
    color: COLORS.darkgray,
    fontSize: 14,
    marginRight: 5,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
    paddingBottom: 5,
    paddingTop: 20,
  },
  itemImage: {
    borderRadius: 15,
    height: 140,
    marginRight: 10,
    width: 140,
  },
  label: {
    color: COLORS.darkgray,
    fontSize: 14,
  },
  rating: {
    alignItems: "center",
    flexDirection: "row",
  },
  ratingnumber: {
    color: COLORS.darkgray,
    fontSize: 14,
    fontWeight: "500",
    marginLeft: 5,
    position: "relative",
    top: 1,
  },
  title: {
    fontSize: 24,
  },
});
