import React from "react";
import { ActivityIndicator } from "react-native";
import { COLORS } from "../../styles/theme";
import { Center } from "./Center";

interface LoaderProps {
  isLoading: boolean;
  background: string;
  size?: number | "small" | "large" | undefined;
}

export const Loader: React.FC<LoaderProps> = ({
  isLoading = false,
  background,
  size = "small",
}) => {
  return isLoading ? (
    <Center>
      <ActivityIndicator
        size={size || "large"}
        color={COLORS.black}
        style={{ backgroundColor: background || "#fff" }}
      />
    </Center>
  ) : null;
};
