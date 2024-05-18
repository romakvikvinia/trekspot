import React from "react";
import { ActivityIndicator } from "react-native";
import { COLORS } from "../../styles/theme";
import { Center } from "./Center";

interface LoaderProps {
  isLoading: boolean;
  background: string
}

export const Loader: React.FC<LoaderProps> = ({ isLoading = false, background }) => {
  return isLoading ? (
    <Center>
      <ActivityIndicator  size="large" color={COLORS.black} style={{backgroundColor: background || "#fff"}}  />
    </Center>
  ) : null;
};
