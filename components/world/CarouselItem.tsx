import { Image } from "expo-image";

import { LinearGradient } from "expo-linear-gradient";
import { SIZES } from "../../styles/theme";
import { ImageType } from "../../api/api.types";

interface CarouselItemProps {
  item: ImageType;
  index: number;
}

export const CarouselItem: React.FC<CarouselItemProps> = ({ item }) => {
  return (
    <LinearGradient
      style={{
        width: SIZES.width,
        height: SIZES.height,
        flex: 1,
      }}
      colors={["rgba(255,255,255,0.2)", "rgba(0,0,0,0.1)"]}
    >
      <Image
        style={{
          width: SIZES.width,
          height: SIZES.height,
          flex: 1,
        }}
        source={{
          uri: item.url,
        }}
        cachePolicy="memory"
        contentFit="cover"
        transition={1000}
      />
    </LinearGradient>
  );
};
