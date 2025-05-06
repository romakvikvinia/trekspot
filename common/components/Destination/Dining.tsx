import { FlashList } from "@shopify/flash-list";
import { Image } from "expo-image";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { useDishesByISO2Query } from "../../../api/api.trekspot";
import { CountryDishesArgsType, CountryType } from "../../../api/api.types";
import { NodataText } from "../../../components/common/NoDataText";
import { FeedbackCountryDetail } from "../../../components/explore/FeedbackCountryDetail";
import { StarIcon } from "../../../utilities/SvgIcons.utility";
import { styles } from "../_styles";
import { MustTryBadge } from "../MustTryBadge";
import { DishDetail } from "./_DishDetail";

type DiningProps = {
  iso2: CountryType;
  showTitle?: boolean;
  isTrip?: boolean;
};

const LoadingDishCard = ({ isTrip = false }: { isTrip?: boolean }) => {
  return (
    <View style={loadingStyles.dishesContainer}>
      {
         [...Array(8)].map((_, index) => (
            <View style={loadingStyles.dishesContainerItem} key={index}>
              <View style={[loadingStyles.dishesContainerItemImage, {
                 minHeight: isTrip ? 200 : 130
              }]}></View>
              <View style={loadingStyles.dishesContainerItemTitle}></View>
              <View style={loadingStyles.dishesContainerItemRating}></View>
            </View> 
         ))
      }
    </View>
  );
};

export const Dining: React.FC<DiningProps> = ({ iso2, showTitle = true, isTrip = false }) => {
  const { isLoading, data, isError } = useDishesByISO2Query({
    iso2,
  });

  const [visibleCount, setVisibleCount] = useState(10);
  const [selectedDish, setSelectedDish] = useState<CountryDishesArgsType | null>(null);
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
      {data?.dishes && data?.dishes.length > 0 && showTitle && (
        <View style={styles.tabContentHeader}>
            <Text style={styles.tabContentHeaderText}>
              Local dishes
            </Text> 
        </View>
      )}
   
      <View style={{ minHeight: 230}}>
        {isLoading ? (
            <LoadingDishCard isTrip={isTrip} />
        ) : (
          <>
            <FlashList
              data={visibleData}
              numColumns={2}
              renderItem={({ item }) => (
                <Pressable onPress={() => setSelectedDish(item)} style={styles.thingsTodoItem} key={item?.score}>
                <MustTryBadge />
                  <Image
                    style={[styles.thingsTodoItemImage, {
                      minHeight: isTrip ? 200 : 130
                    }]}
                    source={
                      item?.url
                        ? {
                            uri: item?.url,
                          }
                        : require("../../../assets/no-image.png")
                    }
                    contentFit="cover"
                    
                  ></Image>

                  <View style={styles.thingsTodoItemDetails}>
                    <Text style={styles.thingsTodoItemTitle} selectable={true}>
                      {item?.title}
                    </Text>
                    <View style={[styles.thingsTodoItemiIn, {
                      marginTop: 5,
                    }]}>
                      <View
                        style={[
                          styles.ratingLabel,
                          { paddingLeft: 0, paddingBottom: 0 },
                        ]}
                      >
                        <View
                          style={{
                            position: "relative",
                            top: -1
                          }}
                        >
                          <StarIcon color="#FFBC3E" size={15} />
                        </View>
                        <Text
                          style={[
                            styles.ratingText,
                            { color: "#000", marginLeft: 5, fontWeight: "600" },
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
                </Pressable>
              )}
              estimatedItemSize={50}
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
                  hitSlop={15}
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

      <DishDetail visible={!!selectedDish} onClose={() => setSelectedDish(null)} data={selectedDish} />
    </>
  );
};

const loadingStyles = StyleSheet.create({
  dishesContainer: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  dishesContainerItem: {
    borderRadius: 10,
    marginBottom: 25,
    marginHorizontal: 4,
    overflow: "hidden",
    width: "47%"
  }, 
  dishesContainerItemImage: {
    backgroundColor: "#F2F2F7",
    flex: 1,
    height: 130,
    width: "100%",
  },
  dishesContainerItemRating: {
    backgroundColor: "#F2F2F7",
    borderRadius: 10,
    height: 10,
    marginTop: 10,
    width: "70%",
  },
  dishesContainerItemTitle: {
    backgroundColor: "#F2F2F7",
     borderRadius: 10,
     height: 10,
     marginTop: 10,
     width: "100%",
  },
});
