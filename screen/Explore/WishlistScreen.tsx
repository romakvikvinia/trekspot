import { useNavigation } from "@react-navigation/native";
import { FlashList } from "@shopify/flash-list";
import { Image } from "expo-image";
import { useCallback, useEffect, useState } from "react";
import * as Haptics from "expo-haptics";
import {
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useLazyGetSightsQuery } from "../../api/api.trekspot";
import { Loader } from "../../common/ui/Loader";
import { SightDetailModal } from "../../components/explore/sights/SightDetailModal";
import { globalStyles } from "../../styles/globalStyles";
import { COLORS } from "../../styles/theme";
import {
  BackIcon,
  Mark2,
  NoDestinationFoundIcon,
  PinIcon,
  StarIcon,
  VisitedIcon,
  WishlistIcon,
} from "../../utilities/SvgIcons.utility";
import { tripDetailStyles } from "../trip/_tripDetailStyles";
import { NotFound } from "../../components/common/NotFound";
import { _tripScreenStyles } from "../trip/_tripScreenStyles";

export const WishlistScreen = () => {
  const navigation = useNavigation();

  const [topSightDetail, setTopSightDetail] = useState(null);
  const [getSights, { data, isLoading }] = useLazyGetSightsQuery();

  useEffect(() => {
    getSights({ iso2: "DE", city: "Berlin" });
  }, []);

  const handleTopSightClick = (sight) => {
    setTopSightDetail(sight);
  };

  const handleClear = useCallback(() => {
    setTopSightDetail(null);
  }, []);

  return (
    <>
      <SafeAreaView style={globalStyles.safeArea}>
        <View style={globalStyles.screenHeader}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={globalStyles.screenHeaderBackButton}
          >
            <BackIcon size="30" />
          </TouchableOpacity>

          <Text style={globalStyles.screenTitle}>Wishlist list</Text>
          <TouchableOpacity
            style={globalStyles.screenHeaderBackButton}
          ></TouchableOpacity>
        </View>

        {isLoading ? (
          <Loader isLoading={isLoading} size="small" background="#F2F2F7" />
        ) : null}

        {/* In case no data */}
        {
          !isLoading &&
          !data &&
          (
            <View style={{ minHeight: 500, justifyContent: "center" }}>
            <View style={_tripScreenStyles.notFoundView}>
              <NoDestinationFoundIcon />
              <Text style={_tripScreenStyles.notFoundViewTitleText}>
                Your bucket list is looking empty
              </Text>
              <Text style={_tripScreenStyles.notFoundViewText}>
               Go to explore and find an amazing sights.
              </Text>
            </View>
          </View>
          )
        }
   

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 30 }}
        >
          {!isLoading &&
            data &&
            Object.keys(data).map((category) => {
              return (
                <View style={styles.wishlistRow}>
                  <Text style={styles.wishlistRowTitle}>Brazil</Text>
                  <View style={{ minHeight: 10 }}>
                    <FlashList
                      horizontal
                      data={data?.[category]}
                      keyExtractor={(item, index) => `${item.title}-${index}`}
                      renderItem={({ item, index }) => (
                        <>
                          <TouchableOpacity
                            activeOpacity={0.7}
                            style={[
                              tripDetailStyles.sightItem,
                              {
                                padding: 0,
                                width: 200,
                                marginLeft: 0,
                                marginBottom: 0,
                                paddingBottom: 0,
                                marginRight: 15,
                                paddingTop: 0,
                                height: 259,
                                alignItems: "flex-start",
                                justifyContent: "flex-start",
                                display: "flex",
                                flexDirection: "column",
                              },
                            ]}
                            onPress={() => {
                              handleTopSightClick(item);
                              Haptics.impactAsync(
                                Haptics.ImpactFeedbackStyle.Light
                              );
                            }}
                          >
                            <Image
                              style={{
                                width: 200,
                                height: 140,
                                borderRadius: 10,
                                borderBottomLeftRadius: 0,
                                borderBottomRightRadius: 0,
                              }}
                              contentFit="cover"
                              cachePolicy="memory-disk"
                              source={
                                item?.image?.url
                                  ? {
                                      uri: item?.image?.url,
                                    }
                                  : require("../../assets/no-image.png")
                              }
                              key={`img-${item?.title}`}
                            ></Image>

                            <View
                              style={{
                                width: "100%",
                                flex: 1,
                              }}
                            >
                              <View
                                style={[
                                  tripDetailStyles.sightDetails,
                                  {
                                    flexDirection: "column",
                                    marginTop: 10,
                                    paddingHorizontal: 15,
                                    paddingBottom: 10,
                                    marginBottom: 0,
                                  },
                                ]}
                              >
                                <Text
                                  style={tripDetailStyles.sightTitle}
                                  numberOfLines={1}
                                >
                                  {item?.title}
                                </Text>
                                <Text
                                  style={[
                                    tripDetailStyles.sightTitle,
                                    {
                                      fontSize: 14,
                                      color: COLORS.gray,
                                      marginTop: 5,
                                    },
                                  ]}
                                  numberOfLines={1}
                                >
                                  {item?.city}
                                </Text>
                              </View>
                              <View style={styles.actionButtons}>
                                <TouchableOpacity
                                  onPress={() => handleTopSightClick(item)}
                                  activeOpacity={0.7}
                                  style={[
                                    styles.buttonItem,
                                    { borderBottomLeftRadius: 10 },
                                  ]}
                                >
                                  <Text style={styles.buttonItemText}>
                                    Details
                                  </Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                  style={[
                                    styles.buttonItem,
                                    {
                                      borderBottomRightRadius: 10,
                                    },
                                  ]}
                                  // onPress={() => handleAddToTrip(item)}
                                >
                                  <Text
                                    style={[
                                      styles.buttonItemText,
                                      {
                                        color: COLORS.red,
                                      },
                                    ]}
                                  >
                                    Remove
                                  </Text>
                                </TouchableOpacity>
                              </View>
                            </View>
                          </TouchableOpacity>
                        </>
                      )}
                      estimatedItemSize={200}
                      showsHorizontalScrollIndicator={false}
                      showsVerticalScrollIndicator={false}
                      contentContainerStyle={{
                        paddingHorizontal: 20,
                        paddingTop: 15,
                        paddingBottom: 0,
                      }}
                    />
                  </View>
                </View>
              );
            })}
        </ScrollView>
      </SafeAreaView>

      {topSightDetail ? (
        <SightDetailModal data={topSightDetail} closeCallBack={handleClear} />
      ) : null}
    </>
  );
};

const styles = StyleSheet.create({
  wishlistRow: {
    marginTop: 25,
  },
  wishlistRowTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: COLORS.primaryDark,
    paddingHorizontal: 20,
  },
  countryItemActionButton: {
    width: 30,
    height: 30,
    borderRadius: 50,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    right: 10,
    top: 10,
    zIndex: 3,
  },
  actionButtons: {
    justifyContent: "space-between",
    marginTop: 15,
    flexDirection: "row",
  },
  buttonItem: {
    backgroundColor: COLORS.lightGray,
    paddingHorizontal: 10,
    flex: 1,
    textAlign: "center",
    justifyContent: "center",
    flexDirection: "row",
    height: 40,
    alignItems: "center",
  },
  buttonItemText: {
    color: COLORS.black,
    fontSize: 12,
    fontWeight: "500",
  },
});
