import Constants from "expo-constants";
import * as Haptics from "expo-haptics";
import { StatusBar } from "expo-status-bar";
import { useRef, useState } from "react";
import {
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Modalize } from "react-native-modalize";
import { Portal } from "react-native-portalize";

import { SeasonalExplorerContent } from "../../components/explore/SeasonalExplorer";
import { globalStyles } from "../../styles/globalStyles";
import { COLORS } from "../../styles/theme";
import {
  BackIcon,
  CheckLiteIcon,
  DownIcon,
  XIcon,
} from "../../utilities/SvgIcons.utility";

const MONTHS = [
  { id: 1, name: "January" },
  { id: 2, name: "February" },
  { id: 3, name: "March" },
  { id: 4, name: "April" },
  { id: 5, name: "May" },
  { id: 6, name: "June" },
  { id: 7, name: "July" },
  { id: 8, name: "August" },
  { id: 9, name: "September" },
  { id: 10, name: "October" },
  { id: 11, name: "November" },
  { id: 12, name: "December" },
];

export const SeasonalExplorerScreen = ({ navigation }: any) => {
  const [currentMonth, setCurrentMonth] = useState(
    new Date().toLocaleString("default", { month: "long" })
  );
  const [isCelsiues, setIsCelsius] = useState(true);

  const modalMonthSelectRef = useRef(null);

  const handleChangeMonth = (item: string) => {
    setCurrentMonth(item.name);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    modalMonthSelectRef?.current?.close();
  };

  const renderMonthItem = ({ item }) => (
    <TouchableOpacity
      key={`${item.id}-${item.name}`}
      style={styles.monthItem}
      activeOpacity={0.7}
      onPress={() => handleChangeMonth(item)}
    >
      <Text
        style={[
          styles.monthText,
          {
            color: item.name === currentMonth ? COLORS.primary : COLORS.black,
            opacity: item.name === currentMonth ? 1 : 0.7,
            fontWeight: item.name === currentMonth ? "700" : "500",
          },
        ]}
      >
        {item.name}
      </Text>
      {item.name === currentMonth && (
        <CheckLiteIcon width={20} color={COLORS.primary} />
      )}
    </TouchableOpacity>
  );

  return (
    <>
      <View style={styles.safeArea}>
        <StatusBar style="light" />
        <KeyboardAvoidingView
          behavior={Platform.OS == "ios" ? "padding" : "height"}
          style={styles.screen}
        >
          <ImageBackground
            source={require("../../assets/seasonalExplorer.webp")}
            resizeMode="cover"
            style={styles.screenHeaderWrapper}
          >
            <View
              style={[
                styles.screenHeader,
                {
                  paddingTop:
                    Constants?.statusBarHeight +
                    (Platform.OS === "android" ? 0 : 10),
                  paddingHorizontal: Platform.OS === "android" ? 5 : 15,
                },
              ]}
            >
              <Pressable
                onPress={() => navigation.goBack()}
                style={globalStyles.screenHeaderBackButton}
                hitSlop={20}
              >
                <BackIcon size="30" color="#fff" />
              </Pressable>
              <Text style={[globalStyles.screenTitle, { color: "#fff" }]}>
                Explore by months
              </Text>
              <TouchableOpacity
                style={globalStyles.screenHeaderBackButton}
                onPress={() => {
                  setIsCelsius(!isCelsiues);
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                }}
              >
                <Text style={styles.tempUnitText}>
                  {!isCelsiues ? "°C" : "°F"}
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.seasonalExplorerSelectWrapper}>
              <TouchableOpacity
                onPress={() => modalMonthSelectRef?.current?.open()}
                activeOpacity={0.7}
                style={styles.seasonalExplorerSelect}
              >
                <Text style={styles.fromToText} numberOfLines={1}>
                  {currentMonth}
                </Text>
                <DownIcon color="#fff" />
              </TouchableOpacity>
            </View>
          </ImageBackground>

          <SeasonalExplorerContent
            isCelsiues={isCelsiues}
            currentMonth={currentMonth}
          />
        </KeyboardAvoidingView>
      </View>

      <Portal>
        <Modalize
          ref={modalMonthSelectRef}
          modalTopOffset={120}
          HeaderComponent={
            <View style={styles.header}>
              <Text style={styles.title}>Select month</Text>
              <TouchableOpacity
                onPress={() => modalMonthSelectRef?.current?.close()}
                activeOpacity={0.7}
                style={styles.closeButton}
              >
                <XIcon width="10" />
              </TouchableOpacity>
            </View>
          }
          flatListProps={{
            data: MONTHS,
            renderItem: renderMonthItem,
            keyExtractor: (item) => item.name,
            showsVerticalScrollIndicator: false,
            scrollEventThrottle: 16,
            contentContainerStyle: {
              paddingHorizontal: 15,
              paddingTop: 0,
              paddingBottom: 25,
            },
          }}
        ></Modalize>
      </Portal>
    </>
  );
};

const styles = StyleSheet.create({
  closeButton: {
    alignItems: "center",
    backgroundColor: "#DBDBDB",
    borderRadius: 50,
    height: 30,
    justifyContent: "center",
    width: 30,
  },
  fromToText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
    marginLeft: 0,
    maxWidth: 180,
  },
  header: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 0,
    padding: 15,
  },
  monthItem: {
    width: "100%",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderColor: "#f2f2f2",
    borderRadius: 0,
    // marginBottom: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  monthText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "500",
  },
  safeArea: {
    backgroundColor: "#f8f8f8",
    flex: 1,
  },
  screen: {
    flex: 1,
    width: "100%",
  },
  screenHeader: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 0,
    paddingBottom: 10,
    paddingHorizontal: 15,
    paddingTop: Constants?.statusBarHeight + 10,
  },
  screenHeaderWrapper: {
    backgroundColor: "#0072C6",
    height: 200,
    width: "100%",
  },
  seasonalExplorerSelect: {
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    minWidth: 200,
    paddingHorizontal: 25,
    paddingVertical: 15,
    width: "70%",
  },
  seasonalExplorerSelectWrapper: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 15,
  },
  tempUnitText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  title: {
    color: COLORS.black,
    fontSize: 18,
    fontWeight: "600",
  },
});
