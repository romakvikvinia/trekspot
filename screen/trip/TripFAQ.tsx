import {
  SafeAreaView,
  SectionList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { BackIcon } from "../../utilities/SvgIcons.utility";
import Constants from "expo-constants";
import { FaqItem } from "../../common/components/Destination/_FaqItem";
import { COLORS } from "../../styles/theme";
import { useNavigation } from "@react-navigation/native";
import { globalStyles } from "../../styles/globalStyles";

export const TripFAQ = () => {
  const navigation = useNavigation();

  const faqData2 = [
    {
      title: "Timing",
      data: [
        {
          question: "When is the best time to visit France?",
          answer:
            "<ul><li><strong>Spring (April to June):</strong> Mild weather and blooming flowers make this a great time to visit.</li><li><strong>Summer (July to August):</strong> Warm weather and long days, but it's also the peak tourist season.</li><li><strong>Autumn (September to November):</strong> Pleasant weather and fewer tourists.</li><li><strong>Winter (December to February):</strong> Best for visiting ski resorts in the Alps or experiencing Paris without the crowds.</li></ul>",
        },
        {
          question: "Do I need a visa to visit France?",
          answer:
            "<ul><li><strong>EU Citizens:</strong> No visa is required for EU citizens.</li><li><strong>US Citizens:</strong> No visa is required for stays up to 90 days within a 180-day period.</li><li><strong>Other Nationalities:</strong> Check the French consulate website for specific visa requirements.</li></ul>",
        },
        {
          question: "What is the currency in France?",
          answer: "<ul><li>The currency in France is the Euro (€).</li></ul>",
        },
        {
          question: "What language is spoken in France?",
          answer:
            "<ul><li>The official language is French. In tourist areas, many people speak English, but learning a few basic French phrases is appreciated.</li></ul>",
        },
        {
          question: "What is the time zone in France?",
          answer:
            "France is in the Central European Time (CET) zone, which is UTC+1. During daylight saving time (late March to late October), it is UTC+2.",
        },
      ],
    },
    {
        title: "Visa Requirements",
        data: [
        {
          question: "When is the best time to visit France?",
          answer:
            "<ul><li><strong>Spring (April to June):</strong> Mild weather and blooming flowers make this a great time to visit.</li><li><strong>Summer (July to August):</strong> Warm weather and long days, but it's also the peak tourist season.</li><li><strong>Autumn (September to November):</strong> Pleasant weather and fewer tourists.</li><li><strong>Winter (December to February):</strong> Best for visiting ski resorts in the Alps or experiencing Paris without the crowds.</li></ul>",
        },
        {
          question: "Do I need a visa to visit France?",
          answer:
            "<ul><li><strong>EU Citizens:</strong> No visa is required for EU citizens.</li><li><strong>US Citizens:</strong> No visa is required for stays up to 90 days within a 180-day period.</li><li><strong>Other Nationalities:</strong> Check the French consulate website for specific visa requirements.</li></ul>",
        },
        {
          question: "What is the currency in France?",
          answer: "<ul><li>The currency in France is the Euro (€).</li></ul>",
        },
        {
          question: "What language is spoken in France?",
          answer:
            "<ul><li>The official language is French. In tourist areas, many people speak English, but learning a few basic French phrases is appreciated.</li></ul>",
        },
        {
          question: "What is the time zone in France?",
          answer:
            "France is in the Central European Time (CET) zone, which is UTC+1. During daylight saving time (late March to late October), it is UTC+2.",
        },
      ],
    },
    // Other sections with their respective FAQ items
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={globalStyles.screenHeader}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={globalStyles.screenHeaderBackButton}
        >
          <BackIcon size="30" />
        </TouchableOpacity>

        <Text style={globalStyles.screenTitle}>FAQ</Text>
        <TouchableOpacity style={globalStyles.screenHeaderBackButton}></TouchableOpacity>
      </View>

      <View style={{ paddingHorizontal: 20}}>
        <SectionList
          sections={faqData2}
          renderItem={({ item }) => {
            return <FaqItem item={item} />;
          }}
         showsVerticalScrollIndicator={false}
          renderSectionHeader={({ section: { title } }) => (
            <Text style={[styles.forYouRowTitleSub, { marginTop: 25 }]}>
              {title}
            </Text>
          )}
          stickySectionHeadersEnabled={false}
          contentContainerStyle={{paddingBottom: 50}}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F2F2F7",
    paddingTop: Constants?.statusBarHeight + 10,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    marginBottom: 10,
  },
  destination: {
    fontSize: 18,
    fontWeight: "500",
  },
  backButton: {
    width: 30,
  },
  forYouRowTitleSub: {
    fontSize: 20,
    fontWeight: "bold",
    color: COLORS.black,
    paddingHorizontal: 0,
    marginBottom: 15,
  },
});
