import {
  Platform,
  TouchableOpacity,
  TouchableNativeFeedbackProps,
  TouchableOpacityProps,
} from "react-native";

type Style =
  | TouchableNativeFeedbackProps["style"]
  | TouchableOpacityProps["style"];

export type PTouchableProps = {
  style: Style;
  children: JSX.Element;
  onPress?: () => void;
};

export const PTouchable: React.FC<PTouchableProps> = ({
  children,
  ...props
}) => {
  return Platform.OS === "android" ? (
    <TouchableOpacity {...props}>{children}</TouchableOpacity>
  ) : (
    <TouchableOpacity {...props}>{children}</TouchableOpacity>
  );
};
