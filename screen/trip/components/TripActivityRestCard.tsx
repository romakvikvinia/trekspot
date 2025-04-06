/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigation } from "@react-navigation/native";
import { BlurView } from 'expo-blur';
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

interface TripActivityRestCardProps {
  activityAmount: number;
  checkedIn: boolean;
  item: any;
  index: number;
  onQuestionModalOpen: any;
  handleChangeActivityVisited: any;
}

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

//   useEffect(() => {
//     const staticMapUrl = `https://maps.googleapis.com/maps/api/staticmap?center=41.7006,44.8083&zoom=14&size=600x300&scale=2&markers=icon:${icon}|41.7006,44.8083&style=feature:all|element:geometry.fill|color:0xf5f5f3&style=feature:water|color:0xc8e1e8&style=feature:landscape.natural.landcover|color:0xd2eca1&style=feature:road|element:geometry|color:0xffffff&style=feature:road|element:labels|visibility:on&style=feature:poi|visibility:off&style=feature:transit|visibility:off&key=${apiKey}
// `;
//     // const staticMapUrl2 = `https://api.mapbox.com/styles/v1/mapbox/light-v10/static/pin-s-attraction+285A98(41.7006,44.8083)/41.7006,44.8083,10/600x400?access_token=pk.eyJ1IjoiYWRvbyIsImEiOiJjbTk1cWtnMXExY3N3MmtxdHkyNnVhZXg0In0.hSTRiyKVew59zLeCbkoWwg&attribution=false&logo=false`;
//     setMapUrl(staticMapUrl);
//     setLoading(false);
//   }, []);

  return (
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
          <View style={styles.mapContainer}>
            {/* <Image
              source={{ uri: mapUrl }}
              style={{
                width: "100%",
                height: 130,
                marginTop: 5,
                borderRadius: 6,
              }}
            /> */}
            <BlurView
              intensity={100}
              tint="light"
              style={styles.blurView}
            > 
            <Text style={styles.blurViewText}>9 Baratashvili St, Borzhomi 1200, Georgia</Text>
            </BlurView>
          </View>
          <View style={styles.contentSide}>
            <Text numberOfLines={2} style={tripDetailStyles.sightTitle}>
              Puri guliani
            </Text>

            <View style={styles.generalContentWrapper}>
              
              <Text style={styles.generalContentWrapperText}>
                Time: <Text style={styles.time}>15:00</Text>
              </Text>
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
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  activityContent: {
    flexDirection: "column",
    flex: 1,
    height: "100%",
    paddingHorizontal: 5,
    paddingTop: 0,
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
  blurView: {
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    bottom: 0,
    left: 0,
    paddingHorizontal: 10,
    paddingVertical: 5,
    position: "absolute",
    width: "100%",
  },
  blurViewText: {
    color: COLORS.gray,
    fontSize: 13,
    fontWeight: "500",
  },
  cardBody: {
    flex: 1,
    flexDirection: "column",
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
    marginTop: 15,
    paddingLeft: 15,
    paddingRight: 15
  },
  generalContentWrapper: {
    marginTop: 5,
  },
  generalContentWrapperText: {
    color: COLORS.gray,
    fontSize: 12,
    fontWeight: "500",
    marginTop: 5,
  },
  icon: {
    alignItems: "center",
    backgroundColor: "#f78e45",
    borderRadius: 100,
    height: 50,
    justifyContent: "center",
    width: 50,
  },
  mapContainer: {
    position: "relative", 
  },
  time: {
    fontSize: 12,
  },
});
