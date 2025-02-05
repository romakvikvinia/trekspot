import { Image } from "expo-image";
import { useRef } from "react";
import { Pressable, ScrollView, StyleSheet, View } from "react-native";
import { Modalize } from "react-native-modalize";
import { Portal } from "react-native-portalize";
import Carousel from "react-native-snap-carousel";

import { styles } from "../../common/components/_styles";
import { SIZES } from "../../styles/theme";
import { XIcon } from "../../utilities/SvgIcons.utility";
import { CarouselItem } from "../world/CarouselItem";

export const CityGalleryRow = ({ city }) => {
  const galleryRef = useRef(null);
  const carouselRef = useRef(null);

  return (
    <>
      <ScrollView
        horizontal
        contentContainerStyle={{
          paddingHorizontal: 15,
          marginTop: 0,
        }}
        showsHorizontalScrollIndicator={false}
      >
        {city?.images?.map((img, i) => {
          if (i % 3 === 0) {
            return (
              <Pressable
                key={`large-slide-${img?.id}-${city.id}`}
                onPress={() => galleryRef?.current?.open()}
              >
                <Image
                  style={[
                    cityStyle.box,
                    {
                      width: SIZES.width - 130,
                      height: 300,
                    },
                  ]}
                  priority="high"
                  contentFit="cover"
                  source={{ uri: img.url }}
                />
              </Pressable>
            );
          }

          if (i % 3 === 1) {
            return (
              <Pressable
                key={`vert-group-${Math.floor(i / 3)}-${city.id}`}
                style={styles.vertImages}
                onPress={() => galleryRef?.current?.open()}
              >
                <Image
                  style={[
                    cityStyle.box,
                    {
                      width: 145,
                      height: 145,
                    },
                  ]}
                  priority="high"
                  contentFit="cover"
                  source={{ uri: img.url }}
                />
                {city.images[i + 1] && (
                  <Image
                    style={[
                      cityStyle.box,
                      {
                        width: 145,
                        height: 145,
                      },
                    ]}
                    priority="high"
                    contentFit="cover"
                    source={{ uri: city.images[i + 1]?.url }}
                  />
                )}
              </Pressable>
            );
          }

          return null;
        })}
      </ScrollView>

      <Portal>
        <Modalize
          ref={galleryRef}
          modalTopOffset={0}
          withHandle={false}
          disableScrollIfPossible
          modalStyle={{
            minHeight: "100%",
            backgroundColor: "#000",
            flex: 1,
          }}
          scrollViewProps={{
            alwaysBounceVertical: false,
          }}
        >
          <View style={cityStyle.galleryHeader}>
            <Pressable
              style={cityStyle.closeGalleryButton}
              onPress={() => galleryRef?.current?.close()}
            >
              <XIcon color="#fff" />
            </Pressable>
          </View>

          <Carousel
            ref={carouselRef}
            //@ts-ignore
            data={city?.images}
            //@ts-ignore
            renderItem={CarouselItem}
            sliderWidth={SIZES.width}
            itemWidth={SIZES.width}
            inactiveSlideShift={0}
            useScrollView={true}
          />
        </Modalize>
      </Portal>
    </>
  );
};

const cityStyle = StyleSheet.create({
  box: {
    backgroundColor: "#eee",
    borderRadius: 15,
    marginRight: 8,
    overflow: "hidden",
  },
  closeGalleryButton: {
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderColor: "#000",
    borderRadius: 50,
    borderWidth: 0,
    height: 40,
    justifyContent: "center",
    width: 40,
  },
  galleryHeader: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingHorizontal: 15,
    paddingTop: 55,
    position: "absolute",
    width: "100%",
    zIndex: 1,
  },
});
