import { View } from "react-native";

import { SIZES } from "../../styles/theme";

export const CityLoader = ({ isLoading }) => {
  return (
    <View
      style={{
        minHeight: SIZES.height,
        position: "absolute",
        top: 0,
        left: 0,
        zIndex: 7,
        right: 0,
        bottom: 0,
        backgroundColor: "#fff"
      }}
    >
      <View
        style={{
          backgroundColor: "#eee",
          width: "100%",
          height: 100,
        }}
      />

      <View
        style={{
          width: "100%",
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 30,
        }}
      >
        <View>
          <View
            style={{
              width: 150,
              height: 30,
              backgroundColor: "#eee",
              marginLeft: 15,
              borderRadius: 10,
            }}
          ></View>
          <View
            style={{
              width: 110,
              height: 20,
              backgroundColor: "#eee",
              marginLeft: 15,
              borderRadius: 10,
              marginTop: 10,
            }}
          ></View>
        </View>
        <View
          style={{
            width: 110,
            height: 35,
            backgroundColor: "#eee",
            marginTop: 0,
            borderRadius: 10,
          }}
        ></View>
      </View>

      <View
        style={{
          width: "100%",
          marginTop: 20,
        }}
      >
        <View
          style={{
            alignItems: "flex-start",
            justifyContent: "flex-start",
            flexDirection: "row",
          }}
        >
          <View
            style={{
              width: SIZES.width - 130,
              height: 305,
              backgroundColor: "#eee",
              marginLeft: 15,
              borderRadius: 10,
              marginRight: 8
            }}
          ></View>
          <View
            style={{
              justifyContent: "space-between",
              flexDirection: "column",
              width: 100,
            }}
          >
            <View
              style={{
                width: 145,
                height: 146,
                backgroundColor: "#eee",
                borderRadius: 10
              }}
            ></View>
            <View
              style={{
                width: 145,
                height: 146,
                backgroundColor: "#eee",
                borderRadius: 10,
                marginTop: 9
              }}
            ></View>
          </View>
        </View>
      </View>
      <View style={{
        paddingHorizontal: 15,
        flexDirection: "row"
      }}>
          <View
            style={{
              backgroundColor: "#eee",
              width: 180,
              marginRight: 10,
              minHeight: 200,
              marginTop: 10,
              borderRadius: 10,
              overflow: "hidden"
            }}
          ></View> 
           <View
            style={{
              backgroundColor: "#eee",
              width: 180,
              marginRight: 10,
              minHeight: 200,
              marginTop: 10,
              borderRadius: 10,
              overflow: "hidden"
            }}
          ></View> 
      </View>
      <View style={{
        paddingHorizontal: 15,
        flexDirection: "row"
      }}>
          <View
            style={{
              backgroundColor: "#eee",
              width: 180,
              marginRight: 10,
              minHeight: 40,
              marginTop: 10,
              borderRadius: 10,
              overflow: "hidden"
            }}
          ></View> 
           <View
            style={{
              backgroundColor: "#eee",
              width: 180,
              marginRight: 10,
              minHeight: 40,
              marginTop: 10,
              borderRadius: 10,
              overflow: "hidden"
            }}
          ></View> 
      </View>
      <View style={{
        paddingHorizontal: 15,
        flexDirection: "row"
      }}>
          <View
            style={{
              backgroundColor: "#eee",
              width: 180,
              marginRight: 10,
              minHeight: 70,
              marginTop: 10,
              borderRadius: 10,
              overflow: "hidden"
            }}
          ></View> 
           <View
            style={{
              backgroundColor: "#eee",
              width: 180,
              marginRight: 10,
              minHeight: 70,
              marginTop: 10,
              borderRadius: 10,
              overflow: "hidden"
            }}
          ></View> 
      </View>
    </View>
  );
};
