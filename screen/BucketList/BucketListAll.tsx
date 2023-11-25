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
import { BackIcon, Mark, StarIcon } from "../../utilities/SvgIcons.utility";

const BucketListAllScreen = () => {
  const navigation = useNavigation();

  const Country = ({ item }: any) => {
    return (
      <TouchableOpacity style={styles.countryItem} activeOpacity={0.7}>
        <ImageBackground
          style={styles.box}
          resizeMode="cover"
          source={{
            uri: "https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?q=10&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          }}
        >
          <TouchableOpacity style={styles.gradientWrapper} activeOpacity={0.7}>
            <LinearGradient
              style={styles.gradientWrapper}
              colors={["rgba(0,0,0,0.01)", "rgba(0,0,0,0.6)"]}
            >
              <View style={styles.labelItem}>
                <Mark color="#fff" />
                <Text style={[styles.labelItemText]}>{item.name}</Text>
              </View>
              <View style={styles.ratingLabel}>
                <View style={{ position: "relative", top: -1, opacity: 0.8 }}>
                  <StarIcon color="#FFBC3E" />
                </View>
                <Text style={[styles.ratingText]}>{item.rating} /</Text>
                <Text style={[styles.ratingText]}>
                  {item.visitors} visitors
                </Text>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        </ImageBackground>
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
          paddingTop: 20,
          paddingHorizontal: 10,
        }}
      >
        <FlashList
          data={CountriesList.slice(0, 15)}
          renderItem={({ item }) => <Country item={item} />}
          estimatedItemSize={200}
          horizontal={false}
          numColumns={2}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
};

export default BucketListAllScreen;
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
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
  },
  screenHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingBottom: 15,
  },
  headerTitle: {
    fontSize: 20,
    color: "#000",
    fontWeight: "bold",
  },
  countryItem: {
    paddingVertical: 5,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "33%",
    paddingHorizontal: 5,
    flex: 1,
  },
  box: {
    flex: 1,
    height: 130,
    backgroundColor: "#fafafa",
    borderRadius: 15,
    overflow: "hidden",
  },
  gradientWrapper: {
    flex: 1,
    justifyContent: "flex-end",
  },
  labelItem: {
    padding: 10,
    paddingVertical: 0,
    flexDirection: "row",
    alignItems: "center",
  },
  labelItemText: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
    marginLeft: 5,
  },
  ratingLabel: {
    flexDirection: "row",
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 30,
    alignItems: "center",
    paddingBottom: 10,
  },
  ratingText: {
    color: "#fff",
    marginLeft: 3,
    fontSize: 12,
    opacity: 0.7,
  },
});
