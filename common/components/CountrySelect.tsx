import { useState } from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Modalize } from "react-native-modalize";

import { COLORS } from "../../styles/theme";
import { CountriesList } from "../../utilities/countryList";
import { Flags } from "../../utilities/flags";
import { SearchComponent } from "../ui/SearchComponent";

export const Country = ({ item, onSelect }: any) => {
  const countryCode = item.iso2 as string;

  // @ts-ignore
  const imagePath = Flags[countryCode];

  return (
    <TouchableOpacity
      onPress={() => onSelect(item)}
      style={styles.countryItem}
      activeOpacity={0.7}
    >
      <View style={styles.countryItemLeft}>
        <View
          style={{
            width: 31,
            height: 21,
            borderRadius: 3,
            overflow: "hidden",
            borderWidth: 1,
            borderColor: "#fafafa",
          }}
        >
          <ImageBackground
            resizeMode="cover"
            style={{
              width: 30,
              height: 20,
              backgroundColor: "#ddd",
            }}
            source={imagePath ? imagePath : null} // Set the image source
          />
        </View>
        <Text style={styles.itemTitle}>{item.name}</Text>
      </View>
    </TouchableOpacity>
  );
};

export const CountrySelect = ({
  onSelect,
  onDestinationModalClose,
  modalCountryPassportSelectRef,
}) => {
  const [searchValue, setSearchValue] = useState("");
  const [countries, setCountries] = useState(CountriesList);
  const filteredCountries =
    searchValue && searchValue.length > 1
      ? countries.filter((i) =>
          i.name.toLowerCase().includes(searchValue.toLowerCase())
        )
      : countries;

  const renderItem = ({ item }) => <Country item={item} onSelect={onSelect} />;

  return (
    <>
      <Modalize
        ref={modalCountryPassportSelectRef}
        modalTopOffset={65}
        withHandle={false}
        panGestureEnabled={false}
        onClosed={() => setSearchValue("")}
        HeaderComponent={
          <View style={styles.searchBox}>
            <View style={{ flex: 1 }}>
              <SearchComponent
                search={searchValue}
                setSearch={setSearchValue}
              />
            </View>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => onDestinationModalClose()}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        }
        flatListProps={{
          data: filteredCountries,
          renderItem: renderItem,
          keyExtractor: (item) => item.name,
          showsVerticalScrollIndicator: false,
          scrollEventThrottle: 16,
          contentContainerStyle: {
            paddingHorizontal: 15,
            paddingTop: 0,
            paddingBottom: 25,
          },
          keyboardShouldPersistTaps: "handled",
        }}
      ></Modalize>
    </>
  );
};

const styles = StyleSheet.create({
  cancelButton: {
    justifyContent: "center",
    marginLeft: 10,
  },
  cancelButtonText: {
    color: COLORS.darkgray,
    fontSize: 14,
    fontWeight: "500"
  },
  countryItem: {
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    paddingVertical: 12,
  },
  countryItemLeft: {
    alignItems: "center",
    flexDirection: "row",
  },
  itemTitle: {
    color: "#000",
    fontSize: 14,
    fontWeight: "bold",
    marginLeft: 10,
  },
  searchBox: {
    flexDirection: "row",
    padding: 15,
    width: "100%",
  },
});
