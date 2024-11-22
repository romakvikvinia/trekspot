import { useState } from "react";
import {
  FlatList,
  ImageBackground,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { SceneMap, TabBar, TabView } from "react-native-tab-view";
import { useAllCountriesQuery } from "../../../api/api.trekspot";
import { Flags } from "../../../utilities/flags";
import { COLORS } from "../../../styles/theme";
import {
  CheckIcon,
  CloseCircleIcon,
  VisaPassportIcon,
  WarningIcon,
} from "../../../utilities/SvgIcons.utility";
import { Loader } from "../../../common/ui/Loader";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

const routes = [
  { key: "first", title: "Visa free" },
  { key: "second", title: "Visa required" },
];

const TYPES = ["E-visa", "Visa required", "No admission", "Visa on arrival"];

const generateColorByType = (type) => {
  switch (type) {
    case "E-visa":
      return "#f09300";
    case "Visa required":
      return COLORS.red;
    case "No admission":
      return COLORS.black;
    case "Visa on arrival":
      return COLORS.green;
    default:
      return COLORS.black;
  }
};

export const VisaCheckerContent = ({ from }) => {
  const navigation = useNavigation();
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);

  let { data: countryList } = useAllCountriesQuery({});

  const RenderThreatmentByType = ({ type }) => {
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

  const CountryItem = ({ item }) => {
    const imagePath = Flags[item.iso2];

    return (
      <TouchableOpacity
        onPress={() =>  navigation.navigate("CountryDetailScreen", { countryId: item?.id })}
         activeOpacity={0.7} 
         style={styles.countryItem}>
        <View style={styles.topRow}>
          <View style={styles.countryItemLeft}>
            <ImageBackground
              resizeMode="cover"
              style={styles.flagImage}
              source={imagePath ? imagePath : null} // Set the image source
            />
            <Text numberOfLines={1} style={styles.itemTitle}>
              {item.name}
            </Text>
          </View>
          {index === 0 ? (
            <Text style={styles.visaStatusText}>90 days</Text>
          ) : (
            <View style={styles.chip}>
              <Text
                style={[
                  styles.visaStatusText,
                  {
                    color: generateColorByType(
                      TYPES[Math.floor(Math.random() * TYPES.length)]
                    ),
                  },
                ]}
              >
                {TYPES[Math.floor(Math.random() * TYPES.length)]}
              </Text>
            </View>
          )}
        </View>
        <RenderThreatmentByType type="secure" />
      </TouchableOpacity>
    );
  };

  const VisaTab = ({ loading = false }) => {
    if (loading) {
      return (
        <View style={{ flex: 1 }}>
          <Loader isLoading={loading} background="#f8f8f8" size="small" />
        </View>
      );
    }

   return from?.iso2 ? (
      <FlatList
        data={countryList?.allCountries?.slice(0, 10)}
        renderItem={({ item }) => <CountryItem item={item} />}
        keyExtractor={(item) => item.id}
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
  };

  const VisaRequiredTab = ({ loading = false }) => {
    if (loading) {
      return (
        <View style={{ flex: 1 }}>
          <Loader isLoading={loading} background="#f8f8f8" size="small" />
        </View>
      );
    }

   return from?.iso2 ? (
      <FlatList
        data={countryList?.allCountries?.slice(0, 10)}
        renderItem={({ item }) => <CountryItem item={item} />}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingHorizontal: 15, paddingVertical: 30 }}
      />
    ) : (
      <View style={styles.noResultWrapper}>
        <VisaPassportIcon size={85} />
        <Text style={styles.notResultText}>
          Once you select your passport, here will appear countries where you
          need a visa to travel.
        </Text>
      </View>
    );
  };

  const renderTabBar = (props) => (
    <TabBar {...props} 
      activeColor="#fff"
      renderLabel={({ route, focused, color }) => (
        <Text style={{ color, fontWeight: "600", fontSize: 16 }}>{route.title}</Text>
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
  countryItem: {
    flexDirection: "column",
    alignItems: "flex-start",
    marginBottom: 10,
    justifyContent: "space-between",
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 15,
    borderWidth: 1,
    borderColor: "#eee",
  },
  topRow: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 0,
    alignItems: "flex-start",
  },
  threatment: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 15,
    width: "100%",
  },
  threatmentText: {
    alignItems: "center",
    color: "#000",
    fontSize: 12,
    marginRight: 0,
    fontWeight: "500",
    marginLeft: 5,
  },
  notResultText: {
    textAlign: "center",
    fontSize: 16,
    color: COLORS.black,
    fontWeight: "400",
    marginTop: 15,
    paddingHorizontal: 35,
    lineHeight: 22,
  },
  noResultWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  chip: {
    backgroundColor: "#f2f2f2",
    paddingHorizontal: 8,
    borderRadius: 5,
    height: 26
  },
  countryItemLeft: {
    flexDirection: "column",
    alignItems: "flex-start",
    width: "70%",
  },
  flagImage: {
    width: 38,
    height: 26,
    borderRadius: 5,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#fafafa",
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginLeft: 0,
    color: "#000",
    maxWidth: "80%",
    marginTop: 10,
  },
  visaStatusText: {
    color: "#299C79",
    fontSize: 14,
    fontWeight: "600",
    marginTop: 5,
  },
});
