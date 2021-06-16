/**
 * Learn more about createBottomTabNavigator:
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */

import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";

import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import SensorDetailScreen from "../screens/SensorDetailScreen";
import TabSensorsListScreen from "../screens/TabSensorsListScreen";
import TabThresholdScreen from "../screens/TabThresholdScreen";
import TabTwoScreen from "../screens/TabTwoScreen";
import {
  BottomTabParamList,
  TabOneParamList,
  TabThresholdParamList,
  TabTwoParamList,
} from "../types";

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const colorScheme = "light";

  return (
    <BottomTab.Navigator
      initialRouteName="Sensors"
      tabBarOptions={{ activeTintColor: Colors[colorScheme].tint }}
    >
      <BottomTab.Screen
        name="Sensors"
        component={TabOneNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="thermometer-sharp" color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="History"
        component={TabTwoNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="list" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Profile"
        component={TabThresholdNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="person" color={color} />,
        }}
      />
    </BottomTab.Navigator>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expsensoso.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof Ionicons>["name"];
  color: string;
}) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const TabOneStack = createStackNavigator<TabOneParamList>();

function TabOneNavigator() {
  return (
    <TabOneStack.Navigator>
      <TabOneStack.Screen
        name="TabSensorsListScreen"
        component={TabSensorsListScreen}
        options={{ headerTitle: "My List of Sensors" }}
      />
      <TabOneStack.Screen
        name="SensorDetailScreen"
        component={SensorDetailScreen}
        options={{ headerTitle: "Sensor Detail Title" }}
      />
    </TabOneStack.Navigator>
  );
}

const TabTwoStack = createStackNavigator<TabTwoParamList>();

function TabTwoNavigator() {
  return (
    <TabTwoStack.Navigator>
      <TabTwoStack.Screen
        name="TabTwoScreen"
        component={TabTwoScreen}
        options={{ headerTitle: "All sensors history" }}
      />
    </TabTwoStack.Navigator>
  );
}

const TabThresholdStack = createStackNavigator<TabThresholdParamList>();

function TabThresholdNavigator() {
  return (
    <TabThresholdStack.Navigator>
      <TabThresholdStack.Screen
        name="TabThresholdScreen"
        component={TabThresholdScreen}
        options={{ headerTitle: "My Profile" }}
      />
    </TabThresholdStack.Navigator>
  );
}
