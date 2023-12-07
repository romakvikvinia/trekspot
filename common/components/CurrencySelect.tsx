import { FlashList } from "@shopify/flash-list";
import {
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Modalize } from "react-native-modalize";
import { Portal } from "react-native-portalize";
import { COLORS, SIZES } from "../../styles/theme";
import { CountriesList } from "../../utilities/countryList";
import { useCallback, useEffect, useRef } from "react";
import { Flags } from "../../utilities/flags";
import { CheckCircleIcon } from "../../utilities/SvgIcons.utility";
import { Currencies } from "../../utilities/Currencies";

export const CurrencySelect = ({
  setCurrencySelectVisible,
  currencySelectVisible,
}) => {
  const modalRef = useRef<Modalize>(null);

  useEffect(() => {
    if (currencySelectVisible) {
      if (modalRef.current) modalRef.current.open();
    }
  }, [currencySelectVisible]);

  const Currency = ({ item }: any) => {
    return (
      <TouchableOpacity
        style={[styles.countryItem, { width: "100%" }]}
        activeOpacity={0.7}
      >
        {console.log("item", item)}
        <Text style={[styles.itemTitle, { fontSize: 16 }]}>
          {item.name} ({item.symbol})
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <Portal>
      <Modalize
        ref={modalRef}
        modalTopOffset={65}
        onClose={setCurrencySelectVisible(false)}
        HeaderComponent={
          <View style={styles.modalHeader}>
            <TextInput
              style={styles.searchInput}
              placeholder="Search..."
              placeholderTextColor={COLORS.darkgray}
            />
          </View>
        }
      >
        <View style={{ flex: 1, height: SIZES.height - 155 }}>
          <FlashList
            data={Currencies}
            renderItem={({ item }) => <Currency item={item} />}
            estimatedItemSize={200}
          />
        </View>
      </Modalize>
    </Portal>
  );
};

const styles = StyleSheet.create({
  modalHeader: {
    width: "100%",
    padding: 15,
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
