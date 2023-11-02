import React from "react";
import { StyleSheet, View } from "react-native";

interface TCardProps {
  style: object | null;
  children: JSX.Element | JSX.Element[];
}

export const TCard: React.FC<TCardProps> = (props) => {
  return (
    <View style={[styles.card, props.style ? props.style : {}]}>
      {props.children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    shadowColor: "#cccdd0",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 10,
    borderRadius: 10,
    backgroundColor: "white",
  },
});
