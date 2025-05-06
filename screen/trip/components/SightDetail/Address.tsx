import { Linking, Platform, Text, View } from "react-native";

import { FloatingActionButton } from "../../../../components/common/FloatingButtons";
import { DirectionLinearIcon } from "../../../../utilities/SvgIcons.utility";
import { styles } from "./styles";

export const Address = ({ newData }: { newData: any }) => {
  const openMap = (
    location: { lat: number; lng: number },
    type: "google" | "apple",
    address: string
  ) => {
    const scheme = Platform.select({
      ios: type === "google" ? "comgooglemaps://?q=" : "maps://0,0?q=",
      android: "geo:0,0?q=",
    });
    const url = Platform.select({
      ios:
        type !== "google"
          ? `${scheme}${location.lat},${location.lng}`
          : `${scheme}${address}`,
      android: `${scheme}${location.lat},${location.lng}`,
    });

    Linking.openURL(url!);
  };

  return (
    <View style={styles.row}>
      <View style={styles.icon}>
        <DirectionLinearIcon color="#000" size={25} />
      </View>
      <FloatingActionButton
        title="Open with"
        buttons={
          Platform.OS === "ios"
            ? [
                //@ts-expect-error
                {
                  label: "Google Maps",
                  onPress: () =>
                    openMap(newData?.location, "google", newData?.address),
                  icon: null,
                  isDanger: false,
                },
                //@ts-expect-error
                {
                  label: "Apple Maps",
                  onPress: () =>
                    openMap(newData?.location, "apple", newData?.address),
                  icon: null,
                  isDanger: false,
                },
              ]
            : [
                //@ts-expect-error
                {
                  label: "Google Maps",
                  onPress: () =>
                    openMap(newData?.location, "google", newData?.address),
                  icon: null,
                  isDanger: false,
                },
              ]
        }
        renderTrigger={() => (
          <View style={styles.value}>
            <Text style={styles.valueLabelText}>Address</Text>
            <Text style={styles.valueText}>
              {newData?.address} <Text style={styles.more}>Direction</Text>
            </Text>
          </View>
        )}
      />
    </View>
  );
};
