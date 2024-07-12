import {
  ImageBackground,
  Linking,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { COLORS } from "../../../styles/theme";
import { StarIcon } from "../../../utilities/SvgIcons.utility";
import { styles } from "../_styles";
import { CountryType } from "../../../api/api.types";
import { FlashList } from "@shopify/flash-list";
import { useDishesByISO2Query } from "../../../api/api.trekspot";
import { Loader } from "../../ui/Loader";
import { NotFound } from "../../../components/common/NotFound";
import { Image } from "expo-image";
import { useFocusedTab } from "react-native-collapsible-tab-view";

type DiningProps = {
  country: CountryType;
};

export const Dining: React.FC<DiningProps> = ({ country }) => {
  

  const { isLoading, data, isError } = useDishesByISO2Query({
    iso2: country.iso2,
  });
   const openMap = (name: string) => {
    const scheme = Platform.select({
      ios: "maps://0,0?q=",
      android: "geo:0,0?q=",
    });
    const url = Platform.select({
      ios: `${scheme}${name}`,
      android: `${scheme}${name}`,
    });

    Linking.openURL(url);
  };

  return (
    <>
      <View style={styles.tabContentHeader}>
        <Text style={styles.tabContentHeaderText}>Popular national dishes</Text>
      </View>
     
      {
        !isLoading && !data?.dishes &&  <NotFound />
      }
      <View style={{ minHeight: 200 }}>
        {isLoading ? (
          <Loader isLoading={isLoading} background="" />
        ) : (
          <FlashList
            data={data?.dishes}
            numColumns={2}
            renderItem={({ item }) => (
              <View style={styles.thingsTodoItem} key={item.score}>
                <Image
                  style={styles.thingsTodoItemImage}
                  source={
                    item?.url ? {
                    uri: item?.url,
                  } : require("../../../assets/no-image.png")
                }
                  contentFit="cover"
                  cachePolicy="memory-disk"
                ></Image>

                <View style={styles.thingsTodoItemDetails}>
                  <Text style={styles.thingsTodoItemTitle} selectable={true}>
                    {item?.title}
                  </Text>
                  <View style={styles.thingsTodoItemiIn}>
                    <View
                      style={[
                        styles.ratingLabel,
                        { paddingLeft: 0, paddingBottom: 0 },
                      ]}
                    >
                      <View
                        style={{ position: "relative", top: -1, opacity: 0.8, marginRight: 3 }}
                      >
                        <StarIcon color="#FFBC3E" />
                      </View>
                      <Text
                        style={[
                          styles.ratingText,
                          { color: "#000", marginLeft: 0, fontWeight: "500" },
                        ]}
                      >
                        {item?.rate}
                      </Text>
                    </View>
                    <TouchableOpacity
                      activeOpacity={0.7}
                      style={{
                        flexDirection:
                          item?.restaurant?.length < 12 ? "row" : "column",
                        alignItems: "flex-start",
                        marginTop: 5,
                      }}
                      onPress={() => openMap(item?.restaurant)}
                    >
                      <Text
                        style={{
                          color: COLORS.primary,
                          fontSize: 14,
                          fontWeight: "600",
                        }}
                        selectable={true}
                      >
                        {item?.restaurant}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            )}
            estimatedItemSize={200}
            contentContainerStyle={{
              paddingHorizontal: 10,
            }}
          />
        )}
      </View>
    </>
  );
};
