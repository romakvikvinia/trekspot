import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Text } from "react-native";
import { useLazySearchCitiesQuery } from "../../api/api.trekspot";
import { SearchResult } from "../../common/components/SearchResult";
import { SearchComponent } from "../../common/ui/SearchComponent";
import { NotFound } from "../../components/common/NotFound";

import { COLORS, SIZES } from "../../styles/theme";
import { CountriesList } from "../../utilities/countryList";
import { Loader } from "../../common/ui/Loader";
import { CityType } from "../../api/api.types";

interface IDestinationProps {
  onDestinationModalClose: (city?: CityType, cities?: string[]) => void;
}

export const Destination: React.FC<IDestinationProps> = ({
  onDestinationModalClose,
}) => {
  const [timer, setTimer] = useState<ReturnType<typeof setTimeout>>();
  const [search, setSearch] = useState("");
  const [destinationSelected, setDestinationSelected] = useState<Array<string>>(
    []
  );
  const [fetchData, { isLoading, isError, data }] = useLazySearchCitiesQuery();

  const handleChange = ({
    city,
  }: Partial<{
    countryId: string;
    city: CityType;
  }>) => {
    if (city) {
      setDestinationSelected([city?.id!]);
      onDestinationModalClose(city, [city?.id!]);
    }
  };

  const handleSetSearch = useCallback(
    (value: string) => {
      clearTimeout(timer);

      const newTimer = setTimeout(() => {
        console.log("here", value);
        setSearch(value);
      }, 500);

      setTimer(newTimer);
    },
    [timer]
  );

  useEffect(() => {
    if (search && search.length >= 3) {
      fetchData({ skip: 0, take: 100, search });
    }
  }, [search]);

  const filteredCountries =
    (data &&
      data.search &&
      //@ts-ignore
      data.search.filter((i) => i.__typename === "City")) ||
    [];

  return (
    <>
      <View style={styles.modalHeader}>
        <View style={{ flex: 1 }}>
          <SearchComponent search={search} setSearch={handleSetSearch} />
        </View>
        <TouchableOpacity
          style={styles.cancelButton}
          onPress={() => onDestinationModalClose()}
        >
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
      </View>
      {isLoading && (
        <View style={{ marginTop: 25 }}>
          <Loader background="#F2F2F7" isLoading={true} size="small" />
        </View>
      )}

      {search.length >= 3 && filteredCountries.length > 0 && (
        <View style={{ paddingHorizontal: 10, flex: 1 }}>
          <SearchResult items={filteredCountries} handleChange={handleChange} />
        </View>
      )}

      {search.length >= 3 && !filteredCountries.length && (
        <View style={styles.notesWarning}>
          <NotFound text="Can't find destination? No worries! We're adding new ones every day, so check back soon" />
        </View>
      )}
    </>
  );
};
const styles = StyleSheet.create({
  modalHeader: {
    width: "100%",
    padding: 15,
    flexDirection: "row",
    paddingBottom: 0,
  },
  cancelButton: {
    marginLeft: 10,
    justifyContent: "center",
  },
  cancelButtonText: {
    fontSize: 14,
    color: COLORS.darkgray,
  },
  rowItemHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    paddingVertical: 15,
  },
  notesWarning: {
    padding: 15,
  },
  noteText: {
    fontSize: 12,
    textAlign: "center",
    opacity: 0.7,
  },
  searchInput: {
    height: 45,
    backgroundColor: "#fff",
    borderRadius: SIZES.radius * 5,
    paddingLeft: 20,
    fontSize: 16,
    color: COLORS.black,
  },
  destination: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#f5f5f5",
  },
  destinationText: {
    marginLeft: 10,
    fontSize: 16,
    color: COLORS.black,
    fontWeight: "500",
  },
});
