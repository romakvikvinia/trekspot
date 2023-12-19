import React, { useRef, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { WebView } from "react-native-webview";
import { Modalize } from "react-native-modalize";
import { Portal } from "react-native-portalize";
import { COLORS, SIZES } from "../../styles/theme";
import { CloseCircleIcon } from "../../utilities/SvgIcons.utility";

export const MapEmbedView = ({ placeTitle, modalEmbedRef }) => {
  return (
    <>
      <TouchableOpacity
        onPress={() => {
          modalEmbedRef.current && modalEmbedRef.current.close();
        }}
        activeOpacity={0.7}
        style={styles.backButton}
      >
        <CloseCircleIcon color="#fff" size="35" />
      </TouchableOpacity>
      <View
        style={{
          flex: 1,
          height: SIZES.height - 110,
          borderRadius: 10,
          overflow: "hidden",
        }}
      >
        <WebView
          source={{
            html: `
                <html>
                    <head>
                        <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
                        <style>
                            * {
                                margin: 0;
                                overflow: hidden
                            }
                        </style>
                    </head>
                    <body>
                        <iframe style="background: 'blue';margin: 0; padding: 0;overflow: hidden; border: 0" width="100%" height="100%" src="https://maps.google.com/maps?&q=${placeTitle}&zoom=18&output=embed"  loading="lazy"  frameborder="0" allowfullscreen></iframe>
                    </body>
                </html> 
              `,
          }}
          useWebKit={true}
          style={{ flex: 1, margin: 0, padding: 0 }}
        />
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  backButton: {
    width: 35,
    height: 35,
    borderRadius: 100,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3.84,
    elevation: 5,
    position: "absolute",
    top: 15,
    right: 15,
    zIndex: 1,
    backgroundColor: "#000",
  },
});
