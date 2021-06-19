import { StackNavigationProp } from "@react-navigation/stack";
import axios from "axios";
import { LinearGradient } from "expo-linear-gradient";
import React, { ReactElement, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Button,
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  VirtualizedList,
} from "react-native";
import { API_URL } from "../consts/apiUrls";
import { TabBarIcon } from "../navigation/BottomTabNavigator";
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
    <View>
      <TouchableHighlight
        underlayColor=""
        onPress={() => goToDetailsScreen(title)}
      >
        <LinearGradient colors={["#1fe4f5", "#3fbafe"]} style={styles.item}>
          <Text style={styles.cardIcon}>
            <TabBarIcon name="hardware-chip-outline" color="#fff" />
          </Text>
          <Text style={styles.cardSubtitle}>MAC</Text>
          <Text style={styles.cardTitle}>{title}</Text>
        </LinearGradient>
      </TouchableHighlight>
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
      {isLoading ? (
        <>
          <MonoText>Loading your data</MonoText>
          <ActivityIndicator />
        </>
      ) : (
        <>
          <MonoText style={styles.title}>
            Hey <strong>{clientData?.name}</strong>!
          </MonoText>
          <MonoText style={styles.subTitle}>These are your devices</MonoText>
          <View style={styles.separator} />
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
  },
  title: {
    fontSize: 26,
  },
  subTitle: {
    fontSize: 22,
  },
  cardTitle: {
    fontSize: 32,
    fontFamily: "space-mono",
    color: "#fff",
    textAlign: "center",
  },
  cardSubtitle: {
    fontSize: 16,
    fontFamily: "space-mono",
    color: "#fff",
    textAlign: "center",
  },
  cardIcon: {
    textAlign: "center",
  },
  separator: {
    marginVertical: 10,
    height: 1,
    width: "80%",
  },
});
export default SensorDataList;
