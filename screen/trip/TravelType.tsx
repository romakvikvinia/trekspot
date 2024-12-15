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
import * as Haptics from "expo-haptics";

export const TravelType = ({ modalTravelTypeRef, formik }) => {
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
            formik?.values?.travelType === "Solo" ? styles.active : null,
          ]}
          activeOpacity={0.5}
          onPress={() => {
            formik.setFieldValue("travelType", "Solo");
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            modalTravelTypeRef?.current?.close();
          }}
        >
          <OneUserIcon
            size="25"
            color="#000"
          />
          <Text
            style={[
              styles.switcherLabel,
              formik?.values?.travelType === "Solo" ? styles.activeText : null,
            ]}
          >
            Solo
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.switcher,
            formik?.values?.travelType === "Couple" ? styles.active : null,
          ]}
          activeOpacity={0.5}
          onPress={() => {
            formik.setFieldValue("travelType", "Couple");
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            modalTravelTypeRef?.current?.close();
          }}
        >
          <CoupleIcon
            size="25"
            color="#000"
          />
          <Text
            style={[
              styles.switcherLabel,
              formik?.values?.travelType === "Couple"
                ? styles.activeText
                : null,
            ]}
          >
            Couple
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.switcher,
            formik?.values?.travelType === "Family" ? styles.active : null,
          ]}
          activeOpacity={0.5}
          onPress={() => {
            formik.setFieldValue("travelType", "Family");
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            modalTravelTypeRef?.current?.close();
          }}
        >
          <FamilyIcon
            size="25"
            olor="#000"
          />
          <Text
            style={[
              styles.switcherLabel,
              formik?.values?.travelType === "Family"
                ? styles.activeText
                : null,
            ]}
          >
            Family
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.switcher,
            formik?.values?.travelType === "Friends" ? styles.active : null,
          ]}
          activeOpacity={0.5}
          onPress={() => {
            formik.setFieldValue("travelType", "Friends");
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            modalTravelTypeRef?.current?.close();
          }}
        >
          <UsersIcon
            size="25"
            color="#000"
          />
          <Text
            style={[
              styles.switcherLabel,
              formik?.values?.travelType === "Friends"
                ? styles.activeText
                : null,
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
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between"
  },
  switcher: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    marginBottom: 15,
    borderRadius: 10,
    flexDirection: "column",
    alignItems: "flex-start",
    width: "48%",
    height: 100,
    borderWidth: 1,
    borderColor: "#ccc",
    justifyContent: "space-between"
  },
  switcherLabel: {
    color: COLORS.black,
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 0,
  },
  active: {
    borderColor: COLORS.black,
  },
  activeText: {
    color: COLORS.black,
  },
  wrapper: {
    paddingHorizontal: 15,
    paddingTop: 15,
    marginBottom: 60,
  },
});
