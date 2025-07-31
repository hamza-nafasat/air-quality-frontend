import { configureStore } from '@reduxjs/toolkit';
import authApis from './apis/authApis';
import buildingApis from './apis/buildingApis';
import sensorApis from './apis/sensorApis';
import authSlice from './slices/authSlice';
import buildingSlice from './slices/buildingSlice';
import floorApis from './apis/floorApis';
import subscriptionsApis from './apis/subscriptionApis';
import dashboardApis from './apis/dashboardApis';
import reportsApi from './apis/reportsApi';
import alertApi from './apis/alertApi';
import ruleEngineApi from './apis/ruleEngineApi';

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
    [subscriptionsApis.reducerPath]: subscriptionsApis.reducer,
    [dashboardApis.reducerPath]: dashboardApis.reducer,
    [reportsApi.reducerPath]: reportsApi.reducer,
    [alertApi.reducerPath]: alertApi.reducer,
    [ruleEngineApi.reducerPath]: ruleEngineApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({ serializableCheck: false })
      .concat(authApis.middleware)
      .concat(sensorApis.middleware)
      .concat(buildingApis.middleware)
      .concat(floorApis.middleware)
      .concat(subscriptionsApis.middleware)
      .concat(dashboardApis.middleware)
      .concat(reportsApi.middleware)
      .concat(alertApi.middleware)
      .concat(ruleEngineApi.middleware);
  },
});

export default store;
