/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigation } from "@react-navigation/native";
import { Image } from "expo-image";
import { useState } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { COLORS } from "../../../styles/theme";
import { tripDetailStyles } from "../_tripDetailStyles";
import { ActivityCardActions } from "./ActivityCardActions";
import { NoteDescriptionGallery } from "./NoteDescriptionGallery";
import { Rating } from "./Rating";
import { RestaurantDetail } from "./RestaurantDetail";

interface TripActivityRestCardProps {
  activityAmount: number;
  checkedIn: boolean;
  item: any;
  index: number;
  onQuestionModalOpen: any;
  handleChangeActivityVisited: any;
}

const restaurantData = [
  {
    title: "La Table Cachée par Michel Roth",
    images: [
      {
        url: "https://fastly.4sqi.net/img/general/original/1765922_9PT3muvAljh2FqPHiEOdyA6qDEumXGxBZQD02rRgpmM.jpg",
        meta: {
          author: "Benoit",
          alt: "Benoit",
          authorUrl: "https://www.benoit-paris.com",
        }
      },
      {
        url: "https://axwwgrkdco.cloudimg.io/v7/__gmpics3__/80ac96d237704d1f9e7965ee3cc8b630.jpg?w=1200&h=1200&org_if_sml=1",
        meta: {
          author: "Benoit",
          alt: "Benoit",
          authorUrl: "https://www.benoit-paris.com",
        }
      },
      {
        url: "https://fastly.4sqi.net/img/general/original/1765922_9PT3muvAljh2FqPHiEOdyA6qDEumXGxBZQD02rRgpmM.jpg",
        meta: {
          author: "Benoit",
          alt: "Benoit",
          authorUrl: "https://www.benoit-paris.com",
        }
      }
    ],
    address: "20 rue Saint-Martin, Paris, 75004, France",
    reviews: 35664,
    type: ["Classic French", "Bistro", "Michelin Star"],
    cuisine: "French, European",
    establishedYear: 1912,
    ambience: "Cozy, Romantic, Casual",
    dietaryOptions: ["Vegetarian-friendly", "Vegan options", "Gluten-free available"],
    michelinRating: {
      stars: 1,
      description: "One Star: High quality cooking"
    },
    description: "This genuine Parisian bistro boasts its period Belle Époque interior with woodwork, copper pots, mirrors, and velvet banquettes. Proudly traditional, the menu features country produce with dishes like pâté en croûte, calf’s head with ravigote sauce, cassoulet, and millefeuille pastry.",
    price: "$$$$",
    facilities: ["Air conditioning", "Interesting wine list"],
    orderOnlineLink: "https://www.benoit-paris.com",
    serviceOptions: ["Dine-in", "Takeout", "Delivery"],
    rating: 4.0,
    averageCostPerPerson: "$50 - $100",
    awards: ["Michelin Guide Recommended", "Best French Bistro 2023"],
    extensions: {
      popularFor: ["Lunch", "Dinner", "Solo dining"],
      wheelchairAccessible: true,
      kidsFriendly: true,
      petFriendly: false,
      parking: ["Street Parking", "Valet Available"],
      timeSpent: "People typically spend up to 2.5 hours here",
      wifi: true,
      socialMedia: {
        instagram: "https://instagram.com/benoitparis",
        facebook: "https://facebook.com/benoitparis"
      },
      featuredVideos: ["https://youtube.com/watch?v=example"],
      paymentOptions: ["Credit Card", "Apple Pay", "Cash"],
    },
    contact: {
      phone: "+33 1 42 72 25 76",
      website: "https://www.benoit-paris.com"
    },
    reservation: {
      link: "https://www.sevenrooms.com/reservations/pinkmamma?venues=eastmamma,pinkmamma,obermamma,mammaprimiparis,bigloveparis,pizzeriapopolarebourse,libertinoparis",
      source: "sevenrooms.com"
    },
    menu: {
      link: "https://menu.bigmammagroup.com/pinkmamma",
      source: "menu.bigmammagroup.com"
    },
    openingHours: {
      Monday: "12:00-14:00, 19:00-22:00",
      Tuesday: "12:00-14:00, 19:00-22:00",
      Wednesday: "12:00-14:00, 19:00-22:00",
      Thursday: "12:00-14:00, 19:00-22:00",
      Friday: "12:00-14:00, 19:00-22:00",
      Saturday: "12:00-14:00, 19:00-22:00",
      Sunday: "12:00-14:00"
    },
    location: {
      latitude: 48.8594,
      longitude: 2.3470
    },
  }
];

export const TripActivityRestCard: React.FC<TripActivityRestCardProps> = ({
  activityAmount,
  checkedIn,
  item,
  index,
  onQuestionModalOpen,
  handleChangeActivityVisited,
}) => {
  const navigation = useNavigation();

  const [mapUrl, setMapUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const apiKey = "AIzaSyDKZ8yCRk84OAV-57khymju5GI8Vhu4EGY";
  const icon = "https://i.ibb.co/N6qgNqh5/Group-612-2.png";
  const [restaurantDetailVisible, setRestaurantDetailVisible] = useState(false);
//   useEffect(() => {
//     const staticMapUrl = `https://maps.googleapis.com/maps/api/staticmap?center=41.7006,44.8083&zoom=14&size=600x300&scale=2&markers=icon:${icon}|41.7006,44.8083&style=feature:all|element:geometry.fill|color:0xf5f5f3&style=feature:water|color:0xc8e1e8&style=feature:landscape.natural.landcover|color:0xd2eca1&style=feature:road|element:geometry|color:0xffffff&style=feature:road|element:labels|visibility:on&style=feature:poi|visibility:off&style=feature:transit|visibility:off&key=${apiKey}
// `;
//     // const staticMapUrl2 = `https://api.mapbox.com/styles/v1/mapbox/light-v10/static/pin-s-attraction+285A98(41.7006,44.8083)/41.7006,44.8083,10/600x400?access_token=pk.eyJ1IjoiYWRvbyIsImEiOiJjbTk1cWtnMXExY3N3MmtxdHkyNnVhZXg0In0.hSTRiyKVew59zLeCbkoWwg&attribution=false&logo=false`;
//     setMapUrl(staticMapUrl);
//     setLoading(false);
//   }, []);

  return (
    <>
      <TouchableOpacity
        activeOpacity={0.7}
        style={[
          styles.activityItem,
          {
            marginLeft: activityAmount > 1 ? 20 : 15,
            zIndex: index === 0 ? 5 : 1,
            backgroundColor: checkedIn ? "#fffcf5" : "#fff",
            minHeight: "auto",
            height: "auto",
          },
        ]}
        onPress={() => setRestaurantDetailVisible(restaurantData[0])}
      >
        {activityAmount > 1 && (
          <View style={styles.activityIcon}>
            <View style={styles.circle}></View>
          </View>
        )}

        <View
          style={[
            checkedIn ? tripDetailStyles.checkedIn : null,
            styles.activityContent,
          ]}
        >
          <View style={styles.cardBody}>
            <Image
              source={{
                uri: "https://axwwgrkdco.cloudimg.io/v7/__gmpics3__/8cf6aa04afa34932ba8c558ba595f563.jpg",
              }}
              style={{
                width: 80,
                height: 80,
                marginTop: 5,
                borderRadius: 10,
              }}
            />

            <View style={styles.contentSide}>
              <Text numberOfLines={2} style={styles.sightTitle}>
                Puri guliani
              </Text>

              <View style={styles.rowItem}>
                <View style={styles.rating}>
                  <Rating data={{ rate: 4.5 }} />
                  <Text style={styles.type}> · Italian · </Text>
                  <Text style={styles.type}>$$$</Text>
                </View>
              </View>
              <View style={styles.rowItem}>
                <View style={styles.workingHours}>
                  <Text style={styles.workingHoursStatus}>Open </Text>
                  <Text style={styles.workingHoursText}>⋅ Closes at 12PM</Text>
                </View>
              </View>
              <View style={styles.rowItem}>
                <Text style={styles.address}>Paris, France 03 main street</Text>
              </View>
            </View>
          </View>
        </View>

        <NoteDescriptionGallery
          notes="Today will meet my friend at Rustaveli avenue and maybe we will have a dinner together"
          description=""
        />

        <ActivityCardActions
          item={item}
          handleChangeActivityVisited={handleChangeActivityVisited}
          checkedIn={checkedIn}
          index={index}
          onQuestionModalOpen={onQuestionModalOpen}
        />
      </TouchableOpacity>

      <RestaurantDetail visible={restaurantDetailVisible} data={restaurantDetailVisible} onClose={() => setRestaurantDetailVisible(null)} />
    </>
  );
};

const styles = StyleSheet.create({
  activityContent: {
    flexDirection: "column",
    flex: 1,
    height: "100%",
    paddingHorizontal: 15,
    paddingTop: 10,
    position: "relative",
    width: "100%",
  },
  activityIcon: {
    borderColor: "#f7f7f7",
    borderRadius: 100,
    borderWidth: 8,
    left: -40,
    position: "absolute",
    top: 55,
    zIndex: 2,
  },
  activityItem: {
    borderRadius: 10,
    flexDirection: "column",
    marginBottom: 25,
    marginRight: 15,
    padding: 0,
    paddingBottom: 0,
    paddingTop: 0,
    position: "relative",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 0.84,
    ...Platform.select({
      android: {
        elevation: 2,
      },
    }),
    zIndex: 1,
  },
  address: {
    color: COLORS.darkgray,
    fontSize: 13,
    fontWeight: "400",
    position: "relative",
    top: 1,
  },
  // blurView: {
  //   backgroundColor: "rgba(255, 255, 255, 0.5)",
  //   bottom: 0,
  //   left: 0,
  //   paddingHorizontal: 10,
  //   paddingVertical: 5,
  //   position: "absolute",
  //   width: "100%",
  // },
  // blurViewText: {
  //   color: COLORS.gray,
  //   fontSize: 13,
  //   fontWeight: "500",
  // },
  cardBody: {
    flex: 1,
    flexDirection: "row",
    marginTop: 0,
  },
  circle: {
    backgroundColor: "#ccc",
    borderRadius: 100,
    height: 10,
    minWidth: 10,
  },
  contentSide: {
    flexDirection: "column",
    flex: 1,
    justifyContent: "center",
    marginTop: 5,
    paddingLeft: 15,
    paddingRight: 15
  },
  // mapContainer: {
  //   position: "relative", 
  // },
  rating: {
    alignItems: "center",
    flexDirection: "row",
  },
  rowItem: {
    flexDirection: "row",
    marginTop: 5
  },
  sightTitle: {
    color: COLORS.black,
    fontSize: 20,
    fontWeight: "500",
  },
  type: {
    color: COLORS.darkgray,
    fontSize: 13,
    fontWeight: "400",
  },
  workingHours: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "flex-start",
    marginTop: 0,
  },
  workingHoursStatus: {
    color: COLORS.green,
    fontSize: 13,
    fontWeight: "400",
    marginRight: 0,
  },
  workingHoursText: {
    color: COLORS.darkgray,
    fontSize: 13,
    fontWeight: "400",
  },
});



      {/* This is for custom activity */}
      {/* <TouchableOpacity
      activeOpacity={0.7}
      style={[
        styles.activityItem,
        {
          marginLeft: activityAmount > 1 ? 20 : 15,
          zIndex: index === 0 ? 5 : 1,
          backgroundColor: checkedIn ? "#fffcf5" : "#fff",
          minHeight: "auto",
          height: "auto",
        },
      ]}
      onPress={() =>
        navigation.navigate("DineScreen", {
          isPreview: true,
        })
      }
    >
      {activityAmount > 1 && (
        <View style={styles.activityIcon}>
          <View style={styles.circle}></View>
        </View>
      )}

      <View
        style={[
          checkedIn ? tripDetailStyles.checkedIn : null,
          styles.activityContent,
        ]}
      >
        <View style={styles.cardBody}>
          <FloatingActionButton
            title="Open with"
            buttons={
              Platform.OS === "ios"
                ? [
                    //@ts-expect-error
                    {
                      label: "Google Maps",
                      onPress: () =>
                        openMap(data?.location, "google", data?.address),
                      icon: null,
                      isDanger: false,
                    },
                    //@ts-expect-error
                    {
                      label: "Apple Maps",
                      onPress: () =>
                        openMap(data?.location, "apple", data?.address),
                      icon: null,
                      isDanger: false,
                    },
                  ]
                : [
                    //@ts-expect-error
                    {
                      label: "Google Maps",
                      onPress: () =>
                        openMap(data?.location, "google", data?.address),
                      icon: null,
                      isDanger: false,
                    },
                  ]
            }
            renderTrigger={() => (
              <View style={styles.mapContainer}>
                <Image
                  source={{ uri: mapUrl }}
                  style={{
                    width: "100%",
                    height: 100,
                    marginTop: 5,
                    borderRadius: 6,
                  }}
                />
                <BlurView intensity={100} tint="light" style={styles.blurView}>
                  <Text style={styles.blurViewText}>
                    9 Baratashvili St, Borzhomi 1200, Georgia
                  </Text>
                </BlurView>
              </View>
            )}
          />

          <View style={styles.contentSide}>
            <Text numberOfLines={2} style={tripDetailStyles.sightTitle}>
              Puri guliani
            </Text>
            <View style={styles.generalContentWrapper}>
              <View style={styles.workingHours}>
                <Text style={styles.workingHoursStatus}>Open</Text>
                <Text style={styles.workingHoursText}>⋅ 10:00 - 22:00</Text>
              </View>
            </View>
          </View>
        </View>
      </View>

      <NoteDescriptionGallery />

      <ActivityCardActions
        item={item}
        handleChangeActivityVisited={handleChangeActivityVisited}
        checkedIn={checkedIn}
        index={index}
        onQuestionModalOpen={onQuestionModalOpen}
        type="flight"
      />
    </TouchableOpacity> */}