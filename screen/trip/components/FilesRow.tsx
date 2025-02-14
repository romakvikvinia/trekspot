import * as DocumentPicker from "expo-document-picker";
import { Image } from "expo-image";
import * as ImagePicker from "expo-image-picker";
import { LinearGradient } from "expo-linear-gradient";
import * as WebBrowser from "expo-web-browser";
import { useRef, useState } from "react";
import {
  Alert,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Modalize } from "react-native-modalize";
import { Portal } from "react-native-portalize";

import { FloatingActionButton } from "../../../components/common/FloatingButtons";
import { COLORS, SIZES } from "../../../styles/theme";
import {
  CameraIcon,
  FileUploadedIcon,
  ImagesLinearIcon,
  PDFLinearIcon,
  XIcon,
} from "../../../utilities/SvgIcons.utility";

export const FilesRow = ({ isPreview, showGallery = true }) => {
  const galleryRef = useRef(null);

  const [imageURL, setImageURL] = useState(null);
  const [pdfURL, setPdfURL] = useState('');

 
  const _handleShowFileAsync = async (url) => {
    const result = await WebBrowser.openBrowserAsync(url, {
      enableBarCollapsing: true,
    });
  };

  const _handleShowImageAsync = async (url) => {
    if(Platform?.OS === "ios") {
      const result = await WebBrowser.openBrowserAsync(url, {
        enableBarCollapsing: true,
      });
    } else {
      setPdfURL(null)
      galleryRef?.current?.open();
      setImageURL(url)
    }
  };

  const handleDelete = () => {
    Alert.alert("Delete", "Are you sure you want to delete this file?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Delete",
        onPress: () => console.log("Delete"),
        style: "destructive",
      },
    ]);
  };

  const pickImages = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      exif: true,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
      allowsMultipleSelection: true,
      selectionLimit: 10,
    });

    if (!result.canceled) {
    } else {
    }
  };

  const pickDocument = async () => {
    // setDocuments("");
    const result = await DocumentPicker.getDocumentAsync({
      type: "*/*",
      copyToCacheDirectory: true,
      multiple: false,
    });
    if (result.type === "success") {
      //   setLoadingFile(true);
      //   setDocuments(result);
      const formData = new FormData();

      formData.append("file", {
        uri: result.uri,
        type: result.mimeType,
        name: result.name,
      });

      //   const response = await smt(formData);
      if (response) {
        // setLoadingFile(false);
        // setUploadedFileID(response);
      }
    }
  };

  const pickImageCamera = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      alert(
        "You've refused to allow this app to access your camera! Go to settings, search for Schoolbook and allow access to camera"
      );
      return;
    }

    const result = await ImagePicker.launchCameraAsync();

    if (!result.canceled) {
      //   setLoadingCameraImage(true);
      //   setImageCamera(result);
      const formData = new FormData();

      formData.append("file", {
        uri: result?.assets[0]?.uri,
        type: "image",
        name: result?.assets[0]?.fileName || "no-name",
      });

      //   const response = await smt(formData);
      if (response) {
        // setLoadingCameraImage(false);
        // setUploadedCameraImageID(response);
      }
    }
  };

  const forIOs = [
    {
      label: "Upload PDF",
      onPress: () => pickDocument(),
      icon: PDFLinearIcon,
    },
    {
      label: "Upload photo",
      onPress: () => pickImages(),
      icon: ImagesLinearIcon,
    },
    {
      label: "Capture and upload",
      onPress: () => pickImageCamera(),
      icon: CameraIcon,
    },
  ]

  const forAndroid = [
    {
      label: "Upload photo",
      onPress: () => pickImages(),
      icon: ImagesLinearIcon,
    },
    {
      label: "Capture and upload",
      onPress: () => pickImageCamera(),
      icon: CameraIcon,
    },
  ]
 
 
  return (
    <>
      {!isPreview ? (
        <FloatingActionButton
          buttons={Platform.OS === "android" ? forAndroid : forIOs}
          renderTrigger={() => (
            <View style={styles.inputGroup}>
              <View style={styles.inputRow}>
                <FileUploadedIcon size={20} color="#86858c" />
                <Text style={styles.inputLabel}>
                  {
                    Platform.OS === "android" ? "Upload photos" : " Upload PDF or photos"
                  }
                </Text>
              </View>
            </View>
          )}
        />
      ) : null}

      {/* <View style={styles.loaderWrapper}>
        <Loader isLoading={true} background="#F2F2F7" size="small" />
      </View> */}
      {isPreview && <Text style={styles.rowTitle}>Files</Text>}
      <ScrollView
        horizontal
        contentContainerStyle={{ paddingBottom: 30, paddingVertical: 10 }}
      >
        {/* ანდროიდზე დროიბით არ ვანახოთ PDF */}
        <Pressable
          onPress={() =>
            _handleShowFileAsync("https://pdfobject.com/pdf/sample.pdf")
          }
          style={({ pressed }) => [
            styles.fileItem,
            {
              backgroundColor: pressed ? "#f2f2f7" : "#fff",
            },
          ]}
        >
          {!isPreview ? (
            <Pressable
              onPress={handleDelete}
              hitSlop={20}
              style={styles.removeButton}
            >
              <XIcon width="10" color="#fff" />
            </Pressable>
          ) : null}
          <PDFLinearIcon size="30" />
          <Text style={styles.fileName} numberOfLines={1}>
            File name
          </Text>
        </Pressable>
        <Pressable
          onPress={() =>
            _handleShowImageAsync(
              "https://cdn.pixabay.com/photo/2024/12/20/11/53/architect-9280053_1280.jpg"
            )
          }
          style={({ pressed }) => [
            styles.fileItem,
            {
              paddingVertical: 0,
              opacity: pressed ? 0.5 : 1,
            },
          ]}
        >
          {!isPreview ? (
            <Pressable
              onPress={handleDelete}
              hitSlop={20}
              style={styles.removeButton}
            >
              <XIcon width="10" color="#fff" />
            </Pressable>
          ) : null}

          <Image
            style={styles.imgItem}
            source={
              true
                ? {
                    uri: "https://cdn.pixabay.com/photo/2024/12/20/11/53/architect-9280053_1280.jpg",
                  }
                : require("../../../assets/no-image.png")
            }
            contentFit="cover"
            cachePolicy="memory-disk"
          ></Image>
        </Pressable>
      </ScrollView>


      
      {showGallery && (
        <>
          {isPreview && <Text style={styles.rowTitle}>Gallery</Text>}

      {!isPreview ? (
        <FloatingActionButton
          buttons={[
            {
              label: "Upload images",
              onPress: () => pickImages(),
              icon: ImagesLinearIcon,
            },
            {
              label: "Capture and upload",
              onPress: () => pickImageCamera(),
              icon: CameraIcon,
            },
          ]}
          renderTrigger={() => (
            <View style={styles.inputGroup}>
              <View style={styles.inputRow}>
                <ImagesLinearIcon size="20" color="#86858c" />
                <Text style={styles.inputLabel}>Upload gallery</Text>
              </View>
            </View>
          )}
        />
      ) : null}
      {/* <View style={styles.loaderWrapper}>
        <Loader isLoading={true} background="#F2F2F7" size="small" />
      </View> */}
      <ScrollView
        horizontal
        contentContainerStyle={{ paddingBottom: 30, paddingVertical: 10 }}
      >
        <Pressable
          onPress={() =>
            _handleShowImageAsync(
              "https://cdn.pixabay.com/photo/2024/12/20/11/53/architect-9280053_1280.jpg"
            )
          }
          style={({ pressed }) => [
            styles.fileItem,
            {
              paddingVertical: 0,
              opacity: pressed ? 0.5 : 1,
            },
          ]}
        >
          {!isPreview ? (
            <Pressable
              onPress={handleDelete}
              hitSlop={20}
              style={styles.removeButton}
            >
              <XIcon width="10" color="#fff" />
            </Pressable>
          ) : null}

          <Image
            style={styles.imgItem}
            source={
              true
                ? {
                    uri: "https://cdn.pixabay.com/photo/2024/12/20/11/53/architect-9280053_1280.jpg",
                  }
                : require("../../../assets/no-image.png")
            }
            contentFit="cover"
            cachePolicy="memory-disk"
          ></Image>
        </Pressable>
        <Pressable
          onPress={() =>
            _handleShowImageAsync(
              "https://cdn.pixabay.com/photo/2024/12/20/11/53/architect-9280053_1280.jpg"
            )
          }
          style={({ pressed }) => [
            styles.fileItem,
            {
              paddingVertical: 0,
              opacity: pressed ? 0.5 : 1,
            },
          ]}
        >
          {!isPreview ? (
            <Pressable
              onPress={handleDelete}
              hitSlop={20}
              style={styles.removeButton}
            >
              <XIcon width="10" color="#fff" />
            </Pressable>
          ) : null}

          <Image
            style={styles.imgItem}
            source={
              true
                ? {
                    uri: "https://cdn.pixabay.com/photo/2024/12/20/11/53/architect-9280053_1280.jpg",
                  }
                : require("../../../assets/no-image.png")
            }
            contentFit="cover"
            cachePolicy="memory-disk"
          ></Image>
        </Pressable>
      </ScrollView>
      </>
      )}

 
      <Portal>
        <Modalize
          ref={galleryRef}
          modalTopOffset={0}
          withHandle={false}
          disableScrollIfPossible
          modalStyle={{
            minHeight: "100%",
            backgroundColor: "#000",
            flex: 1,
          }}
          scrollViewProps={{
            alwaysBounceVertical: false,
          }}
        >
          <View style={styles.galleryHeader}>
            <Pressable
              style={styles.closeGalleryButton}
              onPress={() => galleryRef?.current?.close()}
            >
              <XIcon color="#fff" />
            </Pressable>
          </View>
          {imageURL ? (
            <LinearGradient
              style={{
                width: SIZES.width,
                height: SIZES.height,
                flex: 1,
              }}
              colors={["rgba(255,255,255,0.2)", "rgba(0,0,0,0.1)"]}
            >
              <Image
                style={{
                  width: SIZES.width,
                  height: SIZES.height,
                  flex: 1,
                }}
                source={{
                  uri: "https://cdn.pixabay.com/photo/2024/12/20/11/53/architect-9280053_1280.jpg",
                }}
                cachePolicy="memory"
                contentFit="contain"
                transition={1000}
              />
            </LinearGradient>
          ) : (
             null
          )}
        </Modalize>
      </Portal>
    </>
  );
};
const styles = StyleSheet.create({
  closeGalleryButton: {
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderColor: "#000",
    borderRadius: 50,
    borderWidth: 0,
    height: 40,
    justifyContent: "center",
    width: 40,
  },
  fileItem: {
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 15,
    height: 100,
    justifyContent: "space-between",
    marginRight: 15,
    paddingVertical: 15,
    position: "relative",
    width: 100,
  },
  fileName: {
    color: COLORS.black,
    fontSize: 12,
    fontWeight: "500",
    marginTop: 10,
    paddingHorizontal: 15,
  },
  galleryHeader: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingHorizontal: 15,
    paddingTop: 55,
    position: "absolute",
    width: "100%",
    zIndex: 1,
  },
  imgItem: {
    borderRadius: 15,
    height: 100,
    overflow: "hidden",
    width: "100%",
  },
  inputGroup: {
    backgroundColor: "#fff",
    borderRadius: 8,
    marginBottom: 15,
    overflow: "hidden",
  },
  inputLabel: {
    color: COLORS.black,
    flex: 1,
    fontSize: 14,
    fontWeight: "500",
    marginLeft: 8,
    width: 100,
  },
  inputRow: {
    alignItems: "center",
    flexDirection: "row",
    height: 50,
    justifyContent: "center",
    paddingLeft: 15,
  },
  loaderWrapper: {
    height: 100,
    width: "100%",
  },
  removeButton: {
    alignItems: "center",
    backgroundColor: "red",
    borderRadius: 100,
    height: 20,
    justifyContent: "center",
    position: "absolute",
    right: -4,
    top: -4,
    width: 20,
    zIndex: 1,
  },
  rowTitle: {
    color: COLORS.black,
    fontSize: 18,
    fontWeight: "500",
    marginBottom: 5
  },
});
