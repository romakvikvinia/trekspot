import React, { useCallback, useMemo, useRef } from "react";
import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { MapSvg, Mark, Mark2, Share } from "../../utilities/SvgIcons.utility";

import { Modalize } from "react-native-modalize";
import { Portal } from "react-native-portalize";
import { ReactNativeZoomableView } from "@openspacelabs/react-native-zoomable-view";
import { CountriesList } from "../../utilities/countryList";
import { Flags } from "../../utilities/flags";

interface HomeProps {}

export const HomeScreen: React.FC<HomeProps> = ({}) => {
  const modalRef = useRef<Modalize>(null);
  const onOpen = useCallback(() => {
    if (modalRef.current) modalRef.current.open();
  }, []);

  const Country = ({ item }: any) => {
    // Assuming that `item` contains the ISO2 country code
    const countryCode = item.iso2 as string;

    // Check if the image path exists in the mapping
    // @ts-ignore
    const imagePath = Flags[countryCode];

    return (
      <View style={styles.item}>
        <ImageBackground
          resizeMode="cover"
          style={{
            width: 30,
            height: 20,
            borderRadius: 2,
            overflow: "hidden",
            borderWidth: 1,
            borderColor: "#fafafa",
          }}
          source={imagePath ? imagePath : null} // Set the image source
        />
        <Text style={styles.itemTitle}>
          {item.name} {item.iso2.toLowerCase()}
        </Text>
      </View>
    );
  };

  return (
    <>
      <SafeAreaView style={{ backgroundColor: "#f8f8f8", flex: 1 }}>
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
                    justifyContent: "space-between",
                  }}
                >
                  <Text
                    style={[
                      styles.lg,
                      {
                        color: "#500074",
                      },
                    ]}
                  >
                    24
                  </Text>
                </View>

                <Text
                  style={{ fontSize: 12, opacity: 0.5, fontWeight: "bold" }}
                >
                  World
                </Text>
              </View>
              <View style={[styles.rowBox]}>
                <Text
                  style={[
                    styles.lg,
                    {
                      color: "#500074",
                    },
                  ]}
                >
                  34
                </Text>
                <Text
                  style={{ fontSize: 12, opacity: 0.5, fontWeight: "bold" }}
                >
                  Countries
                </Text>
              </View>
              <View style={[styles.rowBox]}>
                <Text
                  style={[
                    styles.lg,
                    {
                      color: "#500074",
                    },
                  ]}
                >
                  3
                </Text>
                <Text
                  style={{ fontSize: 12, opacity: 0.5, fontWeight: "bold" }}
                >
                  Continents
                </Text>
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
              <View style={styles.box}></View>
              <View style={styles.box}></View>
            </ScrollView>
          </View>
          <View style={[styles.rowItem, { paddingTop: 0, paddingBottom: 50 }]}>
            <Text style={styles.h2}>Trips</Text>

            <ScrollView
              horizontal
              style={styles.contentBox}
              showsHorizontalScrollIndicator={false}
            >
              <View style={styles.box}></View>
              <View style={styles.box}></View>
            </ScrollView>
          </View>
        </ScrollView>
        <Portal>
          <Modalize
            ref={modalRef}
            modalTopOffset={65}
            flatListProps={{
              data: CountriesList,
              renderItem: Country,
              // renderItem: ({ item }) => (
              //   <View style={styles.item}>
              //     <Text style={styles.itemTitle}>{item.name}</Text>
              //   </View>
              // ),
              keyExtractor: (item) => item.name,
              showsVerticalScrollIndicator: false,
            }}
          ></Modalize>
        </Portal>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
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
    fontSize: 16,
  },
  item: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    display: "flex",
    flexDirection: "row",
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
    width: 200,
    height: 100,
    backgroundColor: "#fafafa",
    borderRadius: 15,
    marginRight: 15,
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
