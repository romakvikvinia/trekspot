import React, { useCallback, useState } from "react";
import { Image } from "expo-image";
import { View, TouchableOpacity, ScrollView, Text } from "react-native";
import { exploreStyles } from "./_exploreStyles";
import { styles } from "../../../common/components/_styles";
import { COLORS } from "../../../styles/theme";
import {
  DownCircleIcon,
  UpCircleIcon,
  CalendarFilledIcon,
  TripLocationIcon,
} from "../../../utilities/SvgIcons.utility";
import { SightType } from "../../../api/api.types";
import { SightDetailModal } from "./SightDetailModal";

type SightsContainerProps = {
  items: Record<string, SightType[]>;
};

interface IState {
  item: SightType | null;
}

export const SightsRow = ({ rowKey, handleOpenSightDetail, items }) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <View
      key={`SightsContainer-item-${rowKey}`}
      style={[exploreStyles.placeSpotsRow, { marginTop: 10 }]}
    >
      <TouchableOpacity
        activeOpacity={0.7}
        style={exploreStyles.placeSpotsRowTrigger}
        onPress={() => setIsOpen(!isOpen)}
      >
        <View style={exploreStyles.placeSpotsRowLeft}>
          <Text
            style={[
              exploreStyles.placeSpotsRowTitle,
              {
                paddingHorizontal: 0,
                marginBottom: 5,
                fontWeight: "bold",
                fontSize: 20,
              },
            ]}
          >
            {rowKey}
          </Text>
          {!isOpen ? (
            <Text style={exploreStyles.placeSpotsRowSubTitle} numberOfLines={1}>
              {items &&
                items[rowKey] &&
                items[rowKey]
                  .slice(0, 3)
                  .map((i) => i.title)
                  .join(", ")}
            </Text>
          ) : null}
        </View>
        {!isOpen ? <DownCircleIcon /> : <UpCircleIcon />}
      </TouchableOpacity>
      {isOpen ? (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 15,
            paddingBottom: 0,
          }}
        >
          {items &&
            items[rowKey]?.map(
              (item, ind) =>
                item?.image && (
                  <TouchableOpacity
                    activeOpacity={0.7}
                    style={[
                      styles.thingsTodoItem,
                      {
                        width: 200,
                        marginRight: 15,
                        height: "auto",
                      },
                    ]}
                    key={ind}
                    onPress={() => handleOpenSightDetail(item)}
                  >
                    <View style={styles.imageWrapper}>
                      <Image
                        style={[
                          styles.thingsTodoItemImage,
                          {
                            minHeight: 190,
                            minWidth: 200,
                          },
                        ]}
                        cachePolicy="memory"
                        contentFit="cover"
                        transition={0}
                        source={
                          item?.image?.url
                            ? {
                                uri: item?.image?.url,
                              }
                            : require("../../../assets/no-image.png")
                        }
                      ></Image>
                    </View>

                    <View style={styles.thingsTodoItemDetails}>
                      <Text style={styles.thingsTodoItemTitle}>
                        {item.title}
                      </Text>

                      {/* <View style={styles.thingsTodoItemiIn}>
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
                      </View> */}

                      {/* event type style  */}

                      {/* <View style={styles.thingsTodoItemiIn}>
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
                          <CalendarFilledIcon
                            size="12"
                            color={COLORS.darkgray}
                          />
                          02-08-2024
                        </Text>

                        <TouchableOpacity
                          activeOpacity={0.7}
                          onPress={() => {
                            //   onEmbedModalOpen();
                            //   setBlogUrl("");
                            //   setPlaceTitle(item?.location);
                          }}
                        >
                          <Text
                            style={[
                              styles.thingsTodoItemiInprice,
                              {
                                fontSize: 14,
                              },
                            ]}
                          >
                            <TripLocationIcon
                              size="12"
                              color={COLORS.darkgray}
                            />{" "}
                            Location
                          </Text>
                        </TouchableOpacity>
                      </View> */}
                    </View>
                  </TouchableOpacity>
                )
            )}
        </ScrollView>
      ) : null}
    </View>
  );
};

export const SightsContainer: React.FC<SightsContainerProps> = ({ items }) => {
  const [state, setState] = useState<IState>({ item: null });

  const handleOpenSightDetail = useCallback((item: SightType) => {
    setState((prevState) => ({ ...prevState, item }));
  }, []);
  
  const handleOnClose = () => {
    setState((prevState) => ({ ...prevState, item: null }));
  };

  return (
    <>
      {Object.keys(items).map((key) => (
        <SightsRow
          rowKey={key}
          handleOpenSightDetail={handleOpenSightDetail}
          items={items}
        />
      ))}
      <SightDetailModal closeCallBack={handleOnClose} showDirection={false} data={state.item!} />
    </>
  );
};
