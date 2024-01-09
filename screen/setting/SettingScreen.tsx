import React, { useContext } from "react";
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Image } from "expo-image";
import { AuthContext } from "../../package/context/auth.context";
import { deleteFromAsyncStorage } from "../../helpers/secure.storage";

interface SettingProps {}

export const SettingScreen: React.FC<SettingProps> = ({}) => {
  const { signOut } = useContext(AuthContext);
  return (
    <>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView style={{ flex: 1 }}>
          <View style={styles.profileHeader}>
            <View style={styles.profileLeft}>
              <Image
                style={{
                  minWidth: 80,
                  width: 80,
                  height: 80,
                  minHeight: 80,
                  flex: 1,
                  borderRadius: "100%",
                }}
                source={{
                  uri: "https://images.unsplash.com/photo-1546961329-78bef0414d7c?q=20&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                }}
                cachePolicy="memory"
                contentFit="cover"
                transition={1000}
                // placeholder={<ActivityIndicator />}
              />
              <Text style={styles.username}>Andria Shonia</Text>
            </View>
            <TouchableOpacity activeOpacity={0.7} style={styles.editButton}>
              <Text style={styles.editButtonText}>Edit profile</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.buttonsWrapper}>
            <TouchableOpacity style={styles.button} activeOpacity={0.7}>
              <Text style={styles.buttonText}>Edit interests</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} activeOpacity={0.7}>
              <Text style={styles.buttonText}>Terms of use</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} activeOpacity={0.7}>
              <Text style={styles.buttonText}>Privacy Policy</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.buttonsWrapper}>
            <TouchableOpacity
              style={styles.button}
              activeOpacity={0.7}
              onPress={async () => {
                signOut();
                deleteFromAsyncStorage([
                  "visited_countries",
                  "lived_countries",
                ]);
              }}
            >
              <Text style={styles.buttonText}>Logout</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} activeOpacity={0.7}>
              <Text style={styles.buttonText}>Deleate account</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
    // backgroundColor: "#f8f8f8",
  },
  buttonsWrapper: {
    padding: 15,
    borderBottomColor: "#f8f8f8",
    borderBottomWidth: 5,
  },
  profileHeader: {
    backgroundColor: "#fff",
    flexDirection: "row",
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    borderBottomColor: "#f8f8f8",
    borderBottomWidth: 5,
    paddingTop: 5,
    paddingBottom: 15,
  },
  profileLeft: {
    flexDirection: "column",
    width: "50%",
  },
  username: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 15,
  },
  editButton: {
    marginTop: 30,
    backgroundColor: "#f8f8f8",
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 15,
  },
  editButtonText: {
    fontSize: 14,
    fontWeight: "500",
  },
  button: {
    marginVertical: 8,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "500",
  },
});
