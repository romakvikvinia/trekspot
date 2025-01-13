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
        {
          <Pressable onPress={() => galleryRef?.current?.open()}>
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
              source={{
                uri: "https://cdn.pixabay.com/photo/2015/10/06/18/26/eiffel-tower-975004_1280.jpg",
                // city?.images[0].url,
              }}
              key={`slide-${city?.images[0]?.id}-${city.id}`}
            ></Image>
          </Pressable>
        }
        <View style={styles.vertImages}>
          {
            <>
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
                source={{
                  uri: city?.images[1].url,
                }}
                key={`slide-${city?.images[1]?.id}-${city.id}`}
              ></Image>
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
                source={{
                  uri: "https://cdn.pixabay.com/photo/2020/11/22/19/19/louvre-5767708_1280.jpg",
                  // city?.images[2].url,
                }}
                key={`slide-${city?.images[2]?.id}-${city.id}`}
              ></Image>
            </>
          }
        </View>
        {
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
            source={{
              uri: "https://cdn.pixabay.com/photo/2015/12/06/09/19/roses-1079246_1280.jpg",
              // city?.images[3].url,
            }}
            key={`slide-${city?.images[3]?.id}-${city.id}`}
          ></Image>
        }
      </ScrollView>

      <Portal>
        <Modalize
          ref={galleryRef}
          modalTopOffset={0}
          withHandle={false}
          disableScrollIfPossible
        //   onClose={() =>
        //     setState((prevState) => ({
        //       ...prevState,
        //       activeSliderIndex: 0,
        //     }))
        //   }
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
            // onSnapToItem={(index) =>
            //   setState((prevState) => ({
            //     ...prevState,
            //     activeSliderIndex: index,
            //   }))
            // }
            useScrollView={true}
          />
        </Modalize>
      </Portal>
    </>
  );
};

const cityStyle = StyleSheet.create({
  box: {
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
