import { FlashList } from "@shopify/flash-list";
import {
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
  useWindowDimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { Modalize } from "react-native-modalize";
import { Portal } from "react-native-portalize";
import { COLORS, SIZES } from "../../styles/theme";
import Swiper from "react-native-swiper";

import { useEffect, useRef, useState } from "react";
import {
  BackIcon,
  CurrencyIcon,
  DiningIcon,
  DownIcon,
  EmergencyIcon,
  InfoIcon,
  LanguageIcon,
  PassportIcon,
  TopThingsIcon,
  TransportIcon,
} from "../../utilities/SvgIcons.utility";
import { SceneMap, TabBar, TabView } from "react-native-tab-view";

const Overview = () => {
  return (
    <>
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        <Text>Overview</Text>
      </ScrollView>
    </>
  );
};
const Visa = () => {
  return (
    <>
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        <Text>Visa</Text>
      </ScrollView>
    </>
  );
};
const Transport = () => {
  return (
    <>
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        <Text>Transport</Text>
      </ScrollView>
    </>
  );
};
const ThingsTodo = () => {
  return (
    <>
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        <Text>thingsTodo</Text>
      </ScrollView>
    </>
  );
};
const Dining = () => {
  return (
    <>
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        <Text>Dining</Text>
      </ScrollView>
    </>
  );
};
const Language = () => {
  return (
    <>
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        <Text>Easy language</Text>
      </ScrollView>
    </>
  );
};
const Currency = () => {
  return (
    <>
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        <Text>Currency</Text>
      </ScrollView>
    </>
  );
};
const Emergency = () => {
  return (
    <>
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        <Text>Emergency</Text>
      </ScrollView>
    </>
  );
};

const renderScene = SceneMap({
  overview: Overview,
  visa: Visa,
  transport: Transport,
  thingsTodo: ThingsTodo,
  dining: Dining,
  language: Language,
  currency: Currency,
  emergency: Emergency,
});

export const DestinationDetail = ({
  destinationDetailVisible,
  setDestinationDetailVisible,
}) => {
  const modalRef = useRef<Modalize>(null);
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);

  const [routes] = useState([
    { key: "overview", title: "Overview" },
    { key: "visa", title: "Visa" },
    { key: "transport", title: "Transport" },
    { key: "thingsTodo", title: "Things to do" },
    { key: "dining", title: "Dining" },
    { key: "language", title: "Easy language" },
    { key: "currency", title: "Currency" },
    { key: "emergency", title: "Emergency" },
  ]);
  const renderTabBar = (props) => (
    <TabBar
      scrollEnabled={true}
      {...props}
      indicatorStyle={{ backgroundColor: COLORS.primaryDark }}
      style={{ backgroundColor: "#fff", color: COLORS.gray }}
      tabStyle={{
        padding: 0,
        width: "auto",
        marginHorizontal: 20,
      }}
      renderLabel={({ route, focused, color }) => (
        <View
          style={{
            flex: 1,
            position: "relative",
            justifyContent: "center",
            alignItems: "center",
            paddingBottom: 15,
          }}
        >
          {route?.key === "overview" && (
            <InfoIcon color={focused ? COLORS.primaryDark : COLORS.gray} />
          )}
          {route?.key === "visa" && (
            <PassportIcon color={focused ? COLORS.primaryDark : COLORS.gray} />
          )}
          {route?.key === "transport" && (
            <TransportIcon color={focused ? COLORS.primaryDark : COLORS.gray} />
          )}
          {route?.key === "thingsTodo" && (
            <TopThingsIcon color={focused ? COLORS.primaryDark : COLORS.gray} />
          )}
          {route?.key === "dining" && (
            <DiningIcon color={focused ? COLORS.primaryDark : COLORS.gray} />
          )}
          {route?.key === "language" && (
            <LanguageIcon color={focused ? COLORS.primaryDark : COLORS.gray} />
          )}
          {route?.key === "currency" && (
            <CurrencyIcon color={focused ? COLORS.primaryDark : COLORS.gray} />
          )}
          {route?.key === "emergency" && (
            <EmergencyIcon color={focused ? COLORS.primaryDark : COLORS.gray} />
          )}
          <Text
            style={{
              color: focused ? COLORS.primaryDark : COLORS.gray,
              textAlign: "center",
              fontSize: 14,
              fontWeight: "bold",
              marginTop: 8,
            }}
          >
            {route.title}
          </Text>
        </View>
      )}
    />
  );

  useEffect(() => {
    if (destinationDetailVisible) {
      if (modalRef.current) modalRef.current.open();
    }
  }, [destinationDetailVisible]);

  return (
    <Portal>
      <Modalize
        ref={modalRef}
        modalTopOffset={0}
        onClose={() => setDestinationDetailVisible(false)}
        withHandle={false}
        modalStyle={{
          minHeight: "100%",
        }}
        HeaderComponent={
          <View style={styles.swiperWrapper}>
            <TouchableOpacity
              onPress={() => modalRef.current && modalRef.current.close()}
              activeOpacity={0.7}
              style={styles.backButton}
            >
              <DownIcon color="#fff" />
            </TouchableOpacity>
            <Swiper
              activeDotColor="#fff"
              style={styles.wrapper}
              showsButtons={false}
              loop={false}
              dotColor="#949494"
            >
              <View style={styles.slide1}>
                <ImageBackground
                  style={styles.box}
                  resizeMode="cover"
                  source={{
                    uri: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=10&w=3273&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3Ds",
                  }}
                >
                  <LinearGradient
                    style={styles.gradientWrapper}
                    colors={["rgba(0,0,0,0.01)", "rgba(0,0,0,0.4)"]}
                  ></LinearGradient>
                </ImageBackground>
              </View>
              <View style={styles.slide2}>
                <ImageBackground
                  style={styles.box}
                  resizeMode="cover"
                  source={{
                    uri: "https://images.unsplash.com/photo-1500039436846-25ae2f11882e?q=10&w=3432&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                  }}
                ></ImageBackground>
              </View>
              <View style={styles.slide3}>
                <ImageBackground
                  style={styles.box}
                  resizeMode="cover"
                  source={{
                    uri: "https://images.unsplash.com/photo-1507666664345-c49223375e33?q=10&w=3274&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                  }}
                ></ImageBackground>
              </View>
            </Swiper>
          </View>
        }
      >
        <ScrollView
          style={{
            flex: 1,
            paddingHorizontal: 15,
          }}
        >
          <TabView
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={{ width: layout.width }}
            style={{
              marginTop: 25,
            }}
            renderTabBar={renderTabBar}
          />
        </ScrollView>
      </Modalize>
    </Portal>
  );
};

const styles = StyleSheet.create({
  swiperWrapper: {
    height: 400,
  },
  box: {
    height: 400,
    borderTopEndRadius: 10,
    borderTopLeftRadius: 10,
    overflow: "hidden",
  },
  backButton: {
    width: 40,
    height: 40,
    backgroundColor: "rgba(0,0,0, 0.2)",
    borderRadius: 100,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    ...COLORS.shadow,
    position: "absolute",
    top: 55,
    left: 10,
    zIndex: 1,
  },
  gradientWrapper: {
    flex: 1,
    zIndex: 2,
    position: "absolute",
    top: 0,
    left: 0,
    height: 400,
    width: "100%",
  },
});
