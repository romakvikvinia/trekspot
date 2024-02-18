import { useState } from "react";
import {
  ImageBackground,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { COLORS } from "../../../styles/theme";
import { StarIcon } from "../../../utilities/SvgIcons.utility";
import { styles } from "../_styles";

export const Tours = () => {
  const tours = [
    {
      price: "$50.44",
      duration: "2 hours",
      src: "https://media.tacdn.com/media/attractions-splice-spp-360x240/0f/a9/2f/fd.jpg",
      title: "Visit all floors of the Eiffel Tower by elevator",
      score: "902 ",
    },
    {
      price: "$128.91",
      duration: "3 hours",
      src: "https://media.tacdn.com/media/attractions-splice-spp-360x240/11/df/24/bd.jpg",
      title:
        "Paris Seine River Dinner Cruise with Live Music by Bateaux Mouches",
      score: "2,437 ",
    },
    {
      price: "$73.98",
      duration: "3 hours",
      src: "https://media.tacdn.com/media/attractions-splice-spp-360x240/11/d4/2d/42.jpg",
      title: "Skip-the-Line: Louvre Museum Masterpieces Fully Guided Tour",
      score: "7,499 ",
    },
    {
      price: "$66.92",
      duration: "2 hours 30 minutes",
      src: "https://media.tacdn.com/media/attractions-splice-spp-360x240/07/41/3e/59.jpg",
      title: "Louvre Museum Skip the Line Access with Guided Tour Option",
      score: "3,542 ",
    },
    {
      price: "$139.78",
      duration: "2 hours 30 minutes",
      src: "https://media.tacdn.com/media/attractions-splice-spp-360x240/0f/ee/9b/24.jpg",
      title:
        "Bateaux Parisiens Seine River Gourmet Dinner & Sightseeing Cruise",
      score: "4,911 ",
    },
    {
      price: "$105.89",
      duration: "3 hours",
      src: "https://media.tacdn.com/media/attractions-splice-spp-360x240/11/ac/fe/a1.jpg",
      title:
        "Versailles Palace & Garden Tour w. Skip The Line Entry from Paris",
      score: "539 ",
    },
    {
      price: "$141.40",
      duration: "2 hours 30 minutes",
      src: "https://media.tacdn.com/media/attractions-splice-spp-360x240/06/f9/15/d3.jpg",
      title: "Louvre Museum Paris Exclusive Guided Tour With Reserved Entry",
      score: "2,471 ",
    },
    {
      price: "$43.72",
      duration: "1 hour 30 minutes",
      src: "https://media.tacdn.com/media/attractions-splice-spp-360x240/06/74/aa/fc.jpg",
      title: "Eiffel Tower with Host Summit or 2nd Floor",
      score: "3,819 ",
    },
    {
      price: "$45.40",
      duration: "2 hours",
      src: "https://media.tacdn.com/media/attractions-splice-spp-360x240/0b/3a/dc/16.jpg",
      title: "Big Bus Paris Hop-On Hop-Off Tour with Optional River Cruise",
      score: "4,986 ",
    },
    {
      price: "$62.77",
      duration: "1 to 2 days",
      src: "https://media.tacdn.com/media/attractions-splice-spp-360x240/12/38/71/74.jpg",
      title: "Disneyland® Paris Entrance Ticket",
      score: "2,886 ",
    },
    {
      price: "$66.11",
      duration: "1 hour",
      src: "https://media.tacdn.com/media/attractions-splice-spp-360x240/11/cc/5b/b8.jpg",
      title: "Paris Catacombs Tickets And Audio Guided",
      score: "93 ",
    },
    {
      price: "$39.23",
      duration: "2 to 5 hours",
      src: "https://media.tacdn.com/media/attractions-splice-spp-360x240/0f/fb/ea/06.jpg",
      title: "Priority Admission to Louvre Museum",
      score: "414 ",
    },
    {
      price: "$60.53",
      duration: "2 hours",
      src: "https://media.tacdn.com/media/attractions-splice-spp-360x240/11/c8/9f/d4.jpg",
      title: "Eiffel Tower Guiding Tour by Elevator with Summit Access",
      score: "332 ",
    },
    {
      price: "$99.77",
      duration: "1 hour",
      src: "https://media.tacdn.com/media/attractions-splice-spp-360x240/06/75/b0/4f.jpg",
      title: "Eiffel Tower Reserved Entrance Tour with Summit by Elevator",
      score: "2,001 ",
    },
    {
      price: "$88.89",
      duration: "2 hours",
      src: "https://media.tacdn.com/media/attractions-splice-spp-360x240/0f/ee/ae/9c.jpg",
      title: "Bateaux Parisiens Seine River Gourmet Lunch & Sightseeing Cruise",
      score: "1,698 ",
    },
    {
      price: "$122.19",
      duration: "3 hours 18 minutes",
      src: "https://media.tacdn.com/media/attractions-splice-spp-360x240/0f/70/dc/71.jpg",
      title: "Paris Walking Food Tour With Secret Food Tours",
      score: "1,974 ",
    },
    {
      price: "$67.26",
      duration: "1 hour 45 minutes",
      src: "https://media.tacdn.com/media/attractions-splice-spp-360x240/07/8f/2d/63.jpg",
      title: "Paris en Scene Boat 3 Course Dinner Cruise",
      score: "2,028 ",
    },
    {
      price: "$167.02",
      duration: "13 hours",
      src: "https://media.tacdn.com/media/attractions-splice-spp-360x240/06/ef/71/1f.jpg",
      title: "Loire Valley Castles Day Trip from Paris with Wine Tasting",
      score: "1,548 ",
    },
    {
      price: "$29.15",
      duration: "1 to 5 hours",
      src: "https://media.tacdn.com/media/attractions-splice-spp-360x240/10/5a/54/d1.jpg",
      title: "Louvre Museum Ticket & Seine River Cruise",
      score: "469 ",
    },
    {
      price: "$154.69",
      duration: "2 hours",
      src: "https://media.tacdn.com/media/attractions-splice-spp-360x240/08/39/fc/2e.jpg",
      title: "Paris Moulin Rouge Cabaret Show with Champagne Only or Dinner",
      score: "4,583 ",
    },
    {
      price: "$144.60",
      duration: "14 hours",
      src: "https://media.tacdn.com/media/attractions-splice-spp-360x240/11/cc/15/41.jpg",
      title:
        "Mont Saint Michel Day Trip from Paris with English Speaking Guide",
      score: "606 ",
    },
    {
      price: "$201.77",
      duration: "2 hours 30 minutes",
      src: "https://media.tacdn.com/media/attractions-splice-spp-360x240/0b/2e/01/5b.jpg",
      title: "Learn to bake French Croissant with a Pastry Chef",
      score: "311 ",
    },
    {
      price: "$127.60",
      duration: "1 hour 30 minutes",
      src: "https://media.tacdn.com/media/attractions-splice-spp-360x240/06/fd/30/21.jpg",
      title: "Paris Seine River Gourmet Dinner Cruise with Champagne",
      score: "1,419 ",
    },
    {
      price: "$178.23",
      duration: "14 hours",
      src: "https://media.tacdn.com/media/attractions-splice-spp-360x240/11/fa/5d/da.jpg",
      title:
        "Normandy D-Day Landing Beaches Day Trip with Cider Tasting & Lunch from Paris",
      score: "2,079 ",
    },
  ];

  const [selectedCity, setSelectedCity] = useState("Paris");

  return (
    <>
      <View style={styles.cityWrapper}>
        <TouchableOpacity
          style={[
            styles.citySelectBtn,
            selectedCity === "Paris" ? styles.selectedCityActive : null,
          ]}
          onPress={() => setSelectedCity("Paris")}
          activeOpacity={0.7}
        >
          <Text
            style={[
              styles.citySelectBtnText,
              selectedCity === "Paris" ? styles.selectedCity : null,
            ]}
          >
            Paris
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.7}
          style={[
            styles.citySelectBtn,
            selectedCity === "Lyon" ? styles.selectedCityActive : null,
          ]}
          onPress={() => setSelectedCity("Lyon")}
        >
          <Text
            style={[
              styles.citySelectBtnText,
              selectedCity === "Lyon" ? styles.selectedCity : null,
            ]}
          >
            Lyon
          </Text>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.7} style={styles.citySelectBtn}>
          <Text style={styles.citySelectBtnText}>Strasburg</Text>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.7} style={styles.citySelectBtn}>
          <Text style={styles.citySelectBtnText}>Marcel</Text>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.7} style={styles.citySelectBtn}>
          <Text style={styles.citySelectBtnText}>Paris</Text>
        </TouchableOpacity>
      </View>
      <ScrollView
        style={[styles.tabWrapper]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.thingsTodo}>
          {tours?.map((item, ind) => (
            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.thingsTodoItem}
              key={ind}
              // onPress={() => {
              //   onEmbedModalOpen();
              //   setPlaceTitle(item?.title);
              // }}
            >
              <ImageBackground
                style={styles.thingsTodoItemImage}
                source={{
                  uri: item.src,
                }}
              >
                <View
                  style={[
                    styles.ratingLabel,
                    {
                      position: "absolute",
                      left: 10,
                      bottom: 5,
                      backgroundColor: "rgba(0, 0, 0, 0.5)",
                      paddingBottom: 5,
                      paddingRight: 8,
                      zIndex: 1,
                      opacity: 1,
                    },
                  ]}
                >
                  <View style={{ position: "relative", top: 0, opacity: 1 }}>
                    <StarIcon color="#FFBC3E" />
                  </View>
                  <Text
                    style={[
                      styles.ratingText,
                      {
                        color: "#fff",
                        marginLeft: 2,
                        opacity: 1,
                        fontSize: 12,
                      },
                    ]}
                  >
                    {item?.score}
                  </Text>
                </View>
              </ImageBackground>

              <View style={styles.thingsTodoItemDetails}>
                <Text
                  style={[
                    styles.thingsTodoItemTitle,
                    { fontSize: 14, marginBottom: 5 },
                  ]}
                >
                  {item.title}
                </Text>

                <View style={styles.thingsTodoItemiIn}>
                  <Text
                    style={[
                      styles.thingsTodoItemiIntypeText,
                      { fontWeight: "500", color: COLORS.black },
                    ]}
                  >
                    <Text
                      style={{
                        fontWeight: "400",
                        color: COLORS.gray,
                      }}
                    >
                      Price from:
                    </Text>{" "}
                    {item.price}
                  </Text>
                  <Text
                    style={[
                      styles.thingsTodoItemiIntypeText,
                      { fontWeight: "500", color: COLORS.black },
                    ]}
                  >
                    <Text
                      style={{
                        fontWeight: "400",
                        color: COLORS.gray,
                      }}
                    >
                      Duration:
                    </Text>{" "}
                    {item.duration}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </>
  );
};
