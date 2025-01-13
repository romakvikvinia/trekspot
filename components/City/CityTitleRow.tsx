import { Text, View } from "react-native";

import { styles } from "../../common/components/_styles";
import { StarIcon } from "../../utilities/SvgIcons.utility";
import { STI } from "./STI";

export const CityTitleRow = ({ city }) => {
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
          {city?.rate && (
            <>
              <View
                style={{
                  position: "relative",
                  top: 0,
                  opacity: 0.8,
                }}
              >
                <StarIcon size={18} color="#FFBC3E" />
              </View>
              <Text
                style={[
                  styles.ratingText,
                  {
                    color: "#000",
                    fontWeight: "600",
                    fontSize: 16,
                  },
                ]}
              >
                {city.rate}{" "}
              </Text>
            </>
          )}
          {city?.visitors && (
            <Text style={styles.ratingText}>/{city?.visitors} visitors</Text>
          )}
        </View>
      </View>
      <View style={styles.cityDetailsRight}>
          <STI />
      </View>
    </View>
  );
};
