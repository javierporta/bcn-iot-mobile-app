import { StackNavigationProp } from "@react-navigation/stack";
import * as React from "react";
import { StyleSheet } from "react-native";

import EditScreenInfo from "../components/EditScreenInfo";
import SensorDataList from "../components/SensorDataList";
import { Text, View } from "../components/Themed";
import { RootStackParamList, TabOneParamList } from "../types";

type TabOneScreenNavigationProp = StackNavigationProp<
  TabOneParamList,
  "TabOneScreen"
>;
interface TabOneScreenProps {
  navigation: TabOneScreenNavigationProp;
}

export default function TabOneScreen({ navigation }: TabOneScreenProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab One</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
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
