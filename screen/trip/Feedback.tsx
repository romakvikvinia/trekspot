// import { FlashList } from "@shopify/flash-list";
// import { Image } from "expo-image";
// import { useState } from "react";
// import {
//   KeyboardAvoidingView,
//   Platform,
//   ScrollView,
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
// } from "react-native";
// import { Rating } from "react-native-ratings";
// import { COLORS } from "../../styles/theme";
// import {
//   ImagesLinearIcon,
//   XIcon,
// } from "../../utilities/SvgIcons.utility";
// import * as ImagePicker from "expo-image-picker";
// import { SkeletonLoader, SkeletonLoaderImage } from "../../common/ui/Skeleton";

// const DATA = [
//   "https://cdn.pixabay.com/photo/2019/03/09/21/30/downtown-4045035_1280.jpg",
//   "https://cdn.pixabay.com/photo/2019/03/09/21/30/downtown-4045035_1280.jpg",
//   "https://cdn.pixabay.com/photo/2019/03/09/21/30/downtown-4045035_1280.jpg",
// ];

// export const Feedback = ({item}) => {
//   const ratingCompleted = (rating) => {
//     console.log("Rating is: " + rating);
//   };

 
//   const [loading, setLoading] = useState();

//   const pickImages = async () => {
//     const result = await ImagePicker.launchImageLibraryAsync({
//       exif: true,
//       mediaTypes: ImagePicker.MediaTypeOptions.All,
//       allowsEditing: false,
//       aspect: [4, 3],
//       quality: 1,
//       allowsMultipleSelection: true,
//       selectionLimit: 10,
//     });

//     // if (!result.canceled) {

//     // } else {

//     // }
//   };
  

//   return (
//     <View style={styles.feedbackWrapper}>
     
//         <View style={styles.textArea}>
//           <View style={styles.spotWrapper}>
//             <Image
//               style={{
//                 height: 120,
//                 width: 120,
//                 borderRadius: 12,
//                 backgroundColor: "#ccc",
//               }}
//               cachePolicy="memory"
//               contentFit="cover"
//               transition={0}
//               source={{ uri: item.image.url }}
//             />
//             <Text style={styles.spotTitle} numberOfLines={1}>
//               {item.title}
//             </Text>
//           </View>

//           <Rating
//             type="custom"
//             startingValue={0}
//             onFinishRating={ratingCompleted}
//             imageSize={40}
//             tintColor="#F2F2F7"
//             ratingBackgroundColor="#ccc"
//             style={{
//               paddingTop: 0,
//               marginBottom: 15,
//             }}
//           />
//           <TextInput
//             // style={styles.input}
//             // value={this.state.value}
//             // onChangeText={text=>this.setState({value:text})}
//             multiline={true}
//             numberOfLines={4}
//             placeholder="Enter your feedback"
//             placeholderTextColor={COLORS.gray}
//             style={styles.textInput}
//           />
//         </View>
//         {/* {loading ? (
//           <View style={{ flexDirection: "row", display: "flex" }}>
//             {[0, 1, 2, 3].map((item) => (
//               <SkeletonLoaderImage
//                 height={140}
//                 width={150}
//                 marginBottom
//                 marginTop
//               />
//             ))}
//           </View>
//         ) : (
//           <ScrollView horizontal>
//             {DATA.map((item, index) => (
//               <View style={styles.reviewImage}>
//                 <Image
//                   style={[
//                     {
//                       height: 140,
//                       width: 150,
//                       borderRadius: 15,
//                       marginRight: 15,
//                     },
//                   ]}
//                   cachePolicy="memory"
//                   contentFit="cover"
//                   transition={0}
//                   source={{ uri: item }}
//                 />
//                 <TouchableOpacity
//                   activeOpacity={0.7}
//                   style={[styles.removeItemButton]}
//                 >
//                   <XIcon width="10" color="#fff" />
//                 </TouchableOpacity>
//               </View>
//             ))}
//           </ScrollView>
//         )} */}
//         <TouchableOpacity
//           style={styles.uploadButton}
//           onPress={() => pickImages()}
//           activeOpacity={0.7}
//         >
//           <ImagesLinearIcon size={16} color={COLORS.gray} />
//           <Text style={styles.uploadButtonText}>Add photos</Text>
//         </TouchableOpacity>

//         {/* <Text style={styles.errorMessage}>
//           Please set the rating and upload minimum 1 photo to submit your review
//         </Text>  */}

//         <TouchableOpacity style={styles.submitButton} activeOpacity={0.7}>
//           <Text style={styles.submitButtonText}>Submit review</Text>
//         </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   textArea: {
//     paddingHorizontal: 0,
//     marginTop: 25,
//     paddingBottom: 0,
//     borderRadius: 12,
//     marginBottom: 15,
//   },
//   errorMessage: {
//     marginTop: 25,
//     textAlign: "center",
//     fontSize: 16,
//     color: "red"
//   }, 
//   spotWrapper: {
//     flexDirection: "column",
//     alignItems: "center",
//     marginBottom: 35
//   },
//   spotTitle: {
//     marginTop: 15,
//     fontSize: 18
//   },
//   submitButton: {
//     paddingHorizontal: 45,
//     paddingVertical: 18,
//     borderRadius: 50,
//     backgroundColor: COLORS.primaryDark,
//     marginTop: 50,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   submitButtonText: {
//     color: COLORS.white,
//     fontSize: 14,
//     fontWeight: "600",
//   },
//   textInput: {
//     backgroundColor: "transparent",
//     height: 100,
//     padding: 15,
//     borderRadius: 12,
//     paddingTop: Platform.OS === "android" ? 0 : 15,
//     marginTop: 15,
//     color: COLORS.black,
//     borderWidth: 1,
//     borderColor: COLORS.gray,
//     fontSize: 16,
//   },
//   reviewImage: {
//     position: "relative",
//     marginBottom: 15
//   },
//   removeItemButton: {
//     backgroundColor: "red",
//     width: 25,
//     height: 25,
//     borderRadius: 50,
//     justifyContent: "center",
//     alignItems: "center",
//     position: "absolute",
//     top: 10,
//     right: 20,
//   },
//   feedbackText: {
//     fontSize: 14,
//     color: COLORS.black,
//   },
//   uploadButton: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//     paddingHorizontal: 25,
//     paddingVertical: 15,
//     borderRadius: 12,
//     marginTop: 5,
//     borderWidth: 2,
//     borderColor: COLORS.gray,
//     borderStyle: "dashed",
//   },
//   uploadButtonText: {
//     marginLeft: 10,
//     fontSize: 15,
//     fontWeight: "500",
//     color: COLORS.gray
//   },
//   feedbackWrapper: {
//     justifyContent: "space-between",
//     paddingHorizontal: 15,
//   },
// });
