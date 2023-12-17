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
export type CountryType = {
  id?: string;
  name: string;
  iso2: string;
  capital: string;
};

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
