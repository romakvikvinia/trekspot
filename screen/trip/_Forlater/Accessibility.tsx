// import { TouchableOpacity, View } from "react-native";
// import { StyleSheet, Text } from "react-native";
// import { COLORS } from "../../../styles/theme";

// export const Accessibility = ({ tripAccess, setTripAccess }) => {
//   return (
//     <View style={styles.wrapper}>
//       <View style={styles.modalHeader}>
//         <Text style={styles.title}>Accessibility</Text>
//         <Text style={styles.subTitle}>
//           If you set public, your trip will be visible to other users
//         </Text>
//       </View>

//       <View style={styles.switchers}>
//         <TouchableOpacity
//           style={[
//             styles.switcher,
//             tripAccess === "public" ? styles.active : null,
//           ]}
//           activeOpacity={0.5}
//           onPress={() => setTripAccess("public")}
//         >
//           <Text
//             style={[
//               styles.switcherLabel,
//               tripAccess === "public" ? styles.activeText : null,
//             ]}
//           >
//             Public
//           </Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           style={[
//             styles.switcher,
//             tripAccess === "private" ? styles.active : null,
//           ]}
//           activeOpacity={0.5}
//           onPress={() => setTripAccess("private")}
//         >
//           <Text
//             style={[
//               styles.switcherLabel,
//               tripAccess === "private" ? styles.activeText : null,
//             ]}
//           >
//             Private
//           </Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };
// const styles = StyleSheet.create({
//   modalHeader: {
//     width: "100%",
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: "600",
//     color: COLORS.black,
//   },
//   subTitle: {
//     fontSize: 16,
//     marginTop: 10,
//   },
//   switchers: {
//     marginTop: 25,
//   },
//   switcher: {
//     backgroundColor: COLORS.white,
//     paddingVertical: 15,
//     paddingHorizontal: 15,
//     marginBottom: 15,
//     borderRadius: 10,
//   },
//   switcherLabel: {
//     color: COLORS.black,
//     fontSize: 16,
//     fontWeight: "500",
//   },
//   active: {
//     backgroundColor: COLORS.primaryDark,
//   },
//   activeText: {
//     color: COLORS.white,
//   },
//   wrapper: {
//     paddingHorizontal: 15,
//     paddingTop: 15,
//   },
// });
