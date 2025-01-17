import { memo } from "react";
import { Text, View } from "react-native";
import { ImageBackground } from "react-native";
import { ScrollView } from "react-native";

import { CountryType } from "../../../api/api.types";
import { COLORS } from "../../../styles/theme";
import { PlugImages } from "../../../utilities/Plugs";
import {
  AutumnIcon,
  SpringIcon,
  SummerIcon,
  WinterIcon,
} from "../../../utilities/SvgIcons.utility";
import { styles } from "../_styles";
import { SecurityThreats } from "../DestinationSubComponents/SecurityThreats";

type OverviewProps = {
  country: CountryType;
};

const backgroundColors = [
  "#ffc5cc",
  "#dbeaff",
  "#ffd2c1",
  "#ffe3c3",
  "#d3fff5",
  "#ffe3ee",
  "#fffbe5",
  "#efe9ff",
  "#ffe9fd"
];

const Overview: React.FC<OverviewProps> = memo(function ({ country }) {
  if (!country) return null;
  return (
    <ScrollView
      style={[styles.tabWrapper, { paddingHorizontal: 0 }]}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.generalRow}>
        <View style={styles.aboutBox}>
          <Text style={styles.overviewText}>{country?.overview}</Text>
        </View>
        <SecurityThreats type={country?.security} />
        <View style={[styles.keyValue, { marginTop: 30, marginBottom: 0 }]}>
          <Text style={styles.key}>Recognized for</Text>
          <View style={styles.tags}>
            {country?.recognizedFor?.map((item) => (
              <View
                style={[
                  styles.tag,
                  {
                    backgroundColor:
                      backgroundColors[
                        Math.floor(Math.random() * backgroundColors.length)
                      ],
                  },
                ]}
              >
                <Text style={styles.tagText}>
                  {item?.emoji} {item?.title}
                </Text>
              </View>
            ))}
          </View>
        </View>

        <View style={[styles.keyValue, { marginTop: 30, marginBottom: 0 }]}>
          <Text style={styles.key}>When to visit</Text>
          <Text style={styles.value}>{country?.whenToVisit}</Text>
        </View>
      </View>
      <View style={styles.generalRow}>
        <View style={styles.keyValue}>
          <Text style={styles.key}>National Language(s)</Text>
          <Text style={styles.value}>
            {country.languages && Object.values(country.languages)[0]}
          </Text>
        </View>
        <View style={styles.keyValue}>
          <Text style={styles.key}>Currency</Text>
          {country.currencies
            ? Object.keys(country.currencies).map(
                (key) =>
                  country &&
                  country.currencies && (
                    <Text style={styles.value}>
                      {country.currencies[key].name} -{" "}
                      {country.currencies[key].symbol}
                    </Text>
                  )
              )
            : null}
        </View>
        <View style={styles.keyValue}>
          <Text style={styles.key}>Religions</Text>
          <Text style={styles.value}>{country?.religions?.join(", ")}</Text>
        </View>
        <View style={[styles.keyValue, { marginBottom: 0 }]}>
          <Text style={styles.key}>National day</Text>
          <Text style={styles.value}>{country?.nationalDay}</Text>
        </View>
      </View>
      <View style={styles.generalRow}>
        <View style={styles.keyValue}>
          <Text style={styles.key}>Telephone code</Text>
          <Text style={styles.value}>{country?.idd?.root}</Text>
        </View>
        <View style={styles.keyValue}>
          <Text style={styles.key}>Telecom operators</Text>
          <View style={styles.multiValues}>
            {country?.telecoms?.map((tel, index) => (
              <>
                <Text style={styles.value}>
                  {tel}
                  {index < country.telecoms.length - 1 && ", "}
                </Text>
              </>
            ))}
          </View>
        </View>
        <View style={styles.keyValue}>
          <Text style={styles.key}>Plug/Socket types</Text>
          <View style={[styles.multiValues, { marginTop: 5 }]}>
            {country?.plugTypes?.map((item) => (
              <ImageBackground
                source={PlugImages[item]}
                style={{
                  width: 70,
                  height: 70,
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
        <View style={[styles.keyValue, { marginBottom: 20 }]}>
          <Text style={styles.key}>Weather</Text>
          <Text
            style={[
              styles.value,
              { fontWeight: "500", fontSize: 14, lineHeight: 18 },
            ]}
          >
            {country?.weatherInformation?.seasonalConsiderations}
          </Text>
          <View style={styles.weatherRows}>
            <View style={styles.weatherRow}>
              <View style={styles.weatherLeft}>
                <SpringIcon />
                <Text style={styles.seasonText}>Spring</Text>
              </View>
              <Text style={styles.temperatureText}>
                {country?.weatherInformation?.averageTemperatures?.spring}
              </Text>
            </View>
            <View style={styles.weatherRow}>
              <View style={styles.weatherLeft}>
                <SummerIcon />
                <Text style={styles.seasonText}>Summer</Text>
              </View>
              <Text style={styles.temperatureText}>
                {country?.weatherInformation?.averageTemperatures.summer}
              </Text>
            </View>
            <View style={styles.weatherRow}>
              <View style={styles.weatherLeft}>
                <AutumnIcon />
                <Text style={styles.seasonText}>Autumn</Text>
              </View>
              <Text style={styles.temperatureText}>
                {country?.weatherInformation?.averageTemperatures.autumn}
              </Text>
            </View>
            <View style={styles.weatherRow}>
              <View style={styles.weatherLeft}>
                <WinterIcon />
                <Text style={styles.seasonText}>Winter</Text>
              </View>
              <Text style={styles.temperatureText}>
                {country?.weatherInformation?.averageTemperatures?.winter}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
});
export default Overview;
