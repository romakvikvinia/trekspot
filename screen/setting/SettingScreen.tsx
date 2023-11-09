import React, { useContext } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { AuthContext } from "../../package/context/auth.context";

interface SettingProps {}

export const SettingScreen: React.FC<SettingProps> = ({}) => {
  //@ts-ignore
  const { signOut } = useContext(AuthContext);
  return (
    <>
      <View>
        <Text>Setting</Text>
        <TouchableOpacity
          onPress={async () => {
            signOut();
          }}
        >
          <Text>Logout</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};
