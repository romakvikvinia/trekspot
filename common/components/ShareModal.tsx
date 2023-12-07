import { useEffect, useRef, useState } from "react";
import {
  ImageBackground,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Modalize } from "react-native-modalize";
import { Portal } from "react-native-portalize";
import ViewShot from "react-native-view-shot";
import { COLORS } from "../../styles/theme";
import {
  BackIcon,
  CopyIcon,
  InstagramIcon,
  MessageIcon,
  ShareIcon,
} from "../../utilities/SvgIcons.utility";

const ShareModal = () => {
  const [index, setIndex] = useState(0);
  const ref = useRef();

  const handleNewImage = () => {
    if (index === 2) {
      setIndex(0);
    } else {
      setIndex(index + 1);
    }
  };

  const copyToClipboard = () => {
    const content = "Share your travel";

    setTimeout(() => {
      Share.share({
        message: `${content}`,
      });
    }, 500);
  };

  const ShareItem = async () => {
    let img = "";
    const image = ref.current.capture().then((uri) => {
      console.log("do something with ", uri);
      img = uri;
    });
    console.log("image", img);
    await Sharing.shareAsync(`file://${img}`);
  };

  return (
    <View style={styles.shareWrapper}>
      <View style={styles.middle}>
        <ViewShot
          ref={ref}
          options={{
            fileName: "Your-File-Name",
            format: "jpg",
            quality: 0.9,
          }}
        >
          {index === 0 ? (
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
          {index === 1 ? (
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
          {index === 2 ? (
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
  );
};
export default ShareModal;

const styles = StyleSheet.create({
  shareWrapper: {
    justifyContent: "space-between",
    flex: 1,
    padding: 15,
  },
  middle: {
    marginTop: 25,
    marginBottom: 100,
    minHeight: 500,
    justifyContent: "center",
  },
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
