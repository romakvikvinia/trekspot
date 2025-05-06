import { useState } from "react";
import { useRef } from "react";
import { useCallback } from "react";
import { Text } from "react-native";

import { BottomSheetMethods } from "../../Sheet/BottomSheet";
import { FullscreenModal } from "../FullscreenModal";

export const GalleryGridModal = ({route}) => {
  const { images } = route.params;
  
  const bottomSheetRef = useRef<BottomSheetMethods>(null);
  const [activeIndex, setActiveIndex] = useState(-1);

  const pressHandler = useCallback((index: number) => {
    bottomSheetRef.current?.expand();
    setActiveIndex(index);
  }, []);


 


  console.log(images);

  return (
    <>
       <FullscreenModal visible={true} onClose={() => {}}>
        <Text>Gallery Grid Modal</Text>
       </FullscreenModal>

     
    </>
  );
};
