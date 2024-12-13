import { TextInput, TouchableOpacity, View } from "react-native";
import { searchComponentStyles } from "../../styles/searchComponentStyles";
import { COLORS } from "../../styles/theme";
import {
  CloseCircleIcon,
  SearchIcon,
} from "../../utilities/SvgIcons.utility";

export const SearchComponent = ({ search, setSearch, withIcon = true, resetButton = true }) => {
  return (
    <View style={searchComponentStyles.searchComponent}>
      {withIcon ? (
        <View style={searchComponentStyles.searchComponentIcon}>
          <SearchIcon width={15} />
        </View>
      ) : null}

      <TextInput
        autoFocus={true}
        style={[
          searchComponentStyles.searchComponentInput,
          {
            paddingLeft: withIcon ? 40 : 15,
          },
        ]}
        placeholder="Search..."
        placeholderTextColor={COLORS.darkgray}
        onChangeText={(e) => setSearch(e)}
        autoCorrect={false}
        // value={search}
      />
      {search?.length > 2 && resetButton ? (
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => setSearch("")}
          style={searchComponentStyles.searchComponentResetButton}
        >
          <CloseCircleIcon size="17" />
        </TouchableOpacity>
      ) : null}
    </View>
  );
};
