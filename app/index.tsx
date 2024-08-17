import React, { useRef, useEffect } from "react";
import { StyleSheet, View, Button } from "react-native";
import MapView, { Marker } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import * as Location from "expo-location";
import { LatLng } from "@/types";
import Constants from "expo-constants";
import { IRootState } from "@/store";
import {
  setMyCoordinates,
  setMyAddress,
  setRouteInfo
} from "@/store/reducer/mapSlice";

import { useSelector, useDispatch } from "react-redux";
import Route from "@/components/Route";

export default function Index() {
  const dispatch = useDispatch();
  const myCoordinates = useSelector(
    (state: IRootState) => state.blogState.myCoordinates
  );
  const destinationCoordinates = useSelector(
    (state: IRootState) => state.blogState.destinationCoordinates
  );

  const map = useRef();
  useEffect(() => {
    const getLocation = async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();

        if (status !== "granted") {
          // setLocationError("Location permission denied");
          return;
        }

        let location = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Highest
        });

        // console.log(location);
        dispatch(
          setMyCoordinates({
            latitude: location?.coords?.latitude,
            longitude: location?.coords?.longitude
          })
        );

        const geocode: Location.LocationGeocodedAddress[] =
          await Location.reverseGeocodeAsync({
            latitude: location?.coords?.latitude,
            longitude: location?.coords?.longitude
          });

        dispatch(setMyAddress(geocode));
        // fetchWeatherData(location.coords.latitude, location.coords.longitude);
      } catch (error) {
        console.error("Error requesting location permission:", error);
      }
    };

    getLocation();
  }, []);

  // useEffect(() => {
  //   map.animateToRegion({
  //     latitude,
  //     longitude,
  //     latitudeDelta,
  //     longitudeDelta
  //   });
  // }, []);
  if (myCoordinates.latitude === 0) return;
  return (
    <View style={styles.container}>
      <Route />
      <MapView
        style={styles.map}
        region={{
          ...myCoordinates,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421
        }}
        // initialRegion={{
        //   latitude: 7.8731,
        //   longitude: 80.7718,
        //   latitudeDelta: 5,
        //   longitudeDelta: 1
        // }}
      >
        <MapViewDirections
          origin={myCoordinates}
          destination={
            destinationCoordinates?.latitude === 0
              ? myCoordinates
              : destinationCoordinates
          }
          apikey="AIzaSyBSmC5jX6MxDsWl3nB1yAmXmJ0REJgscnE"
          strokeWidth={4}
          strokeColor="blue"
          onReady={(result) => {
            // console.log(result);
            console.log(JSON.stringify(result, null, "\t"));
            console.log(`Distance: ${result.distance} km`);
            dispatch(
              setRouteInfo({
                distance: `${result.distance} km`,
                duration: `${result.duration} minutes`
              })
            );
            // console.log(`Duration: ${result.duration} min.`);
            // console.log(JSON.stringify(result, null, "\t"));
          }}
        />
        <Marker coordinate={myCoordinates} title="Starting Point" />
        <Marker
          coordinate={
            destinationCoordinates?.latitude === 0
              ? myCoordinates
              : destinationCoordinates
          }
          title="Destination Point"
        />
      </MapView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight
  },
  // container: {
  //   flex: 1
  // },
  map: {
    flex: 1
  }
});
