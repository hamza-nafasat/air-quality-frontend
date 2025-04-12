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
      invalidatesTags: ["floor"],
    }),

    // get all floors
    // ----------------
    getAllFloor: builder.query({
      query: (buildingId) => ({
        url: `/all?buildingId=${buildingId}`,
        method: "GET",
      }),
      providesTags: ["floor"],
    }),

    // get single floor
    // -------------------
    getSingleFloor: builder.query({
      query: (floorId) => ({
        url: `/single/${floorId}`,
        method: "GET",
      }),
      providesTags: ["floor"],
    }),

    // update single floor
    // ----------------------
    updateSingleFloor: builder.mutation({
      query: ({ floorId, data }) => ({
        url: `/single/${floorId}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["floor"],
    }),

    // delete single floor
    // ----------------------
    deleteSingleFloor: builder.mutation({
      query: (floorId) => ({
        url: `/single/${floorId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["floor"],
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
