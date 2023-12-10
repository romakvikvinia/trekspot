import {
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import {
  LivedIcon,
  MapSvg,
  Mark,
  Mark2,
  SearchIcon,
  Share,
  VisitedIcon,
} from "../../utilities/SvgIcons.utility";
import { Modalize } from "react-native-modalize";
import { Portal } from "react-native-portalize";
import { useCallback, useRef, useState } from "react";
import { FlashList } from "@shopify/flash-list";
import { CountriesList } from "../../utilities/countryList";
import { COLORS, SIZES } from "../../styles/theme";
import { Flags } from "../../utilities/flags";
import { useNavigation } from "@react-navigation/native";
import ShareModal from "../../common/components/ShareModal";
import {
  BucketlistModal,
  WishlistModal,
} from "../../common/components/BucketlistModal";

export const MapView = () => {
  const navigation = useNavigation();

  const modalRef = useRef<Modalize>(null);
  const shareModalRef = useRef<Modalize>(null);
  const BucketListModalRef = useRef<Modalize>(null);

  const onOpen = useCallback(() => {
    if (modalRef.current) modalRef.current.open();
  }, []);

  const onShareModalOpen = useCallback(() => {
    if (shareModalRef.current) shareModalRef.current.open();
  }, []);

  const onBucketlistOpen = useCallback(() => {
    if (BucketListModalRef.current) BucketListModalRef.current.open();
  }, []);

  const [visitedCountry, setVisitedCountry] = useState(null);
  const [livedCountry, setLivedCountry] = useState(null);

  const Country = ({ item }: any) => {
    // Assuming that `item` contains the ISO2 country code
    const countryCode = item.iso2 as string;

    // Check if the image path exists in the mapping
    // @ts-ignore
    const imagePath = Flags[countryCode];

    return (
      <View style={styles.countryItem}>
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
        <View style={styles.countryItemActions}>
          <TouchableOpacity
            style={[
              styles.countryItemActionButton,
              visitedCountry === countryCode ? styles.countryActive : null,
            ]}
            onPress={() => setVisitedCountry(countryCode)}
          >
            <VisitedIcon active={visitedCountry === countryCode} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.countryItemActionButton,
              livedCountry === countryCode ? styles.countryLived : null,
            ]}
            onPress={() => setLivedCountry(countryCode)}
          >
            <LivedIcon active={livedCountry === countryCode} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <>
      <View style={styles.mapContainer}>
        <View style={styles.topActions}>
          <View style={styles.left}>
            {/* <View
              style={{
                backgroundColor: "#fff",
                height: 38,
                width: "95%",
                borderRadius: 30,
                flexDirection: "row",
                paddingLeft: 15,
                alignItems: "center",
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.05,
                shadowRadius: 3.84,
                elevation: 5,
              }}
            >
              <SearchIcon width="15" />
              <TextInput
                placeholder="Search places"
                placeholderTextColor="#333"
                style={{
                  height: 38,
                  paddingLeft: 10,
                  fontSize: 14,
                  color: "#000",
                }}
              />
            </View> */}
            <TouchableOpacity
              onPress={() => onOpen()}
              style={[styles.btn, { marginRight: 10 }]}
            >
              <Mark />
              <Text style={styles.txt}>Add Visit</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => onBucketlistOpen()}
              style={styles.btn}
            >
              <Mark2 />
              <Text style={styles.txt}>Bucket List</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => onShareModalOpen()}
          >
            <Share />
            <Text style={styles.txt}>Share</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => onOpen()}
          style={{
            padding: 15,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <MapSvg />
        </TouchableOpacity>

        <View style={styles.row}>
          <View style={[styles.rowBox]}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Text style={styles.lg}>24</Text>
              <Text
                style={[styles.sublabel, { marginLeft: 2, marginBottom: 2 }]}
              >
                %
              </Text>
            </View>

            <Text style={styles.statLabel}>World</Text>
          </View>
          <View style={[styles.rowBox]}>
            <View style={styles.amountView}>
              <Text style={styles.lg}>34</Text>
              <View style={styles.labelView}>
                <Text style={styles.sublabel}>/</Text>
                <Text style={[styles.sublabel, { marginTop: 2 }]}> 195</Text>
              </View>
            </View>

            <Text style={styles.statLabel}>Countries</Text>
          </View>
          <View style={[styles.rowBox]}>
            <View style={styles.amountView}>
              <Text style={styles.lg}>3</Text>
              <View style={styles.labelView}>
                <Text style={styles.sublabel}>/</Text>
                <Text style={[styles.sublabel, { marginTop: 2 }]}> 6</Text>
              </View>
            </View>
            <Text style={styles.statLabel}>Territories</Text>
          </View>
        </View>
      </View>

      <Portal>
        <Modalize
          ref={modalRef}
          modalTopOffset={65}
          HeaderComponent={
            <View style={styles.modalHeader}>
              <TextInput
                style={styles.searchInput}
                placeholder="Search..."
                placeholderTextColor={COLORS.darkgray}
              />

              <View style={styles.infoRow}>
                <Text style={styles.countryAmount}>UN 195 Countries</Text>
                <View style={styles.lengend}>
                  <View style={styles.legendItem}>
                    <VisitedIcon />
                    <Text style={styles.legendItemText}>Visited</Text>
                  </View>
                  <View style={styles.legendItem}>
                    <LivedIcon />
                    <Text style={styles.legendItemText}>Lived</Text>
                  </View>
                </View>
              </View>
            </View>
          }
        >
          <View style={{ flex: 1, height: SIZES.height - 200 }}>
            <FlashList
              data={CountriesList}
              renderItem={({ item }) => <Country item={item} />}
              estimatedItemSize={200}
            />
          </View>
        </Modalize>
      </Portal>

      <Portal>
        <Modalize ref={shareModalRef} modalTopOffset={65} adjustToContentHeight>
          <ShareModal />
        </Modalize>
      </Portal>

      <Portal>
        <Modalize
          ref={BucketListModalRef}
          modalTopOffset={65}
          disableScrollIfPossible
          adjustToContentHeight
          HeaderComponent={
            <View style={styles.rowItemHeader}>
              <Text style={styles.h2}>Bucket List</Text>
            </View>
          }
        >
          <BucketlistModal />
        </Modalize>
      </Portal>
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
  h2: {
    fontSize: 22,
    color: "#000",
    fontWeight: "bold",
  },
  infoRow: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
    borderBottomWidth: 1,
    paddingBottom: 10,
    borderColor: "#efefef",
  },
  countryAmount: {
    color: COLORS.darkgray,
    fontSize: SIZES.body4,
  },
  lengend: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  legendItem: {
    flexDirection: "row",
    marginLeft: 15,
  },
  legendItemText: {
    marginLeft: 5,
    fontSize: SIZES.body4,
    color: COLORS.darkgray,
  },
  searchInput: {
    height: 40,
    backgroundColor: "#ececec",
    borderRadius: SIZES.radius * 5,
    paddingLeft: 20,
    fontSize: 16,
    color: COLORS.black,
  },
  mapContainer: {
    marginBottom: 15,
  },
  map: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginLeft: 10,
    color: "#000",
  },
  left: {
    flexDirection: "row",
    display: "flex",
    flex: 1,
  },
  btn: {
    backgroundColor: "#fff",
    height: 38,
    paddingHorizontal: 15,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    flexDirection: "row",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 3.84,
    elevation: 5,
  },
  countryItem: {
    paddingHorizontal: 15,
    marginBottom: 20,
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
  countryActive: {
    backgroundColor: COLORS.primary,
  },
  countryLived: {
    backgroundColor: "#00d52d",
  },
  amountView: {
    flexDirection: "row",
    alignItems: "center",
  },
  labelView: {
    position: "relative",
    bottom: 3,
    marginLeft: 4,
    flexDirection: "row",
    alignItems: "center",
  },
  txt: {
    fontSize: 14,
    marginLeft: 5,
    color: "#333",
  },
  sublabel: {
    fontSize: 14,
    position: "relative",
    flexDirection: "row",
    alignItems: "center",
    lineHeight: 25,
    color: COLORS.darkgray,
  },
  statLabel: {
    fontSize: 12,
    color: COLORS.darkgray,
  },
  topActions: {
    width: "100%",
    flexDirection: "row",
    display: "flex",
    paddingHorizontal: 15,
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 15,
  },
  rowBox: {
    width: "32%",
    height: 90,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
    backgroundColor: "#f8f8f8",
    borderColor: "#fff",
    borderWidth: 2,
    borderStyle: "solid",
  },
  row: {
    flexDirection: "row",
    display: "flex",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    marginTop: 0,
    marginBottom: 8,
  },
  lg: {
    fontSize: 24,
    marginBottom: 8,
    fontWeight: "bold",
    position: "relative",
    color: COLORS.primaryDark,
  },
});
