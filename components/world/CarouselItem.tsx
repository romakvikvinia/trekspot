import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";

import { ImageType } from "../../api/api.types";
import { SIZES } from "../../styles/theme";

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
          uri: item?.url,
        }}
        cachePolicy="memory"
        contentFit="contain"
        transition={1000}
      />
    </LinearGradient>
  );
};
