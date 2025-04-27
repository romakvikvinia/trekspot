import { useNavigation } from "@react-navigation/native";
import { usePostHog } from "posthog-react-native";
import {
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { Events } from "../../../utilities/Posthog";
import {
  AppsIcon,
  CostIcon,
  DishesIcon,
  ExploreTabIcon,
  InsightIcon,
  RestaurantsIcon,
} from "../../../utilities/SvgIcons.utility";

type TripHelpersProps = {
  data: any;
  iso2: string;
  reachView?: boolean;
};

export const TripHelpers = ({
  data,
  iso2,
  reachView = false,
}: TripHelpersProps) => {
  const posthog = usePostHog();
  const navigation = useNavigation();

  return (
    <View
      style={[
        styles.bottomRow,
        {
          borderTopWidth: reachView ? 0 : 1,
        },
      ]}
    >
      <ScrollView
        horizontal
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingHorizontal: reachView ? 20 : 20 }}
        showsHorizontalScrollIndicator={false}
      >
         <Pressable
          style={({pressed}) => [
            styles.bottomActionsButton,
            {
              backgroundColor: pressed ? "#ccc" : "#fafafa",
            },
          ]}
          //@ts-expect-error
          onPress={() => {
            navigation.navigate("TripExplore", { trip: data });
          }}
          hitSlop={10}
        >
          <ExploreTabIcon size={15} color="#000" />
          <Text
            style={[
              styles.bottomActionsButtonlabel,
              {
                color: "#000",
              },
            ]}
          >
            Explore
          </Text>
        </Pressable>
        <Pressable
          style={({pressed}) => [
            styles.bottomActionsButton,
            {
              backgroundColor: pressed ? "#ccc" : "#fafafa",
            },
          ]}
          //@ts-expect-error
          onPress={() => {
            navigation.navigate("TripRestaurants", { trip: data });
          }}
          hitSlop={10}
        >
           <RestaurantsIcon size={15} color="#000" />
          <Text
            style={[
              styles.bottomActionsButtonlabel,
              {
                color: "#000",
              },
            ]}
          >
            Restaurants
          </Text>
        </Pressable>
        {/* <Pressable
          style={({pressed}) => [
            styles.bottomActionsButton,
            {
              backgroundColor: pressed ? "#ccc" : "#fafafa",
            },
          ]}
          //@ts-expect-error
          onPress={() => {
            posthog.capture(Events.UserUsesTripHelperEmergency, {});
            navigation.navigate("TripEmergency", { iso2 });
          }}
          hitSlop={10}
        >
          <DocumentIcon size={15} color="#000" />
          <Text
            style={[
              styles.bottomActionsButtonlabel,
              {
                color: "#000",
              },
            ]}
          >
            Files
          </Text>
        </Pressable>
        <Pressable
          style={({pressed}) => [
            styles.bottomActionsButton,
            {
              backgroundColor: pressed ? "#ccc" : "#fafafa",
            },
          ]}
          //@ts-expect-error
          onPress={() => {
            posthog.capture(Events.UserUsesTripHelperEmergency, {});
            navigation.navigate("TripEmergency", { iso2 });
          }}
          hitSlop={10}
        >
          <ExpensesIcon size={15} color="#000" />
          <Text
            style={[
              styles.bottomActionsButtonlabel,
              {
                color: "#000",
              },
            ]}
          >
            Expenses
          </Text>
        </Pressable> */}
        {/* <Pressable
          style={({pressed}) => [
            styles.bottomActionsButton,
            {
              backgroundColor: pressed ? "#ccc" : "#fafafa",
            },
          ]}
          hitSlop={10}
          //@ts-expect-error
          onPress={() => {
            posthog.capture(Events.UserUsesTripHelperEmergency, {});
            navigation.navigate("TripEmergency", { iso2 });
          }}
        >
          <ChecklistIcon size={15} color="#000" />
          <Text
            style={[
              styles.bottomActionsButtonlabel,
              {
                color: "#000",
              },
            ]}
          >
            Checklist
          </Text>
        </Pressable> */}
      
        <Pressable
          style={({pressed}) => [
            styles.bottomActionsButton,
            {
              backgroundColor: pressed ? "#ccc" : "#fafafa",
            },
          ]}
          hitSlop={10}
          onPress={() => {
            posthog.capture(Events.UserUsesTriphelperInsights, {});
            //@ts-ignore
            navigation.navigate("TripInsights", {
              data: data,
              iso2: iso2,
            });
          }}
        >
          <InsightIcon size={14} color="#000" />
          <Text
            style={[
              styles.bottomActionsButtonlabel,
              {
                color: "#000",
              },
            ]}
          >
            Insights
          </Text>
        </Pressable>
        <Pressable
          style={({pressed}) => [
            styles.bottomActionsButton,
            {
              backgroundColor: pressed ? "#ccc" : "#fafafa",
            },
          ]}
          hitSlop={10}
          onPress={() => {
            posthog.capture(Events.UserUsesTriphelperDishes, {});
            //@ts-ignore
            navigation.navigate("TripDishes", {
              iso2: iso2,
            });
          }}
        >
          <DishesIcon size={14} color="#000" />
          <Text
            style={[
              styles.bottomActionsButtonlabel,
              {
                color: "#000",
              },
            ]}
          >
            Dishes
          </Text>
        </Pressable>
        <Pressable
          style={({pressed}) => [
            styles.bottomActionsButton,
            {
              backgroundColor: pressed ? "#ccc" : "#fafafa",
            },
          ]}
          hitSlop={10}
          onPress={() => {
            posthog.capture(Events.useTripExpenses, {});
            //@ts-ignore
            navigation.navigate("TripExpenses", {
              iso2: iso2,
            });
          }}
        >
          <CostIcon size={14} color="#000" />
          <Text
            style={[
              styles.bottomActionsButtonlabel,
              {
                color: "#000",
              },
            ]}
          >
            Expenses
          </Text>
        </Pressable>
        <Pressable
          style={({pressed}) => [
            styles.bottomActionsButton,
            {
              backgroundColor: pressed ? "#ccc" : "#fafafa",
            },
          ]}
          hitSlop={10}
          onPress={() => {
            posthog.capture(Events.UserUsesTriphelperApps, {});
            //@ts-ignore
            navigation.navigate("TripTransport", {
              iso2: iso2,
            });
          }}
        >
          <AppsIcon size={14} color="#000" />
          <Text
            style={[
              styles.bottomActionsButtonlabel,
              {
                color: "#000",
              },
            ]}
          >
            Apps
          </Text>
        </Pressable>
    
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomActionsButton: {
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 50,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    marginRight: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  bottomActionsButtonlabel: {
    color: "#0b57d0",
    fontSize: 14,
    fontWeight: "600",
    marginLeft: 8,
  },
  bottomRow: {
    alignItems: "center",
    borderTopColor: "#f2f2f2",
    borderTopWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 0,
    marginTop: Platform.OS === "android" ? 5 : 5,
    paddingBottom: 12,
    paddingTop: 12,
    width: "100%",
  },
});
