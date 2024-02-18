import { useRef } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { ScrollView } from "react-native";
import { Modalize } from "react-native-modalize";
import { Portal } from "react-native-portalize";
import { COLORS } from "../../../styles/theme";
import { DownIcon } from "../../../utilities/SvgIcons.utility";
import { CurrencySelect } from "../CurrencySelect";
import { styles } from "../_styles";

export const Currency = () => {
  const modalCurrencyRef = useRef(null);

  const onCurrencyModalOpen = () => {
    modalCurrencyRef.current?.open();
  };
  return (
    <>
      <ScrollView
        style={styles.tabWrapper}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.currencyWrapper}>
          <View style={styles.currencyConverter}>
            <View style={styles.left}>
              <TouchableOpacity
                activeOpacity={0.7}
                style={styles.currencySelectButton}
                onPress={() => onCurrencyModalOpen()}
              >
                <Text style={styles.currencySelectedText}>USD</Text>
                <DownIcon color={COLORS.primary} size="10" />
              </TouchableOpacity>

              <TextInput style={styles.currencyInput} placeholder="0" />
            </View>
            <Text style={styles.valueText}> = 1400 Euro</Text>
          </View>
        </View>
        <View style={styles.keyValue}>
          <Text style={styles.key}>Official currency:</Text>
          <Text style={styles.value}>Euro</Text>
        </View>
      </ScrollView>

      <Portal>
        <Modalize ref={modalCurrencyRef} modalTopOffset={65}>
          <CurrencySelect />
        </Modalize>
      </Portal>
    </>
  );
};
