import React, { useCallback, useEffect, useState } from "react";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
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
import { SightDetail } from "../sights/SightDetail";
import { Loader } from "../../../common/ui/Loader";

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
  console.log("sights", sights, city.iso2, city.city);
  return (
    <>
      <Portal>
        <Modalize
          ref={ref}
          withHandle={false}
          modalTopOffset={30}
          scrollViewProps={{
            alwaysBounceVertical: false,
            showsVerticalScrollIndicator: false,
          }}
          velocity={100000}
          tapGestureEnabled={false}
          closeSnapPointStraightEnabled={false}
          onClose={closeCallBack}
        >
          <Loader isLoading={isLoading} />
          {!isLoading ? (
            <View
              style={{
                flex: 1,
                minHeight: "100%",
                paddingBottom: 50,
              }}
            >
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
                  style={[
                    styles.backButton,
                    {
                      top: 15,
                    },
                  ]}
                >
                  <DownIcon color="#fff" />
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.addToBucketButton,
                    {
                      // backgroundColor: 1 == 0 ? COLORS.primary : "rgba(0, 0, 0, 0.3)", // check for favorite
                      backgroundColor: "rgba(0, 0, 0, 0.3)",
                      top: 15,
                    },
                  ]}
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
                  {city.images.map((item) => (
                    <Image
                      style={[styles.box]}
                      resizeMode="cover"
                      source={{
                        uri: item.url,
                      }}
                      key={`slide-${item.id}-${city.id}`}
                    >
                      <LinearGradient
                        style={styles.gradientWrapper}
                        colors={["rgba(0,0,0,0.1)", "rgba(0,0,0,0.4)"]}
                      ></LinearGradient>
                    </Image>
                  ))}
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
                <Text style={exploreStyles.placeSpotsRowTitle}>Top sights</Text>
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

              {state.sight && <SightDetail data={state.sight} />}
            </View>
          ) : null}
        </Modalize>
      </Portal>
    </>
  );
};
