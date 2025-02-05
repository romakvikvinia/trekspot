import { FlashList } from "@shopify/flash-list";
import { Image } from "expo-image";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";

import { useDishesByISO2Query } from "../../../api/api.trekspot";
import { CountryType } from "../../../api/api.types";
import { NodataText } from "../../../components/common/NoDataText";
import { FeedbackCountryDetail } from "../../../components/explore/FeedbackCountryDetail";
import { StarIcon } from "../../../utilities/SvgIcons.utility";
import { Loader } from "../../ui/Loader";
import { styles } from "../_styles";

type DiningProps = {
  iso2: CountryType;
};

export const Dining: React.FC<DiningProps> = ({ iso2 }) => {
  const { isLoading, data, isError } = useDishesByISO2Query({
    iso2,
  });

  const [visibleCount, setVisibleCount] = useState(10);

  const handleShowMore = () => {
    setVisibleCount((prevCount) => prevCount + 10);  
  };

  const visibleData = data?.dishes.slice(0, visibleCount);
  const allItemsVisible = visibleCount >= data?.dishes?.length;

  // const openMap = (name: string) => {
  //   const location = `${name}, Restaurant`;
  //   const scheme = Platform.select({
  //     ios: "maps://0,0?q=",
  //     android: "geo:0,0?q=",
  //   });
  //   const url = Platform.select({
  //     ios: `${scheme}${encodeURIComponent(location)}`,
  //     android: `${scheme}${encodeURIComponent(location)}`,
  //   });

  //   Linking.openURL(url);
  // };

  return (
    <>
      {!isLoading && data?.dishes && data?.dishes.length === 0 && (
        <NodataText />
      )}
      {data?.dishes && data?.dishes.length > 0 && (
        <View style={styles.tabContentHeader}>
          <Text style={styles.tabContentHeaderText}>
            Popular national dishes
          </Text>
        </View>
      )}

      <View style={{ minHeight: 230 }}>
        {isLoading ? (
          <Loader isLoading={isLoading} background="" />
        ) : (
          <>
            <FlashList
              data={visibleData}
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
                      {/* {item?.restaurant && (
                        <Pressable
                          hitSlop={15}
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
                              paddingRight: 10,
                            }}
                            selectable={true}
                          >
                            {item?.restaurant}
                          </Text>
                        </Pressable>
                      )} */}
                    </View>
                  </View>
                </View>
              )}
              estimatedItemSize={200}
              contentContainerStyle={{
                paddingHorizontal: 10,
                paddingBottom: 25,
              }}
            />
            {!allItemsVisible && (
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  marginBottom: 30,
                }}
              >
                <Pressable
                  style={[
                    styles.showMoreButton,
                    {
                      paddingTop: 0,
                    },
                  ]}
                  onPress={handleShowMore}
                >
                  <Text style={styles.showMoreButtonText}>Show more</Text>
                </Pressable>
              </View>
            )}
          </>
        )}
        {!isLoading && data?.dishes?.length > 0 && (
          <View style={{ marginTop: 0, width: "100%" }}>
            <FeedbackCountryDetail />
          </View>
        )}
      </View>
    </>
  );
};
