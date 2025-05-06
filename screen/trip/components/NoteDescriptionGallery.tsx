import { Image } from "expo-image";
import { useRef } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Modalize } from "react-native-modalize";
import { Portal } from "react-native-portalize";
import Carousel from "react-native-snap-carousel";

import { CarouselItem } from "../../../components/world/CarouselItem";
import { COLORS, SIZES } from "../../../styles/theme";
import { XIcon } from "../../../utilities/SvgIcons.utility";

export const NoteDescriptionGallery = ({
  images = null,
  description = null,
  notes = null,
}) => {
  const galleryRef = useRef(null);
  const carouselRef = useRef(null);

  return (
    <>
      {notes && (
        <View style={styles.noteWrapper}>
          <Text style={styles.noteText}>{notes}</Text>
        </View>
      )}
      {description && (
        <View style={styles.descWrapper}>
          <Text style={styles.descText}>{description}</Text>
        </View>
      )}

      {images?.length > 0 ? (
        <Pressable
          style={styles.imagesRow}
          onPress={() => galleryRef?.current?.open()}
        >
          {images?.slice(0, 3)?.map((img, i) => (
            <View style={styles.imageWrapper} key={i}>
              <Image
                style={styles.imgItem}
                source={
                  img
                    ? {
                        uri: img.url,
                      }
                    : require("../../../assets/no-image.png")
                }
                contentFit="cover"
                
              ></Image>
              {images?.length > 3 && images?.length - 1 === i + 1 && (
                <View style={styles.overlay}>
                  <Text style={styles.overlayText}>{images?.length - 3} +</Text>
                </View>
              )}
            </View>
          ))}
        </Pressable>
      ) : null}

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
          <View style={styles.galleryHeader}>
            <Pressable
              style={styles.closeGalleryButton}
              onPress={() => galleryRef?.current?.close()}
            >
              <XIcon color="#fff" />
            </Pressable>
          </View>

          <Carousel
            ref={carouselRef}
            //@ts-ignore
            data={images}
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
const styles = StyleSheet.create({
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
  descText: {
    color: COLORS.black,
    fontSize: 14,
    lineHeight: 20,
  },
  descWrapper: {
    marginBottom: 0,
    padding: 15,
    paddingBottom: 0
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
  imageWrapper: {
    backgroundColor: "#f2f2f2",
    borderRadius: 15,
    height: 60,
    marginRight: 10,
    overflow: "hidden",
    position: "relative",
    width: 100,
  },
  imagesRow: {
    flexDirection: "row",
    marginTop: 20,
    paddingHorizontal: 15
  },
  imgItem: {
    flex: 1,
    height: 60,
    width: 100,
  },
  noteText: {
    color: COLORS.black,
    fontSize: 14,
    lineHeight: 20,
  },
  noteWrapper: {
    backgroundColor: "#fff8e8",
    borderRadius: 10,
    marginBottom: 0,
    marginHorizontal: 15,
    marginTop: 20,
    padding: 15,
  },
  overlay: {
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    bottom: 0,
    justifyContent: "center",
    left: 0,
    position: "absolute",
    right: 0,
    top: 0,
  },
  overlayText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "500",
    zIndex: 1,
  },
});
