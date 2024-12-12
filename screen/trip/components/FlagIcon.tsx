import { ImageBackground } from "react-native";
import { Flags } from "../../../utilities/flags";

type FlagIconProps = {
    iso2: string
}

export const FlagIcon = ({iso2} : FlagIconProps) => {
  const imagePath = Flags[iso2];

  return (
    <ImageBackground
      resizeMode="cover"
      style={{
        width: 22,
        height: 15,
        backgroundColor: "#ddd",
        borderRadius: 2,
        overflow: "hidden",
        marginLeft: 8
      }}
      source={imagePath ? imagePath : null} // Set the image source
    />
  );
};
