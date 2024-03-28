import { FlashList } from "@shopify/flash-list";
import { useRef } from "react";
import { Image } from "react-native";
import { ScrollView, TouchableOpacity, View } from "react-native";
import { StyleSheet, Text } from "react-native";
import { Modalize } from "react-native-modalize";
import { Portal } from "react-native-portalize";
import { MapEmbedView } from "../../common/components/MapEmbedView";
import { SightDetail } from "../../components/explore/sights/SightDetail";
import { exploreStyles } from "../../components/explore/sights/_exploreStyles";
import { COLORS } from "../../styles/theme";
import {
  CalendarFilledIcon,
  StarIcon,
  TripLocationIcon,
} from "../../utilities/SvgIcons.utility";

export const TripActivitiesSelect = ({}) => {
  const modalEmbedRef = useRef(null);
  const onEmbedModalOpen = () => {
    modalEmbedRef.current?.open();
  };
  return (
    <>
      <View style={styles.selectActivitesWrapper}>
        <View style={styles.itemRow}>
          <ScrollView
            style={styles.categories}
            horizontal
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingRight: 15,
            }}
          >
            <TouchableOpacity style={[styles.categoryitem, styles.active]}>
              <Text style={[styles.categoryitemText, styles.activeText]}>
                All
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.categoryitem}>
              <Text style={styles.categoryitemText}>Landmarks</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.categoryitem}>
              <Text style={styles.categoryitemText}>Markets</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.categoryitem}>
              <Text style={styles.categoryitemText}>Beaches</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.categoryitem}>
              <Text style={styles.categoryitemText}>Landmarks</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.categoryitem}>
              <Text style={styles.categoryitemText}>Markets</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.categoryitem}>
              <Text style={styles.categoryitemText}>Beaches</Text>
            </TouchableOpacity>
          </ScrollView>

          <FlashList
            data={[0, 1, 2, 3, 4, 5]}
            renderItem={({ item }) => (
              <TouchableOpacity
                activeOpacity={0.7}
                style={[styles.thingsTodoItem]}
              >
                <Image
                  style={[
                    {
                      minHeight: 140,
                    },
                  ]}
                  cachePolicy="memory"
                  contentFit="cover"
                  transition={0}
                  source={{
                    uri: "https://cdn.pixabay.com/photo/2019/03/09/21/30/downtown-4045035_1280.jpg",
                  }}
                ></Image>

                <View style={styles.thingsTodoItemDetails}>
                  <Text style={styles.thingsTodoItemTitle} numberOfLines={1}>
                    Dubai cruise
                  </Text>

                  <View style={styles.thingsTodoItemiIn}>
                    <Text
                      style={[
                        styles.thingsTodoItemiIntypeText,
                        {
                          fontSize: 14,
                        },
                      ]}
                    >
                      Landmark
                    </Text>

                    <View style={exploreStyles.ratingWrapper}>
                      <View
                        style={{
                          position: "relative",
                          top: -1,
                          opacity: 0.8,
                        }}
                      >
                        <StarIcon size={15} color="#FFBC3E" />
                      </View>
                      <Text style={exploreStyles.ratingText}>3.4</Text>
                    </View>
                  </View>

                  <View style={styles.actionButtons}>
                    <TouchableOpacity style={styles.detailsButton}>
                      <Text style={styles.detailsButtonText}>Details</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.addToButton}>
                      <Text style={styles.addToButtonText}>Add to trip</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableOpacity>
            )}
            estimatedItemSize={200}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingHorizontal: 15,
            }}
          />
        </View>

        <View style={[styles.itemRow, { marginTop: 35, marginBottom: 45 }]}>
          <Text style={styles.eventsRowTitle}>
            Events <Text style={{ fontSize: 14 }}>(During trip dates)</Text>
          </Text>
          <FlashList
            data={[0, 1, 2, 3, 4, 5]}
            renderItem={({ item }) => (
              <TouchableOpacity
                activeOpacity={0.7}
                style={[
                  styles.thingsTodoItem,
                  {
                    width: 170,
                    marginRight: 15,
                  },
                ]}
                onPress={() => onEmbedModalOpen()}
              >
                <Image
                  style={[
                    {
                      minHeight: 140,
                    },
                  ]}
                  cachePolicy="memory"
                  contentFit="cover"
                  transition={0}
                  source={{
                    uri: "https://cdn.pixabay.com/photo/2019/03/09/21/30/downtown-4045035_1280.jpg",
                  }}
                ></Image>

                <View style={styles.thingsTodoItemDetails}>
                  <Text style={styles.thingsTodoItemTitle}>Event title</Text>

                  <View
                    style={[styles.thingsTodoItemiIn, { paddingBottom: 15 }]}
                  >
                    <Text
                      style={[
                        styles.thingsTodoItemiIntypeText,
                        {
                          fontSize: 14,
                          color: COLORS.black,
                          marginTop: 10,
                        },
                      ]}
                    >
                      <CalendarFilledIcon size="12" color={COLORS.darkgray} />{" "}
                      14 Nov
                    </Text>

                    <Text style={[styles.thingsTodoItemiInprice]}>
                      <TripLocationIcon size="12" color={COLORS.darkgray} />{" "}
                      Tbilisi
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            )}
            estimatedItemSize={200}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingHorizontal: 15,
            }}
          />
        </View>
      </View>

      <SightDetail
        data={{
          title: "Dubai Burj Khalifa",
          description: "This is Largest building in Dubai",
          images: [
            {
              id: "0",
              url: "https://cdn.pixabay.com/photo/2019/03/09/21/30/downtown-4045035_1280.jpg",
            },
            {
              id: "1",
              url: "https://cdn.pixabay.com/photo/2019/03/09/21/30/downtown-4045035_1280.jpg",
            },
          ],
          category: "Landmark",
          rate: 4.5,
          address: "Main street 13a",
        }}
      />

      <Portal>
        <Modalize ref={modalEmbedRef} modalTopOffset={65} adjustToContentHeight>
          <MapEmbedView
            blogUrl="https://www.ticketmaster.fr/en/resultat?ipSearch=lara+fabian"
            placeTitle="Tbilisi"
            modalEmbedRef={modalEmbedRef}
          />
        </Modalize>
      </Portal>
    </>
  );
};
const styles = StyleSheet.create({
  selectActivitesWrapper: {
    flex: 1,
  },
  eventsRowTitle: {
    color: COLORS.black,
    fontSize: 22,
    marginBottom: 15,
    paddingHorizontal: 15,
  },
  thingsTodoItemTitle: {
    fontSize: 18,
    fontWeight: "500",
    paddingHorizontal: 15,
    marginTop: 15,
  },
  thingsTodoItemiIn: {
    paddingHorizontal: 15,
  },
  detailsButton: {
    backgroundColor: COLORS.lightGray,
    padding: 15,
    flex: 1,
    textAlign: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  addToButton: {
    backgroundColor: "#fef0ff",
    padding: 15,
    flex: 1,
    textAlign: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  addToButtonText: {
    color: COLORS.primaryDark,
    fontSize: 14,
    fontWeight: "500",
  },
  detailsButtonText: {
    color: COLORS.black,
    fontSize: 14,
    fontWeight: "500",
  },
  thingsTodoItem: {
    backgroundColor: "#fff",
    width: 200,
    marginRight: 15,
    borderRadius: 15,
    overflow: "hidden",
  },
  thingsTodoItemDetails: {},
  actionButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },

  thingsTodoItemiIntypeText: {
    fontSize: 12,
    color: COLORS.gray,
    marginTop: 5,
    marginBottom: 5,
  },
  thingsTodoItemiInprice: {
    fontSize: 14,
    color: COLORS.gray,
    marginTop: 5,
    marginBottom: 5,
  },
  itemRow: {
    marginTop: 0,
  },
  rowTitle: {
    fontSize: 22,
    fontWeight: "500",
    color: COLORS.black,
  },
  categories: {
    marginTop: 15,
    marginBottom: 15,
    paddingHorizontal: 15,
  },
  categoryitem: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: "#fff",
    borderRadius: 50,
    marginRight: 8,
  },
  categoryitemText: {
    fontSize: 14,
    color: COLORS.black,
  },
  active: {
    backgroundColor: COLORS.primaryDark,
  },
  activeText: {
    color: "#fff",
  },
});
