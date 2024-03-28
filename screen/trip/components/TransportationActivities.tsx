import { useRef, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Modalize } from "react-native-modalize";
import { Portal } from "react-native-portalize";
import { QuestionModal } from "../../../common/components/QuestionModal";
import { questionModaStyles } from "../../../styles/questionModaStyles";
import { COLORS } from "../../../styles/theme";
import {
  BusIcon,
  CirclePin,
  DotsIcon,
  EditIcon,
  LocationPin,
  TrashIcon,
  XIcon,
} from "../../../utilities/SvgIcons.utility";

const TransportationActivities = ({ modalTransportationActivitiesRef }) => {
  const modalQuestionRef = useRef(null);

  const onModalQuestion = () => {
    modalQuestionRef.current?.open();
  };

  return (
    <>
      <View style={styles.activityHeader}>
        <View style={styles.activityHeaderLeft}>
          <View style={styles.activityIcon}>
            <BusIcon color="#fff" />
          </View>
          <View style={styles.activityTitles}>
            <Text style={styles.tripName}>My trip</Text>
            <Text style={styles.activityName}>Transport</Text>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => modalTransportationActivitiesRef?.current?.close()}
          activeOpacity={0.7}
          style={styles.closeButton}
        >
          <XIcon width="12" />
        </TouchableOpacity>
      </View>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          paddingHorizontal: 15,
        }}
      >
        <View style={styles.activityListItem}>
          <View style={styles.activityListItemLeft}>
            <Text style={styles.activityListItemTitle}>To Bali</Text>
            <View style={styles.fromToElement}>
              <CirclePin width="12" />
              <Text style={styles.fromToLabel}> Tbilisi - </Text>
              <LocationPin color="#666361" width="12" />
              <Text style={styles.fromToLabel}>Bali</Text>
            </View>
            <Text style={styles.dateLabel}>Tue, 05 Feb - Tue, 05 Feb</Text>
          </View>
          <TouchableOpacity
            onPress={() => onModalQuestion()}
            activeOpacity={0.7}
            style={styles.optionButton}
          >
            <DotsIcon />
          </TouchableOpacity>
        </View>
        <View style={styles.activityListItem}>
          <View style={styles.activityListItemLeft}>
            <Text style={styles.activityListItemTitle}>Batumi</Text>
            <View style={styles.fromToElement}>
              <CirclePin width="12" />
              <Text style={styles.fromToLabel}> Tbilisi - </Text>
              <LocationPin color="#666361" width="12" />
              <Text style={styles.fromToLabel}>Bali</Text>
            </View>
            <Text style={styles.dateLabel}>Tue, 05 Feb - Tue, 05 Feb</Text>
          </View>
          <TouchableOpacity activeOpacity={0.7} style={styles.optionButton}>
            <DotsIcon />
          </TouchableOpacity>
        </View>
        <View style={styles.activityListItem}>
          <View style={styles.activityListItemLeft}>
            <Text style={styles.activityListItemTitle}>To Bali</Text>
            <View style={styles.fromToElement}>
              <CirclePin width="12" />
              <Text style={styles.fromToLabel}> Tbilisi - </Text>
              <LocationPin color="#666361" width="12" />
              <Text style={styles.fromToLabel}>Bali</Text>
            </View>
            <Text style={styles.dateLabel}>Tue, 05 Feb - Tue, 05 Feb</Text>
          </View>
          <TouchableOpacity activeOpacity={0.7} style={styles.optionButton}>
            <DotsIcon />
          </TouchableOpacity>
        </View>
      </ScrollView>

      <Portal>
        <Modalize
          ref={modalQuestionRef}
          modalTopOffset={65}
          disableScrollIfPossible
          adjustToContentHeight
          velocity={100000}
          tapGestureEnabled={false}
          closeSnapPointStraightEnabled={false}
          modalStyle={{
            backgroundColor: "#F2F2F7",
            minHeight: "30%",
          }}
          scrollViewProps={{
            showsVerticalScrollIndicator: false,
          }}
        >
          <QuestionModal modalQuestionRef={modalQuestionRef} title="Action">
            <View style={questionModaStyles.buttonGroup}>
              <TouchableOpacity
                activeOpacity={0.7}
                style={[questionModaStyles.button]}
              >
                <Text style={questionModaStyles.buttonText}>Edit</Text>
                <EditIcon size="15" />
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.7}
                style={[questionModaStyles.button, { borderBottomWidth: 0 }]}
              >
                <Text style={[questionModaStyles.buttonText, { color: "red" }]}>
                  Delete
                </Text>
                <TrashIcon size="15" />
              </TouchableOpacity>
            </View>
          </QuestionModal>
        </Modalize>
      </Portal>
    </>
  );
};
export default TransportationActivities;

const styles = StyleSheet.create({
  activityListItem: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  optionButton: {
    padding: 10,
    paddingRight: 0,
  },
  fromToLabel: {
    fontSize: 14,
    color: COLORS.black,
    marginLeft: 2,
  },
  dateLabel: {
    fontSize: 14,
    fontWeight: "400",
    opacity: 0.8,
  },
  fromToElement: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  activityListItemTitle: {
    fontSize: 18,
    color: COLORS.black,
    fontWeight: "600",
    marginBottom: 10,
  },
  activityListItemLeft: {
    flexDirection: "column",
  },
  activityHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 15,
    marginBottom: 15,
  },
  activityHeaderLeft: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },
  activityTitles: {
    flexWrap: "wrap",
  },
  activityIcon: {
    width: 40,
    height: 40,
    backgroundColor: "#625E5C",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
    marginRight: 10,
  },
  tripName: {
    fontSize: 14,
    color: COLORS.darkgray,
    marginBottom: 2,
  },
  activityName: {
    color: COLORS.black,
    fontSize: 18,
    fontWeight: "500",
  },
  closeButton: {
    backgroundColor: "#DBDBDB",
    width: 30,
    height: 30,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
});
