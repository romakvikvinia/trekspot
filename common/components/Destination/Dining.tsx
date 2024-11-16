import {
  Linking,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { COLORS } from "../../../styles/theme";
import { LocationPin, StarIcon } from "../../../utilities/SvgIcons.utility";
import { styles } from "../_styles";
import { CountryType } from "../../../api/api.types";
import { FlashList } from "@shopify/flash-list";
import { useDishesByISO2Query } from "../../../api/api.trekspot";
import { Loader } from "../../ui/Loader";
import { Image } from "expo-image";

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

      <View style={{ minHeight: 230 }}>
        {isLoading ? (
          <Loader isLoading={isLoading} background="" />
        ) : (
          <FlashList
            data={data?.dishes}
            numColumns={2}
            renderItem={({ item }) => (
              <View style={styles.thingsTodoItem} key={item?.score}>
                <Image
                  style={styles.thingsTodoItemImage}
                  source={
                    item?.url
                      ? {
                          uri: item?.url,
                        }
                      : require("../../../assets/no-image.png")
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
                        style={{
                          position: "relative",
                          top: -1,
                          opacity: 0.8,
                          marginRight: 3,
                        }}
                      >
                        <StarIcon color="#FFBC3E" size={15} />
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
                    {/* {item?.restaurant &&
                    <TouchableOpacity
                      activeOpacity={0.7}
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        marginTop: 12,
                      }}
                      onPress={() => openMap(item?.restaurant)}
                    >
                      <LocationPin width={12} color={COLORS.primary} />
                      <Text
                        style={{
                          color: COLORS.primary,
                          fontSize: 14,
                          fontWeight: "600",
                          marginLeft: 5,
                          paddingRight: 10
                        }}
                        selectable={true}
                      >
                        {item?.restaurant}
                      </Text>
                    </TouchableOpacity>
            } */}
                  </View>
                </View>
              </View>
            )}
            estimatedItemSize={200}
            contentContainerStyle={{
              paddingHorizontal: 10,
              paddingBottom: 25
            }}
          />
        )}
        {!isLoading && data?.dishes && data?.dishes.length === 0 && (
          <View
            style={{
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
              minHeight: 230,
            }}
          >
            <Text
              style={{
                color: COLORS.black,
                fontSize: 18,
                fontWeight: "bold",
              }}
            >
              No data available
            </Text>
            <Text
              style={{
                color: COLORS.gray,
                fontSize: 16,
                fontWeight: "500",
                marginTop: 10,
              }}
            >
              We are working on it and will be available soon
            </Text>
          </View>
        )}
      </View>
    </>
  );
};
