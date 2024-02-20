import { FlashList } from "@shopify/flash-list";
import {
  ImageBackground,
  ScrollView,
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
import { Image } from "expo-image";

export const CountrySearch = ({ modalDestinationSearchRef }) => {
  const Item = ({ item }: any) => {
    return (
      <TouchableOpacity style={styles.countryItem} activeOpacity={0.7}>
        <Image
          style={styles.box}
          resizeMode="cover"
          source={{
            uri: "https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?q=10&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          }}
        ></Image>
        <TouchableOpacity style={styles.gradientWrapper} activeOpacity={0.7}>
          <View style={styles.labelItem}>
            <Text style={[styles.labelItemText]}>{item.name}</Text>
          </View>
          <View style={styles.ratingLabel}>
            <View style={{ position: "relative", top: -1, opacity: 0.8 }}>
              <StarIcon color="#FFBC3E" />
            </View>
            <Text style={[styles.ratingText, styles.ratingTextXs]}>4.5 /</Text>
            <Text style={[styles.ratingText, styles.ratingTextXs]}>
              33k visitors
            </Text>
          </View>
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  return (
    <>
      <ScrollView
        style={{
          flex: 1,
          height: "100%",
          paddingHorizontal: 15,
          paddingBottom: 25,
          backgroundColor: "#f8f8f8",
        }}
        contentContainerStyle={{
          justifyContent: "center",
        }}
      >
        <Text style={styles.resultTitle}>Countries</Text>
        <View style={{ minHeight: 100 }}>
          <FlashList
            data={CountriesList.slice(0, 5)}
            renderItem={({ item }) => <Item item={item} />}
            estimatedItemSize={200}
            horizontal={false}
            showsVerticalScrollIndicator={false}
          />
        </View>

        <Text style={styles.resultTitle}>Cities</Text>
        <View style={{ minHeight: 100 }}>
          <FlashList
            data={CountriesList.slice(0, 5)}
            renderItem={({ item }) => <Item item={item} />}
            estimatedItemSize={200}
            horizontal={false}
            showsVerticalScrollIndicator={false}
          />
        </View>
        <Text style={styles.resultTitle}>Top sights</Text>
        <View style={{ minHeight: 100 }}>
          <FlashList
            data={CountriesList.slice(0, 5)}
            renderItem={({ item }) => <Item item={item} />}
            estimatedItemSize={200}
            horizontal={false}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </ScrollView>
    </>
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
    backgroundColor: "#f8f8f8",
    borderRadius: 15,
    overflow: "hidden",
    width: 50,
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
