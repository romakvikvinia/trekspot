import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { Image } from "expo-image";
import { useEffect, useRef, useState } from "react";
import {
    KeyboardAvoidingView,
  Linking,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { Modalize } from "react-native-modalize";
import { Portal } from "react-native-portalize";
import Carousel from "react-native-snap-carousel";

import { CarouselItem } from "../../../components/world/CarouselItem";
import { COLORS, SIZES } from "../../../styles/theme";
import {
  CostIcon,
  NoteIcon,
  StarIcon,
} from "../../../utilities/SvgIcons.utility";
import {
  DirectionIcon,
  DownIcon,
  XIcon,
} from "../../../utilities/SvgIcons.utility";
import { FilesRow } from "./FilesRow";
 

export const CurrencyButton = () => {
  const navigation = useNavigation();
  const [currency, setCurrency] = useState("");

  const isFocused = useIsFocused();

  useEffect(() =>{ 
    const getCurrencyFromStorage = async () => {
      const currency = await AsyncStorage.getItem("userCurrency");
      setCurrency(currency?.split(" ")[0] || "USD");
    }
    getCurrencyFromStorage();
  }, [isFocused]);

  return (
    <Pressable style={styles.currencyButton} onPress={() => navigation.navigate("CurrencyScreen")}>
      <Text style={styles.currencyButtonText}>{currency}</Text><DownIcon size={10} />
    </Pressable>
  )
}

export const SightDetail = ({ route }) => {
  const { sight } = route.params;

  console.log(sight);
  const [toggleVisible, setToggleVisible] = useState(false);

  const galleryRef = useRef(null);
  const carouselRef = useRef(null);
  const navigation = useNavigation();

  const openMap = (location: { lat: number; lng: number }) => {
    const scheme = Platform.select({
      ios: "maps://0,0?q=",
      android: "geo:0,0?q=",
    });
    const url = Platform.select({
      ios: `${scheme}${location.lat},${location.lng}`,
      android: `${scheme}${location.lat},${location.lng}`,
    });

    Linking.openURL(url!);
  };

  const location = {
    lat: 51.5054564,
    lng: -0.07535649999999999,
  };
  const day = new Date().toLocaleDateString("en-US", { weekday: "long" });
  const workingHours = sight?.workingHours.find(
    (item) => item.day === day
  )?.hours;


  const urlNormalizer = (url: string) => {
    if (url?.includes("http")) {
      return url;
    }
    return `http://${url}`;
  };

  return (
    <>
      <View style={styles.header}>
        <Text style={styles.title}>{sight.title}</Text>
        <Pressable
          style={styles.closeButton}
          onPress={() => navigation.goBack()}
          hitSlop={15}
        >
          <XIcon width="12" />
        </Pressable>
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 0 }}
          nestedScrollEnabled={true}
        >
          <View style={[styles.detailsRow]}>
            <View style={styles.rating}>
              <StarIcon color="#FFBC3E" size={15} />
              <Text style={styles.ratingnumber}>{sight.rate}</Text>
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

          <View
            style={[
              styles.detailsRow,
              {
                marginTop: 10,
              },
            ]}
          >
            <Text style={styles.general}>{sight?.category}</Text>
          </View>

          <View style={styles.buttons}>
            {sight?.location && (
              <Pressable
                style={styles.button}
                onPress={() => openMap(location)}
              >
                <DirectionIcon color={COLORS.primary} />
                <Text style={styles.buttonLabel}>Direction</Text>
              </Pressable>
            )}
          </View>

          <ScrollView
            horizontal
            contentContainerStyle={{ paddingHorizontal: 15 }}
            showsHorizontalScrollIndicator={false}
          >
            {sight?.images?.map((item, k) => (
              <Pressable key={k} onPress={() => galleryRef.current?.open()}>
                <Image
                  placeholder={{
                    uri: require("../../../assets/no-image.png"),
                  }}
                  placeholderContentFit="cover"
                  style={styles.itemImage}
                  source={
                    item
                      ? {
                          uri: item?.url,
                        }
                      : require("../../../assets/no-image.png")
                  }
                  contentFit="cover"
                  cachePolicy="memory-disk"
                ></Image>
              </Pressable>
            ))}
          </ScrollView>

          {sight?.description && (
            <View style={{ paddingHorizontal: 15, marginTop: 15 }}>
              <Text
                style={{
                  color: COLORS.black,
                  fontSize: 15,
                  fontWeight: "400",
                  lineHeight: 20,
                }}
              >
                {sight?.description}
              </Text>
            </View>
          )}

          <View style={styles.details}>
            {sight?.workingHours?.length > 0 && (
              <Pressable
                style={styles.collapsable}
                onPress={() => setToggleVisible(!toggleVisible)}
              >
                <View style={styles.collapsableTop}>
                  <Text style={styles.label}>Hours</Text>
                  <DownIcon color={COLORS.darkgray} size={12} />
                </View>
                <View style={styles.detailsRow}>
                  <Text style={[styles.general, { color: COLORS.darkgray }]}>
                    Open ·{" "}
                    <Text style={{ color: COLORS.green }}>
                      {workingHours ? workingHours : "Closed"}
                    </Text>
                  </Text>
                </View>
                {toggleVisible && (
                  <View style={styles.detailsBody}>
                    {sight?.workingHours?.map((item, k) => (
                      <View style={styles.detailRow} key={k}>
                        <Text style={styles.detailLabel}>{item.day}</Text>
                        <Text style={styles.detailValue}>{item.hours}</Text>
                      </View>
                    ))}
                  </View>
                )}
              </Pressable>
            )}
            <View
              style={[
                styles.detailsGroup,
                {
                  marginTop: 0,
                },
              ]}
            >
              {sight?.url && (
                <View style={styles.detailsGroupRow}>
                  <Text style={styles.detailsGroupLabel}>Website</Text>
                  <Pressable
                    style={styles.detailsGroupvalue}
                    onPress={() => Linking.openURL(urlNormalizer(sight?.url))}
                  >
                    <Text style={styles.detailsGroupvalueText}>
                      {sight?.url}
                    </Text>
                  </Pressable>
                </View>
              )}
              {sight?.address && (
                <View style={styles.detailsGroupRow}>
                  <Text style={styles.detailsGroupLabel}>Address</Text>
                  <View style={styles.detailsGroupvalue}>
                    <Text style={styles.detailsGroupvalueText}>
                      {sight?.address}
                    </Text>
                  </View>
                </View>
              )}
            </View>

            <Text
              style={{
                color: COLORS.darkgray,
                fontSize: 14,
                fontWeight: "400",
                lineHeight: 15,
                marginTop: 25,
                marginBottom: 10,
              }}
            >
              Add expenses, notes or files if necessary
            </Text>
            <View
              style={[
                styles.detailsGroup,
                {
                  marginBottom: 15,
                },
              ]}
            >
              <View style={[styles.inputRow]}>
                <CostIcon size={20} color="#86858c" />
                <TextInput
                  style={[
                    styles.input,
                    {
                      fontSize: 16,
                      fontWeight: "600",
                      color: COLORS.black,
                    },
                  ]}
                  placeholder="Total expenses"
                  placeholderTextColor="#86858c"
                  keyboardType="numeric"
                />
                <CurrencyButton />
              </View>
             
            </View>
            <View
              style={[
                styles.detailsGroup,
                {
                  marginBottom: 15,
                },
              ]}
            >
               
              <Pressable
                onPress={() =>
                  //@ts-ignore
                  navigation.navigate("ActivityNoteOrDescription", {
                    type: "note",
                  })
                }
                style={({ pressed }) => [
                  styles.inputRow,
                  {
                    height: 50,
                    paddingRight: 15,
                    backgroundColor: pressed ? "#fafafa" : "#fff",
                  },
                ]}
              >
                <NoteIcon size={20} color="#86858c" />
                <Text style={styles.placeholder} numberOfLines={1}>
                    Add a note
                 </Text>
              </Pressable>
            </View>

            <FilesRow isPreview={false} showGallery={false} />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

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
            data={sight?.images}
            //@ts-ignore
            renderItem={({ item }) => <CarouselItem item={item} />}
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
  currencyButton: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 15,
  },
  currencyButtonText: {
    color: COLORS.black,
    fontSize: 14,
    fontWeight: "500",
    marginRight: 5,
  },
  detailLabel: {
    color: COLORS.darkgray,
    fontSize: 14,
  },
  detailRow: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
    paddingHorizontal: 0,
  },
  detailValue: {
    color: COLORS.black,
    fontSize: 14,
    fontWeight: "500",
  },
  details: {
    marginTop: 15,
    paddingHorizontal: 15,
  },
  detailsBody: {
    marginTop: 5,
    paddingHorizontal: 15,
    width: "100%",
  },
  detailsGroup: {
    backgroundColor: "#fff",
    borderRadius: 15,
    marginBottom: 15,
    overflow: "hidden",
  },
  detailsGroupLabel: {
    color: COLORS.darkgray,
    fontSize: 14,
  },
  detailsGroupRow: {
    borderBottomColor: "#f2f2f2",
    borderBottomWidth: 1,
    padding: 15,
  },
  detailsGroupvalue: {
    marginTop: 10,
  },
  detailsGroupvalueText: {
    color: COLORS.primary,
    fontSize: 15,
    fontWeight: "500",
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
  input: {
    backgroundColor: "#fff",
    color: "#000",
    flex: 1,
    fontSize: 15,
    fontWeight: "400",
    height: 50,
    paddingHorizontal: 15,
  },
  inputRow: {
    alignItems: "center",
    flexDirection: "row",
    paddingLeft: 15,
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
  placeholder: {
    color: "#86858c",
    flex: 1,
    fontSize: 16,
    fontWeight: "600",
    paddingLeft: 15,
    textAlign: "left",
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
    color: COLORS.black,
    fontSize: 24,
    fontWeight: "500",
    maxWidth: "80%",
  },
});
