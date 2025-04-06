import { Platform, Pressable, StyleSheet, Text, View } from "react-native";

import { FloatingActionButton } from "../../../components/common/FloatingButtons";
import { useTripStore } from "../../../package/zustand/store";
import { COLORS } from "../../../styles/theme";
import {
  LeftTriangle,
  LocationPin,
  UpDownIcon,
} from "../../../utilities/SvgIcons.utility";

type HeaderTextContentProps = {
  data: any;
};

export const HeaderTextContent = ({ data }: HeaderTextContentProps) => {

  const { destinationSwitcherTooltip, setDestinationSwitcherTooltip } = useTripStore((state) => ({
    destinationSwitcherTooltip: state.destinationSwitcherTooltip,
    setDestinationSwitcherTooltip: state.setDestinationSwitcherTooltip,
  }));


  return (
    <View style={styles.textContent}>
      <Text style={styles.tripTitle}>{data?.name}</Text>
      {data?.cities?.length > 1 ? (
        <FloatingActionButton
          withHeader={true}
          title="Select city"
          //@ts-expect-error ///
          buttons={data?.cities.map((city, i) => ({
            label: city.city,
            onPress: () => {},
            icon: null,
            isDanger: false,
            isActive: false,
          }))}
          //@ts-expect-error ///
          renderTrigger={() => (
            <View style={styles.contentRowItem}>
              <View style={styles.multiCityRow}>
                <LocationPin width="13" color={COLORS.white} />
                <Text
                  style={[
                    styles.tripDestination,
                    {
                      fontSize: 15,
                      position: "relative",
                      top: 0,
                    },
                  ]}
                  numberOfLines={1}
                >
                  {data?.cities[0]?.city}{" "}
                </Text>
                <UpDownIcon size={12} color={COLORS.white} />
              </View>
              {!destinationSwitcherTooltip && (
                <Pressable style={styles.calloutBox}>
                  <View style={styles.caret}>
                    <LeftTriangle />
                  </View>
                  <Text style={styles.calloutBoxTitle}>
                    You can switch between your destinations.
                  </Text>

                  <Pressable
                    style={({ pressed }) => [
                      styles.gotItButton,
                      {
                        opacity: pressed ? 0.5 : 1,
                      },
                    ]}
                    onPress={() => setDestinationSwitcherTooltip(true)}
                  >
                    <Text style={styles.gotItButtonText}>Got it</Text>
                  </Pressable>
                </Pressable>
              )}
            </View>
          )}
        />
      ) : (
        <View style={styles.contentRowItem}>
          <LocationPin width="12" color={COLORS.white} />
          <Text
            style={[
              styles.tripDestination,
              {
                fontSize: 15,
                position: "relative",
                top: 0,
              },
            ]}
            numberOfLines={1}
          >
            {data?.cities[0]?.city}{" "}
          </Text>
        </View>
      )}

      {/* <View style={styles.contentRowItem}>
        <CalendarFilledIcon size={12} color={COLORS.white} />
        <Text style={styles.tripDestination}>
          {format(data?.startAt, "dd MMM")} - {format(data?.endAt, "dd MMM")}
        </Text>
      </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  calloutBox: {
    alignItems: "flex-end",
    backgroundColor: "#fff",
    borderRadius: 10,
    justifyContent: "flex-end",
    left: 120,
    opacity: 1,
    padding: 15,
    position: "absolute",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8.84,
    top: -40,
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
    left: -15,
    position: "absolute",
    top: 40,
  },
  contentRowItem: {
    alignItems: "center",
    flexDirection: "row",
    marginTop: 12,
    opacity: 1,
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
  multiCityRow: {
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.1)", 
    borderColor: "rgba(255,255,255,0.1)",
    borderRadius: 10,
    borderWidth: 1,
    flexDirection: "row",
    padding: 5,
    paddingHorizontal: 10,
    width: "auto",
  },
  textContent: {
    paddingHorizontal: 20,
    position: "relative",
    zIndex: 1,
  },
  tripDestination: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
    marginLeft: 8,
    marginTop: 0,
    maxWidth: "90%",
    position: "relative",
    textTransform: "capitalize",
    top: 1,
  },
  tripTitle: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
  },
});
