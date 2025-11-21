import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import getEnv from '../../config/config.js';
import { TAGS } from '../tags/tagTypes.js';

const notificationApis = createApi({
  reducerPath: 'notificationApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${getEnv('SERVER_URL')}/api/notification`,
    credentials: 'include',
  }),
  tagTypes: [TAGS.NOTIFICATION],
  endpoints: (builder) => ({
    // ✅ Get all notifications
    getAllNotifications: builder.query({
      query: () => ({
        url: '/all',
        method: 'GET',
      }),
      providesTags: [TAGS.NOTIFICATION],
    }),

    // ✅ Get notifications by userId
    getNotificationsByUser: builder.query({
      query: (userId) => ({
        url: `/user/${userId}`,
        method: 'GET',
      }),
      providesTags: [TAGS.NOTIFICATION],
    }),

    // ✅ Update notification (e.g., mark as read/unread)
    updateNotification: builder.mutation({
      query: ({ id, data }) => ({
        url: `/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: [TAGS.NOTIFICATION],
    }),

    // ✅ Delete notification
    deleteNotification: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [TAGS.NOTIFICATION],
    }),

    // 🏢 Get notifications by Building ID
    getNotificationsByBuilding: builder.query({
      query: (buildingId) => ({
        url: `/building/${buildingId}`,
        method: 'GET',
      }),
      providesTags: [TAGS.NOTIFICATION],
    }),

    // 🏢 Get notifications by Floor ID
    getNotificationsByFloor: builder.query({
      query: (floorId) => ({
        url: `/floor/${floorId}`,
        method: 'GET',
      }),
      providesTags: [TAGS.NOTIFICATION],
    }),

    // 🏢 Get notifications by Sensor ID
    getNotificationsBySensor: builder.query({
      query: (sensorId) => ({
        url: `/sensor/${sensorId}`,
        method: 'GET',
      }),
      providesTags: [TAGS.NOTIFICATION],
    }),
  }),
});

export const {
  useGetAllNotificationsQuery,
  useGetNotificationsByUserQuery,
  useUpdateNotificationMutation,
  useDeleteNotificationMutation,
  useGetNotificationsByBuildingQuery,
  useGetNotificationsByFloorQuery,
  useGetNotificationsBySensorQuery,
} = notificationApis;

export default notificationApis;
