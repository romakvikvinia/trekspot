import { Pressable, ScrollView, StyleSheet, Text } from "react-native";
import { View } from "react-native";

import { COLORS } from "../../../styles/theme";
import { AmsterdamIcon, AthensIcon, BangkokIcon, BarcelonaIcon, BerlinIcon, DubaiIcon, FlorenceIcon, HongkongIcon, IstanbulIcon, KualaIcon, LisboaIcon, LondonIcon, LosAngelesIcon, MacauIcon, MadridIcon, MeccaIcon, MilanIcon, MoscowIcon, MunichIcon, NewyorkIcon, OsakaIcon, ParisIcon, PragueIcon, RomeIcon, ShanghaiIcon, SingaporeIcon, TaipeiIcon, TokyoIcon, TorontoIcon, VeniceIcon, ViennaIcon } from "../../../utilities/svg/monuments";
import { CityIcon } from "../../../utilities/SvgIcons.utility";

const cities = [
  { id: 0, title: "Paris", stay: "4-7", icon: ParisIcon },
  { id: 1, title: "Bangkok", stay: "3-7", icon: BangkokIcon },
  { id: 2, title: "Barcelona", stay: "4-6", icon: BarcelonaIcon },
  { id: 2, title: "London", stay: "4-7", icon: LondonIcon },
  { id: 4, title: "Dubai", stay: "3-5", icon: DubaiIcon },
  { id: 5, title: "Hong Kong", stay: "3-5", icon: HongkongIcon },
  { id: 6, title: "Istanbul", stay: "3-5", icon: IstanbulIcon },
  { id: 7, title: "Antalya", stay: "4-7" },
  { id: 8, title: "Singapore", stay: "3-4", icon: SingaporeIcon },
  { id: 9, title: "Kuala Lumpur", stay: "3-5", icon: KualaIcon },
  { id: 10, title: "New York City", stay: "5-7", icon: NewyorkIcon },
  { id: 11, title: "Madrid", stay: "3-5", icon: MadridIcon },
  { id: 12, title: "Shenzhen", stay: "2-3" },
  { id: 13, title: "Amsterdam", stay: "3-5", icon: AmsterdamIcon },
  { id: 14, title: "Seoul", stay: "3-5" },
  { id: 15, title: "Macau", stay: "2-3", icon: MacauIcon },
  { id: 16, title: "Rome", stay: "3-5", icon: RomeIcon },
  { id: 17, title: "Taipei", stay: "3-4", icon: TaipeiIcon },
  { id: 18, title: "Osaka", stay: "3-4", icon: OsakaIcon },
  { id: 19, title: "Vienna", stay: "3-4", icon: ViennaIcon },
  { id: 20, title: "Milan", stay: "2-4", icon: MilanIcon },
  { id: 21, title: "Berlin", stay: "3-5", icon: BerlinIcon },
  { id: 22, title: "Mecca", stay: "1-3", icon: MeccaIcon },
  { id: 23, title: "Los Angeles", stay: "4-7", icon: LosAngelesIcon },
  { id: 24, title: "Prague", stay: "3-4", icon: PragueIcon },
  { id: 25, title: "Venice", stay: "2-3", icon: VeniceIcon },
  { id: 26, title: "Athens", stay: "3-4", icon: AthensIcon},
  { id: 27, title: "Ho Chi Minh City", stay: "2-4" },
  { id: 28, title: "Shanghai", stay: "3-5", icon: ShanghaiIcon },
  { id: 29, title: "Guangzhou", stay: "2-3" },
  { id: 30, title: "Lisbon", stay: "3-4", icon: LisboaIcon },
  { id: 31, title: "Tokyo", stay: "4-7", icon: TokyoIcon },
  { id: 32, title: "Dublin", stay: "3-4", },
  { id: 33, title: "Toronto", stay: "3-5", icon: TorontoIcon },
  { id: 34, title: "Miami", stay: "3-5" },
  { id: 35, title: "Moscow", stay: "4-6", icon: MoscowIcon },
  { id: 36, title: "Munich", stay: "3-4", icon: MunichIcon },
  { id: 37, title: "Florence", stay: "3-5", icon: FlorenceIcon },
  { id: 38, title: "Riyadh", stay: "2-3" },
]; 

const randomLightColors = [
  "#FFE4E1",
  "#e7fae7",
  "#eaeaf5",
  "#F0F0F0",
  "#faf5e8",
  "#F5F5F5",
  "#F0FFFF",
  "#FAF0E6",
  "#FFF5EE",
];

export const DestinationSuggestions = () => {
  return (
    <View style={styles.suggestionsContainer}>
      <Text style={styles.title}>Top Destinations</Text>
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        {cities.map((item) => (
          <Pressable style={styles.suggestionItem} key={item.title}>
            <View style={styles.suggestionItemIcon}>
              <View
                style={[
                  styles.icon,
                  {
                    backgroundColor:
                      randomLightColors[
                        Math.floor(Math.random() * randomLightColors.length)
                      ],
                  },
                ]}
              >
                {item.icon ? <item.icon /> : <CityIcon />}
              </View>
              <View style={styles.suggestionMeta}>
                <Text style={styles.suggestionItemTitle}>{item.title}</Text>
                <Text style={styles.suggestionItemSubtitle}>
                  Stay: {item.stay} days
                </Text>
              </View>
            </View>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  icon: {
    alignItems: "center",
    backgroundColor: "#f2f2f2",
    borderRadius: 10,
    height: 50,
    justifyContent: "center",
    width: 50,
  },
  suggestionItem: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  suggestionItemIcon: {
    alignItems: "center",
    flexDirection: "row",
  },
  suggestionItemSubtitle: {
    color: COLORS.darkgray,
    fontSize: 12,
    fontWeight: "400",
    marginTop: 5,
  },
  suggestionItemTitle: {
    color: "#000",
    fontSize: 16,
    fontWeight: "500",
  },
  suggestionMeta: {
    marginLeft: 15,
  },
  suggestionsContainer: {
    flex: 1,
    marginTop: 15,
    paddingHorizontal: 25,
  },
  title: {
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 10,
  },
});
