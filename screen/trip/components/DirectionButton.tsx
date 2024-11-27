import { Linking, Platform, Text, TouchableOpacity, View } from "react-native";
import { tripDetailStyles } from "../_tripDetailStyles";
import {
  AppleMaps,
  GoogleMaps,
  MapDirection,
} from "../../../utilities/SvgIcons.utility";
import { COLORS } from "../../../styles/theme";
import { Portal } from "react-native-portalize";
import { Modalize } from "react-native-modalize";
import { QuestionModal } from "../../../common/components/QuestionModal";
import { questionModaStyles } from "../../../styles/questionModaStyles";
import { useRef } from "react";
import { usePostHog } from "posthog-react-native";
import { Events } from "../../../utilities/Posthog";

type DirectionButtonProps = {
    item: any;
}

export const DirectionButton = ({item}: DirectionButtonProps) => {
  const posthog = usePostHog();
  const modalQuestionRef = useRef<Modalize>(null);

  const openGoogleMaps = (title: string) => {
    const scheme = "https://maps.google.com/?q=";
    const url = `${scheme}${title}`;

    Linking.openURL(url!);
  }

  const openIOsMaps = (title: string) => {
    const scheme = "maps://0,0?q=";
    const url = `${scheme}${title}`;

    Linking.openURL(url!);
  }

  const handleDirection = (title: string) => {
    posthog.capture(Events.UserUsesDirectionMaps, {});
    if(Platform.OS === "ios") {
        modalQuestionRef.current?.open();
    } else {
        openGoogleMaps(title);
    }
  }
 
  return (
    <>
      <TouchableOpacity
        style={tripDetailStyles.sightRightActionsButton}
        activeOpacity={0.7}
        onPress={() => handleDirection(item?.title)}
      >
        <View style={tripDetailStyles.iconWrapper}>
          <MapDirection width="15" color={COLORS.gray} />
        </View>

        <Text style={tripDetailStyles.actionTitle}>Direction</Text>
      </TouchableOpacity>
      <Portal>
        <Modalize
          ref={modalQuestionRef}
          modalTopOffset={65}
          disableScrollIfPossible
          adjustToContentHeight
          velocity={100000}
          tapGestureEnabled={false}
          closeSnapPointStraightEnabled={false}
          modalStyle={{
            backgroundColor: "#F2F2F7",
            minHeight: "30%",
          }}
          scrollViewProps={{
            showsVerticalScrollIndicator: false,
          }}
        >
          <QuestionModal
            onClose={() => {
              if (modalQuestionRef.current) modalQuestionRef.current.close();
            }}
            title="Open with"
          >
            <View style={questionModaStyles.buttonGroup}>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => openGoogleMaps(item?.title)}
                style={[questionModaStyles.button]}
              >
                <Text style={[questionModaStyles.buttonText]}>Google maps</Text>
                <GoogleMaps size="25" />
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => openIOsMaps(item?.title)}
                style={[questionModaStyles.button, { borderBottomWidth: 0 }]}
              >
                <Text style={[questionModaStyles.buttonText]}>Apple maps</Text>
                <AppleMaps size="25" />
              </TouchableOpacity>
            </View>
          </QuestionModal>
        </Modalize>
      </Portal>
    </>
  );
};
