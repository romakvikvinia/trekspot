import { Image } from "expo-image";
import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Constants from "expo-constants";

import { enGB, registerTranslation } from "react-native-paper-dates";
registerTranslation("en", enGB);

import { useNavigation } from "@react-navigation/native";
import {
  BackIcon,
  StarIcon,
} from "../../utilities/SvgIcons.utility";
import { FlashList } from "@shopify/flash-list";
import { useDishesByISO2Query } from "../../api/api.trekspot";
import { Loader } from "../../common/ui/Loader";
import { styles } from "../../common/components/_styles";
import { globalStyles } from "../../styles/globalStyles";
import { NodataText } from "../../components/common/NoDataText";

export const TripDishes = ({ route }) => {
  const navigation = useNavigation();
  const iso2 = route?.params?.iso2;

  const { isLoading, data, isError } = useDishesByISO2Query({
    iso2: iso2,
  });
  // const openMap = (name: string) => {
  //   const scheme = Platform.select({
  //     ios: "maps://0,0?q=",
  //     android: "geo:0,0?q=",
  //   });
  //   const url = Platform.select({
  //     ios: `${scheme}${name}`,
  //     android: `${scheme}${name}`,
  //   });

  //   Linking.openURL(url);
  // };
  const blurhash = "L6PZfSi_.AyE_3t7t7R**0o#DgR4";

  return (
    <SafeAreaView style={dishStyles.safeArea}>
      <View style={globalStyles.screenHeader}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={globalStyles.screenHeaderBackButton}
        >
          <BackIcon size="30" />
        </TouchableOpacity>

        <Text style={globalStyles.screenTitle}>National dishes</Text>
        <TouchableOpacity
          style={globalStyles.screenHeaderBackButton}
        ></TouchableOpacity>
      </View>

      {isLoading && (
       <View style={{height: 200}}>
         <Loader isLoading={isLoading} size="small" background="#F2F2F7" />
       </View>
      )}

      {!isLoading && !data?.dishes.length && <NodataText />}

  
      {!isLoading && (
        <View
          style={{
            minHeight: 20,
            paddingHorizontal: 0,
            width: "100%",
            flex: 1,
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
                    // backgroundColor: "#fafafa",
                    marginRight: index % 2 === 0 ? "auto" : undefined,
                    marginLeft: index % 2 === 1 ? "auto" : undefined,
                    marginTop: 0,
                    marginBottom: 15,
                  },
                ]}
                key={item.score}
              >
                <View style={dishStyles.imgWrapper}>
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
                </View>

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
                    {/* {!!item?.restaurant ? (
                      <TouchableOpacity
                        activeOpacity={0.7}
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          marginTop: 10,
                        }}
                        onPress={() => openMap(item?.restaurant)}
                      >
                         <LocationPin width={12} color={COLORS.primary} />
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
                    ) : null} */}
                  </View>
                </View>
              </View>
            )}
            estimatedItemSize={50}
            contentContainerStyle={{
              paddingHorizontal: 15,
              paddingTop: 25,
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
  imgWrapper:{
    width: "100%",
    minHeight: 130,
    height: 130,
    backgroundColor: "#fafafa",
    borderRadius: 15
  },
});
