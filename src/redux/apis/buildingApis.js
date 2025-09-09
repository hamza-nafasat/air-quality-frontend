import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import getEnv from '../../config/config.js';
import { TAGS } from '../tags/tagTypes.js';

const buildingApis = createApi({
  reducerPath: 'buildingApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${getEnv('SERVER_URL')}/api/building`,
    credentials: 'include',
  }),
  tagTypes: [TAGS.BUILDING],
  endpoints: (builder) => ({
    // create building
    // --------------
    createBuilding: builder.mutation({
      query: (data) => ({
        url: '/create',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: [TAGS.BUILDING],
    }),

    // get all buildings
    // ----------------
    getAllBuildings: builder.query({
      query: () => ({
        url: '/all',
        method: 'GET',
      }),
      providesTags: [TAGS.BUILDING],
    }),

    // get single building
    // -------------------
    getSingleBuilding: builder.query({
      query: (buildingId) => ({
        url: `/single/${buildingId}`,
        method: 'GET',
      }),
      providesTags: [TAGS.BUILDING],
    }),
    // get single building
    // -------------------
    getallBuildingsHierarchy: builder.query({
      query: () => ({
        url: `/all-with-hierarchy`,
        method: 'GET',
      }),
      providesTags: [TAGS.BUILDING],
    }),

    // update single building
    // ----------------------
    updateSingleBuilding: builder.mutation({
      query: ({ buildingId, data }) => ({
        url: `/single/${buildingId}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: [TAGS.BUILDING, TAGS.FLOOR, TAGS.SENSOR],
    }),

    // delete single building
    // ----------------------
    deleteSingleBuilding: builder.mutation({
      query: (buildingId) => ({
        url: `/single/${buildingId}`,
        method: 'DELETE',
      }),
      invalidatesTags: [TAGS.BUILDING, TAGS.FLOOR, TAGS.SENSOR],
    }),
  }),
});

export const {
  useCreateBuildingMutation,
  useGetAllBuildingsQuery,
  useGetSingleBuildingQuery,
  useUpdateSingleBuildingMutation,
  useDeleteSingleBuildingMutation,
  useGetallBuildingsHierarchyQuery,
} = buildingApis;
export default buildingApis;
