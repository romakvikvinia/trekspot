import React, { useCallback, useMemo, useRef, useState } from "react";
import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import {
  LivedIcon,
  MapSvg,
  Mark,
  Mark2,
  Share,
  VisitedIcon,
} from "../../utilities/SvgIcons.utility";

import { Modalize } from "react-native-modalize";
import { Portal } from "react-native-portalize";
import { ReactNativeZoomableView } from "@openspacelabs/react-native-zoomable-view";
import { CountriesList } from "../../utilities/countryList";
import { Flags } from "../../utilities/flags";
import { COLORS, SIZES } from "../../styles/theme";
import { LinearGradient } from "expo-linear-gradient";
import { FlashList } from "@shopify/flash-list";

interface HomeProps {}

export const HomeScreen: React.FC<HomeProps> = ({}) => {
  const modalRef = useRef<Modalize>(null);
  const onOpen = useCallback(() => {
    if (modalRef.current) modalRef.current.open();
  }, []);
  const [visitedCountry, setVisitedCountry] = useState(null);
  const [livedCountry, setLivedCountry] = useState(null);

  const Country = ({ item }: any) => {
    // Assuming that `item` contains the ISO2 country code
    const countryCode = item.iso2 as string;

    // Check if the image path exists in the mapping
    // @ts-ignore
    const imagePath = Flags[countryCode];

    return (
      <View style={styles.countryItem}>
        <View style={styles.countryItemLeft}>
          <View
            style={{
              width: 31,
              height: 21,
              borderRadius: 3,
              overflow: "hidden",
              borderWidth: 1,
              borderColor: "#fafafa",
            }}
          >
            <ImageBackground
              resizeMode="cover"
              style={{
                width: 30,
                height: 20,
                backgroundColor: "#ddd",
              }}
              source={imagePath ? imagePath : null} // Set the image source
            />
          </View>
          <Text style={styles.itemTitle}>{item.name}</Text>
        </View>
        <View style={styles.countryItemActions}>
          {console.log(
            "visitedCountry === countryCode",
            visitedCountry === countryCode
          )}
          <TouchableOpacity
            style={[
              styles.countryItemActionButton,
              visitedCountry === countryCode ? styles.countryActive : null,
            ]}
            onPress={() => setVisitedCountry(countryCode)}
          >
            <VisitedIcon active={visitedCountry === countryCode} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.countryItemActionButton,
              livedCountry === countryCode ? styles.countryLived : null,
            ]}
            onPress={() => setLivedCountry(countryCode)}
          >
            <LivedIcon active={livedCountry === countryCode} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView
          style={styles.container}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.mapContainer}>
            <View style={styles.topActions}>
              <View style={styles.left}>
                <TouchableOpacity
                  onPress={() => onOpen()}
                  style={[styles.btn, { marginRight: 10 }]}
                >
                  <Mark />
                  <Text style={styles.txt}>Add visit</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btn}>
                  <Mark2 />
                  <Text style={styles.txt}>Wishlist</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity style={styles.btn}>
                <Share />
                <Text style={styles.txt}>Share</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => onOpen()}
              style={{
                padding: 15,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <MapSvg />
            </TouchableOpacity>

            <View style={styles.row}>
              <View style={[styles.rowBox]}>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Text style={styles.lg}>24</Text>
                  <Text
                    style={[
                      styles.sublabel,
                      { marginLeft: 2, marginBottom: 2 },
                    ]}
                  >
                    %
                  </Text>
                </View>

                <Text style={styles.statLabel}>World</Text>
              </View>
              <View style={[styles.rowBox]}>
                <View style={styles.amountView}>
                  <Text style={styles.lg}>34</Text>
                  <View style={styles.labelView}>
                    <Text style={styles.sublabel}>/</Text>
                    <Text style={[styles.sublabel, { marginTop: 2 }]}>
                      {" "}
                      195
                    </Text>
                  </View>
                </View>

                <Text style={styles.statLabel}>Countries</Text>
              </View>
              <View style={[styles.rowBox]}>
                <View style={styles.amountView}>
                  <Text style={styles.lg}>3</Text>
                  <View style={styles.labelView}>
                    <Text style={styles.sublabel}>/</Text>
                    <Text style={[styles.sublabel, { marginTop: 2 }]}> 7</Text>
                  </View>
                </View>
                <Text style={styles.statLabel}>Continents</Text>
              </View>
            </View>
          </View>

          <View style={styles.rowItem}>
            <Text style={styles.h2}>Challenges</Text>

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
            <Text style={styles.h2}>Trips</Text>

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
          </View>
        </ScrollView>
        <Portal>
          <Modalize
            ref={modalRef}
            modalTopOffset={65}
            handlePosition="inside"
            HeaderComponent={
              <View style={{ padding: 15 }}>
                <Text>Header</Text>
              </View>
            }
          >
            <View style={{ flex: 1, height: SIZES.height - 200 }}>
              <FlashList
                data={CountriesList}
                renderItem={({ item }) => <Country item={item} />}
                estimatedItemSize={200}
              />
            </View>
          </Modalize>
        </Portal>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f8f8f8",
  },
  amountView: {
    flexDirection: "row",
    alignItems: "center",
  },
  labelView: {
    position: "relative",
    bottom: 3,
    marginLeft: 4,
    flexDirection: "row",
    alignItems: "center",
  },
  sublabel: {
    fontSize: 14,
    position: "relative",
    flexDirection: "row",
    alignItems: "center",
    lineHeight: 25,
    color: COLORS.darkgray,
  },
  statLabel: {
    fontSize: 12,
    color: COLORS.darkgray,
  },
  rowItem: {
    width: "100%",
    paddingHorizontal: 15,
    backgroundColor: "#fff",
    paddingVertical: 25,
  },
  map: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginLeft: 10,
    color: "#000",
  },

  countryItem: {
    paddingHorizontal: 15,
    marginBottom: 20,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  countryItemActionButton: {
    backgroundColor: "#fafafa",
    paddingVertical: 8,
    paddingHorizontal: 10,
    marginLeft: 8,
    borderRadius: 5,
  },
  countryItemLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  countryItemActions: {
    flexDirection: "row",
    alignItems: "center",
  },
  countryActive: {
    backgroundColor: COLORS.secondary,
  },
  countryLived: {
    backgroundColor: "#00d52d",
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
  mapContainer: {
    backgroundColor: "#f8f8f8",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
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
  topActions: {
    width: "100%",
    flexDirection: "row",
    display: "flex",
    paddingHorizontal: 15,
    justifyContent: "space-between",
    paddingBottom: 15,
  },
  left: {
    flexDirection: "row",
    display: "flex",
  },
  row: {
    flexDirection: "row",
    display: "flex",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    marginTop: 0,
    marginBottom: 8,
  },
  rowBox: {
    width: "32%",
    height: 90,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
    backgroundColor: "#f8f8f8",
    borderColor: "#fff",
    borderWidth: 2,
    borderStyle: "solid",
  },
  lg: {
    fontSize: 24,
    marginBottom: 8,
    fontWeight: "bold",
    position: "relative",
    color: COLORS.primaryDark,
  },
  btn: {
    backgroundColor: "#fff",
    height: 30,
    paddingHorizontal: 15,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
    flexDirection: "row",
  },
  txt: {
    fontSize: 14,
    marginLeft: 5,
  },
});
