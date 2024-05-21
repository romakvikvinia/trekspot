import { Text, View } from "react-native";
import { COLORS } from "../../../styles/theme";
import {
  CheckCircleIcon,
  CheckIcon,
  CloseCircleIcon,
} from "../../../utilities/SvgIcons.utility";
import { styles } from "../_styles";

type SecurityThreatsProps = {
  type: string;
};

export const SecurityThreats: React.FC<SecurityThreatsProps> = ({ type }) => {
  return (
    <View style={styles.keyValue}>
      <Text style={styles.key}>Security</Text>

      <View
        style={{
          flexDirection: "row",
          marginTop: 5,
        }}
      >
        <View
          style={{
            borderRadius: 15,
            marginRight: 15,
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "#f9fafb",
            padding: 15,
            width: "100%",
            borderWidth: 1,
            borderColor: "#eee"
          }}
        >
          {type === "secure" ? (
            <>
              <CheckIcon color="#1a806b" />
              <Text
                style={{
                  alignItems: "center",
                  color: "#1a806b",
                  fontSize: 14,
                  marginRight: 15,
                  fontWeight: "500",
                  marginLeft: 10,
                }}
              >
                Take normal security precautionss
              </Text>
            </>
          ) : null}
          {type === "warning" ? (
            <>
              <CheckIcon color="#d27d00" />
              <Text
                style={{
                  alignItems: "center",
                  color: "#d27d00",
                  fontSize: 14,
                  marginRight: 15,
                  fontWeight: "500",
                  marginLeft: 10,
                }}
              >
                Exercise a high degree of caution
              </Text>
            </>
          ) : null}
          {type === "danger" ? (
            <>
              <CloseCircleIcon color={COLORS.red} size={25} />
              <Text
                style={{
                  alignItems: "center",
                  color: COLORS.red,
                  fontSize: 14,
                  marginRight: 15,
                  fontWeight: "500",
                  marginLeft: 10,
                }}
              >
                Avoid non-essential travel
              </Text>
            </>
          ) : null}
        </View>
      </View>
    </View>
  );
};
