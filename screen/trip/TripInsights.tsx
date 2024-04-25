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
import { BackIcon, InnovationIcon } from "../../utilities/SvgIcons.utility";
import { FlashList } from "@shopify/flash-list";
import { COLORS } from "../../styles/theme";

interface TripProps {}

export const TripInsights: React.FC<TripProps> = ({route}) => {
  const navigation = useNavigation();

   const handleNavigate = () => {
    if(route?.params?.directVisit) {
      navigation.navigate( "TripQuickInsightsDetail", {
        directVisit: true
      })
    } else {
      navigation.navigate("TripInsightDetailScreen")
    }
   }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <BackIcon size="30" />
        </TouchableOpacity>

        <Text style={styles.destination}>Germany</Text>
        <TouchableOpacity style={styles.backButton}></TouchableOpacity>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ marginTop: 15 }}></View>

        <FlashList
          horizontal
          contentContainerStyle={{
            paddingHorizontal: 15,
          }}
          showsHorizontalScrollIndicator={false}
          data={[
            {
              title: "title long title item goes here",
            },
            {
              title: "title2",
            },
            {
              title: "title2",
            },
          ]}
          renderItem={({ item }) => (
            // styles.dangerType
            <View style={[styles.noteCard]}>
              <View style={styles.innovationIcon}>
                <InnovationIcon color={COLORS.primary} />
              </View>
              <Text
                style={[
                  styles.noteCardTitle,
                  // {
                  //   color: COLORS.red,
                  // },
                ]}
              >
                {item?.title}
              </Text>
              <Text style={styles.noteCardDesc}>
                Digital solutions have revolutionized numerous industries.
                Personal safety solutions, on the contrary, have remained
              </Text>
            </View>
          )}
          estimatedItemSize={10}
        />

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
                  img: "https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?q=10&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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
    paddingTop: Constants?.statusBarHeight + 10
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
