import { Image } from "expo-image";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Constants from "expo-constants";

import { enGB, registerTranslation } from "react-native-paper-dates";
registerTranslation("en", enGB);

import { useNavigation } from "@react-navigation/native";
import { BackIcon, XIcon } from "../../utilities/SvgIcons.utility";
import { FlashList } from "@shopify/flash-list";
import { COLORS, SIZES } from "../../styles/theme";
import { globalStyles } from "../../styles/globalStyles";
import { useLazyTopicsQuery } from "../../api/api.trekspot";
import { Loader } from "../../common/ui/Loader";
import { Portal } from "react-native-portalize";
import { Modalize } from "react-native-modalize";
import { TopicType } from "../../api/api.types";
import RenderHTML from "react-native-render-html";

interface TripProps {}
interface TripInsightTabProps {
  iso2: string;
}

interface IState {
  topic: TopicType | null;
}
export const TripInsights: React.FC<TripProps> = ({ route }) => {
  const navigation = useNavigation();
  const iso2 = route?.params?.iso2;
  const city = route?.params?.data?.cities[0]?.city;
  const [fetchData, { isLoading, data }] = useLazyTopicsQuery();

  const modalInsightDetailRef = useRef<Modalize>();
  const [state, setState] = useState<IState>({ topic: null });

  const onInsightDetailOpen = useCallback((topic: TopicType) => {
    setState((prevState) => ({ ...prevState, topic }));
    modalInsightDetailRef.current?.open();
  }, []);

  const colors = ["#ffd5d1", "#f5e1d3", "#d1f5d3", "#d3d1f5", "#f5d3f5"];

  useEffect(() => {
    if (iso2) {
      fetchData({ iso2 });
    }
  }, [iso2]);

  return (
    <>
      <SafeAreaView style={styles.safeArea}>
        <View style={globalStyles.screenHeader}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={globalStyles.screenHeaderBackButton}
          >
            <BackIcon size="30" />
          </TouchableOpacity>

          <Text style={globalStyles.screenTitle}>{city}</Text>
          <TouchableOpacity
            style={globalStyles.screenHeaderBackButton}
          ></TouchableOpacity>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          {isLoading ? (
            <View style={{ height: 230 }}>
              <Loader isLoading background="#F2F2F7" />
            </View>
          ) : null}

          {!isLoading &&
            data &&
            Object.keys(data).map((key, i) => (
              <View
                key={key}
                style={[styles.topicsRow, { marginTop: i === 0 ? 25 : 0 }]}
              >
                <View style={styles.headingItem}>
                  <Text style={styles.topicsRowTitle}>{key}</Text>
                  <View
                    style={[styles.shapeBg, { backgroundColor: colors[i] }]}
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
                          source={
                            item?.image?.url
                              ? {
                                  uri: item?.image?.url,
                                }
                              : require("../../assets/no-image.png")
                          }
                        />
                        <Text style={styles.cardTitle}>{item.title}</Text>
                      </TouchableOpacity>
                    )}
                    estimatedItemSize={10}
                  />
                </View>
              </View>
            ))}

          {!isLoading && data && Object.keys(data)?.length === 0 && (
            <View
              style={{
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
                minHeight: 230,
              }}
            >
              <Text
                style={{
                  color: COLORS.black,
                  fontSize: 18,
                  fontWeight: "bold",
                }}
              >
                No data available
              </Text>
              <Text
                style={{
                  color: COLORS.gray,
                  fontSize: 16,
                  fontWeight: "500",
                  marginTop: 10,
                }}
              >
                We are working on it and will be available soon
              </Text>
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
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
  safeArea: {
    flex: 1,
    backgroundColor: "#F2F2F7",
    paddingTop: Constants?.statusBarHeight + 10,
  },
  closeButton: {
    backgroundColor: "#DBDBDB",
    width: 30,
    height: 30,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  h2: {
    fontSize: 22,
    color: COLORS.black,
    fontWeight: "bold",
    maxWidth: "80%",
  },
  rowItemHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    paddingTop: 15,
    paddingBottom: 15,
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
    height: 60
  },
  topicsRow: {
    width: "100%",
    marginBottom: 5,
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
    color: "#000",
  },
  backButton: {
    width: 30,
  },
});
