import { FlashList } from "@shopify/flash-list";
import {
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
  useWindowDimensions,
  Image,
  KeyboardAvoidingView,
  Animated,
  Easing,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { Modalize } from "react-native-modalize";
import { Portal } from "react-native-portalize";
import { COLORS, SIZES } from "../../styles/theme";
import Swiper from "react-native-swiper";

import { useEffect, useRef, useState } from "react";
import {
  AmbulanceIcon,
  BackIcon,
  BusIcon,
  CallIcon,
  CheckCircleIcon,
  CloseCircleIcon,
  CurrencyIcon,
  DiningIcon,
  DownIcon,
  DownLongArrow,
  DrivingSideLeft,
  DrivingSideRight,
  EmergencyIcon,
  FireBrigadeIcon,
  InfoIcon,
  LanguageIcon,
  Mark,
  Mark2,
  MarkerFillIcon,
  MetroIcon,
  PassportIcon,
  PoliceIcon,
  StarIcon,
  TopThingsIcon,
  TramwayIcon,
  TransportIcon,
  TrolleybusIcon,
} from "../../utilities/SvgIcons.utility";
import { SceneMap, TabBar, TabView } from "react-native-tab-view";
import { CountrySelect } from "./CountrySelect";
import { Topsights } from "../../utilities/Tops";
import { MapEmbedView } from "./MapEmbedView";
import { CurrencySelect } from "./CurrencySelect";

const DATA = {
  name: {
    common: "France",
    official: "French Republic",
    nativeName: {
      fra: { official: "République française", common: "France" },
    },
  },
  gallery: [],
  rating: "",
  visitors: "",
  tld: [".fr"],
  cca2: "FR",
  ccn3: "250",
  cca3: "FRA",
  cioc: "FRA",
  independent: true,
  status: "officially-assigned",
  unMember: true,
  currencies: { EUR: { name: "Euro", symbol: "€" } },
  idd: { root: "+3", suffixes: ["3"] },
  capital: ["Paris"],
  altSpellings: ["FR", "French Republic", "République française"],
  region: "Europe",
  subregion: "Western Europe",
  languages: { fra: "French" },
  latlng: [46.0, 2.0],
  landlocked: false,
  borders: ["AND", "BEL", "DEU", "ITA", "LUX", "MCO", "ESP", "CHE"],
  area: 551695.0,
  demonyms: {
    eng: { f: "French", m: "French" },
    fra: { f: "Française", m: "Français" },
  },
  maps: {
    googleMaps: "https://goo.gl/maps/g7QxxSFsWyTPKuzd7",
    openStreetMaps: "https://www.openstreetmap.org/relation/1403916",
  },
  population: 67391582,
  gini: { "2018": 32.4 },
  fifa: "FRA",
  car: { signs: ["F"], side: "right" },
  timezones: [
    "UTC-10:00",
    "UTC-09:30",
    "UTC-09:00",
    "UTC-08:00",
    "UTC-04:00",
    "UTC-03:00",
    "UTC+01:00",
    "UTC+02:00",
    "UTC+03:00",
    "UTC+04:00",
    "UTC+05:00",
    "UTC+10:00",
    "UTC+11:00",
    "UTC+12:00",
  ],
  continents: ["Europe"],
  startOfWeek: "monday",
  capitalInfo: { latlng: [48.87, 2.33] },
  postalCode: { format: "#####", regex: "^(\\d{5})$" },
  overview: "",
  telecoms: [],
  emergency: [
    {
      emergency: "",
    },
    {
      police: "",
    },
    {
      ambulance: "",
    },
    {
      fire: "",
    },
  ],
  transport: {
    local: [
      {
        name: "",
        ios: "",
        android: "",
      },
    ],
    types: [],
  },
  taxi: [
    {
      name: "",
      ios: "",
      android: "",
      logo: "",
    },
  ],
  dining: {
    highlights: [
      {
        name: "",
        thumbnail: "",
        url: "",
        reviews: "",
        reviewAmount: "",
        address: "",
      },
    ],
    localcuisine: [
      {
        name: "",
        thumbnail: "",
        url: "",
        reviews: "",
        reviewAmount: "",
        address: "",
      },
    ],
    streetfood: [
      {
        name: "",
        thumbnail: "",
        url: "",
        reviews: "",
        reviewAmount: "",
        address: "",
      },
    ],
  },
  speaking: [
    {
      title: "Greatings",
      values: [
        {
          Hello: "",
        },
        {
          Goodbye: "",
        },
        {
          "Good evening": "",
        },
        {
          "Good night": "",
        },
      ],
    },
    {
      title: "Polite Expressions",
      values: [
        {
          Please: "",
        },
        {
          "Thank you": "",
        },
        {
          "You're welcome": "",
        },
        {
          "Excuse me / I'm sorry": "",
        },
      ],
    },
    {
      title: "Common Courtesies",
      values: [
        {
          Yes: "",
        },
        {
          No: "",
        },
        {
          "Excuse me": "",
        },
      ],
    },
    {
      title: "Asking for Help",
      values: [
        {
          "Can you help me?": "",
        },
        {
          "Where is?": "",
        },
      ],
    },
    {
      title: "Directions",
      values: [
        {
          Left: "",
        },
        {
          Right: "",
        },
        {
          "Straight ahead": "",
        },
      ],
    },
    {
      title: "Numbers",
      values: [
        {
          One: "",
        },
        {
          Two: "",
        },
        {
          Three: "",
        },
        {
          Four: "",
        },
        {
          Five: "",
        },
      ],
    },
    {
      title: "Basic Phrases",
      values: [
        {
          "How are you?": "",
        },
        {
          "I don't understand": "",
        },
        {
          "I don't speak French very well": "",
        },
      ],
    },
    {
      title: "Dining",
      values: [
        {
          Menu: "",
        },
        {
          Water: "",
        },
        {
          "The check, please": "",
        },
      ],
    },
  ],
  weatherInformation: {
    averageTemperatures: {
      spring: "",
      summer: "",
      autumn: "",
      winter: "",
    },
    seasonalConsiderations: "",
  },
  shopping: {
    districts: [
      {
        name: "",
        address: "",
        thumbnail: "",
      },
    ],
    specialties: [
      {
        name: "",
        address: "",
        thumbnail: "",
      },
    ],
  },
  eventsAndFestivals: [
    {
      name: "",
      description: "",
      date: "",
    },
  ],
  culturalEtiquette: "",
};

export const DestinationDetail = ({ modalDestinationDetailsRef }) => {
  const modalRef = useRef<Modalize>(null);
  const modalCurrencyRef = useRef<Modalize>(null);
  const modalEmbedRef = useRef<Modalize>(null);
  const modalCountryPassportSelectRef = useRef<Modalize>(null);

  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [countrySelectVisible, setCountrySelectVisible] = useState(false);
  const [placeTitle, setPlaceTitle] = useState("");
  const [currencySelectVisible, setCurrencySelectVisible] = useState(false);

  const Overview = () => {
    return (
      <ScrollView
        style={styles.tabWrapper}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.generalRow}>
          <Text style={styles.overviewText}>
            Welcome to France, a country that seamlessly blends a rich tapestry
            of history, art, gastronomy, and breathtaking landscapes. As you
            embark on your journey, you'll find yourself enchanted by the
            romantic allure of Paris, captivated by the rustic charm of
            countryside villages, and indulging in the exquisite flavors of
            French cuisine.
          </Text>
        </View>
        <View style={styles.generalRow}>
          <View style={styles.keyValue}>
            <Text style={styles.key}>National Language:</Text>
            <Text style={styles.value}>French</Text>
          </View>
          <View style={styles.keyValue}>
            <Text style={styles.key}>Currency:</Text>
            <Text style={styles.value}>Euro</Text>
          </View>
          <View style={styles.keyValue}>
            <Text style={styles.key}>Telephone code:</Text>
            <Text style={styles.value}>+33</Text>
          </View>
          <View style={styles.keyValue}>
            <Text style={styles.key}>Telecom operators:</Text>
            <View style={styles.multiValues}>
              <Text style={styles.value}>T-mobile,</Text>
              <Text style={styles.value}>Geocell</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  };
  const Visa = () => {
    return (
      <ScrollView
        style={styles.tabWrapper}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.visaTabHeader}>
          <Text style={styles.travelToText}>Traveling to france</Text>

          <TouchableOpacity
            style={styles.passportBox}
            activeOpacity={0.7}
            onPress={() => onCountryPassportOpen()}
          >
            <PassportIcon />
            <View style={styles.passportTexts}>
              <Text style={styles.passportLabel}>Passport</Text>
              <Text style={styles.passportCountry}>Georgia</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.visaTabContent}>
          <View style={[styles.textContentWrapper, styles.successBg]}>
            <CheckCircleIcon color="#1a806b" />
            <Text style={[styles.headingText, styles.success]}>
              Georgian passport holders don't need visa to travel to France
            </Text>
          </View>
          <View style={[styles.textContentWrapper, styles.dangerBg]}>
            <CloseCircleIcon color="#D74E4E" />
            <Text style={[styles.headingText, styles.danger]}>
              Georgian passport holders need visa to travel to USA
            </Text>
          </View>
          <Text style={styles.secondaryTitle}>Options</Text>
          <View style={styles.visaTypes}>
            <View style={styles.visaTypeCard}>
              <Text style={styles.visaTypeCardTitle}>Visitor visa</Text>

              <View style={styles.staysNtype}>
                <View style={styles.staysNtypeRow}>
                  <Text style={styles.staysNtypeRowKey}>Allowed stay:</Text>
                  <Text style={styles.staysNtypeRowValue}>90 Days</Text>
                </View>
                <View style={styles.staysNtypeRow}>
                  <Text style={styles.staysNtypeRowKey}>Type:</Text>
                  <Text style={styles.staysNtypeRowValue}>
                    Tourism, business
                  </Text>
                </View>
              </View>
            </View>
            <View style={styles.visaTypeCard}>
              <Text style={styles.visaTypeCardTitle}>Visitor visa</Text>

              <View style={styles.staysNtype}>
                <View style={styles.staysNtypeRow}>
                  <Text style={styles.staysNtypeRowKey}>Allowed stay:</Text>
                  <Text style={styles.staysNtypeRowValue}>90 Days</Text>
                </View>
                <View style={styles.staysNtypeRow}>
                  <Text style={styles.staysNtypeRowKey}>Type:</Text>
                  <Text style={styles.staysNtypeRowValue}>
                    Tourism, business
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  };
  const Transport = () => {
    return (
      <ScrollView
        style={styles.tabWrapper}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.secondaryTitle}>Public transport</Text>

        <View style={styles.transports}>
          <View style={styles.transportItem}>
            <View style={styles.transportItemIcon}>
              <BusIcon />
            </View>
            <Text style={styles.transportText}>Bus</Text>
          </View>
          <View style={styles.transportItem}>
            <View style={styles.transportItemIcon}>
              <MetroIcon />
            </View>
            <Text style={styles.transportText}>Metro</Text>
          </View>
          <View style={styles.transportItem}>
            <View style={styles.transportItemIcon}>
              <TrolleybusIcon />
            </View>
            <Text style={styles.transportText}>Trolleybus</Text>
          </View>
          <View style={styles.transportItem}>
            <View style={styles.transportItemIcon}>
              <TramwayIcon />
            </View>
            <Text style={styles.transportText}>Trams</Text>
          </View>
        </View>
        <Text style={styles.secondaryTitle}>Taxi apps</Text>
        <View style={styles.transports}>
          <View style={styles.transportItem}>
            <View style={styles.transportItemIcon}>
              <ImageBackground
                source={{
                  uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Bolt_logo.svg/640px-Bolt_logo.svg.png",
                }}
                resizeMode="contain"
                style={{ width: 30, height: 20 }}
              />
            </View>
            <Text style={styles.transportText}>Bolt</Text>
          </View>
          <View style={styles.transportItem}>
            <View style={styles.transportItemIcon}>
              <ImageBackground
                source={{
                  uri: "https://logos-world.net/wp-content/uploads/2020/05/Uber-Logo.png",
                }}
                resizeMode="contain"
                style={{ width: 30, height: 20 }}
              />
            </View>
            <Text style={styles.transportText}>Uber</Text>
          </View>
        </View>

        <Text style={styles.secondaryTitle}>Driving side</Text>
        <View style={styles.drivingSide}>
          <Text style={styles.drivingSideText}>Right</Text>

          <DrivingSideRight />
          {/* <DrivingSideLeft /> */}
        </View>
      </ScrollView>
    );
  };
  const ThingsTodo = () => {
    const [selectedCity, setSelectedCity] = useState("Paris");

    return (
      <>
        <View style={styles.cityWrapper}>
          <TouchableOpacity
            style={[
              styles.citySelectBtn,
              selectedCity === "Paris" ? styles.selectedCityActive : null,
            ]}
            onPress={() => setSelectedCity("Paris")}
            activeOpacity={0.7}
          >
            <Text
              style={[
                styles.citySelectBtnText,
                selectedCity === "Paris" ? styles.selectedCity : null,
              ]}
            >
              Paris
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.7}
            style={[
              styles.citySelectBtn,
              selectedCity === "Lyon" ? styles.selectedCityActive : null,
            ]}
            onPress={() => setSelectedCity("Lyon")}
          >
            <Text
              style={[
                styles.citySelectBtnText,
                selectedCity === "Lyon" ? styles.selectedCity : null,
              ]}
            >
              Lyon
            </Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.7} style={styles.citySelectBtn}>
            <Text style={styles.citySelectBtnText}>Strasburg</Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.7} style={styles.citySelectBtn}>
            <Text style={styles.citySelectBtnText}>Marcel</Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.7} style={styles.citySelectBtn}>
            <Text style={styles.citySelectBtnText}>Paris</Text>
          </TouchableOpacity>
        </View>
        <ScrollView
          style={[styles.tabWrapper]}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.thingsTodo}>
            {Topsights?.map((item, ind) => (
              <TouchableOpacity
                activeOpacity={0.7}
                style={styles.thingsTodoItem}
                key={ind}
                onPress={() => {
                  onEmbedModalOpen();
                  setPlaceTitle(item?.title);
                }}
              >
                <ImageBackground
                  style={styles.thingsTodoItemImage}
                  source={{
                    uri: item.thumbnail,
                  }}
                >
                  <View style={styles.mapButton}>
                    <MarkerFillIcon color="#fff" size="10" />
                    <Text style={styles.mapButtonText}>Map</Text>
                  </View>
                </ImageBackground>

                <View style={styles.thingsTodoItemDetails}>
                  <Text style={styles.thingsTodoItemTitle}>{item.title}</Text>

                  <View style={styles.thingsTodoItemiIn}>
                    <Text style={styles.thingsTodoItemiInprice}>
                      {item.price}
                    </Text>
                    <Text style={styles.thingsTodoItemiIntypeText}>
                      {item.description}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </>
    );
  };
  const Dining = () => {
    const [selectedCity, setSelectedCity] = useState("Paris");

    return (
      <>
        <View style={styles.cityWrapper}>
          <TouchableOpacity
            style={[
              styles.citySelectBtn,
              selectedCity === "Paris" ? styles.selectedCityActive : null,
            ]}
            onPress={() => setSelectedCity("Paris")}
            activeOpacity={0.7}
          >
            <Text
              style={[
                styles.citySelectBtnText,
                selectedCity === "Paris" ? styles.selectedCity : null,
              ]}
            >
              Paris
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.7}
            style={[
              styles.citySelectBtn,
              selectedCity === "Lyon" ? styles.selectedCityActive : null,
            ]}
            onPress={() => setSelectedCity("Lyon")}
          >
            <Text
              style={[
                styles.citySelectBtnText,
                selectedCity === "Lyon" ? styles.selectedCity : null,
              ]}
            >
              Lyon
            </Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.7} style={styles.citySelectBtn}>
            <Text style={styles.citySelectBtnText}>Strasburg</Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.7} style={styles.citySelectBtn}>
            <Text style={styles.citySelectBtnText}>Marcel</Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.7} style={styles.citySelectBtn}>
            <Text style={styles.citySelectBtnText}>Paris</Text>
          </TouchableOpacity>
        </View>
        <ScrollView
          style={styles.tabWrapper}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.thingsTodo}>
            {Topsights?.map((item, ind) => (
              <View style={styles.thingsTodoItem} key={ind}>
                <ImageBackground
                  style={styles.thingsTodoItemImage}
                  source={{
                    uri: "https://lh5.googleusercontent.com/p/AF1QipO0fB8WK5U2rUsithf01H27rkyl71ltCuVqUhYd=w260-h175-n-k-no",
                  }}
                ></ImageBackground>

                <View style={styles.thingsTodoItemDetails}>
                  <Text style={styles.thingsTodoItemTitle}>
                    Robert et Louise
                  </Text>
                  <View style={styles.thingsTodoItemiIn}>
                    <View
                      style={[
                        styles.ratingLabel,
                        { paddingLeft: 0, paddingBottom: 0 },
                      ]}
                    >
                      <View
                        style={{ position: "relative", top: -1, opacity: 0.8 }}
                      >
                        <StarIcon color="#FFBC3E" />
                      </View>
                      <Text
                        style={[
                          styles.ratingText,
                          { color: "#000", marginLeft: 0 },
                        ]}
                      >
                        4.5 /
                      </Text>
                      <Text style={[styles.ratingText, { color: "#000" }]}>
                        2.3k
                      </Text>
                    </View>
                    <Text style={styles.thingsTodoItemiIntypeText}>
                      64 Rue Vieille-du-Temple
                    </Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
      </>
    );
  };
  const Language = () => {
    return (
      <ScrollView
        style={styles.tabWrapper}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.dictionaryWrapper}>
          <View style={styles.dictionaryCategory}>
            <Text style={styles.dictionaryCategoryTitle}>Greetings</Text>
            <View style={styles.dictionaryCategoryRow}>
              <Text style={styles.dictionaryCategoryRowKey}>Hello -</Text>
              <Text style={styles.dictionaryCategoryRowValue}>
                Bonjour (bohn-zhoor)
              </Text>
            </View>
            <View style={styles.dictionaryCategoryRow}>
              <Text style={styles.dictionaryCategoryRowKey}>Goodbye -</Text>
              <Text style={styles.dictionaryCategoryRowValue}>
                Au revoir (oh ruh-vwahr)
              </Text>
            </View>
            <View style={styles.dictionaryCategoryRow}>
              <Text style={styles.dictionaryCategoryRowKey}>
                Good evening -
              </Text>
              <Text style={styles.dictionaryCategoryRowValue}>
                Bonsoir (bohn-swahr)
              </Text>
            </View>
            <View style={styles.dictionaryCategoryRow}>
              <Text style={styles.dictionaryCategoryRowKey}>Good night -</Text>
              <Text style={styles.dictionaryCategoryRowValue}>
                Bonne nuit (bun nwee)
              </Text>
            </View>
          </View>
          <View style={styles.dictionaryCategory}>
            <Text style={styles.dictionaryCategoryTitle}>
              Polite Expressions
            </Text>
            <View style={styles.dictionaryCategoryRow}>
              <Text style={styles.dictionaryCategoryRowKey}>Please -</Text>
              <Text style={styles.dictionaryCategoryRowValue}>
                S'il vous plaît (seel voo pleh)
              </Text>
            </View>
            <View style={styles.dictionaryCategoryRow}>
              <Text style={styles.dictionaryCategoryRowKey}>Thank you -</Text>
              <Text style={styles.dictionaryCategoryRowValue}>
                Merci (mehr-see)
              </Text>
            </View>
            <View style={styles.dictionaryCategoryRow}>
              <Text style={styles.dictionaryCategoryRowKey}>
                You're welcome -
              </Text>
              <Text style={styles.dictionaryCategoryRowValue}>
                De rien (duh ryen)
              </Text>
            </View>
            <View style={styles.dictionaryCategoryRow}>
              <Text style={styles.dictionaryCategoryRowKey}>Excuse me -</Text>
              <Text style={styles.dictionaryCategoryRowValue}>
                Excusez-moi (ehk-skew-zay mwah)
              </Text>
            </View>
          </View>
          <View style={styles.dictionaryCategory}>
            <Text style={styles.dictionaryCategoryTitle}>
              Common Courtesies
            </Text>
            <View style={styles.dictionaryCategoryRow}>
              <Text style={styles.dictionaryCategoryRowKey}>Yes -</Text>
              <Text style={styles.dictionaryCategoryRowValue}>Oui (wee)</Text>
            </View>
            <View style={styles.dictionaryCategoryRow}>
              <Text style={styles.dictionaryCategoryRowKey}>No -</Text>
              <Text style={styles.dictionaryCategoryRowValue}>Non (noh)</Text>
            </View>
            <View style={styles.dictionaryCategoryRow}>
              <Text style={styles.dictionaryCategoryRowKey}>
                Excuse me / Pardon -
              </Text>
              <Text style={styles.dictionaryCategoryRowValue}>
                Pardon (pahr-dohn)
              </Text>
            </View>
          </View>
          <View style={styles.dictionaryCategory}>
            <Text style={styles.dictionaryCategoryTitle}>Asking for Help</Text>
            <View style={styles.dictionaryCategoryRow}>
              <Text style={styles.dictionaryCategoryRowKey}>
                Can you help me? -
              </Text>
              <Text style={styles.dictionaryCategoryRowValue}>
                Pouvez-vous m'aider ? (poo-veh voo mey-dey)
              </Text>
            </View>
            <View style={styles.dictionaryCategoryRow}>
              <Text style={styles.dictionaryCategoryRowKey}>
                Where is...? -
              </Text>
              <Text style={styles.dictionaryCategoryRowValue}>
                Où est... ? (oo eh)
              </Text>
            </View>
          </View>
          <View style={styles.dictionaryCategory}>
            <Text style={styles.dictionaryCategoryTitle}>Directions</Text>
            <View style={styles.dictionaryCategoryRow}>
              <Text style={styles.dictionaryCategoryRowKey}>Left -</Text>
              <Text style={styles.dictionaryCategoryRowValue}>
                À gauche (ah gohsh)
              </Text>
            </View>
            <View style={styles.dictionaryCategoryRow}>
              <Text style={styles.dictionaryCategoryRowKey}>Right -</Text>
              <Text style={styles.dictionaryCategoryRowValue}>
                À droite (ah drwaht)
              </Text>
            </View>
            <View style={styles.dictionaryCategoryRow}>
              <Text style={styles.dictionaryCategoryRowKey}>
                Straight ahead: -
              </Text>
              <Text style={styles.dictionaryCategoryRowValue}>
                Tout droit (too drwah)
              </Text>
            </View>
          </View>
          <View style={styles.dictionaryCategory}>
            <Text style={styles.dictionaryCategoryTitle}>Numbers</Text>
            <View style={styles.dictionaryCategoryRow}>
              <Text style={styles.dictionaryCategoryRowKey}>One -</Text>
              <Text style={styles.dictionaryCategoryRowValue}>Un (uh)</Text>
            </View>
            <View style={styles.dictionaryCategoryRow}>
              <Text style={styles.dictionaryCategoryRowKey}>Two -</Text>
              <Text style={styles.dictionaryCategoryRowValue}>Deux (duh)</Text>
            </View>
            <View style={styles.dictionaryCategoryRow}>
              <Text style={styles.dictionaryCategoryRowKey}>Three -</Text>
              <Text style={styles.dictionaryCategoryRowValue}>
                Trois (twah)
              </Text>
            </View>
            <View style={styles.dictionaryCategoryRow}>
              <Text style={styles.dictionaryCategoryRowKey}>Four -</Text>
              <Text style={styles.dictionaryCategoryRowValue}>
                Quatre (katr)
              </Text>
            </View>
            <View style={styles.dictionaryCategoryRow}>
              <Text style={styles.dictionaryCategoryRowKey}>Five -</Text>
              <Text style={styles.dictionaryCategoryRowValue}>Cinq (sank)</Text>
            </View>
          </View>
          <View style={styles.dictionaryCategory}>
            <Text style={styles.dictionaryCategoryTitle}>Basic Phrases</Text>
            <View style={styles.dictionaryCategoryRow}>
              <Text style={styles.dictionaryCategoryRowKey}>
                How are you? -
              </Text>
              <Text style={styles.dictionaryCategoryRowValue}>
                Comment ça va ? (koh-mah sah vah)
              </Text>
            </View>
            <View style={styles.dictionaryCategoryRow}>
              <Text style={styles.dictionaryCategoryRowKey}>
                I don't understand -
              </Text>
              <Text style={styles.dictionaryCategoryRowValue}>
                Je ne comprends pas (zhuh nuh kohm-prahnd pah)
              </Text>
            </View>
            <View style={styles.dictionaryCategoryRow}>
              <Text style={styles.dictionaryCategoryRowKey}>
                I don't speak French very well -
              </Text>
              <Text style={styles.dictionaryCategoryRowValue}>
                Je ne parle pas très bien français (zhuh nuh parl pah tray byan
                frahn-say)
              </Text>
            </View>
          </View>
          <View style={styles.dictionaryCategory}>
            <Text style={styles.dictionaryCategoryTitle}>Dining</Text>
            <View style={styles.dictionaryCategoryRow}>
              <Text style={styles.dictionaryCategoryRowKey}>Menu -</Text>
              <Text style={styles.dictionaryCategoryRowValue}>
                La carte (lah kart)
              </Text>
            </View>
            <View style={styles.dictionaryCategoryRow}>
              <Text style={styles.dictionaryCategoryRowKey}>Water -</Text>
              <Text style={styles.dictionaryCategoryRowValue}>Eau (oh)</Text>
            </View>
            <View style={styles.dictionaryCategoryRow}>
              <Text style={styles.dictionaryCategoryRowKey}>
                The check, please -
              </Text>
              <Text style={styles.dictionaryCategoryRowValue}>
                L'addition, s'il vous plaît (lay-dee-syon seel voo pleh)
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  };
  const Currency = () => {
    return (
      <ScrollView
        style={styles.tabWrapper}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.currencyWrapper}>
          <View style={styles.currencyConverter}>
            <View style={styles.left}>
              <TouchableOpacity
                activeOpacity={0.7}
                style={styles.currencySelectButton}
                onPress={() => onCurrencyModalOpen()}
              >
                <Text style={styles.currencySelectedText}>USD</Text>
                <DownIcon color={COLORS.primary} size="10" />
              </TouchableOpacity>

              <TextInput style={styles.currencyInput} placeholder="0" />
            </View>
            <Text style={styles.valueText}> = 1400 Euro</Text>
          </View>
        </View>
        <View style={styles.keyValue}>
          <Text style={styles.key}>Official currency:</Text>
          <Text style={styles.value}>Euro</Text>
        </View>
      </ScrollView>
    );
  };
  const Emergency = () => {
    return (
      <ScrollView
        style={styles.tabWrapper}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.emergencyNumbers}>
          <TouchableOpacity
            activeOpacity={0.7}
            style={[styles.emergencyButtonItem, { backgroundColor: "#af0101" }]}
          >
            <CallIcon />
            <Text style={styles.emergencyButtonItemText}>
              EU Emergency - 112
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.7}
            style={[styles.emergencyButtonItem, { backgroundColor: "#366dc2" }]}
          >
            <PoliceIcon />
            <Text style={styles.emergencyButtonItemText}>Police - 112</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.7}
            style={[styles.emergencyButtonItem, { backgroundColor: "#f14e2f" }]}
          >
            <AmbulanceIcon />
            <Text style={styles.emergencyButtonItemText}>Ambulance - 118</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.7}
            style={[styles.emergencyButtonItem, { backgroundColor: "#f10d00" }]}
          >
            <FireBrigadeIcon />
            <Text style={styles.emergencyButtonItemText}>
              Fire brigade - 115
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  };
  const renderScene = SceneMap({
    overview: Overview,
    visa: Visa,
    transport: Transport,
    thingsTodo: ThingsTodo,
    dining: Dining,
    language: Language,
    currency: Currency,
    emergency: Emergency,
  });
  const [routes] = useState([
    { key: "overview", title: "Overview" },
    { key: "visa", title: "Visa" },
    { key: "transport", title: "Transport" },
    { key: "thingsTodo", title: "Top sights" },
    { key: "dining", title: "Dining" },
    { key: "language", title: "Language" },
    { key: "currency", title: "Currency" },
    { key: "emergency", title: "Emergency" },
  ]);
  const renderTabBar = (props) => (
    <TabBar
      scrollEnabled={true}
      {...props}
      indicatorStyle={{ display: "none" }}
      style={{ backgroundColor: "#fff", color: COLORS.darkgray }}
      tabStyle={{
        padding: 0,
        width: "auto",
        paddingLeft: 10,
      }}
      renderLabel={({ route, focused, color }) => (
        <View
          style={{
            flex: 1,
            position: "relative",
            justifyContent: "center",
            alignItems: "center",
            paddingBottom: 15,
            marginHorizontal: 5,
            borderBottomColor: focused ? COLORS.primaryDark : "#fff",
            borderBottomWidth: 2,
            marginRight: 20,
          }}
        >
          {route?.key === "overview" && (
            <InfoIcon color={focused ? COLORS.primaryDark : COLORS.darkgray} />
          )}
          {route?.key === "visa" && (
            <PassportIcon
              color={focused ? COLORS.primaryDark : COLORS.darkgray}
              size={20}
            />
          )}
          {route?.key === "transport" && (
            <TransportIcon
              color={focused ? COLORS.primaryDark : COLORS.darkgray}
            />
          )}
          {route?.key === "thingsTodo" && (
            <TopThingsIcon
              color={focused ? COLORS.primaryDark : COLORS.darkgray}
            />
          )}
          {route?.key === "dining" && (
            <DiningIcon
              color={focused ? COLORS.primaryDark : COLORS.darkgray}
            />
          )}
          {route?.key === "language" && (
            <LanguageIcon
              color={focused ? COLORS.primaryDark : COLORS.darkgray}
            />
          )}
          {route?.key === "currency" && (
            <CurrencyIcon
              color={focused ? COLORS.primaryDark : COLORS.darkgray}
            />
          )}
          {route?.key === "emergency" && (
            <EmergencyIcon
              color={focused ? COLORS.primaryDark : COLORS.darkgray}
            />
          )}
          <Text
            style={{
              color: focused ? COLORS.primaryDark : COLORS.darkgray,
              textAlign: "center",
              fontSize: 12,
              marginTop: 8,
              fontWeight: "bold",
            }}
          >
            {route.title}
          </Text>
        </View>
      )}
    />
  );

  const onCurrencyModalOpen = () => {
    modalCurrencyRef.current?.open();
  };
  const onEmbedModalOpen = () => {
    modalEmbedRef.current?.open();
  };

  const onCountryPassportOpen = () => {
    modalCountryPassportSelectRef.current?.open();
  };

  return (
    <>
      <View
        style={{
          flex: 1,
          minHeight: "100%",
        }}
      >
        <View style={[styles.swiperWrapper]}>
          <TouchableOpacity
            onPress={() =>
              modalDestinationDetailsRef.current &&
              modalDestinationDetailsRef.current.close()
            }
            activeOpacity={0.7}
            style={styles.backButton}
          >
            <DownIcon color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.addToBucketButton,
              {
                backgroundColor: 1 == 0 ? COLORS.primary : "rgba(0, 0, 0, 0.3)",
              },
            ]}
            activeOpacity={0.7}
          >
            <Mark2 color="#fff" />
          </TouchableOpacity>
          <Swiper
            activeDotColor="#fff"
            style={styles.wrapper}
            showsButtons={false}
            loop={false}
            dotColor="#949494"
            automaticallyAdjustContentInsets
            paginationStyle={{
              position: "absolute",
              justifyContent: "flex-end",
              paddingRight: 15,
              bottom: 16,
            }}
          >
            <View style={styles.slide1}>
              <ImageBackground
                style={styles.box}
                resizeMode="cover"
                source={{
                  uri: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=10&w=3273&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3Ds",
                }}
              >
                <LinearGradient
                  style={styles.gradientWrapper}
                  colors={["rgba(0,0,0,0.01)", "rgba(0,0,0,0.4)"]}
                ></LinearGradient>
              </ImageBackground>
            </View>
            <View style={styles.slide2}>
              <ImageBackground
                style={styles.box}
                resizeMode="cover"
                source={{
                  uri: "https://images.unsplash.com/photo-1500039436846-25ae2f11882e?q=10&w=3432&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                }}
              >
                <LinearGradient
                  style={styles.gradientWrapper}
                  colors={["rgba(0,0,0,0.01)", "rgba(0,0,0,0.4)"]}
                ></LinearGradient>
              </ImageBackground>
            </View>
            <View style={styles.slide3}>
              <ImageBackground
                style={styles.box}
                resizeMode="cover"
                source={{
                  uri: "https://images.unsplash.com/photo-1507666664345-c49223375e33?q=10&w=3274&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                }}
              >
                <LinearGradient
                  style={styles.gradientWrapper}
                  colors={["rgba(0,0,0,0.01)", "rgba(0,0,0,0.4)"]}
                ></LinearGradient>
              </ImageBackground>
            </View>
          </Swiper>

          <View style={styles.otherInfo}>
            <View style={styles.labelItem}>
              <Text style={styles.labelItemText}>France</Text>
            </View>
            <View style={styles.ratingLabel}>
              <View
                style={{
                  position: "relative",
                  top: -1,
                  opacity: 0.8,
                }}
              >
                <StarIcon size={15} color="#FFBC3E" />
              </View>
              <Text style={styles.ratingText}>4.9 /</Text>
              <Text style={styles.ratingText}>80m visitors</Text>
            </View>
          </View>
        </View>

        <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={{ width: layout.width }}
          style={{
            flex: 1,
            paddingTop: 15,
          }}
          renderTabBar={renderTabBar}
        />
      </View>

      <Portal>
        <Modalize ref={modalCountryPassportSelectRef} modalTopOffset={65}>
          <CountrySelect />
        </Modalize>
      </Portal>

      <Portal>
        <Modalize ref={modalEmbedRef} modalTopOffset={65} adjustToContentHeight>
          <MapEmbedView placeTitle={placeTitle} modalEmbedRef={modalEmbedRef} />
        </Modalize>
      </Portal>

      <Portal>
        <Modalize ref={modalCurrencyRef} modalTopOffset={65}>
          <CurrencySelect />
        </Modalize>
      </Portal>
    </>
  );
};

const styles = StyleSheet.create({
  swiperWrapper: {
    height: 300,
  },
  cityWrapper: {
    paddingHorizontal: 15,
    paddingTop: 15,
    marginBottom: 10,
    flexWrap: "wrap",
    flexDirection: "row",
  },
  citySelectBtn: {
    marginRight: 15,
    paddingHorizontal: 8,
    paddingVertical: 5,
    backgroundColor: "#fafafa",
    borderRadius: 5,
    marginVertical: 3,
  },
  citySelectBtnText: {
    fontSize: 13,
  },
  selectedCity: {
    color: COLORS.primaryDark,
    fontWeight: "bold",
  },
  selectedCityActive: {
    backgroundColor: "#fdecff",
  },
  currencyWrapper: {
    marginTop: 25,
    marginBottom: 15,
  },
  currencyConverter: {
    backgroundColor: "#fafafa",
    alignItems: "center",
    overflow: "hidden",
    borderRadius: 10,
    flexDirection: "row",
    padding: 20,
  },
  left: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f1f1f1",
    overflow: "hidden",
    borderRadius: 5,
    marginRight: 15,
  },
  currencySelectButton: {
    paddingLeft: 15,
    flexDirection: "row",
    alignItems: "center",
  },
  currencySelectedText: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.primary,
    marginRight: 5,
  },
  currencyInput: {
    height: 40,
    backgroundColor: "#fff",
    width: 100,
    textAlign: "center",
    marginTop: 0,
    marginLeft: 10,
    color: "#000",
    borderWidth: 1,
    borderColor: "#f1f1f1",
    fontSize: 18,
    fontWeight: "bold",
    paddingHorizontal: 5,
  },
  valueText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  emergencyNumbers: {
    flex: 1,
    marginTop: 25,
  },
  emergencyButtonItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fafafa",
    paddingHorizontal: 15,
    borderRadius: 10,
    paddingVertical: 15,
    marginBottom: 15,
  },
  emergencyButtonItemText: {
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 10,
    color: "#fff",
  },
  thingsTodoItemHead: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  mapButton: {
    position: "absolute",
    backgroundColor: "rgba(0,0,0, 0.3)",
    padding: 5,
    right: 5,
    top: 5,
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
  },
  mapButtonText: {
    justifyContent: "center",
    alignItems: "center",
    color: "#fff",
    fontSize: 12,
    marginLeft: 3,
  },
  dictionaryWrapper: {
    marginTop: 25,
  },
  dictionaryCategory: {
    width: "100%",
    marginBottom: 25,
    shadowColor: "#cccdd0",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 10,
    borderRadius: 10,
    backgroundColor: "white",
    padding: 20,
  },
  dictionaryCategoryTitle: {
    fontSize: 16,
    color: "#000",
    fontWeight: "bold",
    marginBottom: 15,
  },
  dictionaryCategoryRow: {
    flexDirection: "row",
    marginVertical: 5,
  },
  dictionaryCategoryRowKey: {
    width: 140,
    fontSize: 14,
    color: "#000",
  },
  dictionaryCategoryRowValue: {
    fontWeight: "bold",
    fontSize: 14,
    color: "#000",
    flex: 1,
  },
  visaTabContent: {
    flex: 1,
    marginBottom: 25,
  },
  thingsTodo: {
    marginTop: 0,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  thingsTodoItemDetails: {
    marginTop: 10,
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  thingsTodoItemImage: {
    width: "100%",
    height: 110,
    borderTopEndRadius: 10,
    borderTopLeftRadius: 10,
    overflow: "hidden",
    position: "relative",
  },

  thingsTodoItemiIn: {
    marginTop: 5,
  },
  thingsTodoItemTitle: {
    fontSize: 16,
    color: "#000",
    fontWeight: "bold",
  },
  thingsTodoItemiInprice: {
    fontSize: 14,
    color: "#000",
  },
  thingsTodoItem: {
    marginBottom: 15,
    width: "48%",
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#f1f1f1",
  },
  thingsTodoItemiIntypeText: {
    fontSize: 14,
    marginTop: 5,
    color: COLORS.darkgray,
  },
  drivingSide: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
  },
  drivingSideText: {
    color: "#000",
    fontSize: 20,
    fontWeight: "bold",
  },
  transports: {
    flexDirection: "row",
    marginTop: 5,
    flexWrap: "wrap",
  },
  transportItem: {
    backgroundColor: "#fafafa",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 5,
    overflow: "hidden",
    marginRight: 15,
    marginVertical: 5,
  },
  transportItemIcon: {
    backgroundColor: "#f6f6f6",
    padding: 10,
  },
  transportText: {
    fontSize: 12,
    fontWeight: "normal",
    paddingHorizontal: 10,
  },
  textContentWrapper: {
    backgroundColor: "#fafafa",
    padding: 15,
    borderRadius: 10,
    marginTop: 25,
    flexDirection: "row",
    alignItems: "center",
  },
  headingText: {
    fontWeight: "bold",
    fontSize: 16,
    marginLeft: 10,
    color: "#000",
    lineHeight: 22,
  },
  secondaryTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 25,
    color: COLORS.darkgray,
  },
  danger: {
    color: "#D74E4E",
  },
  success: {
    color: "#1a806b",
  },
  successBg: {
    backgroundColor: "#e8f1ef",
  },
  dangerBg: {
    backgroundColor: "#ffe8e8",
  },
  visaTypes: {
    flex: 1,
  },
  visaTypeCard: {
    borderWidth: 2,
    borderColor: "#f8f8f8",
    marginTop: 20,
    padding: 15,
    borderRadius: 10,
  },
  visaTypeCardTitle: {
    fontWeight: "bold",
    fontSize: 18,
    color: "#000",
  },
  staysNtype: {
    marginTop: 10,
  },
  staysNtypeRow: {
    flexDirection: "row",
    marginVertical: 3,
  },
  staysNtypeRowKey: {
    width: 100,
    color: COLORS.darkgray,
    fontSize: 12,
    fontWeight: "bold",
  },
  staysNtypeRowValue: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#000",
  },
  box: {
    height: 300,
    borderTopEndRadius: 10,
    borderTopLeftRadius: 10,
    overflow: "hidden",
  },
  keyValue: {
    display: "flex",
    marginBottom: 15,
  },
  key: {
    fontWeight: "bold",
    fontSize: 12,
    color: COLORS.darkgray,
    marginRight: 5,
    marginBottom: 5,
  },
  value: {
    fontWeight: "bold",
    fontSize: 15,
    color: "#000",
    marginRight: 5,
  },
  multiValues: {
    flexDirection: "row",
  },
  visaTabHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 20,
  },
  travelToText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  backButton: {
    width: 30,
    height: 30,
    backgroundColor: "rgba(0,0,0, 0.2)",
    borderRadius: 100,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    ...COLORS.shadow,
    position: "absolute",
    top: 55,
    left: 15,
    zIndex: 1,
  },
  generalRow: {
    width: "100%",
    marginTop: 20,
  },
  overviewText: {
    fontSize: 12,
    color: COLORS.black,
    fontWeight: "normal",
    lineHeight: 18,
  },
  gradientWrapper: {
    flex: 1,
    zIndex: 2,
    position: "absolute",
    top: 0,
    left: 0,
    height: 400,
    width: "100%",
  },
  tabWrapper: {
    paddingHorizontal: 15,
  },
  addToBucketButton: {
    width: 30,
    height: 30,
    borderRadius: 50,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    right: 15,
    top: 55,
    zIndex: 3,
  },
  otherInfo: {
    position: "absolute",
    bottom: 5,
    left: 5,
  },
  labelItem: {
    padding: 10,
    paddingVertical: 0,
    flexDirection: "row",
    alignItems: "center",
  },
  labelItemText: {
    color: "#fff",
    fontSize: 34,
    fontWeight: "bold",
    marginLeft: 0,
  },
  ratingLabel: {
    flexDirection: "row",
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 30,
    alignItems: "center",
    paddingBottom: 10,
  },
  ratingText: {
    color: "#fff",
    marginLeft: 3,
    fontSize: 14,
    opacity: 0.7,
  },
  passportBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 8,
    paddingVertical: 7,
    borderRadius: 6,
    ...COLORS.shadow,
    marginLeft: 0,
    width: 90,
  },
  passportTexts: {
    marginLeft: 5,
  },
  passportLabel: {
    fontSize: 8,
    color: COLORS.gray,
    marginBottom: 1,
  },
  passportCountry: {
    fontSize: 10,
    color: "#000",
    fontWeight: "bold",
  },
});
