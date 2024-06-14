import { FlashList } from "@shopify/flash-list";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { COLORS } from "../../styles/theme";
import { LocationLinearIcon } from "../../utilities/SvgIcons.utility";
import { useNavigation } from "@react-navigation/native";
import { CityType, CountryType } from "../../api/api.types";

type ItemType = CountryType | CityType;

export const Item = ({
  item,
  handleChange,
}: {
  item: ItemType;
  handleChange: (
    params: Partial<{
      countryId: string;
      iso2: string;
      city: string;
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
          city: item.city,
          iso2: item.iso2,
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
      iso2: string;
      city: string;
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
  resultTitle: {
    paddingHorizontal: 0,
    marginBottom: 15,
    fontSize: 20,
    fontWeight: "500",
    color: COLORS.black,
    marginTop: 15,
  },
  labelItemText: {
    color: "#000",
    fontSize: 14,
    fontWeight: "bold",
    marginLeft: 0,
  },
  ratingTextXs: {
    color: "#000",
    fontSize: 12,
  },
  ratingLabel: {
    flexDirection: "row",
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 30,
    alignItems: "center",
  },
  labelItem: {
    padding: 10,
    paddingVertical: 0,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 2,
  },
  cancelButton: {
    marginLeft: 15,
    paddingVertical: 10,
  },
  cancelButtonText: {
    color: COLORS.gray,
    fontSize: 14,
    fontWeight: "bold",
  },
  ratingText: {
    color: "#fff",
    marginLeft: 3,
    fontSize: 12,
    opacity: 0.7,
  },
  box: {
    height: 50,
    backgroundColor: "#f2f2f2",
    borderRadius: 8,
    overflow: "hidden",
    width: 50,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 5,
  },
  countryItem: {
    paddingVertical: 5,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 5,
    flex: 1,
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
  gradientWrapper: {
    flex: 1,
    justifyContent: "flex-end",
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
