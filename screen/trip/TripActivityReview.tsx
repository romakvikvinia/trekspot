// import {
//   KeyboardAvoidingView,
//   Platform,
//   SafeAreaView,
//   ScrollView,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
// } from "react-native";
// import { BackIcon } from "../../utilities/SvgIcons.utility";
// import Constants from "expo-constants";
// import { COLORS } from "../../styles/theme";
// import { useNavigation } from "@react-navigation/native";
// import { globalStyles } from "../../styles/globalStyles";
// import { Feedback } from "./Feedback";

// export const TripActivityReview = ({ route }) => {
 
//   const navigation = useNavigation();
//   return (
//     <SafeAreaView style={styles.safeArea}>
//       <View style={globalStyles.screenHeader}>
//         <TouchableOpacity
//           onPress={() => navigation.goBack()}
//           style={globalStyles.screenHeaderBackButton}
//         >
//           <BackIcon size="30" />
//         </TouchableOpacity>

//         <Text style={globalStyles.screenTitle}>Write a review for</Text>
//         <TouchableOpacity
//           style={globalStyles.screenHeaderBackButton}
//         ></TouchableOpacity>
//       </View>
//       <KeyboardAvoidingView
//         style={{ flex: 1 }}
//         behavior={Platform.OS == "ios" ? "padding" : "height"}
//       >
//         <ScrollView
//           style={{ flex: 1 }}
//           contentContainerStyle={{ paddingHorizontal: 20 }}
//         >
//           <Feedback item={route.params.item} />
//         </ScrollView>
//       </KeyboardAvoidingView>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   safeArea: {
//     flex: 1,
//     backgroundColor: "#F2F2F7",
//     paddingTop: Constants?.statusBarHeight + 10,
//   },
//   header: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     paddingHorizontal: 15,
//     marginBottom: 10,
//   },
//   destination: {
//     fontSize: 18,
//     fontWeight: "500",
//   },
//   backButton: {
//     width: 30,
//   },
//   heading: {
//     fontSize: 20,
//     fontWeight: "bold",
//     color: COLORS.black,
//     marginTop: 25,
//     marginBottom: 10,
//   },
//   transportItem: {
//     backgroundColor: "#fff",
//     flexDirection: "row",
//     alignItems: "center",
//     borderRadius: 5,
//     overflow: "hidden",
//     marginTop: 15,
//     width: "100%",
//   },
//   transportItemIcon: {
//     backgroundColor: "#fff",
//     padding: 0,
//     alignItems: "center",
//   },
//   transportText: {
//     fontSize: 16,
//     fontWeight: "bold",
//     paddingHorizontal: 10,
//   },
//   textContentWrapper: {
//     backgroundColor: "#fafafa",
//     padding: 15,
//     borderRadius: 10,
//     marginTop: 25,
//     flexDirection: "row",
//     alignItems: "center",
//   },
// });
