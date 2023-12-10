import React, { useRef, useState } from "react";
import { COLORS, SIZES } from "../../styles/theme";

import {
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import {
  BackIcon,
  LocationCircle,
  Mark,
  Mark2,
  NoDestinationFoundIcon,
  PassportIcon,
  SearchIcon,
  StarIcon,
} from "../../utilities/SvgIcons.utility";
import { LinearGradient } from "expo-linear-gradient";
import { SceneMap, TabBar, TabView } from "react-native-tab-view";
import { CountrySelect } from "../../common/components/CountrySelect";
import { CountrySearch } from "../../common/components/CountrySearch";
import { DestinationDetail } from "../../common/components/DestinationDetail";
import { Portal } from "react-native-portalize";
import { Modalize } from "react-native-modalize";

const Popular = [
  {
    id: 0,
    image:
      "https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?q=10&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "France",
    rating: 4.9,
    visitors: "80m",
  },
  {
    id: 0,
    image:
      "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?q=10&w=3383&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Italy",
    rating: 4.5,
    visitors: "75m",
  },
  {
    id: 0,
    image:
      "https://images.unsplash.com/photo-1494949360228-4e9bde560065?q=10&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Thailand",
    rating: 4.2,
    visitors: "25m",
  },
];

const Explore = () => {
  const navigation = useNavigation();
  const modalDestinationDetailsRef = useRef<Modalize>(null);
  const onDestinationModaltOpen = () => {
    modalDestinationDetailsRef.current?.open();
  };

  return (
    <>
      <ScrollView
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 25 }}
      >
        <View style={[styles.rowItem]}>
          <View style={styles.rowItemHeader}>
            <Text style={styles.h2}>Popular</Text>

            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.seeAllButton}
              onPress={() => navigation.navigate("BucketListAll")}
            >
              <Text style={styles.seeAllButtonTxt}>See all</Text>
            </TouchableOpacity>
          </View>
          <ScrollView
            horizontal
            style={styles.contentBox}
            showsHorizontalScrollIndicator={false}
          >
            {Popular?.map((item, ind) => (
              <>
                <ImageBackground
                  style={[styles.box, styles.typeMd]}
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
                        backgroundColor:
                          ind == 0 ? COLORS.primary : "rgba(0, 0, 0, 0.3)",
                      },
                    ]}
                    activeOpacity={0.7}
                  >
                    <Mark2 color="#fff" />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.gradientWrapper}
                    activeOpacity={0.7}
                    onPress={() => onDestinationModaltOpen()}
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
                          style={{
                            position: "relative",
                            top: -1,
                            opacity: 0.8,
                          }}
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
                {Popular.length === ind + 1 && (
                  <View style={{ width: 20 }}></View>
                )}
              </>
            ))}
          </ScrollView>
        </View>
        <View style={[styles.rowItem]}>
          <View style={styles.rowItemHeader}>
            <Text style={styles.h2}>Visa free for you</Text>

            <TouchableOpacity activeOpacity={0.7} style={styles.seeAllButton}>
              <Text style={styles.seeAllButtonTxt}>See all</Text>
            </TouchableOpacity>
          </View>

          <ScrollView
            horizontal
            style={styles.contentBox}
            showsHorizontalScrollIndicator={false}
          >
            {Popular?.map((item, ind) => (
              <>
                <ImageBackground
                  style={styles.box}
                  resizeMode="cover"
                  source={{
                    uri: item.image,
                  }}
                  key={ind}
                >
                  <TouchableOpacity
                    style={styles.gradientWrapper}
                    activeOpacity={0.7}
                  >
                    <LinearGradient
                      style={styles.gradientWrapper}
                      colors={["rgba(0,0,0,0.01)", "rgba(0,0,0,0.6)"]}
                    >
                      <View style={styles.labelItem}>
                        <Mark color="#fff" size="sm" />
                        <Text style={[styles.labelItemText, styles.titleSm]}>
                          {item.title}
                        </Text>
                      </View>
                      <View style={styles.ratingLabel}>
                        <View
                          style={{
                            position: "relative",
                            top: -1,
                            opacity: 0.8,
                          }}
                        >
                          <StarIcon color="#FFBC3E" />
                        </View>
                        <Text style={[styles.ratingText, styles.ratingTextXs]}>
                          {item.rating} /
                        </Text>
                        <Text style={[styles.ratingText, styles.ratingTextXs]}>
                          {item.visitors} visitors
                        </Text>
                      </View>
                    </LinearGradient>
                  </TouchableOpacity>
                </ImageBackground>
                {Popular.length === ind + 1 && (
                  <View style={{ width: 20 }}></View>
                )}
              </>
            ))}
          </ScrollView>
        </View>
        <View style={[styles.rowItem]}>
          <View style={styles.rowItemHeader}>
            <Text style={styles.h2}>Luxury</Text>

            <TouchableOpacity activeOpacity={0.7} style={styles.seeAllButton}>
              <Text style={styles.seeAllButtonTxt}>See all</Text>
            </TouchableOpacity>
          </View>

          <ScrollView
            horizontal
            style={styles.contentBox}
            showsHorizontalScrollIndicator={false}
          >
            {Popular?.map((item, ind) => (
              <>
                <ImageBackground
                  style={styles.box}
                  resizeMode="cover"
                  source={{
                    uri: item.image,
                  }}
                  key={ind}
                >
                  <TouchableOpacity
                    style={styles.gradientWrapper}
                    activeOpacity={0.7}
                  >
                    <LinearGradient
                      style={styles.gradientWrapper}
                      colors={["rgba(0,0,0,0.01)", "rgba(0,0,0,0.6)"]}
                    >
                      <View style={styles.labelItem}>
                        <Mark color="#fff" size="sm" />
                        <Text style={[styles.labelItemText, styles.titleSm]}>
                          {item.title}
                        </Text>
                      </View>
                      <View style={styles.ratingLabel}>
                        <View
                          style={{
                            position: "relative",
                            top: -1,
                            opacity: 0.8,
                          }}
                        >
                          <StarIcon color="#FFBC3E" />
                        </View>
                        <Text style={[styles.ratingText, styles.ratingTextXs]}>
                          {item.rating} /
                        </Text>
                        <Text style={[styles.ratingText, styles.ratingTextXs]}>
                          {item.visitors} visitors
                        </Text>
                      </View>
                    </LinearGradient>
                  </TouchableOpacity>
                </ImageBackground>
                {Popular.length === ind + 1 && (
                  <View style={{ width: 20 }}></View>
                )}
              </>
            ))}
          </ScrollView>
        </View>
        <View style={[styles.rowItem]}>
          <View style={styles.rowItemHeader}>
            <Text style={styles.h2}>Budget friendly</Text>

            <TouchableOpacity activeOpacity={0.7} style={styles.seeAllButton}>
              <Text style={styles.seeAllButtonTxt}>See all</Text>
            </TouchableOpacity>
          </View>

          <ScrollView
            horizontal
            style={styles.contentBox}
            showsHorizontalScrollIndicator={false}
          >
            {Popular?.map((item, ind) => (
              <>
                <ImageBackground
                  style={styles.box}
                  resizeMode="cover"
                  source={{
                    uri: item.image,
                  }}
                  key={ind}
                >
                  <TouchableOpacity
                    style={styles.gradientWrapper}
                    activeOpacity={0.7}
                  >
                    <LinearGradient
                      style={styles.gradientWrapper}
                      colors={["rgba(0,0,0,0.01)", "rgba(0,0,0,0.6)"]}
                    >
                      <View style={styles.labelItem}>
                        <Mark color="#fff" size="sm" />
                        <Text style={[styles.labelItemText, styles.titleSm]}>
                          {item.title}
                        </Text>
                      </View>
                      <View style={styles.ratingLabel}>
                        <View
                          style={{
                            position: "relative",
                            top: -1,
                            opacity: 0.8,
                          }}
                        >
                          <StarIcon color="#FFBC3E" />
                        </View>
                        <Text style={[styles.ratingText, styles.ratingTextXs]}>
                          {item.rating} /
                        </Text>
                        <Text style={[styles.ratingText, styles.ratingTextXs]}>
                          {item.visitors} visitors
                        </Text>
                      </View>
                    </LinearGradient>
                  </TouchableOpacity>
                </ImageBackground>
                {Popular.length === ind + 1 && (
                  <View style={{ width: 20 }}></View>
                )}
              </>
            ))}
          </ScrollView>
        </View>
        <View style={[styles.rowItem]}>
          <View style={styles.rowItemHeader}>
            <Text style={styles.h2}>For family</Text>

            <TouchableOpacity activeOpacity={0.7} style={styles.seeAllButton}>
              <Text style={styles.seeAllButtonTxt}>See all</Text>
            </TouchableOpacity>
          </View>

          <ScrollView
            horizontal
            style={styles.contentBox}
            showsHorizontalScrollIndicator={false}
          >
            {Popular?.map((item, ind) => (
              <>
                <ImageBackground
                  style={styles.box}
                  resizeMode="cover"
                  source={{
                    uri: item.image,
                  }}
                  key={ind}
                >
                  <TouchableOpacity
                    style={styles.gradientWrapper}
                    activeOpacity={0.7}
                  >
                    <LinearGradient
                      style={styles.gradientWrapper}
                      colors={["rgba(0,0,0,0.01)", "rgba(0,0,0,0.6)"]}
                    >
                      <View style={styles.labelItem}>
                        <Mark color="#fff" size="sm" />
                        <Text style={[styles.labelItemText, styles.titleSm]}>
                          {item.title}
                        </Text>
                      </View>
                      <View style={styles.ratingLabel}>
                        <View
                          style={{
                            position: "relative",
                            top: -1,
                            opacity: 0.8,
                          }}
                        >
                          <StarIcon color="#FFBC3E" />
                        </View>
                        <Text style={[styles.ratingText, styles.ratingTextXs]}>
                          {item.rating} /
                        </Text>
                        <Text style={[styles.ratingText, styles.ratingTextXs]}>
                          {item.visitors} visitors
                        </Text>
                      </View>
                    </LinearGradient>
                  </TouchableOpacity>
                </ImageBackground>
                {Popular.length === ind + 1 && (
                  <View style={{ width: 20 }}></View>
                )}
              </>
            ))}
          </ScrollView>
        </View>
        <View style={[styles.rowItem]}>
          <View style={styles.rowItemHeader}>
            <Text style={styles.h2}>For couples</Text>

            <TouchableOpacity activeOpacity={0.7} style={styles.seeAllButton}>
              <Text style={styles.seeAllButtonTxt}>See all</Text>
            </TouchableOpacity>
          </View>

          <ScrollView
            horizontal
            style={styles.contentBox}
            showsHorizontalScrollIndicator={false}
          >
            {Popular?.map((item, ind) => (
              <>
                <ImageBackground
                  style={styles.box}
                  resizeMode="cover"
                  source={{
                    uri: item.image,
                  }}
                  key={ind}
                >
                  <TouchableOpacity
                    style={styles.gradientWrapper}
                    activeOpacity={0.7}
                  >
                    <LinearGradient
                      style={styles.gradientWrapper}
                      colors={["rgba(0,0,0,0.01)", "rgba(0,0,0,0.6)"]}
                    >
                      <View style={styles.labelItem}>
                        <Mark color="#fff" size="sm" />
                        <Text style={[styles.labelItemText, styles.titleSm]}>
                          {item.title}
                        </Text>
                      </View>
                      <View style={styles.ratingLabel}>
                        <View
                          style={{
                            position: "relative",
                            top: -1,
                            opacity: 0.8,
                          }}
                        >
                          <StarIcon color="#FFBC3E" />
                        </View>
                        <Text style={[styles.ratingText, styles.ratingTextXs]}>
                          {item.rating} /
                        </Text>
                        <Text style={[styles.ratingText, styles.ratingTextXs]}>
                          {item.visitors} visitors
                        </Text>
                      </View>
                    </LinearGradient>
                  </TouchableOpacity>
                </ImageBackground>
                {Popular.length === ind + 1 && (
                  <View style={{ width: 20 }}></View>
                )}
              </>
            ))}
          </ScrollView>
        </View>
        <View style={[styles.rowItem]}>
          <View style={styles.rowItemHeader}>
            <Text style={styles.h2}>Best islands</Text>

            <TouchableOpacity activeOpacity={0.7} style={styles.seeAllButton}>
              <Text style={styles.seeAllButtonTxt}>See all</Text>
            </TouchableOpacity>
          </View>

          <ScrollView
            horizontal
            style={styles.contentBox}
            showsHorizontalScrollIndicator={false}
          >
            {Popular?.map((item, ind) => (
              <>
                <ImageBackground
                  style={styles.box}
                  resizeMode="cover"
                  source={{
                    uri: item.image,
                  }}
                  key={ind}
                >
                  <TouchableOpacity
                    style={styles.gradientWrapper}
                    activeOpacity={0.7}
                  >
                    <LinearGradient
                      style={styles.gradientWrapper}
                      colors={["rgba(0,0,0,0.01)", "rgba(0,0,0,0.6)"]}
                    >
                      <View style={styles.labelItem}>
                        <Mark color="#fff" size="sm" />
                        <Text style={[styles.labelItemText, styles.titleSm]}>
                          {item.title}
                        </Text>
                      </View>
                      <View style={styles.ratingLabel}>
                        <View
                          style={{
                            position: "relative",
                            top: -1,
                            opacity: 0.8,
                          }}
                        >
                          <StarIcon color="#FFBC3E" />
                        </View>
                        <Text style={[styles.ratingText, styles.ratingTextXs]}>
                          {item.rating} /
                        </Text>
                        <Text style={[styles.ratingText, styles.ratingTextXs]}>
                          {item.visitors} visitors
                        </Text>
                      </View>
                    </LinearGradient>
                  </TouchableOpacity>
                </ImageBackground>
                {Popular.length === ind + 1 && (
                  <View style={{ width: 20 }}></View>
                )}
              </>
            ))}
          </ScrollView>
        </View>
        <View style={[styles.rowItem]}>
          <View style={styles.rowItemHeader}>
            <Text style={styles.h2}>Best beaches</Text>

            <TouchableOpacity activeOpacity={0.7} style={styles.seeAllButton}>
              <Text style={styles.seeAllButtonTxt}>See all</Text>
            </TouchableOpacity>
          </View>

          <ScrollView
            horizontal
            style={styles.contentBox}
            showsHorizontalScrollIndicator={false}
          >
            {Popular?.map((item, ind) => (
              <>
                <ImageBackground
                  style={styles.box}
                  resizeMode="cover"
                  source={{
                    uri: item.image,
                  }}
                  key={ind}
                >
                  <TouchableOpacity
                    style={styles.gradientWrapper}
                    activeOpacity={0.7}
                  >
                    <LinearGradient
                      style={styles.gradientWrapper}
                      colors={["rgba(0,0,0,0.01)", "rgba(0,0,0,0.6)"]}
                    >
                      <View style={styles.labelItem}>
                        <Mark color="#fff" size="sm" />
                        <Text style={[styles.labelItemText, styles.titleSm]}>
                          {item.title}
                        </Text>
                      </View>
                      <View style={styles.ratingLabel}>
                        <View
                          style={{
                            position: "relative",
                            top: -1,
                            opacity: 0.8,
                          }}
                        >
                          <StarIcon color="#FFBC3E" />
                        </View>
                        <Text style={[styles.ratingText, styles.ratingTextXs]}>
                          {item.rating} /
                        </Text>
                        <Text style={[styles.ratingText, styles.ratingTextXs]}>
                          {item.visitors} visitors
                        </Text>
                      </View>
                    </LinearGradient>
                  </TouchableOpacity>
                </ImageBackground>
                {Popular.length === ind + 1 && (
                  <View style={{ width: 20 }}></View>
                )}
              </>
            ))}
          </ScrollView>
        </View>
      </ScrollView>

      <Portal>
        <Modalize
          ref={modalDestinationDetailsRef}
          modalTopOffset={0}
          withHandle={false}
          disableScrollIfPossible
          modalStyle={{
            minHeight: "100%",
          }}
          scrollViewProps={{
            alwaysBounceVertical: false,
          }}
        >
          <DestinationDetail
            modalDestinationDetailsRef={modalDestinationDetailsRef}
          />
        </Modalize>
      </Portal>
    </>
  );
};

const Bucketlists = () => (
  <ScrollView
    style={{ flex: 1, backgroundColor: "#f8f8f8" }}
    showsVerticalScrollIndicator={false}
  >
    <View style={[styles.rowItem, { flex: 1 }]}>
      <View style={styles.rowItemHeader}>
        <Text style={styles.h2}>My destinations</Text>
      </View>
      <ScrollView
        style={[styles.contentBox, { paddingHorizontal: 15, flex: 1 }]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.notFoundView}>
          <NoDestinationFoundIcon />
          <Text style={styles.notFoundViewText}>
            Your bucket list is empty, go to Explore tab and add your next
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
      </ScrollView>
    </View>
  </ScrollView>
);

const renderScene = SceneMap({
  explore: Explore,
  bucketlists: Bucketlists,
});

const BucketList = () => {
  const navigation = useNavigation();
  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);

  const modalDestinationSearchRef = useRef<Modalize>(null);
  const modalCountryPassportSelectRef = useRef<Modalize>(null);

  const onDestinationSearchOpen = () => {
    modalDestinationSearchRef.current?.open();
  };
  const onCountryPassportOpen = () => {
    modalCountryPassportSelectRef.current?.open();
  };

  const [routes] = React.useState([
    { key: "explore", title: "Explore" },
    { key: "bucketlists", title: "Bucketlist" },
  ]);
  const renderTabBar = (props) => (
    <TabBar
      // scrollEnabled={true}
      {...props}
      indicatorStyle={{ backgroundColor: COLORS.primaryDark }}
      style={{ backgroundColor: "#fff", color: COLORS.gray }}
      renderLabel={({ route, focused, color }) => (
        <View style={{ flex: 1, position: "relative" }}>
          <Text
            style={{
              color: focused ? COLORS.primaryDark : COLORS.gray,
              textAlign: "center",
              fontSize: 14,
              fontWeight: "bold",
            }}
          >
            {route.title}
          </Text>
          {route?.key === "bucketlists" ? (
            <View style={[styles.bucketAmountWrapper]}>
              <Text style={[styles.bucketAmountText]}>5</Text>
            </View>
          ) : null}
        </View>
      )}
    />
  );

  return (
    <>
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
            <TouchableOpacity
              style={styles.passportBox}
              activeOpacity={0.7}
              onPress={() => onCountryPassportOpen()}
            >
              <PassportIcon />
              <View style={styles.passportTexts}>
                <Text style={styles.passportLabel}>Passport</Text>
                <Text style={styles.passportCountry}>Georgia</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.searchButton}
              activeOpacity={0.7}
              onPress={() => onDestinationSearchOpen()}
            >
              <SearchIcon />
            </TouchableOpacity>
          </View>
        </View>
        <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={{ width: layout.width }}
          style={{
            marginTop: 0,
          }}
          renderTabBar={renderTabBar}
        />
      </SafeAreaView>

      <Portal>
        <Modalize
          ref={modalDestinationSearchRef}
          adjustToContentHeight
          modalTopOffset={0}
          withHandle={false}
          modalStyle={{
            minHeight: "100%",
            paddingTop: 55,
          }}
        >
          <CountrySearch
            modalDestinationSearchRef={modalDestinationSearchRef}
          />
        </Modalize>
      </Portal>

      <Portal>
        <Modalize ref={modalCountryPassportSelectRef} modalTopOffset={65}>
          <CountrySelect />
        </Modalize>
      </Portal>
    </>
  );
};
export default BucketList;

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
    fontSize: 16,
    maxWidth: "80%",
    textAlign: "center",
    marginTop: 25,
    color: COLORS.darkgray,
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
