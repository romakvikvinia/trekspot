import { useNavigation } from "@react-navigation/native";
import { Pressable, Text, TouchableOpacity, View } from "react-native";

import { globalStyles } from "../../styles/globalStyles";
import { BackIcon } from "../../utilities/SvgIcons.utility";

export const ScreenHeader = ({title = ""}) => {
  const navigation = useNavigation();
  return (
    <View style={globalStyles.screenHeader}>
      <Pressable
        onPress={() => navigation.goBack()}
        style={globalStyles.screenHeaderBackButton}
        hitSlop={20}
      >
        <BackIcon size="18" />
      </Pressable>

      <Text style={globalStyles.screenTitle}>{title}</Text>
      <TouchableOpacity
        style={globalStyles.screenHeaderBackButton}
      ></TouchableOpacity>
    </View>
  );
};
