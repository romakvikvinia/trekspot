import { FlashList } from "@shopify/flash-list";
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { COLORS, SIZES } from "../../styles/theme";
import { CountriesList } from "../../utilities/countryList";
import React, { useState } from "react";
import { Flags } from "../../utilities/flags";
import { CheckCircleIcon } from "../../utilities/SvgIcons.utility";
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
      {/* <View style={styles.checkIcon}>
        {
          selected === item.iso2 ? <CheckCircleIcon color={COLORS.primaryDark} /> : null
        }
      </View> */}
    </TouchableOpacity>
  );
};

export const CountrySelect = ({
  search = true,
  onSelect,
  onDestinationModalClose,
}) => {
  const [searchValue, setSearchValue] = useState("");
  const [countries, setCountries] = useState(CountriesList);
  const filteredCountries =
    searchValue && searchValue.length > 1
      ? countries.filter((i) =>
          i.name.toLowerCase().includes(searchValue.toLowerCase())
        )
      : countries;
  return (
    <>
      {search ? (
        <View style={styles.searchBox}>
          <View style={{ flex: 1 }}>
            <SearchComponent search={searchValue} setSearch={setSearchValue} />
          </View>
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => onDestinationModalClose()}
          >
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      ) : null}

      {/* <View style={{ flex: 1, height: SIZES.height - 155 }}> */}
        <FlashList
          extraData={filteredCountries}
          data={filteredCountries}
          renderItem={({ item }) => <Country item={item} onSelect={onSelect} />}
          estimatedItemSize={200}
          keyboardShouldPersistTaps={"handled"}
        />
      {/* </View> */}
    </>
  );
};

const styles = StyleSheet.create({
  searchBox: {
    width: "100%",
    padding: 15,
    flexDirection: "row",
  },
  cancelButton: {
    marginLeft: 10,
    justifyContent: "center",
  },
  cancelButtonText: {
    fontSize: 14,
    color: COLORS.darkgray,
  },
  searchInput: {
    height: 40,
    backgroundColor: "#ececec",
    borderRadius: SIZES.radius * 5,
    paddingLeft: 20,
    fontSize: 16,
    color: COLORS.black,
  },
  countryItem: {
    paddingHorizontal: 15,
    paddingVertical: 12,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  countryItemActionButton: {
    backgroundColor: "#fafafa",
    paddingVertical: 8,
    paddingHorizontal: 10,
    marginLeft: 8,
    borderRadius: 5,
  },
  countryItemLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  countryItemActions: {
    flexDirection: "row",
    alignItems: "center",
  },
  itemTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginLeft: 10,
    color: "#000",
  },
  checkIcon: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: COLORS.gray,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
});
