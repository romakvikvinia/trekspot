import {
  ActivityIndicator,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import * as ImagePicker from "expo-image-picker";

import { ImagesIcon, XIcon } from "../../utilities/SvgIcons.utility";
import React from "react";

interface IAddMemoriesModalProps {
  images: ImagePicker.ImagePickerResult["assets"];
  setPickedImages: (assetId: string) => void;
  pickImages: () => Promise<void>;
  isSelectingImages: boolean;
}

export const AddMemoriesModal: React.FC<IAddMemoriesModalProps> = ({
  images,
  setPickedImages,
  pickImages,
  isSelectingImages,
}) => {
  return (
    <>
      <View
        style={[
          styles.importImagesWrapper,
          {
            justifyContent:
              images && images.length > 0 ? "flex-start" : "center",
          },
        ]}
      >
        {images &&
          images.map((item) => (
            <ImageBackground
              resizeMode="cover"
              style={{
                minWidth: "28%",
                height: 120,
                margin: 5,
                borderRadius: 5,
                position: "relative",
                overflow: "hidden",
              }}
              source={{
                uri: item?.uri,
              }}
              key={item?.assetId}
            >
              <TouchableOpacity
                style={styles.removeImageButton}
                onPress={() =>
                  item && item.assetId && setPickedImages(item.assetId)
                }
              >
                <XIcon width="10" height="10" />
              </TouchableOpacity>
            </ImageBackground>
          ))}
        {images && images.length === 0 ? (
          <TouchableOpacity
            onPress={() => pickImages()}
            style={styles.noImageWrapper}
            activeOpacity={0.5}
          >
            <ImagesIcon width="50" height="50" />

            <View style={styles.selectImagesButton}>
              <Text style={styles.selectImagesButtonText}>Select images</Text>
            </View>
          </TouchableOpacity>
        ) : null}
        {isSelectingImages ? (
          <TouchableOpacity
            onPress={() => pickImages()}
            style={styles.noImageWrapper}
            activeOpacity={0.5}
          >
            <ActivityIndicator color={COLORS.primaryDark} />

            <View style={styles.selectImagesButton}>
              <Text style={styles.selectImagesButtonText}>Loading...</Text>
            </View>
          </TouchableOpacity>
        ) : null}
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  noImageWrapper: {
    flexDirection: "column",
    alignItems: "center",
    borderWidth: 1,
    borderStyle: "dashed",
    marginTop: 55,
    padding: 25,
    paddingHorizontal: 50,
    borderRadius: 15,
  },
  noImageWrapperText: {
    marginTop: 15,
    fontSize: 16,
    color: "#333",
  },
  selectImagesButton: {
    borderRadius: 30,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 25,
  },
  selectImagesButtonText: {
    color: "#000",
    fontSize: 16,
  },
  importImagesWrapper: {
    flex: 1,
    minHeight: "100%",
    padding: 15,
    backgroundColor: "#f8f8f8",
    flexDirection: "row",
    flexWrap: "wrap",
    paddingBottom: 25,
    justifyContent: "center",
  },
  removeImageButton: {
    position: "absolute",
    top: 5,
    right: 5,
    backgroundColor: "#fff",
    borderRadius: 50,
    width: 22,
    height: 22,
    alignItems: "center",
    justifyContent: "center",
    padding: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
});
