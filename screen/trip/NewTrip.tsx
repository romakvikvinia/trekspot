import { useEffect, useRef, useState } from "react";
import { useFormik } from "formik";
import { Modal, Platform, View } from "react-native";
import { Modalize } from "react-native-modalize";

import { RangePicker } from "./RangePicker";
import { Portal } from "react-native-portalize";

import { Destination } from "./Destination";

import { CreateTripContent } from "./SubComponents/CreateTripContent";
import { styles } from "./SubComponents/CreateTripStyles";
import { IHandles } from "react-native-modalize/lib/options";
import { CityType } from "../../api/api.types";
import { useCreateTripMutation } from "../../api/api.trekspot";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { TripRouteStackParamList } from "../../routes/trip/TripRoutes";
import { creationTrip } from "../auth/validationScheme";
import { format, parseISO } from "date-fns";

interface INewTripProps {
  newTripModalRef: React.RefObject<IHandles>;
  callBack: () => void;
}

type TripStackNavigationProp = StackNavigationProp<TripRouteStackParamList>;

export const NewTrip = ({ newTripModalRef, callBack }: INewTripProps) => {
  const navigation = useNavigation<TripStackNavigationProp>();
  const [fetchData, { isLoading, isError, data, isSuccess }] =
    useCreateTripMutation();
  const [open, setOpen] = useState(false);
  const [whereToModal, setWhereToModal] = useState(false);

  const modalDestinationRef = useRef<Modalize>(null);

  const formik = useFormik({
    initialValues: {
      name: "",
      range: {},
      destination: null,
      travelType: "",
      cities: [],
    },
    validationSchema: creationTrip,
    onSubmit: async ({ name, range, travelType, cities }, methods) => {
      methods.setSubmitting(true);
      //@ts-ignore
      const startDate = range["startDate"]
        .toLocaleDateString()
        .split("/")
        .reverse();
      //@ts-ignore
      const endDate = range["endDate"]
        .toLocaleDateString()
        .split("/")
        .reverse();

      fetchData({
        name,

        startAt: format(
          new Date(startDate[0], startDate[2] - 1, startDate[1]),
          "yyyy-MM-dd"
        ),

        endAt: format(
          new Date(endDate[0], endDate[2] - 1, endDate[1]),
          "yyyy-MM-dd"
        ),
        type: travelType.toUpperCase(),
        cities,
      });
    },
  });

  const onDestinationModalOpen = () => {
    if (Platform.OS === "android") {
      setWhereToModal(true);
    } else {
      modalDestinationRef.current?.open();
    }
  };
  const onDestinationModalClose = (city?: CityType, cities?: string[]) => {
    if (Platform.OS === "android") {
      setWhereToModal(false);
    } else {
      modalDestinationRef.current?.close();
    }

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
    }
  }, [isSuccess, callBack]);

  return (
    <>
      <View
        style={[styles.tripModalGradient, { padding: 0 }]}
        // colors={gradient}
        // start={{ x: -1, y: 1 }}
        // end={{ x: 1, y: 0 }}
      >
        <CreateTripContent
          newTripModalRef={newTripModalRef}
          setOpen={setOpen}
          formik={formik}
          onDestinationModalOpen={onDestinationModalOpen}
        />
      </View>
      <RangePicker formik={formik} open={open} setOpen={setOpen} />

      <Portal>
        <Modalize
          ref={modalDestinationRef}
          modalTopOffset={65}
          scrollViewProps={{
            alwaysBounceVertical: false,
            showsVerticalScrollIndicator: false,
            keyboardShouldPersistTaps: "handled",
          }}
          modalStyle={{
            backgroundColor: "#f8f8f8",
          }}
        >
          <Destination onDestinationModalClose={onDestinationModalClose} />
        </Modalize>
      </Portal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={whereToModal}
        onRequestClose={() => {
          setWhereToModal(!whereToModal);
        }}
      >
        <View style={styles.modalViewWrapper}>
          <View style={styles.modalViewCenter}>
            <Destination onDestinationModalClose={onDestinationModalClose} />
          </View>
        </View>
      </Modal>
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
