import React, { useContext } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { AuthContext } from "../../package/context/auth.context";
import { deleteFromAsyncStorage } from "../../helpers/secure.storage";

interface SettingProps {}

export const SettingScreen: React.FC<SettingProps> = ({}) => {
  const { signOut } = useContext(AuthContext);
  return (
    <>
      <View>
        <Text>Setting</Text>
        <TouchableOpacity
          onPress={async () => {
            signOut();
            deleteFromAsyncStorage(["visited_countries", "lived_countries"]);
          }}
        >
          <Text>Logout</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};
