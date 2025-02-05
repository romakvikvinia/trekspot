import { useMemo, useRef, useState } from "react";
import {
  Alert,
  Animated,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Portal } from "react-native-portalize";
import RenderHTML from "react-native-render-html";

import { COLORS, SIZES } from "../../styles/theme";
import {
  SafetyIcon2,
  SecurityIndexIcon,
  SmileIcon,
} from "../../utilities/SvgIcons.utility";

const data = {
  content:
    "<h2>Key Threat Categories</h2><h3>1. Petty Crime</h3><p>Pickpocketing and bag-snatching are the most common crimes in Paris, particularly in crowded areas such as the Eiffel Tower, Louvre Museum, and public transportation like the Metro.<ul><li>Keep your valuables close and avoid displaying expensive items like jewelry or electronics.<li>Be cautious in crowded tourist spots and avoid distractions from strangers offering assistance or selling items.</ul><h3>2. Protests & Civil Unrest</h3><p>Protests and demonstrations frequently occur in areas such as Place de la République and around government buildings. These can sometimes escalate and disrupt traffic and transportation.<ul><li>Stay updated on local news and avoid large gatherings or protest zones.</ul><h3>3. Terrorism Risk</h3><p>Paris, like many global cities, faces a terrorism risk. Security measures are visibly in place, including patrols by armed police and soldiers in popular areas.<ul><li>Be aware of your surroundings and report any suspicious activities to authorities.</ul><h3>4. Transportation Safety</h3><p>Public transportation is generally safe but can be a hotspot for pickpocketing. Late at night, some Metro stations may feel unsafe due to lower traffic.<ul><li>Use official taxis or ride-hailing services at night and avoid empty train carriages.</ul><h2>Emergency Numbers</h2><ul><li>Police: 17<li>Medical Assistance: 15</ul><h2>General Tips</h2><ul><li>Learn a few basic French phrases, as locals appreciate the effort.<li>Carry a photocopy of your passport and keep the original in your hotel safe.<li>Purchase travel insurance to cover unexpected emergencies.</ul>",
};

const SecurityBox = ({ getColor, securityLevel }) => {
  return (
    <View
      style={[
        styles.box,
        {
          backgroundColor: getColor.bg,
          borderColor: getColor.bg,
        },
      ]}
    >
      <SafetyIcon2 size="18" color={getColor?.color} />
      <View>
        <Text style={[styles.boxText, { color: getColor.color }]}>
          {securityLevel === "secure"
            ? "Safe to travel, take normal security precautionss"
            : securityLevel === "warning"
              ? "Safe to travel, but exercise a high degree of caution"
              : "Recommended to avoid non-essential travel"}
        </Text>
      </View>
    </View>
  );
};

export const STI = ({securityLevel}) => {
  const [visible, setVisible] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const showPopup = () => {
    setVisible(true);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 150,
      useNativeDriver: true,
    }).start();
  };

  const hidePopup = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 10,
      useNativeDriver: true,
    }).start(() => setVisible(false));
  };

  const getColor = useMemo(() => {
    if (securityLevel === "secure") {
      return {
        bg: "#e8fdf9",
        color: "#1a806b",
      };
    } else if (securityLevel === "warning") {
      return {
        bg: "#fff6ec",
        color: "#d27d00",
      };
    } else {
      return {
        bg: "#fff2f1",
        color: "#d3362b",
      };
    }
  }, [securityLevel]);

  return (
    <>
    {securityLevel &&
      <Pressable
        style={({ pressed }) => [
          styles.stiButton,
          {
            opacity: pressed ? 0.5 : 1,
            backgroundColor: getColor.bg,
            borderColor: getColor.color,
            borderWidth: 1
          },
        ]}
        onPress={showPopup}
      >
        <SafetyIcon2 size="18" color={getColor.color} />
        <Text
          style={[
            styles.stiButtonText,
            {
              color: getColor.color,
            },
          ]}
        >
          Safety
        </Text>
      </Pressable>
}

      {visible && (
        <Portal>
          <View style={[StyleSheet.absoluteFillObject, styles.bg]}>
            <Animated.View style={[styles.contentCard, { opacity: fadeAnim }]}>
              <ScrollView style={styles.inner}>
                <View style={styles.topRow}>
                  <Text style={styles.title}>Safety</Text>
                </View>
                <View style={styles.ranking}>
                  <SecurityBox getColor={getColor} securityLevel={securityLevel} />
                  <View style={styles.bottomBoxes}>
                    <Pressable
                      onPress={() => {
                        Alert.alert(
                          "Security Threats Index",
                          "This index ranges from - 1 (low threat) to - 10 (high threat). A low value means the country is relatively safe with minimal security risks, while a high value indicates significant threats like terrorism, political instability, or armed conflicts.",
                          [{ text: "OK" }]
                        );
                      }}
                      style={[
                        styles.boxIn,
                        {
                          backgroundColor: "#f4faff",
                          borderColor: "#f4faff",
                        },
                      ]}
                    >
                      {/* <SecurityIndexIcon size="18" /> */}
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <View
                          style={{ flexDirection: "row", alignItems: "center" }}
                        >
                          <Text
                            style={[
                              styles.boxText,
                              {
                                marginLeft: 0,
                                marginTop: 0,
                                fontSize: 22,
                                fontWeight: "bold",
                                color: "#000",
                              },
                            ]}
                          >
                            4.5{" "}
                          </Text>
                          <View style={{ position: "relative" }}>
                            <Text
                              style={{
                                fontSize: 12,
                                position: "relative",
                                fontWeight: "bold",
                                top: 1,
                              }}
                            >
                              / 10
                            </Text>
                          </View>
                        </View>
                        <SecurityIndexIcon size="18" />
                      </View>
                      <Text
                        style={[
                          styles.boxText,
                          {
                            marginLeft: 0,
                            marginTop: 15,
                            fontSize: 11,
                          },
                        ]}
                      >
                        Security threat index →
                      </Text>
                    </Pressable>
                    <Pressable
                      onPress={() => {
                        Alert.alert(
                          "World Happiness Score",
                          "The World Happiness Score ranges from 0 to 10, where higher values indicate greater overall happiness and well-being in a country. This score is based on factors like income, social support, life expectancy, freedom, generosity, and perceptions of corruption.",
                          [{ text: "OK" }]
                        );
                      }}
                      style={[
                        styles.boxIn,
                        {
                          backgroundColor: "#f4f3fc",
                          borderColor: "#f4f3fc",
                        },
                      ]}
                    >
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <View
                          style={{ flexDirection: "row", alignItems: "center" }}
                        >
                          <Text
                            style={[
                              styles.boxText,
                              {
                                marginLeft: 0,
                                marginTop: 0,
                                fontSize: 22,
                                fontWeight: "bold",
                                color: "#000",
                              },
                            ]}
                          >
                            7{" "}
                          </Text>
                          <View style={{ position: "relative" }}>
                            <Text
                              style={{
                                fontSize: 12,
                                position: "relative",
                                fontWeight: "bold",
                                top: 1,
                              }}
                            >
                              / 10
                            </Text>
                          </View>
                        </View>
                        <SmileIcon size="18" />
                      </View>
                      <Text
                        style={[
                          styles.boxText,
                          {
                            marginLeft: 0,
                            marginTop: 15,
                            fontSize: 11,
                          },
                        ]}
                      >
                        World happiness score →
                      </Text>
                    </Pressable>
                  </View>
                </View>
                <RenderHTML
                  key={"topic"}
                  contentWidth={SIZES.width}
                  source={{
                    html: data.content || "",
                  }}
                  defaultTextProps={{
                    selectable: true,
                  }}
                  baseStyle={{
                    fontSize: 16,
                    lineHeight: 22,
                    paddingBottom: 30,
                    paddingTop: 0,
                    fontWeight: "400",
                  }}
                  tagsStyles={{
                    h2: {
                      marginTop: 0,
                      marginBottom: 8,
                      fontSize: 18,
                      fontWeight: "bold"
                    },
                    p: {
                      fontSize: 15,
                      lineHeight: 22,
                      fontWeight: "400",
                      marginTop: 0,
                      marginBottom: 15,
                    },
                    ol: {
                      lineHeight: 22,
                      paddingLeft: 0,
                      marginTop: 0,
                      paddingTop: 0,
                      marginBottom: 15,
                      paddingBottom: 0,
                    },
                    ul: {
                      paddingLeft: 15,
                      lineHeight: 22,
                      marginBottom: 15,
                      marginTop: 0,
                      paddingTop: 0
                    },
                    li: {
                      fontSize: 15,
                      lineHeight: 22,
                      marginBottom: 10,
                      marginTop: 0,
                      paddingTop: 0,
                    },
                    strong: {
                      fontWeight: "bold",
                    },
                  }}
                />
              </ScrollView>
              <Pressable onPress={hidePopup} style={styles.closeButton}>
                <Text style={styles.closeButtonText}>Close</Text>
              </Pressable>
            </Animated.View>
          </View>
        </Portal>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  bg: {
    alignItems: "center",
    backgroundColor: "rgba(0,0,0, 0.4)",
    justifyContent: "center",
    position: "absolute",
    zIndex: 1,
  },
  bottomBoxes: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  box: {
    alignItems: "center",
    backgroundColor: "#fff",
    borderColor: "#f2f2f2",
    borderRadius: 10,
    borderWidth: 1,
    flexDirection: "row",
    marginBottom: 10,
    padding: 15,
    paddingVertical: 15,
    textAlign: "left",
    width: "100%",
  },
  boxIn: {
    borderColor: "#f2f2f2",
    borderRadius: 15,
    borderWidth: 1,
    padding: 12,
    width: "48.5%",
  },
  boxText: {
    color: COLORS.darkgray,
    fontSize: 14,
    fontWeight: "500",
    marginLeft: 10,
  },
  closeButton: {
    backgroundColor: "#f2f2f2",
    borderRadius: 100,
    marginTop: 10,
    padding: 15,
    width: "100%",
  },
  closeButtonText: {
    color: COLORS.black,
    fontSize: 15,
    fontWeight: "500",
    textAlign: "center",
  },
  contentCard: {
    backgroundColor: "#fff",
    borderRadius: 15,
    elevation: 5,
    height: 500,
    justifyContent: "space-between",
    maxWidth: 500,
    minHeight: SIZES.height - 200,
    padding: 15,
    paddingRight: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    width: SIZES.width - 30,
    zIndex: 1,
  },
  inner: {
    flex: 1,
    paddingRight: 10,
  },
  ranking: {
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 25,
    marginTop: 15,
  },
  stiButton: {
    alignItems: "center",
    backgroundColor: "#00ae81",
    borderRadius: 5,
    flexDirection: "row",
    marginTop: 6,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  stiButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
    marginLeft: 5,
  },
  title: {
    color: COLORS.black,
    fontSize: 18,
    fontWeight: "bold",
  },
  topRow: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
