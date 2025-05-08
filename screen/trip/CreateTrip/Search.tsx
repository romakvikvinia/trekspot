import { Pressable, StyleSheet, TextInput, View } from "react-native";

import { COLORS } from "../../../styles/theme";
import {
  CloseCircleIcon,
  SearchIcon,
} from "../../../utilities/SvgIcons.utility";

export const Search = ({ placeholder, search, setSearch, withIcon = true, resetButton = true }) => {
  return (
    <View style={styles.searchComponent}>
      {withIcon ? (
        <View style={styles.searchComponentIcon}>
          <SearchIcon width={15} />
        </View>
      ) : null}

      <TextInput
        autoFocus={true}
        style={[
          styles.searchComponentInput,
          {
            paddingLeft: withIcon ? 40 : 15,
          },
        ]}
        placeholder={placeholder ? placeholder : "Search..."}
        placeholderTextColor={COLORS.darkgray}
        onChangeText={(e) => setSearch(e)}
        autoCorrect={false}
        value={search}
      />
      {search?.length > 2 && resetButton ? (
        <Pressable
          onPress={() => setSearch("")}
          style={({pressed}) => [
            styles.searchComponentResetButton,
            {
              opacity: pressed ? 0.5 : 1,
            },
          ]}
        >
          <CloseCircleIcon size="17" />
        </Pressable>
      ) : null}
    </View>
  );
};
 
export const styles = StyleSheet.create({
  searchComponent: {
    position: "relative",
    width: "100%",
  },
  searchComponentIcon: {
    left: 15,
    position: "absolute",
    top: 12,
    zIndex: 2,
  },
  searchComponentInput: {
    backgroundColor: "#fff",
    borderColor: COLORS.gray,
    borderRadius: 10,
    borderWidth: 1,
    color: COLORS.black,
    fontSize: 16,
    height: 45,
    paddingLeft: 20,
  },
  searchComponentResetButton: {
    padding: 8,
    position: "absolute",
    right: 7,
    top: 7,
  },
});
