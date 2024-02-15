import { FlashList } from "@shopify/flash-list";
import { Image } from "expo-image";
import { useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Text } from "react-native";
import { SearchComponent } from "../../common/ui/SearchComponent";
import { searchComponentStyles } from "../../styles/searchComponentStyles";
import { COLORS, SIZES } from "../../styles/theme";
import {
  CloseCircleIcon,
  Mark,
  SearchIcon,
} from "../../utilities/SvgIcons.utility";

export const Destination = () => {
  const [search, setSearch] = useState("");
  return (
    <>
      <View style={styles.modalHeader}>
        <SearchComponent search={search} setSearch={setSearch} />
      </View>
      <View
        style={{ flex: 1, height: SIZES.height - 200, paddingHorizontal: 20 }}
      >
        <View
          style={{
            marginTop: 15,
          }}
        >
          <ActivityIndicator />
        </View>
        <FlashList
          // keyExtractor={(item) =>
          //   `${item.iso2}-${item.name}-${item.capital}`
          // }
          // extraData={filteredCountries}
          data={["a", "2", "s"]}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.destination} activeOpacity={0.5}>
              {/* If country show flag */}
              {/* <Image
                cachePolicy="memory"
                contentFit="cover"
                transition={0}
                source={{
                  uri: "https://cdn-icons-png.flaticon.com/512/206/206657.png",
                }}
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: 5,
                }}
              /> */}
              <Mark color="black" size="15" />
              <View>
                <Text style={styles.destinationText}>Paris</Text>
                <Text
                  style={[
                    styles.destinationText,
                    { fontSize: 12, opacity: 0.7 },
                  ]}
                >
                  France
                </Text>
              </View>
            </TouchableOpacity>
          )}
          estimatedItemSize={200}
        />
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  modalHeader: {
    width: "100%",
    padding: 15,
  },
  rowItemHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    paddingVertical: 15,
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
    paddingVertical: 10,
  },
  destinationText: {
    marginLeft: 10,
    fontSize: 16,
    color: COLORS.black,
    fontWeight: "500",
  },
});
