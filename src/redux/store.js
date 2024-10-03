import { configureStore } from "@reduxjs/toolkit";
import authApis from "./apis/authApis";
import authSlice from "./slices/authSlices";

const store = configureStore({
  reducer: {
    [authApis.reducerPath]: authApis.reducer,
    [authSlice.name]: authSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({ serializableCheck: false }).concat(authApis.middleware);
  },
});

export default store;
