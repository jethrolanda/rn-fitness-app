import { View, Text, SafeAreaView, StyleSheet, TextInput } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { IRootState } from "@/store";
import { useState } from "react";
import Button from "./Button";
import * as Location from "expo-location";
import { setDestinationCoordinates } from "@/store/reducer/mapSlice";

export default function Route() {
  const dispatch = useDispatch();
  const [destination, onChangeDestination] = useState("");
  const myAddress = useSelector(
    (state: IRootState) => state.blogState.myAddress
  );
  const routeInfo = useSelector(
    (state: IRootState) => state.blogState.routeInfo
  );
  let currentAddr = "";

  if (myAddress.length > 0) {
    const { formattedAddress } = myAddress[0];
    if (formattedAddress !== null) {
      currentAddr = formattedAddress?.toString();
    }
  }

  const onPress = async () => {
    const geocode = await Location.geocodeAsync(destination);
    const { latitude, longitude } = geocode[0];
    console.log(geocode);
    dispatch(
      setDestinationCoordinates({
        latitude,
        longitude
      })
    );
  };
  console.log(routeInfo);
  return (
    <View style={styles.container}>
      <SafeAreaView>
        <Text>Origin: </Text>
        <TextInput style={styles.input} editable={false} value={currentAddr} />
        <Text>Destination: </Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangeDestination}
          value={destination}
          placeholder="Search destination"
        />
        <Button onPress={onPress} title="Search" />
        <Text style={styles.result}>Distance: {routeInfo.distance}</Text>
        <Text style={styles.result}>Duration: {routeInfo.duration}</Text>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    padding: 10
  },
  input: {
    height: 40,
    marginTop: 12,
    marginBottom: 12,
    borderWidth: 1,
    padding: 10
  },
  result: {
    fontSize: 18,
    marginTop: 10,
    marginBottom: 10
  }
});
