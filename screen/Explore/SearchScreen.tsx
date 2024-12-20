import { NativeStackScreenProps } from "@react-navigation/native-stack";
import Constants from "expo-constants";
import { usePostHog } from "posthog-react-native";
import { useCallback, useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { useLazySearchQuery } from "../../api/api.trekspot";
import { CityType } from "../../api/api.types";
import { SearchResult } from "../../common/components/SearchResult";
import { Loader } from "../../common/ui/Loader";
import { ExploreRoutesStackParamList } from "../../routes/explore/ExploreRoutes";
import { COLORS } from "../../styles/theme";
import { Events } from "../../utilities/Posthog";
import { BackIcon, ClearIcon } from "../../utilities/SvgIcons.utility";

type Props = NativeStackScreenProps<ExploreRoutesStackParamList, "Search">;

export const SearchScreen = ({ navigation }: Props) => {
  const posthog = usePostHog();
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
      posthog?.capture(Events.useUserVisitsAfterSearchCountryOrCity, {
        countryId,
      });
    } else if (city) {
      navigation.navigate("CityDetail", { city });
      posthog?.capture(Events.useUserVisitsAfterSearchCountryOrCity, {
        city,
      });
    }
  };

  useEffect(() => {
    if (searchValue && searchValue.length >= 3) {
      posthog?.capture(Events.useSearchCountryOrCity, {
        searchValue,
       });
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
          <Pressable
            style={styles.backButton}
            onPress={() => navigation.goBack()}
            hitSlop={20}
          >
            <BackIcon size="30" />
          </Pressable>
          <TextInput
            placeholder="Search cities, countries..."
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
  backButton: {
    alignItems: "center",
    borderRadius: 30,
    height: 55,
    justifyContent: "center",
    width: 45,
  },
  clearButton: {
    alignItems: "center",
    borderRadius: 30,
    height: 51,
    justifyContent: "center",
    position: "absolute",
    right: 5,
    top: 0,
    width: 40,
  },
  noteText: {
    fontSize: 12,
    opacity: 0.7,
    textAlign: "center",
  },
  notesWarning: {
    padding: 15,
  },
  safeArea: {
    backgroundColor: "#f8f8f8",
    flex: 1,
    paddingTop: Constants?.statusBarHeight + 10,
  },
  searchBox: {
    alignItems: "center",
    backgroundColor: "#fff",
    borderColor: COLORS.primary,
    borderRadius: 30,
    borderStyle: "solid",
    borderWidth: 2,
    elevation: 2,
    flexDirection: "row",
    height: 55,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.05,
    shadowRadius: 3,
  },
  searchInput: {
    alignItems: "center",
    color: "#000",
    display: "flex",
    flex: 1,
    flexDirection: "row",
    fontSize: 16,
    fontWeight: "500",
    justifyContent: "center",
    paddingLeft: 0,
    paddingRight: 40,
  },
});
