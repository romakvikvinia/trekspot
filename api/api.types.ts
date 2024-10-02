/**
 * Login related types
 */
export type TokenType = {
  token: string;
  expire: number;
};

export type AuthLoginResponseType = {
  data: {
    login: TokenType;
  };
};

export type AuthLoginType = {
  email: string;
  password: string;
};

/**
 * Sign up related types
 */
export type AuthLogUpType = AuthLoginType & {
  firstName: string;
  lastName: string;
};

export type AuthSignUpResponseType = {
  data: {
    signUp: Omit<AuthLogUpType, "password">;
  };
};

/**
 * Update me
 * user updated related types
 */

export type UserType = {
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  emailVerifiedAt: Date;
  visited_countries: CountryType[];
  lived_countries: CountryType[];
};

export type UserArgType = Partial<
  Omit<UserType, "visited_countries" | "lived_countries"> & {
    visited_countries: string[];
    lived_countries: string[];
  }
>;

export type UpdateMeResponseType = {
  updateMe: UserType;
};

export type meResponseType = {
  me: UserType;
};

export type AnalyticsType = {
  availableCountries: number;
  achievedCountries: number;
  territories: {
    quantity: number;
    items: Record<string, number>;
  };
};

export type AnalyticsResponseType = {
  analytics: AnalyticsType;
};

export type ImageType = {
  id?: string;
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  destination: string;
  filename: string;
  url: string;
  size: number;
};

export type StoryType = {
  id?: string;
  iso2: string;
  images: ImageType[];
};

export type StoriesResponseType = {
  stories: StoryType[];
};

export type CreateOrUpdateStoriesInput = {
  iso2: string;
  images: string[];
};

export type CreateOrUpdateStoriesResponseType = {
  createOrUpdateStore: StoryType;
};
export type FileType = {
  id?: string;
  url: string;
};
export type CountryType = {
  id?: string;
  name: string;
  iso2: string;
  capital: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  continent: string;
  isPopular: boolean;
  rate: number;
  visitors: string;
  gallery: [];
  domain: null;
  independent: true;
  unMember: true;
  currencies: Record<string, { name: string; symbol: string }> | null;
  idd: { root: string; suffixes: string[] };
  region: string;
  subregion: string;
  languages: Record<string, string>;
  population: number;
  car: { signs: string[]; side: string };
  continents: string[];
  startOfWeek: string;
  postalCode: { format: string; regex: string };
  overview: string;
  telecoms: string[];
  emergency: {
    emergency: string;
    police: string;
    ambulance: string;
    fire: string;
  };
  transportTypes: string[];
  taxi: { name: string; ios: string; logo: string; android: string }[];
  security: string;
  recognizedFor: { emoji: string; title: string }[];
  religions: string[];
  whenToVisit: string;
  nationalDay: string;
  plugTypes: string[];
  weatherInformation: {
    averageTemperatures: {
      spring: string;
      summer: string;
      autumn: string;
      winter: string;
    };
    seasonalConsiderations: string;
  };
  image: FileType;
  images: FileType[];
};

export type CountriesResponseType = {
  countries: CountryType[];
};

export type CountriesArgsType = Partial<{
  skip: number;
  take: number;
  isPopular: boolean;
}>;

export type CountryResponseType = {
  country: CountryType;
};

export type CountryArgsType = {
  id: string;
};

//

export type PassportIndexType = {
  form: string;
  to: string;
  requirement: string;
};
export type PassportIndexesArgsType = {
  from: string;
  to: string;
};

export type PassportIndexesResponseType = {
  passportIndex: PassportIndexType;
};

// cities
export type CityType = {
  id?: string;
  city: string;
  city_ascii: string;
  country: string;
  iso2: string;
  capital: string;
  lat: number;
  lng: number;
  description: string;
  rate: number;
  visitors: string;
  image: FileType;
  images: FileType[];
};

export type CitiesArgsType = Partial<
  Omit<CityType, "id"> & {
    inTopSight: boolean;
    isTop: boolean;
    skip: number;
    take: number;
  }
>;

export type CitiesResponseType = {
  cities: CityType[];
};

//
type WorkingHour = {
  day: string;
  hours: string;
};

export type SightLocationType = {
  lat: number;
  lng: number;
};

export type SightType = {
  id: string;
  iso2: string;
  title: string;
  rate: number;
  category: string;
  price: string;
  reviews: string;
  city: string;
  address: string;
  url: string;
  description: string;
  workingHours: WorkingHour[];
  location: SightLocationType;
  image: FileType;
  images: FileType[];
  html_attributions?: string[];
};

export type SightsArgsType = {
  city?: string;
  iso2: string;
  skip?: number;
  take?: number;
};

export type SightsResponseType = Record<string, SightType[]>;
export type SightsFetchResponseType = {
  sights: SightType[];
};

export type RandomCountriesGroupByContinentResponseType = {
  groupedCountry: {
    asia: CountryType[];
    africa: CountryType[];
    europe: CountryType[];
    oceania: CountryType[];
    southAmerica: CountryType[];
    northAmerica: CountryType[];
  };
};

export type RandomSightsResponseType = {
  randomSights: SightType[];
};
export type RandomSightsArgsType = {
  city?: string;
  title?: string;
  category?: string;
  take?: number;
};

export type CountryDishesResponseType = {
  dishes: SightType[];
};
export type CountryDishesArgsType = {
  skip?: number;
  take?: number;
  iso2: string;
};

export type SearchResponseType = {
  search: Array<CountryType | CityType>;
};
export type SearchArgsType = {
  skip?: number;
  take?: number;
  search?: string;
};

export type SearchCitiesResponseType = {
  search: CityType[];
};
export type SearchCitiesArgsType = {
  skip?: number;
  take?: number;
  search?: string;
};

/**
 * Trip
 */

export type TripRouteActivityType = {
  id: string;
  day: number;
  date: string;
  visited: boolean;
  sight: SightType;
};

export type TripRouteType = {
  id: string;
  city: CityType;
  activities: TripRouteActivityType[];
};

export type TripType = {
  id: string;
  name: string;
  startAt: string;
  endAt: string;
  type: string;
  cities: CityType[];
  routes: TripRouteType[];
};

export type CreateTripResponseType = {
  createTrip: TripType;
};
export type CreateTripArgsType = {
  name: string;
  startAt: string;
  endAt: string;
  type: string;
  cities: string[];
};

//
export type TripsResponseType = {
  trips: TripType[];
};
export type TripsArgsType = {
  skip?: number;
  take?: number;
  search?: string;
};

//

export type TopicType = {
  id?: string;
  itemId: string;
  iso2: string;
  title: string;
  description: string;
  image: ImageType;
  category: {
    itemId: string;
    title: string;
  };
};

export type TopicsResponseType = {
  topics: TopicType[];
};
export type TopicsArgsType = {
  skip?: number;
  take?: number;
  search?: string;
  iso2: string;
};

export type TransformedTopicsResponseType = Record<string, TopicType[]>;

//

export type FaqType = {
  id?: string;
  itemId: string;
  iso2: string;
  question: string;
  answer: string;
  category: {
    itemId: string;
    title: string;
  };
};

export type FaqResponseType = {
  faqs: FaqType[];
};
export type FaqArgsType = {
  skip?: number;
  take?: number;
  iso2: string;
  search: string;
};

export type TransformedFaqResponseType = Record<string, FaqType[]>;

export type TripDetailResponseType = {
  trip: TripType;
};
export type TripDetailArgsType = {
  id: string;
};

export type UpdateTripRouteAndActivitiesResponseType = {};

export type UpdateTripRouteAndActivitiesArgsType = {
  trip: string;
  city: string;
  location: { lat: number; lng: number };
  iso2: string;
  days: {
    day: number;
    date: string;
    activities: string[];
  }[];
};

/**
 * Activity type
 */

export type ActivityType = {
  id: string;
  date: string;
  day: number;
  sight: SightType;
  visited: boolean;
};

export type RemoveActivityFromRouteResponseType = {};

export type RemoveActivityFromRouteArgsType = {
  day: number;
  route: string;
  sight: string;
};

export type ChangeActivityVisitedResponseType = {};

export type ChangeActivityVisitedArgsType = {
  visited: boolean;
  day: number;
  route: string;
  sight: string;
};

export type DeleteTripResponseType = {
  removeTrip: TripType;
};

export type DeleteTripArgsType = {
  id: string;
};

export type UpdateTripResponseType = {
  updateTrip: TripType;
};

export type UpdateTripArgsType = {
  id: string;
  name: string;
  startAt: string;
  endAt: string;
  type: string;
  cities: string[];
};
