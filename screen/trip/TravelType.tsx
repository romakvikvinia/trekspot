import * as Haptics from "expo-haptics";
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
  active: {
    borderColor: COLORS.black,
  },
  activeText: {
    color: COLORS.black,
  },
  closeButton: {
    alignItems: "center",
    backgroundColor: "#DBDBDB",
    borderRadius: 50,
    height: 30,
    justifyContent: "center",
    width: 30,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  subTitle: {
    fontSize: 16,
    marginTop: 10,
  },
  switcher: {
    alignItems: "flex-start",
    borderColor: "#ccc",
    borderRadius: 10,
    borderWidth: 1,
    flexDirection: "column",
    height: 100,
    justifyContent: "space-between",
    marginBottom: 15,
    paddingHorizontal: 15,
    paddingVertical: 15,
    width: "48%"
  },
  switcherLabel: {
    color: COLORS.black,
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 0,
  },
  switchers: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 25
  },
  title: {
    color: COLORS.black,
    fontSize: 24,
    fontWeight: "600",
  },
  wrapper: {
    marginBottom: 60,
    paddingHorizontal: 15,
    paddingTop: 15,
  },
});
