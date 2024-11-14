import React, { useCallback, useMemo, useState } from "react";
import {
    Animated,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Modalize } from "react-native-modalize";
import { Portal } from "react-native-portalize";
import { XIcon } from "../../utilities/SvgIcons.utility";
import { COLORS } from "../../styles/theme";
import { Image } from "expo-image";
import { SightType } from "../../api/api.types";
import { SightDetailModal } from "../../components/explore/sights/SightDetailModal";

type DoneActivitiesProps = {
  activities: any;
  categoryIcons: any;
};

export const DoneActivities = ({
  activities,
  categoryIcons,
}: DoneActivitiesProps) => {

  const [topSightDetail, setTopSightDetail] = useState<SightType>();

  const modalRef = React.useRef<Modalize>(null);

  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleShowAllActivities = (category) => {
    setSelectedCategory(category);
    modalRef.current?.open();
  }

  const selectedCategoryActivities = useMemo(() => {

    if (!selectedCategory) {
      return [];
    }

    return activities[selectedCategory];
  }, [selectedCategory]);

  const handleClear = useCallback(() => {
    setTopSightDetail(undefined);
  }, []);

  const renderItem = ({ item, index }) => (
    <TouchableOpacity activeOpacity={0.7} onPress={() => setTopSightDetail(item)} key={index} style={styles.activityItem}>
      <Image source={{ uri: item?.image?.url }} style={styles.activityImage}></Image>
      <View style={styles.activityItemInfo}>
         <Text style={styles.activityItemTitle}>{item?.title}</Text>
         <Text style={styles.activityItemLocation}>{item?.city}</Text>
      </View>
    </TouchableOpacity>
  );

  
  return (
    <>
    <View style={styles.visitedStats}>
      <Text
        style={[styles.cardTitle, { paddingHorizontal: 15, marginBottom: 15 }]}
      >
        Activities
      </Text>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        horizontal
        contentContainerStyle={{ paddingHorizontal: 15 }}
      >
        {Object.keys(activities).map((category, index) => {
          const IconComponent = categoryIcons[category.toLowerCase()];
          return (
            <TouchableOpacity
              style={styles.statItem}
              key={`${category}-${index}`}
              activeOpacity={0.7}
              onPress={() => handleShowAllActivities(category)}
            >
              <View style={styles.lf}>
                <View style={{ height: 40 }}>
                  <Text style={styles.visitedCategoryText}>{category}</Text>
                </View>
                <View style={styles.categoryIcon}>
                  <IconComponent />
                </View>
              </View>
              <Text style={styles.amount}>{activities[category].length}</Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>

    <Portal>
        <Modalize
          ref={modalRef}
          modalTopOffset={200}
          handlePosition="inside"
          threshold={200}
          handleStyle={{ backgroundColor: COLORS.gray }}
          HeaderComponent={
            <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>
                    {selectedCategory}
                </Text>
            </View>
          }
          flatListProps={{
            data: selectedCategoryActivities,
            renderItem: renderItem,
            keyExtractor: item => item.title,
            showsVerticalScrollIndicator: false,
            scrollEventThrottle: 16,
            contentContainerStyle: { paddingHorizontal: 0, paddingTop: 15, paddingBottom: 25 },
          }} 
        >
        </Modalize>
    </Portal>

    {topSightDetail ? (
        <SightDetailModal showDirection={true} data={topSightDetail} closeCallBack={handleClear} />
      ) : null}
    </>
  );
};

const styles = StyleSheet.create({
  lf: {
    maxWidth: "80%",
  },
  activityItemLocation: {
    fontSize: 12,
    color: COLORS.gray,
    marginTop: 5,
  },
  activityItem: {
    width: "100%",
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 15,
  },
  activityItemTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: COLORS.black,
  },
  activityImage: {
    width: 50,
    height: 50,
    borderRadius: 10,
  },
  activityItemInfo: {
    marginLeft: 15,
    alignItems: "flex-start",
    flexDirection: "column",
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.black,
    textAlign: "center",
  },
  closeButton: {
    backgroundColor: "#DBDBDB",
    width: 30,
    height: 30,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  modalHeader: {
    width: "100%",
    paddingHorizontal: 15,
    paddingTop: 25,
    paddingBottom: 15,
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2",
  },
  amount: {
    fontSize: 18,
    fontWeight: "bold",
  },
  categoryIcon: {
    width: 30,
    height: 30,
    backgroundColor: "#fff",
    borderRadius: 100,
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  visitedCategoryText: {
    fontSize: 14,
    fontWeight: "500",
  },
  statItem: {
    width: 150,
    height: 120,
    backgroundColor: "#fafafa",
    marginRight: 15,
    borderRadius: 10,
    padding: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
  },
  visitedStats: {
    marginTop: 15,
    backgroundColor: "#fff",
    paddingVertical: 20,
    paddingBottom: 50,
  },
});
