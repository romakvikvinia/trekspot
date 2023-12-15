import * as SecureStore from "expo-secure-store";
import { string } from "yup";

export const storeToken = async (token: any) => {
  try {
    await SecureStore.setItemAsync("token", JSON.stringify(token));
  } catch (e) {
    return false;
  }
  return true;
};

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

export const storeCountries = async (code: any, key = "visited_countries") => {
  try {
    const defaultValue: string[] = [];
    let visited_countries = await SecureStore.getItemAsync(key);
    // @ts-ignore
    visited_countries = (
      visited_countries ? JSON.parse(visited_countries) : defaultValue
    ) as string[];

    //@ts-ignore
    visited_countries =
      visited_countries && visited_countries.includes(code)
        ? visited_countries
        : visited_countries?.concat(code);

    await SecureStore.setItemAsync(key, JSON.stringify(visited_countries));
  } catch (e) {
    return false;
  }
  return true;
};

export const getCountries = async (key = "visited_countries") => {
  try {
    const defaultValue: string[] = [];
    let visited_countries = await SecureStore.getItemAsync(key);
    // @ts-ignore
    visited_countries = (
      visited_countries ? JSON.parse(visited_countries) : defaultValue
    ) as string[];

    return visited_countries;
  } catch (e) {
    return false;
  }
};
