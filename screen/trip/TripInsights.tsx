import Constants from "expo-constants";
import { Image } from "expo-image";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { enGB, registerTranslation } from "react-native-paper-dates";
registerTranslation("en", enGB);

import { useNavigation } from "@react-navigation/native";
import { FlashList } from "@shopify/flash-list";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import { Modalize } from "react-native-modalize";
import { Portal } from "react-native-portalize";
import RenderHTML from "react-native-render-html";

import { useLazyTopicsQuery } from "../../api/api.trekspot";
import { TopicType } from "../../api/api.types";
import { Loader } from "../../common/ui/Loader";
import { NodataText } from "../../components/common/NoDataText";
import { globalStyles } from "../../styles/globalStyles";
import { COLORS, SIZES } from "../../styles/theme";
import { BackIcon, XIcon } from "../../utilities/SvgIcons.utility";

interface TripProps {}

interface IState {
  topic: TopicType | null;
}
export const TripInsights: React.FC<TripProps> = ({
  route,
  showHeader = true,
}) => {
  const navigation = useNavigation();
  const iso2 = route?.params?.iso2;
  const [fetchData, { isLoading, data }] = useLazyTopicsQuery();

  const modalInsightDetailRef = useRef<Modalize>();
  const [state, setState] = useState<IState>({ topic: null });

  const onInsightDetailOpen = useCallback((topic: TopicType) => {
    setState((prevState) => ({ ...prevState, topic }));
    modalInsightDetailRef.current?.open();
  }, []);

  useEffect(() => {
    if (iso2) {
      fetchData({ iso2 });
    }
  }, [iso2]);

  return (
    <>
      <View
        style={[
          styles.safeArea,
          {
            backgroundColor: showHeader ? "#F2F2F7" : "#f8f8f8",
          },
        ]}
      >
         <StatusBar style="dark" />
        {showHeader && (
          <>
            <View style={globalStyles.screenHeader}>
              <Pressable
                onPress={() => navigation.goBack()}
                style={globalStyles.screenHeaderBackButton}
                hitSlop={20}
              >
                <BackIcon size="18" />
              </Pressable>

              <Text style={globalStyles.screenTitle}>Insights</Text>
              <TouchableOpacity
                style={globalStyles.screenHeaderBackButton}
              ></TouchableOpacity>
            </View> 
          </>
        )}
        <ScrollView showsVerticalScrollIndicator={false}>
          {isLoading ? (
            <View style={{ height: 200 }}>
              <Loader isLoading background="#F2F2F7" />
            </View>
          ) : null}

          {!isLoading && data && Object.keys(data)?.length === 0 && (
            <NodataText />
          )}

          {!isLoading &&
            data &&
            Object.keys(data).map((key, i) => (
              <View key={key} style={[styles.topicsRow,{
                marginTop: i === 0 ? 20 : 25
              }]}>
                <View style={styles.headingItem}>
                  <Text style={[styles.topicsRowTitle,{
                    fontSize: !showHeader ? 18 : 22
                  }]}>{key}</Text>
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
                          source={
                            item?.image?.url
                              ? {
                                  uri: item?.image?.url,
                                }
                              : require("../../assets/no-image.png")
                          }
                        />
                        <LinearGradient
                          style={styles.gradientWrapper}
                          colors={["rgba(0,0,0,0.01)", "rgba(0,0,0,0.9)"]}
                        >
                          <Text style={styles.cardTitle}>{item.title}</Text>
                        </LinearGradient>
                      </TouchableOpacity>
                    )}
                    estimatedItemSize={10}
                  />
                </View>
              </View>
            ))}
        </ScrollView>
      </View>

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
    borderColor: "#fff",
    borderRadius: 15,
    borderWidth: 2,
    elevation: 5,
    marginRight: 15,
    minHeight: 130,
    overflow: "hidden",
    position: "relative",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    width: 160,
  },
  cardImage: {
    borderRadius: 15,
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
    alignItems: "center",
    height: "100%",
    justifyContent: "flex-end",
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
  rowItemHeader: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 15,
    paddingHorizontal: 15,
    paddingTop: 15,
  },
  safeArea: {
    backgroundColor: "#F2F2F7",
    flex: 1,
    paddingTop: Constants?.statusBarHeight + 15,
  },
  topicsRow: {
    flexGrow: 1,
    marginBottom: 5,
    marginTop: 25,
    width: "100%",
  },
  topicsRowTitle: {
    color: COLORS.black,
    fontSize: 22,
    fontWeight: "500",
    marginBottom: 15,
    paddingHorizontal: 0,
    zIndex: 1,
  },
});
