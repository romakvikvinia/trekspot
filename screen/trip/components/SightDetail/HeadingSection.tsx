import { Text, View } from "react-native";

import { COLORS } from "../../../../styles/theme";
import { Rating } from "../Rating";
import { styles } from "./styles";

export const HeadingSection = ({
  data,
  newData,
}: {
  data: any;
  newData: any;
}) => {
  return (
    <>
      <Text style={styles.title}>{data?.title}</Text>
      <View style={styles.titleBottomRow}>
        <Rating data={{ rate: newData.rate }} color={COLORS.darkgray} weight="500" />
        <Text> · </Text>
        <Text style={styles.text}>{newData.category}</Text>
        <Text> · </Text>
        <Text style={styles.text}>{newData.city}</Text>

        <View
          style={[
            styles.facts,
            {
              backgroundColor: "#fffaea",
              marginTop: 32,
              padding: 15,
            },
          ]}
        >
          <Text style={styles.factsTitle}>💡Tips</Text>
          {newData?.tips.map((item, index) => (
            <Text key={index} style={styles.factText}>
              - {item}
            </Text>
          ))}
        </View>
      </View>
    </>
  );
};
