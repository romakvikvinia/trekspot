import { Image } from "expo-image";
import React, { useRef } from "react";
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
import { FlashList } from "@shopify/flash-list";
import { InnovationIcon, XIcon } from "../../../utilities/SvgIcons.utility";
import { COLORS, SIZES } from "../../../styles/theme";
import { Portal } from "react-native-portalize";
import { Modalize } from "react-native-modalize";
import RenderHTML from "react-native-render-html";

interface TripProps {}

export const TripInsightTab: React.FC<TripProps> = ({}) => {
  const navigation = useNavigation();
  const modalInsightDetailRef = useRef(null);

  const onInsightDetailOpen = () => {
    modalInsightDetailRef.current?.open();
  };
  return (
    <>
      <View style={[styles.topicsRow, { marginTop: 25 }]}>
        <Text style={styles.topicsRowTitle}>Moving about</Text>
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
                img: "https://cdn.pixabay.com/photo/2016/08/06/12/34/taxi-1574278_1280.jpg",
              },
              {
                title: "title2",
                img: "https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?q=10&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
              },
              {
                title: "title2",
                img: "https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?q=10&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
              },
            ]}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => onInsightDetailOpen()}
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
        <Text style={styles.topicsRowTitle}>Moving about</Text>
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
                img: "https://img.freepik.com/free-vector/cloud-computing-security-abstract-concept-illustration_335657-2105.jpg?t=st=1711913933~exp=1711917533~hmac=c06ae38474ae52bd22fbd5b619dbfadd2f3947151c29a159b1426c50de80ca39&w=1380",
              },
              {
                title: "title2",
                img: "https://img.freepik.com/free-vector/cloud-computing-security-abstract-concept-illustration_335657-2105.jpg?t=st=1711913933~exp=1711917533~hmac=c06ae38474ae52bd22fbd5b619dbfadd2f3947151c29a159b1426c50de80ca39&w=1380",
              },
              {
                title: "title2",
                img: "https://img.freepik.com/free-vector/cloud-computing-security-abstract-concept-illustration_335657-2105.jpg?t=st=1711913933~exp=1711917533~hmac=c06ae38474ae52bd22fbd5b619dbfadd2f3947151c29a159b1426c50de80ca39&w=1380",
              },
            ]}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => onInsightDetailOpen()}
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
        <Text style={styles.topicsRowTitle}>Moving about</Text>
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
                onPress={() => onInsightDetailOpen()}
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
        <Text style={styles.topicsRowTitle}>Moving about</Text>
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
                onPress={() => onInsightDetailOpen()}
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
              <Text style={styles.h2}>Moving about</Text>

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
                html: `
            <h2 style="color: green">Title item</h2>
            <p style="font-sze: 18px; line-height: 22px">
            The Foundry (v6) release is finally stable, and is now-on the recommended version. Check out the announcement blog post in our brand new website. We also have a migration guide for
            </p>
            <ul>
                <li>
                     Text item
                </li>
                <li>
                    Text item
                </li>
            </ul>
            <p style="font-sze: 18px; line-height: 22px">
            The Foundry (v6) release is finally stable, and is now-on the recommended version. Check out the announcement blog post in our brand new website. We also have a migration guide for
            </p>
            <ul>
                <li>
                     Text item
                </li>
                <li>
                    Text item
                </li>
            </ul>
            <p style="font-sze: 18px; line-height: 22px">
            The Foundry (v6) release is finally stable, and is now-on the recommended version. Check out the announcement blog post in our brand new website. We also have a migration guide for
            </p>
            <p style="font-sze: 18px; line-height: 22px">
            The Foundry (v6) release is finally stable, and is now-on the recommended version. Check out the announcement blog post in our brand new website. We also have a migration guide for
            </p>
            <p style="font-sze: 18px; line-height: 22px">
            The Foundry (v6) release is finally stable, and is now-on the recommended version. Check out the announcement blog post in our brand new website. We also have a migration guide for
            </p>
               <ul>
                <li>
                     Text item
                </li>
                <li>
                    Text item
                </li>
            </ul>
            <p style="font-sze: 18px; line-height: 22px">
            The Foundry (v6) release is finally stable, and is now-on the recommended version. Check out the announcement blog post in our brand new website. We also have a migration guide for
            </p>
            <p style="font-sze: 18px; line-height: 22px">
            The Foundry (v6) release is finally stable, and is now-on the recommended version. Check out the announcement blog post in our brand new website. We also have a migration guide for
            </p>
            <p style="font-sze: 18px; line-height: 22px">
            The Foundry (v6) release is finally stable, and is now-on the recommended version. Check out the announcement blog post in our brand new website. We also have a migration guide for
            </p>
            `,
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
    paddingTop: Constants?.statusBarHeight + 10
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
    paddingHorizontal: 15,
    marginBottom: 15,
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
