import { Image } from "expo-image";
import { useState } from "react";
import { useRef } from "react";
import { Pressable, ScrollView, StyleSheet, View } from "react-native";

import { BottomSheetMethods } from "../../Sheet/BottomSheet";
import { GalleryModal } from "./GalleryModal";

export const GalleryGrid = ({ images }: { images: any[] }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const bottomSheetRef = useRef<BottomSheetMethods>(null);

  return (
    <>
      <View style={styles.galleryGrid}>
        {/* Grid should be two columns like pinterest */}
        <ScrollView
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingTop: 0 }}
        >
          <View style={styles.grid}>
            {images.map((image, index) => (
              <Pressable
                style={styles.imageButton}
                key={index}
                onPress={() => {
                  setActiveIndex(index);
                  bottomSheetRef.current?.expand();
                }}
              >
                <Image
                  resizeMode="cover"
                  source={{ uri: image.url }}
                  style={[
                    styles.image,
                    {
                      height: 200,
                    },
                  ]}
                />
              </Pressable>
            ))}
          </View>
        </ScrollView>
      </View>
      <GalleryModal
        data={images}
        bottomSheetRef={bottomSheetRef}
        activeIndex={activeIndex}
        setActiveIndex={setActiveIndex}
      />
    </>
  );
};

const styles = StyleSheet.create({
  galleryGrid: {
    flex: 1,
    paddingHorizontal: 10,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  image: {
    borderRadius: 10,
    width: "100%",
  },
  imageButton: {
    height: 200,
    marginBottom: 5,
    width: "49.4%",
  },
});
