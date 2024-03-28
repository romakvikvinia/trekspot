// import { LinearGradient } from "expo-linear-gradient";
// import { ScrollView, TouchableOpacity, View } from "react-native";
// import { StyleSheet, Text } from "react-native";
// import { COLORS } from "../../../styles/theme";

// export const Background = ({ gradient, setGradient }) => {
//   return (
//     <View style={styles.wrapper}>
//       <View style={styles.modalHeader}>
//         <Text style={styles.title}>Select trip background</Text>
//       </View>
//       <ScrollView
//         showsHorizontalScrollIndicator={false}
//         horizontal
//         contentContainerStyle={{
//           flexDirection: "row",
//           justifyContent: "space-between",
//           marginTop: 25,
//           marginBottom: 60,
//         }}
//       >
//         <TouchableOpacity
//           activeOpacity={0.5}
//           style={styles.gradientButton}
//           onPress={() => setGradient(["#3E33AF", "#9252A7", "#D5659B"])}
//         >
//           <LinearGradient
//             style={styles.gradientWrapper}
//             colors={["#3E33AF", "#9252A7", "#D5659B"]}
//           ></LinearGradient>
//         </TouchableOpacity>
//         <TouchableOpacity
//           activeOpacity={0.5}
//           style={styles.gradientButton}
//           onPress={() => setGradient(["#FDC8C6", "#FF4878", "#FF5169"])}
//         >
//           <LinearGradient
//             style={styles.gradientWrapper}
//             colors={["#FF4878", "#FF5169", "#FDC8C6"]}
//           ></LinearGradient>
//         </TouchableOpacity>
//         <TouchableOpacity
//           activeOpacity={0.5}
//           style={styles.gradientButton}
//           onPress={() => setGradient(["#DC67F8", "#745CFB", "#3E81FD"])}
//         >
//           <LinearGradient
//             style={styles.gradientWrapper}
//             colors={["#DC67F8", "#745CFB", "#3E81FD"]}
//           ></LinearGradient>
//         </TouchableOpacity>
//         <TouchableOpacity
//           activeOpacity={0.5}
//           style={styles.gradientButton}
//           onPress={() => setGradient(["#F57A7C", "#F89E97", "#FCAA76"])}
//         >
//           <LinearGradient
//             style={styles.gradientWrapper}
//             colors={["#F57A7C", "#F89E97", "#FCAA76"]}
//           ></LinearGradient>
//         </TouchableOpacity>
//         <TouchableOpacity
//           activeOpacity={0.5}
//           style={styles.gradientButton}
//           onPress={() => setGradient(["#756A95", "#975B76", "#B75E68"])}
//         >
//           <LinearGradient
//             style={styles.gradientWrapper}
//             colors={["#756A95", "#975B76", "#B75E68"]}
//           ></LinearGradient>
//         </TouchableOpacity>
//         <TouchableOpacity
//           activeOpacity={0.5}
//           style={styles.gradientButton}
//           onPress={() => setGradient(["#698287", "#728C8F", "#A8875D"])}
//         >
//           <LinearGradient
//             style={styles.gradientWrapper}
//             colors={["#698287", "#728C8F", "#A8875D"]}
//           ></LinearGradient>
//         </TouchableOpacity>
//         <TouchableOpacity
//           activeOpacity={0.5}
//           style={styles.gradientButton}
//           onPress={() => setGradient(["#3E4F54", "#576F75", "#70868F"])}
//         >
//           <LinearGradient
//             style={styles.gradientWrapper}
//             colors={["#3E4F54", "#576F75", "#70868F"]}
//           ></LinearGradient>
//         </TouchableOpacity>
//       </ScrollView>
//     </View>
//   );
// };
// const styles = StyleSheet.create({
//   modalHeader: {
//     width: "100%",
//   },
//   gradientWrapper: {
//     width: "100%",
//     height: "100%",
//     borderRadius: 25,
//   },
//   gradientButton: {
//     width: 150,
//     height: 220,
//     marginRight: 15,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: "600",
//     color: COLORS.black,
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
