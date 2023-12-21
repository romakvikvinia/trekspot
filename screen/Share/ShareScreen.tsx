import { useNavigation } from "@react-navigation/native";
import React, { useCallback, useRef, useState } from "react";
import * as Sharing from "expo-sharing";
import {
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import ViewShot from "react-native-view-shot";

import { COLORS } from "../../styles/theme";
import {
  BackIcon,
  CopyIcon,
  InstagramIcon,
  MessageIcon,
  ShareIcon,
} from "../../utilities/SvgIcons.utility";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { HomeRouteStackParamList } from "../../routes/home/HomeRoutes";

type ShareScreenProps = NativeStackScreenProps<
  HomeRouteStackParamList,
  "ShareStats"
>;

export const ShareScreen: React.FC<ShareScreenProps> = ({}) => {
  const navigation = useNavigation();
  const [state, setState] = useState({ index: 0 });
  const ref = useRef();

  const handleNewImage = useCallback(() => {
    setState((prevState) => ({
      ...prevState,
      index: prevState.index !== 2 ? prevState.index + 1 : 0,
    }));
  }, []);

  const ShareItem = useCallback(async () => {
    if (!ref.current) return;
    // @ts-ignore
    let img = await ref.current.capture();

    await Sharing.shareAsync(`file://${img}`);
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.shareWrapper}>
        <View style={styles.shareHeader}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            activeOpacity={0.7}
            style={styles.backButton}
          >
            <BackIcon />
          </TouchableOpacity>
        </View>
        <View style={styles.middle}>
          <ViewShot
            //@ts-ignore
            ref={ref}
            options={{
              fileName: "Your-File-Name",
              format: "jpg",
              quality: 0.9,
            }}
          >
            {state.index === 0 ? (
              <ImageBackground
                style={{
                  height: 400,
                }}
                resizeMode="contain"
                source={{
                  uri: "https://i.ibb.co/cbfg0nZ/Screenshot-2023-12-07-at-00-00-11.png",
                }}
              >
                {/* <Text>...Something to rasterize.. skds mdslk</Text> */}
              </ImageBackground>
            ) : null}
            {state.index === 1 ? (
              <ImageBackground
                style={{
                  height: 300,
                }}
                source={{
                  uri: "https://i.ibb.co/C2r6Hxp/Screenshot-2023-12-07-at-00-00-22.png",
                }}
              >
                <Text>...Something to rasterize.. skds mdslk</Text>
              </ImageBackground>
            ) : null}
            {state.index === 2 ? (
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
            ) : null}
          </ViewShot>

          <View style={styles.generateNew}>
            <TouchableOpacity
              style={styles.generateNewButton}
              onPress={() => handleNewImage()}
            >
              <Text style={styles.generateNewButtonText}>Press for next</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.sharing}>
          <TouchableOpacity activeOpacity={0.7} style={styles.shareButton}>
            <View style={styles.icon}>
              <MessageIcon />
            </View>
            <Text style={styles.shareButtonText}>Message</Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.7} style={styles.shareButton}>
            <View style={styles.icon}>
              <InstagramIcon />
            </View>
            <Text style={styles.shareButtonText}>Instagram</Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.7} style={styles.shareButton}>
            <View style={styles.icon}>
              <CopyIcon />
            </View>
            <Text style={styles.shareButtonText}>Copy</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.shareButton}
            onPress={() => ShareItem()}
          >
            <View style={styles.icon}>
              <ShareIcon />
            </View>
            <Text style={styles.shareButtonText}>Share</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f8f8f8",
  },
  shareWrapper: {
    justifyContent: "space-between",
    flex: 1,
    paddingHorizontal: 15,
  },
  shareHeader: {
    width: "100%",
    flexDirection: "row",
    display: "flex",
    justifyContent: "space-between",
  },
  backButton: {
    width: 40,
    height: 40,
    backgroundColor: "#fff",
    borderRadius: 100,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    ...COLORS.shadow,
  },
  middle: {},
  generateNew: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 15,
  },
  generateNewButton: {
    paddingVertical: 8,
  },
  generateNewButtonText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  sharing: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 25,
    paddingHorizontal: 15,
  },
  shareButton: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    width: 40,
    height: 40,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f1f1f1",
    borderRadius: 100,
  },
  shareButtonText: {
    marginTop: 8,
    fontSize: 14,
    color: COLORS.black,
  },
});
