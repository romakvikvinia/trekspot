import { useNavigation } from "@react-navigation/native";
import { Image } from "expo-image";
import { useEffect, useMemo, useRef } from "react";
import { FlatList, Platform, StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native";
import { toast } from "sonner-native";

import { useAllCountriesQuery } from "../../../api/api.trekspot";
import { Loader } from "../../../common/ui/Loader";
import { convertToFahrenheit } from "../../../screen/Explore/helper";
import { StarIcon, TemperatureIcon } from "../../../utilities/SvgIcons.utility";

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

export const SeasonalExplorerContent = ({ isCelsiues, currentMonth }) => {
  const navigation = useNavigation();

  const { data: countryList, isLoading, isError } = useAllCountriesQuery({});

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
    });

    return filtered?.sort((a, b) => {
      return b.rate - a.rate;
    });
  }, [countryList, currentMonth]);

  const scrollToTop = () => {
    flatListRef.current?.scrollToOffset({ offset: 0, animated: true });
  };

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
            {isCelsiues
              ? item?.weatherInformation?.averageTemperatures?.[
                  getSeasonByMonth
                ]
              : convertToFahrenheit(
                  item?.weatherInformation?.averageTemperatures?.[
                    getSeasonByMonth
                  ]
                )}
          </Text>
        </View>
        <View style={styles.temperature}>
          <Text style={[styles.temperatureText, { marginLeft: 0 }]}>
            <Text style={{ fontWeight: "700" }}>Popular:</Text>{" "}
            {item?.whenToVisit}
          </Text>
        </View>
        <View style={styles.tags}>
          {item?.recognizedFor?.map((tag, index) => (
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

  useEffect(() => {
    scrollToTop();
  }, [currentMonth]);

  return (
    <>
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
    </>
  );
};

const styles = StyleSheet.create({
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
    maxWidth: "85%",
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
    marginLeft: 5,
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
  temperature: {
    alignItems: "center",
    flexDirection: "row",
    marginTop: 10,
    opacity: 0.7,
  },
  temperatureText: {
    color: "#000",
    fontSize: 12,
    fontWeight: "500",
    marginLeft: 5,
  },
});
