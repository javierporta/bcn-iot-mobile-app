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
  VirtualizedList,
} from "react-native";
import { API_URL } from "../consts/apiUrls";
import { RootStackParamList, TabOneParamList } from "../types";

type TabOneScreenNavigationProp = StackNavigationProp<
  TabOneParamList,
  "TabOneScreen"
>;

interface SensorDataListProps {
  navigation: TabOneScreenNavigationProp;
}

const SensorDataList = ({ navigation }: SensorDataListProps): ReactElement => {
  const [isLoading, setLoading] = useState(true);
  const [clientData, setClientData] = useState<Client>();

  const getAllSensorsRegisteredByClient = () => {
    axios
      .get<Client>(
        `${API_URL}/api/Clients/oifjweweo%24ineogsef27r3893r_273y2huiwfeg`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        const clientsData = response.data;
        setClientData(clientsData);
      })
      .finally(() => setLoading(false));
  };
  useEffect(() => {
    getAllSensorsRegisteredByClient();
  });

  const getItem = (data: string[], index: number) => ({
    id: Math.random().toString(12).substring(0),
    title: `${data[index]}`,
  });

  const getItemCount = (data: string[]) => data.length;

  interface ItemProps {
    title: string;
  }

  const goToDetailsScreen = (title: string) => {
    navigation.push("SensorDetailScreen", { mac: title });
  };

  const Item = ({ title }: ItemProps) => (
    <View style={styles.item}>
      <Text style={styles.title} onPress={() => goToDetailsScreen(title)}>
        {title}
      </Text>
    </View>
  );

  interface RenderItemProps {
    item: Item;
  }

  interface Item {
    title: string;
  }

  const renderItem = ({ item }: RenderItemProps) => <Item title={item.title} />;

  return (
    <>
      <Text>Hola! {clientData?.name}</Text>
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
              <VirtualizedList
                data={clientData?.registeredDevices}
                initialNumToRender={3}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                getItemCount={getItemCount}
                getItem={getItem}
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
export default SensorDataList;
