import AsyncStorage from "@react-native-async-storage/async-storage";
import Constants from "expo-constants";
import { useEffect, useMemo, useState } from "react";
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import { COLORS } from "../../styles/theme";
import { Currencies } from "../../utilities/Currencies";
import { CheckLiteIcon } from "../../utilities/SvgIcons.utility";

export const CurrencyScreen = ({ navigation }: any) => {
  const [searchValue, setSearchValue] = useState("");

  const [selectedCurrency, setSelectedCurrency] = useState("USD US Dollar");

  const handleCurrencySelection = async (currency: string) => {
    setSelectedCurrency(currency);
    await AsyncStorage.setItem("userCurrency", currency);
    navigation.goBack();
  };

  useEffect(() => {
    const getCurrencyFromStorage = async () => {
      const currency = await AsyncStorage.getItem("userCurrency");
      setSelectedCurrency(currency);
    };
    getCurrencyFromStorage();
  }, []);

  const filteredData = useMemo(() => {
    return Currencies.filter((item) =>
      item.toLowerCase().includes(searchValue.toLowerCase())
    );
  }, [searchValue]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.screen}
    >
      <View style={styles.headerContainer}>
        <Pressable
          style={styles.backButton}
          hitSlop={30}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.buttonText}>Cancel</Text>
        </Pressable>
        <Text style={styles.title}>Currency</Text>
        <Pressable style={[styles.saveButton]} hitSlop={30} onPress={() => navigation.goBack()}>
          <Text
            style={[
              styles.buttonText, 
            ]}
          >
            Save
          </Text>
        </Pressable>
      </View>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.inputItem}
          placeholder="Search currency"
          placeholderTextColor="#85858A"
          onChangeText={setSearchValue}
        />
      </View>
      <FlatList
        data={filteredData}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <Pressable
            style={[
              styles.currencyItem, 
            ]}
            onPress={() => handleCurrencySelection(item)}
          >
            <Text style={[styles.currencyText, {
              color: selectedCurrency === item ? COLORS.primary : COLORS.black
            }]}>{item}</Text>
            {selectedCurrency === item && (
              <CheckLiteIcon color={COLORS.primary} size={20} />
            )}
          </Pressable>
        )}
      />
    </KeyboardAvoidingView>
  );
};

export default CurrencyScreen;

const styles = StyleSheet.create({
  backButton: {
    width: 80,
  },
  buttonText: {
    color: COLORS.primary,
    fontSize: 16,
    fontWeight: "600",
  },
  currencyItem: {
    alignItems: "center",
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
  },
  currencyText: {
    fontSize: 16,
    fontWeight: "600",
  },
  headerContainer: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 25,
    paddingHorizontal: 15,
    paddingTop:
      Platform.OS === "android" ? Constants?.statusBarHeight + 10 : 18,
    width: "100%",
  },
  inputItem: {
    backgroundColor: "#fff",
    borderColor: "#eeeeee",
    borderRadius: 10,
    borderWidth: 1,
    color: "#000",
    fontSize: 15,
    fontWeight: "400",
    height: 50,
    marginBottom: 15,
    paddingHorizontal: 10,
    width: "100%",
  },
  saveButton: {
    flexDirection: "row",
    justifyContent: "flex-end",
    textAlign: "right",
    width: 80,
  },
  screen: {
    flex: 1,
  },
  searchContainer: {
    paddingHorizontal: 15,
  },
  title: {
    color: COLORS.black,
    fontSize: 16,
    fontWeight: "600",
  },
});
