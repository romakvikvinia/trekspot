import { useCallback, useRef, useState } from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import * as Sharing from "expo-sharing";
import ViewShot from "react-native-view-shot";
import { COLORS } from "../../styles/theme";
import {
  ImessageIcon,
  InstagramIcon,
  MessengerIcon,
  TrekspotWhite,
} from "../../utilities/SvgIcons.utility";
import { MapSvg } from "../../utilities/svg/map";
interface ShareModalProps {
  world: number;
  territories: number;
  achievedCountries: number;
  countries: any[];
}
const ShareModal: React.FC<ShareModalProps> = ({
  countries,
  world,
  territories,
  achievedCountries,
}) => {
  const ref = useRef();
  const [state, setState] = useState({ index: 0 });

  const handleNewImage = useCallback(() => {
    setState((prevState) => ({
      ...prevState,
      index: prevState.index !== 2 ? prevState.index + 1 : 0,
    }));
  }, []);

  const ShareItem = useCallback(async () => {
    //@ts-ignore
    let uri = await ref.current.capture();
    Sharing.shareAsync(`${uri}`, {
      mimeType: "image/jpeg",

      UTI: "JPEG",
    });
  }, []);

  return (
    <View style={styles.shareWrapper}>
      <TouchableOpacity
        style={styles.middle}
        onPress={() => handleNewImage()}
        activeOpacity={0.95}
      >
        <ViewShot
          //@ts-ignore
          ref={ref}
          options={{
            fileName: "Your-File-Name",
            format: "jpg",
            quality: 0.9,
          }}
          style={{
            alignItems: "center",
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 3,
            },
            shadowOpacity: 0.5,
            shadowRadius: 6,
            elevation: 5,
            width: 360,
            borderRadius: 15,
          }}
        >
          {state.index === 0 ? (
            <View
              style={{
                height: 430,
                width: 360,
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                paddingBottom: 35,
                position: "relative",
                backgroundColor: "#000",
              }}
            >
              <MapSvg width={300} countries={countries} />
              <View style={styles.row}>
                <View style={[styles.rowBox]}>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <Text style={styles.lg}>{world}</Text>
                    <Text
                      style={[
                        styles.sublabel,
                        { marginLeft: 2, marginBottom: 2 },
                      ]}
                    >
                      %
                    </Text>
                  </View>

                  <Text style={styles.statLabel}>World</Text>
                </View>
                <View style={[styles.rowBox]}>
                  <View style={styles.amountView}>
                    <Text style={styles.lg}>{achievedCountries}</Text>
                    <View style={styles.labelView}>
                      <Text style={styles.sublabel}>/</Text>
                      <Text style={[styles.sublabel, { marginTop: 2 }]}>
                        195
                      </Text>
                    </View>
                  </View>

                  <Text style={styles.statLabel}>Countries</Text>
                </View>
                <View style={[styles.rowBox]}>
                  <View style={styles.amountView}>
                    <Text style={styles.lg}>{territories}</Text>
                    <View style={styles.labelView}>
                      <Text style={styles.sublabel}>/</Text>
                      <Text style={[styles.sublabel, { marginTop: 2 }]}>6</Text>
                    </View>
                  </View>
                  <Text style={styles.statLabel}>Territories</Text>
                </View>
              </View>
              <Text
                style={{
                  color: "#fff",
                  fontWeight: "bold",
                  fontSize: 18,
                  position: "absolute",
                  bottom: 15,
                  left: 15,
                }}
              >
                My Travel Triumphs
              </Text>
              <View style={{ position: "absolute", bottom: 15, right: 15 }}>
                <TrekspotWhite width="70" />
              </View>
            </View>
          ) : null}
          {state.index === 1 ? (
            <ImageBackground
              style={{
                height: 300,
              }}
              source={{
                uri: "https://i.ibb.co/C2r6Hxp/Screenshot-2023-12-07-at-00-00-22.png",
              }}
            >
              <Text>...Something to rasterize.. skds mdslk</Text>
            </ImageBackground>
          ) : null}
          {state.index === 2 ? (
            <ImageBackground
              style={{
                height: 300,
              }}
              source={{
                uri: "https://img.freepik.com/premium-vector/world-map-with-location-pointers_115354-2.jpg",
              }}
            >
              <Text>...Something to rasterize.. skds mdslk</Text>
            </ImageBackground>
          ) : null}
        </ViewShot>

        <View style={styles.generateNew}>
          <View style={styles.generateNewButton}>
            <Text style={styles.generateNewButtonText}>Press for next</Text>
          </View>
        </View>
      </TouchableOpacity>
      <View style={styles.sharing}>
        {/* <TouchableOpacity activeOpacity={0.7} style={styles.shareButton}>
          <View style={styles.icon}>
            <MessageIcon />
          </View>
          <Text style={styles.shareButtonText}>Message</Text>
        </TouchableOpacity> */}
        {/* <TouchableOpacity activeOpacity={0.7} style={styles.shareButton}>
          <View style={styles.icon}>
            <InstagramIcon />
          </View>
          <Text style={styles.shareButtonText}>Instagram</Text>
        </TouchableOpacity> */}
        {/* <TouchableOpacity activeOpacity={0.7} style={styles.shareButton}>
          <View style={styles.icon}>
            <CopyIcon />
          </View>
          <Text style={styles.shareButtonText}>Copy</Text>
        </TouchableOpacity> */}
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.shareButton}
          onPress={() => ShareItem()}
        >
          <View style={styles.shareTextWrapper}>
            <Text style={styles.shareButtonText}>Share</Text>
          </View>
          <View style={styles.icon}>
            <InstagramIcon />
          </View>
          <View style={styles.icon}>
            <MessengerIcon />
          </View>
          <View style={styles.icon}>
            <ImessageIcon />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default ShareModal;

const styles = StyleSheet.create({
  shareWrapper: {
    justifyContent: "space-between",
    flex: 1,
    padding: 15,
  },
  shareTextWrapper: {
    backgroundColor: "#40264d",
    paddingVertical: 15,
    paddingHorizontal: 15,
    marginRight: 15,
  },
  middle: {
    marginTop: 25,
    marginBottom: 100,
    minHeight: 500,
    justifyContent: "center",
    alignItems: "center",
  },
  generateNew: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 15,
  },
  generateNewButton: {
    paddingVertical: 8,
  },
  generateNewButtonText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  sharing: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 25,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  shareButton: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 8,
    flexDirection: "row",
    backgroundColor: "#9164a6",
    borderRadius: 30,
    overflow: "hidden",
  },
  icon: {
    width: 30,
    height: 30,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  shareButtonText: {
    fontSize: 14,
    color: COLORS.white,
    marginLeft: 8,
    fontWeight: "bold",
  },
  row: {
    flexDirection: "row",
    display: "flex",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    marginTop: 0,
    marginBottom: 8,
  },
  rowBox: {
    width: "32%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
    borderWidth: 2,
    borderStyle: "solid",
  },
  lg: {
    fontSize: 24,
    marginBottom: 8,
    fontWeight: "bold",
    position: "relative",
    color: COLORS.primary,
  },
  statLabel: {
    fontSize: 12,
    color: COLORS.darkgray,
  },
  sublabel: {
    fontSize: 14,
    position: "relative",
    flexDirection: "row",
    alignItems: "center",
    lineHeight: 25,
    color: COLORS.white,
  },
  amountView: {
    flexDirection: "row",
    alignItems: "center",
  },
  labelView: {
    position: "relative",
    bottom: 3,
    marginLeft: 4,
    flexDirection: "row",
    alignItems: "center",
  },
});
