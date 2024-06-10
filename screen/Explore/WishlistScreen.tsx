import { useNavigation } from "@react-navigation/native";
import { FlashList } from "@shopify/flash-list";
import { Image } from "expo-image";
import { useEffect } from "react";
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
import { globalStyles } from "../../styles/globalStyles";
import { COLORS } from "../../styles/theme";
import { BackIcon, Mark2, PinIcon, StarIcon, VisitedIcon } from "../../utilities/SvgIcons.utility";
import { tripDetailStyles } from "../trip/_tripDetailStyles";

export const WishlistScreen = () => {
  const navigation = useNavigation();

  const [getSights, { data, isLoading }] = useLazyGetSightsQuery();

  useEffect(() => {
    getSights({ iso2: "DE", city: "Berlin" });
  }, []);

  return (
    <SafeAreaView style={globalStyles.safeArea}>
      <View style={globalStyles.screenHeader}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={globalStyles.screenHeaderBackButton}
        >
          <BackIcon size="30" />
        </TouchableOpacity>

        <Text style={globalStyles.screenTitle}>Bucketlist</Text>
        <TouchableOpacity
          style={globalStyles.screenHeaderBackButton}
        ></TouchableOpacity>
      </View>

      {isLoading ? <Loader isLoading={isLoading} size="large" background="" /> : null}

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{paddingBottom: 30}}>
        {!isLoading &&
          data &&
          Object.keys(data).map((category) => {
            return (
              <View style={styles.wishlistRow}>
                <Text style={styles.wishlistRowTitle}>{category}</Text>
                <View style={{ minHeight: 10 }}>
                  <FlashList
                    horizontal
                    data={data?.[category]}
                    keyExtractor={(item, index) => `${item.title}-${index}`}
                    renderItem={({ item, index }) => (
                      <TouchableOpacity
                        activeOpacity={0.7}
                        style={[
                          tripDetailStyles.sightItem,
                          { padding: 0, width: 200, marginLeft: 0, marginBottom: 0, marginRight: 15 },
                        ]}
                        // onPress={() => handleTopSightClick(item)}
                      >
                         <TouchableOpacity
                            style={[
                                styles.countryItemActionButton,
                                // state.isVisited ? styles.countryActive : null,
                            ]}
                            // onPress={() => handleVisited(iso2)}
                            >
                               <Mark2 color="#fff" />
                            </TouchableOpacity>
                        <Image
                          style={{
                            width: 200,
                            height: 140,
                            borderRadius: 10,
                            borderBottomLeftRadius: 0,
                            borderBottomRightRadius: 0,
                          }}
                          resizeMode="cover"
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
                          style={[
                            tripDetailStyles.sightDetails,
                            {
                              flexDirection: "column",
                              marginTop: 10,
                              paddingHorizontal: 15,
                              paddingBottom: 10,
                              marginBottom: 0
                            },
                          ]}
                        >
                          <Text style={tripDetailStyles.sightTitle} numberOfLines={1}>
                            {item?.title}
                          </Text>
                          <View style={tripDetailStyles.ratingLabel}>
                            {item?.rate ? (
                              <>
                                <View
                                  style={{
                                    position: "relative",
                                    top: -1,
                                    opacity: 0.8,
                                    marginRight: 3,
                                  }}
                                >
                                  <StarIcon color="#FFBC3E" />
                                </View>
                                <Text style={[tripDetailStyles.ratingText]}>
                                  {item?.rate}
                                </Text>
                              </>
                            ) : null}
                          </View>
                        </View>
                      </TouchableOpacity>
                    )}
                    estimatedItemSize={200}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{
                      paddingHorizontal: 15,
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
  );
};

const styles = StyleSheet.create({
  wishlistRow: {
    marginTop: 25
  },
  wishlistRowTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: COLORS.primaryDark,
    paddingHorizontal: 15
  },
  countryItemActionButton: {
    width: 30,
    height: 30,
    borderRadius: 50,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    right: 10,
    top: 10,
    zIndex: 3,
  },
});
