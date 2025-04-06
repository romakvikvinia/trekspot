import { Pressable, ScrollView, StyleSheet, Text } from "react-native";
import { View } from "react-native";

import { COLORS } from "../../../styles/theme";
import { CityIcon, MinusIcon } from "../../../utilities/SvgIcons.utility";

 
const randomLightColors = [  
  "#FFE4E1",
  "#e7fae7",
  "#eaeaf5",
  "#F0F0F0",
  "#faf5e8",
  "#F5F5F5",
  "#F0FFFF",
  "#FAF0E6",
  "#FFF5EE",
];

export const SelectedDestinations = ({ tripData, setTripData }) => {
  const handleRemove = (name) => {
    const updatedDestinations = tripData.destinations.filter(
      (item) => item.destination.name !== name
    );
    setTripData({ ...tripData, destinations: updatedDestinations });
  };
  console.log(tripData);
  return (
    <View style={styles.selectedContainer}>
      <Text style={styles.title}>Selected Destinations</Text>
      <ScrollView 
        style={{ flex: 1}} 
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}>
        {tripData?.destinations?.map((item) => (
          <Pressable style={styles.suggestionItem} key={item.id}>
            <View style={styles.suggestionItemIcon}>
              <View
                style={[
                  styles.icon,
                  {
                    backgroundColor:
                      randomLightColors[
                        Math.floor(Math.random() * randomLightColors.length)
                      ],
                  },
                ]}
              >
                <CityIcon />
              </View>
              <View style={styles.suggestionMeta}>
                <Text style={styles.suggestionItemTitle} numberOfLines={1}>
                  {item.destination.name}
                </Text>
              </View>
            </View>
            <Pressable
              style={styles.removeButton}
              onPress={() => handleRemove(item.destination.name)}
            >
              <MinusIcon color="red" size={10} />
            </Pressable>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  icon: {
    alignItems: "center",
    backgroundColor: "#f2f2f2",
    borderRadius: 10,
    height: 50,
    justifyContent: "center",
    width: 50,
  },
  removeButton: {
    borderColor: COLORS.red,
    borderRadius: 100,
    borderWidth: 1,
    padding: 5,
  },
  selectedContainer: {
    flex: 1,
    marginTop: 15,
    paddingHorizontal: 25,
  },
  suggestionItem: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  suggestionItemIcon: {
    alignItems: "center",
    flexDirection: "row",
  },
  suggestionItemTitle: {
    color: "#000",
    fontSize: 18,
    fontWeight: "500",
  },
  suggestionMeta: {
    marginLeft: 15,
    maxWidth: "70%",
  },
  title: {
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 15,
  },
});
