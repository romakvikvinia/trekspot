import { useCallback, useRef, useState } from "react";
import {
  Keyboard,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Modalize } from "react-native-modalize";
import { Portal } from "react-native-portalize";
import { BucketlistModal } from "../../common/components/BucketlistModal";
import { CountrySearch } from "../../common/components/CountrySearch";
import { COLORS, SIZES } from "../../styles/theme";
import { ClearIcon, FlightIcon, Mark2, SearchIcon, XIcon } from "../../utilities/SvgIcons.utility";
import Constants from "expo-constants";

export const ExploreHeader = () => {
    const [searchActive, setSearchActive] = useState(false);
    const [searchValue, setSearchValue] = useState();
    const BucketListModalRef = useRef<Modalize>(null);

    const onBucketlistOpen = useCallback(() => {
      if (BucketListModalRef.current) BucketListModalRef.current.open();
    }, []);
  return (
    <>
      <View style={styles.screenHeader}>
        <View style={styles.searchBox}>
          <View style={styles.searchIcon}>
            <SearchIcon width={15} />
          </View>
          <TextInput
            placeholder="Search here..."
            placeholderTextColor="#7f7f7f"
            autoFocus={false}
            style={styles.searchInput}
            onChangeText={(e) => setSearchValue(e)}
            onFocus={() => setSearchActive(true)}
            value={searchValue}
          />
          {searchValue ? (
            <TouchableOpacity
              onPress={() => setSearchValue("")}
              style={styles.clearButton}
              activeOpacity={0.7}
            >
              <ClearIcon />
            </TouchableOpacity>
          ) : null}
        </View>
        <View style={styles.right}>
          {searchActive ? (
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => {
                setSearchActive(false);
                Keyboard.dismiss();
              }}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          ) : (
            <>
              <TouchableOpacity
                onPress={() => onBucketlistOpen()}
                style={styles.bucketListButton}
              >
                <FlightIcon color={COLORS.primary} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => onBucketlistOpen()}
                style={styles.bucketListButton}
              >
                <Mark2 size={16} color={COLORS.black} />
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>
      {searchActive ? (
        <View
          style={{
            position: "absolute",
            backgroundColor: "#fff",
            top: 50,
            left: 0,
            width: SIZES.width,
            height:
              Platform.OS === "android"
                ? SIZES.height - 109
                : SIZES.height - 170,
            zIndex: 999,
          }}
        >
          <CountrySearch />
        </View>
      ) : null}
      <Portal>
        <Modalize
          ref={BucketListModalRef}
          modalTopOffset={65}
          disableScrollIfPossible
          avoidKeyboardLikeIOS={true}
          velocity={100000}
          tapGestureEnabled={false}
          closeSnapPointStraightEnabled={false}
          HeaderComponent={
            <View style={[styles.rowItemHeader, { paddingTop: 15 }]}>
              <Text style={styles.h2}>Bucket List</Text>

              <TouchableOpacity
                onPress={() => BucketListModalRef?.current?.close()}
                activeOpacity={0.7}
                style={styles.closeButton}
              >
                <XIcon width="10" height="10" />
              </TouchableOpacity>
            </View>
          }
          modalStyle={{
            backgroundColor: "#F2F2F7",
            // minHeight: "90%",
          }}
          modalHeight={SIZES.height - 100}
          scrollViewProps={{
            showsVerticalScrollIndicator: false,
          }}
        >
          <BucketlistModal />
        </Modalize>
      </Portal>
    </>
  );
};

const styles = StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: "#f8f8f8",
      paddingTop: Constants?.statusBarHeight + 10,
    },
    clearButton: {
        position: "absolute",
        width: 25,
        height: 25,
        top: 10,
        right: 10,
        justifyContent: "center",
        alignItems: "center"
    },
    currentTrip: {
      backgroundColor: "#fef0ff",
      borderRadius: 50,
      flexDirection: "row",
      paddingHorizontal: 18,
      paddingLeft: 10,
      paddingVertical: 10,
      justifyContent: "space-between",
      alignItems: "center",
      marginTop: 10,
      borderWidth: 1,
      borderColor: "#dac9dc",
    },
    currentTripLeft: {
      flexDirection: "row",
    },
    currentTripDotsButton: {
      width: 30,
      height: 30,
      alignItems: "flex-end",
      justifyContent: "center",
    },
    currentTripTitle: {
      fontSize: 18,
      color: COLORS.primaryDark,
      fontWeight: "bold",
    },
    currentTripTitleDate: {
      fontSize: 12,
      color: COLORS.primaryDark,
      marginTop: 3,
      opacity: 0.8,
      fontWeight: "500",
    },
    currentTripIcon: {
      height: 40,
      width: 40,
      borderRadius: 50,
      alignItems: "center",
      justifyContent: "center",
      marginRight: 10,
    },
    cancelButton: {
      height: 40,
      alignItems: "center",
      justifyContent: "center",
      paddingLeft: 15,
    },
    cancelButtonText: {
      fontSize: 14,
      color: COLORS.darkgray,
    },
    closeButton: {
      backgroundColor: "#DBDBDB",
      width: 30,
      height: 30,
      borderRadius: 50,
      justifyContent: "center",
      alignItems: "center",
    },
    bucketListButton: {
      minWidth: 45,
      height: 45,
      backgroundColor: "#fff",
      borderRadius: 50,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      marginLeft: 15,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowOpacity: 0.05,
      shadowRadius: 3,
      elevation: 2,
    },
    searchBox: {
      flex: 1,
      backgroundColor: "#fff",
      flexDirection: "row",
      borderRadius: 30,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowOpacity: 0.05,
      shadowRadius: 3,
      elevation: 2,
    },
    searchIcon: {
      paddingLeft: 15,
    },
    searchInput: {
      height: 45,
      paddingLeft: 10,
      fontSize: 16,
      width: "76%",
      color: "#000",
    },
    right: {
      flexDirection: "row",
      alignItems: "center",
    },
    screenHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingHorizontal: 15,
      paddingBottom: 0,
    },
    rowItem: {
      width: "100%",
      paddingTop: 25,
      backgroundColor: "#f8f8f8",
    },
    rowItemHeader: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: SIZES.padding,
      paddingHorizontal: 15,
    },
    seeAllButtonTxt: {
      color: COLORS.primary,
      fontSize: SIZES.body4,
    },
    h2: {
      fontSize: 22,
      color: "#000",
      fontWeight: "600",
    },
    contentBox: {
      marginTop: 5,
      paddingLeft: 15,
    },
  });