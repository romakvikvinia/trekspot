import { Image } from "expo-image";
import React from "react";
import {
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
import { BackIcon } from "../../utilities/SvgIcons.utility";
import { FlashList } from "@shopify/flash-list";
import { COLORS } from "../../styles/theme";
import { globalStyles } from "../../styles/globalStyles";

interface TripProps {}

export const TripInsights: React.FC<TripProps> = ({ route }) => {
  const navigation = useNavigation();

  const handleNavigate = () => {
    if (route?.params?.directVisit) {
      navigation.navigate("TripQuickInsightsDetail", {
        directVisit: true,
      });
    } else {
      navigation.navigate("TripInsightDetailScreen");
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={globalStyles.screenHeader}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={globalStyles.screenHeaderBackButton}
        >
          <BackIcon size="30" />
        </TouchableOpacity>

        <Text style={globalStyles.screenTitle}>Dubai</Text>
        <TouchableOpacity style={globalStyles.screenHeaderBackButton}></TouchableOpacity>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ marginTop: 25 }}></View>

        <View style={[styles.topicsRow, { marginTop: 0 }]}>
          <View style={styles.headingItem}>
            <Text style={styles.topicsRowTitle}>Moving about</Text>
            <View
              style={[styles.shapeBg, { backgroundColor: "#ffd5d1" }]}
            ></View>
          </View>
          <View style={{ flexGrow: 1 }}>
            <FlashList
              horizontal
              contentContainerStyle={{
                paddingHorizontal: 20,
              }}
              showsHorizontalScrollIndicator={false}
              data={[
                {
                  title: "title long title item goes here",
                  img: "https://cdn.pixabay.com/photo/2016/08/06/12/34/taxi-1574278_1280.jpg",
                },
                {
                  title: "title2",
                  img: "https://cdn.pixabay.com/photo/2022/01/06/11/36/dresden-6919279_1280.jpg",
                },
                {
                  title: "title2",
                  img: "https://cdn.pixabay.com/photo/2016/11/23/17/35/metro-1853976_1280.jpg",
                },
              ]}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={handleNavigate}
                  activeOpacity={0.7}
                  style={styles.card}
                >
                  <Image
                    style={styles.cardImage}
                    resizeMode="cover"
                    source={{
                      uri: item?.img,
                    }}
                  />
                  <Text style={styles.cardTitle}>{item?.title}</Text>
                </TouchableOpacity>
              )}
              estimatedItemSize={10}
            />
          </View>
        </View>
        <View style={styles.topicsRow}>
          <View style={styles.headingItem}>
            <Text style={styles.topicsRowTitle}>Health</Text>
            <View
              style={[styles.shapeBg, { backgroundColor: "#d2cbaf" }]}
            ></View>
          </View>
          <View style={{ flexGrow: 1 }}>
            <FlashList
              horizontal
              contentContainerStyle={{
                paddingHorizontal: 15,
              }}
              showsHorizontalScrollIndicator={false}
              data={[
                {
                  title: "title long title item goes here",
                  img: "https://cdn.pixabay.com/photo/2018/03/27/18/44/ambulance-3266960_1280.jpg",
                },
                {
                  title: "title2",
                  img: "https://cdn.pixabay.com/photo/2019/04/03/03/05/medical-equipment-4099428_1280.jpg",
                },
                
              ]}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={handleNavigate}
                  activeOpacity={0.7}
                  style={styles.card}
                >
                  <Image
                    style={styles.cardImage}
                    resizeMode="cover"
                    source={{
                      uri: item?.img,
                    }}
                  />
                  <Text style={styles.cardTitle}>{item?.title}</Text>
                </TouchableOpacity>
              )}
              estimatedItemSize={10}
            />
          </View>
        </View>
        <View style={styles.topicsRow}>
          <View style={styles.headingItem}>
            <Text style={styles.topicsRowTitle}>All about money</Text>
            <View
              style={[styles.shapeBg, { backgroundColor: "#afc1d2" }]}
            ></View>
          </View>
          <View style={{ flexGrow: 1 }}>
            <FlashList
              horizontal
              contentContainerStyle={{
                paddingHorizontal: 15,
              }}
              showsHorizontalScrollIndicator={false}
              data={[
                {
                  title: "title long title item goes here",
                  img: "https://cdn.pixabay.com/photo/2014/04/04/20/02/atm-313958_1280.jpg",
                },
                {
                  title: "title2",
                  img: "https://cdn.pixabay.com/photo/2016/10/18/15/13/ec-cash-1750490_1280.jpg",
                },
              ]}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={handleNavigate}
                  activeOpacity={0.7}
                  style={styles.card}
                >
                  <Image
                    style={styles.cardImage}
                    resizeMode="cover"
                    source={{
                      uri: item?.img,
                    }}
                  />
                  <Text style={styles.cardTitle}>{item?.title}</Text>
                </TouchableOpacity>
              )}
              estimatedItemSize={10}
            />
          </View>
        </View>
        <View style={styles.topicsRow}>
          <View style={styles.headingItem}>
            <Text style={styles.topicsRowTitle}>Moving about</Text>
            <View
              style={[styles.shapeBg, { backgroundColor: "#cfafd2" }]}
            ></View>
          </View>
          <View style={{ flexGrow: 1 }}>
            <FlashList
              horizontal
              contentContainerStyle={{
                paddingHorizontal: 15,
              }}
              showsHorizontalScrollIndicator={false}
              data={[
                {
                  title: "title long title item goes here",
                  img: "https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?q=10&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                },
                {
                  title: "title2",
                  img: "https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?q=10&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                },
              ]}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={handleNavigate}
                  activeOpacity={0.7}
                  style={styles.card}
                >
                  <Image
                    style={styles.cardImage}
                    resizeMode="cover"
                    source={{
                      uri: item?.img,
                    }}
                  />
                  <Text style={styles.cardTitle}>{item?.title}</Text>
                </TouchableOpacity>
              )}
              estimatedItemSize={10}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F2F2F7",
    paddingTop: Constants?.statusBarHeight + 10,
  },
  headingItem: {
    position: "relative",
    paddingHorizontal: 20,
  },
  shapeBg: {
    position: "absolute",
    width: 100,
    height: 10,
    left: 15,
    bottom: 15,
    borderRadius: 10,
    opacity: 0.6
  },
  noteCardTitle: {
    fontSize: 20,
    fontWeight: "500",
    color: COLORS.primary,
    maxWidth: "80%",
  },
  noteCardDesc: {
    fontSize: 14,
    fontWeight: "400",
    color: COLORS.black,
    marginTop: 10,
    lineHeight: 20,
  },
  noteCard: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderLeftWidth: 6,
    borderLeftColor: COLORS.primaryDark,
    marginRight: 15,
    padding: 15,
    width: 320,
    height: 150,
    overflow: "hidden",
    borderRadius: 15,
    // borderRadius: 15,
    // shadowColor: "#ccc",
    // shadowOffset: { width: 0, height: 1 },
    // shadowOpacity: 0.9,
    // shadowRadius: 10,
    // elevation: 10,
    position: "relative",
  },
  dangerType: {
    borderColor: COLORS.red,
    borderLeftColor: COLORS.red,
  },
  innovationIcon: {
    position: "absolute",
    right: 10,
    top: 10,
  },
  card: {
    width: 160,
    minHeight: 160,
    marginRight: 15,
  },
  cardImage: {
    width: 160,
    height: 130,
    borderRadius: 15,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: COLORS.black,
    marginTop: 10,
  },
  topicsRow: {
    width: "100%",
    marginBottom: 35,
    flexGrow: 1,
  },
  topicsRowTitle: {
    fontSize: 22,
    fontWeight: "500",
    color: COLORS.black,
    paddingHorizontal: 0,
    marginBottom: 15,
    zIndex: 1,
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
    color: "#000"
  },
  backButton: {
    width: 30,
  },
});
