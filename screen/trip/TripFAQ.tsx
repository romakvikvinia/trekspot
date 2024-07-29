import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { BackIcon, DownCircleIcon } from "../../utilities/SvgIcons.utility";
import Constants from "expo-constants";
import { COLORS } from "../../styles/theme";
import { useNavigation } from "@react-navigation/native";
import { globalStyles } from "../../styles/globalStyles";
import { FlashList } from "@shopify/flash-list";
import { useEffect, useState } from "react";
import { FaqItem } from "../../common/components/Destination/_FaqItem";
import { useLazyFaqQuery } from "../../api/api.trekspot";
import { Loader } from "../../common/ui/Loader";

export const FaqRowItem = ({ item, title, index, openIndex, setOpenIndex }) => {
  const isOpen = openIndex === index;

  const toggleItem = () => {
    setOpenIndex(isOpen ? null : index);
  };

  return (
    <View
      style={{
        minHeight: 10,
        backgroundColor: isOpen ? "#fafafa" : "transparent",
        paddingVertical: 5,
        marginBottom: 8,
        borderRadius: 6,
        paddingBottom: isOpen ? 15 : 0,
        paddingHorizontal: 20
      }}
    >
      <TouchableOpacity
        onPress={toggleItem}
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingRight: 0,
          marginBottom: 0,
          paddingVertical: 15,
        }}
      >
        <Text style={[styles.forYouRowTitleSub]}>{title}</Text>
        <DownCircleIcon />
      </TouchableOpacity>

      {isOpen ? (
        <FlashList
          contentContainerStyle={{ paddingHorizontal: 0 }}
          renderItem={({ item, ind }) => {
            return <FaqItem item={item} />;
          }}
          // numColumns={3}
          estimatedItemSize={20}
          data={item}
        />
      ) : null}
    </View>
  );
};

export const TripFAQ = ({route}) => {
  const navigation = useNavigation();
  const [openIndex, setOpenIndex] = useState(0);

  const [fetchData, { isLoading, data: faqDataList }] = useLazyFaqQuery();
  useEffect(() => {
    fetchData({
      iso2: route?.params?.iso2,
    });
   
  }, [route, fetchData]);

 
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={globalStyles.screenHeader}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={globalStyles.screenHeaderBackButton}
        >
          <BackIcon size="30" />
        </TouchableOpacity>

        <Text style={globalStyles.screenTitle}>FAQ</Text>
        <TouchableOpacity
          style={globalStyles.screenHeaderBackButton}
        ></TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 0, paddingTop: 15 }}
      >
        {isLoading && (
          <View style={{ height: 230 }}>
            <Loader isLoading background="" />
          </View>
        )}
        {!isLoading &&
          faqDataList &&
          Object.keys(faqDataList)?.map((item, index) => (
            <FaqRowItem
              item={faqDataList[item]}
              title={item}
              index={index}
              openIndex={openIndex}
              setOpenIndex={setOpenIndex}
            />
          ))}
        {!isLoading && faqDataList && faqDataList?.length === 0 && (
          <View
            style={{
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
              minHeight: 230,
            }}
          >
            <Text
              style={{
                color: COLORS.black,
                fontSize: 18,
                fontWeight: "bold",
              }}
            >
              No data available
            </Text>
            <Text
              style={{
                color: COLORS.gray,
                fontSize: 16,
                fontWeight: "500",
                marginTop: 10,
              }}
            >
              We are working on it and will be available soon
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F2F2F7",
    paddingTop: Constants?.statusBarHeight + 10,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    marginBottom: 10,
  },
  destination: {
    fontSize: 18,
    fontWeight: "500",
  },
  backButton: {
    width: 30,
  },
  forYouRowTitleSub: {
    fontSize: 20,
    fontWeight: "bold",
    color: COLORS.black,
    paddingHorizontal: 0,
    marginBottom: 15,
    position: "relative",
    top: 6
  },
});
