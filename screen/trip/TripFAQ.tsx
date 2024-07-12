import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { BackIcon, DownCircleIcon } from "../../utilities/SvgIcons.utility";
import Constants from "expo-constants";
import { COLORS } from "../../styles/theme";
import { useNavigation } from "@react-navigation/native";
import { globalStyles } from "../../styles/globalStyles";
import { FlashList } from "@shopify/flash-list";
import { useState } from "react";
import { FaqItem } from "../../common/components/Destination/_FaqItem";

export const FaqRowItem = ({ item, index, openIndex, setOpenIndex }) => {
  const isOpen = openIndex === index;
 
  const toggleItem = () => {
    setOpenIndex(isOpen ? null : index);
  };

  return (
    <View
      style={{
        minHeight: 10,
        paddingVertical: 5,
        marginBottom: 8,
        borderRadius: 6,
        paddingBottom: isOpen ? 15 : 0,
        paddingHorizontal: 20,
      }}
    >
      <TouchableOpacity
        onPress={toggleItem}
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingRight: 15,
          marginBottom: 0,
          paddingVertical: 15,
        }}
      >
        <Text style={[styles.forYouRowTitleSub]}>{item?.category}</Text>
        <DownCircleIcon />
      </TouchableOpacity>

         {isOpen ? (
          <FlashList
            contentContainerStyle={{ paddingHorizontal: 0 }}
            renderItem={({ item, ind }) => {
              return <FaqItem item={item} />;
            }}
            // numColumns={3}
            estimatedItemSize={20}
            data={item?.questions}
          />
        ) : null}
     </View>
  );
};

export const TripFAQ = () => {
  const navigation = useNavigation();
  const [openIndex, setOpenIndex] = useState(0);

  const faqData = [
    {
      category: "Travel Planning",
      questions: [
        {
          question: "When is the best time to visit China?",
          answer:
            "The best time to visit China is during spring (April to May) and autumn (September to October) when the weather is mild and comfortable.",
        },
        {
          question: "What is the climate like in China?",
          answer:
            "China has a diverse climate ranging from tropical in the south to subarctic in the north. The weather can vary widely depending on the region and time of year.",
        },
        {
          question:
            "What are the major national holidays in China that might affect my travel plans?",
          answer:
            "Some of the major national holidays in China include Chinese New Year (Spring Festival), National Day, and Mid-Autumn Festival. During these holidays, there may be increased crowds and travel disruptions.",
        },
      ],
    },
    {
      category: "Entry Requirements",
      questions: [
        {
          question: "Do I need a visa to visit China?",
          answer:
            "Yes, most visitors to China will need a visa. You can apply for a visa at a Chinese consulate or embassy before your trip.",
        },
        {
          question:
            "Are there any specific vaccinations required or recommended before traveling to China?",
          answer:
            "It is recommended to be up-to-date on routine vaccinations before traveling to China. Depending on your itinerary, you may also need vaccinations for diseases like Hepatitis A and Typhoid.",
        },
        {
          question:
            "Are there any travel restrictions or COVID-19 regulations?",
          answer:
            "Due to the ongoing COVID-19 pandemic, there may be travel restrictions and requirements in place for travelers to China. It is important to check the latest updates and guidelines before your trip.",
        },
        {
          question:
            "What are the customs regulations for bringing items into China?",
          answer:
            "There are restrictions on bringing certain items into China, such as firearms, drugs, and counterfeit goods. It is important to check the customs regulations before your trip to avoid any issues.",
        },
      ],
    },
    {
      category: "Money and Budget",
      questions: [
        {
          question: "What is the currency in China?",
          answer: "The currency in China is the Chinese Yuan (CNY).",
        },
        {
          question: "Can I use my credit card in China?",
          answer:
            "Credit cards are widely accepted in major cities and tourist areas in China. However, it is recommended to carry cash for smaller purchases and in remote areas.",
        },
        {
          question: "How much should I budget per day for my trip to China?",
          answer:
            "The daily budget for a trip to China can vary depending on your travel style and preferences. On average, budget travelers can expect to spend around $50-100 USD per day, while mid-range travelers may spend $100-200 USD per day.",
        },
        {
          question: "Where can I exchange currency in China?",
          answer:
            "Currency exchange services are available at airports, banks, and hotels in major cities in China. It is recommended to exchange currency at official exchange counters to avoid scams.",
        },
      ],
    },
    {
      category: "Language and Communication",
      questions: [
        {
          question: "What language is spoken in China?",
          answer:
            "The official language of China is Mandarin Chinese. However, there are also several local dialects and minority languages spoken throughout the country.",
        },
        {
          question: "How do I handle language barriers in China?",
          answer:
            "Learning a few basic phrases in Mandarin Chinese can be helpful for navigating language barriers in China. It is also recommended to use translation apps or carry a phrasebook.",
        },
        {
          question: "How can I stay connected to the internet?",
          answer:
            "Most hotels, restaurants, and cafes in China offer free Wi-Fi. Alternatively, you can purchase a local SIM card or portable Wi-Fi device for internet access during your trip.",
        },
      ],
    },
    {
      category: "Transportation",
      questions: [
        {
          question: "What is the time zone in China?",
          answer:
            "China has a single time zone, China Standard Time (CST), which is UTC+8.",
        },
        {
          question: "How can I get around in China?",
          answer:
            "Transportation options in China include trains, buses, taxis, and ride-sharing services like DiDi. High-speed trains are a popular and efficient way to travel between cities.",
        },
        {
          question:
            "What are the local transportation options (bus, train, taxi, etc.)?",
          answer:
            "In addition to trains and buses, you can also use taxis, subways, and bicycles to get around in major cities in China. Public transportation is generally affordable and convenient.",
        },
        {
          question: "Can I drive in China with my foreign driver’s license?",
          answer:
            "Foreign visitors to China are required to obtain a temporary Chinese driving permit in order to drive legally. It is important to carry both your foreign driver's license and the temporary permit while driving in China.",
        },
      ],
    },
    {
      category: "Food and Dining",
      questions: [
        {
          question: "What should I eat in China?",
          answer:
            "Some must-try dishes in China include Peking duck, dumplings, hot pot, and various regional specialties like Sichuan cuisine and Cantonese dim sum.",
        },
        {
          question:
            "What should I know about Chinese cuisine and dining etiquette?",
          answer:
            "In Chinese culture, it is common to share dishes family-style and use chopsticks for eating. It is polite to offer a toast before drinking and leave a small amount of food on your plate to show you are full.",
        },
        {
          question: "What is the tipping culture in China?",
          answer:
            "Tipping is not customary in China, especially in local restaurants. However, in upscale restaurants or for exceptional service, a small tip may be appreciated.",
        },
        {
          question:
            "How do I tip in China and what are the common tipping percentages?",
          answer:
            "Tipping is not expected in China, but if you wish to tip, a small amount like 5-10% of the bill is appreciated in upscale restaurants or for exceptional service.",
        },
      ],
    },
    {
      category: "Health and Safety",
      questions: [
        {
          question: "Is China safe for tourists?",
          answer:
            "China is generally safe for tourists, but it is important to take common safety precautions like avoiding crowded areas and being aware of your surroundings.",
        },
        {
          question: "What should I do in case of an emergency?",
          answer:
            "In case of an emergency in China, dial 110 for police assistance, 120 for medical emergencies, and 119 for fire emergencies.",
        },
        {
          question: "How do I access medical care in China?",
          answer:
            "Medical facilities in major cities in China are generally of good quality. It is recommended to have travel insurance that covers medical expenses while in China.",
        },
        {
          question:
            "Are there any local scams or tourist-targeted crimes I should be aware of?",
          answer:
            "While China is relatively safe for tourists, common scams include tea house scams, fake taxi scams, and overcharging in tourist areas. It is important to be cautious and vigilant to avoid falling prey to scams.",
        },
      ],
    },
    {
      category: "Practical Information",
      questions: [
        {
          question: "Can I drink tap water in China?",
          answer:
            "It is not recommended to drink tap water in China. Bottled water is widely available and affordable.",
        },
        {
          question: "What cultural etiquette should I be aware of?",
          answer:
            "In Chinese culture, it is important to greet others with a nod or handshake, remove your shoes before entering a home, and never stick chopsticks upright in a bowl of rice.",
        },
        {
          question: "What are the rules and regulations for drones in China?",
          answer:
            "Flying drones in China is regulated by the Civil Aviation Administration of China. You may need to obtain a permit or follow certain guidelines depending on the area you plan to fly your drone in.",
        },
        {
          question: "What are the rules for smoking in public places in China?",
          answer:
            "Smoking is prohibited in indoor public spaces like restaurants, bars, and hotels in most major cities in China. There are designated smoking areas in some public places.",
        },
      ],
    },
    {
      category: "Unique Local Information",
      questions: [
        {
          question:
            "Are there any unique customs or traditions in China that I should be aware of?",
          answer:
            "Some unique customs in China include giving gifts with both hands, not opening gifts in front of the giver, and respecting elders by using proper titles and language.",
        },
        {
          question:
            "What are some recommended local souvenirs to bring back from China?",
          answer:
            "Some popular souvenirs from China include silk products, tea sets, handicrafts like paper-cutting and calligraphy, and traditional Chinese clothing like qipao and hanfu.",
        },
      ],
    },
    {
      category: "Family and Special Considerations",
      questions: [
        {
          question:
            "Are there any special considerations for traveling with children in China?",
          answer:
            "When traveling with children in China, it is important to carry necessary documents like passports and birth certificates, have travel insurance, and be prepared for long journeys and different cultural experiences.",
        },
        {
          question: "How can I avoid tourist traps in China?",
          answer:
            "To avoid tourist traps in China, it is recommended to research and book excursions with reputable tour operators, be cautious of overly pushy vendors, and negotiate prices before making a purchase.",
        },
      ],
    },
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
        <TouchableOpacity
          style={globalStyles.screenHeaderBackButton}
        ></TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={{paddingHorizontal: 0, paddingTop: 15}}>
        {faqData?.map((item, index) => (
          <FaqRowItem
            item={item}
            index={index}
            openIndex={openIndex}
            setOpenIndex={setOpenIndex}
          />
        ))}
      </ScrollView>
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
    position: "relative",
    top: 6
  },
});
