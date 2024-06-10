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
import { COLORS, SIZES } from "../../styles/theme";
import {
  ImessageIcon,
  InstagramIcon,
  MessengerIcon,
  TrekspotWhite,
} from "../../utilities/SvgIcons.utility";
import { MapSvg } from "../../utilities/svg/map";
import * as Haptics from "expo-haptics";

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
  const [color, setColor] = useState("#000");

  // const handleNewImage = useCallback(() => {
  //   setState((prevState) => ({
  //     ...prevState,
  //     index: prevState.index !== 2 ? prevState.index + 1 : 0,
  //   }));
  // }, []);

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
        // onPress={() => handleNewImage()}
        activeOpacity={1}
      >
        <ViewShot
          //@ts-ignore
          ref={ref}
          options={{
            fileName: "Trekspot-triump",
            format: "jpg",
            quality: 0.9,
          }}
          style={{
            alignItems: "center",
            shadowColor: "#fff",
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
                width: SIZES.width < 370 ? 340 : 360,
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                paddingBottom: 0,
                position: "relative",
                backgroundColor: "#f1f1f1",
                paddingHorizontal: 15,
                borderRadius: 15,
              }}
            >
              <Text
                style={{
                  color: "#000",
                  fontWeight: "bold",
                  fontSize: 18,
                  position: "absolute",
                  top: 20,
                  left: 95,
                  zIndex: 2,
                }}
              >
                My Travel Triumphs
              </Text>
              <MapSvg width={300} countries={countries} color={color} />
              <View style={styles.row}>
                <View style={[styles.rowBox]}>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <Text style={[styles.lg, { color }]}>{world}</Text>
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
                    <Text style={[styles.lg, { color }]}>
                      {achievedCountries}
                    </Text>
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
                    <Text style={[styles.lg, { color }]}>{territories}</Text>
                    <View style={styles.labelView}>
                      <Text style={styles.sublabel}>/</Text>
                      <Text style={[styles.sublabel, { marginTop: 2 }]}>6</Text>
                    </View>
                  </View>
                  <Text style={styles.statLabel}>Territories</Text>
                </View>
              </View>

              <View style={{ position: "absolute", bottom: 15, right: 15 }}>
                <TrekspotWhite width="70" color="#000" />
              </View>
            </View>
          ) : null}
        </ViewShot>
      </TouchableOpacity>

      <View style={styles.colors}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            setColor("#000");
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          }}
          style={[styles.colorItem, color === "#000" ? styles.colorActive : null,]}
        ></TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            setColor("#31a24c");
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          }}
          style={[
            styles.colorItem,
            color === "#31a24c" ? styles.colorActive : null,
            {
              backgroundColor: "#31a24c",
            },
          ]}
        ></TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            setColor("#007aff");
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          }}
          style={[
            styles.colorItem,
            color === "#007aff" ? styles.colorActive : null,
            {
              backgroundColor: "#007aff",
            },
          ]}
        ></TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            setColor("#f0284a");
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          }}
          style={[
            styles.colorItem,
            color === "#f0284a" ? styles.colorActive : null,
            {
              backgroundColor: "#f0284a",
            },
          ]}
        ></TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            setColor("#de9502");
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          }}
          style={[
            styles.colorItem,
            color === "#de9502" ? styles.colorActive : null,
            {
              backgroundColor: "#de9502",
            },
          ]}
        ></TouchableOpacity>
      </View>

      <View style={styles.sharing}>
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
  colors: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 50,
  },
  colorItem: {
    width: 25,
    height: 25,
    borderRadius: 50,
    backgroundColor: "#000",
    marginHorizontal: 5,
  },
  colorActive: {
    borderWidth: 2,
    borderColor: "#ccc"
  },
  shareWrapper: {
    justifyContent: "space-between",
    flex: 1,
    padding: 15,
    backgroundColor: "#fff"
  },
  shareTextWrapper: {
    backgroundColor: "#000",
    paddingVertical: 15,
    paddingHorizontal: 15,
    marginRight: 15,
  },
  middle: {
    marginTop: 25,
    marginBottom: 30,
    // minHeight: 500,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 15,
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
    backgroundColor: "#363636",
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
    // borderWidth: 2,
    // borderStyle: "solid",
    // borderColor: "#fff"
  },
  lg: {
    fontSize: 24,
    marginBottom: 8,
    fontWeight: "bold",
    position: "relative",
    color: COLORS.primaryDark,
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
    color: COLORS.gray,
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
