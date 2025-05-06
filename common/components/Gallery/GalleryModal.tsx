/* eslint-disable @typescript-eslint/no-require-imports */
import { Image } from "expo-image";
import { useEffect, useRef } from "react";
import { Linking, Pressable, StyleSheet, Text, View } from "react-native";
import { Carousel } from "react-native-snap-carousel";

import { SIZES } from "../../../styles/theme";
import { XIcon } from "../../../utilities/SvgIcons.utility";
import BottomSheetScrollView from "../../Sheet";
import { BottomSheetMethods } from "../../Sheet/BottomSheet";

export const GalleryModal = ({
  data,
  bottomSheetRef,
  activeIndex,
  setActiveIndex,
}: {
  data: any[];
  bottomSheetRef: React.RefObject<BottomSheetMethods>;
  activeIndex: number;
  setActiveIndex: (index: number) => void;
}) => {
  const carouselRef = useRef(null);

  const redirectToContrib = (URL: any) => {
    if (URL?.html_attributions?.length > 0) {
      const link = URL?.html_attributions[0]?.split('href="')[1].split('"')[0];
      Linking.openURL(link);
    }
    if (URL?.meta?.authorUrl) {
      Linking.openURL(URL?.meta?.authorUrl);
    }

    return "";
  };

  console.log(data);

  const renderAuthor = (item: any) => {
    if (item?.html_attributions?.length > 0) {
      const author = item?.html_attributions[0]
        ?.split('">')[1]
        ?.split("</a>")[0];
      return author;
    }
    if (item?.meta?.author) {
      return item?.meta?.author;
    }
    return null;
  };
  console.log("activeIndex", activeIndex);

  useEffect(() => {
    if (activeIndex != -1) carouselRef.current?.snapToItem(activeIndex);
  }, [activeIndex]);


  return (
    <BottomSheetScrollView
      ref={bottomSheetRef}
      snapTo={"100%"}
      backgroundColor={"#000"}
      backDropColor={"black"}
      isFullScreen={true}
      showVerticalScrollIndicator={false}
      header={
        <View style={sheetStyle.galleryHeader}>
          <Pressable
            style={sheetStyle.closeGalleryButton}
            onPress={() => {
              setActiveIndex(-1);
              bottomSheetRef?.current?.close();
            }}
          >
            <XIcon color="#fff" />
          </Pressable>
        </View>
      }
    >
      <Carousel
        ref={carouselRef}
        // @ts-expect-error
        data={data}
        // @ts-expect-error - renderItem prop type mismatch with Carousel component
        renderItem={({ item }) => (
          <View
            style={{
              width: SIZES.width,
              height: SIZES.height,
              flex: 1,
              position: "relative",
            }}
          >
            <Image
              style={{
                width: SIZES.width,
                height: SIZES.height,
                flex: 1,
              }}
              placeholder={{
                uri: require("../../../assets/no-image.png"),
              }}
              placeholderContentFit="cover"
              source={{
                uri: item?.url,
              }}
              cachePolicy="memory"
              contentFit="contain"
              transition={1000}
            />
            {renderAuthor(item) && (
              <Pressable
                onPress={() =>
                  redirectToContrib(item) &&
                  Linking.openURL(redirectToContrib(item))
                }
                style={sheetStyle.authorContainer}
              >
                <Text style={sheetStyle.authorText}>
                  © {renderAuthor(item)}
                </Text>
              </Pressable>
            )}
          </View>
        )}
        sliderWidth={SIZES.width}
        itemWidth={SIZES.width}
        inactiveSlideShift={0}
        useScrollView={true} 
      />
    </BottomSheetScrollView>
  );
};
const sheetStyle = StyleSheet.create({
  authorContainer: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: 50,
    borderWidth: 0,
    bottom: 30,
    height: 40,
    left: 16,
    position: "absolute",
    zIndex: 1,
  },
  authorText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
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
