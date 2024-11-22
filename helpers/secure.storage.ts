import * as SecureStore from "expo-secure-store";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const storeToken = async (token: any) =>
  SecureStore.setItemAsync("token", JSON.stringify(token));

export const getFullToken = async () => {
  let token;
  try {
    token = await SecureStore.getItemAsync("token");
  } catch (e) {
    return token;
  }
  return token ? JSON.parse(token) : null;
};

export const deleteItemFromStorage = async (key = "token") => {
  try {
    await SecureStore.deleteItemAsync(key);
  } catch (e) {
    // console.log(e);
  }
};

export const storeInitialCountryCodes = async (
  key: string = "visited_countries",
  codes: string[] = []
) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(codes));
  } catch (e) {
    return false;
  }
  return true;
};

export const storeCountries = async (
  country: { id: string; iso2: string },
  key = "visited_countries"
) => {
  try {
    const defaultValue: Record<string, string> = {};

    let countries: any = await AsyncStorage.getItem(key);

    countries = countries ? JSON.parse(countries) : defaultValue;

    if (country.id in countries) {
      delete countries[country.id];
    } else {
      countries[country.id] = country.iso2;
    }
    // //@ts-ignore
    // countries =
    //   countries && countries.includes(code) && Array.isArray(countries)
    //     ? countries.filter((i) => i !== code)
    //     : countries?.concat(code);

    await AsyncStorage.setItem(key, JSON.stringify(countries));
  } catch (e) {
    return false;
  }
  return true;
};

export const getCountries = async (key = "visited_countries") => {
  try {
    const defaultValue: Record<string, string> = {};
    let countries: any = await AsyncStorage.getItem(key);

    countries = countries ? JSON.parse(countries) : defaultValue;

    return countries as Record<string, string>;
  } catch (e) {
    return false;
  }
};

export const deleteFromAsyncStorage = async (key: string | string[]) => {
  try {
    if (Array.isArray(key)) {
      await Promise.all(key.map(async (i) => await AsyncStorage.removeItem(i)));
    } else {
      await AsyncStorage.removeItem(key);
    }
  } catch (e) {
    return false;
  }
};
