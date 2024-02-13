import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { LocationPin } from "../../../utilities/SvgIcons.utility";

export const SearchAutoComplete = () => {
  return (
    <>
      <View style={styles.modalHeader}>
        <TouchableOpacity style={styles.cancelButton} activeOpacity={0.5}>
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.searchAutocomplete}>
        <View style={styles.icon}>
          <LocationPin />
        </View>

        <GooglePlacesAutocomplete
          placeholder="Search"
          minLength={2}
          debounce={200}
          onPress={(data, details = null) => {
            // 'details' is provided when fetchDetails = true
            console.log(data, details);
          }}
          listViewDisplayed="auto"
          disableScroll={true}
          fetchDetails={true}
          query={{
            key: "AIzaSyBqjd7xD7rTO1j_T8lkAgkHkn6dWk9Y-7M",
            language: "en",
          }}
          styles={{
            textInputContainer: {
              width: "100%",
            },
            description: {
              fontWeight: "bold",
            },
            predefinedPlacesDescription: {
              color: "#1faadb",
            },
          }}
          enablePoweredByContainer={false}
          isRowScrollable={false}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  searchAutocomplete: {
    paddingHorizontal: 15,
  },
});
