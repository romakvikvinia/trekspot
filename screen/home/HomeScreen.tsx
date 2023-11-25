import React from "react";
import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from "react-native";

import { LinearGradient } from "expo-linear-gradient";
import { MapView } from "./MapView";
import { COLORS, SIZES } from "../../styles/theme";
import {
  AfricaIcon,
  Antarctica,
  AsiaIcon,
  Australia,
  EuropeIcon,
  NAmerica,
  SAmerica,
} from "../../utilities/SvgIcons.utility";

interface HomeProps {}

export const HomeScreen: React.FC<HomeProps> = ({}) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <MapView />
        <ScrollView
          style={styles.mapStats}
          showsVerticalScrollIndicator={false}
        >
          <Text style={{ fontSize: 24, fontWeight: "bold", color: "#000" }}>
            Continents
          </Text>
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "space-between",
              marginTop: 25,
            }}
          >
            <View style={styles.mapStatRow}>
              <View style={styles.leftSide}>
                <EuropeIcon />
                <View>
                  <Text style={styles.mapStatsText}>Europe</Text>
                  <Text
                    style={[styles.mapStatsText, styles.countriesAmountText]}
                  >
                    44 countries
                  </Text>
                </View>
              </View>
              <View style={styles.statWrapp}>
                <Text style={styles.mapStatsPercentText}>0</Text>
                <Text style={styles.percentText}>%</Text>
              </View>
            </View>
            <View style={[styles.mapStatRow, { backgroundColor: "#A88955" }]}>
              <View style={styles.leftSide}>
                <AsiaIcon />
                <View>
                  <Text style={styles.mapStatsText}>Asia</Text>
                  <Text
                    style={[styles.mapStatsText, styles.countriesAmountText]}
                  >
                    49 countries
                  </Text>
                </View>
              </View>

              <View style={styles.statWrapp}>
                <Text style={styles.mapStatsPercentText}>0</Text>
                <Text style={styles.percentText}>%</Text>
              </View>
            </View>
            <View style={[styles.mapStatRow, { backgroundColor: "#C68A4A" }]}>
              <View style={styles.leftSide}>
                <AfricaIcon />
                <View>
                  <Text style={styles.mapStatsText}>Africa</Text>
                  <Text
                    style={[styles.mapStatsText, styles.countriesAmountText]}
                  >
                    54 countries
                  </Text>
                </View>
              </View>
              <View style={styles.statWrapp}>
                <Text style={styles.mapStatsPercentText}>0</Text>
                <Text style={styles.percentText}>%</Text>
              </View>
            </View>
            <View style={[styles.mapStatRow, { backgroundColor: "#438E6A" }]}>
              <View style={styles.leftSide}>
                <NAmerica />
                <View>
                  <Text style={styles.mapStatsText}>N. America</Text>
                  <Text
                    style={[styles.mapStatsText, styles.countriesAmountText]}
                  >
                    23 countries
                  </Text>
                </View>
              </View>
              <View style={styles.statWrapp}>
                <Text style={styles.mapStatsPercentText}>0</Text>
                <Text style={styles.percentText}>%</Text>
              </View>
            </View>
            <View style={[styles.mapStatRow, { backgroundColor: "#893B70" }]}>
              <View style={styles.leftSide}>
                <SAmerica />
                <View>
                  <Text style={styles.mapStatsText}>S. America</Text>
                  <Text
                    style={[styles.mapStatsText, styles.countriesAmountText]}
                  >
                    12 countries
                  </Text>
                </View>
              </View>
              <View style={styles.statWrapp}>
                <Text style={styles.mapStatsPercentText}>0</Text>
                <Text style={styles.percentText}>%</Text>
              </View>
            </View>
            <View style={[styles.mapStatRow, { backgroundColor: "#B13B42" }]}>
              <View style={styles.leftSide}>
                <Australia />
                <View>
                  <Text style={styles.mapStatsText}>Australia</Text>
                  <Text
                    style={[styles.mapStatsText, styles.countriesAmountText]}
                  >
                    6 countries
                  </Text>
                </View>
              </View>
              <View style={styles.statWrapp}>
                <Text style={styles.mapStatsPercentText}>0</Text>
                <Text style={styles.percentText}>%</Text>
              </View>
            </View>
            <View style={[styles.mapStatRow, { backgroundColor: "#4490AA" }]}>
              <View style={styles.leftSide}>
                <Antarctica />
                <View>
                  <Text style={styles.mapStatsText}>Antarctica</Text>
                </View>
              </View>
              <View style={styles.statWrapp}>
                <Text style={styles.mapStatsPercentText}>0</Text>
                <Text style={styles.percentText}>%</Text>
              </View>
            </View>
          </View>
        </ScrollView>
        {/* <View
          style={[
            styles.rowItem,
            {
              borderTopLeftRadius: 30,
              borderTopRightRadius: 30,
            },
          ]}
        >
          <View style={styles.rowItemHeader}>
            <Text style={styles.h2}>Challenges</Text>

            <TouchableOpacity activeOpacity={0.7} style={styles.seeAllButton}>
              <Text style={styles.seeAllButtonTxt}>See all</Text>
            </TouchableOpacity>
          </View>

          <ScrollView
            horizontal
            style={styles.contentBox}
            showsHorizontalScrollIndicator={false}
          >
            <ImageBackground
              style={styles.box}
              resizeMode="cover"
              source={{
                uri: "https://images.unsplash.com/photo-1490077476659-095159692ab5?q=80&w=3251&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
              }}
            >
              <LinearGradient
                style={{ flex: 1 }}
                colors={["rgba(80,0,116,0.4)", "rgba(218,82,140,0.4)"]}
              >
                <TouchableOpacity style={{ flex: 1, padding: 15 }}>
                  <Text
                    style={{
                      color: "#fff",
                      fontSize: 24,
                      fontWeight: "bold",
                    }}
                  >
                    18 - 28 June {"    "}Asia
                  </Text>
                </TouchableOpacity>
              </LinearGradient>
            </ImageBackground>

            <ImageBackground
              style={styles.box}
              resizeMode="cover"
              source={{
                uri: "https://images.unsplash.com/photo-1576485290814-1c72aa4bbb8e?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
              }}
            >
              <LinearGradient
                style={{ flex: 1 }}
                colors={["rgba(80,0,116,0.4)", "rgba(218,82,140,0.4)"]}
              >
                <TouchableOpacity style={{ flex: 1, padding: 15 }}>
                  <Text
                    style={{
                      color: "#fff",
                      fontSize: 24,
                      fontWeight: "bold",
                    }}
                  >
                    18 - 28 June {"    "}Africa
                  </Text>
                </TouchableOpacity>
              </LinearGradient>
            </ImageBackground>
          </ScrollView>
        </View>
        <View style={[styles.rowItem, { paddingTop: 0, paddingBottom: 50 }]}>
          <View style={styles.rowItemHeader}>
            <Text style={styles.h2}>Trips</Text>

            <TouchableOpacity activeOpacity={0.7} style={styles.seeAllButton}>
              <Text style={styles.seeAllButtonTxt}>See all</Text>
            </TouchableOpacity>
          </View>
          <ScrollView
            horizontal
            style={styles.contentBox}
            showsHorizontalScrollIndicator={false}
          >
            <ImageBackground
              style={styles.box}
              resizeMode="cover"
              source={{
                uri: "https://images.unsplash.com/photo-1493707553966-283afac8c358?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
              }}
            >
              <LinearGradient
                style={{ flex: 1 }}
                colors={["rgba(80,0,116,0.4)", "rgba(218,82,140,0.4)"]}
              >
                <TouchableOpacity style={{ flex: 1, padding: 15 }}>
                  <Text
                    style={{
                      color: "#fff",
                      fontSize: 24,
                      fontWeight: "bold",
                    }}
                  >
                    18 - 28 July {"    "}Paris
                  </Text>
                </TouchableOpacity>
              </LinearGradient>
            </ImageBackground>
            <ImageBackground
              style={styles.box}
              resizeMode="cover"
              source={{
                uri: "https://images.unsplash.com/photo-1636360286346-68a0a9a30144?q=80&w=3328&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
              }}
            >
              <LinearGradient
                style={{ flex: 1 }}
                colors={["rgba(80,0,116,0.4)", "rgba(218,82,140,0.4)"]}
              >
                <TouchableOpacity style={{ flex: 1, padding: 15 }}>
                  <Text
                    style={{
                      color: "#fff",
                      fontSize: 24,
                      fontWeight: "bold",
                    }}
                  >
                    18 - 28 Jun {"    "}Edinburgh
                  </Text>
                </TouchableOpacity>
              </LinearGradient>
            </ImageBackground>
          </ScrollView>
        </View> */}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f8f8f8",
  },
  countriesAmountText: {
    fontSize: 8,
    fontWeight: "normal",
    marginTop: 2,
  },
  mapStats: {
    flex: 1,
    paddingHorizontal: 15,
    backgroundColor: "#fff",
    paddingVertical: 25,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  percentText: {
    fontSize: 12,
    color: "#fff",
    marginTop: 8,
  },
  percentView: {
    marginLeft: 1,
    flexDirection: "row",
  },
  mapStatRow: {
    backgroundColor: "#4D3893",
    borderRadius: SIZES.radius * 2,
    paddingVertical: 20,
    paddingLeft: 15,
    paddingRight: 10,
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
    width: "49%",
  },
  statWrapp: {
    flexDirection: "row",
    alignItems: "center",
  },
  mapStatsText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 12,
    marginLeft: 8,
  },
  rowItem: {
    width: "100%",
    paddingHorizontal: 15,
    backgroundColor: "#fff",
    paddingVertical: 25,
  },
  rowItemHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: SIZES.padding,
  },
  mapStatsPercentText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 30,
  },
  leftSide: {
    flexDirection: "row",
    alignItems: "center",
  },
  seeAllButtonTxt: {
    color: COLORS.darkgray,
    fontSize: SIZES.body4,
  },
  h2: {
    fontSize: 22,
    color: "#000",
    fontWeight: "bold",
  },
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
  },

  contentBox: {
    width: "100%",
    marginTop: 15,
  },
  box: {
    width: 230,
    height: 130,
    backgroundColor: "#fafafa",
    borderRadius: 15,
    marginRight: 15,
    overflow: "hidden",
  },
});
