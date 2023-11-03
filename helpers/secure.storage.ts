import * as SecureStore from "expo-secure-store";

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
