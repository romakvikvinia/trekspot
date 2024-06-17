import { useCallback, useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  Text,
} from "react-native";
import { SearchResult } from "../../common/components/SearchResult";
import { COLORS } from "../../styles/theme";
import { BackIcon, ClearIcon } from "../../utilities/SvgIcons.utility";
import Constants from "expo-constants";
import { Loader } from "../../common/ui/Loader";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ExploreRoutesStackParamList } from "../../routes/explore/ExploreRoutes";
import { useLazySearchQuery } from "../../api/api.trekspot";
import { CityType } from "../../api/api.types";

type Props = NativeStackScreenProps<ExploreRoutesStackParamList, "Search">;

export const SearchScreen = ({ navigation }: Props) => {
  const [fetchData, { data, isLoading, isError }] = useLazySearchQuery();
  const [searchValue, setSearchValue] = useState("");

  const handleSearch = useCallback((e: string) => {
    setSearchValue(e);
  }, []);

  const clearSearch = useCallback(() => {
    setSearchValue("");
  }, []);

  const handleSelectDestination = ({
    countryId,
    city,
  }: Partial<{
    countryId: string;
    city: CityType;
  }>) => {
    if (countryId) {
      navigation.navigate("CountryDetailScreen", { countryId });
    } else if (city) {
      navigation.navigate("CityDetail", { city });
    }
  };

  useEffect(() => {
    if (searchValue && searchValue.length >= 3) {
      fetchData({ search: searchValue, skip: 0, take: 3 });
    }
  }, [searchValue]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1, paddingHorizontal: 15 }}
      >
        <View style={styles.searchBox}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <BackIcon size="30" />
          </TouchableOpacity>
          <TextInput
            placeholder="Search here..."
            placeholderTextColor="#7f7f7f"
            autoFocus={true}
            style={styles.searchInput}
            onChangeText={handleSearch}
            value={searchValue}
            autoCorrect={false}
          />
          {searchValue ? (
            <TouchableOpacity
              onPress={clearSearch}
              style={styles.clearButton}
              activeOpacity={0.7}
            >
              <ClearIcon />
            </TouchableOpacity>
          ) : null}
        </View>
        {isLoading && (
          <View style={{ marginTop: 50 }}>
            <Loader background="" isLoading={true} size="small" />
          </View>
        )}

        {!isLoading && !!data?.search.length && !!searchValue.length && (
          <SearchResult
            items={data?.search || []}
            handleChange={handleSelectDestination}
          />
        )}

        {!isLoading && data?.search.length === 0 && (
          <View style={styles.notesWarning}>
            <Text style={styles.noteText}>
              Can't find destination? No worries! We're adding new ones every
              day, so check back soon
            </Text>
          </View>
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f8f8f8",
    paddingTop: Constants?.statusBarHeight + 10,
  },
  notesWarning: {
    padding: 15,
  },
  noteText: {
    fontSize: 12,
    textAlign: "center",
    opacity: 0.7,
  },
  searchBox: {
    height: 55,
    backgroundColor: "#fff",
    flexDirection: "row",
    borderRadius: 30,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
    borderWidth: 2,
    borderStyle: "solid",
    borderColor: COLORS.primary,
  },
  searchInput: {
    paddingLeft: 0,
    fontSize: 16,
    flex: 1,
    color: "#000",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    fontWeight: "500",
    paddingRight: 40,
  },
  backButton: {
    width: 45,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
    height: 55,
  },
  clearButton: {
    position: "absolute",
    width: 40,
    height: 51,
    top: 0,
    right: 5,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
  },
});
