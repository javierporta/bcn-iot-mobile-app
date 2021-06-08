import axios from "axios";
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
import { Card } from "react-native-elements";

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
        `https://localhost:44327/api/TemperatureHumiditySensors/${mac}?clientId=oifjweweo%24ineogsef27r3893r_273y2huiwfeg`, //todo set key in a const
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

  const getFormattedTime = (date: Date): string => {
    let formmatedDate = new Date(thData!.timestamp);
    formmatedDate.setHours(formmatedDate.getHours() - 1); // correct hour
    const formmatedDateFromNow = moment(formmatedDate).fromNow();
    return formmatedDateFromNow;
  };

  return (
    <>
      <Text>Mac</Text>
      <Text>{mac}</Text>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <>
          <View>
            <Card>
              <Card.Title>Temperature</Card.Title>
              <Card.Divider />
              {/* <Card.Image source={require("..assets/images/splash.png")}>
                <Text style={{ marginBottom: 10 }}>
                  The idea with React Native Elements is more about component
                  structure than actual design.
                </Text>
              </Card.Image> */}
              <Text>{thData?.temperature}</Text>
            </Card>

            <Card>
              <Card.Title>Humidity</Card.Title>
              <Card.Divider />
              <Text>{thData?.humidity}</Text>
            </Card>

            <Card>
              <Card.Title>Last Update</Card.Title>
              <Card.Divider />
              <Text>{getFormattedTime(thData!.timestamp)}</Text>
            </Card>
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

export default SensorCurrentValues;
