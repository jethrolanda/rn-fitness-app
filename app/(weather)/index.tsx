import { useEffect, useState } from "react";
import { StyleSheet, View, Button, Text } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { IRootState } from "@/store";

export default function Index() {
  const [weather, setWeather] = useState({});
  const myCoordinates = useSelector(
    (state: IRootState) => state.blogState.myCoordinates
  );
  useEffect(() => {
    const fetchWeather = () => {
      if (myCoordinates.latitude === 0) return;
      fetch(
        `http://api.openweathermap.org/data/2.5/weather?lat=${myCoordinates?.latitude}&lon=${myCoordinates?.longitude}&APPID=${process.env.EXPO_PUBLIC_OPEN_WEATHER_API_KEY}`
      )
        .then((res) => res.json())
        .then((json) => {
          setWeather(json);
          console.log(JSON.stringify(json, null, "\t"));
          // console.log(json);
        });
    };
    fetchWeather();
  }, [myCoordinates]);

  console.log(weather);
  if (weather?.weather) return <></>;
  return (
    <View>
      <Text>Weather: {weather?.weather[0]?.main}</Text>
      <Text>Temperature: {weather?.main?.temp}</Text>
    </View>
  );
}
