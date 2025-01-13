import { Pressable, ScrollView, Text, View } from "react-native";

import { styles } from "../../common/components/_styles";

export const FloatingTab = ({ isSticky }) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        paddingHorizontal: 15,
      }}
      style={[
        styles.tabsWrapper,
        {
          display: isSticky ? "flex" : "none",
          flexDirection: "row",
          maxHeight: 50,
          position: "absolute",
          top: 80,
          zIndex: 4,
          backgroundColor: "#f8f8f8",
          borderBottomColor: "#ccc",
        },
      ]}
    >
      <Pressable style={styles.tabItem}>
        <Text style={styles.tabItemLabel}>Overview</Text>
        <View style={styles.activeIndicator}></View>
      </Pressable>
      <Pressable style={styles.tabItem}>
        <Text style={styles.tabItemLabel}>Food & Drink</Text>
      </Pressable>
      <Pressable style={styles.tabItem}>
        <Text style={styles.tabItemLabel}>Tips</Text>
      </Pressable>
      <Pressable style={styles.tabItem}>
        <Text style={styles.tabItemLabel}>National dishes</Text>
      </Pressable>
    </ScrollView>
  );
};
