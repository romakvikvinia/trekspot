import { FlashList } from "@shopify/flash-list";
import { useRef, useState } from "react";
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { SearchComponent } from "../../../common/ui/SearchComponent";
import { COLORS, SIZES } from "../../../styles/theme";
import {
  CirclePin,
  CloseCircleIcon,
  LocationPin,
  LocationPinGradient,
  Mark,
} from "../../../utilities/SvgIcons.utility";

export const PlaceSearch = ({ modalSearchAutocompleteRef, setPlace }) => {
  return (
    <>
      <View style={styles.modalHeader}>
        <TouchableOpacity
          style={styles.cancelButton}
          activeOpacity={0.5}
          onPress={() => modalSearchAutocompleteRef?.current?.close()}
        >
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>

        <Text style={styles.modalTitle}>From</Text>

        <TouchableOpacity style={styles.saveButton} activeOpacity={0.5}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.searchAutocomplete}>
        <View style={styles.icon}>
          <CirclePin width="25" />

          {/* <LocationPinGradient width="25" /> */}
        </View>

        <TextInput
          autoFocus={true}
          placeholderTextColor={COLORS.gray}
          placeholder="Enter country or city"
          style={styles.addActivityTitleInput}
        />
      </View>
      <View
        style={{ flex: 1, height: SIZES.height - 200, paddingHorizontal: 20 }}
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

      {/* <GooglePlacesAutocomplete
          ref={ref}
          autoFocus={true}
          placeholder="Search places"
          minLength={2}
          debounce={200}
          renderLeftButton={() => (
            <View style={styles.icon}>
              <LocationPinGradient width="25" />
            </View>
          )}
          renderRightButton={() => (
            <TouchableOpacity
              activeOpacity={0.5}
              style={{
                position: "absolute",
                right: 7,
                top: 15,
                display:
                  ref.current?.getAddressText()?.length > 0 ? "flex" : "none",
              }}
              onPress={() => ref.current?.clear()}
            >
              <CloseCircleIcon />
            </TouchableOpacity>
          )}
          onPress={(data, details = null) =>
            setPlace((prevState) => {
              return {
                ...prevState,
                from: data?.description,
              };
            })
          }
          listViewDisplayed={false}
          disableScroll={true}
          fetchDetails={true}
          listLoaderComponent={<ActivityIndicator size="small" color="#fff" />}
          query={{
            key: "AIzaSyBqjd7xD7rTO1j_T8lkAgkHkn6dWk9Y-7M",
            language: "en",
          }}
          styles={{
            textInputContainer: {
              width: "100%",
            },
            description: {
              fontWeight: "600",
            },
            predefinedPlacesDescription: {
              color: "#1faadb",
            },
            textInput: {
              color: COLORS.black,
              height: 50,
              fontSize: 20,
              fontWeight: "600",
              backgroundColor: "transparent",
            },
          }}
          enablePoweredByContainer={false}
          isRowScrollable={false}
        /> */}
    </>
  );
};

const styles = StyleSheet.create({
  searchAutocomplete: {
    paddingHorizontal: 15,
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginRight: 15,
    alignItems: "center",
    height: 50,
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
  },
  saveButtonText: {
    fontSize: 14,
    color: COLORS.black,
  },
  saveButton: {
    padding: 10,
    marginTop: -10,
    marginRight: -10,
    width: 65,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  modalHeader: {
    position: "relative",
    padding: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cancelButton: {
    padding: 10,
    marginTop: -10,
    marginLeft: -10,
    width: 65,
    justifyContent: "flex-start",
  },
  addActivityTitleInput: {
    color: COLORS.black,
    height: 40,
    fontSize: 20,
    width: "100%",
    fontWeight: "600",
  },
  cancelButtonText: {
    color: COLORS.black,
    fontSize: 14,
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: "600",
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
