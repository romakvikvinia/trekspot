import React, { useCallback, useEffect, useState } from "react";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import {
  ImageBackground,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Modalize, useModalize } from "react-native-modalize";
import { Portal } from "react-native-portalize";
import Swiper from "react-native-swiper";
import { styles } from "../../../common/components/_styles";
import { DownIcon, Mark2, StarIcon } from "../../../utilities/SvgIcons.utility";
import { exploreStyles } from "../sights/_exploreStyles";
import { CityType, SightType } from "../../../api/api.types";
import { useLazyGetSightsQuery } from "../../../api/api.trekspot";
import { SightItem } from "../sights/SightItem";
import { SightsContainer } from "../sights/SightsContainer";
import { SightDetailModal } from "../sights/SightDetailModal";
import { Loader } from "../../../common/ui/Loader";
import { SIZES } from "../../../styles/theme";

type CityDetailProps = {
  city: CityType;
  closeCallBack?: () => void;
};

interface IState {
  sight: SightType | null;
}

export const CityDetailModal: React.FC<CityDetailProps> = ({
  city,
  closeCallBack = () => {},
}) => {
  const { ref, open, close } = useModalize();
  const [state, setState] = useState<IState>({ sight: null });
  const [getSights, { data, isLoading }] = useLazyGetSightsQuery();

  useEffect(() => {
    getSights({ iso2: city.iso2, city: city.city });
  }, [city]);

  useEffect(() => {
    if (ref && ref.current) open();
  }, [ref.current]);

  const handleSetSightItem = useCallback((sight: SightType) => {
    setState((prevState) => ({ ...prevState, sight }));
  }, []);

  const handleClose = useCallback(() => {
    if (ref && ref.current) {
      close();
    }
  }, []);

  // transform data

  const topSights = (data && "Top Sights" in data && data["Top Sights"]) || [];
  let sights = data && { ...data };
  if (sights && data && "Top Sights" in data && data["Top Sights"]) {
    delete sights["Top Sights"];
  }

  return (
    <>
      <Portal>
        <Modalize
          ref={ref}
          withHandle={false}
          modalTopOffset={0}
          velocity={100000}
          avoidKeyboardLikeIOS={true}
          // tapGestureEnabled={false}
          // closeSnapPointStraightEnabled={false}
          scrollViewProps={{
            // alwaysBounceVertical: false,
            showsVerticalScrollIndicator: false,
          }}
          modalStyle={{
            flex: 1,
          }}
          modalHeight={SIZES.height}
          onClose={closeCallBack}
        >
          {isLoading && (
            <View style={{ minHeight: 200 }}>
              <Loader isLoading={isLoading} />
            </View>
          )}

          {!isLoading ? (
            <View
              style={{
                flex: 1,
                minHeight: "100%",
                paddingBottom: 50,
              }}
            >
              <ScrollView style={{ flex: 1 }}>
                <View
                  style={[
                    styles.swiperWrapper,
                    {
                      borderTopLeftRadius: 10,
                      borderTopRightRadius: 10,
                      overflow: "hidden",
                    },
                  ]}
                >
                  <TouchableOpacity
                    onPress={handleClose}
                    activeOpacity={0.7}
                    style={[styles.backButton,
                       { 
                        top: Platform.OS === "ios" ? 55 : 15
                       }
                      ]}
                  >
                    <DownIcon color="#fff" />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.addToBucketButton, {  top: Platform.OS === "ios" ? 55 : 15 }]}
                    activeOpacity={0.7}
                  >
                    <Mark2 color="#fff" />
                  </TouchableOpacity>
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
                    {/* {city.images.map((item,i) => (
                <ImageBackground
                  style={[styles.box]}
                  resizeMode="cover"
                  source={{
                    uri: item.url,
                  }}
                  key={`slide-${item.id}-${city.id}`}
                >
                  <LinearGradient
                    style={styles.gradientWrapper}
                    colors={["rgba(0,0,0,0.1)", "rgba(0,0,0,0.6)"]}
                  ></LinearGradient>
                </ImageBackground>
              ))} */}
                    <ImageBackground
                      style={[styles.box]}
                      resizeMode="cover"
                      source={{
                        uri: "https://cdn.pixabay.com/photo/2017/05/31/01/34/singapore-2358810_1280.jpg",
                      }}
                    >
                      <LinearGradient
                        style={styles.gradientWrapper}
                        colors={["rgba(0,0,0,0.1)", "rgba(0,0,0,0.6)"]}
                      ></LinearGradient>
                    </ImageBackground>
                  </Swiper>

                  <View style={styles.otherInfo}>
                    <View style={styles.labelItem}>
                      <Text style={styles.labelItemText}>{city.city}</Text>
                    </View>
                    <View style={styles.ratingLabel}>
                      <View
                        style={{
                          position: "relative",
                          top: -1,
                          opacity: 0.8,
                        }}
                      >
                        <StarIcon size={15} color="#FFBC3E" />
                      </View>
                      <Text style={styles.ratingText}>{city.rate} /</Text>
                      <Text style={styles.ratingText}>
                        {city.visitors} visitors
                      </Text>
                    </View>
                  </View>
                </View>
                <View
                  style={[
                    exploreStyles.placeSpotsRow,
                    {
                      borderTopWidth: 0,
                    },
                  ]}
                >
                  <Text style={exploreStyles.placeSpotsRowTitle}>
                    Top sights
                  </Text>
                  <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{
                      paddingHorizontal: 15,
                    }}
                  >
                    {topSights.map((item) => (
                      <SightItem
                        key={`top-sights-${item.id}-${item.title}`}
                        item={item}
                        onHandleItem={handleSetSightItem}
                      />
                    ))}
                  </ScrollView>
                </View>

                {sights && Object.keys(sights).length ? (
                  <SightsContainer items={sights} />
                ) : null}
              </ScrollView>

              {state.sight && <SightDetailModal data={state.sight} />}
            </View>
          ) : null}
        </Modalize>
      </Portal>
    </>
  );
};
