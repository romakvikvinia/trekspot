import { Image } from "expo-image";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { enGB, registerTranslation } from "react-native-paper-dates";
registerTranslation("en", enGB);

import { FlashList } from "@shopify/flash-list";
import { LinearGradient } from "expo-linear-gradient";
import { usePostHog } from "posthog-react-native";
import { useFocusedTab } from "react-native-collapsible-tab-view";
import { Modalize } from "react-native-modalize";
import { Portal } from "react-native-portalize";
import RenderHTML from "react-native-render-html";

import { useLazyTopicsQuery } from "../../../api/api.trekspot";
import { TopicType } from "../../../api/api.types";
import { NodataText } from "../../../components/common/NoDataText";
import { FeedbackCountryDetail } from "../../../components/explore/FeedbackCountryDetail";
import { COLORS, SIZES } from "../../../styles/theme";
import { Events } from "../../../utilities/Posthog";
import { XIcon } from "../../../utilities/SvgIcons.utility";
import { Loader } from "../../ui/Loader";

interface TripInsightTabProps {
  iso2: string;
}

interface IState {
  topic: TopicType | null;
}

export const TripInsightTab: React.FC<TripInsightTabProps> = ({ iso2 }) => {
  const posthog = usePostHog();
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
      {isLoading ? (
        <View style={{ height: 230 }}>
          <Loader isLoading />
        </View>
      ) : null}
      {!isLoading && data && Object.keys(data).length > 0
        ? Object.keys(data).map((key, i) => (
            <View
              key={key}
              style={[styles.topicsRow, { marginTop: i === 0 ? 25 : 0 }]}
            >
              <View style={styles.headingItem}>
                <Text style={styles.topicsRowTitle}>{key}</Text>
              </View>
              <View style={{ flexGrow: 1 }}>
                <FlashList
                  horizontal
                  contentContainerStyle={{
                    paddingHorizontal: 15,
                  }}
                  showsHorizontalScrollIndicator={false}
                  data={data[key] || []}
                  renderItem={({ item, i }) => (
                    <TouchableOpacity
                      onPress={() => {
                        onInsightDetailOpen(item);
                        posthog.capture(Events.useCountryInsight, {
                          topic: item.title,
                        });
                      }}
                      activeOpacity={0.7}
                      style={styles.card}
                    >
                      <View style={styles.imageWrapper}>
                        <Image
                          style={styles.cardImage}
                          contentFit="cover"
                          source={
                            item?.image?.url
                              ? {
                                  uri: item?.image?.url,
                                }
                              : require("../../../assets/no-image.png")
                          }
                        />
                        
                        <LinearGradient
                          style={styles.gradientWrapper}
                          colors={["rgba(0,0,0,0.01)", "rgba(0,0,0,0.9)"]}
                        >
                          <Text style={styles.cardTitle}>{item.title}</Text>
                        </LinearGradient>
                      </View>
                    </TouchableOpacity>
                  )}
                  estimatedItemSize={10}
                />
              </View>
            </View>
          ))
        : !isLoading && <NodataText />}
      {!isLoading && data ? (
        <View style={{ marginTop: 30, width: "100%" }}>
          <FeedbackCountryDetail />
        </View>
      ) : null}
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
              baseStyle={{
                fontSize: 16,
                lineHeight: 22,
                paddingBottom: 30,
                paddingTop: 15,
                fontWeight: "400",
              }}
              tagsStyles={{
                p: {
                  fontSize: 16,
                  lineHeight: 22,
                  fontWeight: "400",
                  marginTop: 0,
                  marginBottom: 0,
                },
                ol: {
                  lineHeight: 22,
                  paddingLeft: 0,
                  listStyleType: "none",
                  marginTop: 0,
                  paddingTop: 0,
                  marginBottom: 0,
                  paddingBottom: 0,
                },
                ul: {
                  paddingLeft: 15,
                  lineHeight: 22,
                  listStyleType: "ordered",
                  marginBottom: 0,
                },
                li: {
                  fontSize: 16,
                  lineHeight: 22,
                  marginBottom: 15,
                  marginTop: 0,
                  paddingTop: 0,
                },
                strong: {
                  fontWeight: "bold",
                },
              }}
            />
          </View>
        </Modalize>
      </Portal>
    </>
  );
};

const styles = StyleSheet.create({
  card: {
    marginRight: 15,
    minHeight: 160,
    width: 160,
  },
  cardImage: {
    height: 130,
    width: 160,
  },
  cardTitle: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "600",
    paddingBottom: 15,
    paddingHorizontal: 15,
    textAlign: "center",
  },
  closeButton: {
    alignItems: "center",
    backgroundColor: "#DBDBDB",
    borderRadius: 50,
    height: 30,
    justifyContent: "center",
    width: 30,
  },
  gradientWrapper: {
    alignItems: 'center',
    height: "100%",
    justifyContent: 'flex-end',
    left: 0,
    position: "absolute",
    top: 0,
    width: "100%",
  },
  h2: {
    color: COLORS.black,
    fontSize: 22,
    fontWeight: "bold",
    maxWidth: "80%",
  },
  headingItem: {
    paddingHorizontal: 20,
    position: "relative",
  },
  imageWrapper: {
    backgroundColor: "#f2f2f2",
    borderRadius: 15,
    height: 130,
    overflow: "hidden",
    width: 160,
  },
  rowItemHeader: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 15,
    paddingHorizontal: 15,
    paddingTop: 15,
  },
  topicsRow: {
    flexGrow: 1,
    marginBottom: 5,
    width: "100%",
  },
  topicsRowTitle: {
    color: COLORS.black,
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 15,
    paddingHorizontal: 0,
    zIndex: 1,
  },
});
