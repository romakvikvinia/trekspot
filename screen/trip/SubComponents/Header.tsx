import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";

import { useTripStore } from "../../../package/zustand/store";
import { ClassicHeaderContent } from "./ClassicHeaderContent";
import { ReachHeaderContent } from "./ReachHeaderContent";

type HeaderProps = {
  data: any;
  onQuestion2ModalOpen: () => void;
  iso2: string;
  tabData: any;
  activeDay: number;
};

export const Header = ({
  data,
  onQuestion2ModalOpen,
  iso2,
  tabData,
  activeDay,
}: HeaderProps) => {
  const { tripStyle } = useTripStore((state) => ({
    tripStyle: state.tripStyle,
  }));
  return (
    <View style={[styles.mapHeaderContainer]}>
      <StatusBar style="light" />
      {!tripStyle && (
        <ReachHeaderContent
          data={data}
          iso2={iso2}
          tabData={tabData}
          onQuestion2ModalOpen={onQuestion2ModalOpen}
          activeDay={activeDay}
        />
      )}
      {tripStyle && (
        <ClassicHeaderContent
          data={data}
          iso2={iso2}
          onQuestion2ModalOpen={onQuestion2ModalOpen}
        />
      )}

      {/* {!tripStyle && (
        <View style={styles.tripDetailsHeader}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: "100%",
              paddingHorizontal: 20,
            }}
          >
            <View style={styles.leftSide}>
              <Text style={styles.tripName}>{data?.name}</Text>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: 10,
                }}
              >
                <LocationPin width="12" color={COLORS.gray} />
                <Text style={styles.tripDestination}>
                  {data?.cities[0]?.city}
                </Text>
              </View>
            </View>
            <View style={styles.rightSide}>
              <TouchableOpacity
                onPress={() => onQuestion2ModalOpen()}
                style={styles.editButton}
                activeOpacity={0.7}
              >
                <DotsIcon color="" />
              </TouchableOpacity>
              <View style={styles.bottomActions}>
                <Text style={styles.tripDestination}>
                  {data && format(data?.startAt, "dd MMM")} -{" "}
                  {data && format(data?.endAt, "dd MMM")} | {data?.type}
                </Text>
              </View>
            </View>
          </View>
          <TripHelpers data={data} iso2={iso2} />
        </View>
      )} */}
    </View>
  );
};
const styles = StyleSheet.create({
  mapHeaderContainer: {
    position: "relative",
  },
});
