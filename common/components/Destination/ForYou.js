import { useNavigation } from "@react-navigation/native";
import { FlashList } from "@shopify/flash-list";
import { Image } from "expo-image";
import { useRef, useState } from "react";
import {
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Modalize } from "react-native-modalize";
import { Portal } from "react-native-portalize";
import { PlaceDetail } from "../../../screen/Explore/PlaceDetail";
import { MarkerFillIcon } from "../../../utilities/SvgIcons.utility";
import { MapEmbedView } from "../MapEmbedView";
import { styles } from "../_styles";

export const ForYou = ({ DATA }) => {
  const modalEmbedRef = useRef(null);
  const modalPlaceDetail = useRef(null);
  const [blogUrl, setBlogUrl] = useState("");
  const [placeTitle, setPlaceTitle] = useState("");

  const onEmbedModalOpen = () => {
    modalEmbedRef.current?.open();
  };
  const onPlaceDetailOpen = () => {
    modalPlaceDetail.current?.open();
  };

  return (
    <>
      <View style={[styles.forYouRow, { marginTop: 25 }]}>
        <Text style={styles.forYouRowTitle}>Cities to visit </Text>
        <View
          style={[
            styles.tabWrapper,
            {
              paddingBottom: 5,
              marginBottom: 0,
              flexWrap: "wrap",
              flexDirection: "row",
              justifyContent: "space-between",
              minHeight: 200,
            },
          ]}
        >
          <FlashList
            renderItem={({ item, ind }) => {
              return (
                <TouchableOpacity
                  activeOpacity={0.7}
                  style={[
                    styles.thingsTodoItem,
                    {
                      width: "95%",
                      marginBottom: 10,
                    },
                  ]}
                  key={ind}
                  onPress={() => onPlaceDetailOpen()}
                >
                  <Image
                    style={[
                      styles.thingsTodoItemImage,
                      {
                        minHeight: 120,
                      },
                    ]}
                    cachePolicy="memory"
                    contentFit="cover"
                    transition={0}
                    source={{
                      uri: item.thumbnail,
                    }}
                  ></Image>

                  <View style={styles.thingsTodoItemDetails}>
                    <Text style={styles.thingsTodoItemTitle}>{item.title}</Text>

                    <View style={styles.thingsTodoItemiIn}>
                      <Text
                        style={[
                          styles.thingsTodoItemiIntypeText,
                          { fontSize: 12 },
                        ]}
                      >
                        {item.description}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            }}
            numColumns={3}
            estimatedItemSize={10}
            data={DATA?.mustSeePlaces?.slice(0, 6)}
          />
        </View>
        <View style={styles.showMoreButtonWrapper}>
          <TouchableOpacity activeOpacity={0.7} style={styles.showMoreButton}>
            <Text style={styles.showMoreButtonText}>Show more</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={[styles.forYouRow]}>
        <Text style={styles.forYouRowTitle}>Top spots</Text>
        <View
          style={[
            styles.tabWrapper,
            {
              paddingBottom: 5,
              marginBottom: 0,
              flexWrap: "wrap",
              flexDirection: "row",
              justifyContent: "space-between",
              minHeight: 200,
            },
          ]}
        >
          <FlashList
            renderItem={({ item, ind }) => {
              return (
                <TouchableOpacity
                  activeOpacity={0.7}
                  style={[
                    styles.thingsTodoItem,
                    {
                      width: "95%",
                      marginBottom: 10,
                    },
                  ]}
                  key={ind}
                  onPress={() => {
                    onEmbedModalOpen();
                    setBlogUrl("");
                    setPlaceTitle(item?.title);
                  }}
                >
                  <Image
                    style={[
                      styles.thingsTodoItemImage,
                      {
                        minHeight: 120,
                      },
                    ]}
                    cachePolicy="memory"
                    contentFit="cover"
                    transition={0}
                    source={{
                      uri: item.thumbnail,
                    }}
                  >
                    <View style={styles.mapButton}>
                      <MarkerFillIcon color="#fff" size="10" />
                      <Text style={styles.mapButtonText}>Map</Text>
                    </View>
                  </Image>

                  <View style={styles.thingsTodoItemDetails}>
                    <Text style={styles.thingsTodoItemTitle}>
                      {item?.title}
                    </Text>
                    {item?.description ? (
                      <View style={styles.thingsTodoItemiIn}>
                        <Text
                          style={[
                            styles.thingsTodoItemiIntypeText,
                            { fontSize: 12 },
                          ]}
                        >
                          {item.description}
                        </Text>
                      </View>
                    ) : null}
                    {item?.type ? (
                      <View style={styles.thingsTodoItemiIn}>
                        <Text style={styles.thingsTodoItemiIntypeText}>
                          {item.type}
                        </Text>
                      </View>
                    ) : null}
                  </View>
                </TouchableOpacity>
              );
            }}
            numColumns={3}
            estimatedItemSize={10}
            data={DATA?.topSights?.slice(0, 6)}
          />
        </View>
        <View style={styles.showMoreButtonWrapper}>
          <TouchableOpacity activeOpacity={0.7} style={styles.showMoreButton}>
            <Text style={styles.showMoreButtonText}>Show more</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={[styles.forYouRow]}>
        <Text style={styles.forYouRowTitle}>Historical places</Text>
        <View
          style={[
            styles.tabWrapper,
            {
              paddingBottom: 5,
              marginBottom: 0,
              flexWrap: "wrap",
              flexDirection: "row",
              justifyContent: "space-between",
              minHeight: 200,
            },
          ]}
        >
          <FlashList
            renderItem={({ item, ind }) => {
              return (
                <TouchableOpacity
                  activeOpacity={0.7}
                  style={[
                    styles.thingsTodoItem,
                    {
                      width: "95%",
                      marginBottom: 10,
                    },
                  ]}
                  key={ind}
                  onPress={() => {
                    onEmbedModalOpen();
                    setBlogUrl("");
                    setPlaceTitle(item?.title);
                  }}
                >
                  <Image
                    style={[
                      styles.thingsTodoItemImage,
                      {
                        minHeight: 120,
                      },
                    ]}
                    cachePolicy="memory"
                    contentFit="cover"
                    transition={0}
                    source={{
                      uri: item.thumbnail,
                    }}
                  >
                    <View style={styles.mapButton}>
                      <MarkerFillIcon color="#fff" size="10" />
                      <Text style={styles.mapButtonText}>Map</Text>
                    </View>
                  </Image>

                  <View style={styles.thingsTodoItemDetails}>
                    <Text style={styles.thingsTodoItemTitle}>
                      {item?.title}
                    </Text>
                    {item?.description ? (
                      <View style={styles.thingsTodoItemiIn}>
                        <Text
                          style={[
                            styles.thingsTodoItemiIntypeText,
                            { fontSize: 12 },
                          ]}
                        >
                          {item.description}
                        </Text>
                      </View>
                    ) : null}
                    {item?.type ? (
                      <View style={styles.thingsTodoItemiIn}>
                        <Text style={styles.thingsTodoItemiIntypeText}>
                          {item.type}
                        </Text>
                      </View>
                    ) : null}
                  </View>
                </TouchableOpacity>
              );
            }}
            numColumns={3}
            estimatedItemSize={10}
            data={DATA?.historicalPlaces?.slice(0, 6)}
          />
        </View>
        <View style={styles.showMoreButtonWrapper}>
          <TouchableOpacity activeOpacity={0.7} style={styles.showMoreButton}>
            <Text style={styles.showMoreButtonText}>Show more</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={[styles.forYouRow]}>
        <Text style={styles.forYouRowTitle}>Blogs</Text>
        <View
          style={[
            styles.tabWrapper,
            {
              paddingBottom: 5,
              marginBottom: 0,
              flexWrap: "wrap",
              flexDirection: "row",
              justifyContent: "space-between",
              minHeight: 200,
            },
          ]}
        >
          <FlashList
            renderItem={({ item, ind }) => {
              return (
                <TouchableOpacity
                  activeOpacity={0.7}
                  style={[
                    styles.thingsTodoItem,
                    {
                      width: "95%",
                    },
                  ]}
                  key={ind}
                  onPress={() => {
                    onEmbedModalOpen();
                    setPlaceTitle("");
                    setBlogUrl(item?.url);
                  }}
                >
                  <Image
                    style={[
                      styles.thingsTodoItemImage,
                      {
                        minHeight: 160,
                      },
                    ]}
                    source={{
                      uri: item.thumbnail,
                    }}
                    cachePolicy="memory"
                    contentFit="cover"
                    transition={0}
                  >
                    <View
                      style={[
                        styles.mapButton,
                        { backgroundColor: "rgba(0,0,0, 0.5)" },
                      ]}
                    >
                      <Text style={styles.mapButtonText}>Details</Text>
                    </View>
                  </Image>

                  <View style={styles.thingsTodoItemDetails}>
                    <Text style={styles.thingsTodoItemTitle}>{item.title}</Text>
                  </View>
                </TouchableOpacity>
              );
            }}
            numColumns={2}
            estimatedItemSize={10}
            data={DATA?.blogs?.slice(0, 6)}
          />
        </View>
        <View style={styles.showMoreButtonWrapper}>
          <TouchableOpacity activeOpacity={0.7} style={styles.showMoreButton}>
            <Text style={styles.showMoreButtonText}>Show more</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Portal>
        <Modalize
          ref={modalPlaceDetail}
          withHandle={false}
          modalTopOffset={30}
          scrollViewProps={{
            alwaysBounceVertical: false,
            showsVerticalScrollIndicator: false,
          }}
          velocity={100000}
          tapGestureEnabled={false}
          closeSnapPointStraightEnabled={false}
        >
          <PlaceDetail
            setPlaceTitle={setPlaceTitle}
            onEmbedModalOpen={onEmbedModalOpen}
            setBlogUrl={setBlogUrl}
          />
        </Modalize>
      </Portal>
      <Portal>
        <Modalize ref={modalEmbedRef} modalTopOffset={65} adjustToContentHeight>
          <MapEmbedView
            blogUrl={blogUrl}
            placeTitle={placeTitle}
            modalEmbedRef={modalEmbedRef}
          />
        </Modalize>
      </Portal>
    </>
  );
};
