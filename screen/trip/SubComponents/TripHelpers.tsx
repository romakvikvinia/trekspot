import { useNavigation } from "@react-navigation/native";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  AppsIcon,
  DishesIcon,
  EmergencyLinearIcon,
  InsightIcon,
} from "../../../utilities/SvgIcons.utility";
import { usePostHog } from "posthog-react-native";
import { Events } from "../../../utilities/Posthog";

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
        <TouchableOpacity
          style={[
            styles.bottomActionsButton,
            {
              backgroundColor: !reachView ? "#fafafa" : "#fff",
            },
          ]}
          activeOpacity={0.7}
          //@ts-ignore
          onPress={() => {
            posthog.capture(Events.UserUsesTripHelperEmergency, {});
            navigation.navigate("TripEmergency", { iso2 });
          }}
        >
          <EmergencyLinearIcon size={16} color="#000" />
          <Text
            style={[
              styles.bottomActionsButtonlabel,
              {
                color: "#000",
              },
            ]}
          >
            Emergency
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.bottomActionsButton,
            {
              backgroundColor: !reachView ? "#fafafa" : "#fff",
            },
          ]}
          activeOpacity={0.7}
          onPress={() => {
            posthog.capture(Events.UserUsesTriphelperInsights, {});
            //@ts-ignore
            navigation.navigate("TripInsights", {
              data: data,
              iso2: iso2,
            });
          }}
        >
          <InsightIcon size={16} color="#000" />
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
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.bottomActionsButton,
            {
              backgroundColor: !reachView ? "#fafafa" : "#fff",
            },
          ]}
          activeOpacity={0.7}
          onPress={() => {
            posthog.capture(Events.UserUsesTriphelperApps, {});
            //@ts-ignore
            navigation.navigate("TripTransport", {
              iso2: iso2,
            });
          }}
        >
          <AppsIcon size={16} color="#000" />
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
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.bottomActionsButton,
            {
              backgroundColor: !reachView ? "#fafafa" : "#fff",
            },
          ]}
          activeOpacity={0.7}
          onPress={() => {
            posthog.capture(Events.UserUsesTriphelperDishes, {});
            //@ts-ignore
            navigation.navigate("TripDishes", {
              iso2: iso2,
            });
          }}
        >
          <DishesIcon size={16} color="#000" />
          <Text
            style={[
              styles.bottomActionsButtonlabel,
              {
                color: "#000",
              },
            ]}
          >
            National dishes
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomRow: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderTopColor: "#f2f2f2",
    borderTopWidth: 1,
    marginTop: 10,
    paddingTop: 12,
    paddingBottom: 12,
    marginBottom: 0,
  },
  bottomActionsButton: {
    borderRadius: 50,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    marginRight: 8,
    paddingVertical: 10,
    paddingHorizontal: 15,
    flexDirection: "row",
  },
  bottomActionsButtonText: {
    alignItems: "center",
    flexDirection: "row",
  },
  bottomActionsButtonlabel: {
    fontSize: 14,
    color: "#0b57d0",
    marginLeft: 8,
    fontWeight: "500",
  },
});
