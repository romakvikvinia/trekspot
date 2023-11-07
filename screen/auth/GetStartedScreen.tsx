import React from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Text, TouchableOpacity, View } from "react-native";
import Onboarding from "react-native-onboarding-swiper";

import { AuthStackParamList } from "../../routes/auth/AuthRoutes";

type GetStartedProps = NativeStackScreenProps<AuthStackParamList, "GetStarted">;

export const GetStartedScreen: React.FC<GetStartedProps> = ({ navigation }) => {
  return (
    <View style={{ flex: 1 }}>
      <Onboarding
        showNext={false}
        showDone={false}
        showSkip={false}
        bottomBarHighlight={false}
        pages={[
          {
            backgroundColor: "#7C2F9F",
            image: <></>,
            title: (
              <View style={{ paddingHorizontal: 15 }}>
                <Text
                  style={{
                    fontSize: 30,
                    color: "#fff",
                    fontWeight: "bold",
                  }}
                >
                  Pin Your Memories: Where Have You Been?
                </Text>
              </View>
            ),
            subtitle: "",
          },
          {
            backgroundColor: "#AC0056",
            image: <></>,
            title: (
              <View style={{ paddingHorizontal: 15 }}>
                <Text
                  style={{
                    fontSize: 30,
                    color: "#fff",
                    fontWeight: "bold",
                  }}
                >
                  Wishlist Wonders: Collecting Dreams One Pin at a Time
                </Text>
              </View>
            ),
            subtitle: "",
          },
          {
            backgroundColor: "#00916C",
            image: <></>,
            title: (
              <View style={{ paddingHorizontal: 15 }}>
                <Text
                  style={{
                    fontSize: 30,
                    color: "#fff",
                    fontWeight: "bold",
                  }}
                >
                  Plan and Share Your Dream Trips
                </Text>
              </View>
            ),
            subtitle: "",
          },
          {
            backgroundColor: "#3955A3",
            image: <></>,
            title: (
              <View style={{ paddingHorizontal: 15 }}>
                <Text
                  style={{
                    fontSize: 30,
                    color: "#fff",
                    fontWeight: "bold",
                  }}
                >
                  Dare to Explore: Join Our Travel Challenges
                </Text>
              </View>
            ),
            subtitle: "",
          },
        ]}
      />

      <View
        style={{
          position: "absolute",
          bottom: 150,
          left: 0,
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <TouchableOpacity
          style={{
            backgroundColor: "#fff",
            paddingHorizontal: 50,
            paddingVertical: 15,
            borderRadius: 140,
          }}
          activeOpacity={0.7}
          onPress={() => navigation.navigate("SignIn")}
        >
          <Text
            style={{
              fontSize: 18,
              color: "#000",
              fontWeight: "bold",
            }}
          >
            Get started
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
