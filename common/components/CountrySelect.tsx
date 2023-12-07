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

export const CountrySelect = ({
  countrySelectVisible,
  setCountrySelectVisible,
}) => {
  const modalRef = useRef<Modalize>(null);

  useEffect(() => {
    if (countrySelectVisible) {
      if (modalRef.current) modalRef.current.open();
    }
  }, [countrySelectVisible]);

  const Country = ({ item }: any) => {
    const countryCode = item.iso2 as string;

    // @ts-ignore
    const imagePath = Flags[countryCode];

    return (
      <TouchableOpacity style={styles.countryItem} activeOpacity={0.7}>
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
        <View style={styles.checkIcon}>
          {/* This should be visible when checked */}
          {/* <CheckCircleIcon color={COLORS.primaryDark} /> */}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <Portal>
      <Modalize
        ref={modalRef}
        modalTopOffset={65}
        onClose={setCountrySelectVisible(false)}
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
            data={CountriesList}
            renderItem={({ item }) => <Country item={item} />}
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
