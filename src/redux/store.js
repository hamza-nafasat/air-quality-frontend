import { configureStore } from "@reduxjs/toolkit";
import authApis from "./apis/authApis";
import authSlice from "./slices/authSlices";
import sensorApis from "./apis/sensorApis";

const store = configureStore({
  reducer: {
    [authApis.reducerPath]: authApis.reducer,
    [authSlice.name]: authSlice.reducer,
    [sensorApis.reducerPath]: sensorApis.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({ serializableCheck: false })
      .concat(authApis.middleware)
      .concat(sensorApis.middleware);
  },
});

export default store;
