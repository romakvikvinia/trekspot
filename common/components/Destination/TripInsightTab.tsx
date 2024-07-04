import { Image } from "expo-image";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Constants from "expo-constants";

import { enGB, he, registerTranslation } from "react-native-paper-dates";
registerTranslation("en", enGB);

import { FlashList } from "@shopify/flash-list";
import { InnovationIcon, XIcon } from "../../../utilities/SvgIcons.utility";
import { COLORS, SIZES } from "../../../styles/theme";
import { Portal } from "react-native-portalize";
import { Modalize } from "react-native-modalize";
import RenderHTML from "react-native-render-html";
import { useFocusedTab } from "react-native-collapsible-tab-view";
import { useLazyTopicsQuery } from "../../../api/api.trekspot";
import { TopicType } from "../../../api/api.types";

interface TripInsightTabProps {
  iso2: string;
}

interface IState {
  topic: TopicType | null;
}

export const TripInsightTab: React.FC<TripInsightTabProps> = ({ iso2 }) => {
  const [fetchData, { isLoading, data }] = useLazyTopicsQuery();
  const focusedTab = useFocusedTab();
  const modalInsightDetailRef = useRef<Modalize>();
  const [state, setState] = useState<IState>({ topic: null });

  const onInsightDetailOpen = useCallback((topic: TopicType) => {
    setState((prevState) => ({ ...prevState, topic }));
    modalInsightDetailRef.current?.open();
  }, []);

  useEffect(() => {
    if (focusedTab === "Insights" && iso2) {
      fetchData({ iso2 });
    }
  }, [focusedTab]);

  return (
    <>
      {data &&
        Object.keys(data).map((key) => (
          <View key={key} style={[styles.topicsRow, { marginTop: 25 }]}>
            <View style={styles.headingItem}>
              <Text style={styles.topicsRowTitle}>{key}</Text>
              <View
                style={[styles.shapeBg, { backgroundColor: "#ffd5d1" }]}
              ></View>
            </View>
            <View style={{ flexGrow: 1 }}>
              <FlashList
                horizontal
                contentContainerStyle={{
                  paddingHorizontal: 15,
                }}
                showsHorizontalScrollIndicator={false}
                data={data[key] || []}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() => onInsightDetailOpen(item)}
                    activeOpacity={0.7}
                    style={styles.card}
                  >
                    <Image
                      style={styles.cardImage}
                      resizeMode="cover"
                      source={require("../../../assets/no-image.png")}
                    />
                    <Text style={styles.cardTitle}>{item.title}</Text>
                  </TouchableOpacity>
                )}
                estimatedItemSize={10}
              />
            </View>
          </View>
        ))}

      <View style={{ paddingBottom: 30 }}></View>

      <Portal>
        <Modalize
          ref={modalInsightDetailRef}
          modalTopOffset={65}
          // disableScrollIfPossible
          // adjustToContentHeight
          velocity={100000}
          tapGestureEnabled={false}
          closeSnapPointStraightEnabled={false}
          modalStyle={{
            backgroundColor: "#F2F2F7",
            minHeight: "30%",
          }}
          HeaderComponent={
            <View style={styles.rowItemHeader}>
              <Text style={styles.h2}>{state.topic?.title}</Text>

              <TouchableOpacity
                onPress={() => modalInsightDetailRef?.current?.close()}
                activeOpacity={0.5}
                style={styles.closeButton}
              >
                <XIcon width="10" />
              </TouchableOpacity>
            </View>
          }
          scrollViewProps={{
            showsVerticalScrollIndicator: false,
          }}
        >
          <View style={{ paddingHorizontal: 15, paddingBottom: 50 }}>
            <RenderHTML
              key={"topic"}
              contentWidth={SIZES.width}
              source={{
                html: state.topic?.description || "",
              }}
              defaultTextProps={{
                selectable: true,
              }}
            />
          </View>
        </Modalize>
      </Portal>
    </>
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
    opacity: 0.6,
  },
  noteCardTitle: {
    fontSize: 18,
    fontWeight: "500",
    color: COLORS.primary,
    maxWidth: "80%",
  },
  closeButton: {
    backgroundColor: "#DBDBDB",
    width: 30,
    height: 30,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  rowItemHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    paddingTop: 15,
    paddingBottom: 15,
  },
  h2: {
    fontSize: 22,
    color: COLORS.black,
    fontWeight: "bold",
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
    fontSize: 20,
    fontWeight: "bold",
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
    marginBottom: 15,
  },
  destination: {
    fontSize: 18,
    fontWeight: "500",
  },
  backButton: {
    width: 30,
  },
});
