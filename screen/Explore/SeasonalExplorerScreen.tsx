import {
  FlatList,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  BackIcon,
  CheckLiteIcon,
  DownIcon,
  StarIcon,
  TemperatureIcon,
  XIcon,
} from "../../utilities/SvgIcons.utility";
import { globalStyles } from "../../styles/globalStyles";
import Constants from "expo-constants";
import { Image } from "expo-image";
import { useMemo, useRef, useState } from "react";
import { Portal } from "react-native-portalize";
import { Modalize } from "react-native-modalize";
import { COLORS } from "../../styles/theme";
import * as Haptics from "expo-haptics";
import { Loader } from "../../common/ui/Loader";
import { useAllCountriesQuery } from "../../api/api.trekspot";
import { toast } from "sonner-native";
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
  let { data: countryList, isLoading, isError } = useAllCountriesQuery({});
  const [currentMonth, setCurrentMonth] = useState(
    new Date().toLocaleString("default", { month: "long" })
  );
  const [isCelsiues, setIsCelsius] = useState(true);

  if (isError) {
    toast.error("Error while fetching countries", {
      duration: 2000,
    });
  }

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
        cachePolicy="memory-disk"
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

  const renderMonthItem = ({ item }) => (
    <TouchableOpacity
      key={`${item.id}-${item.name}`}
      style={styles.monthItem}
      activeOpacity={0.7}
      onPress={() => {
        setCurrentMonth(item.name);
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        modalMonthSelectRef?.current?.close();
      }}
    >
      <Text
        style={[
          styles.monthText,
          {
            opacity: item.name === currentMonth ? 1 : 0.5,
          },
        ]}
      >
        {item.name}
      </Text>
      {item.name === currentMonth && (
        <CheckLiteIcon width={20} color={COLORS.black} />
      )}
    </TouchableOpacity>
  );

  return (
    <>
      <View style={styles.safeArea}>
        <KeyboardAvoidingView
          behavior={Platform.OS == "ios" ? "padding" : "height"}
          style={styles.screen}
        >
          <ImageBackground
            source={require("../../assets/seasonalExplorer.webp")}
            resizeMode="cover"
            style={styles.screenHeaderWrapper}
          >
            <View style={styles.screenHeader}>
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={globalStyles.screenHeaderBackButton}
              >
                <BackIcon size="30" color="#fff" />
              </TouchableOpacity>
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
  safeArea: {
    flex: 1,
    backgroundColor: "#f8f8f8",
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
    fontSize: 16,
    fontWeight: "500",
    color: "#000",
  },
  tempUnitText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "600",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 15,
    marginBottom: 0,
  },
  tags: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 15,
  },
  tag: {
    paddingVertical: 5,
    paddingHorizontal: 8,
    borderRadius: 5,
    marginRight: 5,
    marginBottom: 5,
    backgroundColor: "#fafafa",
  },
  tagText: {
    fontSize: 12,
    fontWeight: "500",
    color: "#000",
  },
  title: {
    fontSize: 18,
    color: COLORS.black,
    fontWeight: "600",
  },
  closeButton: {
    backgroundColor: "#DBDBDB",
    width: 30,
    height: 30,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  listItemDetailsTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  ratingLabel: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  temperatureText: {
    fontSize: 12,
    marginLeft: 5,
    color: "#000",
    fontWeight: "500",
  },
  temperature: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    opacity: 0.7
  },
  ratingText: {
    fontSize: 12,
    marginLeft: 5,
    color: "#000",
    fontWeight: "500"
  },
  listItemDetails: {
    marginTop: 0,
    padding: 15,
    paddingTop: 10,
  },
  listItemTitle: {
    fontSize: 22,
    fontWeight: "600",
    maxWidth: "85%"
  },
  columnWrapper: {
    justifyContent: "space-between",
  },
  listItem: {
    width: "100%",
    marginBottom: 35,
    borderWidth: 1,
    borderColor: "#f2f2f2",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 0.84,
    position: "relative",
    ...Platform.select({
      android: {
        elevation: 5,
      },
    }),
    backgroundColor: "#fff",
    borderRadius: 15,
    overflow: "hidden",
  },
  listItemImage: {
    height: 250,
  },
  seasonalExplorerSelectWrapper: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 15,
  },
  seasonalExplorerDetails: {
    flexDirection: "row",
    alignItems: "center",
  },
  seasonalExplorerSelect: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 50,
    paddingVertical: 15,
    paddingHorizontal: 25,
    width: "70%",
    minWidth: 200,
  },
  fromToText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#fff",
    marginLeft: 0,
    maxWidth: 180,
  },
  screen: {
    flex: 1,
    width: "100%",
  },
  screenHeaderWrapper: {
    height: 200,
    width: "100%",
    backgroundColor: "#0072C6",
  },
  screenHeader: {
    paddingTop: Constants?.statusBarHeight + 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    marginBottom: 0,
    paddingBottom: 10,
  },
  pageDescription: {
    fontSize: 18,
    paddingHorizontal: 40,
    color: "#fff",
    fontWeight: "500",
    lineHeight: 20,
    marginTop: 10,
    textAlign: "center",
    marginBottom: 5,
  },
});
