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
    content: "<h2>Overview</h2><p><strong>Shanghai</strong>, China's largest city, is a global financial hub known for its modern skyline, historical landmarks, and vibrant culture. The city perfectly blends futuristic architecture with rich traditions, offering something for every traveler.</p> <h2>Visa Requirements</h2><p>Most travelers require a visa to enter China, but Shanghai offers a <strong>144-hour visa-free transit policy</strong> for travelers from certain countries if they meet specific criteria. Ensure your passport is valid for at least 6 months from the date of entry.</p> <h2>Currency and Payment</h2><p><strong>Chinese Yuan (CNY)</strong> or Renminbi (RMB). Mobile payment apps like <strong>WeChat Pay</strong> and <strong>Alipay</strong> are widely used. Some international credit cards are accepted in hotels and upscale restaurants, but cash is recommended for smaller shops. Withdraw cash from ATMs that support international cards. Carry smaller denominations for convenience.</p> <h2>Language</h2><p>Mandarin Chinese is the main language spoken. English is spoken in major tourist areas but not widely understood elsewhere. Key phrases include: <strong>Hello: 你好 (Nǐ hǎo), Thank you: 谢谢 (Xièxiè), How much: 多少钱? (Duō shǎo qián?)</strong></p> <h2>Transportation</h2><p>Shanghai's metro system is efficient, affordable, and well-connected with signs in English. Taxis are reliable, but ride-hailing apps like DiDi (China's Uber) are more convenient for tourists. Many tourist areas like the Bund and French Concession are walkable.</p> <h2>Weather and Packing</h2><p>Spring (March to May) - mild weather, pack light layers. Summer (June to August) - hot and humid, pack breathable clothes and sunscreen. Autumn (September to November) - pleasant weather, light jacket recommended. Winter (December to February) - cold, bring a warm coat. Comfortable walking shoes are essential.</p> <h2>Attractions</h2><p><strong>The Bund</strong>: A waterfront promenade with stunning views of the Pudong skyline and colonial-era buildings. <strong>Yu Garden</strong>: A classical Chinese garden with beautiful pavilions, ponds, and rock formations. <strong>Shanghai Tower</strong>: One of the tallest buildings in the world, offering an observation deck with panoramic views.</p> <h2>Food and Dining</h2><p>Xiaolongbao (Soup Dumplings), Shengjianbao (Pan-Fried Pork Buns), Hairy Crab (Seasonal Delicacy), Hot Pot.</p> <h2>Internet and Apps</h2><p>Many hotels and cafes offer free Wi-Fi, but a VPN is needed to access blocked sites like Google, Facebook, and Instagram. Useful apps include: <strong>WeChat</strong> (for communication and payments), <strong>DiDi</strong> (for ride-hailing), <strong>Baidu Maps</strong> (for navigation), <strong>Pleco</strong> (for translation).</p> <h2>Cultural Etiquette</h2><p>Tipping is not customary in China. Avoid discussing sensitive political topics. Be polite and patient in crowded areas. When receiving a gift, use both hands.</p> <h2>Health and Safety</h2><p>Shanghai is generally very safe for tourists, with a low crime rate. However, keep the following tips in mind:</p><ul><li>Avoid unregistered taxis; use ride-hailing apps or licensed cabs.</li><li>Stay alert in crowded areas to prevent pickpocketing.</li><li>Drink only bottled or boiled water, as tap water is not safe for consumption.</li><li>Be cautious of scams, such as overpriced tea house invitations or fake goods in markets.</li></ul><p>Emergency contacts:</p><ul><li><strong>Police:</strong> 110</li><li><strong>Ambulance:</strong> 120</li></ul> <h2>Where to Stay</h2><p>The best areas to stay in Shanghai for tourists include:</p><ul><li><strong>The Bund:</strong> Ideal for luxury stays and proximity to major landmarks.</li><li><strong>People's Square:</strong> Central location with easy metro access.</li><li><strong>French Concession:</strong> Quiet, tree-lined streets with boutique hotels and a charming vibe.</li><li><strong>Pudong:</strong> Great for business travelers and those who enjoy a modern skyline view.</li></ul> <h2>Shopping Tips</h2><p>Popular shopping areas include:</p><ul><li><strong>Nanjing Road:</strong> A mix of luxury stores and affordable shops.</li><li><strong>Yuyuan Bazaar:</strong> A traditional market for souvenirs and crafts.</li><li><strong>AP Plaza:</strong> A market for knockoff goods and bargains.</li></ul><p>Bargaining is common in markets but not in malls. Avoid counterfeit goods.</p>"
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
                What to Expect
              </Text>
              <Text style={cityStyle.boxItemInSubTitle}>Ideal Visit Tips</Text>
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
                      fontSize: 18
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
              <Pressable onPress={hidePopup} style={cityStyle.closeButton}>
                <Text style={cityStyle.closeButtonText}>Close</Text>
              </Pressable>
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
    fontSize: 14,
    fontWeight: "400",
    textTransform: "uppercase",
  },
  closeButton: {
    backgroundColor: "#f2f2f2",
    borderRadius: 100,
    marginTop: 10,
    padding: 15,
    width: "100%"
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
