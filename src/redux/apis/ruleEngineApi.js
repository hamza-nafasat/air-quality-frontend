// src/redux/services/ruleEngineApi.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import getEnv from '../../config/config.js';
export const ruleEngineApi = createApi({
  reducerPath: 'ruleEngineApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${getEnv('SERVER_URL')}/api/rule-engine`,
    credentials: 'include',
  }),
  tagTypes: ['Rule-Engine'],
  endpoints: (builder) => ({
    // Create alert
    createRule: builder.mutation({
      query: (body) => ({
        url: '/create',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Rule-Engine'],
    }),

    // Get all alerts
    getRules: builder.query({
      query: () => '/all',
      providesTags: ['Rule-Engine'],
    }),

    // Update alert
    updateRule: builder.mutation({
      query: ({ ruleId, ...body }) => ({
        url: `/single/${ruleId}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['Rule-Engine'],
    }),

    // Delete alert
    deleteRule: builder.mutation({
      query: (ruleId) => ({
        url: `/single/${ruleId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Rule-Engine'],
    }),
  }),
});

export const {
  useCreateRuleMutation,
  useDeleteRuleMutation,
  useGetRulesQuery,
  useUpdateRuleMutation,
} = ruleEngineApi;
export default ruleEngineApi;
