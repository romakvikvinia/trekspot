import React from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import {  Platform, Text, TouchableOpacity, View } from "react-native";

import { AuthStackParamList } from "../../routes/auth/AuthRoutes";
import { ExploreIcon, PlanTripIcon, StatsIcon, WishlistIcon } from "../../utilities/SvgIcons.utility";
import { COLORS } from "../../styles/theme";
import { useTripStore } from "../../components/store/store";

type GetStartedProps = NativeStackScreenProps<AuthStackParamList, "GetStarted">;

export const GetStartedScreen: React.FC<GetStartedProps> = ({ navigation }) => {
  const { setOnboardingSeen } = useTripStore((state) => ({
    setOnboardingSeen: state.setOnboardingSeen,
  }));

  return (
    <View style={{ flex: 1, paddingTop: 70, backgroundColor: "#fff" }}>
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
            marginRight: 20,
          }}
        >
          <ExploreIcon size={70} />
        </View>
        <View
          style={{
            maxWidth: "70%",
          }}
        >
          <Text
            style={{
              fontSize: 18,
              fontWeight: "bold",
            }}
          >
            Explore Destinations
          </Text>
          <Text
            style={{
              fontSize: 14,
              marginTop: 5,
              color: COLORS.darkgray,
              fontWeight: "500",
            }}
          >
            Dive into a world of possibilities! From iconic landmarks to hidden
            gems.
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
            marginRight: 20,
          }}
        >
          <StatsIcon size={70} />
        </View>

        <View
          style={{
            maxWidth: "70%",
          }}
        >
          <Text
            style={{
              fontSize: 18,
              fontWeight: "bold",
            }}
          >
            Travel statistics
          </Text>
          <Text
            style={{
              fontSize: 14,
              marginTop: 5,
              color: COLORS.darkgray,
              fontWeight: "500",
            }}
          >
            Keep track of where you've been
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
            marginRight: 20,
          }}
        >
          <WishlistIcon size={70} />
        </View>

        <View
          style={{
            maxWidth: "70%",
          }}
        >
          <Text
            style={{
              fontSize: 18,
              fontWeight: "bold",
            }}
          >
            Create Your Wishlist
          </Text>
          <Text
            style={{
              fontSize: 14,
              marginTop: 5,
              color: COLORS.darkgray,
              fontWeight: "500",
            }}
          >
            Dream big and start ticking off your bucket list items.
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
            marginRight: 20,
          }}
        >
          <PlanTripIcon size={70} />
        </View>

        <View
          style={{
            maxWidth: "70%",
          }}
        >
          <Text
            style={{
              fontSize: 18,
              fontWeight: "bold",
            }}
          >
            Plan Your Next Adventure
          </Text>
          <Text
            style={{
              fontSize: 14,
              marginTop: 5,
              color: COLORS.darkgray,
              fontWeight: "500",
            }}
          >
            Seamlessly plan your next trip with suggested places.
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
            paddingVertical: Platform.OS === "android" ? 15 : 17,
            borderRadius: 140,
            width: "100%",
            justifyContent: "center",
          }}
          activeOpacity={0.7}
          onPress={() => {
            navigation.navigate("SignIn");
            setOnboardingSeen(true);
          }}
        >
          <Text
            style={{
              fontSize: 18,
              color: "#fff",
              fontWeight: "600",
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
