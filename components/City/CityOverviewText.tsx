import { useState } from "react";
import { Pressable } from "react-native";
import { StyleSheet } from "react-native";
import RenderHTML from "react-native-render-html";

import { SIZES } from "../../styles/theme";

const desc = `<p><strong>Dubai</strong> is a city in <strong>the United Arab Emirates</strong> with a population of approximately <strong>3.6 million</strong> people. It is known for its futuristic skyline, luxury shopping, and vibrant nightlife. As a global business hub, Dubai seamlessly blends ultramodern architecture with rich Arabian heritage.</p>  

<p><strong>Historical Background:</strong> Originally a small fishing and pearl-diving village, Dubai transformed dramatically after the discovery of oil in the 1960s. Visionary leadership and strategic investments turned it into a major financial, tourism, and trade center. Today, it is one of the world's most advanced and fast-growing cities.</p>  

<p><strong>Key Landmarks and Attractions:</strong></p>  
<ul>  
  <li><strong>Burj Khalifa</strong> – The tallest building in the world, offering breathtaking views from its observation decks.</li>  
  <li><strong>Dubai Mall</strong> – One of the largest shopping malls globally, featuring an indoor aquarium, ice rink, and luxury boutiques.</li>  
  <li><strong>Palm Jumeirah</strong> – A man-made island shaped like a palm tree, home to luxury resorts like Atlantis The Palm.</li>  
  <li><strong>Burj Al Arab</strong> – The iconic sail-shaped hotel, known for its opulence and exclusivity.</li>  
  <li><strong>Dubai Marina</strong> – A waterfront district with skyscrapers, yacht clubs, and high-end restaurants.</li>  
</ul>  

<p><strong>Modern Influence:</strong> Dubai is a global leader in innovation, home to the world's busiest airport for international travel, the first 3D-printed office building, and futuristic projects like The Museum of the Future. The city also hosts international events such as Expo 2020 and the Dubai Shopping Festival.</p>  

<p><strong>Why Tourists Visit:</strong></p>  
<ul>  
  <li>Experience the luxury and futuristic attractions, from sky-high observation decks to indoor ski resorts.</li>  
  <li>Enjoy authentic Emirati and international cuisine, including <strong>shawarma</strong>, <strong>luqaimat</strong> (sweet dumplings), and fine dining experiences.</li>  
  <li>Shop tax-free in world-class malls and bustling souks, such as the <strong>Gold Souk</strong> and <strong>Spice Souk</strong>.</li>  
  <li>Go on thrilling desert safaris with dune bashing, camel rides, and Bedouin-style dinners.</li>  
  <li>Explore cultural heritage at <strong>Al Fahidi Historic District</strong> and <strong>Dubai Museum</strong>.</li>  
</ul>`;

export const CityOverviewText = () => {
  const [expanded, setExpanded] = useState(false);
  return (
    <Pressable
      style={styles.cityOverview}
      onPress={() => setExpanded(!expanded)}
    >
      <RenderHTML
        key={"topic"}
        contentWidth={SIZES.width}
        source={{
          html: expanded ? desc : `${desc.slice(0, 190)}... <span style="color: #000; font-weight: bold;">Read more</span>` || "",
        }}
        defaultTextProps={{
          selectable: true,
        }}
        baseStyle={{
          fontSize: 16,
          lineHeight: 22,
          paddingBottom: 0,
          paddingTop: 0,
          fontWeight: "400",
        }}
        tagsStyles={{
          h2: {
            marginTop: 0,
            marginBottom: 8,
            fontSize: 18,
            fontWeight: "bold",
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
            paddingTop: 0,
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
      {/* <Text style={styles.cityOverviewText}>
        {expanded ? desc : desc.slice(0, 130)}{" "}
        <Text style={{ color: COLORS.primary }}>
          {expanded ? "Read less" : "Read more"}
        </Text>
      </Text> */}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  cityOverview: {
    padding: 15,
  },
});
