import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { tripDetailStyles } from "../_tripDetailStyles";
import {
  CheckLiteIcon,
  LeftTriangle,
} from "../../../utilities/SvgIcons.utility";
import { COLORS } from "../../../styles/theme";
import { useTripStore } from "../../../package/zustand/store";

type VisitedButtonProps = {
  handleChangeActivityVisited: () => void;
  checkedIn: boolean;
  index: number;
};

export const VisitedButton = ({
  handleChangeActivityVisited,
  checkedIn,
  index,
}: VisitedButtonProps) => {
  const { isVisitedUsed, setVisitedUsed } = useTripStore((state) => ({
    isVisitedUsed: state.isVisitedUsed,
    setVisitedUsed: state.setVisitedUsed,
  }));

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={[
        tripDetailStyles.sightRightActionsButton,
        {
          marginLeft: -3,
        },
      ]}
      onPress={handleChangeActivityVisited}
    >
      <View style={tripDetailStyles.iconWrapper}>
        <CheckLiteIcon
          color={checkedIn ? COLORS.primary : COLORS.gray}
          width="15"
        />
      </View>
      <Text
        style={[
          tripDetailStyles.checkinButtonText,
          { color: checkedIn ? COLORS.primary : COLORS.gray },
        ]}
      >
        Visited
      </Text>
      {index === 0 && !isVisitedUsed && (
        <TouchableOpacity activeOpacity={1} style={styles.calloutBox}>
          <View style={styles.caret}>
            <LeftTriangle />
          </View>
          <Text style={styles.calloutBoxTitle}>
            Once you mark this activity as visited, it will appear in the
            Activities section on the Insights screen.
          </Text>

          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.gotItButton}
            onPress={() => setVisitedUsed(true)}
          >
            <Text style={styles.gotItButtonText}>Got it</Text>
          </TouchableOpacity>
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  calloutBox: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    zIndex: 5,
    left: 90,
    top: -120,
    width: 200,
    opacity: 3,
    justifyContent: "flex-end",
    alignItems: "flex-end",
    position: "absolute",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8.84,
    ...Platform.select({
      android: {
        elevation: 5,
      },
    }),
  },
  caret: {
    position: "absolute",
    left: -15,
    bottom: 30,
  },
  calloutBoxTitle: {
    fontSize: 16,
    fontWeight: "400",
    textAlign: "left",
    width: "100%",
  },
  gotItButton: {
    backgroundColor: "#000",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 15,
  },
  gotItButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "500",
  },
});
