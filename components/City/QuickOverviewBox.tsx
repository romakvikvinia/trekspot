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

const data = {
    content: "<h2>Overview</h2><p>Hong Kong is a vibrant metropolis known for its stunning skyline, bustling harbor, and unique blend of Eastern and Western cultures. As a Special Administrative Region of China, Hong Kong offers a mix of modernity and tradition, making it a popular destination for tourists. Its attractions range from shopping and fine dining to cultural landmarks and breathtaking nature.</p> <h2>Where to Stay</h2><p>For safety and convenience, tourists should consider staying in areas like Central, Tsim Sha Tsui (TST), or Causeway Bay. These areas offer a wide range of accommodations, are well-connected by public transport, and are close to major attractions. Areas like Mong Kok are bustling but may feel overwhelming for some travelers. Avoid staying in overly remote areas or locations that are not well-reviewed for tourist stays.</p> <h2>Visa Requirements</h2><p>Hong Kong allows visa-free entry for citizens of many countries for short stays, ranging from 7 to 180 days depending on nationality. Visitors should check the Hong Kong Immigration Department's official website for the latest requirements and ensure their passport is valid for at least six months beyond their intended stay.</p> <h2>Currency and Payment</h2><p>The official currency is the Hong Kong Dollar (HKD). Credit cards are widely accepted, especially in hotels, restaurants, and shopping centers. Mobile payment apps like AlipayHK and WeChat Pay are popular. It's advisable to carry some cash for small vendors and street markets.</p> <h2>Language</h2><p>Cantonese is the most commonly spoken language. English is widely spoken in tourist areas and by service staff in hotels and restaurants. Useful phrases include: 'Nei ho' (Hello), 'Mm goi' (Thank you/excuse me), and 'Gei cin a?' (How much?).</p> <h2>Transportation</h2><p>Hong Kong has an efficient public transportation system, including the MTR (subway), buses, trams, and ferries. The Octopus Card is highly recommended for easy payment on public transport. Taxis are readily available but can be costly compared to public transport. Ride-hailing apps like Uber operate in the city, but they are not as common as taxis.</p> <h2>Weather and Packing</h2><p>Hong Kong has a subtropical climate: <ul><li><strong>Spring (March-May):</strong> Mild and humid; pack light jackets and umbrellas.</li> <li><strong>Summer (June-August):</strong> Hot and humid with typhoons; bring lightweight clothing and rain gear.</li> <li><strong>Autumn (September-November):</strong> Pleasant and dry; ideal for outdoor activities, light clothing is sufficient.</li> <li><strong>Winter (December-February):</strong> Cool and dry; pack layers and a light coat.</li></ul></p> <h2>Attractions</h2><p><strong>The Peak:</strong> Offers stunning views of the city and harbor. <strong>Victoria Harbour:</strong> Famous for its skyline and Symphony of Lights show. <strong>Ngong Ping 360 and Big Buddha:</strong> A cable car ride to a giant Buddha statue. <strong>Temple Street Night Market:</strong> A vibrant street market for shopping and dining. <strong>Disneyland and Ocean Park:</strong> Theme parks for family-friendly fun. <strong>Lan Kwai Fong:</strong> A popular nightlife area with bars and clubs.</p> <h2>Food and Dining</h2><p>Must-try dishes include dim sum, roast goose, wonton noodles, and egg tarts. Visit local tea houses and try street food at Mong Kok or Temple Street. High-end dining is also widely available in Central and TST.</p> <h2>Internet and Apps</h2><p>Free Wi-Fi is available in many public areas and establishments. Recommended apps include MTR Mobile (transport), OpenRice (dining), and Google Maps. A VPN is not necessary as Hong Kong has unrestricted internet access.</p> <h2>Cultural Etiquette</h2><p>Respect personal space and avoid loud behavior in public. Tipping is not mandatory but appreciated in restaurants. Offer and receive items with both hands as a sign of respect.</p> <h2>Health and Safety</h2><p><ul><li>Ensure vaccinations for general travel, such as Hepatitis A and B.</li><li>Emergency contact: Dial 999 for police, fire, or ambulance services.</li><li>Tap water is generally safe, but bottled water is recommended for sensitive stomachs.</li></ul></p> <h2>Safety Tips</h2><p>Hong Kong is generally safe, but tourists should remain vigilant. Safe areas to stay include Central, TST, and Causeway Bay. Avoid isolated areas at night, especially in Kowloon Walled City Park. Beware of pickpockets in crowded areas and avoid unlicensed taxis. Always carry a map or download offline maps for navigation.</p> <h2>Shopping Tips</h2><p>Popular shopping areas include Mong Kok (street markets), Causeway Bay (malls), and TST (luxury brands). Bargaining is common in street markets but not in malls. Look for unique souvenirs like Chinese teas, jade, and silk items.</p>"
}

export const QuickOverviewBox = () => {
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
          cityStyle.boxItem,
          {
            opacity: pressed ? 0.5 : 1,
          },
        ]}
        onPress={showPopup}
      >
        <View>
          <Text style={cityStyle.boxItemTitle}>Before you go</Text>
          <View style={cityStyle.boxItemIn}>
            <View style={cityStyle.boxItemInTitleWrapper}>
              <Text style={cityStyle.boxItemInTitleText}>
                Quick overview
              </Text>
              <Text style={cityStyle.boxItemInSubTitle}>Key Highlights</Text>
            </View>
            <View
            style={[
              cityStyle.boxItemInTitleWrapper,
                {
                  marginTop: 10,
                },
              ]}
          >
              <Text style={cityStyle.boxItemInTitleText}>
                Cost 90$
              </Text>
              <Text style={cityStyle.boxItemInSubTitle}>Avg. Daily cost</Text>
            </View>
          </View>
        </View>
        <Text style={cityStyle.moreDetails}>
            More details →
        </Text>
      </Pressable>

      {visible && (
        <Portal>
          <View style={[StyleSheet.absoluteFillObject, cityStyle.bg]}>
            <Animated.View
              style={[cityStyle.contentCard, { opacity: fadeAnim }]}
            >
              <ScrollView style={cityStyle.inner}>
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
                      marginBottom: 5,
                      fontSize: 18,
                      fontWeight: "500"
                    },
                    p: {
                      fontSize: 14,
                      lineHeight: 22,
                      fontWeight: "400",
                      marginTop: 0,
                      marginBottom: 20,
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
                      marginTop: 0,
                      paddingTop: 0
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
             <View style={{paddingRight: 10}}>
              <Pressable onPress={hidePopup} style={cityStyle.closeButton}>
                  <Text style={cityStyle.closeButtonText}>Close</Text>
                </Pressable>
             </View>
            </Animated.View>
          </View>
        </Portal>
      )}
    </>
  );
};

const cityStyle = StyleSheet.create({
  bg: {
    alignItems: "center",
    backgroundColor: "rgba(0,0,0, 0.4)",
    justifyContent: "center",
    position: "absolute",
    zIndex: 1,
  },
  boxItem: {
    backgroundColor: "#fff",
    borderColor: "#fafafa",
    borderRadius: 15,
    borderWidth: 1,
    height: 185,
    justifyContent: "space-between",
    marginRight: 15,
    padding: 15,
    width: 200
  },
  boxItemIn: {
    flexDirection: "column",
    marginTop: 15,
  },
  boxItemInSubTitle: {
    color: COLORS.gray,
    fontSize: 12,
    fontWeight: "500",
    marginTop: 5,
    width: "100%",
  },
  boxItemInTitleText: {
    color: COLORS.black,
    fontSize: 18,
    fontWeight: "600",
    maxWidth: "80%",
  },
  boxItemInTitleWrapper: {
    flexDirection: "column",
    flexWrap: "wrap",
  },
  boxItemTitle: {
    fontSize: 12,
    fontWeight: "400",
    textTransform: "uppercase",
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
    height: 400,
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
    paddingRight: 10
  },
  moreDetails: {
    color: COLORS.primary,
    fontSize: 14,
    marginTop: 15
  },
});
