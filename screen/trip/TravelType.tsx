import { TouchableOpacity, View } from "react-native";
import { StyleSheet, Text } from "react-native";
import { COLORS } from "../../styles/theme";
import {
  CoupleIcon,
  FamilyIcon,
  OneUserIcon,
  UsersIcon,
  XIcon,
} from "../../utilities/SvgIcons.utility";

export const TravelType = ({
  modalTravelTypeRef,
  travelType,
  setTravelType,
}) => {
  return (
    <View style={styles.wrapper}>
      <View style={styles.modalHeader}>
        <View>
          <Text style={styles.title}>Travel companions</Text>
          <Text style={styles.subTitle}>Select travel type</Text>
        </View>
        <TouchableOpacity
          onPress={() => modalTravelTypeRef?.current?.close()}
          activeOpacity={0.5}
          style={styles.closeButton}
        >
          <XIcon width="10" />
        </TouchableOpacity>
      </View>

      <View style={styles.switchers}>
        <TouchableOpacity
          style={[
            styles.switcher,
            travelType === "solo" ? styles.active : null,
          ]}
          activeOpacity={0.5}
          onPress={() => setTravelType("solo")}
        >
          <OneUserIcon
            size="15"
            color={travelType === "solo" ? "#fff" : "#000"}
          />
          <Text
            style={[
              styles.switcherLabel,
              travelType === "solo" ? styles.activeText : null,
            ]}
          >
            Solo
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.switcher,
            travelType === "couple" ? styles.active : null,
          ]}
          activeOpacity={0.5}
          onPress={() => setTravelType("couple")}
        >
          <CoupleIcon
            size="15"
            color={travelType === "couple" ? "#fff" : "#000"}
          />
          <Text
            style={[
              styles.switcherLabel,
              travelType === "couple" ? styles.activeText : null,
            ]}
          >
            Couple
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.switcher,
            travelType === "family" ? styles.active : null,
          ]}
          activeOpacity={0.5}
          onPress={() => setTravelType("family")}
        >
          <FamilyIcon
            size="15"
            color={travelType === "family" ? "#fff" : "#000"}
          />
          <Text
            style={[
              styles.switcherLabel,
              travelType === "family" ? styles.activeText : null,
            ]}
          >
            Family
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.switcher,
            travelType === "friends" ? styles.active : null,
          ]}
          activeOpacity={0.5}
          onPress={() => setTravelType("friends")}
        >
          <UsersIcon
            size="15"
            color={travelType === "friends" ? "#fff" : "#000"}
          />
          <Text
            style={[
              styles.switcherLabel,
              travelType === "friends" ? styles.activeText : null,
            ]}
          >
            Friends
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  modalHeader: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  closeButton: {
    backgroundColor: "#DBDBDB",
    width: 30,
    height: 30,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    color: COLORS.black,
  },
  subTitle: {
    fontSize: 16,
    marginTop: 10,
  },
  switchers: {
    marginTop: 25,
  },
  switcher: {
    backgroundColor: COLORS.white,
    paddingVertical: 15,
    paddingHorizontal: 15,
    marginBottom: 15,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  switcherLabel: {
    color: COLORS.black,
    fontSize: 16,
    fontWeight: "500",
    marginLeft: 8,
  },
  active: {
    backgroundColor: COLORS.primaryDark,
  },
  activeText: {
    color: COLORS.white,
  },
  wrapper: {
    paddingHorizontal: 15,
    paddingTop: 15,
    marginBottom: 60,
  },
});
