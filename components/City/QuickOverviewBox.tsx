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
    content: `<h2>Overview</h2> <p>Shanghai, China's largest city and a global financial hub, is a mesmerizing blend of modern skyscrapers and historic districts. Known for its <strong>iconic skyline</strong>, including the Oriental Pearl Tower and Shanghai Tower, the city offers a dynamic mix of <strong>traditional culture, colonial history, and futuristic innovation</strong>. Tourists visit for its stunning riverfront <strong>The Bund</strong>, ancient temples, and vibrant shopping streets like Nanjing Road. As a former international concession, Shanghai also boasts unique European-style architecture in areas like the French Concession.</p> <h2>General Tips</h2> <ul> <li><strong>Peak Tourist Season:</strong> March–May (Spring) & September–November (Autumn, pleasant weather)</li> <li><strong>Low Season:</strong> June–August (Hot & humid), December–February (Cold, but fewer crowds)</li> <li><strong>Average Daily Budget:</strong> $50–$200+ (budget to luxury)</li> <li><strong>Local Currency:</strong> Chinese Yuan Renminbi (CNY, ¥)</li> <li><strong>Language:</strong> Mandarin Chinese (Limited English in local areas, but common in tourist spots)</li> <li><strong>Power Plug Types:</strong> Type I, A, C (220V)</li> <li><strong>Tipping Culture:</strong> Not common, except in high-end restaurants and hotels</li> <li><strong>Dress Code:</strong> Casual, but dress modestly when visiting temples</li> <li><strong>Alcohol Rules:</strong> Readily available, but ID is required for purchase</li> <li><strong>Public Behavior:</strong> Avoid loud conversations in public transport; respect personal space</li> <li><strong>Weekend Days:</strong> Saturday & Sunday</li> </ul> <h2>Safety Tips</h2> <p>Shanghai is generally a safe city, but be cautious of <strong>scams around tourist areas</strong>, especially involving overpriced tea houses or "friendly locals" inviting you to bars. Stick to reputable taxi services like <strong>Didi</strong> instead of unlicensed cabs. The city is safe for solo travelers, but always stay aware of your surroundings, especially at night. Keep an eye on personal belongings in crowded areas like <strong>Nanjing Road</strong> and <strong>People’s Square</strong>.</p> <h2>Where to Stay</h2> <p>For convenience and a great experience, consider these neighborhoods:</p> <ul> <li><strong>The Bund:</strong> Best for luxury hotels and stunning river views.</li> <li><strong>French Concession:</strong> Trendy and full of boutique hotels, cafés, and colonial charm.</li> <li><strong>People’s Square:</strong> Central location, good for first-time visitors.</li> <li><strong>Pudong:</strong> Modern and near skyscrapers, good for business travelers.</li> </ul> <h2>Visa Requirements</h2> <p>Many travelers need a visa to enter China. However, <strong>Shanghai offers a 144-hour visa-free transit policy</strong> for certain nationalities transiting through. Check your eligibility before travel.</p> <h2>Currency and Payment</h2> <p>The official currency is <strong>Chinese Yuan (CNY, ¥)</strong>. Most businesses prefer mobile payments via <strong>WeChat Pay</strong> or <strong>Alipay</strong>, but international credit cards are accepted in hotels and malls. Cash is still used but less common.</p> <h2>Language</h2> <p>Mandarin is the official language, and English is limited outside tourist areas. Useful phrases:</p> <ul> <li>Hello: 你好 (Nǐ hǎo)</li> <li>Thank you: 谢谢 (Xièxiè)</li> <li>How much?: 多少钱? (Duōshǎo qián?)</li> </ul> <h2>Transportation</h2> <p>Shanghai has one of the world's best public transport systems:</p> <ul> <li><strong>Metro:</strong> Fast, reliable, and inexpensive. Fares range from ¥3 to ¥10.</li> <li><strong>Public Transport Card:</strong> <strong>Shanghai Public Transportation Card</strong> (reloadable, used for metro, buses, and ferries).</li> <li><strong>Buses:</strong> Affordable but slower. Useful for reaching areas not covered by metro.</li> <li><strong>Taxis & Ride-hailing:</strong> <strong>Didi</strong> (like Uber) is widely used.</li> <li><strong>Walking & Cycling:</strong> Many areas are pedestrian-friendly; shared bikes like Mobike are available.</li> </ul> <h2>Weather and Packing</h2> <ul> <li><strong>Spring (March–May):</strong> Mild weather. Pack light jackets.</li> <li><strong>Summer (June–August):</strong> Hot and humid (~35°C/95°F). Bring sunscreen, light clothing.</li> <li><strong>Autumn (September–November):</strong> Pleasant temperatures (~20°C/68°F). Layered clothing recommended.</li> <li><strong>Winter (December–February):</strong> Cold (~0°C/32°F). Bring a warm coat.</li> </ul> <h2>Attractions</h2> <ul> <li><strong>The Bund:</strong> Historic waterfront with stunning skyline views.</li> <li><strong>Oriental Pearl Tower:</strong> Iconic landmark with observation decks.</li> <li><strong>Yu Garden:</strong> Traditional Chinese garden with pavilions and ponds.</li> <li><strong>Nanjing Road:</strong> Premier shopping street.</li> <li><strong>Shanghai Museum:</strong> Home to ancient Chinese artifacts.</li> </ul> <h2>Food and Dining</h2> <p>Must-try dishes:</p> <ul> <li><strong>Xiaolongbao:</strong> Soup dumplings, best tried at <strong>Din Tai Fung</strong> or local shops.</li> <li><strong>Sheng Jian Bao:</strong> Pan-fried pork buns.</li> <li><strong>Hairy Crab:</strong> Seasonal delicacy (Autumn).</li> <li><strong>Scallion Pancakes:</strong> Popular street food.</li> </ul> <h2>Internet and Apps</h2> <p>China restricts access to Google, Facebook, and WhatsApp. Download a <strong>VPN</strong> before traveling. Useful apps:</p> <ul> <li><strong>WeChat:</strong> Messaging, payments, and translations.</li> <li><strong>Didi:</strong> Ride-hailing.</li> <li><strong>Metro Shanghai:</strong> For metro navigation.</li> </ul> <h2>Cultural Etiquette</h2> <p>Respect local customs:</p> <ul> <li>Use both hands when giving/receiving business cards.</li> <li>Queue politely, avoid pushing.</li> <li>Avoid discussing politics.</li> </ul> <h2>Health and Safety</h2> <ul> <li>Tap water is not drinkable; buy bottled water.</li> <li>Emergency number: <strong>110</strong> (police), <strong>120</strong> (ambulance).</li> <li>Check vaccination requirements before travel.</li> </ul> <h2>Shopping Tips</h2> <ul> <li><strong>Nanjing Road:</strong> High-end shopping.</li> <li><strong>Tianzifang:</strong> Artsy area for souvenirs.</li> <li><strong>Fake Markets:</strong> Bargain for knock-off brands.</li> </ul>`
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
    borderColor: "#f2f2f2",
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
