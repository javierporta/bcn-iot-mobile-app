import { StackNavigationProp } from "@react-navigation/stack";
import * as React from "react";
import { StyleSheet } from "react-native";

import EditScreenInfo from "../components/EditScreenInfo";
import SensorCurrentValues from "../components/SensorCurrentValues";
import SensorDataList from "../components/SensorDataList";
import { MonoText } from "../components/StyledText";
import { Text, View } from "../components/Themed";
import { TabOneParamList } from "../types";

type SensorDetailScreenNavigationProp = StackNavigationProp<
  TabOneParamList,
  "SensorDetailScreen"
>;

interface SensorDetailScreenProp {
  route: any;
  navigation: SensorDetailScreenNavigationProp;
}

export default function SensorDetailScreen({
  route,
  navigation,
}: SensorDetailScreenProp) {
  const { mac } = route.params;

  return (
    <View style={styles.container}>
      <SensorCurrentValues mac={mac}></SensorCurrentValues>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
