import React, { useCallback, useEffect } from "react";
import { Modalize, useModalize } from "react-native-modalize";
import { Portal } from "react-native-portalize";
import { CityType } from "../../../api/api.types";
import { SIZES } from "../../../styles/theme";
import { CityDetail } from "./CityDetail";

type CityDetailProps = {
  city: CityType;
  closeCallBack?: () => void;
};

 
export const CityDetailModal: React.FC<CityDetailProps> = ({
  city,
  closeCallBack = () => {},
}) => {
  const { ref, open, close } = useModalize();
 
  useEffect(() => {
    if (ref && ref.current) open();
  }, [ref.current]);

 
  const handleClose = useCallback(() => {
    if (ref && ref.current) {
      close();
    }
  }, []);

   

  return (
      <Portal>
        <Modalize
          ref={ref}
          withHandle={false}
          modalTopOffset={0}
          velocity={100000}
          avoidKeyboardLikeIOS={true}
          scrollViewProps={{
            showsVerticalScrollIndicator: false,
          }}
          modalStyle={{
            flex: 1,
          }}
          modalHeight={SIZES.height}
          onClose={closeCallBack}
        >
          <CityDetail city={city} handleClose={handleClose}/>
        </Modalize>
      </Portal>
  );
};
