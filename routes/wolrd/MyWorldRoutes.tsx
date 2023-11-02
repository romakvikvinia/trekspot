import React from "react";
import {
  StackNavigationProp,
  createStackNavigator,
} from "@react-navigation/stack";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { MyWorldScreen } from "../../screen/world/MyWorldScreen";
import { THeaderButton } from "../../common/ui/THeaderButton";
import { PrimaryColor } from "../../styles/colors";

interface MyWorldRouteProps {}

type MyWorldRouteStackParamList = {
  World: undefined;
};

const Stack = createStackNavigator<MyWorldRouteStackParamList>();

export type MyWorldRouteStackNavigationProp =
  StackNavigationProp<MyWorldRouteStackParamList>;

export const MyWorldRouteStack: React.FC<MyWorldRouteProps> = ({}) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="World"
        component={MyWorldScreen}
        options={({ route, navigation }) => ({
          headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={THeaderButton}>
              <Item
                title="UndoSignature"
                iconName="md-menu"
                color={PrimaryColor}
                onPress={navigation.toggleDrawer}
              />
            </HeaderButtons>
          ),
        })}
      />
    </Stack.Navigator>
  );
};
