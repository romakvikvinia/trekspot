import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Text, View } from "react-native";

import { FloatingActionButton } from "../../../components/common/FloatingButtons";
import { COLORS } from "../../../styles/theme";
import { CostIcon, DescriptionIcon, DotsIcon, NoteIcon, TrashIcon } from "../../../utilities/SvgIcons.utility";
import { tripDetailStyles } from "../_tripDetailStyles";
import { VisitedButton } from "./VisitedButton";

type ActivityCardActionsProps = {
  item: any;
  handleChangeActivityVisited: () => void;
  checkedIn: boolean;
  index: number;
  deleteActivityTrigger: (id: string) => void;
  type: string;
};

export const ActivityCardActions = ({
  item,
  handleChangeActivityVisited,
  checkedIn,
  index,
  deleteActivityTrigger,
  type,
}: ActivityCardActionsProps) => {
  const navigation = useNavigation();
  return (
    <View
      style={[
        tripDetailStyles.sightBottomActions,
        styles.bottomActions,
        {
          backgroundColor: checkedIn ? "#fffcf5" : "#fff",
        },
      ]}
    >
      <View style={styles.leftSideButtons}>
        <VisitedButton
          handleChangeActivityVisited={handleChangeActivityVisited}
          checkedIn={checkedIn}
          index={index}
        />
        {/* {!type && <DirectionButton item={item} />} */}
        {/* <FilesButton /> */}
        <View style={styles.priceWrapper}>
          <Text style={styles.price}>- 800 USD</Text>
        </View>
      </View>

      <View style={tripDetailStyles.sightRightActions}>
        <FloatingActionButton
          buttons={[
            //@ts-expect-error ///
            {
              label: "Add expenses",
              //@ts-expect-error ///
              onPress: () => navigation.navigate("ActivityExpenses"),
              icon: CostIcon,
              isDanger: false,
            },
            //@ts-expect-error ///
            {
              label: "Add description",
              //@ts-expect-error ///
              onPress: () =>
                navigation.navigate("ActivityNoteOrDescription", {
                  type: "description",
                }),
              icon: DescriptionIcon,
              isDanger: false,
            },
            //@ts-expect-error ///
            {
              label: "Add note",
              //@ts-expect-error ///
              onPress: () =>
                navigation.navigate("ActivityNoteOrDescription", {
                  type: "note",
                }),
              icon: NoteIcon,
              isDanger: false,
            },
            //@ts-expect-error ///
            {
              label: "Delete activity",
              onPress: () => deleteActivityTrigger(item.id),
              icon: TrashIcon,
              isDanger: true,
            },
          ]}
          //@ts-expect-error ///
          renderTrigger={() => (
            <View style={{ width: 30, marginRight: -5 }}>
              <View style={tripDetailStyles.iconWrapper}>
                <DotsIcon color={COLORS.gray} />
              </View>
              <Text style={tripDetailStyles.actionTitle}>More</Text>
            </View>
          )}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  bottomActions: {
    backgroundColor: "#fbfbfb",
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    borderTopColor: "#f2f2f2",
    borderTopWidth: 1,
    marginBottom: 0,
    marginTop: 15,
    paddingVertical: 5,
  },
  leftSideButtons: {
    alignItems: "center",
    flexDirection: "row",
    flex: 1,
  },
  price: {
    color: "#dd4343",
    fontSize: 12,
    fontWeight: "600",
    marginLeft: 0,
  },
  priceWrapper: {
    backgroundColor: "#fff4f4",
    borderRadius: 6,
    marginLeft: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
  }
});
