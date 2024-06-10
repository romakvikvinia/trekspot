import { useRef, useState } from "react";
import { Modal, Platform, View } from "react-native";

import { RangePicker } from "./RangePicker";
import { Portal } from "react-native-portalize";
import { Modalize } from "react-native-modalize";
import { Destination } from "./Destination";

import { useFormik } from "formik";
import { CreateTripContent } from "./SubComponents/CreateTripContent";
import { styles } from "./SubComponents/CreateTripStyles";

export const NewTrip = ({ newTripModalRef, tripActivitesModal }) => {
  const [gradient, setGradient] = useState(["#fff", "#fff", "#fff"]);

  const formik = useFormik({
    initialValues: {
      name: "",
      range: {},
      destination: "",
      travelType: "",
    },
    // validationSchema: SignInValidationSchema,
    onSubmit: async ({}, methods) => {
      methods.setSubmitting(true);
    },
  });

  const [open, setOpen] = useState(false);
  const [whereToModal, setWhereToModal] = useState(false);

  const modalDestinationRef = useRef(null);
  const onDestinationModalOpen = () => {
    if (Platform.OS === "android") {
      setWhereToModal(true);
    } else {
      modalDestinationRef.current?.open();
    }
  };
  const onDestinationModalClose = () => {
    if (Platform.OS === "android") {
      setWhereToModal(false);
    } else {
      modalDestinationRef.current?.close();
    }
  };

  console.log("dd", formik.values);

  return (
    <>
      <View
        style={[styles.tripModalGradient, { padding: 0 }]}
        // colors={gradient}
        // start={{ x: -1, y: 1 }}
        // end={{ x: 1, y: 0 }}
      >
        <CreateTripContent
          gradient={gradient}
          setGradient={setGradient}
          newTripModalRef={newTripModalRef}
          tripActivitesModal={tripActivitesModal}
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
          <Destination onDestinationModalClose={onDestinationModalClose}  />
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
