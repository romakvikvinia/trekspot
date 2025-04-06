import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { parseISO } from "date-fns";
import { useFormik } from "formik";
import React, { useEffect, useRef, useState } from "react";
import { Animated } from "react-native";
import { IHandles } from "react-native-modalize/lib/options";

import {
  trekSpotApi,
  useCreateTripMutation,
  useUpdateTripMutation,
} from "../../api/api.trekspot";
import { CityType, TripType } from "../../api/api.types";
import { useAppDispatch } from "../../package/store";
import { TripRouteStackParamList } from "../../routes/trip/TripRoutes";
import { creationTrip } from "../auth/validationScheme";
import { CreateTripContent } from "./SubComponents/CreateTripContent";

interface INewTripProps {
  newTripModalRef: React.RefObject<IHandles>;
  callBack: () => void;
  item?: TripType;
  editMode: boolean;
  hideCreateTripModal: () => void;
}

type TripStackNavigationProp = StackNavigationProp<TripRouteStackParamList>;

export const NewTrip = ({
  item,
  newTripModalRef,
  callBack,
  editMode,
  hideCreateTripModal,
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
   const fadeAnim = useRef(new Animated.Value(0)).current;

  const showPopup = () => {
    setVisibleDestinationsPopup(true);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 150,
      useNativeDriver: true,
    }).start();
  };
 
 
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
    <CreateTripContent
      newTripModalRef={newTripModalRef}
      setOpen={setOpen}
      formik={formik}
      showPopup={showPopup}
      isLoading={isUpdateTripLoading || isLoading}
      editMode={editMode}
      hideCreateTripModal={hideCreateTripModal}
    />
  );
}; 