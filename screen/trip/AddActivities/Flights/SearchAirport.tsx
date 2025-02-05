import { useNavigation } from "@react-navigation/native";
import Constants from "expo-constants";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import { COLORS } from "../../../../styles/theme";
import { SearchResult } from "./SearchResult";

export const SearchAirport = () => {
  const navigation = useNavigation();

  const handleCancel = () => {
    navigation.goBack();
  }

  const handleClickSearchResult = (item) => {
    console.log("item", item);
  }

  return (
    <View style={{ flex: 1 }}>
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
        style={styles.screen}
      >
        <View style={styles.headerContainer}>
          <Pressable
            style={styles.backButton}
            hitSlop={30}
            onPress={handleCancel}
          >
            <Text style={styles.buttonText}>Cancel</Text>
          </Pressable>
          <Text style={styles.title}>Search airport</Text>
          <Pressable style={styles.saveButton}></Pressable>
        </View>
        <View style={styles.inputs}>
          <TextInput
            style={styles.inputItem}
            placeholder="Enter airport name or code (e.g LAX)"
            placeholderTextColor="#85858A"
            autoFocus
          />
        </View>
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ padding: 15 }}
          keyboardShouldPersistTaps="always"
          keyboardDismissMode="on-drag"
        >
          {/* <View style={{marginVertical: 25}}>
            <Loader isLoading={true} background="#F2F2F7" />
          </View> */}
          <SearchResult
            handleClickSearchResult={handleClickSearchResult}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};
const styles = StyleSheet.create({
  backButton: {
    width: 80,
  },
  buttonText: {
    color: COLORS.primary,
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
  inputs: {
    borderBottomColor: "#dedee0",
    borderBottomWidth: 1,
    marginBottom: 0,
    paddingHorizontal: 15,
  },
  saveButton: {
    flexDirection: "row",
    justifyContent: "flex-end",
    textAlign: "right",
    width: 80,
  },
  screen: {
    backgroundColor: "#F2F2F7",
    flex: 1,
  },
  title: {
    color: COLORS.black,
    fontSize: 16,
    fontWeight: "600",
  },
});
