import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { tripDetailStyles } from "../_tripDetailStyles";
import { VisitedButton } from "./VisitedButton";
import { DotsIcon, MapDirection } from "../../../utilities/SvgIcons.utility";
import { COLORS } from "../../../styles/theme";
import { DirectionButton } from "./DirectionButton";

type ActivityCardActionsProps = {
  item: any;
  handleChangeActivityVisited: () => void;
  checkedIn: boolean;
  index: number;
  onQuestionModalOpen: (id: string) => void;
};

export const ActivityCardActions = ({
  item,
  handleChangeActivityVisited,
  checkedIn,
  index,
  onQuestionModalOpen
}: ActivityCardActionsProps) => {
  return (
    <View style={[tripDetailStyles.sightBottomActions, styles.bottomActions, {
      backgroundColor: checkedIn ?  "#fffcf5" : "#fff"
    }]}>
      <View style={styles.leftSideButtons}>
        <VisitedButton
          handleChangeActivityVisited={handleChangeActivityVisited}
          checkedIn={checkedIn}
          index={index}
        />
        <DirectionButton item={item}/>
      </View>

      <View style={tripDetailStyles.sightRightActions}>
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
    paddingVertical: 6, 
    backgroundColor: "#fbfbfb",
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  leftSideButtons: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
  }
});
