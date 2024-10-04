import { configureStore } from "@reduxjs/toolkit";
import authApis from "./apis/authApis";
import authSlice from "./slices/authSlices";
import sensorApis from "./apis/sensorApis";
import buildingApis from "./apis/buildingApis";
import floorApis from "./apis/floorApis";

const store = configureStore({
  reducer: {
    [authApis.reducerPath]: authApis.reducer,
    [authSlice.name]: authSlice.reducer,
    [sensorApis.reducerPath]: sensorApis.reducer,
    [buildingApis.reducerPath]: buildingApis.reducer,
    [floorApis.reducerPath]: floorApis.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({ serializableCheck: false })
      .concat(authApis.middleware)
      .concat(sensorApis.middleware)
      .concat(buildingApis.middleware)
      .concat(floorApis.middleware);
  },
});

export default store;
