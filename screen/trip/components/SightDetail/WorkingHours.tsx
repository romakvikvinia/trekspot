import { useRef } from "react";
import { Pressable, Text, View } from "react-native";
import { Portal } from "react-native-portalize";

import { WorkingHoursContent } from "../../../../common/components/WorkingHoursContent";
import BottomSheetScrollView, { BottomSheetMethods } from "../../../../common/Sheet";
import { COLORS } from "../../../../styles/theme";
import { ClockLinearIcon } from "../../../../utilities/SvgIcons.utility";
import { styles } from "./styles";
export const WorkingHours = ({ newData }: { newData: any }) => {

  const bottomSheetRef = useRef<BottomSheetMethods>(null);

  return (
    <>
      <Pressable
        style={({ pressed }) => [styles.row, { opacity: pressed ? 0.5 : 1 }]}
        onPress={() => bottomSheetRef.current?.expand()}
      >
        <View style={styles.icon}>
          <ClockLinearIcon color="#000" size={25} />
        </View>
        <View style={styles.value}>
          <Text style={styles.valueLabelText}>Working Hours</Text>
          <View style={styles.workingHoursContainer}>
            <Text style={[styles.statusText, { color: COLORS.green }]}>
              Open
            </Text>
            <Text style={styles.workingHoursText}>• Closes at 18:00</Text>
            <Text style={styles.more}>Other days</Text>
          </View>
        </View>
      </Pressable>

      <Portal>
        <BottomSheetScrollView
          snapTo={"60%"}
          backgroundColor="#fff"
          backDropColor="#000"
          ref={bottomSheetRef}
        >
         <WorkingHoursContent />
        </BottomSheetScrollView>
      </Portal>
    </>
  );
};

