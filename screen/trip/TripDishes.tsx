import Constants from "expo-constants";
import {
  Pressable,
  SafeAreaView,
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
import { SIZES } from "../../styles/theme";
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
    <SafeAreaView style={dishStyles.safeArea}>
      <StatusBar style="dark" />
      <View style={globalStyles.screenHeader}>
        <Pressable
          onPress={() => navigation.goBack()}
          style={globalStyles.screenHeaderBackButton}
          hitSlop={20}
        >
          <BackIcon size="18" />
        </Pressable>

        <Text style={globalStyles.screenTitle}>National dishes</Text>
        <TouchableOpacity
          style={globalStyles.screenHeaderBackButton}
        ></TouchableOpacity>
      </View>
      <View>
        <ScrollView
          horizontal
          style={globalStyles.underScreenTabs}
          contentContainerStyle={{
            paddingHorizontal: 15,
          }}
          showsHorizontalScrollIndicator={false}
        >
          <Pressable
            style={[
              globalStyles.underScreenTab,
              globalStyles.underScreenTabActive,
            ]}
          >
            <Text
              style={[
                globalStyles.underScreenTabText,
                globalStyles.underScreenTabActiveText,
              ]}
            >
              Italy
            </Text>
          </Pressable>
          <Pressable style={globalStyles.underScreenTab}>
            <Text style={globalStyles.underScreenTabText}>Germany</Text>
          </Pressable>
        </ScrollView>
      </View>
      <ScrollView style={{ flex: 1 }}>
        <View
          style={{
            minHeight: SIZES.height,
            flex: 1,
          }}
        >
          <Dining iso2={iso2} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const dishStyles = StyleSheet.create({
  safeArea: {
    backgroundColor: "#F2F2F7",
    flex: 1,
    paddingTop: Constants?.statusBarHeight + 10,
  },
});
