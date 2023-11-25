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
import {
  CheckCircleIcon,
  Mark,
  StarIcon,
} from "../../utilities/SvgIcons.utility";
import { LinearGradient } from "expo-linear-gradient";

export const CountrySearch = ({
  countrySearchVisible,
  setCountrySearchVisible,
}) => {
  const modalRef = useRef<Modalize>(null);

  useEffect(() => {
    if (countrySearchVisible) {
      if (modalRef.current) modalRef.current.open();
    }
  }, [countrySearchVisible]);

  const Country = ({ item }: any) => {
    const countryCode = item.iso2 as string;

    // @ts-ignore
    const imagePath = Flags[countryCode];

    return (
      <TouchableOpacity style={styles.countryItem} activeOpacity={0.7}>
        <ImageBackground
          style={styles.box}
          resizeMode="cover"
          source={{
            uri: "https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?q=10&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          }}
        >
          <TouchableOpacity style={styles.gradientWrapper} activeOpacity={0.7}>
            <LinearGradient
              style={styles.gradientWrapper}
              colors={["rgba(0,0,0,0.01)", "rgba(0,0,0,0.6)"]}
            >
              <View style={styles.labelItem}>
                <Mark color="#fff" size="sm" />
                <Text style={[styles.labelItemText, styles.titleSm]}>
                  {item.name}
                </Text>
              </View>
              <View style={styles.ratingLabel}>
                <View style={{ position: "relative", top: -1, opacity: 0.8 }}>
                  <StarIcon color="#FFBC3E" />
                </View>
                <Text style={[styles.ratingText, styles.ratingTextXs]}>
                  {item.rating} /
                </Text>
                <Text style={[styles.ratingText, styles.ratingTextXs]}>
                  {item.visitors} visitors
                </Text>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        </ImageBackground>
      </TouchableOpacity>
    );
  };

  return (
    <Portal>
      <Modalize
        ref={modalRef}
        modalTopOffset={0}
        onClose={() => setCountrySearchVisible(false)}
        withHandle={false}
        modalStyle={{
          minHeight: "100%",
          paddingTop: 55,
        }}
        HeaderComponent={
          <View style={styles.modalHeader}>
            <TextInput
              style={styles.searchInput}
              placeholder="Search..."
              placeholderTextColor={COLORS.darkgray}
              autoFocus={true}
            />
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => modalRef.current && modalRef.current.close()}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        }
      >
        <View
          style={{
            flex: 1,
            height: SIZES.height - 125,
            flexDirection: "row",
            justifyContent: "center",
            paddingHorizontal: 15,
          }}
        >
          <FlashList
            data={CountriesList.slice(0, 15)}
            renderItem={({ item }) => <Country item={item} />}
            estimatedItemSize={200}
            horizontal={false}
            numColumns={2}
            showsVerticalScrollIndicator={false}
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
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  searchInput: {
    height: 40,
    backgroundColor: "#ececec",
    borderRadius: SIZES.radius * 5,
    paddingLeft: 20,
    fontSize: 16,
    color: COLORS.black,
    flex: 1,
  },
  labelItemText: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
    marginLeft: 5,
  },
  ratingLabel: {
    flexDirection: "row",
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 30,
    alignItems: "center",
    paddingBottom: 10,
  },
  labelItem: {
    padding: 10,
    paddingVertical: 0,
    flexDirection: "row",
    alignItems: "center",
  },
  cancelButton: {
    marginLeft: 15,
  },
  cancelButtonText: {
    color: COLORS.gray,
    fontSize: 14,
    fontWeight: "bold",
  },
  titleSm: {
    fontSize: 13,
    marginLeft: 2,
  },
  ratingText: {
    color: "#fff",
    marginLeft: 3,
    fontSize: 12,
    opacity: 0.7,
  },
  box: {
    flex: 1,
    height: 130,
    backgroundColor: "#fafafa",
    borderRadius: 15,
    overflow: "hidden",
  },
  countryItem: {
    paddingVertical: 5,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "33%",
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
