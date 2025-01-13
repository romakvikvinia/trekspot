/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigation } from "@react-navigation/native";
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { COLORS } from "../../../styles/theme";
import { EventIcon } from "../../../utilities/SvgIcons.utility";
import { tripDetailStyles } from "../_tripDetailStyles";
import { ActivityCardActions } from "./ActivityCardActions";
import { NoteDescriptionGallery } from "./NoteDescriptionGallery";

interface TripActivityEventCardProps {
  activityAmount: number;
  checkedIn: boolean;
  item: any;
  index: number;
  onQuestionModalOpen: any;
  handleChangeActivityVisited: any;
}

export const TripActivityEventCard: React.FC<TripActivityEventCardProps> = ({
  activityAmount,
  checkedIn,
  item,
  index,
  onQuestionModalOpen,
  handleChangeActivityVisited,
}) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={[
        styles.activityItem,
        {
          marginLeft: activityAmount > 1 ? 20 : 15,
          zIndex: index === 0 ? 5 : 1,
          backgroundColor: checkedIn ? "#fffcf5" : "#fff",
          height: "auto",
        },
      ]}
      onPress={() =>
        navigation.navigate("EventsScreen", {
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
          <View style={styles.icon}>
            <EventIcon size={22} color="#fff" />
          </View>
          <View style={styles.contentSide}>
            <Text numberOfLines={2} style={tripDetailStyles.sightTitle}>
              Real madrid vs Barca
            </Text>

            <View style={styles.generalContentWrapper}>
              <Text style={styles.generalContentWrapperText}>
                9 Baratashvili St, Borzhomi 1200, Georgia
              </Text>
              <Text style={styles.generalContentWrapperText}>
                Time: <Text style={styles.time}>15:00</Text>
              </Text>
            </View>
          </View>
        </View>
      </View>

      <NoteDescriptionGallery
        notes="This is test note"
        description="This is description"
      />

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
    paddingHorizontal: 15,
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
  cardBody: {
    flex: 1,
    flexDirection: "row",
    marginTop: 15,
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
    paddingLeft: 15,
    paddingRight: 15,
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
    backgroundColor: "#e46cd5",
    borderRadius: 100,
    height: 50,
    justifyContent: "center",
    width: 50,
  },
  time: {
    fontSize: 12,
  },
});
