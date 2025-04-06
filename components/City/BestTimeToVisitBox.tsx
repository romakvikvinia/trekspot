import { useRef, useState } from "react";
import {
  Animated,
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Portal } from "react-native-portalize";

import { COLORS, SIZES } from "../../styles/theme";
import {
  NonPopularIcon,
  PopularIcon,
  WeatherIcon,
} from "../../utilities/SvgIcons.utility";

export const BestTimeToVisitBox = () => {
  const [visible, setVisible] = useState(false);

  const fadeAnim = useRef(new Animated.Value(0)).current;

  const showPopup = () => {
    setVisible(true);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 150,
      useNativeDriver: true,
    }).start();
  };

  const hidePopup = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 10,
      useNativeDriver: true,
    }).start(() => setVisible(false));
  };

  const hotelPrices = [
    {
      month: "Jan",
      budget: { min: 80, max: 200 },
      luxury: { min: 250, max: 800 },
    },
    {
      month: "Feb",
      budget: { min: 90, max: 220 },
      luxury: { min: 280, max: 900 },
    },
    {
      month: "Mar",
      budget: { min: 85, max: 210 },
      luxury: { min: 260, max: 850 },
    },
    {
      month: "Apr",
      budget: { min: 70, max: 180 },
      luxury: { min: 220, max: 750 },
    },
    {
      month: "May",
      budget: { min: 60, max: 150 },
      luxury: { min: 200, max: 650 },
    },
    {
      month: "Jun",
      budget: { min: 50, max: 130 },
      luxury: { min: 180, max: 500 },
    },
    {
      month: "Jul",
      budget: { min: 45, max: 120 },
      luxury: { min: 160, max: 450 },
    },
    {
      month: "Aug",
      budget: { min: 50, max: 130 },
      luxury: { min: 180, max: 500 },
    },
    {
      month: "Sep",
      budget: { min: 60, max: 150 },
      luxury: { min: 200, max: 600 },
    },
    {
      month: "Oct",
      budget: { min: 80, max: 180 },
      luxury: { min: 250, max: 750 },
    },
    {
      month: "Nov",
      budget: { min: 90, max: 200 },
      luxury: { min: 270, max: 800 },
    },
    {
      month: "Dec",
      budget: { min: 100, max: 300 },
      luxury: { min: 300, max: 1200 },
    },
  ];

  const lowestPrice = hotelPrices.reduce((min, current) => {
    return Math.min(min, current.budget.min);
  }, hotelPrices[0].budget.min);
 

  return (
    <>
      <Pressable
        style={({ pressed }) => [
          styles.boxItem,
          {
            opacity: pressed ? 0.5 : 1,
          },
        ]}
        onPress={showPopup}
      >
        <Text style={styles.boxItemTitle}>Best time to visit</Text>
        <View style={styles.boxItemIn}>
          <View style={styles.boxItemInTitleWrapper}>
            <Text style={styles.boxItemInTitleText}>2 Days</Text>
            <Text style={styles.boxItemInSubTitle}>Typical visit</Text>
          </View>
          <View
            style={[
              styles.boxItemInTitleWrapper,
              {
                marginTop: 10,
              },
            ]}
          >
            <Text style={styles.boxItemInTitleText}>Apr-May</Text>
            <Text style={styles.boxItemInSubTitle}>High season</Text>
          </View>
        </View>
        <Text style={styles.moreDetails}>More details →</Text>
      </Pressable>

      {visible && (
        <Portal>
          <View style={[StyleSheet.absoluteFillObject, styles.bg]}>
            <Animated.View style={[styles.contentCard, { opacity: fadeAnim }]}>
              <ScrollView style={styles.inner}>
                <Text style={styles.sectionTitle}>When to visit</Text>
                <View style={styles.rowGroup}>
                  <View style={styles.row}>
                    <PopularIcon />
                    <View style={styles.textSide}>
                      <Text style={styles.inTitle}>
                        Popular season, Jan-Mar
                      </Text>
                      <Text style={styles.inText}>
                        Popular, higher prices and crowded
                      </Text>
                    </View>
                  </View>
                  <View style={styles.row}>
                    <NonPopularIcon />
                    <View style={styles.textSide}>
                      <Text style={styles.inTitle}>Off season, Jan-Mar</Text>
                      <Text style={styles.inText}>
                        Less popular, lower prices and fewer visitors
                      </Text>
                    </View>
                  </View>
                </View>
                <ScrollView style={styles.weatherRow} showsVerticalScrollIndicator={false}>
                  <View style={styles.rowItem}>
                    <View style={styles.weatherCol}></View>
                    <View style={styles.weatherCol}>
                      <Text style={styles.colTextHeading}>Avg. temp (°C)</Text>
                    </View>
                    <View style={styles.weatherCol}>
                      <Text style={styles.colTextHeading}>Popularity</Text>
                    </View>
                  </View>
                  <View style={styles.rowItem}>
                    <View
                      style={[
                        styles.weatherCol,
                        {
                          alignItems: "flex-start",
                        },
                      ]}
                    >
                      <Text style={styles.monthText}>January</Text>
                    </View>
                    <View style={styles.weatherCol}>
                      <View style={styles.inBox}>
                        <WeatherIcon />
                        <Text style={styles.weatherText}>23° / 34</Text>
                      </View>
                    </View>
                    <View style={styles.weatherCol}>
                      <View style={styles.inBox}>
                        <View style={[styles.circle, styles.fill]}></View>
                        <View style={[styles.circle, styles.fill]}></View>
                        <View style={styles.circle}></View>
                      </View>
                    </View>
                  </View>
                  <View style={styles.rowItem}>
                    <View
                      style={[
                        styles.weatherCol,
                        {
                          alignItems: "flex-start",
                        },
                      ]}
                    >
                      <Text style={styles.monthText}>February</Text>
                    </View>
                    <View style={styles.weatherCol}>
                      <View style={styles.inBox}>
                        <WeatherIcon />
                        <Text style={styles.weatherText}>23° / 34</Text>
                      </View>
                    </View>
                    <View style={styles.weatherCol}>
                      <View style={styles.inBox}>
                        <View style={[styles.circle, styles.fill]}></View>
                        <View style={[styles.circle, styles.fill]}></View>
                        <View style={styles.circle}></View>
                      </View>
                    </View>
                  </View>
                  <View style={styles.rowItem}>
                    <View
                      style={[
                        styles.weatherCol,
                        {
                          alignItems: "flex-start",
                        },
                      ]}
                    >
                      <Text style={styles.monthText}>March</Text>
                    </View>
                    <View style={styles.weatherCol}>
                      <View style={styles.inBox}>
                        <WeatherIcon />
                        <Text style={styles.weatherText}>23° / 34</Text>
                      </View>
                    </View>
                    <View style={styles.weatherCol}>
                      <View style={styles.inBox}>
                        <View style={[styles.circle, styles.fill]}></View>
                        <View style={[styles.circle, styles.fill]}></View>
                        <View style={styles.circle}></View>
                      </View>
                    </View>
                  </View>
                  <View style={styles.rowItem}>
                    <View
                      style={[
                        styles.weatherCol,
                        {
                          alignItems: "flex-start",
                        },
                      ]}
                    >
                      <Text style={styles.monthText}>April</Text>
                    </View>
                    <View style={styles.weatherCol}>
                      <View style={styles.inBox}>
                        <WeatherIcon />
                        <Text style={styles.weatherText}>23° / 34</Text>
                      </View>
                    </View>
                    <View style={styles.weatherCol}>
                      <View style={styles.inBox}>
                        <View style={[styles.circle, styles.fill]}></View>
                        <View style={[styles.circle, styles.fill]}></View>
                        <View style={styles.circle}></View>
                      </View>
                    </View>
                  </View>
                </ScrollView>

                <View style={{ minHeight: 10, marginTop: 25 }}>
                  <Text style={styles.sectionTitle}>Hotel prices</Text>
                  <FlatList
                    data={hotelPrices}
                    horizontal
                    keyExtractor={(item) => item.month}
                    contentContainerStyle={styles.listContainer}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item }) => (
                      <View style={styles.barContainer}>
                        <View
                          style={{
                            height: 80,
                            width: 70,
                            backgroundColor: "#fff",
                            justifyContent: "flex-end"
                          }}
                        >
                          <Text style={{
                            fontSize: 11,
                            fontWeight: "500",
                            color: COLORS.gray,
                          }}>{`$${item.budget.min} - $${item.budget.max}`}</Text>
                          <Pressable
                            style={[
                              styles.bar,
                              {
                                maxHeight: 80,
                                height: (item.budget.max / 100) * 30,
                                backgroundColor: lowestPrice === item.budget.min ? COLORS.primary : "#ebebeb",
                              },
                            ]}
                          ></Pressable>
                        </View>
                        <Text style={styles.month}>{item.month}</Text>
                      </View>
                    )}
                  />
                </View>
              </ScrollView>
              <Pressable onPress={hidePopup} style={styles.closeButton}>
                <Text style={styles.closeButtonText}>Close</Text>
              </Pressable>
            </Animated.View>
          </View>
        </Portal>
      )}
    </>
  );
};
const styles = StyleSheet.create({
  bar: {
    alignItems: "center",
    borderRadius: 5,
    height: 30,
    justifyContent: "center",
    marginVertical: 5,
    paddingHorizontal: 5,
  },
  barContainer: {
    alignItems: "center",
    marginRight: 15,
  },
  bg: {
    alignItems: "center",
    backgroundColor: "rgba(0,0,0, 0.4)",
    justifyContent: "center",
    position: "absolute",
    zIndex: 1,
  },
  boxItem: {
    backgroundColor: "#fff",
    borderColor: "#f2f2f2",
    borderRadius: 15,
    borderWidth: 1,
    height: 185,
    marginRight: 15,
    padding: 15,
    width: 180,
  },
  boxItemIn: {
    flexDirection: "column",
    marginTop: 15,
  },
  boxItemInSubTitle: {
    color: COLORS.gray,
    fontSize: 12,
    fontWeight: "500",
    marginTop: 5,
    width: "100%",
  },
  boxItemInTitleText: {
    color: COLORS.black,
    fontSize: 18,
    fontWeight: "600",
    maxWidth: "80%",
  },
  boxItemInTitleWrapper: {
    flexDirection: "column",
    flexWrap: "wrap",
  },
  boxItemTitle: {
    fontSize: 12,
    fontWeight: "400",
    textTransform: "uppercase",
  },
  circle: {
    backgroundColor: "#ccc",
    borderRadius: 100,
    height: 10,
    marginRight: 5,
    width: 10,
  },
  closeButton: {
    backgroundColor: "#f2f2f2",
    borderRadius: 100,
    marginTop: 10,
    padding: 15,
    width: "100%",
  },
  closeButtonText: {
    color: COLORS.black,
    fontSize: 15,
    fontWeight: "500",
    textAlign: "center",
  },
  colTextHeading: {
    color: COLORS.darkgray,
    fontSize: 14,
    fontWeight: "400",
  },
  contentCard: {
    backgroundColor: "#fff",
    borderRadius: 15,
    elevation: 5,
    height: 400,
    justifyContent: "space-between",
    maxWidth: 500,
    minHeight: SIZES.height - 200,
    padding: 15,
    paddingRight: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    width: SIZES.width - 30,
    zIndex: 1,
  },
  fill: {
    backgroundColor: COLORS.primary,
  },
  inBox: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
  },
  inText: {
    color: COLORS.black,
    fontSize: 13,
    maxWidth: "100%",
  },
  inTitle: {
    color: COLORS.black,
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 2,
  },
  inner: {
    flex: 1,
    paddingRight: 10,
  },
  listContainer: {
    paddingHorizontal: 10,
    paddingTop: 40
  },
  month: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  monthText: {
    color: COLORS.black,
    fontSize: 14,
    fontWeight: "500",
  },
  moreDetails: {
    color: COLORS.primary,
    fontSize: 14,
    marginTop: 15,
  },
  priceText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
  row: {
    alignItems: "center",
    flexDirection: "row",
    marginBottom: 20,
  },
  rowGroup: {
    marginTop: 25,
    width: "100%",
  },
  rowItem: {
    borderBottomColor: "#f2f2f2",
    borderBottomWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
    paddingBottom: 15,
    width: "100%",
  },
  sectionTitle: {
    color: COLORS.black,
    fontSize: 20,
    fontWeight: "500",
  },
  textSide: {
    marginLeft: 12,
  },
  weatherCol: {
    alignItems: "center",
    justifyContent: "center",
    width: "32%",
  },
  weatherRow: {
    height: 200,
    width: "100%"
  },
  weatherText: {
    color: COLORS.darkgray,
    fontSize: 14,
    marginLeft: 5,
  },
});
