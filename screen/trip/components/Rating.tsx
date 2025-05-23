import { Text, View } from "react-native";

import { StarIcon } from "../../../utilities/SvgIcons.utility";
import { tripDetailStyles } from "../_tripDetailStyles";

export const Rating = ({ data, weight = "400", color = "#000" }: { data: { rate: number }, weight?: string, color?: string }) => {
  return (
    <View style={tripDetailStyles.ratingLabel}>
      <View
        style={{
          position: "relative",
          marginRight: 3,
          top: -1,
        }}
      >
        <StarIcon color="#FFBC3E" />
      </View>
      <Text style={[tripDetailStyles.ratingText, { fontWeight: weight, color: color }]}>{data?.rate}</Text>
    </View>
  );
};
