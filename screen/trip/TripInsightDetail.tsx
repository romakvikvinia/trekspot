import React from "react";
import {
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Constants from "expo-constants";

import { enGB, registerTranslation } from "react-native-paper-dates";
registerTranslation("en", enGB);
import RenderHtml from "react-native-render-html";

import { useNavigation } from "@react-navigation/native";
import { BackIcon } from "../../utilities/SvgIcons.utility";
import { SIZES } from "../../styles/theme";

interface TripProps {}

export const TripInsightDetailScreen: React.FC<TripProps> = ({}) => {
  const navigation = useNavigation();

  return (
    <View style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <BackIcon size="30" />
        </TouchableOpacity>

        <Text style={styles.destination}>Title item</Text>
        <TouchableOpacity style={styles.backButton}></TouchableOpacity>
      </View>
      <ScrollView
        style={{ flex: 1, flexGrow: 1 }}
        contentContainerStyle={{ paddingHorizontal: 20 }}
        selectable
      >
        <RenderHtml
          key={"topic"}
          contentWidth={SIZES.width}
          source={{
            html: `
            <h2 style="color: green">Title item</h2>
            <p style="font-sze: 18px; line-height: 22px">
            The Foundry (v6) release is finally stable, and is now-on the recommended version. Check out the announcement blog post in our brand new website. We also have a migration guide for
            </p>
            <ul>
                <li>
                     Text item
                </li>
                <li>
                    Text item
                </li>
            </ul>
            <p style="font-sze: 18px; line-height: 22px">
            The Foundry (v6) release is finally stable, and is now-on the recommended version. Check out the announcement blog post in our brand new website. We also have a migration guide for
            </p>
            <ul>
                <li>
                     Text item
                </li>
                <li>
                    Text item
                </li>
            </ul>
            <p style="font-sze: 18px; line-height: 22px">
            The Foundry (v6) release is finally stable, and is now-on the recommended version. Check out the announcement blog post in our brand new website. We also have a migration guide for
            </p>
            <p style="font-sze: 18px; line-height: 22px">
            The Foundry (v6) release is finally stable, and is now-on the recommended version. Check out the announcement blog post in our brand new website. We also have a migration guide for
            </p>
            <p style="font-sze: 18px; line-height: 22px">
            The Foundry (v6) release is finally stable, and is now-on the recommended version. Check out the announcement blog post in our brand new website. We also have a migration guide for
            </p>
            `,
          }}
          defaultTextProps={{
            selectable: true,
          }}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F2F2F7",
    paddingTop: Constants?.statusBarHeight + 10
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  destination: {
    fontSize: 18,
    fontWeight: "500",
  },
  backButton: {
    width: 30,
  },
});
