import { useState } from "react";
import {
  ImageBackground,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { styles } from "../_styles";

export const Events = () => {
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
        style={styles.tabWrapper}
        showsVerticalScrollIndicator={false}
        alwaysBounceVertical={false}
      >
        <View style={styles.eventDate}>
          <Text style={styles.eventDateText}>30 November</Text>
        </View>
        <TouchableOpacity activeOpacity={0.7} style={styles.eventItem}>
          <ImageBackground
            resizeMode="cover"
            style={{
              minWidth: 50,
              minHeight: 50,
              backgroundColor: "#fff",
              borderRadius: 50,
              borderWidth: 8,
              borderColor: "#fff",
            }}
            width={50}
            height={50}
            source={{
              uri: "https://cdn-icons-png.flaticon.com/512/5842/5842939.png",
            }}
          ></ImageBackground>
          <View style={styles.eventRight}>
            <Text style={styles.eventTitle}>
              Sivilizasyon x Gambetta Club After Party Techno Noël ! 2023
            </Text>
            <Text style={styles.eventLocation}>
              Le Gambetta Club, Paris, France
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.7} style={styles.eventItem}>
          <ImageBackground
            resizeMode="cover"
            style={{
              minWidth: 50,
              minHeight: 50,
              backgroundColor: "#fff",
              borderRadius: 50,
              borderWidth: 8,
              borderColor: "#fff",
            }}
            width={50}
            height={50}
            source={{
              uri: "https://cdn-icons-png.flaticon.com/512/5842/5842939.png",
            }}
          ></ImageBackground>
          <View style={styles.eventRight}>
            <Text style={styles.eventTitle}>Jean-Michel Jarre</Text>
            <Text style={styles.eventLocation}>
              Galerie Des Glaces, Versailles, France
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.7} style={styles.eventItem}>
          <ImageBackground
            resizeMode="cover"
            style={{
              minWidth: 50,
              minHeight: 50,
              backgroundColor: "#fff",
              borderRadius: 50,
              borderWidth: 8,
              borderColor: "#fff",
            }}
            width={50}
            height={50}
            source={{
              uri: "https://cdn-icons-png.flaticon.com/512/5842/5842939.png",
            }}
          ></ImageBackground>
          <View style={styles.eventRight}>
            <Text style={styles.eventTitle}>
              Sivilizasyon x Gambetta Club After Party Techno Noël ! 2023
            </Text>
            <Text style={styles.eventLocation}>
              Le Gambetta Club, Paris, France
            </Text>
          </View>
        </TouchableOpacity>
        <View style={styles.eventDate}>
          <Text style={styles.eventDateText}>30 November</Text>
        </View>
        <TouchableOpacity activeOpacity={0.7} style={styles.eventItem}>
          <ImageBackground
            resizeMode="cover"
            style={{
              minWidth: 50,
              minHeight: 50,
              backgroundColor: "#fff",
              borderRadius: 50,
              borderWidth: 8,
              borderColor: "#fff",
            }}
            width={50}
            height={50}
            source={{
              uri: "https://cdn-icons-png.flaticon.com/512/5842/5842939.png",
            }}
          ></ImageBackground>
          <View style={styles.eventRight}>
            <Text style={styles.eventTitle}>
              Sivilizasyon x Gambetta Club After Party Techno Noël ! 2023
            </Text>
            <Text style={styles.eventLocation}>
              Le Gambetta Club, Paris, France
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.7} style={styles.eventItem}>
          <ImageBackground
            resizeMode="cover"
            style={{
              minWidth: 50,
              minHeight: 50,
              backgroundColor: "#fff",
              borderRadius: 50,
              borderWidth: 8,
              borderColor: "#fff",
            }}
            width={50}
            height={50}
            source={{
              uri: "https://cdn-icons-png.flaticon.com/512/5842/5842939.png",
            }}
          ></ImageBackground>
          <View style={styles.eventRight}>
            <Text style={styles.eventTitle}>
              Sivilizasyon x Gambetta Club After Party Techno Noël ! 2023
            </Text>
            <Text style={styles.eventLocation}>
              Le Gambetta Club, Paris, France
            </Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </>
  );
};
