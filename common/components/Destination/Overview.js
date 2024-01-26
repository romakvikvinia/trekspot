import { memo } from "react";
import { Text, View } from "react-native";
import { ImageBackground } from "react-native";
import { ScrollView } from "react-native";
import { COLORS } from "../../../styles/theme";
import { PlugImages } from "../../../utilities/Plugs";
import {
  AutumnIcon,
  SpringIcon,
  SummerIcon,
  WinterIcon,
} from "../../../utilities/SvgIcons.utility";
import { SecurityThreats } from "../DestinationSubComponents/SecurityThreats";
import { styles } from "../_styles";

const Overview = memo(function ({ DATA }) {
  const currencyObj = DATA.currencies[Object.keys(DATA.currencies)[0]];
  console.log("aaaa");
  return (
    <ScrollView
      style={[styles.tabWrapper, { paddingHorizontal: 0 }]}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.generalRow}>
        <Text style={styles.overviewText}>{DATA?.overview}</Text>

        <View style={[styles.keyValue, { marginTop: 25, marginBottom: 0 }]}>
          <Text style={styles.key}>Recognized for</Text>
          <View style={styles.tags}>
            {DATA?.recognizedFor?.map((item) => (
              <View style={styles.tag}>
                <Text style={styles.tagText}>
                  {item?.emoji} {item?.title}
                </Text>
              </View>
            ))}
          </View>
        </View>

        <View style={[styles.keyValue, { marginTop: 25, marginBottom: 0 }]}>
          <Text style={styles.key}>When to visit</Text>
          <Text style={styles.value}>{DATA?.whenToVisit}</Text>
        </View>
      </View>
      <View style={styles.generalRow}>
        <SecurityThreats data={DATA?.security} />
        <View style={styles.keyValue}>
          <Text style={styles.key}>National Language(s)</Text>
          <Text style={styles.value}>French</Text>
        </View>
        <View style={styles.keyValue}>
          <Text style={styles.key}>Currency</Text>
          <Text style={styles.value}>
            {currencyObj?.name} {currencyObj?.symbol}
          </Text>
        </View>
        <View style={styles.keyValue}>
          <Text style={styles.key}>Religions</Text>
          <Text style={styles.value}>{DATA?.religions?.join(", ")}</Text>
        </View>
        <View style={[styles.keyValue, { marginBottom: 0 }]}>
          <Text style={styles.key}>National day</Text>
          <Text style={styles.value}>{DATA?.nationalDay}</Text>
        </View>
      </View>
      <View style={styles.generalRow}>
        <View style={styles.keyValue}>
          <Text style={styles.key}>Telephone code</Text>
          <Text style={styles.value}>{DATA?.idd?.root}</Text>
        </View>
        <View style={styles.keyValue}>
          <Text style={styles.key}>Telecom operators</Text>
          <View style={styles.multiValues}>
            {DATA?.telecoms?.map((tel, index) => (
              <>
                <Text style={styles.value}>
                  {tel}
                  {index < DATA.telecoms.length - 1 && ", "}
                </Text>
              </>
            ))}
          </View>
        </View>
        <View style={styles.keyValue}>
          <Text style={styles.key}>Plug/Socket types</Text>
          <View style={[styles.multiValues, { marginTop: 5 }]}>
            {DATA?.plugTypes?.map((item) => (
              <ImageBackground
                source={PlugImages[item]}
                style={{
                  width: 60,
                  height: 60,
                  marginRight: 15,
                }}
              >
                <Text
                  style={{
                    position: "absolute",
                    bottom: -22,
                    fontSize: 12,
                    color: COLORS.black,
                    fontWeight: "500",
                    left: 12,
                  }}
                >
                  Type {item}
                </Text>
              </ImageBackground>
            ))}
          </View>
        </View>
      </View>
      <View style={[styles.generalRow, { borderBottomWidth: 0 }]}>
        <View style={styles.keyValue}>
          <Text style={styles.key}>Weather</Text>
          <Text
            style={[
              styles.value,
              { fontWeight: "500", fontSize: 12, lineHeight: 18 },
            ]}
          >
            {DATA?.weatherInformation?.seasonalConsiderations}
          </Text>
          <View style={styles.weatherRows}>
            <View style={styles.weatherRow}>
              <View style={styles.weatherLeft}>
                <SpringIcon />
                <Text style={styles.seasonText}>Spring</Text>
              </View>
              <Text style={styles.temperatureText}>
                {DATA?.weatherInformation?.averageTemperatures?.spring}
              </Text>
            </View>
            <View style={styles.weatherRow}>
              <View style={styles.weatherLeft}>
                <SummerIcon />
                <Text style={styles.seasonText}>Summer</Text>
              </View>
              <Text style={styles.temperatureText}>
                {DATA?.weatherInformation?.averageTemperatures?.summer}
              </Text>
            </View>
            <View style={styles.weatherRow}>
              <View style={styles.weatherLeft}>
                <AutumnIcon />
                <Text style={styles.seasonText}>Autumn</Text>
              </View>
              <Text style={styles.temperatureText}>
                {DATA?.weatherInformation?.averageTemperatures?.autumn}
              </Text>
            </View>
            <View style={styles.weatherRow}>
              <View style={styles.weatherLeft}>
                <WinterIcon />
                <Text style={styles.seasonText}>Winter</Text>
              </View>
              <Text style={styles.temperatureText}>
                {DATA?.weatherInformation?.averageTemperatures?.winter}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
});
export default Overview;
