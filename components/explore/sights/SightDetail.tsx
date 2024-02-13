import React from "react";
import { Image } from "expo-image";
import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  ClickOutsideProvider,
  useClickOutside,
} from "react-native-click-outside";
import Swiper from "react-native-swiper";
import { COLORS, SIZES } from "../../../styles/theme";
import {
  CloseCircleIcon,
  Mark2,
  StarIcon,
  TripLocationIcon,
} from "../../../utilities/SvgIcons.utility";
import { SightType } from "../../../api/api.types";

type SightDetailProps = {
  isVisible: boolean;
  setSightDetailVisible: any;
  data: SightType;
};

export const SightDetail: React.FC<SightDetailProps> = ({
  isVisible,
  setSightDetailVisible,
  data,
}) => {
  const ref = useClickOutside(() => setSightDetailVisible(false));

  return (
    <Modal
      animationType={"none"}
      transparent={true}
      visible={isVisible}
      //   onRequestClose={this.closeModal}
    >
      <ClickOutsideProvider>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            height: "100%",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-end",
              width: "95%",
              marginBottom: 15,
            }}
          >
            <TouchableOpacity
              style={styles.closeModal}
              onPress={() => setSightDetailVisible(false)}
            >
              <CloseCircleIcon size="30" color="#fff" />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.modalContent} ref={ref}>
            <Swiper
              activeDotColor="#fff"
              style={[styles.wrapper]}
              showsButtons={false}
              loop={true}
              dotColor="#949494"
              automaticallyAdjustContentInsets
              paginationStyle={{
                position: "absolute",
                justifyContent: "center",
                left: 0,
                top: 0,
                height: 10,
              }}
              autoplay={true}
              dotStyle={{
                width: SIZES.width / data?.gallery?.length - 15,
                height: 3,
              }}
              activeDotStyle={{
                backgroundColor: "#fff",
                width: SIZES.width / data?.gallery?.length - 15,
                height: 3,
              }}
            >
              {data?.gallery?.map((item, ind) => (
                <Image
                  style={[styles.box]}
                  resizeMode="cover"
                  source={{
                    uri: item,
                  }}
                  key={`slide-${ind}`}
                ></Image>
              ))}
            </Swiper>
            <View style={styles.sightDetails}>
              <View style={styles.headingRow}>
                <Text style={styles.sightDetailsTitle}>{data?.title}</Text>

                <TouchableOpacity
                  style={[
                    styles.addToBucketButton,
                    {
                      backgroundColor:
                        1 == 0 ? COLORS.primary : "rgba(0, 0, 0, 0.3)",
                    },
                  ]}
                  activeOpacity={0.7}
                >
                  <Mark2 color="#fff" />
                </TouchableOpacity>
              </View>
              <Text style={styles.sightDetailsDescription}>
                {data?.description}
              </Text>
              <View style={styles.ratingWrapper}>
                <View
                  style={{
                    position: "relative",
                    top: -1,
                    opacity: 0.8,
                  }}
                >
                  <StarIcon size={15} color="#FFBC3E" />
                </View>
                <Text style={styles.ratingText}>{data?.rating}</Text>
                <Text style={styles.type}>{data?.type}</Text>
              </View>
              <Text style={styles.address}>
                <TripLocationIcon color="#000" size="12" /> {data?.address}
              </Text>
            </View>
          </ScrollView>
        </View>
      </ClickOutsideProvider>
    </Modal>
  );
};
export const styles = StyleSheet.create({
  modalContent: {
    maxHeight: 500,
    backgroundColor: "#fff",
    width: "95%",
    borderRadius: 15,
  },
  headingRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  addToBucketButton: {
    width: 30,
    height: 30,
    borderRadius: 50,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  closeModal: {
    position: "relative",
    right: 0,
    top: 0,
    zIndex: 5,
  },
  address: {
    fontSize: 14,
    color: COLORS.black,
    marginTop: 15,
  },
  sightDetailsTitle: {
    fontSize: 24,
    fontWeight: "600",
    color: COLORS.black,
    width: "80%",
  },
  type: {
    fontSize: 14,
    marginLeft: 10,
    color: COLORS.black,
  },
  ratingWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 15,
  },
  ratingText: {
    fontSize: 14,
    marginLeft: 5,
    color: COLORS.black,
  },
  sightDetailsDescription: {
    fontSize: 14,
    color: COLORS.black,
  },
  sightDetails: {
    padding: 15,
  },
  box: {
    height: 300,
    borderTopEndRadius: 10,
    borderTopLeftRadius: 10,
    overflow: "hidden",
  },
  wrapper: {
    position: "relative",
    height: 300,
  },
});
