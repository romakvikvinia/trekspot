import React, { useContext, useEffect, useRef } from "react";
import {
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import ViewShot from "react-native-view-shot";
import { AuthContext } from "../../package/context/auth.context";

interface SettingProps {}

const Share: React.FC<SettingProps> = ({}) => {
  const ref = useRef();

  useEffect(() => {
    // on mount
    ref.current.capture().then((uri) => {
      console.log("do something with ", uri);
    });
  }, []);

  //@ts-ignore
  return (
    <SafeAreaView style={styles.safeArea}>
      <View>
        <Text>Share</Text>
        <ViewShot
          ref={ref}
          options={{ fileName: "Your-File-Name", format: "jpg", quality: 0.9 }}
        >
          <ImageBackground
            style={{
              height: 300,
            }}
            source={{
              uri: "https://img.freepik.com/premium-vector/world-map-with-location-pointers_115354-2.jpg",
            }}
          >
            <Text>...Something to rasterize.. skds mdslk</Text>
          </ImageBackground>
        </ViewShot>
      </View>
    </SafeAreaView>
  );
};
export default Share;
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f8f8f8",
  },
});
