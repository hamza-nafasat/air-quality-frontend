import { configureStore } from "@reduxjs/toolkit";
import authApis from "./apis/authApis";
import buildingApis from "./apis/buildingApis";
import sensorApis from "./apis/sensorApis";
import authSlice from "./slices/authSlice";
import buildingSlice from "./slices/buildingSlice";
import floorApis from "./apis/floorApis";

const store = configureStore({
  reducer: {
    // slices
    [authSlice.name]: authSlice.reducer,
    [buildingSlice.name]: buildingSlice.reducer,

    // apis
    [authApis.reducerPath]: authApis.reducer,
    [buildingApis.reducerPath]: buildingApis.reducer,
    [floorApis.reducerPath]: floorApis.reducer,
    [sensorApis.reducerPath]: sensorApis.reducer,
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
