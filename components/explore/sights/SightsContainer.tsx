import React, { useCallback, useState } from "react";
import { Image } from "expo-image";
import { View, TouchableOpacity, ScrollView, Text } from "react-native";
import { exploreStyles } from "./_exploreStyles";
import { styles } from "../../../common/components/_styles";
// import { COLORS } from "../../../styles/theme";
import {
  DownCircleIcon,
  UpCircleIcon,
  //   CalendarFilledIcon,
  //   TripLocationIcon,
} from "../../../utilities/SvgIcons.utility";
import { SightType } from "../../../api/api.types";
import { SightDetail } from "./SightDetail";

type SightsContainerProps = {
  items: Record<string, SightType[]>;
};

interface IState {
  isOpen: Record<string, boolean>;
  item: SightType | null;
}

export const SightsContainer: React.FC<SightsContainerProps> = ({ items }) => {
  const [state, setState] = useState<IState>({ isOpen: {}, item: null });

  const handleOpenSightDetail = useCallback((item: SightType) => {
    setState((prevState) => ({ ...prevState, item }));
  }, []);

  return (
    <>
      {Object.keys(items).map((key) => (
        <View
          key={`SightsContainer-item-${key}`}
          style={[exploreStyles.placeSpotsRow, { marginTop: 10 }]}
        >
          <TouchableOpacity
            activeOpacity={0.7}
            style={exploreStyles.placeSpotsRowTrigger}
            onPress={() =>
              setState((prevState) => ({
                ...prevState,
                isOpen: {
                  [key]: prevState.isOpen[key] ? false : true,
                },
              }))
            }
          >
            <View style={exploreStyles.placeSpotsRowLeft}>
              <Text
                style={[
                  exploreStyles.placeSpotsRowTitle,
                  { paddingHorizontal: 0, marginBottom: 5 },
                ]}
              >
                {key}
              </Text>
              {!state.isOpen[key] ? (
                <Text
                  style={exploreStyles.placeSpotsRowSubTitle}
                  numberOfLines={1}
                >
                  {items &&
                    items[key] &&
                    items[key]
                      .slice(0, 3)
                      .map((i) => i.title)
                      .join(", ")}
                </Text>
              ) : null}
            </View>
            {!state.isOpen[key] ? <DownCircleIcon /> : <UpCircleIcon />}
          </TouchableOpacity>
          {state.isOpen[key] ? (
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{
                paddingHorizontal: 15,
                paddingBottom: 10,
              }}
            >
              {items &&
                items[key].map((item, ind) => (
                  <TouchableOpacity
                    activeOpacity={0.7}
                    style={[
                      styles.thingsTodoItem,
                      {
                        width: 170,
                        marginRight: 5,
                        height: "auto",
                      },
                    ]}
                    key={ind}
                    onPress={() => handleOpenSightDetail(item)}
                  >
                    {item.image && (
                      <Image
                        style={[
                          styles.thingsTodoItemImage,
                          {
                            minHeight: 140,
                          },
                        ]}
                        cachePolicy="memory"
                        contentFit="cover"
                        transition={0}
                        source={{
                          uri: item.image.url,
                        }}
                      ></Image>
                    )}

                    <View style={styles.thingsTodoItemDetails}>
                      <Text style={styles.thingsTodoItemTitle}>
                        {item.title}
                      </Text>

                      <View style={styles.thingsTodoItemiIn}>
                        {item.price ? (
                          <Text
                            style={[
                              styles.thingsTodoItemiInprice,
                              {
                                fontSize: 14,
                              },
                            ]}
                          >
                            {item.price}
                          </Text>
                        ) : null}
                        {item.category ? (
                          <Text
                            style={[
                              styles.thingsTodoItemiIntypeText,
                              {
                                fontSize: 14,
                              },
                            ]}
                          >
                            {item.category}
                          </Text>
                        ) : null}
                      </View>

                      {/* event type style  */}

                      {/* <View style={styles.thingsTodoItemiIn}>
                    {item?.date ? (
                      <Text
                        style={[
                          styles.thingsTodoItemiIntypeText,
                          {
                            fontSize: 14,
                            color: COLORS.black,
                            marginBottom: 8,
                          },
                        ]}
                      >
                        <CalendarFilledIcon size="12" color={COLORS.darkgray} />{" "}
                        {item?.date}
                      </Text>
                    ) : null}
                    <TouchableOpacity
                      activeOpacity={0.7}
                      onPress={() => {
                        //   onEmbedModalOpen();
                        //   setBlogUrl("");
                        //   setPlaceTitle(item?.location);
                      }}
                    >
                      {item?.location ? (
                        <Text
                          style={[
                            styles.thingsTodoItemiInprice,
                            {
                              fontSize: 14,
                            },
                          ]}
                        >
                          <TripLocationIcon size="12" color={COLORS.darkgray} />{" "}
                          {item?.location}
                        </Text>
                      ) : null}
                    </TouchableOpacity>
                  </View> */}
                    </View>
                  </TouchableOpacity>
                ))}
            </ScrollView>
          ) : null}
        </View>
      ))}
      <SightDetail data={state.item!} />
    </>
  );
};
