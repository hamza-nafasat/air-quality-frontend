import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import getEnv from '../../config/config.js';
import { TAGS } from '../tags/tagTypes.js';

const floorApis = createApi({
  reducerPath: 'floorApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${getEnv('SERVER_URL')}/api/floor`,
    credentials: 'include',
  }),
  tagTypes: [TAGS.FLOOR],
  endpoints: (builder) => ({
    // create floor
    // --------------
    createFloor: builder.mutation({
      query: (data) => ({
        url: '/create',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: [TAGS.FLOOR, TAGS.SENSOR],
    }),

    // get all floors
    // ----------------
    getAllFloor: builder.query({
      query: (buildingId) => ({
        url: `/all?buildingId=${buildingId}`,
        method: 'GET',
      }),
      providesTags: [TAGS.FLOOR],
    }),

    // get single floor
    // -------------------
    getSingleFloor: builder.query({
      query: (floorId) => ({
        url: `/single/${floorId}`,
        method: 'GET',
      }),
      providesTags: [TAGS.FLOOR],
    }),

    // update single floor
    // ----------------------
    updateSingleFloor: builder.mutation({
      query: ({ floorId, data }) => ({
        url: `/single/${floorId}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: [TAGS.FLOOR, TAGS.SENSOR],
    }),

    // delete single floor
    // ----------------------
    deleteSingleFloor: builder.mutation({
      query: (floorId) => ({
        url: `/single/${floorId}`,
        method: 'DELETE',
      }),
      invalidatesTags: [TAGS.FLOOR, TAGS.SENSOR],
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
