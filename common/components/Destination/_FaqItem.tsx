import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import RenderHTML from "react-native-render-html";
import { DownIcon, UpCircleIcon, UpIcon } from "../../../utilities/SvgIcons.utility";

export const FaqItem = ({item}) => {
  const [visible, setVisible] = useState(false);

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={[styles.faqItem, {borderColor: visible ? "#ccc" : "#eee"}]}
      onPress={() => setVisible(!visible)}
    >
      <View style={styles.faqHeader}>
        <Text style={styles.faqHeaderText}>
            {item?.question}
        </Text>

        {
          visible ? <UpIcon color="#bbb" /> :  <DownIcon color="#ccc" />
        }
 
      </View>
      {visible ? (
        <View style={styles.faqBody}>
          <RenderHTML
            key={"topic"}
            contentWidth={100}
            source={{
              html: `${item?.answer}`,
            }}
            defaultTextProps={{
              selectable: true,
            }}
            baseStyle={{
              lineHeight: 22,
              fontWeight: "400",
            }}
          />
        </View>
      ) : null}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  faqItem: {
    borderWidth: 1,
    backgroundColor: "#f9fafb",
    borderColor: "#eee",
    padding: 0,
    borderRadius: 10,
    marginBottom: 8
  },
  faqHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 15,
  },
  faqHeaderText: {
    color: "#000",
    fontSize: 14,
    fontWeight: "500",
  },
  faqBody: {
    paddingHorizontal: 15,
    paddingBottom: 15,
    color: "#444444",
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "400",
    opacity: 0.9,
  },
});
