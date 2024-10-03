import { configureStore } from "@reduxjs/toolkit";
import authApis from "./apis/authApis";

const store = configureStore({
  reducer: {
    [authApis.reducerPath]: authApis.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({ serializableCheck: false }).concat(authApis.middleware);
  },
});

export default store;
