import { useNavigation } from "@react-navigation/native";
import { usePostHog } from "posthog-react-native";
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { Events } from "../../utilities/Posthog";

export const TripToolkit = () => {
  const navigation = useNavigation();
  const posthog = usePostHog();
  
  return (
    <>
      <Text style={styles.h2}>Trip toolkit</Text>
      <View style={styles.toolboxes}>
        <TouchableOpacity
          onPress={() => {  
            posthog?.capture(Events.UseVisaCheckerFromToolkit, {});
            navigation.navigate("VisaCheckerScreen");
          }}
          activeOpacity={0.7}
          style={styles.boxItem}
        >
          <ImageBackground
            resizeMode="cover"
            resizeMethod="scale"
            source={require("../../assets/visa.webp")}
            style={styles.boxItemInner}
          >
            <Text
              style={[
                styles.boxItemInnerText,
                {
                  maxWidth: "80%",
                },
              ]}
            >
              Where I can go?
            </Text>
          </ImageBackground>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => 
            { 
              posthog?.capture(Events.UseSeasonalExplorer, {});
              navigation.navigate("SeasonalExplorerScreen");
            }}
          activeOpacity={0.7}
          style={styles.boxItem}
        >
          <ImageBackground
            resizeMode="cover"
            resizeMethod="scale"
            source={require("../../assets/season.webp")}
            style={styles.boxItemInner}
          >
            <Text style={styles.boxItemInnerText}>The seasonal explorer</Text>
          </ImageBackground>
        </TouchableOpacity>
      </View> 
    </>
  );
};

const styles = StyleSheet.create({
 
  boxItem: {
    borderRadius: 12,
    height: 140,
    overflow: "hidden",
    width: "48.5%",
  },
  boxItemInner: {
    alignItems: "flex-start",
    flex: 1,
    height: 140,
    justifyContent: "flex-end",
    width: "100%",
  },
  boxItemInnerText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "700",
    paddingBottom: 15,
    paddingHorizontal: 20,
    textAlign: "left",
    width: "100%",
  },
  h2: {
    color: "#000",
    fontSize: 20,
    fontWeight: "700",
  },
  toolboxes: {
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
  }, 
});
