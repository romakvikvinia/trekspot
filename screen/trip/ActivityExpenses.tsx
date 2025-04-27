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
import { FloatingActionButton } from "../../components/common/FloatingButtons";
import { COLORS } from "../../styles/theme";
import { AttractionCategoryIcon, BakeryCategoryIcon, ClubCategoryIcon, EventCategoryIcon, HospitalCategoryIcon, LoundryCategoryIcon, MuseumCategoryIcon, OtherCategoryIcon, ParkingCategoryIcon, PharmacyCategoryIcon, PublicTransportCategoryIcon, RestaurantCategoryIcon, ShoppingCategoryIcon, TourCategoryIcon, WineryCategoryIcon } from "../../utilities/CategoryIcons";
import { CurrencyButton } from "./components/SightDetail";


const categories = [
  {
    name: "Restaurant, cafe",
    icon: RestaurantCategoryIcon
  },
  {
    name: "Club, bar",
    icon: ClubCategoryIcon
  }, 
  {
    name: "Bakery",
    icon: BakeryCategoryIcon
  },
  {
    name: "Winery",
    icon: WineryCategoryIcon
  },
  {
    name: "Event",
    icon: EventCategoryIcon
  }, 
  {
    name: "Museum",
    icon: MuseumCategoryIcon
  },
  {
    name: "Outdoor attraction",
    icon: AttractionCategoryIcon
  },
  {
    name: "Tour",
    icon: TourCategoryIcon
  },
  {
    name: "Public transport",
    icon: PublicTransportCategoryIcon
  },
  {
    name: "Parking",
    icon: ParkingCategoryIcon
  },
  {
    name: "Hospital",
    icon: HospitalCategoryIcon
  },
  {
    name: "Pharmacy",
    icon: PharmacyCategoryIcon
  },
  {
    name: "Shopping",
    icon: ShoppingCategoryIcon
  },
  {
    name: "Laundry",
    icon:  LoundryCategoryIcon
  }, 
  {
    name: "Other",
    icon:  OtherCategoryIcon
  },
];


export const ActivityExpenses = ({ route }: { route: any }) => {
  const { type } = route?.params;
 
  const navigation = useNavigation();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isDisable, setIsDisable] = useState(true);
 
  const handleCancel = () => {
    navigation.goBack();
  };
  console.log("type",type)

  return (
    <>
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
            <Text style={styles.title}>Add expenses</Text>

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

          <View style={[styles.inputContainer, {
              justifyContent: type === "detail" ? "flex-start" : "center",
          }]}>
            {type === "detail" ? (
            <>
            <View style={styles.inputItem}>
              <TextInput
                style={styles.inputGeneral}
                // value={}
                // onChangeText={text=>setState({value:text})}
                placeholder="Activity name (optional)"
                placeholderTextColor={COLORS.gray}
              />
            </View>
            <FloatingActionButton
              withHeader={true}
              title="Select category"
              //@ts-expect-error ///
              buttons={categories.map((category, i) => ({
                label: category.name,
                onPress: () => setSelectedCategory(category),
                icon:  null,
                aiIcon: category.icon,
                isDanger: false,
                isActive: category.name === selectedCategory?.name, 
              }))}
              //@ts-expect-error ///
              renderTrigger={() => (
                <View style={styles.categoryButton}>
                  <Text style={styles.categoryButtonText}>{
                   selectedCategory ? selectedCategory.name : "Select category"
                  }</Text>
                </View>
              )}
            /> 
            <View style={styles.inputWrapperSmall}>
              <TextInput
                style={styles.inputSmall}
                // value={}
                // onChangeText={text=>setState({value:text})}
                // multiline={true}
                inputMode="numeric"
                placeholder="0,00"
                placeholderTextColor={COLORS.gray}
                textAlignVertical="top"
                keyboardType="numeric"
              />
              <CurrencyButton size="sm" />
            </View>
            </>
            ) : (
              <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                // value={}
                // onChangeText={text=>setState({value:text})}
                // multiline={true}
                inputMode="numeric"
                placeholder="0,00"
                placeholderTextColor={COLORS.gray}
                textAlignVertical="top"
                keyboardType="numeric"
                autoFocus
              />
              <CurrencyButton />
            </View>
            )}
          </View>
        </KeyboardAvoidingView>
      </View>
    </>
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
  categoryButton: {
    alignItems: "flex-start",
    backgroundColor: "#fdfdff",
    borderColor: "#ccc",
    borderRadius: 8,
    borderWidth: 1,
    fontSize: 14,
    fontWeight: "500",
    height: 50,
    justifyContent: "center",
    minWidth: "100%",
    paddingLeft: 10,
    paddingVertical: 5,
  },
  categoryButtonText: {
    color: COLORS.black,
    fontSize: 14,  
    fontWeight: "500",
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
    // borderColor: "#e9e9e9",
    borderRadius: 8,
    // borderWidth: 1,
    color: COLORS.black,
    fontWeight: "bold",
    padding: 15,
    textAlign: "center",
    flex: 1,
    fontSize: 54,
  },
  inputContainer: {
    alignItems: "center",
    height: 400,
    paddingHorizontal: 15,
  },
  inputGeneral: {
    alignItems: "center",
    backgroundColor: "#fdfdff",
    borderColor: "#ccc",
    borderRadius: 8,
    borderWidth: 1,
    fontSize: 14,
    fontWeight: "500",
    height: 50,
    paddingHorizontal: 2,
    paddingLeft: 10,
    paddingVertical: 5,
    width: "100%",
  },
  inputItem: {
    marginBottom: 15,
    width: "100%",
  },
  inputSmall: {
    color: COLORS.black,
    flex: 1, 
    fontSize: 14,
    fontWeight: "500",
    height: 50,
  },
  inputWrapper: {
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 15,
    flexDirection: "row",
    justifyContent: "center"
  },
  inputWrapperSmall: {
    alignItems: "center",
    backgroundColor: "#fdfdff",
    borderColor: "#ccc",
    borderRadius: 8,
    borderWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
    paddingLeft: 10,
    width: "100%",
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
  },
});
