import { FlashList } from "@shopify/flash-list";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { CityType, CountryType } from "../../api/api.types";
import { LocationLinearIcon } from "../../utilities/SvgIcons.utility";

type ItemType = CountryType | CityType;

export const Item = ({
  item,
  handleChange,
}: {
  item: ItemType;
  handleChange: (
    params: Partial<{
      countryId: string;
      city: CityType;
    }>
  ) => void;
}) => {
  //@ts-ignore
  const title = item.__typename === "Country" ? item.name : item.city;

  const subTitle =
    //@ts-ignore
    item.__typename === "City" && `City in ${item.country}`;
  return (
    <TouchableOpacity
      onPress={() =>
        handleChange({
          //@ts-ignore
          countryId: item.__typename === "Country" && item.id,
          //@ts-ignore
          city: item,
        })
      }
      style={styles.countryItem}
      activeOpacity={0.7}
    >
      <View style={styles.box}>
        <LocationLinearIcon color="" size="" />
      </View>
      <View style={styles.gradientWrapper}>
        <View
          style={[
            styles.labelItem,
            {
              flexDirection: "column",
              justifyContent: "flex-start",
              alignItems: "flex-start",
            },
          ]}
        >
          <Text style={[styles.labelItemText]}>{title}</Text>
          <Text
            style={[
              styles.labelItemText,
              {
                fontSize: 12,
                fontWeight: "400",
                marginTop: 5,
              },
            ]}
          >
            {subTitle || "Country"}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export const SearchResult = ({
  items,
  handleChange,
}: {
  items: Array<CountryType | CityType>;
  handleChange: (
    params: Partial<{
      countryId: string;
      city: CityType;
    }>
  ) => void;
}) => {
  return (
    <View style={{ minHeight: 20, flex: 1, paddingTop: 8 }}>
      <FlashList
        data={items}
        renderItem={({ item }) => (
          <Item item={item} handleChange={handleChange} />
        )}
        estimatedItemSize={200}
        horizontal={false}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps={"handled"}
        contentContainerStyle={{ paddingTop: 10 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  box: {
    alignItems: "center",
    backgroundColor: "#f2f2f2",
    borderRadius: 8,
    height: 50,
    justifyContent: "center",
    marginRight: 5,
    overflow: "hidden",
    width: 50,
  },
  countryItem: {
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    flex: 1,
    justifyContent: "space-between",
    paddingHorizontal: 5,
    paddingVertical: 5,
    width: "100%",
  },
  gradientWrapper: {
    flex: 1,
    justifyContent: "flex-end",
  },
  labelItem: {
    alignItems: "center",
    flexDirection: "row",
    marginBottom: 2,
    padding: 10,
    paddingVertical: 0,
  },
  labelItemText: {
    color: "#000",
    fontSize: 14,
    fontWeight: "bold",
    marginLeft: 0,
  },
});
