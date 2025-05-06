import { Image } from "expo-image";
import { useState } from "react";
import { Pressable, View } from "react-native";
import Swiper from "react-native-swiper";

import { FullscreenModal } from "../../../../common/components/FullscreenModal";
import { GalleryGrid } from "../../../../common/components/Gallery/GalleryGrid";
import { styles } from "./styles";

export const Slider = ({ newData }: { newData: any }) => {
  const [isFullscreenModalVisible, setIsFullscreenModalVisible] =
    useState(false);

  return (
    <>
      <View style={styles.swiperContainer}>
        <Swiper
          activeDotColor="#fff"
          showsButtons={false}
          loop={false}
          dotColor="#949494"
          automaticallyAdjustContentInsets
          paginationStyle={{
            position: "absolute",
            justifyContent: "center",
            paddingRight: 0,
            bottom: 16,
          }}
        >
          {newData?.images?.map((item, index) => (
            <Pressable
              key={index}
              onPress={() => setIsFullscreenModalVisible(true)}
            >
              <Image
                source={{ uri: item.url }}
                style={{
                  width: "100%",
                  height: 500,
                  backgroundColor: "#ccc",
                }}
                priority="high"
              />
            </Pressable>
          ))}
        </Swiper>
      </View>

      <FullscreenModal pageTitle="Gallery" visible={isFullscreenModalVisible} onClose={() => setIsFullscreenModalVisible(false)}>
        <GalleryGrid images={newData?.images} />
      </FullscreenModal>
    </>
  );
};
