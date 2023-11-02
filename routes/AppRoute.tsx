import React, { useCallback, useContext } from "react";
import { View, Text } from "react-native";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import { EvilIcons, Ionicons } from "@expo/vector-icons";

import { BottomRoutes } from "./bottom/BottomRoutes";

import { AuthContext } from "../package/context/auth.context";
import { PrimaryColor } from "../styles/colors";

//actions

interface AppRouteProps {}

const Drawer = createDrawerNavigator();

function CustomDrawerContent(props: any) {
  //@ts-ignore
  const { signOut } = useContext(AuthContext);

  const handelSignOut = useCallback(async () => {
    signOut();
  }, []);

  return (
    <DrawerContentScrollView {...props}>
      <View
        style={{
          width: "100%",
          alignItems: "center",
          marginBottom: 20,
          justifyContent: "center",
        }}
      >
        <EvilIcons name="user" size={200} color="white" />
        {/* {!isLoading && user && ( */}
        {true && (
          <>
            <Text
              style={{
                color: "white",

                fontSize: 15,
              }}
            >
              fullname
            </Text>
            <Text
              style={{
                color: "white",

                fontSize: 15,
              }}
            >
              user.phone
            </Text>
          </>
        )}
      </View>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Log Out"
        onPress={handelSignOut}
        icon={({ focused, color, size }) => (
          <Ionicons name="ios-return-down-back" size={size} color={color} />
        )}
        labelStyle={{
          fontWeight: "bold",
          marginLeft: -20,
        }}
      />
    </DrawerContentScrollView>
  );
}

export const AppRoute: React.FC<AppRouteProps> = (props: any) => {
  return (
    <Drawer.Navigator
      initialRouteName="Main"
      drawerContent={(props: any) => <CustomDrawerContent {...props} />}
      screenOptions={{
        overlayColor: "transparent",
        drawerStyle: {
          backgroundColor: PrimaryColor,
        },
        drawerLabelStyle: {
          fontWeight: "bold",
          marginLeft: -20,
        },
        drawerItemStyle: {
          borderBottomColor: "#fff",
          borderBottomWidth: 1,
          marginVertical: 5,
        },
        drawerInactiveTintColor: "#000",
        drawerActiveTintColor: "#fff",
        headerShown: false,
      }}
    >
      <Drawer.Screen
        name="Main"
        component={BottomRoutes}
        options={{
          title: "Main",
          drawerLabelStyle: {
            //
            fontWeight: "bold",
            marginLeft: -20,
          },

          drawerIcon: ({ focused, color, size }) => {
            return <Ionicons name="md-home" size={size} color={color} />;
          },
        }}
      />
    </Drawer.Navigator>
  );
};
