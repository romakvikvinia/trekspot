// import { createElement, useRef, useState } from "react";
// import {
//   Platform,
//   ScrollView,
//   TextInput,
//   TouchableOpacity,
//   View,
// } from "react-native";
// import { KeyboardAvoidingView } from "react-native";
// import { StyleSheet, Text } from "react-native";
// import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
// import PagerView from "react-native-pager-view";
// import { COLORS, SIZES } from "../../../styles/theme";
// import {
//   BusIcon,
//   CalendarFilledCheckedIcon,
//   CalendarFilledIcon,
//   CirclePin,
//   CloseCircleIcon,
//   EatIcon,
//   FileIcon,
//   FlightIcon,
//   LocationPin,
//   LodgeIcon,
//   MapIcon,
//   MuseumIcon,
//   SeatIcon,
//   ShipIcon,
//   TicketIcon,
//   ToDoIcon,
//   ToursIcon,
//   USDIcon,
//   XIcon,
// } from "../../../utilities/SvgIcons.utility";
// import Transportation from "../components/Transportation";
// import { styles } from "../_styles";

// const activities = [
//   { label: "Transport", color: "#28CC39", Icon: BusIcon },
//   { label: "Lodging", color: "#337BFF", Icon: LodgeIcon },
//   { label: "Restaurant", color: "#FF7733", Icon: EatIcon },
//   { label: "Tour", color: "#DD3DFF", Icon: MapIcon },
//   { label: "Event", color: "#00D4D6", Icon: TicketIcon },
//   { label: "Museum", color: "#FFA033", Icon: MuseumIcon },
//   { label: "Cruise", color: "#337BFF", Icon: ShipIcon },
//   { label: "Other", color: "#838383", Icon: ToDoIcon },
// ];
// const ActivityIcon = ({ index }) => {
//   console.log("index", index);
//   switch (index) {
//     case 0:
//       return <BusIcon color="#fff" />;
//     case 1:
//       return <LodgeIcon color="#fff" />;
//     case 2:
//       return <EatIcon color="#fff" />;
//     case 3:
//       return <MapIcon color="#fff" />;
//     case 4:
//       return <TicketIcon color="#fff" />;
//     case 5:
//       return <MuseumIcon color="#fff" />;
//     case 6:
//       return <ShipIcon color="#fff" />;
//     case 7:
//       return <ToDoIcon color="#fff" />;
//   }
// };

// export const ActivityList = ({
//   activityType,
//   setActivityType,
//   modalActivityRef,
// }) => {
//   const [activeActivity, setActiveActivity] = useState(null);
//   const refPagerView = useRef(null);

//   return (
//     <PagerView
//       ref={refPagerView}
//       style={styles.pagerView}
//       initialPage={0}
//       scrollEnabled={false}
//     >
//       <View style={styles.wrapper} key="1">
//         <View style={styles.modalHeader}>
//           <Text style={styles.title}>Add activity</Text>
//           <TouchableOpacity
//             onPress={() => modalActivityRef?.current?.close()}
//             activeOpacity={0.5}
//             style={styles.closeButton}
//           >
//             <XIcon width="10" />
//           </TouchableOpacity>
//         </View>

//         <View style={styles.activities}>
//           {/* <TouchableOpacity
//             onPress={() => refPagerView?.current?.setPage("1")}
//             activeOpacity={0.5}
//             style={styles.activity}
//           >
//             <View style={[styles.icon, { backgroundColor: "red" }]}>
//               <FlightIcon size="20" color="#fff" />
//             </View>

//             <Text style={styles.activityLabel}>Flight</Text>
//           </TouchableOpacity> */}
//           {activities.map(({ label, color, Icon }, index) => (
//             <TouchableOpacity
//               key={index}
//               activeOpacity={0.5}
//               style={[styles.activity]}
//               onPress={() => {
//                 refPagerView?.current?.setPage(index + 1);
//                 setActiveActivity(index);
//               }}
//             >
//               <View style={[styles.icon, { backgroundColor: color }]}>
//                 <Icon size="20" color="#fff" />
//               </View>

//               <Text style={styles.activityLabel}>{label}</Text>
//             </TouchableOpacity>
//           ))}
//         </View>
//       </View>
//       <View style={styles.wrapper} key="2">
//         <Transportation
//           activeActivity={activeActivity}
//           activities={activities}
//           refPagerView={refPagerView}
//         />
//       </View>
//       <View style={styles.wrapper} key="3">
//         <View style={styles.activityTopRow}>
//           <TouchableOpacity
//             style={styles.backToPrevSlide}
//             onPress={() => refPagerView?.current?.setPage("0")}
//             activeOpacity={0.5}
//           >
//             <Text style={styles.backToPrevSlideText}>Back</Text>
//           </TouchableOpacity>
//           <Text style={styles.activityTitle}>Lodging</Text>
//           <TouchableOpacity style={styles.saveButton} activeOpacity={0.5}>
//             <Text style={styles.saveButtonText}>Save</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//       <View style={styles.wrapper} key="4">
//         <View style={styles.activityTopRow}>
//           <TouchableOpacity
//             style={styles.backToPrevSlide}
//             onPress={() => refPagerView?.current?.setPage("0")}
//             activeOpacity={0.5}
//           >
//             <Text style={styles.backToPrevSlideText}>Back</Text>
//           </TouchableOpacity>
//           <Text style={styles.activityTitle}>Restaurant</Text>
//           <TouchableOpacity style={styles.saveButton} activeOpacity={0.5}>
//             <Text style={styles.saveButtonText}>Save</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//       <View style={styles.wrapper} key="5">
//         <View style={styles.activityTopRow}>
//           <TouchableOpacity
//             style={styles.backToPrevSlide}
//             onPress={() => refPagerView?.current?.setPage("0")}
//             activeOpacity={0.5}
//           >
//             <Text style={styles.backToPrevSlideText}>Back</Text>
//           </TouchableOpacity>
//           <Text style={styles.activityTitle}>Tour</Text>
//           <TouchableOpacity style={styles.saveButton} activeOpacity={0.5}>
//             <Text style={styles.saveButtonText}>Save</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//       <View style={styles.wrapper} key="6">
//         <View style={styles.activityTopRow}>
//           <TouchableOpacity
//             style={styles.backToPrevSlide}
//             onPress={() => refPagerView?.current?.setPage("0")}
//             activeOpacity={0.5}
//           >
//             <Text style={styles.backToPrevSlideText}>Back</Text>
//           </TouchableOpacity>
//           <Text style={styles.activityTitle}>Event</Text>
//           <TouchableOpacity style={styles.saveButton} activeOpacity={0.5}>
//             <Text style={styles.saveButtonText}>Save</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//       <View style={styles.wrapper} key="7">
//         <View style={styles.activityTopRow}>
//           <TouchableOpacity
//             style={styles.backToPrevSlide}
//             onPress={() => refPagerView?.current?.setPage("0")}
//             activeOpacity={0.5}
//           >
//             <Text style={styles.backToPrevSlideText}>Back</Text>
//           </TouchableOpacity>
//           <Text style={styles.activityTitle}>Museum</Text>
//           <TouchableOpacity style={styles.saveButton} activeOpacity={0.5}>
//             <Text style={styles.saveButtonText}>Save</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//       <View style={styles.wrapper} key="8">
//         <View style={styles.activityTopRow}>
//           <TouchableOpacity
//             style={styles.backToPrevSlide}
//             onPress={() => refPagerView?.current?.setPage("0")}
//             activeOpacity={0.5}
//           >
//             <Text style={styles.backToPrevSlideText}>Back</Text>
//           </TouchableOpacity>
//           <Text style={styles.activityTitle}>Cruise</Text>
//           <TouchableOpacity style={styles.saveButton} activeOpacity={0.5}>
//             <Text style={styles.saveButtonText}>Save</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//       <View style={styles.wrapper} key="9">
//         <View style={styles.activityTopRow}>
//           <TouchableOpacity
//             style={styles.backToPrevSlide}
//             onPress={() => refPagerView?.current?.setPage("0")}
//             activeOpacity={0.5}
//           >
//             <Text style={styles.backToPrevSlideText}>Back</Text>
//           </TouchableOpacity>
//           <Text style={styles.activityTitle}>Other</Text>
//           <TouchableOpacity style={styles.saveButton} activeOpacity={0.5}>
//             <Text style={styles.saveButtonText}>Save</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </PagerView>
//   );
// };
