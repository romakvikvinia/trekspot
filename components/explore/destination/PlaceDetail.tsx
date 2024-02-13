import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import React, { useCallback, useEffect, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import Swiper from "react-native-swiper";
import { styles } from "../../../common/components/_styles";
import { DownIcon, Mark2, StarIcon } from "../../../utilities/SvgIcons.utility";
import { exploreStyles } from "../sights/_exploreStyles";
import { CityType, SightType } from "../../../api/api.types";
import { useLazyGetSightsQuery } from "../../../api/api.trekspot";
import { SightItem } from "../sights/SightItem";
import { SightsContainer } from "../sights/SightsContainer";
import { SightDetail } from "../sights/SightDetail";

const place = {
  name: "Paris",
  rating: 5,
  visitors: "44m",
  gallery: [
    "https://cdn.pixabay.com/photo/2018/04/25/09/26/eiffel-tower-3349075_1280.jpg",
    "https://cdn.pixabay.com/photo/2020/07/23/21/34/arc-de-triomphe-5432392_1280.jpg",
    "https://cdn.pixabay.com/photo/2020/11/22/19/19/louvre-5767708_1280.jpg",
  ],
  topSights: [
    {
      thumbnail:
        "https://cdn.pixabay.com/photo/2013/04/13/18/42/tower-103417_1280.jpg",
      gallery: [
        "https://cdn.pixabay.com/photo/2015/10/06/18/26/eiffel-tower-975004_1280.jpg",
        "https://cdn.pixabay.com/photo/2020/07/12/16/40/paris-5397889_1280.jpg",
        "https://cdn.pixabay.com/photo/2016/11/22/21/38/architecture-1850676_1280.jpg",
        "https://cdn.pixabay.com/photo/2020/11/22/19/19/louvre-5767708_1280.jpg",
        "https://cdn.pixabay.com/photo/2021/08/04/14/16/tower-6521842_1280.jpg",
      ],
      title: "Eiffel Tower",
      rating: "4.7",
      type: "Historical landmark",
      address: "Paris, France",
      website: "",
      description:
        "Gustave Eiffel's iconic, wrought-iron 1889 tower, with steps and elevators to observation decks.",
    },
    {
      thumbnail:
        "https://cdn.pixabay.com/photo/2020/11/22/19/19/louvre-5767708_1280.jpg",
      title: "Louvre Museum",
      rating: "4.7",
      type: "Art museum",
      address: "",
      website: "",
      description:
        "Gustave Eiffel's iconic, wrought-iron 1889 tower, with steps and elevators to observation decks.",
    },
    {
      thumbnail:
        "https://cdn.pixabay.com/photo/2019/03/15/10/32/paris-4056742_1280.jpg",
      title: "Arc de Triomphe",
      rating: "4.7",
      type: "Monument",
      address: "",
      website: "",
      description:
        "Gustave Eiffel's iconic, wrought-iron 1889 tower, with steps and elevators to observation decks.",
    },
    {
      thumbnail:
        "https://lh5.googleusercontent.com/p/AF1QipNw1t4oS3qgaNJDl9e3aFDsMTsDcmQ2nzqQJCrP=w180-h180-n-k-no",
      title: "Cathédrale Notre-Dame de Paris",
      rating: "4.7",
      type: "Cathedral",
      address: "",
      website: "",
      description:
        "Gustave Eiffel's iconic, wrought-iron 1889 tower, with steps and elevators to observation decks.",
    },
    {
      thumbnail:
        "https://lh5.googleusercontent.com/p/AF1QipNZovbbqF9upAf7a4WXHyaAzK4YMVSL4tlhC22T=w180-h180-n-k-no",
      title: "Palace of Versailles",
      rating: "4.6",
      type: "Castle",
      address: "",
      website: "",
      description:
        "Gustave Eiffel's iconic, wrought-iron 1889 tower, with steps and elevators to observation decks.",
    },
    {
      thumbnail:
        "https://lh5.googleusercontent.com/p/AF1QipPNqJjqZMTr0x1byLyL4Y_RrgbjJIw4UOdXnDPk=w180-h180-n-k-no",
      title: "Musée d'Orsay",
      rating: "4.7",
      type: "Art museum",
      address: "",
      website: "",
    },
    {
      thumbnail:
        "https://lh5.googleusercontent.com/p/AF1QipNPEitTEMYRj4FVOO8L_W2VmloqNuky4cXKT9je=w180-h180-n-k-no",
      title: "Disneyland Paris",
      rating: "4.5",
      type: "Theme park",
      address: "",
      website: "",
      description:
        "Gustave Eiffel's iconic, wrought-iron 1889 tower, with steps and elevators to observation decks.",
    },
    {
      thumbnail:
        "https://lh5.googleusercontent.com/p/AF1QipOB_dBm_5jKqfStPXn1eifoxTwDvyxb5JnvyAWp=w180-h180-n-k-no",
      title: "Palais Garnier",
      rating: "4.7",
      type: "Opera house",
      address: "",
      website: "",
      description:
        "Gustave Eiffel's iconic, wrought-iron 1889 tower, with steps and elevators to observation decks.",
    },
    {
      thumbnail:
        "https://lh5.googleusercontent.com/p/AF1QipN4_JkVOD2-hrqC6WFKsBv8pR59zUYZV8eCKFIz=w180-h180-n-k-no",
      title: "Sainte-Chapelle",
      rating: "4.7",
      type: "Chapel",
      address: "",
      website: "",
    },
    {
      thumbnail:
        "https://lh5.googleusercontent.com/p/AF1QipMa2u3Yvr-1ssk_-0bIgJ7HHUTT6Y3fQL7gRMuN=w180-h180-n-k-no",
      title: "Puy du Fou",
      rating: "4.8",
      type: "Theme park",
      address: "",
      website: "",
      description:
        "Gustave Eiffel's iconic, wrought-iron 1889 tower, with steps and elevators to observation decks.",
    },
    {
      thumbnail:
        "https://lh5.googleusercontent.com/p/AF1QipMHVdVAECQWOQ5SahFrkqrilHwjo4RucqOur-No=w180-h180-n-k-no",
      title: "ZooParc de Beauval",
      rating: "4.7",
      type: "Zoo",
      address: "",
      website: "",
      description:
        "Gustave Eiffel's iconic, wrought-iron 1889 tower, with steps and elevators to observation decks.",
    },
    {
      thumbnail:
        "https://lh5.googleusercontent.com/p/AF1QipMr46WIib4tScq5FtfZtpX7aD0o6Bwa5CbP_H6m=w180-h180-n-k-no",
      title: "Tuileries Garden",
      rating: "4.6",
      type: "Garden",
      address: "",
      website: "",
      description:
        "Gustave Eiffel's iconic, wrought-iron 1889 tower, with steps and elevators to observation decks.",
    },
    {
      thumbnail:
        "https://lh5.googleusercontent.com/p/AF1QipOQ3rnQLOHyJBp1krgp4OQbtdwfKV0lcUxO1_V-=w180-h180-n-k-no",
      title: "Luxembourg Palace",
      rating: "4.7",
      type: "Government office",
      address: "",
      website: "",
      description:
        "Gustave Eiffel's iconic, wrought-iron 1889 tower, with steps and elevators to observation decks.",
    },
    {
      thumbnail:
        "https://lh5.googleusercontent.com/p/AF1QipMREO-l4r_duhhUyz2p5iFipqj9ujd1a7REdDfu=w180-h180-n-k-no",
      title: "The Centre Pompidou",
      rating: "4.4",
      type: "Cultural centre",
      address: "",
      website: "",
      description:
        "Gustave Eiffel's iconic, wrought-iron 1889 tower, with steps and elevators to observation decks.",
    },
    {
      thumbnail:
        "https://lh5.googleusercontent.com/p/AF1QipPyfjb43DqQIqOvkhkKDEEY8gXk4E14UYLHcYYT=w180-h180-n-k-no",
      title: "Shakespeare and Company",
      rating: "4.6",
      type: "Book Shop",
      address: "",
      website: "",
      description:
        "Gustave Eiffel's iconic, wrought-iron 1889 tower, with steps and elevators to observation decks.",
    },
    {
      thumbnail:
        "https://lh4.googleusercontent.com/proxy/enuqfmhEUp5ZDXhARjSFa1MschXyWdXUhtRI3rIifXn1z8OaLxffsQsln3rIfhYeOvB65sU0gY_C2k9oTTJvu2QlA9hHO5hV7hl2zTokP3nyez5_Kg1wglTqrfNQeP6OJLUQzSUmqZ-8Oph07_ZV4BErAIf7M8E=w180-h180-n-k-no",
      title: "Pont du Gard",
      rating: "4.6",
      type: "Bridge",
      address: "",
      website: "",
      description:
        "Gustave Eiffel's iconic, wrought-iron 1889 tower, with steps and elevators to observation decks.",
    },
    {
      thumbnail:
        "https://lh5.googleusercontent.com/p/AF1QipO4OjI5bIu4zbpeHJxxEsgU6UhxnuLQajee2Sg5=w180-h180-n-k-no",
      title: "Jardin du Luxembourg",
      rating: "4.7",
      type: "Garden",
      address: "",
      website: "",
      description:
        "Gustave Eiffel's iconic, wrought-iron 1889 tower, with steps and elevators to observation decks.",
    },
  ],
  events: [
    {
      title: "Four Tet",
      date: "Sat, 27 Jan",
      location: "Zenith Paris",
      url: "https://ra.co/events/1795944",
      thumbnail:
        "https://imgproxy.ra.co/_/w:764/quality:50/h:1080/rt:fill/aHR0cHM6Ly9pbWFnZXMucmEuY28vNWRmNDY0MGZjZGFjNTAyNGQ3MGFjY2ViMmQ1ZGNiYzA5ZGMxZjAzNS5wbmc=",
    },
    {
      title: "Tech Noire feat. Sixth June",
      date: "Sat, 27 Jan",
      location: "La Station - Gare des Mines",
      url: "https://ra.co/events/1795944",
      thumbnail:
        "https://imgproxy.ra.co/_/w:1442/quality:50/h:2039/rt:fill/aHR0cHM6Ly9pbWFnZXMucmEuY28vZTg1YjI4YzZiOWMyMmM2N2UxZGEyNmUwZTQwYmEyNjMyYjE1MTYzMi5qcGc=",
    },
    {
      title: "Electro News 15 years - 2 Day Festival",
      date: "Sat, 27 Jan",
      location: "Magasins Généraux",
      url: "https://ra.co/events/1795944",
      thumbnail:
        "https://imgproxy.ra.co/_/w:764/quality:50/h:1080/rt:fill/aHR0cHM6Ly9pbWFnZXMucmEuY28vYmIxM2E2YThlYzEwYThhMGY3OGZlZjdjY2RiZWEzY2U2MzQ2YmY2MS5qcGc=",
    },
    {
      title: "Four Tet",
      date: "Sat, 27 Jan",
      location: "Zenith Paris",
      url: "https://ra.co/events/1795944",
      thumbnail:
        "https://imgproxy.ra.co/_/w:764/quality:50/h:1080/rt:fill/aHR0cHM6Ly9pbWFnZXMucmEuY28vNWRmNDY0MGZjZGFjNTAyNGQ3MGFjY2ViMmQ1ZGNiYzA5ZGMxZjAzNS5wbmc=",
    },
  ],
};

type PlaceDetailProps = {
  city: CityType;
};

interface IState {
  sight: SightType | null;
  modalRef?: any;
}

export const PlaceDetail: React.FC<PlaceDetailProps> = ({ city, modalRef }) => {
  const [state, setState] = useState<IState>({ sight: null });
  const [getSights, { data, isLoading }] = useLazyGetSightsQuery();

  useEffect(() => {
    getSights({ iso2: "FR", city: "Paris" });
  }, []);

  const handleSetSightItem = useCallback((sight: SightType) => {
    setState((prevState) => ({ ...prevState, sight }));
  }, []);

  const handleClose = useCallback(() => {
    if (modalRef && modalRef.current) {
      modalRef.current.close();
    }
  }, []);

  // transform data

  const topSights = (data && "Top Sights" in data && data["Top Sights"]) || [];
  let sights = data && { ...data };
  if (sights && data && "Top Sights" in data && data["Top Sights"]) {
    delete sights["Top Sights"];
  }
  return (
    <>
      <View
        style={{
          flex: 1,
          minHeight: "100%",
          paddingBottom: 50,
        }}
      >
        <View
          style={[
            styles.swiperWrapper,
            {
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
              overflow: "hidden",
            },
          ]}
        >
          <TouchableOpacity
            onPress={handleClose}
            activeOpacity={0.7}
            style={[
              styles.backButton,
              {
                top: 15,
              },
            ]}
          >
            <DownIcon color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.addToBucketButton,
              {
                // backgroundColor: 1 == 0 ? COLORS.primary : "rgba(0, 0, 0, 0.3)", // check for favorite
                backgroundColor: "rgba(0, 0, 0, 0.3)",
                top: 15,
              },
            ]}
            activeOpacity={0.7}
          >
            <Mark2 color="#fff" />
          </TouchableOpacity>
          <Swiper
            activeDotColor="#fff"
            style={[styles.wrapper]}
            showsButtons={false}
            loop={false}
            dotColor="#949494"
            automaticallyAdjustContentInsets
            paginationStyle={{
              position: "absolute",
              justifyContent: "flex-end",
              paddingRight: 15,
              bottom: 16,
            }}
          >
            {city.images.map((item) => (
              <Image
                style={[styles.box]}
                resizeMode="cover"
                source={{
                  uri: item.url,
                }}
                key={`slide-${item.id}`}
              >
                <LinearGradient
                  style={styles.gradientWrapper}
                  colors={["rgba(0,0,0,0.1)", "rgba(0,0,0,0.4)"]}
                ></LinearGradient>
              </Image>
            ))}
          </Swiper>

          <View style={styles.otherInfo}>
            <View style={styles.labelItem}>
              <Text style={styles.labelItemText}>{place?.name}</Text>
            </View>
            <View style={styles.ratingLabel}>
              <View
                style={{
                  position: "relative",
                  top: -1,
                  opacity: 0.8,
                }}
              >
                <StarIcon size={15} color="#FFBC3E" />
              </View>
              <Text style={styles.ratingText}>{city.rate} /</Text>
              <Text style={styles.ratingText}>{city.visitors} visitors</Text>
            </View>
          </View>
        </View>
        <View
          style={[
            exploreStyles.placeSpotsRow,
            {
              borderTopWidth: 0,
            },
          ]}
        >
          <Text style={exploreStyles.placeSpotsRowTitle}>Top sights</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              paddingHorizontal: 15,
            }}
          >
            {topSights.map((item) => (
              <SightItem item={item} onHandleItem={handleSetSightItem} />
            ))}
          </ScrollView>
        </View>
        {sights && Object.keys(sights).length && (
          <SightsContainer items={sights} />
        )}
        {state.sight && <SightDetail data={state.sight} />}
      </View>
    </>
  );
};
