import { FlashList } from "@shopify/flash-list";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import {
  ImageBackground,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { COLORS, SIZES } from "../../styles/theme";
import {
  Mark,
  Mark2,
  NoDestinationFoundIcon,
} from "../../utilities/SvgIcons.utility";
import * as Haptics from "expo-haptics";

export const BucketlistModal = () => {
  return (
    <View style={[styles.rowItem, { flex: 1, flexGrow: 1 }]}>
      {/* <View style={styles.notFoundView}>
        <NoDestinationFoundIcon />
        <Text style={styles.notFoundViewText}>
          Your bucket list is empty, go to Explore page and add your next
          destination
        </Text>
      </View> */}

      <Text style={styles.titleItem}>Countries</Text>
      <View style={{ minHeight: 130 }}>
        <FlashList
          data={Array.from([0, 1, 2, 4])}
          numColumns={1}
          renderItem={({ item }) =>
            Platform.OS === "ios" ? (
              <TouchableOpacity
                activeOpacity={0.7}
                style={[
                  styles.thingsTodoItem,
                  {
                    width: 120,
                    height: 130,
                    flex: 1,
                    paddingHorizontal: 5,
                    marginBottom: 15,
                  },
                ]}
              >
                <Image
                  cachePolicy="memory"
                  contentFit="cover"
                  transition={0}
                  style={[
                    styles.box,
                    { width: "100%", marginBottom: 15, height: 130 },
                  ]}
                  resizeMode="cover"
                  source={{
                    uri: "https://cdn.pixabay.com/photo/2018/04/25/09/26/eiffel-tower-3349075_1280.jpg",
                  }}
                >
                  <TouchableOpacity
                    style={[
                      styles.addToBucketButton,
                      {
                        backgroundColor: true
                          ? COLORS.primary
                          : "rgba(0, 0, 0, 0.3)",
                      },
                    ]}
                    onPress={() =>
                      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
                    }
                    activeOpacity={0.7}
                  >
                    <Mark2 color="#fff" size="10" />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.gradientWrapper}
                    activeOpacity={0.7}
                  >
                    <LinearGradient
                      style={styles.gradientWrapper}
                      colors={["rgba(0,0,0,0.01)", "rgba(0,0,0,0.6)"]}
                    >
                      <View style={styles.labelItem}>
                        <Mark color="#fff" />
                        <Text numberOfLines={1} style={styles.labelItemText}>
                          Paris
                        </Text>
                      </View>
                    </LinearGradient>
                  </TouchableOpacity>
                </Image>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                activeOpacity={0.7}
                style={[
                  styles.thingsTodoItem,
                  {
                    width: 120,
                    height: 130,
                    flex: 1,
                    paddingHorizontal: 5,
                    marginBottom: 15,
                  },
                ]}
              >
                <ImageBackground
                   style={[
                    styles.box,
                    { width: "100%", marginBottom: 15, height: 130 },
                  ]}
                  resizeMode="cover"
                  source={{
                    uri: "https://cdn.pixabay.com/photo/2018/04/25/09/26/eiffel-tower-3349075_1280.jpg",
                  }}
                >
                  <TouchableOpacity
                    style={[
                      styles.addToBucketButton,
                      {
                        backgroundColor: true
                          ? COLORS.primary
                          : "rgba(0, 0, 0, 0.3)",
                      },
                    ]}
                    onPress={() =>
                      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
                    }
                    activeOpacity={0.7}
                  >
                    <Mark2 color="#fff" size="10" />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.gradientWrapper}
                    activeOpacity={0.7}
                  >
                    <LinearGradient
                      style={styles.gradientWrapper}
                      colors={["rgba(0,0,0,0.01)", "rgba(0,0,0,0.6)"]}
                    >
                      <View style={styles.labelItem}>
                        <Mark color="#fff" />
                        <Text numberOfLines={1} style={styles.labelItemText}>
                          Paris
                        </Text>
                      </View>
                    </LinearGradient>
                  </TouchableOpacity>
                </ImageBackground>
              </TouchableOpacity>
            )
          }
          estimatedItemSize={200}
          contentContainerStyle={{
            paddingHorizontal: 10,
          }}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>

      <Text style={[styles.titleItem, { marginTop: 15 }]}>Museums</Text>

      <View style={{ minHeight: 130 }}>
        <FlashList
          data={Array.from([0, 1, 2, 4])}
          numColumns={1}
          renderItem={({ item }) =>
            Platform.OS === "ios" ? (
              <TouchableOpacity
                activeOpacity={0.7}
                style={[
                  styles.thingsTodoItem,
                  {
                    width: 120,
                    height: 130,
                    flex: 1,
                    paddingHorizontal: 5,
                    marginBottom: 15,
                  },
                ]}
              >
                <Image
                  cachePolicy="memory"
                  contentFit="cover"
                  transition={0}
                  style={[
                    styles.box,
                    { width: "100%", marginBottom: 15, height: 130 },
                  ]}
                  resizeMode="cover"
                  source={{
                    uri: "https://cdn.pixabay.com/photo/2018/04/25/09/26/eiffel-tower-3349075_1280.jpg",
                  }}
                >
                  <TouchableOpacity
                    style={[
                      styles.addToBucketButton,
                      {
                        backgroundColor: true
                          ? COLORS.primary
                          : "rgba(0, 0, 0, 0.3)",
                      },
                    ]}
                    onPress={() =>
                      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
                    }
                    activeOpacity={0.7}
                  >
                    <Mark2 color="#fff" size="10" />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.gradientWrapper}
                    activeOpacity={0.7}
                  >
                    <LinearGradient
                      style={styles.gradientWrapper}
                      colors={["rgba(0,0,0,0.01)", "rgba(0,0,0,0.6)"]}
                    >
                      <View style={styles.labelItem}>
                        <Mark color="#fff" />
                        <Text numberOfLines={1} style={styles.labelItemText}>
                          Paris
                        </Text>
                      </View>
                    </LinearGradient>
                  </TouchableOpacity>
                </Image>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                activeOpacity={0.7}
                style={[
                  styles.thingsTodoItem,
                  {
                    width: 120,
                    height: 130,
                    flex: 1,
                    paddingHorizontal: 5,
                    marginBottom: 15,
                  },
                ]}
              >
                <ImageBackground
                   style={[
                    styles.box,
                    { width: "100%", marginBottom: 15, height: 130 },
                  ]}
                  resizeMode="cover"
                  source={{
                    uri: "https://cdn.pixabay.com/photo/2018/04/25/09/26/eiffel-tower-3349075_1280.jpg",
                  }}
                >
                  <TouchableOpacity
                    style={[
                      styles.addToBucketButton,
                      {
                        backgroundColor: true
                          ? COLORS.primary
                          : "rgba(0, 0, 0, 0.3)",
                      },
                    ]}
                    onPress={() =>
                      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
                    }
                    activeOpacity={0.7}
                  >
                    <Mark2 color="#fff" size="10" />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.gradientWrapper}
                    activeOpacity={0.7}
                  >
                    <LinearGradient
                      style={styles.gradientWrapper}
                      colors={["rgba(0,0,0,0.01)", "rgba(0,0,0,0.6)"]}
                    >
                      <View style={styles.labelItem}>
                        <Mark color="#fff" />
                        <Text numberOfLines={1} style={styles.labelItemText}>
                          Paris
                        </Text>
                      </View>
                    </LinearGradient>
                  </TouchableOpacity>
                </ImageBackground>
              </TouchableOpacity>
            )
          }
          estimatedItemSize={200}
          contentContainerStyle={{
            paddingHorizontal: 10,
          }}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>
      <Text style={[styles.titleItem, { marginTop: 15 }]}>Cities</Text>

      <View style={{ minHeight: 130 }}>
        <FlashList
          data={Array.from([0, 1, 2, 4])}
          numColumns={1}
         renderItem={({ item }) =>
            Platform.OS === "ios" ? (
              <TouchableOpacity
                activeOpacity={0.7}
                style={[
                  styles.thingsTodoItem,
                  {
                    width: 120,
                    height: 130,
                    flex: 1,
                    paddingHorizontal: 5,
                    marginBottom: 15,
                  },
                ]}
              >
                <Image
                  cachePolicy="memory"
                  contentFit="cover"
                  transition={0}
                  style={[
                    styles.box,
                    { width: "100%", marginBottom: 15, height: 130 },
                  ]}
                  resizeMode="cover"
                  source={{
                    uri: "https://cdn.pixabay.com/photo/2018/04/25/09/26/eiffel-tower-3349075_1280.jpg",
                  }}
                >
                  <TouchableOpacity
                    style={[
                      styles.addToBucketButton,
                      {
                        backgroundColor: true
                          ? COLORS.primary
                          : "rgba(0, 0, 0, 0.3)",
                      },
                    ]}
                    onPress={() =>
                      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
                    }
                    activeOpacity={0.7}
                  >
                    <Mark2 color="#fff" size="10" />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.gradientWrapper}
                    activeOpacity={0.7}
                  >
                    <LinearGradient
                      style={styles.gradientWrapper}
                      colors={["rgba(0,0,0,0.01)", "rgba(0,0,0,0.6)"]}
                    >
                      <View style={styles.labelItem}>
                        <Mark color="#fff" />
                        <Text numberOfLines={1} style={styles.labelItemText}>
                          Paris
                        </Text>
                      </View>
                    </LinearGradient>
                  </TouchableOpacity>
                </Image>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                activeOpacity={0.7}
                style={[
                  styles.thingsTodoItem,
                  {
                    width: 120,
                    height: 130,
                    flex: 1,
                    paddingHorizontal: 5,
                    marginBottom: 15,
                  },
                ]}
              >
                <ImageBackground
                   style={[
                    styles.box,
                    { width: "100%", marginBottom: 15, height: 130 },
                  ]}
                  resizeMode="cover"
                  source={{
                    uri: "https://cdn.pixabay.com/photo/2018/04/25/09/26/eiffel-tower-3349075_1280.jpg",
                  }}
                >
                  <TouchableOpacity
                    style={[
                      styles.addToBucketButton,
                      {
                        backgroundColor: true
                          ? COLORS.primary
                          : "rgba(0, 0, 0, 0.3)",
                      },
                    ]}
                    onPress={() =>
                      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
                    }
                    activeOpacity={0.7}
                  >
                    <Mark2 color="#fff" size="10" />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.gradientWrapper}
                    activeOpacity={0.7}
                  >
                    <LinearGradient
                      style={styles.gradientWrapper}
                      colors={["rgba(0,0,0,0.01)", "rgba(0,0,0,0.6)"]}
                    >
                      <View style={styles.labelItem}>
                        <Mark color="#fff" />
                        <Text numberOfLines={1} style={styles.labelItemText}>
                          Paris
                        </Text>
                      </View>
                    </LinearGradient>
                  </TouchableOpacity>
                </ImageBackground>
              </TouchableOpacity>
            )
          }
          estimatedItemSize={200}
          contentContainerStyle={{
            paddingHorizontal: 10,
          }}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  titleItem: {
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 20,
    fontWeight: "500",
    color: COLORS.black,
  },
  notFoundView: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 70,
  },
  notFoundViewText: {
    fontSize: 14,
    maxWidth: "80%",
    textAlign: "center",
    marginTop: 25,
    color: COLORS.darkgray,
    lineHeight: 20,
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
  searchButton: {
    width: 40,
    height: 40,
    backgroundColor: "#fff",
    borderRadius: 100,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    ...COLORS.shadow,
    marginLeft: 15,
  },
  bucketAmountWrapper: {
    position: "absolute",
    minWidth: 15,
    height: 15,
    borderRadius: 50,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 4,
    right: -18,
    top: -4,
  },
  bucketAmountText: {
    color: "#fff",
    fontSize: 10,
  },
  gradientWrapper: {
    flex: 1,
    justifyContent: "flex-end",
  },
  titleSm: {
    fontSize: 13,
    marginLeft: 2,
  },
  labelItemText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 5,
  },
  labelItem: {
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
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
    paddingBottom: 15,
  },
  passportBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 8,
    paddingVertical: 7,
    borderRadius: 6,
    ...COLORS.shadow,
    marginLeft: 25,
  },
  passportTexts: {
    marginLeft: 5,
  },
  passportLabel: {
    fontSize: 8,
    color: COLORS.gray,
    marginBottom: 1,
  },
  passportCountry: {
    fontSize: 10,
    color: "#000",
    fontWeight: "bold",
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
  addToBucketButton: {
    width: 25,
    height: 25,
    borderRadius: 50,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    right: 8,
    top: 8,
    zIndex: 3,
  },
  ratingTextXs: {
    fontSize: 10,
  },
  searchStyle: {
    width: "100%",
    height: 35,
    backgroundColor: "#eeeeee",
    paddingLeft: 10,
    borderRadius: 10,
    color: "#000",
  },
  selectCountryBox: {
    flexDirection: "row",
    alignItems: "center",
  },
  selectCountryText: {
    marginLeft: 8,
    color: "#fff",
    fontWeight: "bold",
    fontSize: 12,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  rowItem: {
    width: "100%",
    paddingTop: 15,
    backgroundColor: "#F2F2F7",
    paddingBottom: 25,
  },
  rowItemHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: SIZES.padding,
    paddingHorizontal: 15,
  },
  seeAllButtonTxt: {
    color: COLORS.darkgray,
    fontSize: SIZES.body4,
  },
  h2: {
    fontSize: 22,
    color: "#000",
    fontWeight: "bold",
  },
  contentBox: {
    marginTop: 5,
    paddingLeft: 15,
  },
  box: {
    width: 130,
    height: 130,
    backgroundColor: "#fafafa",
    borderRadius: 15,
    overflow: "hidden",
    marginRight: 10,
  },
  halfBox: {
    width: "49%",
    flex: 1,
  },
  typeMd: {
    width: 160,
    height: 180,
    borderRadius: 10,
    overflow: "hidden",
  },
});
