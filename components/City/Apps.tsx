import {
  ImageBackground,
  Linking,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { SIZES } from "../../styles/theme";
import { NodataText } from "../common/NoDataText";

export const Apps = ({ activeTab, apps }) => {
  return (
    <View
      style={{
        display: activeTab === "Apps" ? "flex" : "none",
        minHeight: SIZES.height,
        paddingHorizontal: 15
      }}
    >
      {!apps?.length && <NodataText />}

      {apps?.map((i) => (
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.transportItem}
          key={`taxt-${i.name}`}
          onPress={() =>
            Linking.openURL(`${Platform.OS === "android" ? i.android : i.ios}`)
          }
        >
          <View style={styles.transportItemIcon}>
            <ImageBackground
              source={{
                uri: i.logo,
              }}
              resizeMode="contain"
              style={{ width: 65, height: 60 }}
            />
          </View>
          <Text style={styles.transportText}>{i.name}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  transportItem: {
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 15,
    flexDirection: "row",
    marginTop: 15,
    overflow: "hidden",
    width: "100%",
  },
  transportItemIcon: {
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 0,
  },
  transportText: {
    fontSize: 16,
    fontWeight: "bold",
    paddingHorizontal: 10,
  },
});
