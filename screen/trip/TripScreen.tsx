import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { COLORS } from "../../styles/theme";
import { AddUser, PlusIcon, VertDots } from "../../utilities/SvgIcons.utility";

interface TripProps {}

export const TripScreen: React.FC<TripProps> = ({}) => {
  const [invitedUsers, setInvitedUsers] = useState([
    "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=20&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1704642408219-977150048504?q20&w=3330&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1704642408219-977150048504?q20&w=3330&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  ]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.myTripsText}>My trips</Text>

        <TouchableOpacity style={styles.newTripButton}>
          <PlusIcon color="" />
          <Text style={styles.newTripButtonText}>New trip</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={{ flex: 1, paddingHorizontal: 15 }}>
        <View style={styles.tripItem}>
          <TouchableOpacity style={styles.tripItemHeader} activeOpacity={0.7}>
            <Image
              source={{
                uri: "https://images.unsplash.com/photo-1550340499-a6c60fc8287c?q=20&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
              }}
              cachePolicy="memory"
              contentFit="cover"
              transition={1000}
              style={styles.tripImage}
            >
              <LinearGradient
                style={styles.gradientWrapper}
                colors={["rgba(0,0,0,0.9)", "rgba(0,0,0,0.2)"]}
                start={{ x: -1, y: 1 }}
                end={{ x: 1, y: 0 }}
              >
                <View style={styles.tripInHeader}>
                  <Text style={styles.tripDate}>14 Nov → 20 Nov</Text>

                  <TouchableOpacity>
                    <VertDots />
                  </TouchableOpacity>
                </View>
                <Text style={styles.tripTitle}>My awesome trip</Text>

                <Text style={styles.invitationByText}>
                  Invited by{" "}
                  <Text style={styles.invitationByUserText}>Jason</Text>
                </Text>
              </LinearGradient>
            </Image>
          </TouchableOpacity>
          <View style={styles.tripDetails}>
            <View style={styles.invitationBox}>
              {invitedUsers?.length > 0 && (
                <Image
                  cachePolicy="memory"
                  contentFit="cover"
                  transition={0}
                  source={{
                    uri: invitedUsers?.[0],
                  }}
                  style={styles.inviteOne}
                />
              )}
              {invitedUsers?.length >= 2 && (
                <Image
                  cachePolicy="memory"
                  contentFit="cover"
                  transition={0}
                  source={{
                    uri: invitedUsers?.[1],
                  }}
                  style={styles.inviteTwo}
                />
              )}
              {invitedUsers?.length > 2 && (
                <View style={styles.otherUsers}>
                  <Text style={styles.otherUsersText}>2+</Text>
                </View>
              )}
              <TouchableOpacity
                activeOpacity={0.7}
                style={[
                  styles.addUserButton,
                  {
                    left:
                      invitedUsers?.length === 2
                        ? -20
                        : invitedUsers?.length > 2
                        ? -28
                        : -10,
                  },
                ]}
              >
                <AddUser />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* <LinearGradient
        // style={styles.gradientWrapper}
        style={{
          flex: 1,
        }}
        colors={["#f3904f", "#3b4371"]}
      > */}
      <View>
        <Text>Trip</Text>
      </View>
      {/* </LinearGradient> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f8f8f8",
  },
  invitationBox: {
    position: "relative",
    flexDirection: "row",
    maxWidth: 120,
  },
  inviteTwo: {
    position: "relative",
    left: -10,
    zIndex: 2,
    top: 0,
    width: 35,
    height: 35,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "#fff",
  },
  otherUsers: {
    position: "relative",
    left: -20,
    zIndex: 2,
    top: 0,
    width: 35,
    height: 35,
    borderRadius: 50,
    backgroundColor: "#8e8e8e",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#fff",
  },
  otherUsersText: {
    fontWeight: "600",
    color: "#fff",
  },
  addUserButton: {
    position: "relative",
    left: -10,
    zIndex: 2,
    top: 0,
    width: 35,
    height: 35,
    borderRadius: 50,
    backgroundColor: "#8e8e8e",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#fff",
  },
  tripItem: {
    width: "100%",
  },
  inviteOne: {
    width: 35,
    height: 35,
    borderRadius: 50,
  },
  tripDetails: {
    width: "100%",
    backgroundColor: "#fff",
    padding: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  invitationByText: {
    position: "absolute",
    bottom: 20,
    left: 20,
    color: "#fff",
    opacity: 0.9,
  },
  invitationByUserText: {
    color: "#fff",
    fontWeight: "600",
    opacity: 1,
  },
  tripInHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  tripItemHeader: {
    width: "100%",
    height: 200,
    position: "relative",
  },
  tripImage: {
    width: "100%",
    height: 200,
    borderRadius: 25,
    position: "relative",
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  gradientWrapper: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    padding: 20,
  },
  tripDate: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "500",
  },
  tripTitle: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold",
    marginTop: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    alignItems: "center",
    marginBottom: 25,
  },
  myTripsText: {
    fontSize: 20,
    fontWeight: "600",
    color: COLORS.black,
  },
  newTripButton: {
    backgroundColor: COLORS.primaryDark,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 50,
    flexDirection: "row",
    alignItems: "center",
  },
  newTripButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
});
