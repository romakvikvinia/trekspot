import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { COLORS } from "../../../styles/theme";
import {
  AttachedFileIcon,
  DotsIcon,
} from "../../../utilities/SvgIcons.utility";
import { tripDetailStyles } from "../_tripDetailStyles";
import { DirectionButton } from "./DirectionButton";
import { VisitedButton } from "./VisitedButton";

type ActivityCardActionsProps = {
  item: any;
  handleChangeActivityVisited: () => void;
  checkedIn: boolean;
  index: number;
  onQuestionModalOpen: (id: string) => void;
  type: string;
};

export const ActivityCardActions = ({
  item,
  handleChangeActivityVisited,
  checkedIn,
  index,
  onQuestionModalOpen,
  type,
}: ActivityCardActionsProps) => {
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
        {type !== "flight" && <DirectionButton item={item} />}
        <TouchableOpacity activeOpacity={0.7} style={styles.showFilesButton}>
          <View style={tripDetailStyles.iconWrapper}>
            <AttachedFileIcon size={15} color={COLORS.gray} />
          </View>
          <Text style={styles.showFilesButtonText}>Files</Text>
        </TouchableOpacity>
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
    backgroundColor: "#fbfbfb",
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    borderTopColor: "#f2f2f2",
    borderTopWidth: 1,
    marginBottom: 0,
    marginTop: 15,
    paddingVertical: 6,
  },
  leftSideButtons: {
    alignItems: "center",
    flexDirection: "row",
    flex: 1,
  },
  showFilesButton: {
    alignItems: "center",
    borderRadius: 6,
    display: "flex",
    justifyContent: "center",
    marginLeft: 6,
    paddingHorizontal: 3,
    paddingVertical: 0,
  },
  showFilesButtonText: {
    color: COLORS.gray,
    fontSize: 11,
    fontWeight: "600",
  },
});
