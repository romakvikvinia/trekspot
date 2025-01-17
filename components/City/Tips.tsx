import { Text, View } from "react-native";

import { SIZES } from "../../styles/theme";

export const Tips = ({ activeTab }) => {
  return (
    <View
      style={{
        display: activeTab === "Tips" ? "flex" : "none",
        minHeight: SIZES.height,
      }}
    >
      <Text style={{ margin: 20 }}>Tips</Text>
    </View>
  );
};
