import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import getEnv from "../../config/config.js";

const floorApis = createApi({
  reducerPath: "floorApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${getEnv("SERVER_URL")}/api/floor`, credentials: "include" }),

  endpoints: (builder) => ({
    // create floor
    // --------------
    createFloor: builder.mutation({
      query: (data) => ({
        url: "/create",
        method: "POST",
        body: data,
      }),
    }),

    // get all floors
    // ----------------
    getAllFloor: builder.query({
      query: (buildingId) => ({
        url: `/all?buildingId=${buildingId}`,
        method: "GET",
      }),
    }),

    // get single floor
    // -------------------
    getSingleFloor: builder.query({
      query: (floorId) => ({
        url: `/single/${floorId}`,
        method: "GET",
      }),
    }),

    // update single floor
    // ----------------------
    updateSingleFloor: builder.mutation({
      query: ({ floorId, data }) => ({
        url: `/single/${floorId}`,
        method: "PUT",
        body: data,
      }),
    }),

    // delete single floor
    // ----------------------
    deleteSingleFloor: builder.mutation({
      query: (floorId) => ({
        url: `/single/${floorId}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useCreateFloorMutation,
  useGetAllFloorQuery,
  useGetSingleFloorQuery,
  useUpdateSingleFloorMutation,
  useDeleteSingleFloorMutation,
} = floorApis;
export default floorApis;
