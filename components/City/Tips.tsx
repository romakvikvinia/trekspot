import { ScrollView, StyleSheet, Text, View } from "react-native";

import { TripInsights } from "../../screen/trip/TripInsights";
import { COLORS, SIZES } from "../../styles/theme";
import { LightBulbIcon } from "../../utilities/SvgIcons.utility";

export const Tips = ({ activeTab, iso2 }) => {
  const route= {
    params: {
      iso2: iso2
    }
  }
  return (
    <View
      style={{
        display: activeTab === "Tips" ? "flex" : "none",
        minHeight: SIZES.height,
        paddingBottom: 35
      }}
    >
      <ScrollView style={styles.tips} contentContainerStyle={{paddingHorizontal: 15}} horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.tip}>
          <View style={styles.topRow}>
            <Text style={styles.title}>How to Avoid Crowds</Text>
            <LightBulbIcon size="20" />
          </View>
          <Text style={styles.desc}>
            Paris experiences its highest tourist traffic during summer. Booking accommodations and attractions in advance is recommended.
          </Text>
        </View>
        <View style={styles.tip}>
          <View style={styles.topRow}>
            <Text style={styles.title}>How to Avoid Crowds</Text>
            <LightBulbIcon size="20" />
          </View>
          <Text style={styles.desc}>
            Paris experiences its highest tourist traffic during summer. Booking accommodations and attractions in advance is recommended.
          </Text>
        </View>
        <View style={styles.tip}>
          <View style={styles.topRow}>
            <Text style={styles.title}>Peak Seasons</Text>
            <LightBulbIcon size="20" />
          </View>
          <Text style={styles.desc}>
            Paris experiences its highest tourist traffic during summer. Booking accommodations and attractions in advance is recommended.
          </Text>
        </View>
      </ScrollView>
      <TripInsights route={route} showHeader={false} />
    </View>
  );
};
export const styles = StyleSheet.create({
  desc: {
    color: COLORS.black,
    fontSize: 14,
    lineHeight: 20
  },
  tip: {
    backgroundColor: "#ebebeb",
    borderRadius: 15,
    marginBottom: 0,
    marginRight: 15,
    maxWidth: SIZES.width - 100,
    padding: 15
  },
  tips: {
    marginBottom: 20,
    marginTop: 25
  },
  title: {
    color: COLORS.black,
    fontSize: 16,
    fontWeight: "500",
    maxWidth: "85%"
  },
  topRow: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  }
});