export enum SocialProvidersEnum {
  Facebook = "Facebook",
  Google = "Google",
  Apple = "Apple",
}
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
export type AuthSocialLogInInput = Pick<TokenType, "token"> & {
  provider: SocialProvidersEnum;
};
export type AuthSocialLogInResponseType = {
  data: {
    socialLogin: TokenType;
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
  image: FileType;
  images: FileType[];
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
