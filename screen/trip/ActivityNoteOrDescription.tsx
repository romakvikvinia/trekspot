import { useNavigation } from "@react-navigation/native";
import Constants from "expo-constants";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import { Loader } from "../../common/ui/Loader";
import { COLORS } from "../../styles/theme";

export const ActivityNoteOrDescription = ({ route }) => {
  const { type } = route.params;
  const navigation = useNavigation();
  
  const [isLoading, setIsLoading] = useState(false);
  const [isDisable, setIsDisable] = useState(true);

  const handleCancel = () => {
    navigation.goBack();
  };

  console.log("type", type);

  return (
    <View style={{ flex: 1 }}>
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
        style={styles.screen}
      >
        <View style={styles.headerContainer}>
          <Pressable
            style={styles.backButton}
            hitSlop={30}
            onPress={handleCancel}
          >
            <Text style={styles.buttonText}>Cancel</Text>
          </Pressable>
          <Text style={styles.title}>
            {type === "note" ? "Add notes" : "Add description"}
          </Text>
          
          {isLoading ? (
            <View
              style={[
                styles.saveButton,
                {
                  justifyContent: "flex-end",
                },
              ]}
            >
              <View style={{ width: 20 }}>
                <Loader isLoading={true} size="small" background="#F2F2F7" />
              </View>
            </View>
          ) : null}

          {!isLoading ? (
            <Pressable
              style={[
                styles.saveButton,
                {
                  pointerEvents: isDisable ? "none" : "auto",
                },
              ]}
              hitSlop={30}
            >
              <Text
                style={[
                  styles.buttonText,
                  {
                    color: isDisable ? COLORS.gray : COLORS.primary,
                  },
                ]}
              >
                Save
              </Text>
            </Pressable>
          ) : null}
       
        </View>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            // value={}
            // onChangeText={text=>setState({value:text})}
            multiline={true}
            placeholder="Type here..."
            placeholderTextColor={COLORS.gray}
          />
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};
const styles = StyleSheet.create({
  backButton: {
    width: 80,
  },
  buttonText: {
    color: COLORS.primary,
    fontSize: 16,
    fontWeight: "600",
  },
  headerContainer: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 25,
    paddingHorizontal: 15,
    paddingTop:
      Platform.OS === "android" ? Constants?.statusBarHeight + 10 : 18,
    width: "100%",
  },
  input: {
    backgroundColor: "#fdfdff",
    borderColor: "#e9e9e9",
    borderRadius: 8,
    borderWidth: 1,
    color: COLORS.black,
    fontSize: 14,
    fontWeight: "500",
    height: "100%",
    padding: 15,
  },
  inputWrapper: {
    paddingHorizontal: 15,
  },
  saveButton: {
    flexDirection: "row",
    justifyContent: "flex-end",
    textAlign: "right",
    width: 80,
  },
  screen: {
    backgroundColor: "#F2F2F7",
    flex: 1,
  },
  title: {
    color: COLORS.black,
    fontSize: 16,
    fontWeight: "600",
  }
});
