import { useNavigation } from "@react-navigation/native";
import Constants from "expo-constants";
import { useRef } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

import { COLORS } from "../../styles/theme";
import { CloseCircleIcon } from "../../utilities/SvgIcons.utility";

export const AutocompletePlaces = () => {
  const navigation = useNavigation();
  const ref = useRef(null);

  const handleCancel = () => {
    navigation.goBack();
  }

  return (
    <View style={{ flex: 1 }}>
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
        style={styles.screen}
      >
        <View style={styles.headerContainer}>
          <Pressable
            style={styles.backButton}
            hitSlop={30}
            onPress={handleCancel}
          >
            <Text style={styles.buttonText}>Cancel</Text>
          </Pressable>
          <Text style={styles.title}>Search places</Text>
          <Pressable style={styles.saveButton} hitSlop={30}>
            <Text style={styles.buttonText}>Save</Text>
          </Pressable>
        </View>
        <GooglePlacesAutocomplete
          ref={ref}
          autoFocus={true}
          placeholder="Enter places, cafes, restaurants, hotels, etc."
          minLength={2}
          fetchDetails={false} //This should be true if we want to get more details about place
          debounce={200}
        //   renderLeftButton={() => (
        //     <View style={styles.icon}>
        //       <SearchIcon width={20} />
        //     </View>
        //   )}
          renderRightButton={() => (
            <Pressable
              style={{
                position: "absolute",
                right: 7,
                top: 18,
                display:
                  ref.current?.getAddressText()?.length > 0 ? "flex" : "none",
              }}
              onPress={() => ref.current?.clear()}
              hitSlop={20}
            >
              <CloseCircleIcon color="#86858c" size="15" />
            </Pressable>
          )}
          onPress={(data, details = null) =>
             console.log("data, details",data, details)
          }
          onFail={(error) => console.error(error)}
          onNotFound={(error) => console.error(error)}
          autoFillOnNotFound={true}
          listViewDisplayed={true}
          disableScroll={true}
          fetchDetails={true}
          listLoaderComponent={<ActivityIndicator size="small" color="#fff" />}
          query={{
            key: "AIzaSyDKZ8yCRk84OAV-57khymju5GI8Vhu4EGY",
            // key: "AIzaSyD3NwQOhUu_vCAQt6iJ7jtwH7RiABs8rzU",
            language: "en",
            types: '(regions)',
          }}
          listUnderlayColor="#fafafa"
          styles={{
            textInputContainer: {
              width: "100%",
              backgroundColor: "#fff",
              borderRadius: 10,
              paddingTop: 5
            },
            description: {
              fontWeight: "600",
            },
            predefinedPlacesDescription: {
              color: "#1faadb",
            },
            textInput: {
              color: COLORS.black,
              height: 40,
              fontSize: 15,
              fontWeight: "400",
              backgroundColor: "transparent",
              paddingLeft: 15,
            },
            listView: {
              backgroundColor: "transparent",
              marginTop: 10,
            },
            row: {
                backgroundColor: "transparent",
                padding: 0,
                height: 50,
                borderBottomWidth: 1,
                borderBottomColor: "#f2f2f7",
                alignItems: "center",
            },
            separator: {
                backgroundColor: "#dedee0",
                height: 1,
            },
        
          }}
          enablePoweredByContainer={false}
          isRowScrollable={false}
        />
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  backButton: {
    width: 80,
  },
  buttonText: {
    color: COLORS.primary,
    fontSize: 16,
    fontWeight: "600",
  },
  headerContainer: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 25,
    paddingHorizontal: 0,
    paddingTop:
      Platform.OS === "android" ? Constants?.statusBarHeight + 10 : 18,
    width: "100%",
  },
  saveButton: {
    flexDirection: "row",
    justifyContent: "flex-end",
    textAlign: "right",
    width: 80,
  },
  screen: {
    backgroundColor: "#F2F2F7",
    flex: 1,
    paddingHorizontal: 15
  },
  title: {
    color: COLORS.black,
    fontSize: 16,
    fontWeight: "600",
  },
});
