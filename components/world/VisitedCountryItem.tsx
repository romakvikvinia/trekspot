import React from "react";
import { View, ImageBackground } from "react-native";
import { Marker } from "react-native-maps";
import { ICountry } from "../../utilities/countryList";

import { StoryType } from "../../api/api.types";

interface VisitedCountryItemProps {
  item: ICountry;
  story?: StoryType;
  onGalleryOpen: (story: StoryType) => void;
}

export const VisitedCountryItem: React.FC<VisitedCountryItemProps> = ({
  story,
  item,
  onGalleryOpen,
}) => {
  return (
    <Marker
      onPress={() => story && onGalleryOpen(story)}
      coordinate={{
        latitude: item.coordinates.latitude,
        longitude: item.coordinates.longitude,
      }}
      // title={"title"}
      // description={"description"}
    >
      <View
        style={{
          backgroundColor: "#fff",
          padding: 0,
          borderRadius: 50,
          borderWidth: 2,
          borderColor: "#fff",
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.2,
          shadowRadius: 3.84,
          elevation: 5,
          position: "relative",
          zIndex: 2,
        }}
      >
        {story && story.images.length ? (
          <ImageBackground
            style={{
              width: 40,
              height: 40,
              borderRadius: 50,
              overflow: "hidden",
            }}
            source={{
              uri: story.images[0].url,
            }}
          />
        ) : null}
      </View>
    </Marker>
  );
};
