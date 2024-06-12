import {
    ImageBackground,
  Linking,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { BackIcon } from "../../utilities/SvgIcons.utility";
import Constants from "expo-constants";
import { COLORS, SIZES } from "../../styles/theme";
import { useNavigation } from "@react-navigation/native";
import RenderHTML from "react-native-render-html";
import { globalStyles } from "../../styles/globalStyles";

export const TripTransport = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.safeArea}>
     <View style={globalStyles.screenHeader}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={globalStyles.screenHeaderBackButton}
        >
          <BackIcon size="30" />
        </TouchableOpacity>

        <Text style={globalStyles.screenTitle}>Transport</Text>
        <TouchableOpacity style={globalStyles.screenHeaderBackButton}></TouchableOpacity>
      </View>

      <ScrollView
        style={{ flex: 1, flexGrow: 1 }}
        contentContainerStyle={{ paddingHorizontal: 20 }}
        selectable
      >
        <Text style={styles.heading}>
           General info
        </Text>
        <RenderHTML
          key={"topic"}
          contentWidth={SIZES.width}
          source={{
            html: `
            <ul style="line-height: 27px; padding-left: 15px">
                <li style="line-height: 22px; font-size: 16px; margin-bottom: 8px"><strong>Trains:</strong> 
                    Connect major cities (affordable, under $10 usually).
                </li>
                <li style="line-height: 22px; font-size: 16px; margin-bottom: 8px"><strong>Metro (Tbilisi only):</strong> 
                    Fast and convenient (around ₾1 per ride).
                </li>
                <li style="line-height: 22px; font-size: 16px; margin-bottom: 8px"><strong>Marshrutkas:</strong> 
                    Minibuses for city and intercity travel (cheap, fares depend on distance).
                </li>
                <li style="line-height: 22px; font-size: 16px; margin-bottom: 8px"><strong>Buses:</strong> 
                    Extensive network for cities and regions (affordable).
                </li>
            </ul>
            `,
          }}
          defaultTextProps={{
            selectable: true,
          }}
        />
        <Text style={styles.heading}>
            Taxi apps
        </Text>
        <TouchableOpacity
            activeOpacity={0.7}
            style={styles.transportItem}
            key={`taxt-${2}`}
            // onPress={() =>
            //   Linking.openURL(
            //     `${Platform.OS === "android" ? item.android : item.ios}`
            //   )
            // }
          >
            <View style={styles.transportItemIcon}>
              <ImageBackground
                source={{
                  uri: 'https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/90/7f/a6/907fa619-ce8d-32cc-feb4-4a30b0e24816/AppIcon-0-0-1x_U007emarketing-0-7-0-sRGB-85-220.png/246x0w.webp',
                }}
                resizeMode="cover"
                style={{ width: 55, height: 50 }}
              />
            </View>
            <Text style={styles.transportText}>Uber</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.transportItem}
            key={`taxt-${4}`}
            // onPress={() =>
            //   Linking.openURL(
            //     `${Platform.OS === "android" ? item.android : item.ios}`
            //   )
            // }
          >
            <View style={styles.transportItemIcon}>
              <ImageBackground
                source={{
                  uri: 'https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/ce/88/d9/ce88d9b4-5794-f849-de84-1986ab9dc09e/AppIcon-0-0-1x_U007emarketing-0-5-0-0-85-220.png/246x0w.webp',
                }}
                resizeMode="cover"
                style={{ width: 55, height: 50 }}
              />
            </View>
            <Text style={styles.transportText}>Yandex</Text>
          </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F2F2F7",
    paddingTop: Constants?.statusBarHeight + 10,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    marginBottom: 10,
  },
  destination: {
    fontSize: 18,
    fontWeight: "500",
  },
  backButton: {
    width: 30,
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    color: COLORS.black,
    marginTop: 25,
     marginBottom: 10
  },
  transportItem: {
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 5,
    overflow: "hidden",
    marginTop: 15,
    width: "100%"
  },
  transportItemIcon: {
    backgroundColor: "#fff",
    padding: 0,
    alignItems: "center"
  },
  transportText: {
    fontSize: 16,
    fontWeight: "bold",
    paddingHorizontal: 10,
  },
  textContentWrapper: {
    backgroundColor: "#fafafa",
    padding: 15,
    borderRadius: 10,
    marginTop: 25,
    flexDirection: "row",
    alignItems: "center",
  },
});
