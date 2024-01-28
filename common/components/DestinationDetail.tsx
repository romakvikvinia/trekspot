import { FlashList } from "@shopify/flash-list";
import { Image } from "expo-image";
import {
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
  useWindowDimensions,
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
import {
  Tabs,
  MaterialTabBar,
  useFocusedTab,
} from "react-native-collapsible-tab-view";

import React, { useEffect, useRef, useState } from "react";
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
  ForYouIcon,
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
import { ForYou } from "./Destination/ForYou";
import Overview from "./Destination/Overview";
import { Visa } from "./Destination/Visa";
import { Transport } from "./Destination/Transport";
import { ThingsTodo } from "./Destination/ThingsTodo";
import { Events } from "./Destination/Events";
import { Tours } from "./Destination/Tours";
import { Dining } from "./Destination/Dining";
import { Language } from "./Destination/Language";
import { Currency } from "./Destination/Currency";
import { Emergency } from "./Destination/Emergency";
import { useLazyCountryQuery } from "../../api/api.trekspot";

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
  mustSeePlaces: [
    {
      thumbnail:
        "https://cdn.pixabay.com/photo/2019/08/19/15/13/eiffel-tower-4416700_1280.jpg",
      title: "Paris",
      description: "Eiffel Tower, Louvre, cafes & fashion",
    },
    {
      thumbnail:
        "https://cdn.pixabay.com/photo/2022/05/04/09/13/bordeaux-7173548_1280.jpg",
      title: "Bordoeux",
      description: "Wine region hub with Place de la Bourse",
    },
    {
      thumbnail:
        "https://cdn.pixabay.com/photo/2017/08/27/15/09/nice-2686354_1280.jpg",
      title: "Nice",
      description: "French Riviera, plus Matisse art museum",
    },
    {
      thumbnail:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQk5XkU4OtXdkWQHeXHxBhkgxSQBGC5L7DSqSL0ZCe0VoFxFtolJZ9-D3Qwl7E&s=8",
      title: "French Riviera",
      description: "French Riviera, plus Matisse art museum",
    },
    {
      thumbnail:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBLtzlmLHojjYYSG8HtK5KEC9XOvSkD_tL5PipnHg5R1fGPMEX-uubSnSNjjI&s=8",
      title: "Marseille",
      description: "Vieux-Port, markets & bouillabaisse",
    },
    {
      thumbnail:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQudMZQfTFfOW-2Vjvl_6BWU8xifPxCTH9rdor7e8zq0Q28T2-eIEK5_ecTxbM&s=8",
      title: "Provence",
      description: "Côte d'Azur resorts, Avignon & wine",
    },
    {
      thumbnail:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEZ21YYcG6kEY8UZiMeG5zGnQKkEH-d-BEskhc7zAN_AZyRRLSgtf0Jg2c5CE&s=8",
      title: "Lyon",
      description: "Lyon Cathedral & Musée Lumière",
    },
    {
      thumbnail:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4KVEkCZWorXkCSnp8zuugFiAkOokHmtm9EvGS42A3B6hENEJ95jLrI4vnEts&s=8",
      title: "Strasbourg",
      description: "Renaissance Neubau & a Gothic cathedral",
    },
    {
      thumbnail:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQokJriLgABK9HHFyGvtYBIjIdkeP4p7SfPERKs4kQjUshYAK0JaJ3ZoRUVGzI&s=8",
      title: "Cannes",
      description: "Beaches, glamour & famed film festival",
    },
    {
      thumbnail:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2RTm3wH9bVGQad7axYnqB2byRqL444Dn5axOf3VrZAfj6O0HFYPEDvNAXMO4&s=8",
      title: "Mont Saint-Michel",
      description: "Abbey, monastery, castle, château, and middle ages",
    },
  ],
  topSights: [
    {
      thumbnail:
        "https://cdn.pixabay.com/photo/2013/04/13/18/42/tower-103417_1280.jpg",
      title: "Eiffel Tower",
      rating: "4.7",
      type: "Historical landmark",
      address: "",
      website: "",
    },
    {
      thumbnail:
        "https://cdn.pixabay.com/photo/2020/11/22/19/19/louvre-5767708_1280.jpg",
      title: "Louvre Museum",
      rating: "4.7",
      type: "Art museum",
      address: "",
      website: "",
    },
    {
      thumbnail:
        "https://cdn.pixabay.com/photo/2019/03/15/10/32/paris-4056742_1280.jpg",
      title: "Arc de Triomphe",
      rating: "4.7",
      type: "Monument",
      address: "",
      website: "",
    },
    {
      thumbnail:
        "https://lh5.googleusercontent.com/p/AF1QipNw1t4oS3qgaNJDl9e3aFDsMTsDcmQ2nzqQJCrP=w180-h180-n-k-no",
      title: "Cathédrale Notre-Dame de Paris",
      rating: "4.7",
      type: "Cathedral",
      address: "",
      website: "",
    },
    {
      thumbnail:
        "https://lh5.googleusercontent.com/p/AF1QipNZovbbqF9upAf7a4WXHyaAzK4YMVSL4tlhC22T=w180-h180-n-k-no",
      title: "Palace of Versailles",
      rating: "4.6",
      type: "Castle",
      address: "",
      website: "",
    },
    {
      thumbnail:
        "https://lh5.googleusercontent.com/p/AF1QipPNqJjqZMTr0x1byLyL4Y_RrgbjJIw4UOdXnDPk=w180-h180-n-k-no",
      title: "Musée d'Orsay",
      rating: "4.7",
      type: "Art museum",
      address: "",
      website: "",
    },
    {
      thumbnail:
        "https://lh5.googleusercontent.com/p/AF1QipNPEitTEMYRj4FVOO8L_W2VmloqNuky4cXKT9je=w180-h180-n-k-no",
      title: "Disneyland Paris",
      rating: "4.5",
      type: "Theme park",
      address: "",
      website: "",
    },
    {
      thumbnail:
        "https://lh5.googleusercontent.com/p/AF1QipOB_dBm_5jKqfStPXn1eifoxTwDvyxb5JnvyAWp=w180-h180-n-k-no",
      title: "Palais Garnier",
      rating: "4.7",
      type: "Opera house",
      address: "",
      website: "",
    },
    {
      thumbnail:
        "https://lh5.googleusercontent.com/p/AF1QipN4_JkVOD2-hrqC6WFKsBv8pR59zUYZV8eCKFIz=w180-h180-n-k-no",
      title: "Sainte-Chapelle",
      rating: "4.7",
      type: "Chapel",
      address: "",
      website: "",
    },
    {
      thumbnail:
        "https://lh5.googleusercontent.com/p/AF1QipMa2u3Yvr-1ssk_-0bIgJ7HHUTT6Y3fQL7gRMuN=w180-h180-n-k-no",
      title: "Puy du Fou",
      rating: "4.8",
      type: "Theme park",
      address: "",
      website: "",
    },
    {
      thumbnail:
        "https://lh5.googleusercontent.com/p/AF1QipMHVdVAECQWOQ5SahFrkqrilHwjo4RucqOur-No=w180-h180-n-k-no",
      title: "ZooParc de Beauval",
      rating: "4.7",
      type: "Zoo",
      address: "",
      website: "",
    },
    {
      thumbnail:
        "https://lh5.googleusercontent.com/p/AF1QipMr46WIib4tScq5FtfZtpX7aD0o6Bwa5CbP_H6m=w180-h180-n-k-no",
      title: "Tuileries Garden",
      rating: "4.6",
      type: "Garden",
      address: "",
      website: "",
    },
    {
      thumbnail:
        "https://lh5.googleusercontent.com/p/AF1QipOQ3rnQLOHyJBp1krgp4OQbtdwfKV0lcUxO1_V-=w180-h180-n-k-no",
      title: "Luxembourg Palace",
      rating: "4.7",
      type: "Government office",
      address: "",
      website: "",
    },
    {
      thumbnail:
        "https://lh5.googleusercontent.com/p/AF1QipMREO-l4r_duhhUyz2p5iFipqj9ujd1a7REdDfu=w180-h180-n-k-no",
      title: "The Centre Pompidou",
      rating: "4.4",
      type: "Cultural centre",
      address: "",
      website: "",
    },
    {
      thumbnail:
        "https://lh5.googleusercontent.com/p/AF1QipPyfjb43DqQIqOvkhkKDEEY8gXk4E14UYLHcYYT=w180-h180-n-k-no",
      title: "Shakespeare and Company",
      rating: "4.6",
      type: "Book Shop",
      address: "",
      website: "",
    },
    {
      thumbnail:
        "https://lh4.googleusercontent.com/proxy/enuqfmhEUp5ZDXhARjSFa1MschXyWdXUhtRI3rIifXn1z8OaLxffsQsln3rIfhYeOvB65sU0gY_C2k9oTTJvu2QlA9hHO5hV7hl2zTokP3nyez5_Kg1wglTqrfNQeP6OJLUQzSUmqZ-8Oph07_ZV4BErAIf7M8E=w180-h180-n-k-no",
      title: "Pont du Gard",
      rating: "4.6",
      type: "Bridge",
      address: "",
      website: "",
    },
    {
      thumbnail:
        "https://lh5.googleusercontent.com/p/AF1QipO4OjI5bIu4zbpeHJxxEsgU6UhxnuLQajee2Sg5=w180-h180-n-k-no",
      title: "Jardin du Luxembourg",
      rating: "4.7",
      type: "Garden",
      address: "",
      website: "",
    },
  ],
  historicalPlaces: [
    {
      thumbnail:
        "https://cdn.pixabay.com/photo/2020/02/11/01/07/versailles-palace-4838031_1280.jpg",
      title: "Palace of Versailles",
      type: "",
      rating: "",
      price: "",
      address: "",
      website: "",
    },
    {
      thumbnail:
        "https://cdn.pixabay.com/photo/2016/01/03/22/06/chartres-cathedral-1120139_1280.jpg",
      title: "Our Lady of Chartres Cathedral",
      type: "",
      rating: "",
      price: "",
      address: "",
      website: "",
    },
    {
      thumbnail:
        "https://cdn.pixabay.com/photo/2015/10/08/12/48/castle-977670_1280.jpg",
      title: "Château de Chambord",
      type: "",
      rating: "",
      price: "",
      address: "",
      website: "",
    },
    {
      thumbnail:
        "https://lh6.googleusercontent.com/proxy/OEh00WFZvJlyUN9UQw6UOWwJMtnvTSDipOkDCegPEDdfEqVxRzuH849iAMQ5fKfcDRS0dctpbxfITnSZvYdHdGrxUcn-gdySbo-3HG-ZEIUeu_sI9OKfereFZdh94ejNGIJhLy5wXkG2EpHKokS2Wb282Seg7sw=w180-h180-n-k-no",
      title: "Cathedral of Notre-Dame of Reims",
      type: "",
      rating: "",
      price: "",
      address: "",
      website: "",
    },
    {
      thumbnail:
        "https://lh5.googleusercontent.com/p/AF1QipNw1t4oS3qgaNJDl9e3aFDsMTsDcmQ2nzqQJCrP=w180-h180-n-k-no",
      title: "Cathédrale Notre-Dame de Paris",
      type: "",
      rating: "",
      price: "",
      address: "",
      website: "",
    },
    {
      thumbnail:
        "https://lh6.googleusercontent.com/proxy/VSDBMeOlHFia1rVgjtrzdD42kC-HsycxOoAOJ_VCsdrf1eGyS8-438Q3d5ZNb2nr8rNFxLRn6010qqIibO88yCK8tSWGlI9c4nZ4SpC3OuHk_771MhIgkGMUPNdhXZ3ytMcfVc54246Fipdt8_4UvcyhIAcAkKg=w180-h180-n-k-no",
      title: "Eiffel Tower",
      type: "",
      rating: "",
      price: "",
      address: "",
      website: "",
    },
    {
      thumbnail:
        "https://lh5.googleusercontent.com/p/AF1QipMzdNayc36qK-d7mpsMAXzKNwXRkkVfb_Oau30C=w180-h180-n-k-no",
      title: "Château de Chenonceau",
      type: "",
      rating: "",
      price: "",
      address: "",
      website: "",
    },
    {
      thumbnail:
        "https://lh5.googleusercontent.com/p/AF1QipM_ApMgFfAP8CP2ZHJUOb13K7P_SqSkW9sh9MFY=w180-h180-n-k-no",
      title: "Louvre Museum",
      type: "",
      rating: "",
      price: "",
      address: "",
      website: "",
    },
    {
      thumbnail:
        "https://lh5.googleusercontent.com/p/AF1QipMEmbqdB29kWQ2_qqCmVEY9PwedXt9WU79-5vYU=w180-h180-n-k-no",
      title: "Cathédrale Notre-Dame-de-Strasbourg",
      type: "",
      rating: "",
      price: "",
      address: "",
      website: "",
    },
    {
      thumbnail:
        "https://lh5.googleusercontent.com/proxy/yDz8CQdvZLGcxYqZrGDAtyfWEbF0iNq-MGs-l4fNj7XpMOKKX0PsKis5j_yUn3g1a_N1WdBntNeoH4ibCXvIV07HDWT3EpBmQy85YCYEhbCsxYPjzXK4xKVMOG2uXTC1Wv5ZRgL-y1ASyUKM0bIW55PHFwfVyw=w180-h180-n-k-no",
      title: "Arc de Triomphe",
      type: "",
      rating: "",
      price: "",
      address: "",
      website: "",
    },
    {
      thumbnail:
        "https://lh4.googleusercontent.com/proxy/vlGID-5ZRDQeyQ7HvLSe7Na7AACSF-TCs1nHKKVoC8K44MkQF_XjazlaOez6XdZyUtNcNfAqqy-_XH9uwOxFn4PHLzTUDCzzAhC3_QCEKTYxg3ni1uCTbPTYXxFgi0-HubwW0ZHAiVnz_qdJ4VMMQqQDOuFT0m4=w180-h180-n-k-no",
      title: "Cathédrale Notre-Dame d'Amiens",
      type: "",
      rating: "",
      price: "",
      address: "",
      website: "",
    },
    {
      thumbnail:
        "https://lh6.googleusercontent.com/proxy/yeUyQiyJaoGScGKZW37eINBTpiBNoG0rtPzSHXB4yaWjXsej6a4DurT8mPLuKbRPzvQ-2Z3JEiSg1iFsyuyFna1PDTe34EMJh6CfBZtjDV9cq45UJyY_LoYm5eNlM3jRO4zuU6VGT-8CGiLvNGZ50QvMyrQc2Q=w180-h180-n-k-no",
      title: "The Basilica of the Sacred Heart of Paris",
      type: "",
      rating: "",
      price: "",
      address: "",
      website: "",
    },
  ],
  beaches: [
    {
      thumbnails: "",
      title: "",
      rating: "",
      price: "",
      type: "",
    },
  ],
  attractions: [
    {
      thumbnails: "",
      title: "",
      rating: "",
      price: "",
      type: "",
      address: "",
      website: "",
    },
  ],
  parks: [
    {
      thumbnails: "",
      title: "",
      rating: "",
      price: "",
      type: "",
      address: "",
      website: "",
    },
  ],
  museums: [
    {
      thumbnails: "",
      title: "",
      rating: "",
      price: "",
      type: "",
      address: "",
      website: "",
    },
  ],
  shops: [
    {
      thumbnails: "",
      title: "",
      rating: "",
      price: "",
      type: "",
      address: "",
      website: "",
    },
  ],
  blogs: [
    {
      thumbnail:
        "https://i.pinimg.com/564x/c3/68/a3/c368a399d13d74852c921ec780b10304.jpg",
      title: "27 Most Beautiful & Famous Landmarks in France",
      url: "https://worldoflina.com/27-most-beautiful-famous-landmarks-in-france/",
    },
    {
      thumbnail:
        "https://i.pinimg.com/564x/b6/7b/2d/b67b2d2bc0ce2ffd526ff168c8a2bff1.jpg",
      title: "7 Days in France: The Ultimate France Itinerary in 7 Days",
      url: "https://worldwidehoneymoon.com/7-days-in-france-itinerary/",
    },
    {
      thumbnail:
        "https://i.pinimg.com/564x/02/c6/7f/02c67f7e72a58565b2ad4b3974882a72.jpg",
      title:
        "19 Underrated And Beautiful Cities in France You Need To Visit  | In Between Pictures",
      url: "https://inbetweenpictures.com/blog/19-underrated-and-beautiful-cities-in-france-you-need-to-visit",
    },
    {
      thumbnail:
        "https://i.pinimg.com/564x/b3/aa/f5/b3aaf59030d33cb7e0f6c4f72d484189.jpg",
      title: "The Ultimate France Road Trip Itinerary",
      url: "https://www.followmeaway.com/france-road-trip-itinerary/",
    },
    {
      thumbnail:
        "https://i.pinimg.com/564x/c3/68/a3/c368a399d13d74852c921ec780b10304.jpg",
      title: "27 Most Beautiful & Famous Landmarks in France",
      url: "https://worldoflina.com/27-most-beautiful-famous-landmarks-in-france/",
    },
    {
      thumbnail:
        "https://i.pinimg.com/564x/b6/7b/2d/b67b2d2bc0ce2ffd526ff168c8a2bff1.jpg",
      title: "7 Days in France: The Ultimate France Itinerary in 7 Days",
      url: "https://worldwidehoneymoon.com/7-days-in-france-itinerary/",
    },
    {
      thumbnail:
        "https://i.pinimg.com/564x/02/c6/7f/02c67f7e72a58565b2ad4b3974882a72.jpg",
      title:
        "19 Underrated And Beautiful Cities in France You Need To Visit  | In Between Pictures",
      url: "https://inbetweenpictures.com/blog/19-underrated-and-beautiful-cities-in-france-you-need-to-visit",
    },
    {
      thumbnail:
        "https://i.pinimg.com/564x/b3/aa/f5/b3aaf59030d33cb7e0f6c4f72d484189.jpg",
      title: "The Ultimate France Road Trip Itinerary",
      url: "https://www.followmeaway.com/france-road-trip-itinerary/",
    },
  ],
};

type DestinationDetailProps = {
  id: string;
  modalDestinationDetailsRef: any;
};

export const DestinationDetail: React.FC<DestinationDetailProps> = ({
  id,
  modalDestinationDetailsRef,
}) => {
  const [getCountry, { isLoading, data, isError }] = useLazyCountryQuery();

  const modalCountryPassportSelectRef = useRef<Modalize>(null);

  const [countrySelectVisible, setCountrySelectVisible] = useState(false);
  const [placeTitle, setPlaceTitle] = useState("");
  const [blogUrl, setBlogUrl] = useState("");
  const [currencySelectVisible, setCurrencySelectVisible] = useState(false);
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  useEffect(() => {
    if (id) getCountry({ id });
  }, [id]);

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
                {data ? (
                  data.country.images.map((item, ind) => (
                    <ImageBackground
                      style={styles.box}
                      resizeMode="cover"
                      source={{
                        uri: item.url,
                      }}
                      key={`slide-${ind}`}
                    >
                      <LinearGradient
                        style={styles.gradientWrapper}
                        colors={["rgba(0,0,0,0.01)", "rgba(0,0,0,0.4)"]}
                      ></LinearGradient>
                    </ImageBackground>
                  ))
                ) : (
                  <LinearGradient
                    style={styles.gradientWrapper}
                    colors={["rgba(147, 21, 21, 0.1)", "rgba(9, 21, 135, 0.9)"]}
                  ></LinearGradient>
                )}
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
                    {data?.country.visitors} visitors
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
            name="ForYou"
            label={(props) => (
              <View style={styles.customTab}>
                <ForYouIcon color={COLORS.black} />
                <Text
                  style={[
                    styles.customTabLabel,
                    {
                      color: COLORS.black,
                    },
                  ]}
                >
                  For you
                </Text>
              </View>
            )}
          >
            <Tabs.ScrollView
              alwaysBounceVertical={false}
              bounces={false}
              showsVerticalScrollIndicator={false}
            >
              <ForYou DATA={DATA} />
            </Tabs.ScrollView>
          </Tabs.Tab>
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
              <Overview country={data?.country} />
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
              <Emergency DATA={DATA} />
            </Tabs.ScrollView>
          </Tabs.Tab>
        </Tabs.Container>
      </View>

      <Portal>
        <Modalize ref={modalCountryPassportSelectRef} modalTopOffset={65}>
          <CountrySelect />
        </Modalize>
      </Portal>
    </>
  );
};
