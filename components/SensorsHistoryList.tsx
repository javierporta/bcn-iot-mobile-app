import { StackNavigationProp } from "@react-navigation/stack";
import axios from "axios";
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
import { API_URL } from "../consts/apiUrls";
import { RootStackParamList, TabOneParamList } from "../types";

const SensorsHistoryList = (): ReactElement => {
  const [isLoading, setLoading] = useState(true);
  const [sensorsHistoryData, setSensorsHistoryData] =
    useState<TemperatureAndHumiditySensor[]>();

  const getSensorsHistoryByClient = () => {
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

  const getItem = (data: string[], index: number) => ({
    id: Math.random().toString(12).substring(0),
    title: `${data[index]}`,
  });

  const getItemCount = (data: string[]) => data.length;

  interface ItemProps {
    title: string;
  }

  const Item = ({ ...data }: TemperatureAndHumiditySensor) => (
    <View style={styles.item}>
      <Text style={styles.title}>{data.mac}</Text>
      <Text style={styles.title}>{data.temperature}</Text>
      <Text style={styles.title}>{data.humidity}</Text>
      <Text style={styles.title}>{data.timestamp}</Text>
    </View>
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

  return (
    <>
      <Text>Sensors History</Text>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <>
          <Text>Your devices</Text>
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
    backgroundColor: "#f9c2ff",
    height: 150,
    justifyContent: "center",
    marginVertical: 8,
    marginHorizontal: 16,
    padding: 20,
  },
  title: {
    fontSize: 32,
  },
});
export default SensorsHistoryList;
