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
  }),
});

export const {
  useGetAllNotificationsQuery,
  useGetNotificationsByUserQuery,
  useUpdateNotificationMutation,
  useDeleteNotificationMutation,
} = notificationApis;
export default notificationApis;
