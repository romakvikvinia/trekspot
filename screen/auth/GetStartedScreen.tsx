import React from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ImageBackground, Text, TouchableOpacity, View } from "react-native";
import Onboarding from "react-native-onboarding-swiper";

import { AuthStackParamList } from "../../routes/auth/AuthRoutes";
import { Markering } from "../../utilities/SvgIcons.utility";
import { COLORS } from "../../styles/theme";

type GetStartedProps = NativeStackScreenProps<AuthStackParamList, "GetStarted">;

export const GetStartedScreen: React.FC<GetStartedProps> = ({ navigation }) => {
  return (
    <View style={{ flex: 1, paddingTop: 70 }}>
      {/* <Onboarding
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
      /> */}

      <Text
        style={{
          textAlign: "center",
          fontSize: 32,
          fontWeight: "bold",
          paddingHorizontal: 15,
        }}
      >
        Explore Trekspot
      </Text>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 25,
          marginTop: 50,
        }}
      >
        <View
          style={{
            marginRight: 25,
          }}
        >
          <ImageBackground
            resizeMode="cover"
            source={{
              uri: "https://cdn-icons-png.flaticon.com/512/10490/10490235.png",
            }}
            style={{
              width: 50,
              height: 50,
            }}
          ></ImageBackground>
        </View>
        <View
          style={{
            maxWidth: "80%",
          }}
        >
          <Text
            style={{
              fontSize: 15,
              fontWeight: "bold",
            }}
          >
            Pin Your Memories: Where Have You Been?
          </Text>
          <Text
            style={{
              fontSize: 14,
              marginTop: 5,
              color: COLORS.darkgray,
            }}
          >
            Pin Your Memories: Where Have You Been?
          </Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 25,
          marginTop: 25,
        }}
      >
        <View
          style={{
            marginRight: 25,
          }}
        >
          <ImageBackground
            resizeMode="cover"
            source={{
              uri: "https://cdn-icons-png.flaticon.com/512/8074/8074688.png",
            }}
            style={{
              width: 50,
              height: 50,
            }}
          ></ImageBackground>
        </View>

        <View
          style={{
            maxWidth: "80%",
          }}
        >
          <Text
            style={{
              fontSize: 15,
              fontWeight: "bold",
            }}
          >
            Wishlist Wonders: Collecting Dreams One Pin at a Time
          </Text>
          <Text
            style={{
              fontSize: 14,
              marginTop: 5,
            }}
          >
            Pin Your Memories: Where Have You Been?
          </Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 25,
          marginTop: 25,
        }}
      >
        <View
          style={{
            marginRight: 25,
          }}
        >
          <ImageBackground
            resizeMode="cover"
            source={{
              uri: "https://cdn-icons-png.flaticon.com/512/2200/2200326.png",
            }}
            style={{
              width: 50,
              height: 50,
            }}
          ></ImageBackground>
        </View>

        <View
          style={{
            maxWidth: "80%",
          }}
        >
          <Text
            style={{
              fontSize: 15,
              fontWeight: "bold",
            }}
          >
            Plan and Share Your Dream Trips
          </Text>
          <Text
            style={{
              fontSize: 14,
              marginTop: 5,
            }}
          >
            Pin Your Memories: Where Have You Been?
          </Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 25,
          marginTop: 25,
        }}
      >
        <View
          style={{
            marginRight: 25,
          }}
        >
          <ImageBackground
            resizeMode="cover"
            source={{
              uri: "https://cdn-icons-png.flaticon.com/512/12607/12607558.png",
            }}
            style={{
              width: 50,
              height: 50,
            }}
          ></ImageBackground>
        </View>

        <View
          style={{
            maxWidth: "80%",
          }}
        >
          <Text
            style={{
              fontSize: 15,
              fontWeight: "bold",
            }}
          >
            Dare to Explore: Join Our Travel Challenges
          </Text>
          <Text
            style={{
              fontSize: 14,
              marginTop: 5,
            }}
          >
            Pin Your Memories: Where Have You Been?
          </Text>
        </View>
      </View>

      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          width: "100%",
          marginTop: 70,
          paddingHorizontal: 25,
        }}
      >
        <TouchableOpacity
          style={{
            backgroundColor: COLORS.primaryDark,
            paddingHorizontal: 50,
            paddingVertical: 20,
            borderRadius: 140,
            width: "100%",
            justifyContent: "center",
          }}
          activeOpacity={0.7}
          onPress={() => navigation.navigate("SignIn")}
        >
          <Text
            style={{
              fontSize: 18,
              color: "#fff",
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            Get started
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
