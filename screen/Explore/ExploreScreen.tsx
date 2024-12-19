import { NativeStackScreenProps } from "@react-navigation/native-stack";
import Constants from "expo-constants";
import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  View,
} from "react-native";

import { ExploreContent } from "../../components/explore/Content";
import { ExploreRoutesStackParamList } from "../../routes/explore/ExploreRoutes";
import { ExploreHeader } from "./Header";

type ExploreProps = NativeStackScreenProps<
  ExploreRoutesStackParamList,
  "ExploreWorld"
>;

export const ExploreScreen: React.FC<ExploreProps> = () => {
  return (
    <>
      <View style={[styles.safeArea,{
        paddingTop: Constants?.statusBarHeight + 10,
      }]}>
        <StatusBar style="auto" />

        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS == "ios" ? "padding" : "height"}
        >
          <ExploreHeader />
      
          <ExploreContent />
        </KeyboardAvoidingView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: "#f8f8f8",
    flex: 1,
  }
});
