import { useNavigation } from "@react-navigation/native";
import { Pressable, Text, View } from "react-native";

import { FloatingActionButton } from "../../../../components/common/FloatingButtons";
import { globalStyles } from "../../../../styles/globalStyles";
import {
  BackIcon,
  DotsVerticlIcon,
  EditIcon,
  TrashIcon,
} from "../../../../utilities/SvgIcons.utility";

export const NormalHeader = ({ title = "" }) => {
  const navigation = useNavigation();
 
  const handleEdit = () => {
    navigation.navigate("RouteScreen",{
        isPreview: false
    });
  }

  return (
    <View style={[globalStyles.screenHeader, {
      position: "relative",
      zIndex: 1
    }]}>
      <Pressable
        onPress={() => navigation.goBack()}
        style={[globalStyles.screenHeaderBackButton, {
          marginLeft: -10
        }]}
        hitSlop={30}
      >
        <BackIcon size="18" />
      </Pressable>

      <Text style={[globalStyles.screenTitle, {
        textTransform: "capitalize"
      }]}>{title}</Text>

      <FloatingActionButton
        buttons={[
          {
            label: "Edit",
            onPress: () => handleEdit(),
            icon: EditIcon,
            isDanger: false,
          },
          {
            label: "Delete activity",
            onPress: () => console.log(),
            icon: TrashIcon,
            isDanger: true,
          },
        ]}
        renderTrigger={() => (
          <View style={{width: 30, marginRight: -10}}>
            <DotsVerticlIcon color="#000" size={15} />
          </View>
        )}
      />
    </View>
  );
};
