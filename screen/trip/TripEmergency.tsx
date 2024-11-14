import {
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { BackIcon } from "../../utilities/SvgIcons.utility";
import Constants from "expo-constants";
import { COLORS } from "../../styles/theme";

import { Emergency } from "../../common/components/Destination/Emergency";
import { globalStyles } from "../../styles/globalStyles";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { TripRouteStackParamList } from "../../routes/trip/TripRoutes";
import React from "react";
import { useCountryByIso2Query } from "../../api/api.trekspot";
import { Loader } from "../../common/ui/Loader";

type Props = NativeStackScreenProps<TripRouteStackParamList, "TripEmergency">;

export const TripEmergency: React.FC<Props> = ({ navigation, route }) => {
  const { iso2 } = route?.params;

  const { data, isLoading, isError } = useCountryByIso2Query({ iso2 });

  if (isError) {
    Alert.alert("Error", "Something went wrong", [
      {
        onPress: () => {},
        text: "OK",
      },
    ]);
    return;
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={globalStyles.screenHeader}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={globalStyles.screenHeaderBackButton}
        >
          <BackIcon size="30" />
        </TouchableOpacity>

        <Text style={globalStyles.screenTitle}>Emergency</Text>
        <TouchableOpacity
          style={globalStyles.screenHeaderBackButton}
        ></TouchableOpacity>
      </View>

      <ScrollView
        style={{ flex: 1, flexGrow: 1 }}
        contentContainerStyle={{ paddingHorizontal: 0 }}
      >
        <Loader isLoading={isLoading} />
        {!isLoading && data && data.countryByIso2 && (
          <Emergency data={data.countryByIso2.emergency} />
        )}
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
    fontWeight: "600",
    color: COLORS.black,
    marginTop: 25,
    marginBottom: 10,
  },
});
