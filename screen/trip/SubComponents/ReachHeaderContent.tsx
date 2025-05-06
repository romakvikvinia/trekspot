import { useNavigation, useRoute } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { useMemo } from "react";
import { ImageBackground, Pressable, StyleSheet, View } from "react-native";

import { trekSpotApi } from "../../../api/api.trekspot";
import { useAppDispatch } from "../../../package/store";
import {
  AddUserIcon,
  BackIcon,
  GearIcon,
} from "../../../utilities/SvgIcons.utility";
import { HeaderTextContent } from "./HeaderTextcontent";
import { TripHelpers } from "./TripHelpers";

type ReachHeaderContentProps = {
  data: any;
  iso2: string;
  activeDay: number;
};

export const ReachHeaderContent = ({ data, iso2 }: ReachHeaderContentProps) => {
  const dispatch = useAppDispatch();
  const route = useRoute();
  const navigation = useNavigation();

  const imagePath = useMemo(() => {
    return data?.cities[0]?.image?.url || route?.params?.city?.image?.url;
  }, [route, data]);

  return (
    <>
      <View style={styles.reachContainer}>
        <ImageBackground
          source={{
            uri: imagePath,
          }}
          style={styles.reachImage}
        >
          <LinearGradient
            colors={["rgba(0,0,0,0.3)", "rgba(0,0,0,1)"]}
            style={styles.reachGradient}
          >
            <HeaderTextContent data={data} />
            <TripHelpers data={data} iso2={iso2} reachView />
          </LinearGradient>
        </ImageBackground>
      </View>

      <Pressable
        onPress={() => {
          dispatch(trekSpotApi.util.invalidateTags(["myTrips", "trip"]));
          navigation.goBack();
        }}
        hitSlop={30}
        style={styles.backButton}
      >
        <BackIcon color="#fff" size="15" />
      </Pressable>

      <View style={styles.rg}>
      {/* <Pressable
          style={styles.inviteButton}
          onPress={() => navigation.navigate("TripEmergency", { iso2 })}
        >
          <EmergencyLinearIcon color="#fff" size="16" />
        </Pressable> */}
        <Pressable
          style={styles.inviteButton}
          onPress={() => navigation.navigate("InviteTripMember")}
        >
          <AddUserIcon color="#fff" size="16" />
        </Pressable>

        <Pressable
          onPress={() =>  
            //@ts-expect-error ///
            navigation.navigate("TripSettings", {
              trip: data,
            })
          }
          hitSlop={15}
          style={[styles.button]}
        >
          <GearIcon size="18" color="#fff" />
        </Pressable>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  backButton: {
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    borderRadius: 50,
    display: "flex",
    height: 36,
    justifyContent: "center",
    left: 15,
    position: "absolute",
    top: 55,
    width: 36,
  },
  button: {
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    borderRadius: 50,
    display: "flex",
    height: 37,
    justifyContent: "center",
    width: 37,
  },
  inviteButton: {
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    borderRadius: 100,
    flexDirection: "row",
    height: 37,
    justifyContent: "center",
    marginRight: 10,
    paddingHorizontal: 15,
    position: "relative",
    width: 37,
  },
  reachContainer: {
    overflow: "hidden",
    position: "relative",
  },
  reachGradient: {
    flex: 1,
    paddingTop: 100,
  },
  reachImage: {
    height: 285,
    width: "100%",
  },
  rg: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "flex-end",
    position: "absolute",
    right: 15,
    top: 55,
  },
});
