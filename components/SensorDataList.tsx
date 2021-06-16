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
import { MonoText } from "./StyledText";

type TabSensorsListScreenNavigationProp = StackNavigationProp<
  TabOneParamList,
  "TabSensorsListScreen"
>;

interface SensorDataListProps {
  navigation: TabSensorsListScreenNavigationProp;
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
  }, []);

  const getItem = (data: string[], index: number) => ({
    id: Math.random().toString(12).substring(0),
    title: `${data[index]}`,
  });

  const getItemCount = (data: string[]) => (data ? data.length : 0);

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
      <MonoText>Hey {clientData?.name}!</MonoText>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <>
          <MonoText>These are your devices</MonoText>
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
    height: 150,
    justifyContent: "center",
    marginVertical: 8,
    marginHorizontal: 16,
    padding: 20,
    borderRadius: 10,
    boxShadow: "0px 6px 10px rgba(0, 0, 0, 0.25)",
    transition: "all 0.5s",
    backgroundColor: "#3fbafe",
  },
  title: {
    fontSize: 32,
  },
});
export default SensorDataList;
