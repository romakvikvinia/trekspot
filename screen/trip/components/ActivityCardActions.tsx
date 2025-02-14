import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Text, View } from "react-native";

import { FloatingActionButton } from "../../../components/common/FloatingButtons";
import { COLORS } from "../../../styles/theme";
import { DotsIcon, NoteIcon, TrashIcon } from "../../../utilities/SvgIcons.utility";
import { tripDetailStyles } from "../_tripDetailStyles";
import { DirectionButton } from "./DirectionButton";
import { FilesButton } from "./FilesButton";
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
        {!type && <DirectionButton item={item} />}
        <FilesButton />
      </View>

      <View style={tripDetailStyles.sightRightActions}>
        <FloatingActionButton
          buttons={[ 
            //@ts-expect-error ///
            {
              label: "Add note",
              //@ts-expect-error ///
              onPress: () =>  navigation.navigate("ActivityNoteOrDescription", {
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
});
