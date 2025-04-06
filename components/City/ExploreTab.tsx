import { useCallback, useMemo, useState } from "react";
import { ScrollView, Text, View } from "react-native";

import { SightType } from "../../api/api.types";
import { SIZES } from "../../styles/theme";
import { NotFound } from "../common/NotFound";
import { exploreStyles } from "../explore/sights/_exploreStyles";
import { SightDetailModal } from "../explore/sights/SightDetailModal";
import { SightItem } from "../explore/sights/SightItem";
import { SightsContainer } from "../explore/sights/SightsContainer";
import { CityOverviewText } from "./CityOverviewText";

interface IState {
  sight: SightType | null;
}
export const ExploreTab = ({ activeTab, data, isLoading }) => {
  const [state, setState] = useState<IState>({ sight: null });

  const handleSetSightItem = useCallback((sight: SightType) => {
    setState((prevState) => ({ ...prevState, sight }));
  }, []);

  const handleOnClose = useCallback(() => {
    setState((prevState) => ({ ...prevState, sight: null }));
  }, []);

  // transform data

  const topSights = (data && "Top Sights" in data && data["Top Sights"]) || [];
  const sights = data && { ...data };
  if (sights && data && "Top Sights" in data && data["Top Sights"]) {
    delete sights["Top Sights"];
  }

  const dataNotFound = useMemo(
    () =>
      !isLoading && !topSights.length && sights && !Object.keys(sights).length,
    [isLoading, topSights, sights]
  );

  return (
    <>
      <View
        style={{
          display: activeTab === "Explore" ? "flex" : "none",
          minHeight: SIZES.height,
        }}
      >
        {/* Top sights */}
        {dataNotFound && (
          <View style={{ flex: 1, marginTop: 30 }}>
            <NotFound />
          </View>
        )}

        <CityOverviewText />

        {topSights?.length > 0 && (
          <View
            style={[
              exploreStyles.placeSpotsRow,
              {
                borderTopWidth: 0,
                marginTop: 0
              },
            ]}
          >
            <Text
              style={[
                exploreStyles.placeSpotsRowTitle,
                { fontSize: 20, fontWeight: "bold" },
              ]}
            >
              Top sights
            </Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{
                paddingHorizontal: 15,
              }}
            >
              {topSights?.map(
                (item, i) =>
                  item?.image && (
                    <SightItem
                      key={`top-sights-${item.id}-${item.title}-${i}`}
                      item={item}
                      onHandleItem={handleSetSightItem}
                    />
                  )
              )}
            </ScrollView>
          </View>
        )}

        {/* Top sights */}

        {sights && Object.keys(sights).length ? (
          <SightsContainer items={sights} />
        ) : null}
      </View>
      {state.sight && (
        <SightDetailModal
          showDirection={false}
          data={state.sight}
          closeCallBack={handleOnClose}
        />
      )}
    </>
  );
};
