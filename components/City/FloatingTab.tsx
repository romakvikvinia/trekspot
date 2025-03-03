import { useRef } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";

import { styles } from "../../common/components/_styles";
import { COLORS, SIZES } from "../../styles/theme";

export const FloatingTab = ({ isSticky, TABS, activeTab, setActiveTab, handleScrollTo }) => {
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
      ref={TabScrollViewRef}
      contentContainerStyle={{
        paddingHorizontal: 15,
      }}
      style={[
        styles.tabsWrapper,
        {
          display: isSticky ? "flex" : "none",
          flexDirection: "row",
          maxHeight: 50,
          position: "absolute",
          top: 80,
          zIndex: 4,
          backgroundColor: "#f8f8f8",
          borderBottomColor: "#ccc",
        },
      ]}
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
            key={i}
            ref={buttonRef}
            onPress={() => {
              setActiveTab(tab);
              handleScrollTo();
              scrollToButton(buttonRef)
            }}
            hitSlop={30}
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
        );}
      )}
    </ScrollView>
  );
};
