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
import { NotFound } from "../../components/common/NotFound";
import { searchComponentStyles } from "../../styles/searchComponentStyles";
import { COLORS, SIZES } from "../../styles/theme";
import {
  CloseCircleIcon,
  LeftArrowLong,
  Mark,
  SearchIcon,
} from "../../utilities/SvgIcons.utility";

export const Destination = ({setWhereToModal}) => {
  const [search, setSearch] = useState("");
  return (
    <>
      <View style={styles.modalHeader}>
        <View style={{flex: 1}}>
        <SearchComponent search={search} setSearch={setSearch} />
        </View>
        <TouchableOpacity style={styles.cancelButton} onPress={() => setWhereToModal(false)}>
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
      </View>
      <View
        style={{ flex: 1, width: "100%", height: SIZES.height - 200, paddingHorizontal: 20 }}
      >
        <View
          style={{
            marginTop: 15,
          }}
        >
          <ActivityIndicator color={COLORS.primaryDark} />
        </View>
        <FlashList
          // keyExtractor={(item) =>
          //   `${item.iso2}-${item.name}-${item.capital}`
          // }
          // extraData={filteredCountries}
          data={["a", "2", "s"]}
          showsVerticalScrollIndicator={false}
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
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    backgroundColor: "#fafafa",
                    width: 30,
                    height: 30,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 50,
                    marginRight: 5,
                  }}
                >
                  <Mark color="black" size="15" />
                </View>
                <View>
                  <Text style={styles.destinationText}>Paris</Text>
                  <Text
                    style={[
                      styles.destinationText,
                      { fontSize: 12, opacity: 0.7, marginTop: 2 },
                    ]}
                  >
                    France
                  </Text>
                </View>
              </View>
              <LeftArrowLong width="12" />
            </TouchableOpacity>
          )}
          estimatedItemSize={200}
        />
        {/* <NotFound /> */}
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  modalHeader: {
    width: "100%",
    padding: 15,
    flexDirection: "row"
  },
  cancelButton: {
    marginLeft: 10,
    justifyContent: "center"
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
