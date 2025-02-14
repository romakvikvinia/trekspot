import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { parseISO } from "date-fns";
import { useFormik } from "formik";
import React, { useEffect, useRef, useState } from "react";
import { Animated, View } from "react-native";
import { Modalize } from "react-native-modalize";
import { IHandles } from "react-native-modalize/lib/options";
import { Portal } from "react-native-portalize";

import {
  trekSpotApi,
  useCreateTripMutation,
  useUpdateTripMutation,
} from "../../api/api.trekspot";
import { CityType, TripType } from "../../api/api.types";
import { useAppDispatch } from "../../package/store";
import { TripRouteStackParamList } from "../../routes/trip/TripRoutes";
import { creationTrip } from "../auth/validationScheme";
import { Destination } from "./Destination";
import { RangePicker } from "./RangePicker";
import { CreateTripContent } from "./SubComponents/CreateTripContent";
import { styles } from "./SubComponents/CreateTripStyles";

interface INewTripProps {
  newTripModalRef: React.RefObject<IHandles>;
  callBack: () => void;
  item?: TripType;
  editMode: boolean;
}

type TripStackNavigationProp = StackNavigationProp<TripRouteStackParamList>;

export const NewTrip = ({
  item,
  newTripModalRef,
  callBack,
  editMode,
}: INewTripProps) => {
  const navigation = useNavigation<TripStackNavigationProp>();
  const dispatch = useAppDispatch();
  const [visibleDestinationsPopup, setVisibleDestinationsPopup] = useState(false);
  const [fetchData, { isLoading, isError, data, isSuccess }] =
    useCreateTripMutation();

  const [
    fetchUpdateTrip,
    {
      isLoading: isUpdateTripLoading,
      data: updatedTrip,
      isSuccess: isUpdatedTripSuccess,
    },
  ] = useUpdateTripMutation();

  const [open, setOpen] = useState(false);
  const [whereToModal, setWhereToModal] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const showPopup = () => {
    setVisibleDestinationsPopup(true);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 150,
      useNativeDriver: true,
    }).start();
  };

  const hidePopup = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 10,
      useNativeDriver: true,
    }).start(() => setVisibleDestinationsPopup(false));
  };

  const modalDestinationRef = useRef<Modalize>(null);

  const formik = useFormik({
    initialValues: {
      name: item?.name || "",
      range: item
        ? { startDate: parseISO(item.startAt), endDate: parseISO(item.endAt) }
        : {},
      destination: (item?.cities && item?.cities[0]) || null,
      travelType: item?.type || "",
      cities: item?.cities && item?.cities.length ? [item?.cities[0].id] : [],
    },
    validationSchema: creationTrip,
    onSubmit: async ({ name, range, travelType, cities = [] }, methods) => {
      methods.setSubmitting(true);

      const payload = {
        name,
        startAt: range["startDate"]?.toISOString(),
        endAt: range["endDate"]?.toISOString(),
        type: travelType.toUpperCase() || "SOLO",
      };

      if (item) {
        //@ts-ignore
        fetchUpdateTrip({ id: item.id, ...payload });
      } else {
        //@ts-ignore
        payload.cities = (cities && cities.length && cities) || [];
        //@ts-ignore
        fetchData(payload);
      }
    },
  });

  const onDestinationModalOpen = () => {
    modalDestinationRef.current?.open();
  };
  const onDestinationModalClose = (city?: CityType, cities?: string[]) => {
   
    hidePopup();

    if (city && cities) {
      formik.setFieldValue("cities", cities);
      formik.setFieldValue("destination", city);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      callBack();
      navigation.navigate("TripDetailScreen", {
        trip: data.createTrip,
        city: data.createTrip.cities[0],
      });
      dispatch(trekSpotApi.util.invalidateTags(["upComingTrips"]));
    }
  }, [isSuccess, callBack]);

  useEffect(() => {
    if (isUpdatedTripSuccess) {
      callBack();
      navigation.navigate("TripDetailScreen", {
        trip: updatedTrip.updateTrip,
        city: updatedTrip.updateTrip.cities[0],
      });
      dispatch(trekSpotApi.util.invalidateTags(["upComingTrips"]));
    }
  }, [isUpdatedTripSuccess, callBack]);

  return (
    <>
      <View style={[styles.tripModalGradient, { padding: 0 }]}>
        <CreateTripContent
          newTripModalRef={newTripModalRef}
          setOpen={setOpen}
          formik={formik}
          showPopup={showPopup}
          isLoading={isUpdateTripLoading || isLoading}
          editMode={editMode}
        />
      </View>
      <RangePicker formik={formik} open={open} setOpen={setOpen} />

      <Portal>
        {
          visibleDestinationsPopup && 
          <Animated.View style={[{ opacity: fadeAnim, flex: 1 }]}>
            <Destination
              onDestinationModalClose={onDestinationModalClose}
              setVisibleDestinationsPopup={setVisibleDestinationsPopup}
              formik={formik}
              setOpen={setOpen}
            />
          </Animated.View>
        }
      </Portal>
    </>
  );
};

{
  /* <Portal>
        <Modalize
          modalStyle={{
            backgroundColor: "#F2F2F7",
            minHeight: "70%",
          }}
          ref={modalAccessibilityRef}
          modalTopOffset={65}
          adjustToContentHeight
          scrollViewProps={{
            alwaysBounceVertical: false,
            showsVerticalScrollIndicator: false,
          }}
        >
          <Accessibility
            tripAccess={tripAccess}
            setTripAccess={setTripAccess}
          />
        </Modalize>
      </Portal> */
}
