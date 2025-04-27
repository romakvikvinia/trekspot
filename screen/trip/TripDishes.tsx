import Constants from "expo-constants";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { enGB, registerTranslation } from "react-native-paper-dates";
registerTranslation("en", enGB);

import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";

import { Dining } from "../../common/components/Destination/Dining";
import { globalStyles } from "../../styles/globalStyles";
import { BackIcon } from "../../utilities/SvgIcons.utility";

export const TripDishes = ({ route }) => {
  const navigation = useNavigation();
  const iso2 = route?.params?.iso2;

  // const openMap = (name: string) => {
  //   const scheme = Platform.select({
  //     ios: "maps://0,0?q=",
  //     android: "geo:0,0?q=",
  //   });
  //   const url = Platform.select({
  //     ios: `${scheme}${name}`,
  //     android: `${scheme}${name}`,
  //   });

  //   Linking.openURL(url);
  // };

  return (
    <View style={dishStyles.safeArea}>
      <StatusBar style="dark" />
      <View style={globalStyles.screenHeader}>
        <Pressable
          onPress={() => navigation.goBack()}
          style={globalStyles.screenHeaderBackButton}
          hitSlop={20}
        >
          <BackIcon size="18" />
        </Pressable>

        <Text style={globalStyles.screenTitle}>Local dishes</Text>
        <TouchableOpacity
          style={globalStyles.screenHeaderBackButton}
        ></TouchableOpacity>
      </View>
      <ScrollView
        style={{ flex: 1, paddingHorizontal: 5 }}
        contentContainerStyle={{
          paddingTop: 25,
        }}
      >
        <Dining iso2={iso2} showTitle={false} isTrip={true} />
      </ScrollView>
    </View>
  );
};

const dishStyles = StyleSheet.create({
  safeArea: {
    backgroundColor: "#F2F2F7",
    flex: 1,
    paddingTop: Constants?.statusBarHeight + 15,
  },
});
