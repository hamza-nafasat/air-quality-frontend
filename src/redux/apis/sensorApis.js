import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import getEnv from "../../config/config.js";

const sensorApis = createApi({
  reducerPath: "sensorApis",
  baseQuery: fetchBaseQuery({ baseUrl: `${getEnv("SERVER_URL")}/api/sensor`, credentials: "include" }),

  endpoints: (builder) => ({
    // create sensor
    // -------------
    createSensor: builder.mutation({
      query: (data) => ({
        url: "/create",
        method: "POST",
        body: data,
      }),
    }),

    // get all sensors
    // ---------------
    getAllSensors: builder.query({
      query: () => ({
        url: "/all",
        method: "GET",
      }),
    }),

    // get single sensors
    // ------------------
    getSingleSensor: builder.query({
      query: (sensorId) => ({
        url: `/single/${sensorId}`,
        method: "GET",
      }),
    }),

    // update sensor
    // -------------
    updateSensor: builder.mutation({
      query: ({ sensorId, data }) => ({
        url: `/single/${sensorId}`,
        method: "PUT",
        body: data,
      }),
    }),

    // delete sensor
    // -------------
    deleteSensor: builder.mutation({
      query: (sensorId) => ({
        url: `/single/${sensorId}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useCreateSensorMutation,
  useGetAllSensorsQuery,
  useGetSingleSensorQuery,
  useUpdateSensorMutation,
  useDeleteSensorMutation,
} = sensorApis;
export default sensorApis;
