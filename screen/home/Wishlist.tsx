import { FlashList } from "@shopify/flash-list";
import { useEffect, useRef, useState } from "react";
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Modalize } from "react-native-modalize";
import { Portal } from "react-native-portalize";
import { COLORS, SIZES } from "../../styles/theme";
import {
  CheckIcon,
  DotsIcon,
  PlusIcon,
} from "../../utilities/SvgIcons.utility";

export const Wishlist = ({ wishlistVisible, setWishlistVisible }) => {
  const [wishlist, setWishlist] = useState([]);

  const modalRef = useRef<Modalize>(null);

  useEffect(() => {
    if (wishlistVisible && modalRef.current) modalRef.current.open();
  }, [wishlistVisible]);

  const ListItem = ({ item }: any) => {
    return (
      <View style={styles.listItem}>
        <TouchableOpacity style={styles.listItemLeft}>
          <View style={styles.listItemCheck}>{/* <CheckIcon /> */}</View>
          <View style={styles.listLabel}>
            <Text style={styles.listItemText}>{item?.name}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.dotsButton}>
          <DotsIcon />
        </TouchableOpacity>
      </View>
    );
  };

  const addItem = (item) => {
    setWishlist((prevState) => [...prevState, { name: item }]);
  };

  return (
    <Portal>
      <Modalize
        ref={modalRef}
        modalTopOffset={65}
        onClose={setWishlistVisible(false)}
        HeaderComponent={
          <View style={styles.modalHeader}>
            <Text style={styles.title}>Wishlist</Text>
            {wishlist?.length ? (
              <TouchableOpacity
                onPress={() =>
                  Alert.prompt(
                    "Enter title",
                    "Enter anything what you want to do in the future",
                    [
                      {
                        text: "Cancel",
                        onPress: () => console.log("Cancel Pressed"),
                        style: "cancel",
                      },
                      {
                        text: "OK",
                        onPress: (text) => addItem(text),
                      },
                    ],
                    "plain-text"
                  )
                }
                style={styles.plusButton}
              >
                <PlusIcon />
              </TouchableOpacity>
            ) : null}
          </View>
        }
        FooterComponent={<View style={styles.footer}></View>}
      >
        <View
          style={{
            flex: 1,
            height: SIZES.height - 200,
            marginTop: 15,
            paddingHorizontal: 15,
          }}
        >
          {wishlist?.length ? (
            <FlashList
              data={wishlist}
              renderItem={({ item }) => <ListItem item={item} />}
              estimatedItemSize={10}
            />
          ) : (
            <View style={styles.emptyWishlistWrapper}>
              <View style={styles.wishlistGetStarted}>
                <Image
                  width={100}
                  height={100}
                  source={{
                    url: "https://cdn-icons-png.flaticon.com/512/1950/1950589.png",
                  }}
                />
                <Text style={styles.wishlistGetStartedText}>
                  Your wishlist is empty. Add your favorite items to get
                  started!
                </Text>
                <TouchableOpacity
                  style={styles.addButton}
                  activeOpacity={0.7}
                  onPress={() =>
                    Alert.prompt(
                      "Enter title",
                      "Enter anything what you want to do in the future",
                      [
                        {
                          text: "Cancel",
                          onPress: () => console.log("Cancel Pressed"),
                          style: "cancel",
                        },
                        {
                          text: "OK",
                          onPress: (text) => addItem(text),
                        },
                      ],
                      "plain-text"
                    )
                  }
                >
                  <Text style={styles.addButtonText}>Add item</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>
      </Modalize>
    </Portal>
  );
};

const styles = StyleSheet.create({
  modalHeader: {
    width: "100%",
    paddingHorizontal: 15,
    paddingTop: 25,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  listItem: {
    height: 40,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
  },
  listItemLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  listItemCheck: {
    width: 25,
    height: 25,
    borderWidth: 1,
    borderColor: COLORS.gray,
    borderRadius: 50,
  },
  listItemText: {
    color: COLORS.black,
    fontSize: SIZES.body3,
    fontWeight: "bold",
  },
  listLabel: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray,
    flex: 1,
    marginLeft: 10,
    paddingBottom: 8,
  },
  dotsButton: {
    paddingLeft: 15,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray,
    paddingBottom: 3,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingBottom: 35,
    paddingHorizontal: 15,
  },
  plusButton: {
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.primary,
    borderRadius: 50,
    marginTop: -3,
  },
  emptyWishlistWrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  wishlistGetStarted: {
    alignItems: "center",
    justifyContent: "center",
    maxWidth: 300,
    width: "100%",
  },
  wishlistGetStartedText: {
    fontSize: SIZES.body2,
    textAlign: "center",
    marginTop: SIZES.padding * 2,
    color: COLORS.black,
  },
  addButton: {
    backgroundColor: COLORS.primaryDark,
    height: 50,
    width: "100%",
    marginTop: 30,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  addButtonText: {
    color: "#fff",
    fontSize: SIZES.body3,
  },
});
