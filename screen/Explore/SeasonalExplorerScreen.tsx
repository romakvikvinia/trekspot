import { format } from "date-fns";
import Constants from "expo-constants";
import * as Haptics from "expo-haptics";
import { Image } from "expo-image";
import { StatusBar } from "expo-status-bar";
import { useMemo, useRef, useState } from "react";
import {
  FlatList,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Modalize } from "react-native-modalize";
import { Portal } from "react-native-portalize";
import { toast } from "sonner-native";

import { useAllCountriesQuery } from "../../api/api.trekspot";
import { Loader } from "../../common/ui/Loader";
import { globalStyles } from "../../styles/globalStyles";
import { COLORS } from "../../styles/theme";
import {
  BackIcon,
  CheckLiteIcon,
  DownIcon,
  StarIcon,
  TemperatureIcon,
  XIcon,
} from "../../utilities/SvgIcons.utility";
import { convertToFahrenheit } from "./helper";

const SEASONSBYMONTH = [
  {
    season: "spring",
    months: ["March", "April", "May"],
  },
  {
    season: "summer",
    months: ["June", "July", "August"],
  },
  {
    season: "autumn",
    months: ["September", "October", "November"],
  },
  {
    season: "winter",
    months: ["December", "January", "February"],
  },
];

const MONTHS = [
  { id: 1, name: "January" },
  { id: 2, name: "February" },
  { id: 3, name: "March" },
  { id: 4, name: "April" },
  { id: 5, name: "May" },
  { id: 6, name: "June" },
  { id: 7, name: "July" },
  { id: 8, name: "August" },
  { id: 9, name: "September" },
  { id: 10, name: "October" },
  { id: 11, name: "November" },
  { id: 12, name: "December" },
];

export const SeasonalExplorerScreen = ({ navigation }: any) => {
  const { data: countryList, isLoading, isError } = useAllCountriesQuery({});
 
  const [currentMonth, setCurrentMonth] = useState(
    format(new Date(), "MMMM")
  );
  const [isCelsiues, setIsCelsius] = useState(true);

  if (isError) {
    toast.error("Error while fetching countries", {
      duration: 2000,
    });
  }
  const flatListRef = useRef(null);

  const filteredCountries = useMemo(() => {

    const filtered = countryList?.allCountries?.filter((country) => {
      return (
        country?.whenToVisit?.includes(currentMonth) && country?.image?.url
      );
    })

    return filtered?.sort((a, b) => {
      return b.rate - a.rate;
    })
  }, [countryList, currentMonth]);

  const modalMonthSelectRef = useRef(null);

  const getSeasonByMonth = useMemo(() => {
    return SEASONSBYMONTH.find((season) => season.months.includes(currentMonth))
      ?.season;
  }, [currentMonth]);


  const renderItem = ({ item, index }) => (
    <TouchableOpacity
      activeOpacity={0.7}
      style={styles.listItem}
      key={`${item.id}-${item.name}`}
      onPress={() =>
        navigation.navigate("CountryDetailScreen", { countryId: item?.id })
      }
    > 
      <Image
        style={styles.listItemImage}
        source={{
          uri: item?.image?.url,
        }}
        contentFit="cover"
        
      ></Image>
      <View style={styles.listItemDetails}>
        <View style={styles.listItemDetailsTop}>
          <Text style={styles.listItemTitle}>{item.name}</Text>
          {item?.rate && (
            <View style={styles.ratingLabel}>
              <View style={{ position: "relative", top: -0.5, opacity: 0.8 }}>
                <StarIcon color="#FFBC3E" />
              </View>
              <Text style={styles.ratingText}>{item.rate}</Text>
            </View>
          )}
        </View>
        <View style={styles.temperature}>
          <TemperatureIcon size={12} />
          <Text style={styles.temperatureText}>
            {
              isCelsiues ? item?.weatherInformation?.averageTemperatures?.[getSeasonByMonth] :
              convertToFahrenheit(item?.weatherInformation?.averageTemperatures?.[getSeasonByMonth])
            }
          </Text>
        </View>
        <View style={styles.temperature}>
          <Text style={[styles.temperatureText, {marginLeft: 0}]}>
            <Text style={{fontWeight: "700"}}>Popular:</Text> {item?.whenToVisit}
          </Text>
        </View>
        <View style={styles.tags}>
          {item?.recognizedFor?.map((tag,index) => (
            <View style={styles.tag} key={`${tag.title}-${index}`}>
              <Text style={styles.tagText}>
                {tag?.emoji} {tag?.title}
              </Text>
            </View>
          ))}
        </View>
      </View>
    </TouchableOpacity>
  );

  const scrollToTop = () => {
    flatListRef.current?.scrollToOffset({ offset: 0, animated: true });
  };

  const handleChangeMonth = (item: string) => {
    setCurrentMonth(item.name);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    modalMonthSelectRef?.current?.close();
    scrollToTop();
  }

  const renderMonthItem = ({ item }) => (
    <TouchableOpacity
      key={`${item.id}-${item.name}`}
      style={styles.monthItem}
      activeOpacity={0.7}
      onPress={() => handleChangeMonth(item)}
    >
      <Text
        style={[
          styles.monthText,
          {
            color: item.name === currentMonth ? COLORS.primary : COLORS.black,
            opacity: item.name === currentMonth ? 1 : 0.7,
            fontWeight: item.name === currentMonth ? "700" : "500",
          },
        ]}
      >
        {item.name}
      </Text>
      {item.name === currentMonth && (
        <CheckLiteIcon width={20} color={COLORS.primary} />
      )}
    </TouchableOpacity>
  );

  return (
    <>
      <View style={styles.safeArea}>
        <StatusBar style="light" />
        <KeyboardAvoidingView
          behavior={Platform.OS == "ios" ? "padding" : "height"}
          style={styles.screen}
        >
          <ImageBackground
            source={require("../../assets/seasonalExplorer.webp")}
            resizeMode="cover"
            style={styles.screenHeaderWrapper}
          >
            <View
              style={[
                styles.screenHeader,
                {
                  paddingTop:
                    Constants?.statusBarHeight +
                    (Platform.OS === "android" ? 0 : 10),
                  paddingHorizontal: Platform.OS === "android" ? 5 : 15,
                },
              ]}
            >
              <Pressable
                onPress={() => navigation.goBack()}
                style={globalStyles.screenHeaderBackButton}
                hitSlop={20}
              >
                <BackIcon size="30" color="#fff" />
              </Pressable>
              <Text style={[globalStyles.screenTitle, { color: "#fff" }]}>
                Explore by months
              </Text>
              <TouchableOpacity
                style={globalStyles.screenHeaderBackButton}
                onPress={() => {
                  setIsCelsius(!isCelsiues);
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                }}
              >
                <Text style={styles.tempUnitText}>
                  {!isCelsiues ? "°C" : "°F"}
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.seasonalExplorerSelectWrapper}>
              <TouchableOpacity
                onPress={() => modalMonthSelectRef?.current?.open()}
                activeOpacity={0.7}
                style={styles.seasonalExplorerSelect}
              >
                <Text style={styles.fromToText} numberOfLines={1}>
                  {currentMonth}
                </Text>
                <DownIcon color="#fff" />
              </TouchableOpacity>
            </View>
          </ImageBackground>

          {isLoading && (
            <View style={{ flex: 1 }}>
              <Loader isLoading={true} background="#f8f8f8" size="small" />
            </View>
          )}

          <FlatList
            ref={flatListRef}
            data={filteredCountries}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            // numColumns={2}
            // columnWrapperStyle={styles.columnWrapper}
            contentContainerStyle={{
              paddingHorizontal: 25,
              paddingVertical: 30,
            }}
          />
        </KeyboardAvoidingView>
      </View>

      <Portal>
        <Modalize
          ref={modalMonthSelectRef}
          modalTopOffset={120}
          HeaderComponent={
            <View style={styles.header}>
              <Text style={styles.title}>Select month</Text>
              <TouchableOpacity
                onPress={() => modalMonthSelectRef?.current?.close()}
                activeOpacity={0.7}
                style={styles.closeButton}
              >
                <XIcon width="10" />
              </TouchableOpacity>
            </View>
          }
          flatListProps={{
            data: MONTHS,
            renderItem: renderMonthItem,
            keyExtractor: (item) => item.name,
            showsVerticalScrollIndicator: false,
            scrollEventThrottle: 16,
            contentContainerStyle: {
              paddingHorizontal: 15,
              paddingTop: 0,
              paddingBottom: 25,
            },
          }}
        ></Modalize>
      </Portal>
    </>
  );
};

const styles = StyleSheet.create({
  closeButton: {
    alignItems: "center",
    backgroundColor: "#DBDBDB",
    borderRadius: 50,
    height: 30,
    justifyContent: "center",
    width: 30,
  },
  columnWrapper: {
    justifyContent: "space-between",
  },
  fromToText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
    marginLeft: 0,
    maxWidth: 180,
  },
  header: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 0,
    padding: 15,
  },
  listItem: {
    borderColor: "#f2f2f2",
    borderWidth: 1,
    marginBottom: 35,
    position: "relative",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 0.84,
    width: "100%",
    ...Platform.select({
      android: {
        elevation: 5,
      },
    }),
    backgroundColor: "#fff",
    borderRadius: 15,
    overflow: "hidden",
  },
  listItemDetails: {
    marginTop: 0,
    padding: 15,
    paddingTop: 10,
  },
  listItemDetailsTop: {
    alignItems: "flex-start",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  listItemImage: {
    height: 250,
  },
  listItemTitle: {
    fontSize: 22,
    fontWeight: "600",
    maxWidth: "85%"
  },
  monthItem: {
    width: "100%",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderColor: "#f2f2f2",
    borderRadius: 0,
    // marginBottom: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  monthText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "500",
  },
  pageDescription: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "500",
    lineHeight: 20,
    marginBottom: 5,
    marginTop: 10,
    paddingHorizontal: 40,
    textAlign: "center",
  },
  ratingLabel: {
    alignItems: "center",
    flexDirection: "row",
    marginTop: 8,
  },
  ratingText: {
    color: "#000",
    fontSize: 12,
    fontWeight: "500",
    marginLeft: 5
  },
  safeArea: {
    backgroundColor: "#f8f8f8",
    flex: 1,
  },
  screen: {
    flex: 1,
    width: "100%",
  },
  screenHeader: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 0,
    paddingBottom: 10,
    paddingHorizontal: 15,
    paddingTop: Constants?.statusBarHeight + 10,
  },
  screenHeaderWrapper: {
    backgroundColor: "#0072C6",
    height: 200,
    width: "100%",
  },
  seasonalExplorerDetails: {
    alignItems: "center",
    flexDirection: "row",
  },
  seasonalExplorerSelect: {
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    minWidth: 200,
    paddingHorizontal: 25,
    paddingVertical: 15,
    width: "70%",
  },
  seasonalExplorerSelectWrapper: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 15,
  },
  tag: {
    backgroundColor: "#fafafa",
    borderRadius: 5,
    marginBottom: 5,
    marginRight: 5,
    paddingHorizontal: 8,
    paddingVertical: 5,
  },
  tagText: {
    color: "#000",
    fontSize: 12,
    fontWeight: "500",
  },
  tags: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 15,
  },
  tempUnitText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  temperature: {
    alignItems: "center",
    flexDirection: "row",
    marginTop: 10,
    opacity: 0.7
  },
  temperatureText: {
    color: "#000",
    fontSize: 12,
    fontWeight: "500",
    marginLeft: 5,
  },
  title: {
    color: COLORS.black,
    fontSize: 18,
    fontWeight: "600",
  },
});
