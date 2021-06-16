import { StackNavigationProp } from "@react-navigation/stack";
import * as React from "react";
import { StyleSheet } from "react-native";

import EditScreenInfo from "../components/EditScreenInfo";
import SensorDataList from "../components/SensorDataList";
import { Text, View } from "../components/Themed";
import { RootStackParamList, TabOneParamList } from "../types";

type TabSensorsListScreenNavigationProp = StackNavigationProp<
  TabOneParamList,
  "TabSensorsListScreen"
>;
interface TabSensorsListScreenProps {
  navigation: TabSensorsListScreenNavigationProp;
}

export default function TabSensorsListScreen({
  navigation,
}: TabSensorsListScreenProps) {
  return (
    <View style={styles.container}>
      <SensorDataList navigation={navigation}></SensorDataList>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
