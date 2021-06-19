import axios from "axios";
import { LinearGradient } from "expo-linear-gradient";
import moment from "moment";
import React, { ReactElement, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Button,
  FlatList,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Card } from "react-native-elements";
import { BorderlessButton } from "react-native-gesture-handler";
import Colors from "../constants/Colors";
import { API_URL } from "../consts/apiUrls";
import { TabBarIcon } from "../navigation/BottomTabNavigator";
import { MonoText } from "./StyledText";

interface SensorCurrentValuesProps {
  mac: string;
}
const SensorCurrentValues = ({
  mac,
}: SensorCurrentValuesProps): ReactElement => {
  const [isLoading, setLoading] = useState(true);
  const [thData, setThData] = useState<TemperatureAndHumiditySensor>();

  const getSensorCurrentValues = () => {
    axios
      .get<TemperatureAndHumiditySensor>(
        `${API_URL}/api/TemperatureHumiditySensors/${mac}?clientId=oifjweweo%24ineogsef27r3893r_273y2huiwfeg`, //todo set key in a const
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        const thData = response.data;
        setThData(thData);
      })
      .finally(() => setLoading(false));
  };
  useEffect(() => {
    getSensorCurrentValues();
  }, []);

  const getFormattedTime = (date: Date | undefined): string => {
    if (date === undefined) {
      return "";
    }
    let formmatedDate = new Date(thData!.timestamp);
    formmatedDate.setHours(formmatedDate.getHours() - 1); // correct hour
    const formmatedDateFromNow = moment(formmatedDate).fromNow();
    return formmatedDateFromNow;
  };

  return (
    <>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <>
          <MonoText style={styles.title}>Sensor</MonoText>
          <Text style={styles.title}>
            MAC <Text style={styles.boldText}>{mac}</Text>
          </Text>
          <View style={styles.separator} />
          <ScrollView>
            <Card>
              <Card.Title>Temperature</Card.Title>
              <Card.Divider />
              <Text style={styles.cardText}>
                <TabBarIcon name="thermometer" color={Colors.light.tint} />
              </Text>
              <MonoText style={styles.cardText}>
                {thData?.temperature}ºC
              </MonoText>
            </Card>

            <Card>
              <Card.Title>Humidity</Card.Title>
              <Card.Divider />
              <Text style={styles.cardText}>
                <TabBarIcon name="cloud-circle" color={Colors.light.tint} />
              </Text>
              <MonoText style={styles.cardText}>{thData?.humidity}%</MonoText>
            </Card>

            <Card>
              <Card.Title>Last Update</Card.Title>
              <Card.Divider />
              <Text style={styles.cardText}>
                <TabBarIcon name="time" color={Colors.light.tint} />
              </Text>
              <MonoText style={styles.cardText}>
                {getFormattedTime(thData?.timestamp)}
              </MonoText>
            </Card>
          </ScrollView>
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
    fontSize: 26,
  },
  cardText: {
    textAlign: "center",
    fontSize: 36,
  },
  separator: {
    marginVertical: 10,
    height: 1,
    width: "80%",
  },
  boldText: {
    fontWeight: "bold",
  },
});

export default SensorCurrentValues;
