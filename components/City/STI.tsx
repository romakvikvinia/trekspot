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
    content: `<h2>Summary</h2>
  <p>Paris is generally safe for travelers, but pickpocketing and occasional protests require caution.</p>
  
  <h2>Key Threat Categories</h2>
  <h2>1. Petty Crime</h2>
  <p>Common in crowded tourist areas like the Eiffel Tower, Louvre, and Metro.</p>
  <ul>
    <li>Keep belongings secure and avoid engaging with street vendors offering 'free' items.</li>
  </ul>
  
  <h2>2. Protests & Civil Unrest</h2>
  <p>Protests often occur at Place de la République or Champs-Élysées.</p>
  <ul>
    <li>Check local news before heading to these areas.</li>
  </ul>
  
  <h2>3. Terrorism Risk</h2>
  <p>Paris maintains a high level of security due to past incidents.</p>
  <ul>
    <li>Stay vigilant in public spaces and follow local authorities' instructions during emergencies.</li>
  </ul>
  
  <h2>4. Transportation Safety</h2>
  <p>Metro is safe but prone to pickpocketing during rush hours.</p>
  <ul>
    <li>Avoid empty Metro cars late at night.</li>
  </ul>
  
  <h2>Emergency Numbers</h2>
  <ul>
    <li>Police: 112 (EU emergency number)</li>
    <li>Medical Assistance: 15</li>
  </ul>
  
  <h2>General Tips</h2>
  <ul>
    <li>Avoid flashing valuables in public.</li>
    <li>Use reputable rideshares or official taxis at night.</li>
    <li>Stay updated with local news through apps like 'France 24' or 'Le Parisien.'</li>
  </ul>`
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
    backgroundColor: "#328f4b",
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
