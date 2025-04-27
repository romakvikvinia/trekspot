import { NativeStackScreenProps } from "@react-navigation/native-stack";
import Constants from "expo-constants";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import { TripRouteStackParamList } from "../../routes/trip/TripRoutes";
import { globalStyles } from "../../styles/globalStyles";
import { COLORS } from "../../styles/theme";
import { EventCategoryIcon,RestaurantCategoryIcon } from "../../utilities/CategoryIcons";
import {
  BackIcon,
  HistoricalPlacesIcon,
  MuseumsIcon,
} from "../../utilities/SvgIcons.utility";

type Props = NativeStackScreenProps<TripRouteStackParamList, "TripExpenses">;

export const TripExpenses: React.FC<Props> = ({ navigation }) => {
  return (
    <View style={styles.safeArea}>
      <StatusBar style="dark" />

      <View style={globalStyles.screenHeader}>
        <Pressable
          onPress={() => navigation.goBack()}
          style={globalStyles.screenHeaderBackButton}
          hitSlop={20}
        >
          <BackIcon size="18" />
        </Pressable>

        <Text style={globalStyles.screenTitle}>Expenses</Text>
        <View
          style={[
            globalStyles.screenHeaderBackButton,
            {
              position: "relative",
            },
          ]}
        >
          <Pressable
            style={styles.addExpense}
            onPress={() =>
              navigation.navigate("ActivityExpenses", {
                type: "detail",
              })
            }
          >
            <Text style={styles.addExpenseText}>Add</Text>
          </Pressable>
        </View>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingHorizontal: 15, paddingTop: 15 }}
      >
        {/* {isLoading && (
          <View style={{ flex: 1, height: 200 }}>
            <Loader isLoading={isLoading} background="#F2F2F7" />
          </View>
        )} */}

        <View style={styles.totalExpenses}>
          <View style={styles.totalRow}>
            <Text style={styles.totalExpensesText}>Total expenses:</Text>
            <Text style={styles.totalExpensesAmount}>-100 USD</Text>
          </View>
          <View style={[styles.totalRow,{
            justifyContent: "flex-end",
            marginTop: 10
          }]}>
            <Text style={styles.totalExpensesAmount}>-50 EUR</Text>
          </View>
        </View>

        <View style={styles.expenseGroup}>
          <Text style={styles.date}>12 Apr, 2025</Text>

          {[1, 2, 3, 4].map((item) => (
            <Pressable
              style={({ pressed }) => [
                styles.expenseItem,
                { opacity: pressed ? 0.5 : 1 },
              ]}
              key={item}
              onPress={() =>
                navigation.navigate("ActivityExpenses", {
                  type: "detail",
                })
              }
            >
              <View style={styles.left}>
                <View style={styles.icon}>
                  {item % 2 === 0 ? <RestaurantCategoryIcon size="35" /> : <EventCategoryIcon size="35" />}
                </View>
                <View style={styles.info}>
                  <Text style={styles.name}>Filini terrace</Text>
                  <Text style={styles.category}>Restaurant, cafe, bar</Text>
                </View>
              </View>
              <Text style={styles.amount}>
                -{(Math.random() * 100).toFixed(2)} USD
              </Text>
            </Pressable>
          ))}
        </View>
        <View style={styles.expenseGroup}>
          <Text style={styles.date}>11 Apr, 2025</Text>

          {[1, 2, 3, 4].map((item) => (
            <View style={styles.expenseItem} key={item}>
              <View style={styles.left}>
                <View style={styles.icon}>
                  {item % 2 === 0 ? <HistoricalPlacesIcon /> : <MuseumsIcon />}
                </View>
                <View style={styles.info}>
                  <Text style={styles.name} numberOfLines={1}>
                    Filini terrace djs jkdsn jnsdk j
                  </Text>
                  <Text style={styles.category}>Restaurant, cafe, bar</Text>
                </View>
              </View>
              <Text style={styles.amount}>
                -{(Math.random() * 100).toFixed(2)} USD
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  addExpense: {
    borderColor: "#ccc",
    borderRadius: 50,
    borderWidth: 1,
    paddingHorizontal: 15,
    paddingVertical: 8,
    position: "absolute",
    right: 0,
    top: -18,
  },
  addExpenseText: {
    color: COLORS.black,
    fontSize: 14,
    fontWeight: "500",
  },
  amount: {
    fontSize: 16,
    fontWeight: "600",
  },
  category: {
    color: COLORS.darkgray,
    fontSize: 14,
  },
  date: {
    color: COLORS.darkgray,
    fontSize: 14,
    fontWeight: "400",
    marginBottom: 15,
  },
  expenseGroup: {
    marginBottom: 15,
  },
  expenseItem: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  icon: {
    marginRight: 10,
  },
  info: {
    marginLeft: 5,
    width: "60%",
  },
  left: {
    alignItems: "center",
    flexDirection: "row",
  },
  name: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 5,
  },
  safeArea: {
    backgroundColor: "#F2F2F7",
    flex: 1,
    paddingTop: Constants?.statusBarHeight + 15,
  },
  totalExpenses: {
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    marginBottom: 15,
    paddingBottom: 15
  },
  totalExpensesAmount: {
    color: COLORS.black,
    fontSize: 20,
    fontWeight: "600",
  },
  totalExpensesText: {
    color: COLORS.black,
    fontSize: 18,
    fontWeight: "600",
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  }
});
