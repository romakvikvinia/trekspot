import { useNavigation, useRoute } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { useMemo } from "react";
import {
  ImageBackground,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

import { trekSpotApi } from "../../../api/api.trekspot";
import { useAppDispatch } from "../../../package/store";
import { BackIcon, DotsVerticlIcon } from "../../../utilities/SvgIcons.utility";
import { HeaderTextContent } from "./HeaderTextcontent";
import { TripHelpers } from "./TripHelpers";

type ReachHeaderContentProps = {
  data: any;
  iso2: string;
  onQuestion2ModalOpen: () => void;
  activeDay: number;
};

export const ReachHeaderContent = ({
  data,
  iso2,
  onQuestion2ModalOpen,
}: ReachHeaderContentProps) => {
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
        <BackIcon />
      </Pressable>
      {/* <TouchableOpacity
        onPress={() =>
          navigation.navigate("TripMapViewScreen", {
            tabData,
            city: data?.cities[0],
            activeDay: activeDay,
          })
        }
        activeOpacity={0.7}
        style={styles.mapButton}
      >
        <MapWithLocationIcon width={15} color={COLORS.black} />
      </TouchableOpacity> */}
      <TouchableOpacity
        onPress={() => onQuestion2ModalOpen()}
        activeOpacity={0.7}
        style={[
          styles.mapButton,
          {
            right: 15,
          },
        ]}
      >
        <DotsVerticlIcon size="15" color="#000" />
      </TouchableOpacity>

      {/* <MapHeader
            trip={data}
            topSights={topSights}
            key={data?.cities[0]?.city}
            /> */}
    </>
  );
};

const styles = StyleSheet.create({
  backButton: {
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 50,
    display: "flex",
    height: 35,
    justifyContent: "center",
    left: 15,
    position: "absolute",
    top: 55,
    width: 35,
  },
  destTitle: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold",
  },
  mapButton: {
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 50,
    display: "flex",
    height: 35,
    justifyContent: "center",
    position: "absolute",
    right: 60,
    top: 55,
    width: 35,
  },
  reachContainer: {
    overflow: "hidden",
    position: "relative",
  },
  reachGradient: {
    flex: 1,
    paddingTop: 110,
  },
  reachImage: {
    height: 315,
    width: "100%",
  },
  textContent: {
    paddingHorizontal: 20,
  },
});
