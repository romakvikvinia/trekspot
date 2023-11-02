import React from "react";
import { Text, View } from "react-native";
interface MyWorldProps {}

export const MyWorldScreen: React.FC<MyWorldProps> = ({}) => {
  return (
    <>
      <View>
        <Text>My World</Text>
      </View>
    </>
  );
};
