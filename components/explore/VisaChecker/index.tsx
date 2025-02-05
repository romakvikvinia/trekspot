import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  ImageBackground,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { SceneMap, TabBar, TabView } from "react-native-tab-view";

import { useLazyGetPassportIndexesFromToQuery } from "../../../api/api.trekspot";
import { Loader } from "../../../common/ui/Loader";
import { COLORS } from "../../../styles/theme";
import { Flags } from "../../../utilities/flags";
import {
  CheckIcon,
  CloseCircleIcon,
  VisaPassportIcon,
  WarningIcon,
} from "../../../utilities/SvgIcons.utility";

const routes = [
  { key: "first", title: "Visa free" },
  { key: "second", title: "Visa required" },
];

const generateColorByType = (type: string) => {
  switch (type) {
    case "e-visa":
      return "#f09300";
    case "visa required":
      return COLORS.red;
    case "no admission":
      return COLORS.black;
    case "visa on arrival":
      return COLORS.green;
    default:
      return COLORS.black;
  }
};

export const VisaCheckerContent = ({ from }: { from: any }) => {
  const navigation = useNavigation();
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);

  const [
    fetchVisaInfo,
    { data: visaCountries, isLoading: isVisaCountriesLoading, isError },
  ] = useLazyGetPassportIndexesFromToQuery();
 
  useEffect(() => {
    if (from && from.iso2) {
      fetchVisaInfo({ from: from.iso2 });
    }
  }, [from]);

  const RenderThreatmentByType = ({ type }: { type: string }) => {
    switch (type) {
      case "warning":
        return (
          <View style={styles.threatment}>
            <WarningIcon size={15} />
            <Text style={styles.threatmentText}>
              Exercise a high degree of caution
            </Text>
          </View>
        );
      case "danger":
        return (
          <View style={styles.threatment}>
            <CloseCircleIcon color={COLORS.red} size={15} />
            <Text style={styles.threatmentText}>Avoid all travel</Text>
          </View>
        );
      default:
        return (
          <View style={styles.threatment}>
            <CheckIcon size={15} color="#1a806b" />
            <Text style={styles.threatmentText}>
              Take normal security precautions
            </Text>
          </View>
        );
    }
  };

  const CountryItem = ({ item }: { item: any }) => {
    //@ts-ignore
    const imagePath = Flags[item?.country?.iso2];

    return item?.country && from.iso2 !== item?.country?.iso2 && (
      <TouchableOpacity
        onPress={() => {
          //@ts-ignore
          navigation.navigate("CountryDetailScreen", {
            countryId: item?.country.id,
          });
        }}
        activeOpacity={0.7}
        style={styles.countryItem}
      >
        <View style={styles.topRow}>
          <View style={styles.countryItemLeft}>
            <ImageBackground
              resizeMode="cover"
              style={styles.flagImage}
              source={imagePath ? imagePath : null} // Set the image source
            /> 
            <Text numberOfLines={1} style={styles.itemTitle}> 
              {item?.country?.name}
            </Text>
          </View>
          {index === 0 ? (
            <Text style={styles.visaStatusText}>{item?.requirement} days</Text>
          ) : (
            <View style={styles.chip}>
              <Text
                style={[
                  styles.visaStatusText,
                  {
                    color: generateColorByType(item.requirement.toLowerCase()),
                  },
                ]}
              >
                {item.requirement}
              </Text>
            </View>
          )}
        </View>
       
        <RenderThreatmentByType type={item?.country?.security} />
      </TouchableOpacity>
    );
  };

  const VisaTab = ({ loading = false }) => {
    return React.useMemo(() => {
      const countries = visaCountries
        ? visaCountries.passportIndex.filter(
            (i) => !isNaN(parseInt(i.requirement))
          )
        : [];
      if (loading || isVisaCountriesLoading) {
        return (
          <View style={{ flex: 1 }}>
            <Loader
              isLoading={loading || isVisaCountriesLoading}
              background="#f8f8f8"
              size="small"
            />
          </View>
        );
      }

      return from?.iso2 ? (
        <FlatList
          data={countries}
          renderItem={({ item }) => <CountryItem item={item} />}
          keyExtractor={(item, index) =>
            item && item.country ? item.country.id : index.toString()
          }
          contentContainerStyle={{ paddingHorizontal: 15, paddingVertical: 30 }}
        />
      ) : (
        <View style={styles.noResultWrapper}>
          <VisaPassportIcon size={85} />
          <Text style={styles.notResultText}>
            Once you select your passport, here will appear countries where you
            can travel without a visa.
          </Text>
        </View>
      );
    }, [loading, visaCountries, isVisaCountriesLoading]);
  };

  const VisaRequiredTab = ({ loading = false }) => {
    return React.useMemo(() => {
      const countries = visaCountries
        ? visaCountries.passportIndex.filter((i) =>
            isNaN(parseInt(i.requirement))
          )
        : [];
      if (loading || isVisaCountriesLoading) {
        return (
          <View style={{ flex: 1 }}>
            <Loader
              isLoading={loading || isVisaCountriesLoading}
              background="#f8f8f8"
              size="small"
            />
          </View>
        );
      }
      return from?.iso2 ? (
        <FlatList
          data={countries}
          renderItem={({ item }) => <CountryItem item={item} />}
          keyExtractor={(item, index) =>
            item && item.country ? item.country.id : index.toString()
          }
          contentContainerStyle={{ paddingHorizontal: 15, paddingVertical: 30 }}
        />
      ) : (
          <View style={styles.noResultWrapper}>
            <VisaPassportIcon size={85} />
            <Text style={styles.notResultText}>
              Once you select your passport, here will appear countries where
              you need a visa to travel.
            </Text>
          </View>
      );
    }, [loading, isVisaCountriesLoading, visaCountries]);
  };

  const renderTabBar: React.FC<any> = (props) => (
    <TabBar
      {...props}
      activeColor="#fff"
      renderLabel={({ route, focused, color }) => (
        <Text style={{ color, fontWeight: "600", fontSize: 16 }}>
          {route.title}
        </Text>
      )}
      indicatorStyle={{ backgroundColor: "#014E57" }}
      indicatorContainerStyle={{ backgroundColor: "#299BA8" }}
    />
  );

  return (
    <TabView
      navigationState={{ index, routes }}
      renderTabBar={renderTabBar}
      renderScene={SceneMap({
        first: VisaTab,
        second: VisaRequiredTab,
      })}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
    />
  );
};

const styles = StyleSheet.create({
  chip: {
    alignItems: "center",
    backgroundColor: "#f2f2f2",
    borderRadius: 5,
    height: 26,
    justifyContent: "center",
    paddingHorizontal: 8,
  },
  countryItem: {
    alignItems: "flex-start",
    backgroundColor: "#fff",
    borderColor: "#eee",
    borderRadius: 15,
    borderWidth: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    marginBottom: 10,
    padding: 15,
  },
  countryItemLeft: {
    alignItems: "flex-start",
    flexDirection: "column",
    width: "60%",
  },
  flagImage: {
    borderColor: "#fafafa",
    borderRadius: 5,
    borderWidth: 1,
    height: 26,
    overflow: "hidden",
    width: 38,
  },
  itemTitle: {
    color: "#000",
    fontSize: 18,
    fontWeight: "600",
    marginLeft: 0,
    marginTop: 15,
    maxWidth: "100%",
  },
  noResultWrapper: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    minHeight: "100%",
  },
  notResultText: {
    color: COLORS.black,
    fontSize: 16,
    fontWeight: "400",
    lineHeight: 22,
    marginTop: 15,
    paddingHorizontal: 35,
    textAlign: "center",
  },
  threatment: {
    alignItems: "center",
    flexDirection: "row",
    marginTop: 15,
    width: "100%",
  },
  threatmentText: {
    alignItems: "center",
    color: "#000",
    fontSize: 12,
    fontWeight: "500",
    marginLeft: 5,
    marginRight: 0,
  },
  topRow: {
    alignItems: "flex-start",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 0,
    width: "100%",
  },
  visaStatusText: {
    color: "#299C79",
    fontSize: 14,
    fontWeight: "600",
    marginTop: 0,
    textTransform: "capitalize",
  },
});
