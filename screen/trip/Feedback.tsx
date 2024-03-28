import { FlashList } from "@shopify/flash-list";
import { Image } from "expo-image";
import { useEffect, useRef, useState } from "react";
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Rating } from "react-native-ratings";
import { COLORS } from "../../styles/theme";
import {
  ImageIcon,
  ImagesIcon,
  ImagesLinearIcon,
  XIcon,
} from "../../utilities/SvgIcons.utility";
import * as ImagePicker from "expo-image-picker";
import { Video, ResizeMode } from "expo-av";
import * as VideoThumbnails from "expo-video-thumbnails";
import { SkeletonLoader, SkeletonLoaderImage } from "../../common/ui/Skeleton";

const DATA = [
  "https://cdn.pixabay.com/photo/2019/03/09/21/30/downtown-4045035_1280.jpg",
  "https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",
  "https://cdn.pixabay.com/photo/2019/03/09/21/30/downtown-4045035_1280.jpg",
  "https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",
  "https://cdn.pixabay.com/photo/2019/03/09/21/30/downtown-4045035_1280.jpg",
  "https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",
];

export const Feedback = () => {
  const ratingCompleted = (rating) => {
    console.log("Rating is: " + rating);
  };
  const videoRef = useRef(null);

  const [thumbnails, setThumbnails] = useState([]);
  const [loading, setLoading] = useState();

  const pickImages = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      exif: true,
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
      allowsMultipleSelection: true,
      selectionLimit: 10,
    });

    // if (!result.canceled) {

    // } else {

    // }
  };

  const generateThumbnails = async () => {
    try {
      setLoading(true);
      const thumbnailPromises = DATA.map(async (item) => {
        if (item.endsWith(".mp4")) {
          const { uri } = await VideoThumbnails.getThumbnailAsync(item, {
            time: 15000,
          });
          return uri;
        } else {
          return item; // Return the image URL directly
        }
      });

      const thumbnails = await Promise.all(thumbnailPromises);
      setLoading(false);
      setThumbnails(thumbnails);
    } catch (error) {
      setLoading(false);
      console.warn(error);
    }
  };

  useEffect(() => {
    generateThumbnails();
  }, []);

  console.log("thumbnails", thumbnails);

  return (
    <View style={styles.feedbackWrapper}>
      <Text style={styles.feedbackText}>
        Your feedback will visible for everyone
      </Text>
      <ScrollView
        style={{
          flex: 1,
        }}
      >
        <View style={styles.textArea}>
          <Rating
            startingValue={0}
            onFinishRating={ratingCompleted}
            imageSize={40}
            tintColor="#F2F2F7"
            style={{
              paddingTop: 0,
              marginBottom: 15,
            }}
          />
          <TextInput
            // style={styles.input}
            // value={this.state.value}
            // onChangeText={text=>this.setState({value:text})}
            multiline={true}
            numberOfLines={4}
            placeholder="Enter your feedback about this place"
            placeholderTextColor={COLORS.gray}
            style={{
              backgroundColor: "transparent",
              height: 70,
              padding: 15,
              borderRadius: 15,
              paddingTop: Platform.OS === "android" ? 0 : 15,
              marginTop: 15,
              color: COLORS.black,
              borderWidth: 1,
              borderColor: COLORS.gray,
            }}
          />
        </View>
        {loading ? (
          <View style={{ flexDirection: "row", display: "flex" }}>
            {[0, 1, 2, 3].map((item) => (
              <SkeletonLoaderImage
                height={140}
                width={150}
                marginBottom
                marginTop
              />
            ))}
          </View>
        ) : (
          <FlashList
            data={DATA}
            renderItem={({ item }) => (
              <View style={styles.reviewImage}>
                <Image
                  style={[
                    {
                      height: 140,
                      width: 150,
                      borderRadius: 15,
                      marginRight: 15,
                    },
                  ]}
                  cachePolicy="memory"
                  contentFit="cover"
                  transition={0}
                  source={{ uri: item }}
                />
                <TouchableOpacity
                  activeOpacity={0.7}
                  style={[styles.removeItemButton]}
                >
                  <XIcon width="10" />
                </TouchableOpacity>
              </View>
            )}
            estimatedItemSize={200}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingHorizontal: 0,
            }}
          />
        )}
        <TouchableOpacity
          style={styles.uploadButton}
          onPress={() => pickImages()}
        >
          <ImagesLinearIcon size={18} />
          <Text style={styles.uploadButtonText}>Upload images and videos</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  textArea: {
    paddingHorizontal: 0,
    marginTop: 25,
    paddingBottom: 0,
    borderRadius: 15,
    marginBottom: 15,
  },
  reviewImage: {
    position: "relative",
  },
  removeItemButton: {
    backgroundColor: "#DBDBDB",
    width: 25,
    height: 25,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 10,
    right: 20,
  },
  feedbackText: {
    fontSize: 14,
    color: COLORS.black,
  },
  uploadButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: Platform.OS === "android" ? 10 : 15,
    paddingHorizontal: 25,
    borderRadius: 50,
    marginTop: 25,
    borderWidth: 1,
    borderColor: COLORS.gray,
  },
  uploadButtonText: {
    marginLeft: 10,
    fontSize: Platform.OS === "android" ? 12 : 14,
  },
  feedbackWrapper: {
    justifyContent: "space-between",
    minHeight: "100%",
    paddingHorizontal: 15,
  },
});
