import { StackNavigationProp } from "@react-navigation/stack";
import * as React from "react";
import { StyleSheet } from "react-native";

import { Text, View } from "../components/Themed";
import ThresholdsForm from "../components/ThresholdsForm";
import { TabOneParamList } from "../types";

type SensorDetailScreenNavigationProp = StackNavigationProp<
  TabOneParamList,
  "SensorDetailScreen"
>;

interface SensorDetailScreenProp {
  route: any;
  navigation: SensorDetailScreenNavigationProp;
}

export default function TabThresholdScreen({
  route,
  navigation,
}: SensorDetailScreenProp) {
  return (
    <View style={styles.container}>
      <ThresholdsForm></ThresholdsForm>
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
