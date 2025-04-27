import { NativeStackScreenProps } from "@react-navigation/native-stack";
import Constants from "expo-constants";
import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { useCountryByIso2Query } from "../../api/api.trekspot";
import { Emergency } from "../../common/components/Destination/Emergency";
import { Loader } from "../../common/ui/Loader";
import { NodataText } from "../../components/common/NoDataText";
import { TripRouteStackParamList } from "../../routes/trip/TripRoutes";
import { globalStyles } from "../../styles/globalStyles";
import { BackIcon } from "../../utilities/SvgIcons.utility";

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
    <View style={styles.safeArea}>
      <StatusBar style="dark" />

      <View style={globalStyles.screenHeader}>
        <Pressable
          onPress={() => navigation.goBack()}
          style={globalStyles.screenHeaderBackButton}
          hitSlop={20}
        >
          <BackIcon size="18" />
        </Pressable>

        <Text style={globalStyles.screenTitle}>Emergency numbers</Text>
        <TouchableOpacity
          style={globalStyles.screenHeaderBackButton}
        ></TouchableOpacity>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingHorizontal: 0 }}
      >
        {isLoading && (
          <View style={{ flex: 1, height: 200 }}>
            <Loader isLoading={isLoading} background="#F2F2F7" />
          </View>
        )}

        {!isLoading && !data && <NodataText />}

        {!isLoading && data && data.countryByIso2 && (
          <Emergency
            data={data.countryByIso2.emergency}
            isSeparatePage={true}
          />
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: "#F2F2F7",
    flex: 1,
    paddingTop: Constants?.statusBarHeight + 15,
  },
});
