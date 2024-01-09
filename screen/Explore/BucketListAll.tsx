import { useNavigation } from "@react-navigation/native";
import { FlashList } from "@shopify/flash-list";
import { LinearGradient } from "expo-linear-gradient";
import {
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { COLORS } from "../../styles/theme";
import { CountriesList } from "../../utilities/countryList";
import {
  BackIcon,
  Mark,
  Mark2,
  StarIcon,
} from "../../utilities/SvgIcons.utility";

const SeeAllScreen = () => {
  const navigation = useNavigation();

  const Country = ({ item }: any, ind) => {
    return (
      <TouchableOpacity style={styles.countryItem} activeOpacity={0.7}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <ImageBackground
            style={styles.box}
            resizeMode="cover"
            source={{
              uri: "https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?q=10&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            }}
          ></ImageBackground>
          <TouchableOpacity style={styles.gradientWrapper} activeOpacity={0.7}>
            <View style={styles.labelItem}>
              <Text style={[styles.labelItemText]}>{item.name}</Text>
            </View>
            <View style={styles.ratingLabel}>
              <View style={{ position: "relative", top: -1, opacity: 0.8 }}>
                <StarIcon color="#FFBC3E" />
              </View>
              <Text style={[styles.ratingText, styles.ratingTextXs]}>
                4.5 /
              </Text>
              <Text style={[styles.ratingText, styles.ratingTextXs]}>
                33k visitors
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={[
            styles.addToBucketButton,
            {
              backgroundColor: ind == 0 ? COLORS.primary : "rgba(0, 0, 0, 0.3)",
            },
          ]}
          activeOpacity={0.7}
        >
          <Mark2 color="#fff" />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.screenHeader}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
          style={styles.backButton}
        >
          <BackIcon />
        </TouchableOpacity>
        <View style={styles.right}>
          <Text style={styles.headerTitle}>Popular</Text>
        </View>
      </View>
      <View
        style={{
          flex: 1,
          backgroundColor: "#f8f8f8",
          paddingTop: 0,
          paddingHorizontal: 10,
        }}
      >
        <FlashList
          data={CountriesList.slice(0, 15)}
          renderItem={({ item }) => <Country item={item} />}
          estimatedItemSize={200}
          horizontal={false}
          numColumns={1}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 25 }}
        />
      </View>
    </SafeAreaView>
  );
};

export default SeeAllScreen;
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  addToBucketButton: {
    width: 30,
    height: 30,
    borderRadius: 50,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    right: 5,
    top: 28,
    zIndex: 3,
  },
  backButton: {
    width: 40,
    height: 40,
    backgroundColor: "#fff",
    borderRadius: 100,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    ...COLORS.shadow,
    position: "absolute",
    left: 10,
    top: 5,
  },
  screenHeader: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 15,
    paddingBottom: 20,
    position: "relative",
  },
  headerTitle: {
    fontSize: 20,
    color: "#000",
    fontWeight: "bold",
  },
  labelItemText: {
    color: "#000",
    fontSize: 16,
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
    height: 80,
    backgroundColor: "#fafafa",
    borderRadius: 15,
    overflow: "hidden",
    width: 80,
  },
  countryItem: {
    marginTop: 15,
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
