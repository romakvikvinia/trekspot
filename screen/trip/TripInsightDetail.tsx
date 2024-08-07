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
import { globalStyles } from "../../styles/globalStyles";

interface TripProps {}

export const TripInsightDetailScreen: React.FC<TripProps> = ({}) => {
  const navigation = useNavigation();

  return (
    <View style={styles.safeArea}>
      <View style={globalStyles.screenHeader}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={globalStyles.screenHeaderBackButton}
        >
          <BackIcon size="30" />
        </TouchableOpacity>

        <Text style={globalStyles.screenTitle}>Title item</Text>
        <TouchableOpacity
          style={globalStyles.screenHeaderBackButton}
        ></TouchableOpacity>
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
            <h2 style="color: black">Title item</h2>
            <p style="font-sze: 18px; line-height: 22px">
            The Foundry (v6) release is finally stable, and is now-on the recommended version. Check out the announcement blog post in our brand new website. We also have a migration guide for
            </p>
            <ul style="margin-top: 0">
                <li>
                     Text item
                </li>
                <li>
                    Text item
                </li>
            </ul>
            <img style="width: ${SIZES.width - 30+"px"}" src="https://cdn.pixabay.com/photo/2021/06/22/16/39/arch-6356637_1280.jpg" />
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
             <img style="width: ${SIZES.width - 30+"px"}" src="https://cdn.pixabay.com/photo/2023/01/10/00/17/italy-7708552_1280.jpg" />

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
          baseStyle={{
            fontSize: 16,
            lineHeight: 22,
            paddingBottom: 30,
            paddingTop: 15,
            fontWeight: "400"
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
