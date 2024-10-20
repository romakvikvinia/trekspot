import React, { useEffect, useRef } from "react";
import {
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import { Modalize } from "react-native-modalize";
// import { Portal } from "react-native-portalize";
import { COLORS, SIZES } from "../../../styles/theme";
import Swiper from "react-native-swiper";
import { styles } from "../../../common/components/_styles";
import { MaterialTabBar, Tabs } from "react-native-collapsible-tab-view";

import {
  BackIcon,
  BinocularsIcon,
  DiningIcon,
  EmergencyIcon,
  InfoIcon,
  InsightsFilled,
  PassportIcon,
  StarIcon,
  TransportIcon,
} from "../../../utilities/SvgIcons.utility";
// import { CountrySelect } from "../../../common/components/CountrySelect";
import { ForYou } from "../../../common/components/Destination/ForYou";
import Overview from "../../../common/components/Destination/Overview";
import { Visa } from "../../../common/components/Destination/Visa";
import { Transport } from "../../../common/components/Destination/Transport";

import { Dining } from "../../../common/components/Destination/Dining";

// import { Language } from "../../../common/components/Destination/Language";

import { Emergency } from "../../../common/components/Destination/Emergency";
import { useLazyCountryQuery } from "../../../api/api.trekspot";

import { TripInsightTab } from "../../../common/components/Destination/TripInsightTab";
// import { Loader } from "../../../common/ui/Loader";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ExploreRoutesStackParamList } from "../../../routes/explore/ExploreRoutes";
import { Loader } from "../../../common/ui/Loader";

type CountryDetailScreenProps = NativeStackScreenProps<
  ExploreRoutesStackParamList,
  "CountryDetailScreen"
>;

export const CountryDetailScreen: React.FC<CountryDetailScreenProps> = ({
  route,
  navigation,
}) => {
  const { countryId } = route.params;
  console.log("countryId",countryId)

  const [getCountry, { isLoading, data, isError }] = useLazyCountryQuery();
  const modalCountryPassportSelectRef = useRef<Modalize>(null);

  useEffect(() => {
    if (countryId) getCountry({ id: countryId });
  }, [route]);

  useEffect(() => {
    navigation.getParent()?.setOptions({
      tabBarStyle: {
        display: "none",
      },
    });
    return () => {
      navigation.getParent()?.setOptions({
        tabBarStyle: {
          display: "flex",
        },
      });
    };
  }, []);

  return (
    <>
      <View
        style={{
          flex: 1,
          minHeight: "100%",
        }}
      >
        <Tabs.Container
          minHeaderHeight={120}
          renderHeader={() => (
            <View style={[styles.swiperWrapper]}>
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                activeOpacity={0.7}
                style={styles.backButton}
              >
                <BackIcon color="#000" />
              </TouchableOpacity>

              {isLoading && (
                <View style={{ minHeight: SIZES.height }}>
                  <View
                    style={{
                      backgroundColor: "#eee",
                      width: "100%",
                      height: 300,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <View style={{ width: 35, height: 35 }}>
                      <Loader isLoading={isLoading} background="#eee" />
                    </View>
                  </View>
                </View>
              )}
           
              <Swiper
                activeDotColor="#fff"
                showsButtons={false}
                loop={false}
                dotColor="#949494"
                automaticallyAdjustContentInsets
                paginationStyle={{
                  position: "absolute",
                  justifyContent: "flex-end",
                  paddingRight: 15,
                  bottom: 16,
                }}
              >
                {!isLoading && !!data?.country.images.length
                  ? data?.country?.images?.map((item, ind) => (
                      <ImageBackground
                        style={styles.box}
                        resizeMode="cover"
                        source={{
                          uri: item.url,
                        }}
                        key={`slide-${ind}`}
                      >
                        <LinearGradient
                          style={styles.gradientWrapper}
                          colors={["rgba(0,0,0,0.01)", "rgba(0,0,0,0.5)"]}
                        ></LinearGradient>
                      </ImageBackground>
                    ))
                  : !isLoading && (
                      <ImageBackground
                        style={styles.box}
                        resizeMode="cover"
                        source={require("../../../assets/no-image.png")}
                      >
                        <LinearGradient
                          style={styles.gradientWrapper}
                          colors={["rgba(0,0,0,0.01)", "rgba(0,0,0,0.5)"]}
                        ></LinearGradient>
                      </ImageBackground>
                    )}
              </Swiper>

              <View style={styles.otherInfo}>
                {data?.country.name && (
                  <View style={styles.labelItem}>
                    <Text style={styles.labelItemText}>
                      {data?.country.name}
                    </Text>
                  </View>
                )}

                <View style={styles.ratingLabel}>
                  {data?.country.rate && (
                    <>
                      <View
                        style={{
                          position: "relative",
                          top: -1,
                          opacity: 0.8,
                        }}
                      >
                        <StarIcon size={15} color="#FFBC3E" />
                      </View>
                      <Text style={styles.ratingText}>
                        {data?.country.rate} /
                      </Text>
                    </>
                  )}
                  {data?.country.visitors && (
                    <Text style={styles.ratingText}>
                      {data?.country.visitors} visitors
                    </Text>
                  )}
                </View>
              </View>
            </View>
          )}
          headerHeight={300} // optional
          containerStyle={{
            flex: 1,
            backgroundColor: COLORS.lightGray,
          }}
          headerContainerStyle={{
            elevation: 0,
            shadowColor: "#fff",
          }}
          renderTabBar={(props) => (
            <MaterialTabBar
              {...props}
              scrollEnabled
              indicatorStyle={{
                backgroundColor: COLORS.black,
                height: 3,
              }}
              style={{
                paddingLeft: 10,
              }}
              tabStyle={{
                height: 70,
                marginRight: 15,
              }}
            />
          )}
        >
          <Tabs.Tab
            name="Explore"
            label={(props) => (
              <View style={styles.customTab}>
                <BinocularsIcon color={COLORS.black} />
                <Text
                  style={[
                    styles.customTabLabel,
                    {
                      color: COLORS.black,
                    },
                  ]}
                >
                  Explore
                </Text>
              </View>
            )}
          >
            <Tabs.ScrollView
              alwaysBounceVertical={false}
              bounces={false}
              showsVerticalScrollIndicator={false}
            >
              {data && <ForYou DATA={[]} country={data?.country} />}
            </Tabs.ScrollView>
          </Tabs.Tab>
          <Tabs.Tab
            name="Insights"
            label={(props) => (
              <View style={styles.customTab}>
                <InsightsFilled color={COLORS.black} />
                <Text
                  style={[
                    styles.customTabLabel,
                    {
                      color: COLORS.black,
                    },
                  ]}
                >
                  Insights
                </Text>
              </View>
            )}
          >
            <Tabs.ScrollView
              alwaysBounceVertical={false}
              bounces={false}
              showsVerticalScrollIndicator={false}
            >
              <TripInsightTab iso2={(data && data.country.iso2) || ""} />
            </Tabs.ScrollView>
          </Tabs.Tab>
          <Tabs.Tab
            name="Overview"
            label={(props) => (
              <View style={styles.customTab}>
                <InfoIcon color={COLORS.black} />
                <Text
                  style={[
                    styles.customTabLabel,
                    {
                      color: COLORS.black,
                    },
                  ]}
                >
                  Overview
                </Text>
              </View>
            )}
          >
            <Tabs.ScrollView
              alwaysBounceVertical={false}
              bounces={false}
              showsVerticalScrollIndicator={false}
            >
              {data && <Overview country={data.country} />}
            </Tabs.ScrollView>
          </Tabs.Tab>
          <Tabs.Tab
            name="Visa"
            label={(props) => (
              <View style={styles.customTab}>
                <PassportIcon color={COLORS.black} />
                <Text
                  style={[
                    styles.customTabLabel,
                    {
                      color: COLORS.black,
                    },
                  ]}
                >
                  Visa
                </Text>
              </View>
            )}
          >
            <Tabs.ScrollView
              alwaysBounceVertical={false}
              bounces={false}
              showsVerticalScrollIndicator={false}
            >
              {data && <Visa country={data.country} />}
            </Tabs.ScrollView>
          </Tabs.Tab>
          <Tabs.Tab
            name="Transport"
            label={(props) => (
              <View style={styles.customTab}>
                <TransportIcon color={COLORS.black} />
                <Text
                  style={[
                    styles.customTabLabel,
                    {
                      color: COLORS.black,
                    },
                  ]}
                >
                  Transport
                </Text>
              </View>
            )}
          >
            <Tabs.ScrollView
              alwaysBounceVertical={false}
              bounces={false}
              showsVerticalScrollIndicator={false}
            >
              {data && <Transport country={data.country} />}
            </Tabs.ScrollView>
          </Tabs.Tab>

          <Tabs.Tab
            name="Dishes"
            label={(props) => (
              <View style={styles.customTab}>
                <DiningIcon color={COLORS.black} />
                <Text
                  style={[
                    styles.customTabLabel,
                    {
                      color: COLORS.black,
                    },
                  ]}
                >
                  Dishes
                </Text>
              </View>
            )}
          >
            <Tabs.ScrollView
              alwaysBounceVertical={false}
              bounces={false}
              showsVerticalScrollIndicator={false}
            >
              {data && data.country && <Dining country={data.country} />}
            </Tabs.ScrollView>
          </Tabs.Tab>
          {/* 
              <Tabs.Tab
                name="Language"
                label={(props) => (
                  <View style={styles.customTab}>
                    <LanguageIcon color={COLORS.black} />
                    <Text
                      style={[
                        styles.customTabLabel,
                        {
                          color: COLORS.black,
                        },
                      ]}
                    >
                      Language
                    </Text>
                  </View>
                )}
              >
                <Tabs.ScrollView
                  alwaysBounceVertical={false}
                  bounces={false}
                  showsVerticalScrollIndicator={false}
                >
                  <Language />
                </Tabs.ScrollView>
              </Tabs.Tab> */}

          <Tabs.Tab
            name="Emergency"
            label={(props) => (
              <View style={styles.customTab}>
                <EmergencyIcon color={COLORS.black} />
                <Text
                  style={[
                    styles.customTabLabel,
                    {
                      color: COLORS.black,
                    },
                  ]}
                >
                  Emergency
                </Text>
              </View>
            )}
          >
            <Tabs.ScrollView
              alwaysBounceVertical={false}
              bounces={false}
              showsVerticalScrollIndicator={false}
            >
              {data && data.country && <Emergency country={data.country} />}
            </Tabs.ScrollView>
          </Tabs.Tab>
        </Tabs.Container>
      </View>

      {/* <Portal>
        <Modalize ref={modalCountryPassportSelectRef} modalTopOffset={65}>
          <CountrySelect />
        </Modalize>
      </Portal> */}
    </>
  );
};
