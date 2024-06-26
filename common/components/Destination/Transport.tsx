import React from "react";
import {
  ImageBackground,
  Linking,
  Platform,
  TouchableOpacity,
  View,
} from "react-native";
import { ScrollView, Text } from "react-native";
import {
  BusIcon,
  DrivingSideLeft,
  DrivingSideRight,
  MetroIcon,
  TramwayIcon,
  TrolleybusIcon,
} from "../../../utilities/SvgIcons.utility";
import { styles } from "../_styles";
import { CountryType } from "../../../api/api.types";
import RenderHTML from "react-native-render-html";
import { SIZES } from "../../../styles/theme";

interface TransportProps {
  country: CountryType;
}

export const Transport: React.FC<TransportProps> = ({ country }) => {
  return (
    <ScrollView style={styles.tabWrapper} contentContainerStyle={{
      paddingBottom: 30
    }} showsVerticalScrollIndicator={false}>
      <Text style={styles.secondaryTitle}>General info</Text>
      <RenderHTML
        key={"topic"}
        contentWidth={SIZES.width}
        source={{
          html: `
            <ul style="line-height: 27px; padding-left: 15px">
                <li style="line-height: 22px; font-size: 16px; margin-bottom: 8px"><strong>Trains:</strong> 
                    Connect major cities (affordable, under $10 usually).
                </li>
                <li style="line-height: 22px; font-size: 16px; margin-bottom: 8px"><strong>Metro (Tbilisi only):</strong> 
                    Fast and convenient (around ₾1 per ride).
                </li>
                <li style="line-height: 22px; font-size: 16px; margin-bottom: 8px"><strong>Marshrutkas:</strong> 
                    Minibuses for city and intercity travel (cheap, fares depend on distance).
                </li>
                <li style="line-height: 22px; font-size: 16px; margin-bottom: 0"><strong>Buses:</strong> 
                    Extensive network for cities and regions (affordable).
                </li>
            </ul>
            `,
        }}
        defaultTextProps={{
          selectable: true,
        }}
      />

      <Text style={[styles.secondaryTitle, {marginTop: 15}]}>Public transport</Text>
      <View style={styles.transports}>
        {country.transportTypes?.map((item) => {
          return item === "Bus" ? (
            <View
              style={styles.transportItem}
              key={`transport-${item}-${country.id}`}
            >
              <View style={styles.transportItemIcon}>
                <BusIcon />
              </View>
              <Text style={styles.transportText}>Bus</Text>
            </View>
          ) : item === "Metro" ? (
            <View
              style={styles.transportItem}
              key={`transport-${item}-${country.id}`}
            >
              <View style={styles.transportItemIcon}>
                <MetroIcon />
              </View>
              <Text style={styles.transportText}>Metro</Text>
            </View>
          ) : item === "Trolleybus" ? (
            <View
              style={styles.transportItem}
              key={`transport-${item}-${country.id}`}
            >
              <View style={styles.transportItemIcon}>
                <TrolleybusIcon />
              </View>
              <Text style={styles.transportText}>Trolleybus</Text>
            </View>
          ) : item === "Trams" ? (
            <View
              style={styles.transportItem}
              key={`transport-${item}-${country.id}`}
            >
              <View style={styles.transportItemIcon}>
                <TramwayIcon />
              </View>
              <Text style={styles.transportText}>Trams</Text>
            </View>
          ) : null;
        })}
      </View>
      <Text style={styles.secondaryTitle}>Taxi apps</Text>
      <View style={styles.transports}>
        {country?.taxi.map((item, ind) => (
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.transportItem}
            key={`taxt-${ind}`}
            onPress={() =>
              Linking.openURL(
                `${Platform.OS === "android" ? item.android : item.ios}`
              )
            }
          >
            <View style={styles.transportItemIcon}>
              <ImageBackground
                source={{
                  uri: item.logo,
                }}
                resizeMode="cover"
                style={{ width: 30, height: 20 }}
              />
            </View>
            <Text style={styles.transportText}>{item.name}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.secondaryTitle}>Driving side</Text>
      <View style={styles.drivingSide}>
        {country.car.side === "Right" ? (
          <>
            <Text style={styles.drivingSideText}>Right</Text>
            <DrivingSideRight />
          </>
        ) : (
          <>
            <Text style={styles.drivingSideText}>Left</Text>
            <DrivingSideLeft />
          </>
        )}
      </View>
    </ScrollView>
  );
};
