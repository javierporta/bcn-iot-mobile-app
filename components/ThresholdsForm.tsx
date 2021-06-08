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
import { TextInput } from "react-native-gesture-handler";
import { API_URL } from "../consts/apiUrls";

const ThresholdsForm = ({}): ReactElement => {
  const [isLoading, setLoading] = useState(true);
  const [clientData, setClientData] = useState<Client>();

  const [highTemp, onChangeHighTemp] = useState<string>("");
  const [lowTemp, onChangeLowTemp] = useState<string>("");

  const getClientData = () => {
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
        onChangeHighTemp(response.data.temperatureHighThreshold.toString());
        onChangeLowTemp(response.data.temperatureLowThreshold.toString());
      })
      .finally(() => setLoading(false));
  };
  useEffect(() => {
    getClientData();
  }, []);

  const updateThresholds = () => {
    alert("not implemented");
  };

  return (
    <>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <>
          <View>This is the form</View>
          <Text>{clientData?.temperatureHighThreshold}</Text>
          <Text>{clientData?.temperatureLowThreshold}</Text>

          <TextInput
            style={styles.input}
            onChangeText={onChangeHighTemp}
            value={highTemp}
            placeholder="High Temperature Threshold"
            keyboardType="numeric"
          />

          <TextInput
            style={styles.input}
            onChangeText={onChangeLowTemp}
            value={lowTemp}
            placeholder="Low Temperature Threshold"
            keyboardType="numeric"
          />

          <Button
            onPress={updateThresholds}
            title="Update Thresholds"
            color="#841584"
            accessibilityLabel="Learn more about this purple button"
          />
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
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
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

export default ThresholdsForm;
