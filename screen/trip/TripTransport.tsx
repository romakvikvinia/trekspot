import {
  Alert,
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
import { COLORS } from "../../styles/theme";

import { globalStyles } from "../../styles/globalStyles";
import { useCountryByIso2Query } from "../../api/api.trekspot";
import React, { useEffect } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { TripRouteStackParamList } from "../../routes/trip/TripRoutes";
import { Loader } from "../../common/ui/Loader";

type Props = NativeStackScreenProps<TripRouteStackParamList, "TripTransport">;

export const TripTransport: React.FC<Props> = ({ route, navigation }) => {
  const { iso2 } = route.params;

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

        <Text style={globalStyles.screenTitle}>Apps</Text>
        <TouchableOpacity
          style={globalStyles.screenHeaderBackButton}
        ></TouchableOpacity>
      </View>

      <ScrollView
        style={{ flex: 1, flexGrow: 1 }}
        contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 15 }}
        //@ts-ignore
        selectable
      >
        {/* <Text style={styles.heading}>Helpful apps</Text> */}

        <Loader isLoading={isLoading} />

        {data?.countryByIso2.taxi.map((i) => (
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.transportItem}
            key={`taxt-${i.name}`}
            onPress={() =>
              Linking.openURL(
                `${Platform.OS === "android" ? i.android : i.ios}`
              )
            }
          >
            <View style={styles.transportItemIcon}>
              <ImageBackground
                source={{
                  uri: i.logo,
                }}
                resizeMode="cover"
                style={{ width: 65, height: 60 }}
              />
            </View>
            <Text style={styles.transportText}>{i.name}</Text>
          </TouchableOpacity>
        ))}
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
    marginBottom: 10,
  },
  transportItem: {
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 15,
    overflow: "hidden",
    marginTop: 15,
    width: "100%",
  },
  transportItemIcon: {
    backgroundColor: "#fff",
    padding: 0,
    alignItems: "center",
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
