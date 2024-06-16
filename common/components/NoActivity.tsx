import { StyleSheet, Text, View } from "react-native";
import { NoActivityIcon } from "../../utilities/SvgIcons.utility";
import { COLORS } from "../../styles/theme";

export const NoActivity = ({text = ""}) => {

    return (
        <View style={styles.noActivityWrapper}>
            <NoActivityIcon size="90" />
            <Text style={styles.noActivityWrapperText}>{text}</Text>
        </View>
    )
}
const styles = StyleSheet.create({
    noActivityWrapper: {
        alignItems: "center"
    },
    noActivityWrapperText: {
        fontSize: 16,
        marginTop: 25,
        fontWeight: "600",
        color: COLORS.gray
    }
});