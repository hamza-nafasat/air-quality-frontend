// src/redux/services/alertApi.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import getEnv from '../../config/config.js';
export const alertApi = createApi({
  reducerPath: 'alertApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${getEnv('SERVER_URL')}/api/alert`,
    credentials: 'include',
  }),
  tagTypes: ['Alert'],
  endpoints: (builder) => ({
    // Create alert
    createAlert: builder.mutation({
      query: (body) => ({
        url: '/create',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Alert'],
    }),

    // Get all alerts
    getAlerts: builder.query({
      query: () => '/all',
      providesTags: ['Alert'],
    }),

    // Update alert
    updateAlert: builder.mutation({
      query: ({ alertId, ...body }) => ({
        url: `/single/${alertId}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['Alert'],
    }),

    // Delete alert
    deleteAlert: builder.mutation({
      query: (alertId) => ({
        url: `/single/${alertId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Alert'],
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
