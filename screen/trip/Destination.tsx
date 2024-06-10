import { useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Text } from "react-native";
import { useLazyGetCitiesQuery } from "../../api/api.trekspot";
import { SearchResult } from "../../common/components/SearchResult";
import { SearchComponent } from "../../common/ui/SearchComponent";
import { NotFound } from "../../components/common/NotFound";

import { COLORS, SIZES } from "../../styles/theme";
import { CountriesList } from "../../utilities/countryList";

export const Destination = ({ onDestinationModalClose }) => {
  const [search, setSearch] = useState("");
  const [destinationSelected, setDestinationSelected] = useState(null);

  const handleChange = (dest) => {
    setDestinationSelected(dest);
    console.log("des", dest);
  };

  const filteredCountries =
    search && search.length > 1
      ? CountriesList.filter(
          (i) =>
            i.name.toLowerCase().includes(search.toLowerCase()) ||
            i.capital.toLowerCase().includes(search.toLowerCase())
        )
      : CountriesList;

  return (
    <>
      <View style={styles.modalHeader}>
        <View style={{ flex: 1 }}>
          <SearchComponent search={search} setSearch={setSearch} />
        </View>
        <TouchableOpacity
          style={styles.cancelButton}
          onPress={() => onDestinationModalClose()}
        >
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
      </View>
      {/* <View style={{marginTop: 25}}>
            <Loader background="#F2F2F7" isLoading={true} size="small" />
        </View> */}
        
      {filteredCountries?.length > 0 && (
        <View style={{ paddingHorizontal: 10,  flex: 1}}>
          <SearchResult data={filteredCountries} handleChange={handleChange} />
        </View>
      )}

      {!filteredCountries?.length && (
        <View style={styles.notesWarning}>
          <NotFound
            text="Can't find destination? No worries! We're adding new ones every day, so check back soon"
          />
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
