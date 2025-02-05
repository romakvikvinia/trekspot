import { Text, View } from "react-native";

import { styles } from "../../common/components/_styles";
import { COLORS } from "../../styles/theme";
import { StarIcon } from "../../utilities/SvgIcons.utility";
import { STI } from "./STI";
import { VisaInfoButton } from "./VisaInfoButton";

export const CityTitleRow = ({ city, securityLevel }) => {

  return (
    <View
      style={[
        {
          marginTop: 25,
          flexDirection: "row",
          justifyContent: "space-between",
          paddingHorizontal: 15,
        },
      ]}
    >
      <View style={styles.cityDetailsLeft}>
        {city?.city && (
          <View
            style={[
              [
                styles.labelItem,
                {
                  paddingLeft: 0,
                },
              ],
            ]}
          >
            <Text
              style={[
                styles.labelItemText,
                {
                  color: "#000",
                },
              ]}
              numberOfLines={1}
            >
              {city.city}
            </Text>
          </View>
        )}
        <View
          style={[
            styles.ratingLabel,
            {
              marginTop: 5,
              marginBottom: 10,
              paddingLeft: 0,
            },
          ]}
        >
          <View
            style={{
              flexDirection: "row",
            }}
          >
            <StarIcon size={15} color="#FFBC3E" />
            <Text
              style={[
                styles.ratingText,
                {
                  color: COLORS.black,
                  fontWeight: "600",
                  fontSize: 14,
                },
              ]}
            >
              {city.rate || "4.0"}
            </Text>
          </View>

          <VisaInfoButton city={city} />
         
        </View>
      </View>
      <View style={styles.cityDetailsRight}>
        <STI securityLevel={securityLevel} />
      </View>
    </View>
  );
};
