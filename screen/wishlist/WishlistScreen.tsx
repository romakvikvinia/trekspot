import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import { SceneMap, TabBar, TabView } from "react-native-tab-view";
import { COLORS, SIZES } from "../../styles/theme";
import { BackIcon, PlusIcon } from "../../utilities/SvgIcons.utility";

interface WishlistProps {}

// const Countries = () => (
//   <View style={{ flex: 1, backgroundColor: "#f8f8f8" }} />
// );

// const Favourites = () => (
//   <View style={{ flex: 1, backgroundColor: "#f8f8f8" }} />
// );
// const Starred = () => <View style={{ flex: 1, backgroundColor: "#f8f8f8" }} />;

// const renderScene = SceneMap({
//   countries: Countries,
//   favourites: Favourites,
//   starred: Starred,
// });

export const WishlistScreen: React.FC<WishlistProps> = ({}) => {
  //   const layout = useWindowDimensions();

  //   const [index, setIndex] = React.useState(0);
  //   const [routes] = React.useState([
  //     { key: "countries", title: "Countries" },
  //     { key: "favourites", title: "Favourites" },
  //     { key: "starred", title: "Starred" },
  //   ]);
  //   const renderTabBar = (props) => (
  //     <TabBar
  //       scrollEnabled={true}
  //       {...props}
  //       indicatorStyle={{ backgroundColor: "#000" }}
  //       style={{ backgroundColor: "#f8f8f8", color: "#000" }}
  //       renderLabel={({ route, focused, color }) => (
  //         <Text style={{ color: "#000" }}>{route.title}</Text>
  //       )}
  //     />
  //   );
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.customHeader}>
        <TouchableOpacity style={styles.backButton}>
          <BackIcon />
        </TouchableOpacity>
        <Text style={styles.screenName}>Wishlist</Text>

        <TouchableOpacity style={styles.plusButton}>
          <PlusIcon />
        </TouchableOpacity>
      </View>
      {/* <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        style={{
          marginTop: 20,
        }}
        renderTabBar={renderTabBar}
      /> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f8f8f8",
  },
  customHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
  },
  backButton: {
    width: 35,
    height: 35,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ddd",
    borderRadius: 50,
  },
  screenName: {
    fontSize: SIZES.body2,
    fontWeight: "bold",
    color: COLORS.black,
  },
  plusButton: {
    width: 35,
    height: 35,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.primary,
    borderRadius: 50,
  },
});
