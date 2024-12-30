import { StyleSheet, Text, View } from "react-native";

import { StarIcon } from "../../../utilities/SvgIcons.utility";
import { tripDetailStyles } from "../_tripDetailStyles";

type CardContentProps = {
    item: any;
}

export const CardContent = ({ item }: CardContentProps) => {
  return (
    <View style={[tripDetailStyles.sightDetails, styles.textContent]}>
      <Text numberOfLines={2} style={tripDetailStyles.sightTitle}>
        {item?.title}
      </Text>
      <View style={tripDetailStyles.ratingLabel}>
        {item?.rate ? (
          <>
            <View
              style={{
                position: "relative",
                top: -1,
                opacity: 0.8,
                marginRight: 3,
              }}
            >
              <StarIcon color="#FFBC3E" />
            </View>
            <Text style={[tripDetailStyles.ratingText]}>{item?.rate}</Text>
          </>
        ) : null}

        <Text style={[tripDetailStyles.sightType]}>{item?.category}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  textContent: {
    flexDirection: "column",
    flex: 1,
    justifyContent: "center",
    marginTop: 0,
    paddingLeft: 15,
  },
});
