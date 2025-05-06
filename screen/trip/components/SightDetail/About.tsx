import { useState } from "react";
import { Pressable, Text } from "react-native";

import { styles } from "./styles";

export const About = ({ newData }: { newData: any }) => {
    const [showMore, setShowMore] = useState(false);
  return (
    <Pressable style={styles.descriptionRow} onPress={() => setShowMore(!showMore)}>
      <Text style={styles.descriptionTitle}>About</Text>
      <Text style={styles.descriptionText}>{showMore ? newData.description : newData.description.slice(0, 150)+"..."} <Text style={styles.more}>{showMore ? "Show less" : "Show more"}</Text></Text>
    </Pressable>
  );
};
