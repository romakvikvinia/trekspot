import { useRef } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";

import { styles } from "../../common/components/_styles";
import { COLORS, SIZES } from "../../styles/theme";

export const NormalTab = ({
  activeTab,
  setActiveTab,
  handleScrollTo,
  isSticky,
  TABS,
}) => {
  const TabScrollViewRef = useRef(null);

  const scrollToButton = (buttonRef) => {
    buttonRef.current.measureLayout(
      TabScrollViewRef.current,
      (x, y, width) => {
        const centerX = x + width / 2;
        const offset = centerX - SIZES.width / 2;
        TabScrollViewRef.current.scrollTo({ x: offset, animated: true });
      },
      () => {
        console.log("Error measuring layout");
      }
    );
  };

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        paddingHorizontal: 15,
      }}
      style={[
        styles.tabsWrapper,
        {
          opacity: isSticky ? 0 : 1,
        },
      ]}
      ref={TabScrollViewRef}
    >
      {TABS?.map((tab, i) => {
        const buttonRef = useRef(null);
        return (
          <Pressable
            style={[styles.tabItem,
                {
                    paddingLeft: i === 0 ? 0 : 20
                }
            ]}
            ref={buttonRef}
            key={i}
            onPress={() => {
              setActiveTab(tab);
              handleScrollTo();
              scrollToButton(buttonRef);
            }}
          >
            <Text
              style={[
                styles.tabItemLabel,
                {
                  color: tab === activeTab ? COLORS.primary : COLORS.black,
                },
              ]}
            >
              {tab}
            </Text>
            {tab === activeTab ? (
              <View style={[styles.activeIndicator,{
                left: i === 0 ? 0 : 20
              }]}></View>
            ) : null}
          </Pressable>
        );
      })}
    </ScrollView>
  );
};
