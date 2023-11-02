import React from "react";
import {
  HeaderButton,
  HeaderButtonProps,
} from "react-navigation-header-buttons";
import { Ionicons } from "@expo/vector-icons";
interface THeaderButtonProps extends HeaderButtonProps {}

export const THeaderButton: React.FC<THeaderButtonProps> = (props) => {
  return <HeaderButton {...props} IconComponent={Ionicons} iconSize={23} />;
};
