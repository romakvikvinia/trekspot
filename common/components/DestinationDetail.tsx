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
  Linking,
  Platform,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { Modalize } from "react-native-modalize";
import { Portal } from "react-native-portalize";
import { COLORS, SIZES } from "../../styles/theme";
import Swiper from "react-native-swiper";
import { styles } from "./_styles";
import { Tabs, MaterialTabBar } from "react-native-collapsible-tab-view";

import { useEffect, useRef, useState } from "react";
import {
  AmbulanceIcon,
  AutumnIcon,
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
  EventsIcon,
  FireBrigadeIcon,
  InfoIcon,
  LanguageIcon,
  Mark,
  Mark2,
  MarkerFillIcon,
  MetroIcon,
  PassportIcon,
  PoliceIcon,
  SpringIcon,
  StarIcon,
  SummerIcon,
  TopThingsIcon,
  ToursIcon,
  TramwayIcon,
  TransportIcon,
  TrolleybusIcon,
  WinterIcon,
} from "../../utilities/SvgIcons.utility";
import { CountrySelect } from "./CountrySelect";
import { Topsights } from "../../utilities/Tops";
import { MapEmbedView } from "./MapEmbedView";
import { CurrencySelect } from "./CurrencySelect";
import { SecurityThreats } from "./DestinationSubComponents/SecurityThreats";
import { PlugImages } from "../../utilities/Plugs";
import { NotFound } from "../../components/common/NotFound";

const tours = [
  {
    price: "$50.44",
    duration: "2 hours",
    src: "https://media.tacdn.com/media/attractions-splice-spp-360x240/0f/a9/2f/fd.jpg",
    title: "Visit all floors of the Eiffel Tower by elevator",
    score: "902 ",
  },
  {
    price: "$128.91",
    duration: "3 hours",
    src: "https://media.tacdn.com/media/attractions-splice-spp-360x240/11/df/24/bd.jpg",
    title: "Paris Seine River Dinner Cruise with Live Music by Bateaux Mouches",
    score: "2,437 ",
  },
  {
    price: "$73.98",
    duration: "3 hours",
    src: "https://media.tacdn.com/media/attractions-splice-spp-360x240/11/d4/2d/42.jpg",
    title: "Skip-the-Line: Louvre Museum Masterpieces Fully Guided Tour",
    score: "7,499 ",
  },
  {
    price: "$66.92",
    duration: "2 hours 30 minutes",
    src: "https://media.tacdn.com/media/attractions-splice-spp-360x240/07/41/3e/59.jpg",
    title: "Louvre Museum Skip the Line Access with Guided Tour Option",
    score: "3,542 ",
  },
  {
    price: "$139.78",
    duration: "2 hours 30 minutes",
    src: "https://media.tacdn.com/media/attractions-splice-spp-360x240/0f/ee/9b/24.jpg",
    title: "Bateaux Parisiens Seine River Gourmet Dinner & Sightseeing Cruise",
    score: "4,911 ",
  },
  {
    price: "$105.89",
    duration: "3 hours",
    src: "https://media.tacdn.com/media/attractions-splice-spp-360x240/11/ac/fe/a1.jpg",
    title: "Versailles Palace & Garden Tour w. Skip The Line Entry from Paris",
    score: "539 ",
  },
  {
    price: "$141.40",
    duration: "2 hours 30 minutes",
    src: "https://media.tacdn.com/media/attractions-splice-spp-360x240/06/f9/15/d3.jpg",
    title: "Louvre Museum Paris Exclusive Guided Tour With Reserved Entry",
    score: "2,471 ",
  },
  {
    price: "$43.72",
    duration: "1 hour 30 minutes",
    src: "https://media.tacdn.com/media/attractions-splice-spp-360x240/06/74/aa/fc.jpg",
    title: "Eiffel Tower with Host Summit or 2nd Floor",
    score: "3,819 ",
  },
  {
    price: "$45.40",
    duration: "2 hours",
    src: "https://media.tacdn.com/media/attractions-splice-spp-360x240/0b/3a/dc/16.jpg",
    title: "Big Bus Paris Hop-On Hop-Off Tour with Optional River Cruise",
    score: "4,986 ",
  },
  {
    price: "$62.77",
    duration: "1 to 2 days",
    src: "https://media.tacdn.com/media/attractions-splice-spp-360x240/12/38/71/74.jpg",
    title: "Disneyland® Paris Entrance Ticket",
    score: "2,886 ",
  },
  {
    price: "$66.11",
    duration: "1 hour",
    src: "https://media.tacdn.com/media/attractions-splice-spp-360x240/11/cc/5b/b8.jpg",
    title: "Paris Catacombs Tickets And Audio Guided",
    score: "93 ",
  },
  {
    price: "$39.23",
    duration: "2 to 5 hours",
    src: "https://media.tacdn.com/media/attractions-splice-spp-360x240/0f/fb/ea/06.jpg",
    title: "Priority Admission to Louvre Museum",
    score: "414 ",
  },
  {
    price: "$60.53",
    duration: "2 hours",
    src: "https://media.tacdn.com/media/attractions-splice-spp-360x240/11/c8/9f/d4.jpg",
    title: "Eiffel Tower Guiding Tour by Elevator with Summit Access",
    score: "332 ",
  },
  {
    price: "$99.77",
    duration: "1 hour",
    src: "https://media.tacdn.com/media/attractions-splice-spp-360x240/06/75/b0/4f.jpg",
    title: "Eiffel Tower Reserved Entrance Tour with Summit by Elevator",
    score: "2,001 ",
  },
  {
    price: "$88.89",
    duration: "2 hours",
    src: "https://media.tacdn.com/media/attractions-splice-spp-360x240/0f/ee/ae/9c.jpg",
    title: "Bateaux Parisiens Seine River Gourmet Lunch & Sightseeing Cruise",
    score: "1,698 ",
  },
  {
    price: "$122.19",
    duration: "3 hours 18 minutes",
    src: "https://media.tacdn.com/media/attractions-splice-spp-360x240/0f/70/dc/71.jpg",
    title: "Paris Walking Food Tour With Secret Food Tours",
    score: "1,974 ",
  },
  {
    price: "$67.26",
    duration: "1 hour 45 minutes",
    src: "https://media.tacdn.com/media/attractions-splice-spp-360x240/07/8f/2d/63.jpg",
    title: "Paris en Scene Boat 3 Course Dinner Cruise",
    score: "2,028 ",
  },
  {
    price: "$167.02",
    duration: "13 hours",
    src: "https://media.tacdn.com/media/attractions-splice-spp-360x240/06/ef/71/1f.jpg",
    title: "Loire Valley Castles Day Trip from Paris with Wine Tasting",
    score: "1,548 ",
  },
  {
    price: "$29.15",
    duration: "1 to 5 hours",
    src: "https://media.tacdn.com/media/attractions-splice-spp-360x240/10/5a/54/d1.jpg",
    title: "Louvre Museum Ticket & Seine River Cruise",
    score: "469 ",
  },
  {
    price: "$154.69",
    duration: "2 hours",
    src: "https://media.tacdn.com/media/attractions-splice-spp-360x240/08/39/fc/2e.jpg",
    title: "Paris Moulin Rouge Cabaret Show with Champagne Only or Dinner",
    score: "4,583 ",
  },
  {
    price: "$144.60",
    duration: "14 hours",
    src: "https://media.tacdn.com/media/attractions-splice-spp-360x240/11/cc/15/41.jpg",
    title: "Mont Saint Michel Day Trip from Paris with English Speaking Guide",
    score: "606 ",
  },
  {
    price: "$201.77",
    duration: "2 hours 30 minutes",
    src: "https://media.tacdn.com/media/attractions-splice-spp-360x240/0b/2e/01/5b.jpg",
    title: "Learn to bake French Croissant with a Pastry Chef",
    score: "311 ",
  },
  {
    price: "$127.60",
    duration: "1 hour 30 minutes",
    src: "https://media.tacdn.com/media/attractions-splice-spp-360x240/06/fd/30/21.jpg",
    title: "Paris Seine River Gourmet Dinner Cruise with Champagne",
    score: "1,419 ",
  },
  {
    price: "$178.23",
    duration: "14 hours",
    src: "https://media.tacdn.com/media/attractions-splice-spp-360x240/11/fa/5d/da.jpg",
    title:
      "Normandy D-Day Landing Beaches Day Trip with Cider Tasting & Lunch from Paris",
    score: "2,079 ",
  },
];
const dishes = [
  {
    src: "https://cdn.tasteatlas.com//images/dishes/b075a8fbe7224ef787272cf4d979e388.jpg?mw=660",
    title: "Croissant",
    score: "4.5",
    restaurant: "Blé Sucré",
  },
  {
    src: "https://cdn.tasteatlas.com//images/dishes/ec9dfc952dd148a8bbcf43cdbac6569a.jpg?mw=660",
    title: "Quiche",
    score: "4.0",
    restaurant: "Le Voltigeur",
  },
  {
    src: "https://cdn.tasteatlas.com//Images/Dishes/6ef8ca510bb44884af294128bab03191.jpg?mw=660",
    title: "Baguette",
    score: "4.4",
    restaurant: "Du Pain et Des Idées",
  },
  {
    src: "https://cdn.tasteatlas.com//images/dishes/d28dcc17a420413f8d2d2fae451c1813.jpg?mw=660",
    title: "Crêpes",
    score: "4.6",
    restaurant: "Breizh Café",
  },
  {
    src: "https://cdn.tasteatlas.com//images/dishes/bff77c0b5fe34398a03b9a436815fad2.jpg?mw=660",
    title: "Macarons",
    score: "4.0",
    restaurant: "Pierre Hermé",
  },
  {
    src: "https://cdn.tasteatlas.com//Images/Dishes/5af8a479dedb4d53a7718ca752a536eb.jpg?mw=660",
    title: "Éclair",
    score: "4.3",
    restaurant: "Stohrer",
  },
  {
    src: "https://cdn.tasteatlas.com//Images/Dishes/0809873b805340dcbdb18110564779ef.jpg?mw=660",
    title: "Bisque",
    score: "4.2",
    restaurant: "Ciel de Paris",
  },
  {
    src: "https://cdn.tasteatlas.com//Images/Dishes/064bd8d6006c46529ec729cf45cd335e.jpg?mw=660",
    title: "Soufflé",
    score: "4.3",
    restaurant: "Le Récamier",
  },
  {
    src: "https://cdn.tasteatlas.com//images/dishes/d2bb9ce304604df2b8f8789fde694ee0.jpg?mw=660",
    title: "Foie gras",
    score: "3.9",
    restaurant: "Le Comptoir de la Gastronomie",
  },
  {
    src: "https://cdn.tasteatlas.com//Images/Dishes/fde6f39483494f81b0846591fcc50553.jpg?mw=660",
    title: "Crème brûlée",
    score: "4.5",
    restaurant: "Le Potager du Père Thierry",
  },
  {
    src: "https://cdn.tasteatlas.com//Images/Dishes/5a9748c2067c4e00bfbad4334e858518.jpg?mw=660",
    title: "Ratatouille",
    score: "3.9",
    restaurant: "Miznon Paris",
  },
  {
    src: "https://cdn.tasteatlas.com//images/dishes/19ee4ceab82b478eba60e2e0e5a6358d.jpg?mw=660",
    title: "Brioche",
    score: "4.3",
    restaurant: "Ladurée",
  },
  {
    src: "https://cdn.tasteatlas.com//images/dishes/5dd8d8db50b5430482e4da8722c10aea.jpg?mw=660",
    title: "Châteaubriand",
    score: "4.6",
    restaurant: "Chez Julien",
  },
  {
    src: "https://cdn.tasteatlas.com//Images/Dishes/71aba52873554307b73d405a4255058b.jpg?mw=660",
    title: "Mousse",
    score: "4.3",
    restaurant: "Chez Janou",
  },
  {
    src: "https://cdn.tasteatlas.com//images/dishes/0d5c54eb9cd64db6a2832aeb115bb57d.jpg?mw=660",
    title: "Steak au poivre",
    score: "4.5",
    restaurant: "Bistrot Paul Bert",
  },
  {
    src: "https://cdn.tasteatlas.com//Images/Dishes/c64f6a44705e4b6a99974623375afa76.jpg?mw=660",
    title: "Croque-monsieur",
    score: "4.2",
    restaurant: "Le Petit Cler",
  },
  {
    src: "https://cdn.tasteatlas.com//Images/Dishes/89e20319447e4d58933a0764b5a9a345.jpg?mw=660",
    title: "Mousse au chocolat",
    score: "4.3",
    restaurant: "Chez Janou",
  },
  {
    src: "https://cdn.tasteatlas.com//images/dishes/26716764bc414a4699efef6434025831.jpg?mw=660",
    title: "Pain perdu",
    score: "4.2",
    restaurant: "Hardware Société",
  },
  {
    src: "https://cdn.tasteatlas.com//images/dishes/de1fb2902c0443fe87d56ee67792b2ab.jpg?mw=660",
    title: "Profiteroles",
    score: "4.2",
    restaurant: "Le Relais de l'Entrecote",
  },
  {
    src: "https://cdn.tasteatlas.com//images/dishes/3fdf6a746bd748bf940dcb6fca66c56c.jpg?mw=660",
    title: "Confit de canard",
    score: "4.3",
    restaurant: "Josephine Chez Dumonet",
  },
  {
    src: "https://cdn.tasteatlas.com//Images/Dishes/54d1956debfa40f2b1cdc22a89ad6124.jpg?mw=660",
    title: "Steak-frites",
    score: "4.2",
    restaurant: "Le Relais de l'Entrecote",
  },
  {
    src: "https://cdn.tasteatlas.com//images/dishes/bded9f61bc424359931994950bc59662.jpg?mw=660",
    title: "Riz au lait",
    score: "3.5",
    restaurant: "Les Petits Parisiens",
  },
  {
    src: "https://cdn.tasteatlas.com//Images/Dishes/4b5a45d8e11749f9999dd352ea906636.jpg?mw=660",
    title: "Soufflé au chocolat",
    score: "4.5",
    restaurant: "Le Soufflé",
  },
  {
    src: "https://cdn.tasteatlas.com//Images/Dishes/a2ef7a3408c849b68088a44569ab13d0.jpg?mw=660",
    title: "Quiche Lorraine",
    score: "4.1",
    restaurant: "Angelina",
  },
  {
    src: "https://cdn.tasteatlas.com//images/dishes/baab0ab2a0b041f883f01e68ac9f1ba5.jpg?mw=660",
    title: "Steak tartare",
    score: "4.2",
    restaurant: "Les Fines Gueules",
  },
  {
    src: "https://cdn.tasteatlas.com//Images/Dishes/2bf05544af8149acacce732bd4bb6a2e.jpg?mw=660",
    title: "Consommé",
    score: "3.6",
    restaurant: "Toyo",
  },
  {
    src: "https://cdn.tasteatlas.com//Images/Dishes/a4d5cfd1b46646239b59d5b8f57a2bb6.jpg?mw=660",
    title: "Beignets",
    score: "4.2",
    restaurant: "Boulangerie Paul",
  },
  {
    src: "https://cdn.tasteatlas.com//Images/Dishes/3727a3570d5a475baf5a1a0886481e17.jpg?mw=660",
    title: "Madeleines",
    score: "3.9",
    restaurant: "Blé Sucré",
  },
  {
    src: "https://cdn.tasteatlas.com//Images/Dishes/5c99e800b3554b53ae6ca91f7005aae4.jpg?mw=660",
    title: "Clafoutis",
    score: "4.0",
    restaurant: "Gérard Mulot",
  },
  {
    src: "https://cdn.tasteatlas.com//images/dishes/4a4ec4f92d4c4fe588f256863dcdb0b5.jpg?mw=660",
    title: "Bouillabaisse",
    score: "4.0",
    restaurant: "Chez Michel",
  },
  {
    src: "https://cdn.tasteatlas.com//images/dishes/e877acd673a2441bb0bcd40aab9eea39.jpg?mw=660",
    title: "Parfait",
    score: "3.8",
    restaurant: "Le Bristol Paris",
  },
  {
    src: "https://cdn.tasteatlas.com//Images/Dishes/3f4cb32e87ea49779b9b9290705f3edd.jpg?mw=660",
    title: "Île flottante",
    score: "4.1",
    restaurant: "Aux Lyonnais",
  },
];

const DATA = {
  name: {
    common: "France",
    official: "French Republic",
    nativeName: {
      fra: { official: "République française", common: "France" },
    },
  },
  gallery: [
    "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=10&w=1600&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3Ds",
    "https://images.unsplash.com/photo-1500039436846-25ae2f11882e?q=10&w=1600&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1507666664345-c49223375e33?q=10&w=1600&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  ],
  rating: "5",
  visitors: "90m",
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
  overview:
    "Welcome to France, a country that seamlessly blends a rich tapestry of history, art, gastronomy, and breathtaking landscapes.  ",
  telecoms: ["Orange", "SFR", "Bouygues Telecom", "Free"],
  emergency: {
    emergency: "112",
    police: "17",
    ambulance: "15",
    fire: "18",
  },
  transportTypes: ["Bus", "Metro", "Trolleybus", "Trams"],
  taxi: [
    {
      name: "G7 Taxi",
      ios: "https://apps.apple.com/us/app/g7-taxi-book-a-taxi/id402196027",
      android:
        "https://play.google.com/store/apps/details?id=fr.taxisg7.grandpublic",
      logo: "https://upload.wikimedia.org/wikipedia/fr/thumb/e/ec/Logo_Taxis_G7.svg/1200px-Logo_Taxis_G7.svg.png",
    },
    {
      name: "Uber",
      ios: "https://apps.apple.com/us/app/uber-request-a-ride/id368677368",
      android: "https://play.google.com/store/apps/details?id=com.ubercab",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Uber_logo_2018.svg/2560px-Uber_logo_2018.svg.png",
    },
    {
      name: "Bolt",
      ios: "https://apps.apple.com/ee/app/bolt-request-a-ride/id675033630",
      android: "https://play.google.com/store/apps/details?id=ee.mtakso.driver",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/Bolt_logo.png/440px-Bolt_logo.png",
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
      spring: "15°C - 25°C",
      summer: "25°C - 35°C",
      autumn: "10°C - 20°C",
      winter: "0°C - 10°C",
    },
    seasonalConsiderations:
      "Mild and rainy spring, warm and sunny summers, cool autumns, cold winters with occasional snowfall.",
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
  security: {
    type: "secure", // warning, danger
  },
  recognizedFor: [
    { emoji: "🍷", title: "Wine" },
    { emoji: "🥐", title: "Cuisine" },
    { emoji: "🏛️", title: "Art and Museums" },
    { emoji: "🗼", title: "Eiffel Tower" },
    { emoji: "🏰", title: "Châteaux" },
    { emoji: "🏖️", title: "Riviera Beaches" },
  ],
  religions: ["Catholicism"],
  whenToVisit: "April to June and September to November",
  nationalDay: "14 July (Bastille Day)",
  plugTypes: ["C", "F"],
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
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  const Overview = () => {
    const currencyObj = DATA.currencies[Object.keys(DATA.currencies)[0]];

    return (
      <ScrollView
        style={[styles.tabWrapper, { paddingHorizontal: 0 }]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.generalRow}>
          <Text style={styles.overviewText}>{DATA?.overview}</Text>

          <View style={[styles.keyValue, { marginTop: 25, marginBottom: 0 }]}>
            <Text style={styles.key}>Recognized for</Text>
            <View style={styles.tags}>
              {DATA?.recognizedFor?.map((item) => (
                <View style={styles.tag}>
                  <Text style={styles.tagText}>
                    {item?.emoji} {item?.title}
                  </Text>
                </View>
              ))}
            </View>
          </View>

          <View style={[styles.keyValue, { marginTop: 25, marginBottom: 0 }]}>
            <Text style={styles.key}>When to visit</Text>
            <Text style={styles.value}>{DATA?.whenToVisit}</Text>
          </View>
        </View>
        <View style={styles.generalRow}>
          <SecurityThreats data={DATA?.security} />
          <View style={styles.keyValue}>
            <Text style={styles.key}>National Language(s)</Text>
            <Text style={styles.value}>French</Text>
          </View>
          <View style={styles.keyValue}>
            <Text style={styles.key}>Currency</Text>
            <Text style={styles.value}>
              {currencyObj?.name} {currencyObj?.symbol}
            </Text>
          </View>
          <View style={styles.keyValue}>
            <Text style={styles.key}>Religions</Text>
            <Text style={styles.value}>{DATA?.religions?.join(", ")}</Text>
          </View>
          <View style={[styles.keyValue, { marginBottom: 0 }]}>
            <Text style={styles.key}>National day</Text>
            <Text style={styles.value}>{DATA?.nationalDay}</Text>
          </View>
        </View>
        <View style={styles.generalRow}>
          <View style={styles.keyValue}>
            <Text style={styles.key}>Telephone code</Text>
            <Text style={styles.value}>{DATA?.idd?.root}</Text>
          </View>
          <View style={styles.keyValue}>
            <Text style={styles.key}>Telecom operators</Text>
            <View style={styles.multiValues}>
              {DATA?.telecoms?.map((tel, index) => (
                <>
                  <Text style={styles.value}>
                    {tel}
                    {index < DATA.telecoms.length - 1 && ", "}
                  </Text>
                </>
              ))}
            </View>
          </View>
          <View style={styles.keyValue}>
            <Text style={styles.key}>Plug/Socket types</Text>
            <View style={[styles.multiValues, { marginTop: 5 }]}>
              {DATA?.plugTypes?.map((item) => (
                <ImageBackground
                  source={PlugImages[item]}
                  style={{
                    width: 60,
                    height: 60,
                    marginRight: 15,
                  }}
                >
                  <Text
                    style={{
                      position: "absolute",
                      bottom: -22,
                      fontSize: 12,
                      color: COLORS.black,
                      fontWeight: "500",
                      left: 12,
                    }}
                  >
                    Type {item}
                  </Text>
                </ImageBackground>
              ))}
            </View>
          </View>
        </View>
        <View style={[styles.generalRow, { borderBottomWidth: 0 }]}>
          <View style={styles.keyValue}>
            <Text style={styles.key}>Weather</Text>
            <Text
              style={[
                styles.value,
                { fontWeight: "500", fontSize: 12, lineHeight: 18 },
              ]}
            >
              {DATA?.weatherInformation?.seasonalConsiderations}
            </Text>
            <View style={styles.weatherRows}>
              <View style={styles.weatherRow}>
                <View style={styles.weatherLeft}>
                  <SpringIcon />
                  <Text style={styles.seasonText}>Spring</Text>
                </View>
                <Text style={styles.temperatureText}>
                  {DATA?.weatherInformation?.averageTemperatures?.spring}
                </Text>
              </View>
              <View style={styles.weatherRow}>
                <View style={styles.weatherLeft}>
                  <SummerIcon />
                  <Text style={styles.seasonText}>Summer</Text>
                </View>
                <Text style={styles.temperatureText}>
                  {DATA?.weatherInformation?.averageTemperatures?.summer}
                </Text>
              </View>
              <View style={styles.weatherRow}>
                <View style={styles.weatherLeft}>
                  <AutumnIcon />
                  <Text style={styles.seasonText}>Autumn</Text>
                </View>
                <Text style={styles.temperatureText}>
                  {DATA?.weatherInformation?.averageTemperatures?.autumn}
                </Text>
              </View>
              <View style={styles.weatherRow}>
                <View style={styles.weatherLeft}>
                  <WinterIcon />
                  <Text style={styles.seasonText}>Winter</Text>
                </View>
                <Text style={styles.temperatureText}>
                  {DATA?.weatherInformation?.averageTemperatures?.winter}
                </Text>
              </View>
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
        alwaysBounceVertical={false}
      >
        {/* <NotFound /> */}

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
  const Events = () => {
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
          alwaysBounceVertical={false}
        >
          <View style={styles.eventDate}>
            <Text style={styles.eventDateText}>30 November</Text>
          </View>
          <TouchableOpacity activeOpacity={0.7} style={styles.eventItem}>
            <ImageBackground
              resizeMode="cover"
              style={{
                minWidth: 50,
                minHeight: 50,
                backgroundColor: "#fff",
                borderRadius: 50,
                borderWidth: 8,
                borderColor: "#fff",
              }}
              width={50}
              height={50}
              source={{
                uri: "https://cdn-icons-png.flaticon.com/512/5842/5842939.png",
              }}
            ></ImageBackground>
            <View style={styles.eventRight}>
              <Text style={styles.eventTitle}>
                Sivilizasyon x Gambetta Club After Party Techno Noël ! 2023
              </Text>
              <Text style={styles.eventLocation}>
                Le Gambetta Club, Paris, France
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.7} style={styles.eventItem}>
            <ImageBackground
              resizeMode="cover"
              style={{
                minWidth: 50,
                minHeight: 50,
                backgroundColor: "#fff",
                borderRadius: 50,
                borderWidth: 8,
                borderColor: "#fff",
              }}
              width={50}
              height={50}
              source={{
                uri: "https://cdn-icons-png.flaticon.com/512/5842/5842939.png",
              }}
            ></ImageBackground>
            <View style={styles.eventRight}>
              <Text style={styles.eventTitle}>Jean-Michel Jarre</Text>
              <Text style={styles.eventLocation}>
                Galerie Des Glaces, Versailles, France
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.7} style={styles.eventItem}>
            <ImageBackground
              resizeMode="cover"
              style={{
                minWidth: 50,
                minHeight: 50,
                backgroundColor: "#fff",
                borderRadius: 50,
                borderWidth: 8,
                borderColor: "#fff",
              }}
              width={50}
              height={50}
              source={{
                uri: "https://cdn-icons-png.flaticon.com/512/5842/5842939.png",
              }}
            ></ImageBackground>
            <View style={styles.eventRight}>
              <Text style={styles.eventTitle}>
                Sivilizasyon x Gambetta Club After Party Techno Noël ! 2023
              </Text>
              <Text style={styles.eventLocation}>
                Le Gambetta Club, Paris, France
              </Text>
            </View>
          </TouchableOpacity>
          <View style={styles.eventDate}>
            <Text style={styles.eventDateText}>30 November</Text>
          </View>
          <TouchableOpacity activeOpacity={0.7} style={styles.eventItem}>
            <ImageBackground
              resizeMode="cover"
              style={{
                minWidth: 50,
                minHeight: 50,
                backgroundColor: "#fff",
                borderRadius: 50,
                borderWidth: 8,
                borderColor: "#fff",
              }}
              width={50}
              height={50}
              source={{
                uri: "https://cdn-icons-png.flaticon.com/512/5842/5842939.png",
              }}
            ></ImageBackground>
            <View style={styles.eventRight}>
              <Text style={styles.eventTitle}>
                Sivilizasyon x Gambetta Club After Party Techno Noël ! 2023
              </Text>
              <Text style={styles.eventLocation}>
                Le Gambetta Club, Paris, France
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.7} style={styles.eventItem}>
            <ImageBackground
              resizeMode="cover"
              style={{
                minWidth: 50,
                minHeight: 50,
                backgroundColor: "#fff",
                borderRadius: 50,
                borderWidth: 8,
                borderColor: "#fff",
              }}
              width={50}
              height={50}
              source={{
                uri: "https://cdn-icons-png.flaticon.com/512/5842/5842939.png",
              }}
            ></ImageBackground>
            <View style={styles.eventRight}>
              <Text style={styles.eventTitle}>
                Sivilizasyon x Gambetta Club After Party Techno Noël ! 2023
              </Text>
              <Text style={styles.eventLocation}>
                Le Gambetta Club, Paris, France
              </Text>
            </View>
          </TouchableOpacity>
        </ScrollView>
      </>
    );
  };
  const Tours = () => {
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
            {tours?.map((item, ind) => (
              <TouchableOpacity
                activeOpacity={0.7}
                style={styles.thingsTodoItem}
                key={ind}
                // onPress={() => {
                //   onEmbedModalOpen();
                //   setPlaceTitle(item?.title);
                // }}
              >
                <ImageBackground
                  style={styles.thingsTodoItemImage}
                  source={{
                    uri: item.src,
                  }}
                >
                  <View
                    style={[
                      styles.ratingLabel,
                      {
                        position: "absolute",
                        left: 10,
                        bottom: 5,
                        backgroundColor: "rgba(0, 0, 0, 0.5)",
                        paddingBottom: 5,
                        paddingRight: 8,
                        zIndex: 1,
                        opacity: 1,
                      },
                    ]}
                  >
                    <View style={{ position: "relative", top: 0, opacity: 1 }}>
                      <StarIcon color="#FFBC3E" />
                    </View>
                    <Text
                      style={[
                        styles.ratingText,
                        {
                          color: "#fff",
                          marginLeft: 2,
                          opacity: 1,
                          fontSize: 12,
                        },
                      ]}
                    >
                      {item?.score}
                    </Text>
                  </View>
                </ImageBackground>

                <View style={styles.thingsTodoItemDetails}>
                  <Text
                    style={[
                      styles.thingsTodoItemTitle,
                      { fontSize: 14, marginBottom: 5 },
                    ]}
                  >
                    {item.title}
                  </Text>

                  <View style={styles.thingsTodoItemiIn}>
                    <Text
                      style={[
                        styles.thingsTodoItemiIntypeText,
                        { fontWeight: "500", color: COLORS.black },
                      ]}
                    >
                      <Text
                        style={{
                          fontWeight: "400",
                          color: COLORS.gray,
                        }}
                      >
                        Price from:
                      </Text>{" "}
                      {item.price}
                    </Text>
                    <Text
                      style={[
                        styles.thingsTodoItemiIntypeText,
                        { fontWeight: "500", color: COLORS.black },
                      ]}
                    >
                      <Text
                        style={{
                          fontWeight: "400",
                          color: COLORS.gray,
                        }}
                      >
                        Duration:
                      </Text>{" "}
                      {item.duration}
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
  const Transport = () => {
    return (
      <ScrollView
        style={styles.tabWrapper}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.secondaryTitle}>Public transport</Text>

        <View style={styles.transports}>
          {DATA?.transportTypes?.map((item) => {
            return item === "Bus" ? (
              <View style={styles.transportItem}>
                <View style={styles.transportItemIcon}>
                  <BusIcon />
                </View>
                <Text style={styles.transportText}>Bus</Text>
              </View>
            ) : item === "Metro" ? (
              <View style={styles.transportItem}>
                <View style={styles.transportItemIcon}>
                  <MetroIcon />
                </View>
                <Text style={styles.transportText}>Metro</Text>
              </View>
            ) : item === "Trolleybus" ? (
              <View style={styles.transportItem}>
                <View style={styles.transportItemIcon}>
                  <TrolleybusIcon />
                </View>
                <Text style={styles.transportText}>Trolleybus</Text>
              </View>
            ) : item === "Trams" ? (
              <View style={styles.transportItem}>
                <View style={styles.transportItemIcon}>
                  <TramwayIcon />
                </View>
                <Text style={styles.transportText}>Trams</Text>
              </View>
            ) : null;
          })}
        </View>
        <Text style={styles.secondaryTitle}>Taxi apps</Text>
        <View style={styles.transports}>
          {DATA?.taxi?.map((item, ind) => (
            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.transportItem}
              key={`taxt-${ind}`}
              onPress={() =>
                Linking.openURL(
                  `${Platform.OS === "android" ? item?.android : item?.ios}`
                )
              }
            >
              <View style={styles.transportItemIcon}>
                <ImageBackground
                  source={{
                    uri: item?.logo,
                  }}
                  resizeMode="contain"
                  style={{ width: 30, height: 20 }}
                />
              </View>
              <Text style={styles.transportText}>{item?.name}</Text>
            </TouchableOpacity>
          ))}
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
    return (
      <>
        <View style={styles.tabContentHeader}>
          <Text style={styles.tabContentHeaderText}>
            Popular national dishes
          </Text>
        </View>
        <ScrollView
          style={styles.tabWrapper}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.thingsTodo}>
            {dishes?.map((item, ind) => (
              <View style={styles.thingsTodoItem} key={ind}>
                <ImageBackground
                  style={styles.thingsTodoItemImage}
                  source={{
                    uri: item?.src,
                  }}
                ></ImageBackground>

                <View style={styles.thingsTodoItemDetails}>
                  <Text style={styles.thingsTodoItemTitle} selectable={true}>
                    {item?.title}
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
                        {item?.score}
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection:
                          item?.restaurant?.length < 12 ? "row" : "column",
                        alignItems: "flex-start",
                        marginTop: 5,
                      }}
                    >
                      <Text style={styles.thingsTodoItemiIntypeText}>
                        Top spot:
                      </Text>
                      <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={() => {
                          onEmbedModalOpen();
                          setPlaceTitle(item?.restaurant);
                        }}
                      >
                        <Text
                          style={{
                            color: COLORS.primary,
                            fontSize: 14,
                            fontWeight: "600",
                          }}
                          selectable={true}
                        >
                          {item?.restaurant}
                        </Text>
                      </TouchableOpacity>
                    </View>
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
          {DATA?.emergency?.emergency ? (
            <TouchableOpacity
              activeOpacity={0.7}
              style={[
                styles.emergencyButtonItem,
                { backgroundColor: "#af0101" },
              ]}
              onPress={() =>
                Linking.openURL(`tel:${DATA?.emergency?.emergency}`)
              }
            >
              <CallIcon />
              <Text style={styles.emergencyButtonItemText}>
                EU Emergency - {DATA?.emergency?.emergency}
              </Text>
            </TouchableOpacity>
          ) : null}

          {DATA?.emergency?.police ? (
            <TouchableOpacity
              activeOpacity={0.7}
              style={[
                styles.emergencyButtonItem,
                { backgroundColor: "#366dc2" },
              ]}
              onPress={() => Linking.openURL(`tel:${DATA?.emergency?.police}`)}
            >
              <PoliceIcon />
              <Text style={styles.emergencyButtonItemText}>
                Police - {DATA?.emergency?.police}
              </Text>
            </TouchableOpacity>
          ) : null}
          {DATA?.emergency?.ambulance ? (
            <TouchableOpacity
              activeOpacity={0.7}
              style={[
                styles.emergencyButtonItem,
                { backgroundColor: "#f14e2f" },
              ]}
              onPress={() =>
                Linking.openURL(`tel:${DATA?.emergency?.ambulance}`)
              }
            >
              <AmbulanceIcon />
              <Text style={styles.emergencyButtonItemText}>
                Ambulance - {DATA?.emergency?.ambulance}
              </Text>
            </TouchableOpacity>
          ) : null}
          {DATA?.emergency?.fire ? (
            <TouchableOpacity
              activeOpacity={0.7}
              style={[
                styles.emergencyButtonItem,
                { backgroundColor: "#f10d00" },
              ]}
              onPress={() => Linking.openURL(`tel:${DATA?.emergency?.fire}`)}
            >
              <FireBrigadeIcon />
              <Text style={styles.emergencyButtonItemText}>
                Fire brigade - {DATA?.emergency?.fire}
              </Text>
            </TouchableOpacity>
          ) : null}
        </View>
      </ScrollView>
    );
  };
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
          // backgroundColor: "red",
        }}
      >
        <Tabs.Container
          minHeaderHeight={120}
          renderHeader={() => (
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
                    backgroundColor:
                      1 == 0 ? COLORS.primary : "rgba(0, 0, 0, 0.3)",
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
                {DATA?.gallery?.map((item, ind) => (
                  <ImageBackground
                    style={styles.box}
                    resizeMode="cover"
                    source={{
                      uri: item,
                    }}
                    key={`slide-${ind}`}
                  >
                    <LinearGradient
                      style={styles.gradientWrapper}
                      colors={["rgba(0,0,0,0.01)", "rgba(0,0,0,0.4)"]}
                    ></LinearGradient>
                  </ImageBackground>
                ))}
              </Swiper>

              <View style={styles.otherInfo}>
                <View style={styles.labelItem}>
                  <Text style={styles.labelItemText}>{DATA?.name?.common}</Text>
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
                  <Text style={styles.ratingText}>{DATA?.rating} /</Text>
                  <Text style={styles.ratingText}>
                    {DATA?.visitors} visitors
                  </Text>
                </View>
              </View>
            </View>
          )}
          headerHeight={300} // optional
          containerStyle={{
            flex: 1,
            backgroundColor: COLORS.lightGray,
          }}
          headerContainerStyle={{
            elevation: 0,
            shadowColor: "#fff",
          }}
          renderTabBar={(props) => (
            <MaterialTabBar
              {...props}
              scrollEnabled
              indicatorStyle={{
                backgroundColor: COLORS.black,
                height: 3,
              }}
              style={{
                paddingLeft: 10,
              }}
              tabStyle={{
                height: 70,
                marginRight: 15,
              }}
            />
          )}
        >
          <Tabs.Tab
            name="Overview"
            label={(props) => (
              <View style={styles.customTab}>
                <InfoIcon color={COLORS.black} />
                <Text
                  style={[
                    styles.customTabLabel,
                    {
                      color: COLORS.black,
                    },
                  ]}
                >
                  Overview
                </Text>
              </View>
            )}
          >
            <Tabs.ScrollView
              alwaysBounceVertical={false}
              bounces={false}
              showsVerticalScrollIndicator={false}
            >
              <Overview />
            </Tabs.ScrollView>
          </Tabs.Tab>
          <Tabs.Tab
            name="Visa"
            label={(props) => (
              <View style={styles.customTab}>
                <PassportIcon size={20} color={COLORS.black} />
                <Text
                  style={[
                    styles.customTabLabel,
                    {
                      color: COLORS.black,
                    },
                  ]}
                >
                  Visa
                </Text>
              </View>
            )}
          >
            <Tabs.ScrollView
              alwaysBounceVertical={false}
              bounces={false}
              showsVerticalScrollIndicator={false}
            >
              <Visa />
            </Tabs.ScrollView>
          </Tabs.Tab>
          <Tabs.Tab
            name="Transport"
            label={(props) => (
              <View style={styles.customTab}>
                <TransportIcon size={20} color={COLORS.black} />
                <Text
                  style={[
                    styles.customTabLabel,
                    {
                      color: COLORS.black,
                    },
                  ]}
                >
                  Transport
                </Text>
              </View>
            )}
          >
            <Tabs.ScrollView
              alwaysBounceVertical={false}
              bounces={false}
              showsVerticalScrollIndicator={false}
            >
              <Transport />
            </Tabs.ScrollView>
          </Tabs.Tab>
          <Tabs.Tab
            name="Top sights"
            label={(props) => (
              <View style={styles.customTab}>
                <TopThingsIcon size={20} color={COLORS.black} />
                <Text
                  style={[
                    styles.customTabLabel,
                    {
                      color: COLORS.black,
                    },
                  ]}
                >
                  Top sights
                </Text>
              </View>
            )}
          >
            <Tabs.ScrollView
              alwaysBounceVertical={false}
              bounces={false}
              showsVerticalScrollIndicator={false}
            >
              <ThingsTodo />
            </Tabs.ScrollView>
          </Tabs.Tab>
          <Tabs.Tab
            name="Events"
            label={(props) => (
              <View style={styles.customTab}>
                <EventsIcon size={20} color={COLORS.black} />
                <Text
                  style={[
                    styles.customTabLabel,
                    {
                      color: COLORS.black,
                    },
                  ]}
                >
                  Events
                </Text>
              </View>
            )}
          >
            <Tabs.ScrollView
              alwaysBounceVertical={false}
              bounces={false}
              showsVerticalScrollIndicator={false}
            >
              <Events />
            </Tabs.ScrollView>
          </Tabs.Tab>
          <Tabs.Tab
            name="Tours"
            label={(props) => (
              <View style={styles.customTab}>
                <ToursIcon size={20} color={COLORS.black} />
                <Text
                  style={[
                    styles.customTabLabel,
                    {
                      color: COLORS.black,
                    },
                  ]}
                >
                  Tours
                </Text>
              </View>
            )}
          >
            <Tabs.ScrollView
              alwaysBounceVertical={false}
              bounces={false}
              showsVerticalScrollIndicator={false}
            >
              <Tours />
            </Tabs.ScrollView>
          </Tabs.Tab>
          <Tabs.Tab
            name="Dishes"
            label={(props) => (
              <View style={styles.customTab}>
                <DiningIcon size={20} color={COLORS.black} />
                <Text
                  style={[
                    styles.customTabLabel,
                    {
                      color: COLORS.black,
                    },
                  ]}
                >
                  Dishes
                </Text>
              </View>
            )}
          >
            <Tabs.ScrollView
              alwaysBounceVertical={false}
              bounces={false}
              showsVerticalScrollIndicator={false}
            >
              <Dining />
            </Tabs.ScrollView>
          </Tabs.Tab>
          <Tabs.Tab
            name="Language"
            label={(props) => (
              <View style={styles.customTab}>
                <LanguageIcon size={20} color={COLORS.black} />
                <Text
                  style={[
                    styles.customTabLabel,
                    {
                      color: COLORS.black,
                    },
                  ]}
                >
                  Language
                </Text>
              </View>
            )}
          >
            <Tabs.ScrollView
              alwaysBounceVertical={false}
              bounces={false}
              showsVerticalScrollIndicator={false}
            >
              <Language />
            </Tabs.ScrollView>
          </Tabs.Tab>
          <Tabs.Tab
            name="Currency"
            label={(props) => (
              <View style={styles.customTab}>
                <CurrencyIcon size={20} color={COLORS.black} />
                <Text
                  style={[
                    styles.customTabLabel,
                    {
                      color: COLORS.black,
                    },
                  ]}
                >
                  Currency
                </Text>
              </View>
            )}
          >
            <Tabs.ScrollView
              alwaysBounceVertical={false}
              bounces={false}
              showsVerticalScrollIndicator={false}
            >
              <Currency />
            </Tabs.ScrollView>
          </Tabs.Tab>
          <Tabs.Tab
            name="Emergency"
            label={(props) => (
              <View style={styles.customTab}>
                <EmergencyIcon size={20} color={COLORS.black} />
                <Text
                  style={[
                    styles.customTabLabel,
                    {
                      color: COLORS.black,
                    },
                  ]}
                >
                  Emergency
                </Text>
              </View>
            )}
          >
            <Tabs.ScrollView
              alwaysBounceVertical={false}
              bounces={false}
              showsVerticalScrollIndicator={false}
            >
              <Emergency />
            </Tabs.ScrollView>
          </Tabs.Tab>
        </Tabs.Container>
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
