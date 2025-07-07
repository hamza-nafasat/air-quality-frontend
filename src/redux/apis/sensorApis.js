import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import getEnv from '../../config/config.js';

const sensorApis = createApi({
  reducerPath: 'sensorApis',
  baseQuery: fetchBaseQuery({
    baseUrl: `${getEnv('SERVER_URL')}/api/sensor`,
    credentials: 'include',
  }),
  tagTypes: ['sensor'],
  endpoints: (builder) => ({
    // create sensor
    // -------------
    createSensor: builder.mutation({
      query: (data) => ({
        url: '/create',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['sensor'],
    }),

    // get all sensors
    // ---------------
    getAllSensors: builder.query({
      query: () => ({
        url: '/all',
        method: 'GET',
      }),
      providesTags: ['sensor'],
    }),

    // get single sensors
    // ------------------
    getSingleSensor: builder.query({
      query: (sensorId) => ({
        url: `/single/${sensorId}`,
        method: 'GET',
      }),
      providesTags: ['sensor'],
    }),
    getSingleSensorSql: builder.query({
      query: (sensorId) => ({
        url: `/humidity/${sensorId}`,
        method: 'GET',
      }),
      providesTags: ['sensor'],
    }),

    // update sensor
    // -------------
    updateSensor: builder.mutation({
      query: ({ sensorId, data }) => ({
        url: `/single/${sensorId}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['sensor'],
    }),

    // delete sensor
    // -------------
    deleteSensor: builder.mutation({
      query: (sensorId) => ({
        url: `/single/${sensorId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['sensor'],
    }),
  }),
});

export const {
  useCreateSensorMutation,
  useGetAllSensorsQuery,
  useGetSingleSensorQuery,
  useUpdateSensorMutation,
  useDeleteSensorMutation,
  useGetSingleSensorSqlQuery,
} = sensorApis;
export default sensorApis;
