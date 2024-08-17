import { createSlice, Dispatch } from "@reduxjs/toolkit";
import { LatLng } from "@/types";
import * as Location from "expo-location";
interface IData {
  myCoordinates: LatLng;
  myAddress: Location.LocationGeocodedAddress[];
  destinationCoordinates: LatLng;
  routeInfo: RouteInfo;
}

type RouteInfo = {
  distance: string;
  duration: string;
};

const initialState: IData = {
  myCoordinates: { latitude: 0, longitude: 0 },
  myAddress: [],
  destinationCoordinates: { latitude: 0, longitude: 0 },
  routeInfo: { distance: "", duration: "" }
};
// Recaptcha state
export const mapSlice = createSlice({
  name: "mapState",
  initialState,
  reducers: {
    setMyCoordinates: (state, action) => {
      // console.log(JSON.stringify([...state.data, action.payload], null, "\t"));
      state.myCoordinates = action.payload;
    },
    setMyAddress: (state, action) => {
      // console.log(JSON.stringify([...state.data, action.payload], null, "\t"));
      state.myAddress = action.payload;
    },
    setDestinationCoordinates: (state, action) => {
      // console.log(JSON.stringify([...state.data, action.payload], null, "\t"));
      state.destinationCoordinates = action.payload;
    },
    setRouteInfo: (state, action) => {
      // console.log(JSON.stringify([...state.data, action.payload], null, "\t"));
      state.routeInfo = action.payload;
    }
  }
});

export const {
  setMyCoordinates,
  setMyAddress,
  setDestinationCoordinates,
  setRouteInfo
} = mapSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`

export default mapSlice.reducer;
