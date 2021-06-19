import { StackNavigationProp } from "@react-navigation/stack";
import axios from "axios";
import { LinearGradient } from "expo-linear-gradient";
import moment from "moment";
import React, { ReactElement, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Button,
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { ListItem } from "react-native-elements/dist/list/ListItem";
import Colors from "../constants/Colors";
import { API_URL } from "../consts/apiUrls";
import { TabBarIcon } from "../navigation/BottomTabNavigator";
import { RootStackParamList, TabOneParamList } from "../types";
import { MonoText } from "./StyledText";

const SensorsHistoryList = (): ReactElement => {
  const [isLoading, setLoading] = useState(true);
  const [sensorsHistoryData, setSensorsHistoryData] =
    useState<TemperatureAndHumiditySensor[]>();

  const getSensorsHistoryByClient = () => {
    setLoading(true);
    axios
      .get<TemperatureAndHumiditySensor[]>(
        `${API_URL}/api/TemperatureHumiditySensors?clientId=oifjweweo%24ineogsef27r3893r_273y2huiwfeg`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        const data = response.data;
        setSensorsHistoryData(data);
      })
      .finally(() => setLoading(false));
  };
  useEffect(() => {
    getSensorsHistoryByClient();
  }, []);

  const Item = ({ ...data }: TemperatureAndHumiditySensor) => (
    <LinearGradient colors={["#1fe4f5", "#3fbafe"]} style={styles.item}>
      <MonoText style={styles.title}>
        <TabBarIcon name="hardware-chip-outline" color="#fff" />
        <View style={styles.separator}></View>
        {data.mac}
      </MonoText>
      <MonoText style={styles.title}>
        <TabBarIcon name="thermometer-outline" color="#fff" />
        <View style={styles.separator}></View>
        {data.temperature}ºC
      </MonoText>
      <MonoText style={styles.title}>
        <TabBarIcon name="cloud-circle-outline" color="#fff" />
        <View style={styles.separator}></View>
        {data.humidity}%
      </MonoText>
      <MonoText style={styles.title}>
        <TabBarIcon name="time-outline" color="#fff" />
        <View style={styles.separator}></View>
        {moment(data.timestamp).format("DD/MM/YYYY hh:mm:ss")}
      </MonoText>
    </LinearGradient>
  );

  interface RenderItemProps {
    item: Item;
  }

  interface Item {
    title: string;
  }

  const renderItem = ({ item }: { item: TemperatureAndHumiditySensor }) => (
    <Item
      id={item.id}
      mac={item.mac}
      humidity={item.humidity}
      temperature={item.temperature}
      timestamp={item.timestamp}
    />
  );

  const onRefresh = () => {
    getSensorsHistoryByClient();
  };

  return (
    <>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-between",
              alignContent: "stretch",
            }}
          >
            <SafeAreaView style={styles.cards}>
              <FlatList
                data={sensorsHistoryData}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                onRefresh={() => onRefresh()}
                refreshing={isLoading}
              />
            </SafeAreaView>
          </View>
        </>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  cards: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
  },
  item: {
    height: 200,
    justifyContent: "center",
    marginVertical: 8,
    marginHorizontal: 16,
    padding: 20,
    borderRadius: 10,
    boxShadow: "0px 6px 10px rgba(0, 0, 0, 0.25)",
    transition: "all 0.5s",
  },
  title: {
    fontSize: 26,
    color: "#fff",
  },
  separator: {
    width: 10,
  },
});
export default SensorsHistoryList;
