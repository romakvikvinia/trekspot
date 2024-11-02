import { LinearGradient } from "expo-linear-gradient";
import {
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import {
  BackIcon,
  DotsVerticlIcon,
  MapWithLocationIcon,
} from "../../../utilities/SvgIcons.utility";
import { TripHelpers } from "./TripHelpers";
import { useNavigation } from "@react-navigation/native";
import { COLORS } from "../../../styles/theme";
import { HeaderTextContent } from "./HeaderTextcontent";

type ReachHeaderContentProps = {
  data: any;
  iso2: string;
  tabData: any;
  onQuestion2ModalOpen: () => void;
  activeDay: number;
};

export const ReachHeaderContent = ({
  data,
  iso2,
  tabData,
  onQuestion2ModalOpen,
  activeDay,
}: ReachHeaderContentProps) => {
  const navigation = useNavigation();

  return (
    <>
      <View style={styles.reachContainer}>
        <ImageBackground
          source={{
            uri: data?.cities[0]?.image?.url,
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

      <TouchableOpacity
        onPress={() => navigation.goBack()}
        activeOpacity={0.7}
        style={styles.backButton}
      >
        <BackIcon />
      </TouchableOpacity>
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
  reachContainer: {
    position: "relative",
    overflow: "hidden",
  },
  textContent: {
    paddingHorizontal: 20,
  },
  reachGradient: {
    flex: 1,
    paddingTop: 110,
  },
  destTitle: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#fff",
  },
  reachImage: {
    height: 315,
    width: "100%",
  },
  backButton: {
    position: "absolute",
    top: 55,
    left: 15,
    width: 35,
    height: 35,
    backgroundColor: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
  },
  mapButton: {
    position: "absolute",
    top: 55,
    right: 60,
    width: 35,
    height: 35,
    backgroundColor: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
  },
});
