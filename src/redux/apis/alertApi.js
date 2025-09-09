import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import getEnv from '../../config/config.js';
import { TAGS } from '../tags/tagTypes.js';

export const alertApi = createApi({
  reducerPath: 'alertApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${getEnv('SERVER_URL')}/api/alert`,
    credentials: 'include',
  }),
  tagTypes: [TAGS.ALERT],
  endpoints: (builder) => ({
    // Create alert
    createAlert: builder.mutation({
      query: (body) => ({
        url: '/create',
        method: 'POST',
        body,
      }),
      invalidatesTags: [TAGS.ALERT],
    }),

    // Get all alerts
    getAlerts: builder.query({
      query: () => '/all',
      providesTags: [TAGS.ALERT],
    }),

    // Update alert
    updateAlert: builder.mutation({
      query: ({ alertId, ...body }) => ({
        url: `/single/${alertId}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: [TAGS.ALERT],
    }),

    // Delete alert
    deleteAlert: builder.mutation({
      query: (alertId) => ({
        url: `/single/${alertId}`,
        method: 'DELETE',
      }),
      invalidatesTags: [TAGS.ALERT],
    }),
  }),
});

export const {
  useCreateAlertMutation,
  useGetAlertsQuery,
  useUpdateAlertMutation,
  useDeleteAlertMutation,
} = alertApi;
export default alertApi;
