import { configureStore } from "@reduxjs/toolkit";
import authApis from "./apis/authApis";
import authSlice from "./slices/authSlice";
import sensorApis from "./apis/sensorApis";
import buildingApis from "./apis/buildingApis";
import floorApis from "./apis/floorApis";
import buildingSlice from "./slices/buildingSlice";

const store = configureStore({
  reducer: {
    // slices
    [authSlice.name]: authSlice.reducer,
    [buildingSlice.name]: buildingSlice.reducer,

    // apis
    [authApis.reducerPath]: authApis.reducer,
    [buildingApis.reducerPath]: buildingApis.reducer,
    [sensorApis.reducerPath]: sensorApis.reducer,
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
