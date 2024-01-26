import { ScrollView, StyleSheet, Text, View } from "react-native";
import { COLORS, SIZES } from "../../styles/theme";
import { NoDestinationFoundIcon } from "../../utilities/SvgIcons.utility";

export const BucketlistModal = () => {
  return (
    <View style={[styles.rowItem, { flex: 1, flexGrow: 1 }]}>
      <View style={styles.notFoundView}>
        <NoDestinationFoundIcon />
        <Text style={styles.notFoundViewText}>
          Your bucket list is empty, go to Explore page and add your next
          destination
        </Text>
      </View>
      {/* {Popular?.map((item, ind) => (
          <>
            <ImageBackground
              style={[
                styles.box,
                { width: "100%", marginBottom: 15, height: 150 },
              ]}
              resizeMode="cover"
              source={{
                uri: item.image,
              }}
              key={ind}
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
                activeOpacity={0.7}
              >
                <Mark2 color="#fff" />
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
                    <Text style={styles.labelItemText}>{item.title}</Text>
                  </View>
                  <View style={styles.ratingLabel}>
                    <View
                      style={{ position: "relative", top: -1, opacity: 0.8 }}
                    >
                      <StarIcon color="#FFBC3E" />
                    </View>
                    <Text style={styles.ratingText}>{item.rating} /</Text>
                    <Text style={styles.ratingText}>
                      {item.visitors} visitors
                    </Text>
                  </View>
                </LinearGradient>
              </TouchableOpacity>
            </ImageBackground>
          </>
        ))} */}
    </View>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
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
    fontSize: 22,
    fontWeight: "bold",
    marginLeft: 5,
  },
  labelItem: {
    padding: 10,
    paddingVertical: 0,
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
    width: 30,
    height: 30,
    borderRadius: 50,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    right: 10,
    top: 10,
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
    paddingTop: 25,
    backgroundColor: "#F2F2F7",
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
