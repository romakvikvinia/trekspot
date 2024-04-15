import React from "react";
import { ActivityIndicator } from "react-native";
import { COLORS } from "../../styles/theme";
import { Center } from "./Center";

interface LoaderProps {
  isLoading: boolean;
}

export const Loader: React.FC<LoaderProps> = ({ isLoading = false }) => {
  return isLoading ? (
    <Center>
      <ActivityIndicator size="large" color={COLORS.primaryDark} />
    </Center>
  ) : null;
};
