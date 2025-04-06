import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { useTripStore } from "../../../package/zustand/store";
import { COLORS } from "../../../styles/theme";
import {
  CheckLiteIcon,
  LeftTriangle,
} from "../../../utilities/SvgIcons.utility";
import { tripDetailStyles } from "../_tripDetailStyles";

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
          zIndex: 2,
          flexDirection: "row",
        },
      ]}
      onPress={handleChangeActivityVisited}
    >
      <View style={tripDetailStyles.iconWrapper}>
        <CheckLiteIcon
          color={checkedIn ? COLORS.black : COLORS.gray}
          width="15"
        />
      </View>
      <Text
        style={[
          tripDetailStyles.checkinButtonText,
          { color: checkedIn ? COLORS.black : COLORS.gray, marginLeft: 5 },
        ]}
      >
        Done activity
      </Text>
      {index === 0 && !isVisitedUsed && (
        <TouchableOpacity activeOpacity={1} style={styles.calloutBox}>
          <View style={styles.caret}>
            <LeftTriangle />
          </View>
          <Text style={styles.calloutBoxTitle}>
            After you mark this activity as visited, it will show up in the
            Activities section on your Insights screen.
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
    alignItems: "flex-end",
    backgroundColor: "#fff",
    borderRadius: 10,
    justifyContent: "flex-end",
    left: 50,
    opacity: 3,
    padding: 15,
    position: "absolute",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8.84,
    top: Platform.OS === "android" ? -118 : -130,
    width: 200,
    zIndex: 5,
    ...Platform.select({
      android: {
        elevation: 10,
      },
    }),
  },
  calloutBoxTitle: {
    fontSize: 14,
    fontWeight: "400",
    lineHeight: 20,
    textAlign: "left",
    width: "100%",
  },
  caret: {
    bottom: 30,
    left: -15,
    position: "absolute",
  },
  gotItButton: {
    backgroundColor: "#000",
    borderRadius: 10,
    marginTop: 15,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  gotItButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "500",
  },
});
