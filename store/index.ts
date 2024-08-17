import { configureStore } from "@reduxjs/toolkit";
import mapReducer from "./reducer/mapSlice";

const store = configureStore({
  reducer: {
    blogState: mapReducer
  }
});

export default store;

export type IRootState = ReturnType<typeof store.getState>;
