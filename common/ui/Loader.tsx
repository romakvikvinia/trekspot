import React from "react";
import { ActivityIndicator } from "react-native";
import { Center } from "./Center";

interface LoaderProps {}

export const Loader: React.FC<LoaderProps> = ({}) => {
  return (
    <Center>
      <ActivityIndicator size="large" color="#0861a4" />
    </Center>
  );
};
