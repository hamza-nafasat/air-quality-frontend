import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import getEnv from '../../config/config.js';
import { TAGS } from '../tags/tagTypes.js';

export const ruleEngineApi = createApi({
  reducerPath: 'ruleEngineApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${getEnv('SERVER_URL')}/api/rule-engine`,
    credentials: 'include',
  }),
  tagTypes: [TAGS.RULE_ENGINE],
  endpoints: (builder) => ({
    // Create alert
    createRule: builder.mutation({
      query: (body) => ({
        url: '/create',
        method: 'POST',
        body,
      }),
      invalidatesTags: [TAGS.RULE_ENGINE],
    }),

    // Get all alerts
    getRules: builder.query({
      query: () => '/all',
      providesTags: [TAGS.RULE_ENGINE],
    }),

    // Update alert
    updateRule: builder.mutation({
      query: ({ ruleId, ...body }) => ({
        url: `/single/${ruleId}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: [TAGS.RULE_ENGINE],
    }),

    // Delete alert
    deleteRule: builder.mutation({
      query: (ruleId) => ({
        url: `/single/${ruleId}`,
        method: 'DELETE',
      }),
      invalidatesTags: [TAGS.RULE_ENGINE],
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
