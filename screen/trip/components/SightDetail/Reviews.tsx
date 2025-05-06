import { ScrollView, Text, View } from "react-native";

import { styles } from "./styles";

export const Reviews = ({newData}: {newData: any}) => {
  return (
    <View style={styles.reviews}>
    <Text style={styles.descriptionTitle}>Reviews</Text>
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      {newData.reviews.map((item, index) => (
        <View key={index} style={styles.review}>
          <Text style={styles.reviewText}>
            &quot;{item.review}&quot; -{" "}
            <Text style={styles.reviewAuthor}>{item.author}</Text>
          </Text>   
        </View>
      ))}
    </ScrollView>
  </View>           
  );
};