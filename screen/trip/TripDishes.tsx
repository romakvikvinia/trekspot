import { Image } from "expo-image";
import React from "react";
import {
  Linking,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Constants from "expo-constants";

import { enGB, he, registerTranslation } from "react-native-paper-dates";
registerTranslation("en", enGB);

import { useNavigation } from "@react-navigation/native";
import {
  BackIcon,
  InnovationIcon,
  LocationLinearIcon,
  StarIcon,
} from "../../utilities/SvgIcons.utility";
import { FlashList } from "@shopify/flash-list";
import { useDishesByISO2Query } from "../../api/api.trekspot";
import { Loader } from "../../common/ui/Loader";
import { NotFound } from "../../components/common/NotFound";
import { styles } from "../../common/components/_styles";
import { COLORS, SIZES } from "../../styles/theme";

export const TripDishes = () => {
  const navigation = useNavigation();

  const { isLoading, data, isError } = useDishesByISO2Query({
    iso2: "GE",
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
  const blurhash = "L6PZfSi_.AyE_3t7t7R**0o#DgR4";

  return (
    <SafeAreaView style={dishStyles.safeArea}>
      <View style={dishStyles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={dishStyles.backButton}
        >
          <BackIcon size="30" />
        </TouchableOpacity>

        <Text style={dishStyles.destination}>National dishes</Text>
        <TouchableOpacity style={dishStyles.backButton}></TouchableOpacity>
      </View>

      {!isLoading && !data?.dishes && <NotFound />}

      {isLoading && <Loader isLoading={isLoading} background="#F2F2F7" />}
      {!isLoading && (
        <View
          style={{
            minHeight: SIZES.height,
            paddingHorizontal: 0,
            width: "100%",
          }}
        >
          <FlashList
            data={data?.dishes}
            numColumns={2}
            renderItem={({ item, index }) => (
              <View
                style={[
                  styles.thingsTodoItem,
                  {
                    backgroundColor: "#fafafa",
                    marginRight: index % 2 === 0 ? "auto" : undefined,
                    marginLeft: index % 2 === 1 ? "auto" : undefined,
                  },
                ]}
                key={item.score}
              >
                <Image
                  style={styles.thingsTodoItemImage}
                  placeholder={blurhash}
                  source={
                    item?.url
                      ? {
                          uri: item?.url,
                        }
                      : require("../../assets/no-image.png")
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
                    {!!item?.restaurant ? (
                      <TouchableOpacity
                        activeOpacity={0.7}
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          marginTop: 10,
                        }}
                        onPress={() => openMap(item?.restaurant)}
                      >
                        <LocationLinearIcon size={12} color={COLORS.primary} />
                        <Text
                          style={{
                            color: COLORS.primary,
                            fontSize: 12,
                            fontWeight: "500",
                            marginLeft: 5,
                            maxWidth: "90%",
                          }}
                          selectable={true}
                        >
                          {item?.restaurant}
                        </Text>
                      </TouchableOpacity>
                    ) : null}
                  </View>
                </View>
              </View>
            )}
            estimatedItemSize={50}
            contentContainerStyle={{
              paddingHorizontal: 15,
              paddingTop: 15,
            }}
            showsVerticalScrollIndicator={false}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

const dishStyles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F2F2F7",
    paddingTop: Constants?.statusBarHeight + 10,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    marginBottom: 10,
  },
  destination: {
    fontSize: 18,
    fontWeight: "500",
  },
  backButton: {
    width: 30,
  },
});
