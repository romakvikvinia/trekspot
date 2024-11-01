import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { tripDetailStyles } from "../_tripDetailStyles";
import { VisitedButton } from "./VisitedButton";
import { DotsIcon, MapDirection } from "../../../utilities/SvgIcons.utility";
import { COLORS } from "../../../styles/theme";

type ActivityCardActionsProps = {
    item: any,
    onQuestionModalOpen: () => void,
    openMap: () => void,
    handleChangeActivityVisited: () => void,
    checkedIn: boolean,
    index: number,
} 

export const ActivityCardActions = ({
  item,
  onQuestionModalOpen,
  openMap,
  handleChangeActivityVisited,
  checkedIn,
  index,
}: ActivityCardActionsProps) => {
  return (
    <View style={[tripDetailStyles.sightBottomActions, styles.bottomActions]}>
      <VisitedButton
        handleChangeActivityVisited={handleChangeActivityVisited}
        checkedIn={checkedIn}
        index={index}
      />

      <View style={tripDetailStyles.sightRightActions}>
        <TouchableOpacity
          style={tripDetailStyles.sightRightActionsButton}
          activeOpacity={0.7}
          onPress={() => openMap(item?.title)}
        >
          <View style={tripDetailStyles.iconWrapper}>
            <MapDirection width="15" color={COLORS.gray} />
          </View>

          <Text style={tripDetailStyles.actionTitle}>Direction</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => onQuestionModalOpen(item.id)}
          style={[
            tripDetailStyles.sightRightActionsButton,
            {
              marginRight: -5,
            },
          ]}
          activeOpacity={0.7}
        >
          <View style={tripDetailStyles.iconWrapper}>
            <DotsIcon color={COLORS.gray} />
          </View>
          <Text style={tripDetailStyles.actionTitle}>More</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  bottomActions: {
    marginTop: 15,
    marginBottom: 0,
    borderTopColor: "#f2f2f2",
    borderTopWidth: 1,
    paddingVertical: 5,
  },
});
