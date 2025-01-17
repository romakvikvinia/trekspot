import { View } from "react-native";

import { Dining } from "../../common/components/Destination/Dining";
import { SIZES } from "../../styles/theme";

export const NationalDishes = ({ iso2, activeTab }) => {
  return (
    <View
      style={{
        display: activeTab === "National dishes" ? "flex" : "none",
        minHeight: SIZES.height,
      }}
    >
      <Dining iso2={iso2} />
    </View>
  );
};
