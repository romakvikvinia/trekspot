import React from "react";
import { StyleSheet, View } from "react-native";
interface centerProps {
  children: JSX.Element | JSX.Element[];
}

export const Center: React.FC<centerProps> = ({ children }) => {
  return <View style={styles.container}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
