import moment from "moment";
import { useRef, useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { ScrollView } from "react-native";
import { Modalize } from "react-native-modalize";
import { Portal } from "react-native-portalize";
import { COLORS } from "../../../styles/theme";
import {
  CalendarFilledCheckedIcon,
  CalendarFilledIcon,
  CirclePin,
  LocationPin,
  SeatIcon,
  USDIcon,
} from "../../../utilities/SvgIcons.utility";
import { ActivityIcon } from "../ActivityList";
import { RangePicker } from "../RangePicker";
import { styles } from "../_styles";
import { ExpenseInput } from "./ExpenseInput";
import { PlaceSearch } from "./PlaceSearch";
import { SeatInput } from "./SeatInput";

const Transportation = ({ activeActivity, activities, refPagerView }) => {
  const [open, setOpen] = useState(null);
  const [range, setRange] = useState({
    startDate: undefined,
    endDate: undefined,
  });
  const [place, setPlace] = useState({
    from: "",
    to: "",
  });
  const modalSearchAutocompleteRef = useRef(null);
  const modalSeatRef = useRef(null);
  const modalExpensesRef = useRef(null);

  const onSearchAutocompleteOpen = () => {
    modalSearchAutocompleteRef.current?.open();
  };
  const onSeatOpen = () => {
    modalSeatRef.current?.open();
  };
  const onExpensesOpen = () => {
    modalExpensesRef.current?.open();
  };

  return (
    <>
      <View style={styles.activityTopRow}>
        <TouchableOpacity
          style={styles.backToPrevSlide}
          onPress={() => refPagerView?.current?.setPage("0")}
          activeOpacity={0.5}
        >
          <Text style={styles.backToPrevSlideText}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.activityTitle}>Transport</Text>
        <TouchableOpacity style={styles.saveButton} activeOpacity={0.5}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={[styles.addActivityWrapper, { minHeight: 700 }]}>
        <View style={styles.addActivityHeader}>
          <View
            style={[
              styles.addActivityHeaderIcon,
              { backgroundColor: activities[activeActivity]?.color },
            ]}
          >
            <ActivityIcon index={activeActivity} />
          </View>
          <TextInput
            placeholderTextColor={COLORS.gray}
            placeholder="Title"
            style={styles.addActivityTitleInput}
          />
        </View>
        <View style={styles.addActivityFromToBox}>
          <View style={styles.fromToLine}></View>
          <TouchableOpacity
            style={[
              styles.AddActivityFromTo,
              {
                borderBottomWidth: 1,
                borderBottomColor: COLORS.lightGray,
              },
            ]}
            activeOpacity={0.5}
            onPress={() => onSearchAutocompleteOpen()}
          >
            <View style={styles.addActivityFromToIn}>
              <CirclePin />
              <View style={styles.addActivityFromToText}>
                <Text style={styles.addActivityFromToLabel}>From</Text>
                {place?.from ? (
                  <Text numberOfLines={1} style={styles.addActivityFromToValue}>
                    {place?.from}
                  </Text>
                ) : null}
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.AddActivityFromTo}
            activeOpacity={0.5}
          >
            <View style={styles.addActivityFromToIn}>
              <LocationPin color="#666361" />
              <View style={styles.addActivityFromToText}>
                <Text style={styles.addActivityFromToLabel}>To</Text>
                <Text style={styles.addActivityFromToValue}>
                  Batumi, Georgia
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.addActivityFromToDateBox}>
          <TouchableOpacity
            activeOpacity={0.5}
            style={styles.addActivityFromToDate}
            onPress={() => setOpen(true)}
          >
            <CalendarFilledIcon color="#666361" />
            {range?.startDate ? (
              <Text style={styles.addActivityFromToDateLabel}>
                {moment(range?.startDate).format("dd DD MMM")}
              </Text>
            ) : (
              <Text style={styles.addActivityFromToDateLabel}>Departure</Text>
            )}
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.5}
            style={styles.addActivityFromToDate}
            onPress={() => setOpen(true)}
          >
            <CalendarFilledCheckedIcon color="#666361" />
            {range?.endDate ? (
              <Text style={styles.addActivityFromToDateLabel}>
                {moment(range?.endDate).format("dd DD MMM")}
              </Text>
            ) : (
              <Text style={styles.addActivityFromToDateLabel}>Arrival</Text>
            )}
          </TouchableOpacity>
        </View>
        <View style={styles.addActivityOthers}>
          <TouchableOpacity
            onPress={() => onSeatOpen()}
            activeOpacity={0.5}
            style={styles.addActivitySeat}
          >
            <SeatIcon color="#666361" />
            <Text style={styles.addActivitySeatLabel}>Seat</Text>
            <Text style={styles.addActivitySeatLabelValue}>13</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.5}
            style={styles.addActivityExpenses}
            onPress={() => onExpensesOpen()}
          >
            <USDIcon color="#666361" />
            <Text style={styles.addActivityExpensesLabel}>Expanses</Text>
            <Text style={styles.addActivityExpensesLabelValue}>15</Text>
          </TouchableOpacity>
        </View>
        {/* <TouchableOpacity style={styles.addActivityFiles}>
      <FileIcon color="#666361" />
      <Text style={styles.addActivityFilesLabel}>Upload file</Text>
    </TouchableOpacity> */}
      </ScrollView>
      <RangePicker
        range={range}
        setRange={setRange}
        open={open}
        setOpen={setOpen}
      />
      <Portal>
        <Modalize
          ref={modalSearchAutocompleteRef}
          modalTopOffset={65}
          scrollViewProps={{
            alwaysBounceVertical: false,
            showsVerticalScrollIndicator: false,
          }}
          modalStyle={{
            backgroundColor: "#F2F2F7",
          }}
        >
          <PlaceSearch
            setPlace={setPlace}
            modalSearchAutocompleteRef={modalSearchAutocompleteRef}
          />
        </Modalize>
      </Portal>

      <Portal>
        <Modalize
          ref={modalSeatRef}
          modalTopOffset={65}
          scrollViewProps={{
            alwaysBounceVertical: false,
            showsVerticalScrollIndicator: false,
          }}
          modalStyle={{
            backgroundColor: "#F2F2F7",
          }}
        >
          <SeatInput modalSeatRef={modalSeatRef} />
        </Modalize>
      </Portal>
      <Portal>
        <Modalize
          ref={modalExpensesRef}
          modalTopOffset={65}
          scrollViewProps={{
            alwaysBounceVertical: false,
            showsVerticalScrollIndicator: false,
          }}
          modalStyle={{
            backgroundColor: "#F2F2F7",
          }}
        >
          <ExpenseInput modalExpensesRef={modalExpensesRef} />
        </Modalize>
      </Portal>
    </>
  );
};
export default Transportation;
