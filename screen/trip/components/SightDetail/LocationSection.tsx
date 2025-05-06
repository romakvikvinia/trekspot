import { useState } from "react";
import { Image,Text, View } from "react-native";

import { styles } from "./styles";

export const LocationSection = ({ data }: { data: any }) => {
  const [mapUrl, setMapUrl] = useState(null);
  const [loading, setLoading] = useState(true);

//   const apiKey = "AIzaSyDKZ8yCRk84OAV-57khymju5GI8Vhu4EGY";
//   const icon = "https://i.ibb.co/N6qgNqh5/Group-612-2.png";

//   useEffect(() => {
//     const staticMapUrl = `https://maps.googleapis.com/maps/api/staticmap?center=41.7006,44.8083&zoom=14&size=600x300&scale=2&markers=icon:${icon}|41.7006,44.8083&style=feature:all|element:geometry.fill|color:0xf5f5f3&style=feature:water|color:0xc8e1e8&style=feature:landscape.natural.landcover|color:0xd2eca1&style=feature:road|element:geometry|color:0xffffff&style=feature:road|element:labels|visibility:on&style=feature:poi|visibility:off&style=feature:transit|visibility:off&key=${apiKey}
//   `;
//     // const staticMapUrl2 = `https://api.mapbox.com/styles/v1/mapbox/light-v10/static/pin-s-attraction+285A98(41.7006,44.8083)/41.7006,44.8083,10/600x400?access_token=pk.eyJ1IjoiYWRvbyIsImEiOiJjbTk1cWtnMXExY3N3MmtxdHkyNnVhZXg0In0.hSTRiyKVew59zLeCbkoWwg&attribution=false&logo=false`;
//     setMapUrl(staticMapUrl);
//     setLoading(false);
//   }, []);

  return (
    <View style={styles.rowItem}>
      <View style={styles.rowHeader}>
        <Text style={styles.rowHeaderText}>Location</Text>
      </View>
      <View style={styles.locationContainer}>
        <Image
          source={{ uri: null }}
          style={{ width: "100%", height: 250, borderRadius: 10, backgroundColor: "#ccc" }}
        />
      </View>
      <View style={styles.facts}>
        <Text style={styles.factsTitle}>📍How to get there</Text>
        {data?.howToGetThere.map((item: any, index: any) => (
          <Text key={index} style={styles.factText}>
            - {item}
          </Text>
        ))}
      </View>
    </View>
  );
};
