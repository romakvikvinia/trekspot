import { NativeStackScreenProps } from "@react-navigation/native-stack";
import Constants from "expo-constants";
import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  Alert,
  ImageBackground,
  Linking,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { useCountryByIso2Query } from "../../api/api.trekspot";
import { Loader } from "../../common/ui/Loader";
import { NodataText } from "../../components/common/NoDataText";
import { TripRouteStackParamList } from "../../routes/trip/TripRoutes";
import { globalStyles } from "../../styles/globalStyles";
import { BackIcon } from "../../utilities/SvgIcons.utility";

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
       <StatusBar style="dark" />
      <View style={globalStyles.screenHeader}>
        <Pressable
          onPress={() => navigation.goBack()}
          style={globalStyles.screenHeaderBackButton}
          hitSlop={20}
        >
          <BackIcon size="18" />
        </Pressable>

        <Text style={globalStyles.screenTitle}>Apps</Text>
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
            <Text style={[globalStyles.underScreenTabText,
              globalStyles.underScreenTabActiveText
            ]}>Italy</Text>
          </Pressable>
          <Pressable style={globalStyles.underScreenTab}>
            <Text style={globalStyles.underScreenTabText}>Germany</Text>
          </Pressable> 
        </ScrollView>
      </View>
      <ScrollView
        style={{ flex: 1, flexGrow: 1 }}
        contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 0 }}
        //@ts-ignore
        selectable
      >
        {isLoading && (
          <View style={{ height: 200 }}>
            <Loader isLoading={isLoading} background="#F2F2F7" />
          </View>
        )}
        
        {!isLoading && !data?.countryByIso2?.taxi?.length && <NodataText />}

        {!isLoading &&
          data?.countryByIso2?.taxi?.map((i) => (
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
    backgroundColor: "#F2F2F7",
    flex: 1,
    paddingTop: Constants?.statusBarHeight + 10,
  },
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
