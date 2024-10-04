import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import getEnv from "../../config/config.js";

const buildingApis = createApi({
  reducerPath: "buildingApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${getEnv("SERVER_URL")}/api/building`, credentials: "include" }),

  endpoints: (builder) => ({
    // create building
    // --------------
    createBuilding: builder.mutation({
      query: (data) => ({
        url: "/create",
        method: "POST",
        body: data,
      }),
    }),

    // get all buildings
    // ----------------
    getAllBuildings: builder.query({
      query: () => ({
        url: "/all",
        method: "GET",
      }),
    }),

    // get single building
    // -------------------
    getSingleBuilding: builder.query({
      query: (buildingId) => ({
        url: `/single/${buildingId}`,
        method: "GET",
      }),
    }),

    // update single building
    // ----------------------
    updateSingleBuilding: builder.mutation({
      query: ({ buildingId, data }) => ({
        url: `/single/${buildingId}`,
        method: "PUT",
        body: data,
      }),
    }),

    // delete single building
    // ----------------------
    deleteSingleBuilding: builder.mutation({
      query: (buildingId) => ({
        url: `/single/${buildingId}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useCreateBuildingMutation,
  useGetAllBuildingsQuery,
  useGetSingleBuildingQuery,
  useUpdateSingleBuildingMutation,
  useDeleteSingleBuildingMutation,
} = buildingApis;
export default buildingApis;
