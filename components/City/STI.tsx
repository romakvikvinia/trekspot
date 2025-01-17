import { useRef, useState } from "react";
import {
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

const data =  {
      content: "<h1>Bangkok Safety Tips for Travelers</h1>\n<p>Bangkok, Thailand's bustling capital, is a vibrant city with a rich cultural heritage, but like any major destination, it requires travelers to stay mindful of their safety. Here are essential tips to ensure a safe and enjoyable trip.</p>\n\n<h2>Crime and Personal Safety</h2>\n<ul>\n  <li>Be cautious of pickpocketing and bag-snatching, especially in crowded areas like markets, public transport, and tourist attractions.</li>\n  <li>Avoid displaying valuables like jewelry or expensive gadgets.</li>\n  <li>Use ATMs in well-lit, secure locations, and shield your PIN while entering it.</li>\n  <li>Be aware of scams targeting tourists, such as fake travel agencies or overly friendly strangers offering unsolicited help.</li>\n</ul>\n\n<h2>Terrorism and Security Risks</h2>\n<ul>\n  <li>Stay informed about the security situation through official travel advisories or local news.</li>\n  <li>Avoid crowded public areas or high-profile locations during times of increased risk.</li>\n  <li>Be vigilant in public transport hubs like airports and train stations.</li>\n</ul>\n\n<h2>Protests and Political Unrest</h2>\n<ul>\n  <li>Avoid any areas where protests or demonstrations are taking place.</li>\n  <li>Monitor local news and social media for updates on political events or unrest.</li>\n  <li>If caught in a demonstration, move calmly to a secure location and avoid engaging with participants.</li>\n</ul>\n\n<h2>General Safety Tips</h2>\n<ul>\n  <li>Dress modestly and respect local customs, especially when visiting temples or religious sites.</li>\n  <li>Keep your hotel address and contact details with you at all times.</li>\n  <li>Use licensed taxis or reputable rideshare apps to get around the city safely.</li>\n  <li>Avoid walking alone late at night, especially in unfamiliar areas.</li>\n</ul>\n\n<h2>Emergency Preparedness</h2>\n<ul>\n  <li>Save emergency numbers: Police (191), Tourist Police (1155), and Ambulance (1669).</li>\n  <li>Know the location of the nearest hospital and your country's embassy or consulate.</li>\n  <li>Carry a basic first-aid kit and any necessary medications.</li>\n  <li>Stay hydrated and be cautious about consuming street food to avoid foodborne illnesses.</li>\n</ul>\n\n<p>By staying informed and alert, you can have a safe and memorable experience exploring Bangkok’s vibrant culture and attractions.</p>"

  }
  

export const STI = () => {
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

  return (
    <>
      <Pressable
        style={({ pressed }) => [
          styles.stiButton,
          {
            opacity: pressed ? 0.5 : 1,
          },
        ]}
        onPress={showPopup}
      >
        <Text style={styles.stiButtonText}>STI 2.5</Text>
      </Pressable>

      {visible && (
        <Portal>
          <View style={[StyleSheet.absoluteFillObject, styles.bg]}>
            <Animated.View style={[styles.contentCard, { opacity: fadeAnim }]}>
              <ScrollView style={styles.inner}>
                <View style={styles.topRow}>
                  <Text style={styles.title}>Security threats index</Text>
                  <Text style={styles.titleValue}>0 - 10</Text>
                </View>
                <View style={styles.ranking}>
                  <View style={styles.box}>
                    <Text style={styles.badgeText}>2.55</Text>
                    <Text style={styles.boxText}>France rating</Text>
                  </View>
                  <View style={styles.box}>
                    <Text style={[styles.badgeText, {
                      color: COLORS.black
                    }]}>7</Text>
                    <Text style={styles.boxText}>Global rank</Text>
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
                      marginTop: 20,
                      marginBottom: 5,
                      fontSize: 18
                    },
                    p: {
                      fontSize: 14,
                      lineHeight: 22,
                      fontWeight: "400",
                      marginTop: 0,
                      marginBottom: 0,
                    },
                    ol: {
                      lineHeight: 22,
                      paddingLeft: 0,
                      listStyleType: "none",
                      marginTop: 0,
                      paddingTop: 0,
                      marginBottom: 0,
                      paddingBottom: 0,
                    },
                    ul: {
                      paddingLeft: 15,
                      lineHeight: 22,
                      listStyleType: "ordered",
                      marginBottom: 0,
                    },
                    li: {
                      fontSize: 14,
                      lineHeight: 22,
                      marginBottom: 15,
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
  badgeText: {
    color: "#328f4b",
    fontSize: 24,
    fontWeight: "bold"
  },
  bg: {
    alignItems: "center",
    backgroundColor: "rgba(0,0,0, 0.4)",
    justifyContent: "center",
    position: "absolute",
    zIndex: 1,
  },
  box: {
    alignItems: "center",    
    backgroundColor: "#fafafa",
    borderRadius: 10,
    flexDirection: "column",
    padding: 10,
    paddingVertical: 15,
    width: "48%"
  },
  boxText: {
    color: COLORS.black,
    fontSize: 14,
    fontWeight: "500",
    marginTop: 5
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
    zIndex: 1
  },
  inner: {
    flex: 1,
    paddingRight: 10
  },
  ranking: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
    marginTop: 15
  },
  stiButton: {
    backgroundColor: "#00ae81",
    borderRadius: 10,
    marginTop: 6,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  stiButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "500",
  },
  title: {
    color: COLORS.black,
    fontSize: 18,
    fontWeight: "bold",
  },
  titleValue: {
    color: COLORS.black,
    fontSize: 22,
    fontWeight: "bold",
  },
  topRow: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
