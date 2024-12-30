import * as Haptics from "expo-haptics";
import * as Sharing from "expo-sharing";
import { usePostHog } from "posthog-react-native";
import { useCallback, useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import ViewShot from "react-native-view-shot";

import { formatPercentage } from "../../helpers/number.helper";
import { COLORS, SIZES } from "../../styles/theme";
import { Events } from "../../utilities/Posthog";
import { MapSvg } from "../../utilities/svg/map";
import {
  ImessageIcon,
  InstagramIcon,
  MessengerIcon,
  TrekspotWhite,
} from "../../utilities/SvgIcons.utility";

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
  const posthog = usePostHog();
  const ref = useRef();
  const [state, setState] = useState({ index: 0 });
  const [color, setColor] = useState("#000");

  const ShareItem = useCallback(async () => {
    posthog.capture(Events.UserSharesStats, {});
    //@ts-ignore
    const uri = await ref.current.capture();
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
                    <Text style={[styles.lg, { color }]}>
                      {formatPercentage(world)}
                    </Text>
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
          style={[
            styles.colorItem,
            color === "#000" ? styles.colorActive : null,
          ]}
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
  amountView: {
    alignItems: "center",
    flexDirection: "row",
  },
  colorActive: {
    borderColor: "#ccc",
    borderWidth: 2,
  },
  colorItem: {
    backgroundColor: "#000",
    borderRadius: 50,
    height: 25,
    marginHorizontal: 5,
    width: 25,
  },
  colors: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 50,
  },
  icon: {
    alignItems: "center",
    display: "flex",
    height: 30,
    justifyContent: "center",
    marginRight: 10,
    width: 30,
  },
  labelView: {
    alignItems: "center",
    bottom: 3,
    flexDirection: "row",
    marginLeft: 4,
    position: "relative",
  },
  lg: {
    color: COLORS.primaryDark,
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
    position: "relative",
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
  row: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
    marginTop: 0,
    paddingHorizontal: 15,
  },
  rowBox: {
    alignItems: "center",
    borderRadius: 15,
    display: "flex",
    justifyContent: "center",
    width: "32%",
    // borderWidth: 2,
    // borderStyle: "solid",
    // borderColor: "#fff"
  },
  shareButton: {
    alignItems: "center",
    backgroundColor: "#363636",
    borderRadius: 30,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    marginHorizontal: 8,
    overflow: "hidden",
  },
  shareButtonText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: "bold",
    marginLeft: 8,
  },
  shareTextWrapper: {
    backgroundColor: "#000",
    marginRight: 15,
    paddingHorizontal: 15,
    paddingVertical: 15,
  },
  shareWrapper: {
    borderRadius: 15,
    flex: 1,
    justifyContent: "space-between",
    padding: 15
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
  statLabel: {
    color: COLORS.darkgray,
    fontSize: 12,
  },
  sublabel: {
    alignItems: "center",
    color: COLORS.gray,
    flexDirection: "row",
    fontSize: 14,
    lineHeight: 25,
    position: "relative",
  },
});
