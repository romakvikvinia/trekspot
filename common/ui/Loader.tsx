import React from "react";
import { ActivityIndicator } from "react-native";
import { COLORS } from "../../styles/theme";
import { Center } from "./Center";

interface LoaderProps {
  isLoading: boolean;
  background?: string;
  color?: string;
  size?: number | "small" | "large" | undefined;
}

export const Loader: React.FC<LoaderProps> = ({
  isLoading = false,
  background,
  size = "small",
  color,
}) => {
  return isLoading ? (
    <Center>
      <ActivityIndicator
        size={size || "large"}
        color={color || COLORS.black}
        style={{ backgroundColor: background || "#fff" }}
      />
    </Center>
  ) : null;
};
