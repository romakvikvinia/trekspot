import { Text, TouchableOpacity, View } from "react-native";
import { ScrollView } from "react-native";
import {
  CheckCircleIcon,
  CloseCircleIcon,
  PassportIcon,
} from "../../../utilities/SvgIcons.utility";
import { styles } from "../_styles";

export const Visa = () => {
  return (
    <ScrollView
      style={styles.tabWrapper}
      showsVerticalScrollIndicator={false}
      alwaysBounceVertical={false}
    >
      {/* <NotFound /> */}

      <View style={styles.visaTabHeader}>
        <Text style={styles.travelToText}>Traveling to france</Text>

        <TouchableOpacity
          style={styles.passportBox}
          activeOpacity={0.7}
          onPress={() => onCountryPassportOpen()}
        >
          <PassportIcon />
          <View style={styles.passportTexts}>
            <Text style={styles.passportLabel}>Passport</Text>
            <Text style={styles.passportCountry}>Georgia</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.visaTabContent}>
        <View style={[styles.textContentWrapper, styles.successBg]}>
          <CheckCircleIcon color="#1a806b" />
          <Text style={[styles.headingText, styles.success]}>
            Georgian passport holders don't need visa to travel to France
          </Text>
        </View>
        <View style={[styles.textContentWrapper, styles.dangerBg]}>
          <CloseCircleIcon color="#D74E4E" />
          <Text style={[styles.headingText, styles.danger]}>
            Georgian passport holders need visa to travel to USA
          </Text>
        </View>
        <Text style={styles.secondaryTitle}>Options</Text>
        <View style={styles.visaTypes}>
          <View style={styles.visaTypeCard}>
            <Text style={styles.visaTypeCardTitle}>Visitor visa</Text>

            <View style={styles.staysNtype}>
              <View style={styles.staysNtypeRow}>
                <Text style={styles.staysNtypeRowKey}>Allowed stay:</Text>
                <Text style={styles.staysNtypeRowValue}>90 Days</Text>
              </View>
              <View style={styles.staysNtypeRow}>
                <Text style={styles.staysNtypeRowKey}>Type:</Text>
                <Text style={styles.staysNtypeRowValue}>Tourism, business</Text>
              </View>
            </View>
          </View>
          <View style={styles.visaTypeCard}>
            <Text style={styles.visaTypeCardTitle}>Visitor visa</Text>

            <View style={styles.staysNtype}>
              <View style={styles.staysNtypeRow}>
                <Text style={styles.staysNtypeRowKey}>Allowed stay:</Text>
                <Text style={styles.staysNtypeRowValue}>90 Days</Text>
              </View>
              <View style={styles.staysNtypeRow}>
                <Text style={styles.staysNtypeRowKey}>Type:</Text>
                <Text style={styles.staysNtypeRowValue}>Tourism, business</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};
