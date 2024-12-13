import { Pressable, Text, TouchableOpacity, View } from "react-native";
import { BackIcon } from "../../utilities/SvgIcons.utility";
import { useNavigation } from "@react-navigation/native";
import { globalStyles } from "../../styles/globalStyles";

export const ScreenHeader = ({title = ""}) => {
  const navigation = useNavigation();
  return (
    <View style={globalStyles.screenHeader}>
      <Pressable
        onPress={() => navigation.goBack()}
        style={globalStyles.screenHeaderBackButton}
        hitSlop={20}
      >
        <BackIcon size="30" />
      </Pressable>

      <Text style={globalStyles.screenTitle}>{title}</Text>
      <TouchableOpacity
        style={globalStyles.screenHeaderBackButton}
      ></TouchableOpacity>
    </View>
  );
};
